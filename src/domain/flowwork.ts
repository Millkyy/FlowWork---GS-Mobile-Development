import AsyncStorage from '@react-native-async-storage/async-storage';



export type TeamId = 'vermelha' | 'roxa' | 'azul';

export type MoodLevel =
  | 'muito_sobrecarregado'
  | 'cansado'
  | 'ok'
  | 'bem'
  | 'em_flow';

export type WorkTask = {
  id: string;
  memberName: string;
  team: TeamId;
  description: string;
  points: number;
  createdAt?: string; 
};

export type WellbeingMission = {
  id: string;
  memberName: string;
  team: TeamId;
  label: string;
  points: number;
  createdAt?: string; 
};

export type MoodCheckin = {
  id: string;
  memberName: string;
  mood: MoodLevel;
  energy: number;
  note?: string;
  createdAt: string;
};


const TASKS_KEY = '@flowwork/tasks';
const MISSIONS_KEY = '@flowwork/missions';
const MOODS_KEY = '@flowwork/moods';


async function safeGetItem<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.warn(`Erro lendo ${key} do AsyncStorage`, e);
    return fallback;
  }
}

async function safeSetItem<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Erro salvando ${key} no AsyncStorage`, e);
  }
}


export const flowworkStorage = {
  async loadTasks(): Promise<WorkTask[]> {
    return safeGetItem<WorkTask[]>(TASKS_KEY, []);
  },

  async saveTasks(tasks: WorkTask[]): Promise<void> {
    return safeSetItem(TASKS_KEY, tasks);
  },

  async addTask(input: {
    memberName: string;
    team: TeamId;
    description: string;
    points: number;
  }): Promise<WorkTask[]> {
    const tasks = await safeGetItem<WorkTask[]>(TASKS_KEY, []);
    const now = new Date().toISOString();

    const newTask: WorkTask = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      memberName: input.memberName,
      team: input.team,
      description: input.description,
      points: input.points,
      createdAt: now,
    };

    const updated = [...tasks, newTask];
    await safeSetItem(TASKS_KEY, updated);
    return updated;
  },

  async loadMissions(): Promise<WellbeingMission[]> {
    return safeGetItem<WellbeingMission[]>(MISSIONS_KEY, []);
  },

  async saveMissions(missions: WellbeingMission[]): Promise<void> {
    return safeSetItem(MISSIONS_KEY, missions);
  },

  async addMission(input: {
    memberName: string;
    team: TeamId;
    label: string;
    points: number;
  }): Promise<WellbeingMission[]> {
    const missions = await safeGetItem<WellbeingMission[]>(
      MISSIONS_KEY,
      [],
    );
    const now = new Date().toISOString();

    const newMission: WellbeingMission = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      memberName: input.memberName,
      team: input.team,
      label: input.label,
      points: input.points,
      createdAt: now,
    };

    const updated = [...missions, newMission];
    await safeSetItem(MISSIONS_KEY, updated);
    return updated;
  },

  async loadMoods(): Promise<MoodCheckin[]> {
    return safeGetItem<MoodCheckin[]>(MOODS_KEY, []);
  },

  async addMood(input: {
    memberName: string;
    mood: MoodLevel;
    energy: number;
    note?: string;
  }): Promise<MoodCheckin[]> {
    const moods = await safeGetItem<MoodCheckin[]>(MOODS_KEY, []);
    const now = new Date().toISOString();

    const newMood: MoodCheckin = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      memberName: input.memberName,
      mood: input.mood,
      energy: input.energy,
      note: input.note,
      createdAt: now,
    };

    const updated = [...moods, newMood];
    await safeSetItem(MOODS_KEY, updated);
    return updated;
  },
};



export type TeamContribution = {
  id: string;
  memberName: string;
  description: string;
  points: number;
  type: 'task' | 'mission';
  createdAt?: string;
};

export type TeamRanking = {
  team: TeamId;
  totalPoints: number;
  contributions: TeamContribution[];
};

export async function buildTeamRanking(): Promise<TeamRanking[]> {
  const [tasks, missions] = await Promise.all([
    flowworkStorage.loadTasks(),
    flowworkStorage.loadMissions(),
  ]);

  const baseTeams: TeamId[] = ['vermelha', 'roxa', 'azul'];

  const map = new Map<TeamId, TeamRanking>();

  baseTeams.forEach((team) => {
    map.set(team, {
      team,
      totalPoints: 0,
      contributions: [],
    });
  });

  for (const t of tasks) {
    if (!map.has(t.team)) continue;
    const entry = map.get(t.team)!;
    entry.totalPoints += t.points || 0;
    entry.contributions.push({
      id: t.id,
      memberName: t.memberName,
      description: t.description,
      points: t.points || 0,
      type: 'task',
      createdAt: t.createdAt,
    });
  }

  for (const m of missions) {
    if (!map.has(m.team)) continue;
    const entry = map.get(m.team)!;
    entry.totalPoints += m.points || 0;
    entry.contributions.push({
      id: m.id,
      memberName: m.memberName,
      description: m.label,
      points: m.points || 0,
      type: 'mission',
      createdAt: m.createdAt,
    });
  }

  const rankingArray = Array.from(map.values()).sort(
    (a, b) => b.totalPoints - a.totalPoints,
  );

  rankingArray.forEach((r) => {
    r.contributions.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return a.createdAt.localeCompare(b.createdAt);
    });
  });

  return rankingArray;
}
