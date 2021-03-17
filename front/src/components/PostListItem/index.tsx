import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { IPost } from '../../types/IPost';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
const testImage = require('../../assets/images/test.png');
import StarRating from '../StarRating/index';

export interface PostListItemProps {
  post: IPost;
}

const PostListItem = (props: PostListItemProps) => {
  let { post: post } = props;

  const navigation = useNavigation();

  const onClick = () => {
    navigation.navigate('SinglePost', {
      id: post.id,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.ImageContainer}>
          <Image style={styles.imageDesign} source={testImage} />
        </View>
        <View style={styles.DetailsContainer}>
          <Text style={styles.PostTitle}>Looking for ice cream</Text>
          <Text style={styles.PostedBy}>Posted By: Diana Lanciano</Text>
          <StarRating numOfStars={3} numOfRatings={4585} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PostListItem;
