import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { IPost } from '../../types/IPost';
import styles from './style';
const testImage = require('../../assets/images/test.png');
import StarRating from '../StarRating/index';
import { useNavigation } from '@react-navigation/native';

export interface DoubleListItemProps {
  post: IPost;
}

const DoubleListItem = (props: DoubleListItemProps) => {
  let { post: post } = props;

  const navigation = useNavigation();

  const onClick = () => {
    navigation.navigate('SinglePost', {
      id: post.id,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.MainContainer}>
        <View style={styles.container}>
          <Image style={styles.imageDesign} source={testImage} />
          <View style={styles.DetailsContainer}>
            <Text style={styles.username}>Looking for ice cream</Text>
            <Text style={styles.lastMessage}>Psted By: Diana Lanciano2</Text>
            <StarRating numOfStars={3} numOfRatings={4585} />
          </View>
        </View>
        <View style={styles.container}>
          <Image style={styles.imageDesign} source={testImage} />
          <View style={styles.DetailsContainer}>
            <Text style={styles.username}>Looking for ice cream</Text>
            <Text style={styles.lastMessage}>Psted By: Diana Lanciano2</Text>
            <StarRating numOfStars={3} numOfRatings={4585} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DoubleListItem;
