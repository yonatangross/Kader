import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './style';
import { Divider } from '@ui-kitten/components';
import PostCommentItemHolder from '../PostCommentItemHolder';
import { IComment } from '../../types/IComment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

export interface PostListItemCommentsProps {
  comments: IComment[];
  commentsInitialNumber: number;
  postId: string;
}

const PostListItemComments = (props: PostListItemCommentsProps) => {
  const { comments, commentsInitialNumber, postId } = props;
  const navigation = useNavigation();

  const onPressLoadAllComments = () => {
    navigation.navigate('SinglePost', {
      id: postId,
    });
  };

  const renderPostCommentItem = ({ item }: any) => {
    return <PostCommentItemHolder key={item.commentId} comment={item} dividerFlag={true} />;
  };

  const renderLoadAllCommentsItem = () => {
    return (
      <TouchableOpacity onPress={onPressLoadAllComments} activeOpacity={0.7} style={styles.loadAllCommentsContainer}>
        <Text style={styles.loadAllCommentsText}>load all comments</Text>
      </TouchableOpacity>
    );
  };

  if (props.comments.length) {
    return (
      <View>
        <Text style={styles.commentNumber}>{props.comments.length} comments</Text>
        <Divider />
        <FlatList
          data={comments.slice(0, commentsInitialNumber)}
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
