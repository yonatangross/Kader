import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getPost } from '../api/posts';
import ImagesCarusel from '../components/CaruselItem';
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
      <Text>dsfsdfsdf</Text>
    </View>
  );
};

export default SinglePostScreen;
