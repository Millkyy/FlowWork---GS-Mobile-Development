import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  ListRenderItem,
  Platform,
} from 'react-native';
import {
  Screen,
  Title,
  Row,
  Input,
  PrimaryBtn,
  SecondaryBtn,
  DeleteBtn,
  BtnText,
  BtnTextLight,
  Card,
  CardTitle,
  CardSubtitle,
  Form,
  FormTitle,
  TeamLabel,
  TeamSelectButton,
  TeamSelectText,
  TeamDropdown,
  TeamDropdownItem,
  TeamDropdownItemText,
} from './styles';
import {
  flowworkStorage,
  WorkTask,
  TeamId,
} from '../../domain/flowwork';
import { profileService } from '../ProfileScreen/services/profileService';

type TaskForm = {
  memberName: string;
  team: TeamId | null;
  description: string;
  points: string;
};

const teamLabels: Record<TeamId, string> = {
  vermelha: 'Equipe vermelha',
  roxa: 'Equipe roxa',
  azul: 'Equipe azul',
};

const defaultForm: TaskForm = {
  memberName: '',
  team: null,
  description: '',
  points: '',
};

const ClientsScreen: React.FC = () => {
  const [tasks, setTasks] = useState<WorkTask[]>([]);
  const [form, setForm] = useState<TaskForm>(defaultForm);
  const [teamDropdownOpen, setTeamDropdownOpen] = useState(false);
  const [currentUserName, setCurrentUserName] = useState('');

  useEffect(() => {
    (async () => {
      const [profile, storedTasks] = await Promise.all([
        profileService.load(),
        flowworkStorage.loadTasks(),
      ]);

      const rawProfileName = profile?.name?.trim();

      const isDefaultUserName =
        rawProfileName &&
        ['usuário', 'usuario'].includes(
          rawProfileName.toLowerCase(),
        );

      let bestName = !isDefaultUserName ? rawProfileName || '' : '';

      if (!bestName) {
        const lastTaskWithName = [...storedTasks]
          .reverse()
          .find(
            (t) =>
              t.memberName &&
              t.memberName.trim().length > 0,
          );

        bestName = lastTaskWithName?.memberName?.trim() || '';
      }

      setCurrentUserName(bestName);
      setForm((prev) => ({
        ...prev,
        memberName: bestName || prev.memberName,
      }));
      setTasks(storedTasks);
    })();
  }, []);

  const canDeleteTask = (task: WorkTask) => {
    if (!currentUserName || !task.memberName) return false;

    return (
      task.memberName.trim().toLowerCase() ===
      currentUserName.trim().toLowerCase()
    );
  };

  const handleSave = async () => {
    if (
      !form.memberName.trim() ||
      !form.description.trim() ||
      !form.points.trim()
    ) {
      Alert.alert(
        'Validação',
        'Preencha nome, descrição e pontos.',
      );
      return;
    }

    if (!form.team) {
      Alert.alert(
        'Validação',
        'Selecione sua equipe antes de salvar.',
      );
      return;
    }

    const points = Number(form.points);
    if (Number.isNaN(points) || points <= 0) {
      Alert.alert(
        'Validação',
        'Informe um número de pontos válido.',
      );
      return;
    }

    const memberName = form.memberName.trim();
    const newTasks = await flowworkStorage.addTask({
      memberName,
      team: form.team,
      description: form.description.trim(),
      points,
    });

    setTasks(newTasks);
    setCurrentUserName(memberName);
    setForm((prev) => ({
      ...prev,
      memberName,
      description: '',
      points: '',
    }));
    setTeamDropdownOpen(false);
  };

  const handleClear = () => {
    setForm((prev) => ({
      ...prev,
      description: '',
      points: '',
    }));
  };

  const handleDelete = async (task: WorkTask) => {
    if (!canDeleteTask(task)) {
      return;
    }

    const updated = tasks.filter((t) => t.id !== task.id);
    setTasks(updated);
    await flowworkStorage.saveTasks(updated);
  };

  const renderItem: ListRenderItem<WorkTask> = ({ item }) => (
    <Card>
      <CardTitle>{item.description}</CardTitle>
      <CardSubtitle>
        {item.memberName} • {teamLabels[item.team]} •{' '}
        {item.points} pts
      </CardSubtitle>

      {canDeleteTask(item) && (
        <DeleteBtn onPress={() => handleDelete(item)}>
          <BtnTextLight>Excluir</BtnTextLight>
        </DeleteBtn>
      )}
    </Card>
  );

  const teamText =
    form.team != null ? teamLabels[form.team] : 'Selecione sua equipe';

  return (
    <Screen>
      <Title>Tarefas de trabalho</Title>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 220 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Card>
            <CardSubtitle>
              Nenhuma tarefa registrada ainda. Use o formulário
              abaixo para começar.
            </CardSubtitle>
          </Card>
        }
      />

      <Form>
        <FormTitle>Registrar tarefa</FormTitle>

        <Row>
          <Input
            placeholder="Seu nome"
            value={form.memberName}
            onChangeText={(text) =>
              setForm((prev) => ({
                ...prev,
                memberName: text,
              }))
            }
          />
        </Row>

        <TeamLabel>Equipe</TeamLabel>
        <TeamSelectButton
          onPress={() =>
            setTeamDropdownOpen((prev) => !prev)
          }
        >
          <TeamSelectText placeholder={!form.team}>
            {teamText}
          </TeamSelectText>
        </TeamSelectButton>

        {teamDropdownOpen && (
          <TeamDropdown>
            {(['vermelha', 'roxa', 'azul'] as TeamId[]).map(
              (team) => (
                <TeamDropdownItem
                  key={team}
                  onPress={() => {
                    setForm((prev) => ({
                      ...prev,
                      team,
                    }));
                    setTeamDropdownOpen(false);
                  }}
                >
                  <TeamDropdownItemText>
                    {teamLabels[team]}
                  </TeamDropdownItemText>
                </TeamDropdownItem>
              ),
            )}
          </TeamDropdown>
        )}

        <Row>
          <Input
            placeholder="O que foi feito? (ex: resolveu ticket)"
            value={form.description}
            onChangeText={(text) =>
              setForm((prev) => ({
                ...prev,
                description: text,
              }))
            }
          />
        </Row>

        <Row>
          <Input
            placeholder="Pontos (ex: 7)"
            value={form.points}
            keyboardType={
              Platform.OS === 'android'
                ? 'numeric'
                : 'number-pad'
            }
            onChangeText={(text) =>
              setForm((prev) => ({
                ...prev,
                points: text,
              }))
            }
          />
        </Row>

        <Row>
          <SecondaryBtn onPress={handleClear}>
            <BtnTextLight>Limpar</BtnTextLight>
          </SecondaryBtn>
          <PrimaryBtn onPress={handleSave}>
            <BtnText>Salvar</BtnText>
          </PrimaryBtn>
        </Row>
      </Form>
    </Screen>
  );
};

export default ClientsScreen;
