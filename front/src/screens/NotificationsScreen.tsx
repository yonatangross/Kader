import * as React from 'react';
import { useEffect } from 'react';
import { Button, Platform, StyleSheet, Image, Alert } from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { View } from '../components/Themed';
import { useState } from 'react';
export default function NotificationsScreen() {
  const [image, setImage] = useState<any>(null);

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!data.cancelled) {
        setImage(data);
      }
    } else {
      Alert.alert('you need to give up permission to work');
    }
  };
  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!data.cancelled) {
        setImage(data);
      }
    } else {
      Alert.alert('you need to give up permission to work');
    }
  };

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
      <Button title="pick from camera" onPress={() => pickFromCamera()}>
        camera
      </Button>
      <Button title="pick from gallery" onPress={() => pickFromGallery()}>
        gallery
      </Button>
      {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
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
