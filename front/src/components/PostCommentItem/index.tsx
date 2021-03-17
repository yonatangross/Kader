import { Avatar, Icon, ListItem } from '@ui-kitten/components';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IComment } from '../../types/IComment';

export interface PostCommentItemProps {
  comment: IComment;
}

const renderCommenterAvatar = () => (
  <Avatar style={styles.profileAvatar} size="small" source={require('../../layouts/social/profile/assets/image-profile-1.jpg')} />
);
const PostCommentItem = (props: PostCommentItemProps) => {
  let { comment: comment } = props;
  return <ListItem title={`${comment.content}\n ${comment.creator.firstName} ${comment.creator.lastName}`} accessoryLeft={renderCommenterAvatar} />;
};

const styles = StyleSheet.create({
  profileAvatar: {
    marginHorizontal: 8,
  },
});

export default PostCommentItem;
