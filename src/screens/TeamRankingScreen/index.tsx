import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
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

const RecommendationScreen: React.FC = () => {
  const [ranking, setRanking] = useState<TeamRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    {},
  );

  const isFocused = useIsFocused();

  async function loadRanking() {
    setLoading(true);
    const data = await buildTeamRanking();
    setRanking(data);
    setLoading(false);
  }

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
          <ActivityIndicator color="#f1835d" />
        </Content>
      </Screen>
    );
  }

  return (
    <Screen>
      <Content>
        <Title>Ranking de equipes</Title>

        {ranking.map((teamRank, index) => {
          const isExpanded = !!expanded[teamRank.team];

          return (
            <Card key={teamRank.team}>
              <CardHeaderRow onPress={() => toggleTeam(teamRank.team)}>
                <CardHeaderLeft>
                  <CardHeaderTitle>
                    {index + 1}º lugar – {teamLabel[teamRank.team]}
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

export default RecommendationScreen;
