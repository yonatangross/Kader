import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './style';

export interface ButtonItemProps {
  buttonContent: string;
  navigationString: string;
}

const CategoryButton = (props: ButtonItemProps) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate(props.navigationString);
  };


  const image = { uri: 'https://media.gettyimages.com/videos/abstract-smoke-fog-purple-ink-levitation-background-video-id1195295737?s=640x640' };
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <ImageBackground source={image} style={styles.image}>
          <Text style={styles.text}>{props.buttonContent}</Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryButton;
