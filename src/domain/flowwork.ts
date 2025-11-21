import AsyncStorage from '@react-native-async-storage/async-storage';

export type TeamId = 'vermelha' | 'roxa' | 'azul';

export type WorkTask = {
  id: string;
  memberName: string;
  team: TeamId;
  description: string;
  points: number;
  createdAt: string;
};

export type WellbeingMission = {
  id: string;
  memberName: string;
  team: TeamId;
  label: string;
  points: number;
  createdAt: string;
};

export type MoodLevel =
  | 'muito_sobrecarregado'
  | 'cansado'
  | 'ok'
  | 'bem'
  | 'em_flow';

export type MoodCheckin = {
  id: string;
  memberName: string;
  mood: MoodLevel;
  energy: number; 
  note?: string;
  createdAt: string;
};

const TASKS_KEY = '@flowwork:tasks';
const MISSIONS_KEY = '@flowwork:missions';
const MOODS_KEY = '@flowwork:moods';

function parseArray<T>(value: string | null): T[] {
  if (!value) return [];
  try {
    const data = JSON.parse(value);
    return Array.isArray(data) ? (data as T[]) : [];
  } catch {
    return [];
  }
}

function makeId(): string {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2)
  );
}

export const flowworkStorage = {
  async loadTasks(): Promise<WorkTask[]> {
    const raw = await AsyncStorage.getItem(TASKS_KEY);
    return parseArray<WorkTask>(raw);
  },

  async saveTasks(items: WorkTask[]): Promise<void> {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(items));
  },

  async addTask(
    input: Omit<WorkTask, 'id' | 'createdAt'>,
  ): Promise<WorkTask[]> {
    const items = await this.loadTasks();
    const task: WorkTask = {
      ...input,
      id: makeId(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...items, task];
    await this.saveTasks(updated);
    return updated;
  },

  async loadMissions(): Promise<WellbeingMission[]> {
    const raw = await AsyncStorage.getItem(MISSIONS_KEY);
    return parseArray<WellbeingMission>(raw);
  },

  async saveMissions(items: WellbeingMission[]): Promise<void> {
    await AsyncStorage.setItem(MISSIONS_KEY, JSON.stringify(items));
  },

  async addMission(
    input: Omit<WellbeingMission, 'id' | 'createdAt'>,
  ): Promise<WellbeingMission[]> {
    const items = await this.loadMissions();
    const mission: WellbeingMission = {
      ...input,
      id: makeId(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...items, mission];
    await this.saveMissions(updated);
    return updated;
  },

  async loadMoods(): Promise<MoodCheckin[]> {
    const raw = await AsyncStorage.getItem(MOODS_KEY);
    return parseArray<MoodCheckin>(raw);
  },

  async saveMoods(items: MoodCheckin[]): Promise<void> {
    await AsyncStorage.setItem(MOODS_KEY, JSON.stringify(items));
  },

  async addMood(
    input: Omit<MoodCheckin, 'id' | 'createdAt'>,
  ): Promise<MoodCheckin[]> {
    const items = await this.loadMoods();
    const mood: MoodCheckin = {
      ...input,
      id: makeId(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...items, mood];
    await this.saveMoods(updated);
    return updated;
  },
};


export type TeamContribution = {
  id: string;
  team: TeamId;
  memberName: string;
  description: string;
  points: number;
  createdAt: string;
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

  const all: TeamContribution[] = [
    ...tasks.map((t) => ({
      id: t.id,
      team: t.team,
      memberName: t.memberName,
      description: t.description,
      points: t.points,
      createdAt: t.createdAt,
    })),
    ...missions.map((m) => ({
      id: m.id,
      team: m.team,
      memberName: m.memberName,
      description: m.label,
      points: m.points,
      createdAt: m.createdAt,
    })),
  ];

  const teams: TeamId[] = ['vermelha', 'roxa', 'azul'];

  const ranking: TeamRanking[] = teams.map((team) => {
    const contributions = all.filter((c) => c.team === team);
    const totalPoints = contributions.reduce(
      (sum, c) => sum + c.points,
      0,
    );
    return { team, totalPoints, contributions };
  });

  ranking.sort((a, b) => b.totalPoints - a.totalPoints);

  return ranking;
}
