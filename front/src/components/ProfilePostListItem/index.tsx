import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { IPost } from '../../types/IPost';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import StarRating from '../StarRating/index';
import { useEffect } from 'react';
import { Avatar, Icon } from '@ui-kitten/components';
import moment from 'moment';

export interface ProfilePostListItemProps {
  post: IPost;
  key: string;
}

const ProfilePostListItem = (props: ProfilePostListItemProps) => {
  const { post: receivedPost } = props;
  const [post, setPost] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const navigation = useNavigation();

  useEffect(() => {
    let isMounted = true;
    if (!!receivedPost) {
      if (isMounted) {
        setPost(receivedPost);
        setLoading(false);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [props.post]);

  const onClick = () => {
    navigation.navigate('SinglePost', {
      id: props.post.postId,
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
              <Text style={styles.postDate}>{moment(post.created).fromNow()}</Text>
            </View>
          </View>
          <View style={styles.postDetailsContainer}>
            <Text>{post.description}</Text>
            <Text>{post.commentsCount}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  } else return <View>{loading ? <p>loading...</p> : <p>Fetched!!</p>}</View>;
};

export default ProfilePostListItem;
