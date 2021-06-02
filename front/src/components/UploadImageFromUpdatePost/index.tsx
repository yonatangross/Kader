import React, { useEffect, useState } from 'react';
import { Button, Image, Alert, TouchableOpacity, FlatList, ImageStyle } from 'react-native';
import { View } from '../Themed';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import styles from './style';
import { baseUrl, imageBaseUrl } from '../../services/axios';
export interface UploadImageFromUpdatePostProps {
  postImage: any;
  setPostImage: Function;
  setFieldValue: Function;
  oldPostImage: any;
  setOldPostImage: Function;
}

const UploadImageFromUpdatePost = (props: UploadImageFromUpdatePostProps) => {
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
        props.setPostImage(data);
        props.setFieldValue('image', data);
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
        props.setPostImage(data);
        props.setFieldValue('image', data);
      }
    } else {
      Alert.alert('you need to give up permission to work');
    }
  };

  useEffect(() => {
    console.log(`from uploadimagefromupadted`);
    console.log(props.oldPostImage);
    console.log(props.postImage);

    return () => {};
  }, [props.setPostImage, props.setOldPostImage, props.oldPostImage]);

  return (
    <View style={styles.container}>
      {!!props.postImage ? (
        <View style={styles.postImageContainer}>
          <Image source={props.postImage} style={styles.postImage as ImageStyle} />
        </View>
      ) : (
        <View style={styles.postImageContainer}>
          <Image source={{ uri: imageBaseUrl + props.oldPostImage }} style={styles.postImage as ImageStyle} />
        </View>
      )}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            pickFromCamera();
          }}
          style={styles.buttonContainer}
        >
          <Image source={require('../../assets/images/camera.png')} style={styles.floatingButtonStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            pickFromGallery();
          }}
          style={styles.buttonContainer}
        >
          <Image source={require('../../assets/images/gallery.png')} style={styles.floatingButtonStyle} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UploadImageFromUpdatePost;
