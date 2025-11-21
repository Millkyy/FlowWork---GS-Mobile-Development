import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeTabs from './HomeTabs';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  Profile: undefined;
};

type AppNavigatorProps = {
  initialRouteName: keyof RootStackParamList;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator({ initialRouteName }: AppNavigatorProps) {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeTabs} />
    </Stack.Navigator>
  );
}
