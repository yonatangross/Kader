import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, Platform, KeyboardAvoidingView, LogBox, TouchableOpacity, View, RefreshControl } from 'react-native';
import { useFonts } from 'expo-font';
import InputBox from '../InputBox';
import PostCommentItemHolder from '../PostCommentItemHolder';
import { IComment } from '../../types/IComment';
import { useAuth } from '../../contexts/Auth';
import CommentActionsModal from '../CommentActionsModal';
import { getComments } from '../../services/comments';

export interface CommentsProps {
  comments: IComment[];
  postId: string;
  commentAdded: boolean;
  setCommentAdded: Function;
}

const SinglePostComments = (props: CommentsProps) => {
  const { comments: receivedComments, postId } = props;
  const auth = useAuth();
  const [visibleCommentActionModal, setVisibleCommentActionModal] = useState<boolean>(false);
  const [activeCommentIdOnModal, setActiveCommentIdOnModal] = useState<string>('');
  const [comments, setComments] = useState<IComment[]>(receivedComments);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  let [fontsLoaded] = useFonts({
    Rubik: require('../../assets/fonts/Rubik/Rubik-VariableFont_wght.ttf'),
  });

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getComments(props.postId)
      .then((response) => {
        const commentsResponse: IComment[] = response.data.commentViews;
        setComments(commentsResponse.reverse());
        setRefreshing(false);
        props.setCommentAdded(false);
      })
      .catch((error) => {
        setRefreshing(false);
        console.log(error);
      });
  }, [refreshing]);

  useEffect(() => {
    let mounted = true;
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    if (props.commentAdded) {
      onRefresh();
    }
    return () => {
      mounted = false;
    };
  }, [fontsLoaded, props.commentAdded, setVisibleCommentActionModal, refreshing, props.setCommentAdded]);

  const renderCommentListItem = ({ item }: { item: IComment; index: number }) => {
    const isOwner = item.creator.userId === auth.authData?.userId;
    if (isOwner)
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onLongPress={() => {
            setActiveCommentIdOnModal(item.commentId);
            setVisibleCommentActionModal(true);
            console.log(`pressed on ${item.commentId} long press, visible:${visibleCommentActionModal}`);
          }}
        >
          <PostCommentItemHolder comment={item} dividerFlag={true} />
        </TouchableOpacity>
      );
    else return <PostCommentItemHolder comment={item} dividerFlag={true} />;
  };

  if (fontsLoaded && !!comments) {
    return (
      <>
        <CommentActionsModal
          commentId={activeCommentIdOnModal}
          visible={visibleCommentActionModal}
          setVisible={setVisibleCommentActionModal}
          setPostUpdated={props.setCommentAdded}
        />
        <FlatList
          style={styles.commentsList}
          data={comments}
          renderItem={renderCommentListItem}
          keyExtractor={(item) => item.commentId}
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
          refreshControl={<RefreshControl enabled={true} refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </>
    );
  } else
    return (
      <>
        <Text>Error loading {postId} comments...</Text>
      </>
    );
};

const styles = StyleSheet.create({
  outerContainer: {},
  commentsContainer: { width: '100%', backgroundColor: 'transparent', flexDirection: 'column' },
  commentsList: {
    height: '30%',
    paddingTop: 0,
    width: '100%',
    paddingHorizontal: 15,
  },
  inputBoxContainer: {
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
  },
  viewContainer: {
    width: '100%',

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  commentsNumber: { alignSelf: 'flex-start', justifyContent: 'center', marginLeft: 5, fontWeight: 'bold', fontSize: 20 },
});

export default SinglePostComments;
