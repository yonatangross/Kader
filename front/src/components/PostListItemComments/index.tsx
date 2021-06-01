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
          style={{ backgroundColor: '#dedcdf', paddingBottom: 10 }}
        />
      </View>
    );
  } else
    return (
      <View style={{}}>
        <Text></Text>
      </View>
    );
};

export default PostListItemComments;
