import React, { useState } from 'react';
import { Button, Image, Alert, TouchableOpacity, FlatList } from 'react-native';
import { View } from '../Themed';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import styles from './style';
export interface UploadImageProps {
  postImage: any;
  setPostImage: Function;
}

const UploadImage = (props: UploadImageProps) => {
  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY_WRITE_ONLY);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!data.cancelled) {
        props.setPostImage({ localUri: data.uri });
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
        console.log('uploaded photo:');

        console.log(data);

        props.setPostImage({ localUri: data.uri });
      }
    } else {
      Alert.alert('you need to give up permission to work');
    }
  };

  return (
    <View style={styles.container}>
      {!!props.postImage ? (
        <Image source={{ uri: props.postImage.localUri }} style={{ width: 200, height: 200, resizeMode: 'contain', display: 'flex' }} />
      ) : null}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          pickFromCamera();
        }}
        style={styles.uploadFromCameraButton}
      >
        <Image source={require('../../assets/images/camera.png')} style={styles.floatingButtonStyle} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          pickFromGallery();
        }}
        style={styles.uploadFromGalleryButton}
      >
        <Image source={require('../../assets/images/gallery.png')} style={styles.floatingButtonStyle} />
      </TouchableOpacity>
    </View>
  );
};

export default UploadImage;
