import { Avatar, Divider, ListItem } from '@ui-kitten/components';
import moment from 'moment';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { IComment } from '../../types/IComment';

export interface PostCommentItemProps {
  comment: IComment;
}

const PostCommentItem = (props: PostCommentItemProps) => {
  let { comment } = props;

  if (!!comment && !!comment.creator) {
    return (
      <View style={styles.commentContainer}>
        <Avatar style={styles.profileAvatar} size="small" source={require('../../layouts/social/profile/assets/image-profile-1.jpg')} />
        <View style={styles.commentDetailsContainer}>
          <Text style={styles.commenterName}>
            {comment.creator.firstName} {comment.creator.lastName}
          </Text>
          <Text style={styles.commentContent}>{comment.content}</Text>
          <Text style={styles.commentDate}>{moment(comment.created).fromNow()}</Text>
        </View>
      </View>
    );
  } else return <></>;
};

const styles = StyleSheet.create({
  commentContainer: { flexDirection: 'row', justifyContent: 'flex-start', padding:10,margin: 5, backgroundColor: 'white', borderRadius: 30, borderTopLeftRadius: 0 },
  commentDetailsContainer: { flexDirection: 'column', marginLeft: 4, flexShrink: 1, width: '95%' },
  commentContentContainer: { flexDirection: 'row' },
  commentContent: { flexShrink: 1 },
  commenterName: {
    fontWeight: 'bold',
  },
  commentDate: {
    alignSelf: 'flex-end',
    marginRight: 10,
    fontSize: 12,
    color: 'grey',
  },
  profileAvatar: {
    marginHorizontal: 2,
    padding: 10,
  },
});

export default PostCommentItem;
