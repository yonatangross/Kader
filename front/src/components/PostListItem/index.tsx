import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { IPost } from '../../types/IPost';
import styles from './style';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { PostType } from '../../types/PostType';

export interface PostListItemProps {
  post: IPost
}

const PostListItem = (props: PostListItemProps) => {
  let { post: post } = props;
 

  const navigation = useNavigation();
  //console.log(post);
  //const user = post.creator;

  const onClick = () => {
    navigation.navigate('postPage', {
      // id: post.id,
      // creator: post.creator,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          {/* <Image source={require('front\src\assets\images\favicon.png') } style={styles.avatar} /> */}
          <View style={styles.midContainer}>
            <Text style={styles.username}>Diana</Text>
            <Text numberOfLines={2} style={styles.lastMessage}>
             יונתן
            </Text>
          </View>
        </View>
        {/* <Text style={styles.time}>{moment(post.updatedAt).format('DD/MM/YYYY hh:mm:ss')}</Text> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PostListItem;
