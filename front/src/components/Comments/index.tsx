import React, { useEffect } from 'react';
import { StyleSheet, FlatList, Text, Platform, KeyboardAvoidingView, LogBox } from 'react-native';
import { useFonts } from 'expo-font';
import InputBox from '../InputBox';
import PostCommentItem from '../PostCommentItem';
import { IComment } from '../../types/IComment';

export interface CommentsProps {
  comments: IComment[];
  postId: string;
  setPostUpdated: Function;
}

const Comments = (props: CommentsProps) => {
  const { comments, postId, setPostUpdated } = props;
  let [fontsLoaded] = useFonts({
    Rubik: require('../../assets/fonts/Rubik/Rubik-VariableFont_wght.ttf'),
  });

  useEffect(() => {
    let mounted = true;
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    return () => {
      mounted = false;
    };
  }, [fontsLoaded, props.setPostUpdated]);

  const renderCommentListItem = (item: any) => {
    return <PostCommentItem comment={item.item} />;
  };
  if (fontsLoaded) {
    return (
      <KeyboardAvoidingView enabled style={styles.viewContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
        <FlatList
          style={styles.commentsList}
          data={comments}
          ListHeaderComponent={<Text style={styles.commentsNumber}>Comments</Text>}
          ListHeaderComponentStyle={{ marginBottom: 5, marginTop: 10, width: '100%' }}
          ListFooterComponent={<InputBox postId={postId} setPostUpdated={setPostUpdated} />}
          renderItem={renderCommentListItem}
          keyExtractor={(item) => item.commentId}
          showsVerticalScrollIndicator={true}
        />
      </KeyboardAvoidingView>
    );
  } else
    return (
      <>
        <Text>Error loading {postId} comments...</Text>
      </>
    );
};

const styles = StyleSheet.create({
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
    flex: 1,
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  commentsNumber: { alignSelf: 'flex-start', justifyContent: 'center', marginLeft: 5, fontWeight: 'bold', fontSize: 20 },
});

export default Comments;
