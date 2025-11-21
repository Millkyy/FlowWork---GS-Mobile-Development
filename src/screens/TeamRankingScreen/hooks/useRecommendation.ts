import { useMemo } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { recommendations, RiskProfile } from '../models/recommendation';
import { HomeTabParamList } from '../../../navigation/HomeTabs';

type Nav = StackNavigationProp<HomeTabParamList, 'Recomendações'>;
type Route = RouteProp<HomeTabParamList, 'Recomendações'>;

export const useRecommendation = (route: Route, navigation: Nav) => {
  const profile = route.params?.profile as RiskProfile | undefined;

  const data = useMemo(() => (profile ? recommendations[profile] : []), [profile]);

  const goSimulation = () => navigation.navigate('Simulação');

  return { profile, data, goSimulation };
};
