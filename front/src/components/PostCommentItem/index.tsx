import { Icon, ListItem } from '@ui-kitten/components';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IComment } from '../../types/IComment';

export interface PostCommentItemProps {
  comment: IComment;
}
const renderItemIcon = (props: any) => <Icon {...props} name="person" />;
const PostCommentItem = (props: PostCommentItemProps) => {
  let { comment: comment } = props;

  return <ListItem title={`${comment.content} ${comment.id}`} accessoryLeft={renderItemIcon} />;
};

const styles = StyleSheet.create({});

export default PostCommentItem;
