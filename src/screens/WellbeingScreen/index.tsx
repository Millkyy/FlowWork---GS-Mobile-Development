import React, { useEffect, useState } from 'react';
import { Alert, Platform, ScrollView } from 'react-native';
import {
  Screen,
  Title,
  SummaryContainer,
  SummaryText,
  Row,
  Input,
  PrimaryBtn,
  SecondaryBtn,
  BtnText,
  BtnTextLight,
  Form,
  FormTitle,
  MoodCard,
  MoodOptionButton,
  MoodOptionText,
  TeamLabel,
  TeamSelectButton,
  TeamSelectText,
  TeamDropdown,
  TeamDropdownItem,
  TeamDropdownItemText,
} from './styles';
import { flowworkStorage, TeamId, MoodLevel } from '../../domain/flowwork';
import { profileService } from '../ProfileScreen/services/profileService';

type MissionForm = {
  memberName: string;
  team: TeamId | null;
  label: string;
  points: string;
};

type MoodForm = {
  memberName: string;
  mood: MoodLevel;
  energy: string;
  note: string;
};

const moodLabelMap: Record<MoodLevel, string> = {
  muito_sobrecarregado: 'Muito sobrecarregado',
  cansado: 'Cansado',
  ok: 'Ok',
  bem: 'Bem',
  em_flow: 'Em flow',
};

const moodOptions: { value: MoodLevel; label: string; color: string }[] = [
  { value: 'em_flow', label: 'Em flow', color: '#2274c5ff' },
  { value: 'bem', label: 'Bem', color: '#22c55e' },
  { value: 'ok', label: 'Ok', color: '#eab308' },          
  { value: 'cansado', label: 'Cansado', color: '#f97316' }, 
  { value: 'muito_sobrecarregado', label: 'Muito sobrecarregado', color: '#ef4444' }, 
];

const teamLabels: Record<TeamId, string> = {
  vermelha: 'Equipe vermelha',
  roxa: 'Equipe roxa',
  azul: 'Equipe azul',
};

