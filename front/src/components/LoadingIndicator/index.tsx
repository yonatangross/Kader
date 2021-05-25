import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export interface LoadingIndicatorProps {
}

const LoadingIndicator = (props: LoadingIndicatorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanning For Viruses...</Text>
      <ActivityIndicator size="large" color="white" />
      <StatusBar style="auto" />
    </View>
  );
};

export default LoadingIndicator;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#623FA0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    margin: 20,
  },
});
