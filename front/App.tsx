import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Router from './src/navigation/Router';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AuthProvider } from './src/contexts/Auth';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <AuthProvider>
          <ApplicationProvider {...eva} theme={eva.light}>
            <SafeAreaProvider>
              <Router colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
          </ApplicationProvider>
        </AuthProvider>
      </>
    );
  }
}
