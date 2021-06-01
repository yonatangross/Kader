import React from 'react';
import { View, Text, TouchableWithoutFeedback, Image, ImageStyle } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Divider } from '@ui-kitten/components';
import moment from '../../services/moment';
import PostListItemComments from '../PostListItemComments';
import { getPostTypeName } from '../../types/PostType';
import { imageBaseUrl } from '../../services/axios';
import { IPost } from '../../types/IPost';
import { ICategory } from '../../types/ICategory';
import { capitalize } from '../../utils/text';
export interface PostListItemProps {
  post: IPost;
  key: string;
  showComments: boolean;
  groupName?: string;
  groupCategory?: ICategory;
}

const PostListItem = (props: PostListItemProps) => {
  const { post, groupName, groupCategory } = props;
  const navigation = useNavigation();

  useEffect(() => {
    return () => {};
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
                {!!post.creator && !!post.creator.imageUri ? (
                  <Image source={{ uri: imageBaseUrl + post.creator.imageUri }} style={styles.profileImage as ImageStyle} />
                ) : (
                  <Image source={require('../../assets/images/celebrity.png')} style={styles.profileImage as ImageStyle} />
                )}
              </View>
              {/* <StarRating numOfStars={post.creator.rating} numOfRatings={post.creator.numberOfRatings} displayRatings={false} /> */}
            </View>
            <View style={styles.creatorCenterContainer}>
              <Text style={styles.PostedBy}>
                {capitalize(post.creator.firstName)} {capitalize(post.creator.lastName)}
              </Text>
              <Text style={styles.postTypeAndGroupNameText}>
                {getPostTypeName(post.type)} {moment(post.created).fromNow(false)}
              </Text>
              <Text style={styles.groupText}>{groupName}</Text>
            </View>
            <View style={styles.categoryContainer}>
              {!!post.category && !!post.category.imageUri ? (
                <Image source={{ uri: imageBaseUrl + post.category.imageUri }} style={styles.categoryIcon as ImageStyle} />
              ) : (
                <Image source={require('../../assets/images/categoryIcon.png')} style={styles.categoryIcon as ImageStyle} />
              )}
            </View>
          </View>
          <Divider style={{ marginHorizontal: 20 }} />
          <View style={styles.postDetailsContainer}>
            <View style={styles.postImageContainer}>
              {!!post.imagesUri && post.imagesUri.length >= 1 ? (
                <Image source={{ uri: imageBaseUrl + post.imagesUri[0] }} style={styles.postImage as ImageStyle} />
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
            <PostListItemComments comments={post.comments} commentsInitialNumber={2} postId={post.postId} />
          ) : (
            <View style={styles.hideCommentsContainer}>
              <Text style={styles.commentNumber}>{post.commentsCount} comments</Text>
            </View>
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
