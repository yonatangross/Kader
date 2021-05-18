import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { IPost } from '../../types/IPost';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import StarRating from '../StarRating/index';
import { useEffect } from 'react';
import { Avatar, Icon } from '@ui-kitten/components';
import moment from 'moment';
import PostListItemComments from '../PostListItemComments';

export interface PostListItemProps {
  post: IPost;
  key: string;
}

const PostListItem = (props: PostListItemProps) => {
  const { post } = props;
  const navigation = useNavigation();

  useEffect(() => {
    let isMounted = true;
    if (!!post) {
      if (isMounted) {
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const onClick = () => {
    navigation.navigate('SinglePost', {
      id: props.post.postId,
      title: props.post.title,
    });
  };
  if (!!post) {
    return (
      <TouchableWithoutFeedback onPress={onClick}>
        <View style={styles.container}>
          <View style={styles.postHeader}>
            <View style={styles.PostCreatorDetailsContainer}>
              <Avatar style={styles.profileAvatar} size="large" source={require('../../layouts/social/profile/assets/image-profile-1.jpg')} />
              <Text style={styles.PostedBy}>
                {post.creator.firstName} {post.creator.lastName}
              </Text>
              <StarRating numOfStars={post.creator.rating} numOfRatings={post.creator.numberOfRatings} displayRatings={false} />
            </View>
            <View style={styles.postHeaderDetails}>
              <View style={styles.PostTitleAndGroup}>
                <Text style={styles.PostTitle}>{post.title}</Text>
                <Icon style={styles.arrowIcon} name="arrow-right-outline" fill={'rgba(34, 83, 231)'} />
                <Text style={styles.PostTitle}>{post.groupName}</Text>
              </View>
              <Text style={styles.postDate}>{moment(post.created).toNow()}</Text>
            </View>
          </View>
          <View style={styles.postDetailsContainer}>
            <Text>{post.description}</Text>
            <PostListItemComments comments={post.comments} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  } else
    return (
      <TouchableWithoutFeedback onPress={onClick}>
        <View style={styles.container}>
          <Text>Loading post...</Text>
        </View>
      </TouchableWithoutFeedback>
    );
};

export default PostListItem;
