import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './style';
import { Divider } from '@ui-kitten/components';
import PostCommentItem from '../PostCommentItem';

export interface PostListItemCommentsProps {
  comments: any;
}

const PostListItemComments = (props: PostListItemCommentsProps) => {
  const renderPostCommentItem = ({ item }: any) => {
    return <PostCommentItem comment={item} />;
  };

  if (props.comments.length) {
    return (
      <>
        {<Text style={styles.commentNumber}>{props.comments.length} comments</Text>}
        <Divider />
        <FlatList data={props.comments} renderItem={renderPostCommentItem} keyExtractor={(item) => item.commentId} showsVerticalScrollIndicator={false} />
      </>
    );
  } else return <></>;
};

export default PostListItemComments;
