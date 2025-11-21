import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
  Screen,
  QuestionText,
  Progress,
  SummarySection,
  SummaryTitle,
  SummaryItem,
  MissionsSection,
  MissionsTitle,
  MissionItem,
  MissionCheckbox,
  MissionCheckboxMark,
  MissionText,
} from './styles';
import {
  flowworkStorage,
  MoodLevel,
} from '../../domain/flowwork';
import { profileService } from '../ProfileScreen/services/profileService';

type Summary = {
  tasksToday: number;
  missionsToday: number;
  lastMood: string;
};

type BoardMission = {
  id: string;
  label: string;
  completed: boolean;
};

const moodLabels: Record<MoodLevel, string> = {
  muito_sobrecarregado: 'Muito sobrecarregado',
  cansado: 'Cansado',
  ok: 'Ok',
  bem: 'Bem',
  em_flow: 'Em flow',
};

const INITIAL_BOARD_MISSIONS: BoardMission[] = [
  {
    id: 'm1',
    label: 'Registrar pelo menos 3 tarefas de trabalho hoje.',
    completed: false,
  },
  {
    id: 'm2',
    label: 'Concluir 2 missões de bem-estar (pausa, água, alongamento…).',
    completed: false,
  },
  {
    id: 'm3',
    label: 'Fazer 1 check-in de humor no meio do expediente.',
    completed: false,
  },
];

function getTodayISODate() {
  return new Date().toISOString().slice(0, 10);
}

const SimulationScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [summary, setSummary] = useState<Summary>({
    tasksToday: 0,
    missionsToday: 0,
    lastMood: 'Sem registro de humor.',
  });
  const [boardMissions, setBoardMissions] =
    useState<BoardMission[]>(INITIAL_BOARD_MISSIONS);

  const isFocused = useIsFocused();

  async function loadSummary() {
  const [profile, tasks, missions, moods] = await Promise.all([
    profileService.load(),
    flowworkStorage.loadTasks(),
    flowworkStorage.loadMissions(),
    flowworkStorage.loadMoods(),
  ]);

  const today = getTodayISODate();

  const tasksToday = tasks.filter(
    (t) => t.createdAt?.slice(0, 10) === today,
  ).length;

  const missionsToday = missions.filter(
    (m) => m.createdAt?.slice(0, 10) === today,
  ).length;

  let lastMoodText = 'Sem registro de humor.';
  if (moods.length > 0) {
    const last = moods[moods.length - 1];
    lastMoodText = moodLabels[last.mood] || last.mood;
  }

  const rawProfileName = profile?.name?.trim();

  const isDefaultUserName =
    rawProfileName &&
    ['usuário', 'usuario'].includes(rawProfileName.toLowerCase());

  let bestName = !isDefaultUserName ? rawProfileName || '' : '';

  if (!bestName) {
    const lastTaskWithName = [...tasks]
      .reverse()
      .find(
        (t) => t.memberName && t.memberName.trim().length > 0,
      );

    const lastMissionWithName = [...missions]
      .reverse()
      .find(
        (m) => m.memberName && m.memberName.trim().length > 0,
      );

    bestName =
      lastTaskWithName?.memberName?.trim() ||
      lastMissionWithName?.memberName?.trim() ||
      '';
  }

  setName(bestName);

  setSummary({
    tasksToday,
    missionsToday,
    lastMood: lastMoodText,
  });
}

  useEffect(() => {
    if (isFocused) {
      loadSummary();
    }
  }, [isFocused]);

  function toggleMission(id: string) {
    setBoardMissions((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, completed: !m.completed } : m,
      ),
    );
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <QuestionText>
          {name ? `Olá, ${name}!` : 'Olá!'} 👋
        </QuestionText>
        <Progress>
          Bem-vindo ao FlowWork – gamificação para trabalhar
          melhor, não mais.
        </Progress>

        {/* Resumo do dia funcional */}
        <SummarySection>
          <SummaryTitle>Resumo de hoje</SummaryTitle>
          <SummaryItem>
            • Tarefas registradas hoje: {summary.tasksToday}
          </SummaryItem>
          <SummaryItem>
            • Missões de bem-estar registradas hoje:{' '}
            {summary.missionsToday}
          </SummaryItem>
          <SummaryItem>
            • Último check-in de humor: {summary.lastMood}
          </SummaryItem>
        </SummarySection>

        {/* Quadro de missões com checkbox */}
        <MissionsSection>
          <MissionsTitle>Quadro de missões</MissionsTitle>
          {boardMissions.map((mission) => (
            <MissionItem
              key={mission.id}
              onPress={() => toggleMission(mission.id)}
            >
              <MissionCheckbox completed={mission.completed}>
                {mission.completed && (
                  <MissionCheckboxMark>✓</MissionCheckboxMark>
                )}
              </MissionCheckbox>
              <MissionText>{mission.label}</MissionText>
            </MissionItem>
          ))}
        </MissionsSection>
      </ScrollView>
    </Screen>
  );
};

export default SimulationScreen;
