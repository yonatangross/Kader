import { Divider } from '@ui-kitten/components';
import moment from '../../services/moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ImageStyle } from 'react-native';
import { imageBaseUrl } from '../../services/axios';
import { IComment } from '../../types/IComment';
import PostCommentItem from '../PostCommentItem';

export interface PostCommentItemHolderProps {
  comment: IComment;
  dividerFlag: boolean;
}

const PostCommentItemHolder = (props: PostCommentItemHolderProps) => {
  useEffect(() => {
    let mounted = true;

    return () => {
      mounted = false;
    };
  }, []);

  let { comment, dividerFlag } = props;

  if (!!comment && !!comment.creator) {
    return (
      <>
        <PostCommentItem comment={comment} />
        <View style={styles.commentItem}>{dividerFlag === true ? <Divider style={{ marginHorizontal: 20, width: '80%' }} /> : <></>}</View>
      </>
    );
  } else return <></>;
};

const styles = StyleSheet.create({


  commentItem:{
    flexDirection: 'column',
  }

});

export default PostCommentItemHolder;
