import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
  Screen,
  Content,
  Title,
  Card,
  CardHeaderRow,
  CardHeaderLeft,
  CardHeaderTitle,
  CardHeaderSubtitle,
  CardHeaderToggle,
  CardDesc,
} from './styles';
import {
  buildTeamRanking,
  TeamRanking,
} from '../../domain/flowwork';

const teamLabel: Record<string, string> = {
  vermelha: 'Equipe vermelha',
  roxa: 'Equipe roxa',
  azul: 'Equipe azul',
};

const TeamRankingScreen: React.FC = () => {
  const [ranking, setRanking] = useState<TeamRanking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<
    Record<string, boolean>
  >({});
  const isFocused = useIsFocused();

  const loadRanking = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await buildTeamRanking();

      const sorted = [...data].sort(
        (a, b) => b.totalPoints - a.totalPoints,
      );

      setRanking(sorted);
    } catch (e) {
      console.error(e);
      setError('Não foi possível carregar o ranking.');
      setRanking([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadRanking();
    }
  }, [isFocused]);

  const toggleTeam = (team: string) => {
    setExpanded((prev) => ({
      ...prev,
      [team]: !prev[team],
    }));
  };

  if (loading) {
    return (
      <Screen>
        <Content>
          <ActivityIndicator color="#f97316" />
        </Content>
      </Screen>
    );
  }

  return (
    <Screen>
      <Content>
        <Title>Ranking de equipes</Title>

        {error && (
          <Text style={{ color: '#b91c1c', marginBottom: 8 }}>
            {error}
          </Text>
        )}

        {ranking.map((teamRank, index) => {
          const isExpanded = !!expanded[teamRank.team];

          return (
            <Card key={teamRank.team}>
              <CardHeaderRow
                onPress={() => toggleTeam(teamRank.team)}
              >
                <CardHeaderLeft>
                  <CardHeaderTitle>
                    {index + 1}º lugar –{' '}
                    {teamLabel[teamRank.team]}
                  </CardHeaderTitle>
                  <CardHeaderSubtitle>
                    {teamRank.totalPoints} pontos totais
                  </CardHeaderSubtitle>
                </CardHeaderLeft>

                <CardHeaderToggle>
                  {isExpanded ? '▲' : '▼'}
                </CardHeaderToggle>
              </CardHeaderRow>

              {isExpanded && (
                <>
                  {teamRank.contributions.length === 0 ? (
                    <CardDesc>
                      Nenhuma contribuição registrada ainda.
                    </CardDesc>
                  ) : (
                    teamRank.contributions.map((c) => (
                      <CardDesc key={c.id}>
                        {c.memberName} • {c.description} • +
                        {c.points} pts
                      </CardDesc>
                    ))
                  )}
                </>
              )}
            </Card>
          );
        })}
      </Content>
    </Screen>
  );
};

export default TeamRankingScreen;
