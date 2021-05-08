import { Avatar, ListItem } from '@ui-kitten/components';
import moment from 'moment';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { IComment } from '../../types/IComment';

export interface PostCommentItemProps {
  comment: IComment;
}

const PostCommentItem = (props: PostCommentItemProps) => {
  let { comment: comment } = props;
  return (
    <View style={styles.commentContainer}>
      <Avatar style={styles.profileAvatar} size="small" source={require('../../layouts/social/profile/assets/image-profile-1.jpg')} />
      <View style={styles.commentDetailsContainer}>
        <Text style={styles.commenterName}>
          {/* {comment.creator.firstName} {comment.creator.lastName} */}
          firstName lastName
        </Text>
        <View style={styles.commentContentContainer}>
          <Text style={styles.commentContent}>{comment.content}</Text>
        </View>
        <Text style={styles.commentDate}>{moment(comment.created).fromNow()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: { flexDirection: 'row', justifyContent: 'flex-start', margin: 5 },
  commentDetailsContainer: { flexDirection: 'column', marginLeft: 4, flexShrink: 1 },
  commentContentContainer: { flexDirection: 'row' },
  commentContent: { flexShrink: 1 },
  commenterName: {
    fontWeight: 'bold',
  },
  commentDate: {
    textAlign: 'left', //todo: change to right and fix spacing
    marginRight: 10,
    fontSize: 12,
    color: 'grey',
  },
  profileAvatar: {
    marginHorizontal: 2,
    paddingRight: 2,
  },
});

export default PostCommentItem;
