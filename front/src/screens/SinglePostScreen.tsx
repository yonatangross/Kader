import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text } from '@ui-kitten/components';
import { getPost } from '../api/posts';
import ImagesCarusel from '../components/CaruselItem';
import StarRating from '../components/StarRating/index';

import { IPost } from '../types/IPost';

export interface SinglePostPageProps {
  post: IPost;
}

const SinglePostScreen = (props: SinglePostPageProps) => {
  const route = useRoute();
  const [post, setPost] = useState<IPost>();

  useEffect(() => {
    //@ts-ignore
    getPost(post?.id).then((post: IPost) => {
      setPost(post);
    });
  }, [post]);

  return (
    <View>
      <Text style={styles.text} category="h1">
        Post title
      </Text>
      <Text style={styles.text} category="h2">
        Category
      </Text>
      <Avatar style={styles.avatar} size="giant" source={require('../layouts/posts/singlePost/assets/image-profile.jpg')} />
      <StarRating numOfStars={4.5} numOfRatings={20} />
      <Text>{Date()}</Text>
      <Text>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    margin: 2,
  },
  avatar: {
    margin: 8,
  },
});
export default SinglePostScreen;
