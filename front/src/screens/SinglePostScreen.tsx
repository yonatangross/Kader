import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, FlatList } from 'react-native';
import { Avatar, Divider, Text } from '@ui-kitten/components';
import { getPost } from '../api/posts';
import StarRating from '../components/StarRating/index';
const testImage = require('../assets/images/test.png');

import { IPost } from '../types/IPost';
import { IComment } from '../types/IComment';
import PostCommentItem from '../components/PostCommentItem';
import InputBox from '../components/InputBox';

export interface SinglePostPageProps {
  post: IPost;
}

const SinglePostScreen = (props: SinglePostPageProps) => {
  const route = useRoute();
  const [post, setPost] = useState<IPost>();

  let arr: IComment[] = [];
  for (let index = 0; index < 5; index++) {
    arr.push({
      id: index.toString(),
      content: `i'm a comment ${index}`,
    });
  }

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
      <View style={styles.ImageContainer}>
        <Image style={styles.imageDesign} source={testImage} />
      </View>
      <Divider />
      <FlatList
        style={styles.list}
        data={arr}
        renderItem={({ item: comment }) => <PostCommentItem comment={comment} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <InputBox />
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
  imageDesign: {
    width: 200,
    height: 100,
    borderRadius: 15,
  },
  ImageContainer: {
    padding: 5,
    alignItems: 'flex-start',
  },
  list: {
    width: '100%',
  },
});
export default SinglePostScreen;
