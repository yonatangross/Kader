import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, FlatList } from 'react-native';
import { Avatar, Divider, Text } from '@ui-kitten/components';
import { getPost } from '../services/posts';
import StarRating from '../components/StarRating/index';
const testImage = require('../assets/images/test.png');
import moment from 'moment';

import { IPost } from '../types/IPost';
import PostCommentItem from '../components/PostCommentItem';
import InputBox from '../components/InputBox';

export interface SinglePostScreenProps {}

const SinglePostScreen = (props: SinglePostScreenProps) => {
  const route = useRoute();
  const [post, setPost] = useState<IPost>();

  useEffect(() => {
    if (route.params) {
      const params: any = route.params;
      getPost(params.id)
        .then((response) => {
          const postResponse: IPost = response.data.post;
          setPost(postResponse);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  if (post) {
    return (
      <View>
        <Text style={styles.text} category="h1">
          {post.title}
        </Text>
        <Text style={styles.text} category="h2">
          {post.category}
        </Text>
        <Avatar style={styles.avatar} size="giant" source={require('../layouts/posts/singlePost/assets/image-profile.jpg')} />
        {/* <View style={styles.rating}>
          <StarRating numOfStars={post.creator.rating} numOfRatings={post.creator.numberOfRatings} />
        </View> */}
        <Text style={styles.text}>{moment(post.created).format('DD/MM/YYYY hh:mm')}</Text>
        <View style={styles.ImageContainer}>
          <Image style={styles.imageDesign} source={testImage} />
        </View>
        <Text style={styles.text}>Description: {post.description}</Text>
        <Divider />
        {/* {post.comments.length 0  ? } */}
        <FlatList
          style={styles.list}
          data={post.comments}
          renderItem={({ item: comment }) => <PostCommentItem comment={comment} />}
          keyExtractor={(item) => item.commentId}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.bottom}>
          <InputBox post={post} />
        </View>
      </View>
    );
  } else return <></>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 36,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    margin: 2,
    alignSelf: 'center',
  },
  rating: {},
  avatar: {
    margin: 8,
    alignSelf: 'center',
  },
  imageDesign: {
    width: 200,
    height: 100,
    borderRadius: 15,
  },
  ImageContainer: {
    padding: 5,
    alignItems: 'center',
  },
  list: {
    width: '100%',
  },
});

export default SinglePostScreen;
