import { Avatar } from '@ui-kitten/components';
import moment from 'moment';
import React from 'react';
import { StyleSheet, View, Text, Image, ImageStyle } from 'react-native';
import { imageBaseUrl } from '../../services/axios';
import { IComment } from '../../types/IComment';

export interface PostCommentItemProps {
  comment: IComment;
}

const PostCommentItem = (props: PostCommentItemProps) => {
  let { comment } = props;

  if (!!comment && !!comment.creator) {
    return (
      <View style={styles.commentContainer}>
        <View style={styles.profileImageContainer}>
          {!!comment.creator && !!comment.creator.imageUri ? (
            <Image source={{ uri: imageBaseUrl + comment.creator.imageUri }} style={styles.profileImage as ImageStyle} />
          ) : (
            <Image source={require('../../assets/images/imagePlaceholder.png')} style={styles.profileImage as ImageStyle} />
          )}
        </View>
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
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 30,
    borderTopLeftRadius: 0,
  },
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
  profileImageContainer: {
    margin: 15,
    marginLeft: 45,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 10,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
  profileImage: {
    margin: 15,
    height: 50,
    width: 50,
    resizeMode: 'contain',
    borderRadius: 100,
  },
});

export default PostCommentItem;
