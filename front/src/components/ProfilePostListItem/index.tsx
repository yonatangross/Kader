import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { IPost } from '../../types/IPost';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import StarRating from '../StarRating/index';
import { useEffect } from 'react';
import { Avatar, Icon } from '@ui-kitten/components';
import moment from '../../services/moment';

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
          <View style={styles.PostTitleAndGroup}>
            <Text style={styles.PostTitle}>{post.title}</Text>
            <Icon style={styles.arrowIcon} name="arrow-right-outline" fill={'rgba(34, 83, 231)'} />
            <Text style={styles.PostTitle}>{post.groupName}</Text>
          </View>
          <Text style={styles.postDate}>{moment(post.created).fromNow()}</Text>
          <Text>{post.commentsCount} comments</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  } else
    return (
      <>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'row',
              padding: 10,
            }}
          >
            <ActivityIndicator size="large" color="#4975aa" />
          </View>
        ) : (
          <Text>Fetched!!</Text>
        )}
      </>
    );
};

export default ProfilePostListItem;
