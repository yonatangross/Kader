import * as React from 'react';
import { StyleSheet } from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';

import { View } from '../components/Themed';
import UploadImage from '../components/UploadImage';
export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data.description, details);
        }}
        query={{
          key: 'AIzaSyDtlSYdojyjmTTwvSYaIP3N50n-OzrWcUg',
          language: 'en',
          components: 'country:il',
        }}
        currentLocation={true}
        currentLocationLabel="Current location"
        fetchDetails={true}
      />
      <UploadImage />
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
