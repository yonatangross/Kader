import moment from '../../services/moment';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, ImageStyle } from 'react-native';
import { imageBaseUrl } from '../../services/axios';
import { IComment } from '../../types/IComment';
import { capitalize } from '../../utils/text';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

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
        <View style={styles.commenterContainer}>
          <View style={styles.profileImageContainer}>
            {!!comment.creator && !!comment.creator.imageUri ? (
              <Image source={{ uri: imageBaseUrl + comment.creator.imageUri }} style={styles.profileImage as ImageStyle} />
            ) : (
              <Image source={require('../../assets/images/celebrity.png')} style={styles.profileImage as ImageStyle} />
            )}
          </View>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.commenterName}>
            {capitalize(comment.creator.firstName)} {capitalize(comment.creator.lastName)}
          </Text>
          <View style={styles.commentInfoContainer}>
            <View style={styles.commentDetailsContainer}>
              <Text style={styles.commentContent}>{comment.content}</Text>
              <View style={styles.commentDateContainer}>
                <Text style={styles.commentDate}>{moment(comment.created).fromNow()}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  } else return <></>;
};

const styles = StyleSheet.create({
  dataContainer: { flexDirection: 'column', marginTop: -5, marginLeft: -2, width: '85%' },
  commentContainer: { flexDirection: 'row', width: '90%', marginTop: 15, marginBottom: 5, alignSelf: 'center' },
  commenterContainer: { flexDirection: 'column', marginTop: 0, width: '10%', marginLeft: 5 },
  commentDateContainer: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 3 },
  commentInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '80%',
    paddingHorizontal: 10,
    paddingBottom: 5,
    borderRadius: 30,
    borderTopLeftRadius: 0,
    backgroundColor: Colors.light.offColor,
    marginLeft: 10,
    marginRight: 5,
  },
  commentDetailsContainer: { flexDirection: 'column', marginTop: 10, flexShrink: 1, width: '95%' },
  commentContentContainer: { flexDirection: 'row' },
  commentContent: { flexShrink: 1, fontSize: Fonts.post.comments.comment.commentContentFontSize, marginBottom: 2 },
  commenterName: {
    fontWeight: Fonts.post.comments.comment.commenterNameFontWeight,
    fontSize: Fonts.post.comments.comment.commenterNameFontSize,
    marginLeft: 10,
    marginBottom: 2,
    alignSelf: 'flex-start',
  },
  commentDate: {
    alignSelf: 'flex-end',
    marginRight: 12,
    fontSize: Fonts.post.comments.comment.commentDateFontSize,
    color: 'grey',
  },
  editText: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: 'blue',
  },
  profileImageContainer: {
    alignSelf: 'center',
    marginVertical: 5,
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
    height: 40,
    width: 40,
    borderRadius: 100,
  },
});

export default PostCommentItem;
