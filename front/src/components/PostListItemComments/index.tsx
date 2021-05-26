import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './style';
import { Divider } from '@ui-kitten/components';
import PostCommentItemHolder from '../PostCommentItemHolder';
import { IComment } from '../../types/IComment';

export interface PostListItemCommentsProps {
  comments: IComment[];
  commentsInitialNumber: number;
}

const PostListItemComments = (props: PostListItemCommentsProps) => {
  const { comments, commentsInitialNumber } = props;

  const renderPostCommentItem = ({ item }: any) => {
    return <PostCommentItemHolder key={item.commentId} comment={item} dividerFlag={true} />;
  };

  if (props.comments.length) {
    return (
      <View>
        <Text style={styles.commentNumber}>{props.comments.length} comments</Text>
        <Divider />
        <FlatList
          data={comments.slice(0,commentsInitialNumber)}
          maxToRenderPerBatch={2}
          renderItem={renderPostCommentItem}
          keyExtractor={(item) => item.commentId}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  } else return <></>;
};

export default PostListItemComments;
