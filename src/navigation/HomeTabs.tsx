import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SimulationScreen from "../screens/MissionScreen";
import RecommendationScreen from "../screens/TeamRankingScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ClientsScreen from "../screens/WorkTasksScreen";
import InvestmentsScreen from "../screens/WellbeingScreen";

export type HomeTabParamList = {
  Missoes: undefined;
  Tarefas: undefined;
  BemEstar: undefined;
  Ranking: undefined;
  Perfil: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParamList>();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTransparent: true,
        headerTitle: "",
        headerRight: () => (
          <Image
            source={require("../assets/logo.png")}
            style={styles.headerLogo}
            resizeMode="contain"
          />
        ),
        headerRightContainerStyle: { paddingRight: 16 },

        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#eae8db",
        tabBarStyle: {
          backgroundColor: "#f1835d",
          borderTopWidth: 0,
          height: 56,
        },
        tabBarActiveBackgroundColor: "#ee5c2cff",
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 9,
        },

        tabBarIcon: () => null,
      })}
    >
      <Tab.Screen
        name="Missoes"
        component={SimulationScreen}
        options={{ title: "Missões" }}
      />
      <Tab.Screen
        name="Tarefas"
        component={ClientsScreen}
        options={{ title: "Tarefas" }}
      />
      <Tab.Screen
        name="BemEstar"
        component={InvestmentsScreen}
        options={{ title: "Bem-estar" }}
      />
      <Tab.Screen
        name="Ranking"
        component={RecommendationScreen}
        options={{ title: "Ranking" }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{ title: "Perfil" }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerLogo: {
    width: 32,
    height: 32,
  },
});