const InvestmentsScreen: React.FC = () => {
  const [missionForm, setMissionForm] = useState<MissionForm>({
    memberName: '',
    team: null,
    label: '',
    points: '3',
  });

  const [moodForm, setMoodForm] = useState<MoodForm>({
    memberName: '',
    mood: 'ok',
    energy: '3',
    note: '',
  });

  const [totalMissions, setTotalMissions] = useState(0);
  const [lastMood, setLastMood] = useState<string | null>(null);
  const [teamDropdownOpen, setTeamDropdownOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const profile = await profileService.load();
      const name = profile?.name || '';

      setMissionForm(prev => ({ ...prev, memberName: name }));
      setMoodForm(prev => ({ ...prev, memberName: name }));

      const [missions, moods] = await Promise.all([
        flowworkStorage.loadMissions(),
        flowworkStorage.loadMoods(),
      ]);

      setTotalMissions(missions.length);
      if (moods.length > 0) {
        const last = moods[moods.length - 1];
        setLastMood(moodLabelMap[last.mood]);
      }
    })();
  }, []);

  const handleSaveMission = async () => {
    if (!missionForm.memberName.trim() || !missionForm.label.trim()) {
      Alert.alert('Validação', 'Preencha nome e descrição da missão.');
      return;
    }

    if (!missionForm.team) {
      Alert.alert('Validação', 'Selecione sua equipe antes de salvar.');
      return;
    }

    const points = Number(missionForm.points);
    if (Number.isNaN(points) || points <= 0) {
      Alert.alert('Validação', 'Informe um número de pontos válido.');
      return;
    }

    const updated = await flowworkStorage.addMission({
      memberName: missionForm.memberName.trim(),
      team: missionForm.team,
      label: missionForm.label.trim(),
      points,
    });

    setTotalMissions(updated.length);
    setMissionForm(prev => ({ ...prev, label: '' }));
    setTeamDropdownOpen(false);
  };

  const handleSaveMood = async () => {
    if (!moodForm.memberName.trim()) {
      Alert.alert('Validação', 'Preencha seu nome.');
      return;
    }

    const energy = Number(moodForm.energy);
    if (Number.isNaN(energy) || energy < 1 || energy > 5) {
      Alert.alert('Validação', 'Energia deve ser um número de 1 a 5.');
      return;
    }

    const updated = await flowworkStorage.addMood({
      memberName: moodForm.memberName.trim(),
      mood: moodForm.mood,
      energy,
      note: moodForm.note.trim() || undefined,
    });

    const last = updated[updated.length - 1];
    setLastMood(moodLabelMap[last.mood]);
    setMoodForm(prev => ({ ...prev, note: '' }));
  };

  const missionTeamText =
    missionForm.team != null ? teamLabels[missionForm.team] : 'Selecione sua equipe';

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <Title>Bem-estar & humor</Title>

        <SummaryContainer>
          <SummaryText>Missões concluídas: {totalMissions}</SummaryText>
          <SummaryText>
            Último humor registrado: {lastMood || 'nenhum ainda'}
          </SummaryText>
        </SummaryContainer>

        <Form>
          {/* CHECK-IN DE HUMOR */}
          <FormTitle>Check-in de humor & energia</FormTitle>

          <Row>
            <Input
              placeholder="Seu nome"
              value={moodForm.memberName}
              onChangeText={text => {
                setMoodForm(prev => ({ ...prev, memberName: text }));
                setMissionForm(prev => ({ ...prev, memberName: text }));
              }}
            />
          </Row>

          <MoodCard>
            {moodOptions.map(opt => {
              const selected = moodForm.mood === opt.value;
              return (
                <MoodOptionButton
                  key={opt.value}
                  selected={selected}
                  color={opt.color}
                  onPress={() =>
                    setMoodForm(prev => ({ ...prev, mood: opt.value }))
                  }
                >
                  <MoodOptionText selected={selected}>
                    {opt.label}
                  </MoodOptionText>
                </MoodOptionButton>
              );
            })}
          </MoodCard>

          <Row>
            <Input
              placeholder="Energia (1 a 5)"
              value={moodForm.energy}
              keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
              onChangeText={text =>
                setMoodForm(prev => ({ ...prev, energy: text }))
              }
            />
          </Row>

          <Row>
            <Input
              placeholder="Comentário opcional sobre seu dia"
              value={moodForm.note}
              onChangeText={text =>
                setMoodForm(prev => ({ ...prev, note: text }))
              }
            />
          </Row>

          <Row>
            <PrimaryBtn onPress={handleSaveMood}>
              <BtnText>Salvar check-in</BtnText>
            </PrimaryBtn>
          </Row>

          {/* MISSÕES DE BEM-ESTAR */}
          <FormTitle style={{ marginTop: 16 }}>
            Missões de bem-estar
          </FormTitle>

          <TeamLabel>Equipe</TeamLabel>

          <TeamSelectButton
            onPress={() => setTeamDropdownOpen(prev => !prev)}
          >
            <TeamSelectText placeholder={!missionForm.team}>
              {missionTeamText}
            </TeamSelectText>
          </TeamSelectButton>

          {teamDropdownOpen && (
            <TeamDropdown>
              {(['vermelha', 'roxa', 'azul'] as TeamId[]).map(team => (
                <TeamDropdownItem
                  key={team}
                  onPress={() => {
                    setMissionForm(prev => ({ ...prev, team }));
                    setTeamDropdownOpen(false);
                  }}
                >
                  <TeamDropdownItemText>
                    {teamLabels[team]}
                  </TeamDropdownItemText>
                </TeamDropdownItem>
              ))}
            </TeamDropdown>
          )}

          <Row>
            <Input
              placeholder="Missão (ex: pausa de 5 minutos)"
              value={missionForm.label}
              onChangeText={text =>
                setMissionForm(prev => ({ ...prev, label: text }))
              }
            />
          </Row>

          <Row>
            <Input
              placeholder="Pontos (ex: 3)"
              value={missionForm.points}
              keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
              onChangeText={text =>
                setMissionForm(prev => ({ ...prev, points: text }))
              }
            />
          </Row>

          <Row>
            <SecondaryBtn
              onPress={() =>
                setMissionForm(prev => ({ ...prev, label: '' }))
              }
            >
              <BtnTextLight>Limpar missão</BtnTextLight>
            </SecondaryBtn>
            <PrimaryBtn onPress={handleSaveMission}>
              <BtnText>Salvar missão</BtnText>
            </PrimaryBtn>
          </Row>
        </Form>
      </ScrollView>
    </Screen>
  );
};

export default InvestmentsScreen;
