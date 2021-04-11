import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, FlatList } from 'react-native';
import { IPost } from '../../types/IPost';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import StarRating from '../StarRating/index';
import { useEffect } from 'react';
import { Avatar, Divider, Icon } from '@ui-kitten/components';
import { getPost } from '../../services/posts';
import moment from 'moment';
import PostCommentItem from '../PostCommentItem';
import PostListItemComments from '../PostListItemComments';

export interface PostListItemProps {
  post: IPost;
}

const PostListItem = (props: PostListItemProps) => {
  const [post, setPost] = useState<any>();
  const navigation = useNavigation();

  useEffect(() => {
    let isMounted = true;
    getPost(props.post.postId)
      .then((response) => {
        if (isMounted) {
          setPost(response.data.post);
          console.log(`loaded post: ${props.post.postId}`);
        }
      })
      .catch((error) => console.log(error));
    return () => {
      isMounted = false;
    };
  }, [props.post]);

  const renderPostCommentItem = ({ item }: any) => {
    return <PostCommentItem comment={item} />;
  };

  const onClick = () => {
    navigation.navigate('SinglePost', {
      id: props.post.postId,
    });
  };
  if (post) {
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
                <Text style={styles.PostTitle}>{post.group.name}</Text>
              </View>
              <Text style={styles.postDate}>{moment(post.created).fromNow()}</Text>
            </View>
          </View>
          <View style={styles.postDetailsContainer}>
            <Text>{post.description}</Text>
            <PostListItemComments comments={post.comments} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  } else return <></>;
};

export default PostListItem;
