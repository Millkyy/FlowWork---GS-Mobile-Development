import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator, { RootStackParamList } from './src/navigation/AppNavigator';

export default function App() {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList|null>(null);

 
  useEffect(() => {
    (async () => {
      const creds = await AsyncStorage.getItem('userCredentials');
      setInitialRoute(creds ? 'Login' : 'Signup');
    })();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator initialRouteName={initialRoute} />
    </NavigationContainer>
  );
}