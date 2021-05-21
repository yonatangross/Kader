import React from 'react';
import { View, Text, TouchableWithoutFeedback, Image, ImageStyle } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Divider } from '@ui-kitten/components';
import moment from 'moment';
import PostListItemComments from '../PostListItemComments';
import { getPostTypeName } from '../../types/PostType';

export interface PostListItemProps {
  post: any;
  key: string;
  showComments: boolean;
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
      post: props.post,
      id: props.post.postId,
      title: props.post.title,
    });
  };
  if (!!post) {
    return (
      <TouchableWithoutFeedback onPress={onClick}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.creatorImageAndRatingContainer}>
              <View style={styles.profileImageContainer}>
                <Image source={require('../../assets/images/imagePlaceholder.png')} style={styles.profileImage as ImageStyle} />
              </View>
              {/* <StarRating numOfStars={post.creator.rating} numOfRatings={post.creator.numberOfRatings} displayRatings={false} /> */}
            </View>
            <View style={styles.creatorCenterContainer}>
              <Text style={styles.PostedBy}>
                {post.creator.firstName} {post.creator.lastName}
              </Text>
              <Text style={styles.postTypeAndGroupNameText}>
                {getPostTypeName(post.type)} at {post.groupName}
              </Text>
              <Text style={styles.postDate}>{moment(post.created).toNow()}</Text>
            </View>
            <View style={styles.categoryContainer}>
              {post.category.imageUri !== undefined ? (
                <Image source={{ uri: post.category.imageUri }} style={styles.categoryIcon as ImageStyle} />
              ) : (
                <Image source={require('../../assets/images/categoryIcon.png')} style={styles.categoryIcon as ImageStyle} />
              )}
            </View>
          </View>
          <Divider style={{ marginHorizontal: 20 }} />
          <View style={styles.postDetailsContainer}>
            <View style={styles.imageContainer}>
              {post.image !== undefined ? (
                <Image source={{ uri: post.image }} style={styles.postImage as ImageStyle} />
              ) : (
                <Image source={require('../../assets/images/itemPlaceholder.png')} style={styles.postImage as ImageStyle} />
              )}
            </View>
            <View style={styles.titleAndDescriptionContainer}>
              <Text style={styles.titleText}>{post.title}</Text>
              <Text style={styles.descriptionText}>{post.description}</Text>
            </View>
          </View>
          {props.showComments === true ? (
            <PostListItemComments comments={post.comments} />
          ) : (
            <Text style={styles.commentNumber}>{post.commentsCount} comments</Text>
          )}
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
