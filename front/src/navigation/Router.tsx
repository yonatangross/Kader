import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { useAuth } from '../contexts/Auth';
import LoadingIndicator from '../components/LoadingIndicator';
import { createStackNavigator } from '@react-navigation/stack';
import { RouterStackParamList } from '../types/Tabs';

const Stack = createStackNavigator<RouterStackParamList>();

export default function Router({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { authData, loading } = useAuth();

  if (loading) {
    return <LoadingIndicator />;
  }
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {authData ? <Stack.Screen name="AppStack" component={AppStack} /> : <Stack.Screen name="AuthStack" component={AuthStack} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
