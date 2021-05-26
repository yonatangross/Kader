import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export interface LoadingIndicatorProps {
}

const LoadingIndicator = (props: LoadingIndicatorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loading great things...</Text>
      <ActivityIndicator size="large" color="white" />
      <StatusBar style="auto" />
    </View>
  );
};

export default LoadingIndicator;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4975aa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    margin: 20,
  },
});
