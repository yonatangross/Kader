import * as React from 'react';
import { StyleSheet } from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';

import { View } from '../components/Themed';
import UploadImage from '../components/UploadImage';
export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: '#ecf0f1',
  },
});
