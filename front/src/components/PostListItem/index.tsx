import React, { useState } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, FlatList } from 'react-native';
import { IPost } from '../../types/IPost';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import StarRating from '../StarRating/index';
import { useEffect } from 'react';
import { Avatar, Divider } from '@ui-kitten/components';
import { getPost } from '../../api/posts';
import moment from 'moment';
import PostCommentItem from '../PostCommentItem';

export interface PostListItemProps {
  post: IPost;
}

const PostListItem = (props: PostListItemProps) => {
  const [post, setPost] = useState<any>();
  let { post: postFromProps } = props;

  const navigation = useNavigation();

  useEffect(() => {
    getPost(postFromProps.postId)
      .then((response) => {
        setPost(response.data.post);
      })
      .catch((error) => console.log(error));
  }, []);

  const onClick = () => {
    navigation.navigate('SinglePost', {
      id: postFromProps.postId,
    });
  };
  if (post) {
    return (
      <TouchableWithoutFeedback onPress={onClick}>
        <View style={styles.container}>
          <Avatar style={styles.profileAvatar} size="large" source={require('../../layouts/social/profile/assets/image-profile-1.jpg')} />
          <View style={styles.DetailsContainer}>
            <Text style={styles.PostTitle}>{post.title}</Text>
            <Text>{moment(post.created).format('DD/MM/YYYY hh:mm')}</Text>
            <Text style={styles.PostedBy}>
              Posted by: {post.creator.firstName} {post.creator.lastName}
            </Text>
            <StarRating numOfStars={post.creator.rating} numOfRatings={post.creator.numberOfRatings} />
            <Text style={styles.PostTitle}>{post.group.name}</Text>
            {post.comments.length > 0 ? <Text style={styles.commentNumber}>{post.comments.length} comments</Text> : <></>}
            <Divider />
            <FlatList
              data={post.comments}
              renderItem={({ item: comment }) => <PostCommentItem comment={comment} />}
              keyExtractor={(item) => item.commentId}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  } else return <></>;
};

export default PostListItem;
