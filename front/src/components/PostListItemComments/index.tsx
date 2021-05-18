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
    return <PostCommentItem key={item.commentId} comment={item} />;
  };

  if (props.comments.length) {
    return (
      <View>
        <Text style={styles.commentNumber}>{props.comments.length} comments</Text>
        <Divider />
        <FlatList data={props.comments} maxToRenderPerBatch={2} renderItem={renderPostCommentItem} keyExtractor={(item) => item.commentId} showsVerticalScrollIndicator={false} />
      </View>
    );
  } else return <></>;
};

export default PostListItemComments;
