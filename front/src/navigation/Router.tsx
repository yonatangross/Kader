import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';
import {useAuth} from '../contexts/Auth';
import { Loading } from '../screens/Loading';

export default function Router({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const {authData, loading} = useAuth();

  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
