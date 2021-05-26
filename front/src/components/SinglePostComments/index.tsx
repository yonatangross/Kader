import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, Platform, KeyboardAvoidingView, LogBox, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';
import InputBox from '../InputBox';
import PostCommentItemHolder from '../PostCommentItemHolder';
import { IComment } from '../../types/IComment';
import { useAuth } from '../../contexts/Auth';
import CommentActionsModal from '../CommentActionsModal';

export interface CommentsProps {
  comments: IComment[];
  postId: string;
  postUpdated: boolean;
  setPostUpdated: Function;
}

const SinglePostComments = (props: CommentsProps) => {
  const auth = useAuth();
  const [visibleCommentActionModal, setVisibleCommentActionModal] = useState<boolean>(false);
  const [activeCommentIdOnModal, setActiveCommentIdOnModal] = useState<string>('');

  const { comments, postId } = props;
  let [fontsLoaded] = useFonts({
    Rubik: require('../../assets/fonts/Rubik/Rubik-VariableFont_wght.ttf'),
  });

  useEffect(() => {
    let mounted = true;
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    return () => {
      mounted = false;
    };
  }, [fontsLoaded, props.postUpdated, props.setPostUpdated, setVisibleCommentActionModal]);

  const renderCommentListItem = ({ item }: { item: IComment; index: number }) => {
    const isOwner = item.creator.id === auth.authData?.userId;
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

  if (fontsLoaded) {
    return (
      <>
        <CommentActionsModal
          commentId={activeCommentIdOnModal}
          visible={visibleCommentActionModal}
          setVisible={setVisibleCommentActionModal}
          setPostUpdated={props.setPostUpdated}
        />
        <KeyboardAvoidingView style={styles.viewContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
          <FlatList
            style={styles.commentsList}
            data={comments}
            ListHeaderComponent={<Text style={styles.commentsNumber}>Comments</Text>}
            ListHeaderComponentStyle={{ marginBottom: 5, marginTop: 10, width: '100%' }}
            renderItem={renderCommentListItem}
            keyExtractor={(item) => item.commentId}
            showsVerticalScrollIndicator={true}
          />
        </KeyboardAvoidingView>
        <InputBox postId={postId} setPostUpdated={props.setPostUpdated} />
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
    paddingTop: 0,
    marginVertical: 10,
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
