import moment from '../../services/moment';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, ImageStyle } from 'react-native';
import { imageBaseUrl } from '../../services/axios';
import { IComment } from '../../types/IComment';

export interface PostCommentItemProps {
  comment: IComment;
}

const PostCommentItem = (props: PostCommentItemProps) => {
  useEffect(() => {
    let mounted = true;

    return () => {
      mounted = false;
    };
  }, []);

  let { comment } = props;

  if (!!comment && !!comment.creator) {
    return (
      <View style={styles.commentContainer}>
        <View style={styles.profileImageContainer}>
          {!!comment.creator && !!comment.creator.imageUri ? (
            <Image source={{ uri: imageBaseUrl + comment.creator.imageUri }} style={styles.profileImage as ImageStyle} />
          ) : (
            <Image source={require('../../assets/images/celebrity.png')} style={styles.profileImage as ImageStyle} />
          )}
        </View>
        <View style={styles.commentDetailsContainer}>
          <Text style={styles.commenterName}>
            {comment.creator.firstName} {comment.creator.lastName}
          </Text>
          <Text style={styles.commentContent}>{comment.content}</Text>

          <View style={styles.commentDataContainer}>
            <Text style={styles.commentDate}>{moment(comment.created).fromNow()}</Text>
          </View>
        </View>
      </View>
    );
  } else return <></>;
};

const styles = StyleSheet.create({
  commentDataContainer: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 3 },
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    borderRadius: 30,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  commentDetailsContainer: { flexDirection: 'column', marginTop: 10, flexShrink: 1, width: '95%' },
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
  editText: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: 'blue',
  },
  profileImageContainer: {
    marginHorizontal: 15,
    marginVertical: 18,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: 'black',
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
