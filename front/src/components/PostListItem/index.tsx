import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { IPost } from '../../types/IPost';
import styles from './style';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

export interface PostListItemProps {
  post: IPost;
}

const PostListItem = (props: PostListItemProps) => {
  const { post: post } = props;

  const navigation = useNavigation();

  const user = post.creator;

  const onClick = () => {
    navigation.navigate('postPage', {
      id: post.id,
      creator: post.creator,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avatar} />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.firstName + ' ' + user.lastName}</Text>
            <Text numberOfLines={2} style={styles.lastMessage}>
              {post.title}
            </Text>
          </View>
        </View>
        <Text style={styles.time}>{moment(post.updatedAt).format('DD/MM/YYYY hh:mm:ss')}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PostListItem;
