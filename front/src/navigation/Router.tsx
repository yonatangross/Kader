import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';
import {useAuth} from '../contexts/Auth';
import LoadingIndicator from '../components/LoadingIndicator';

export default function Router({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const {authData, loading} = useAuth();

  if (loading) {
    return <LoadingIndicator />;
  }
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
