import { Text } from '@ui-kitten/components';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from '../components/Themed';
import { IPost } from '../types/IPost';
import { updatePost } from '../services/posts';
import { useNavigation, useRoute } from '@react-navigation/native';
import SinglePostItem from '../components/SinglePostItem';
import { Rating } from 'react-native-elements';
import { addRating } from '../services/users';
import { FlatList } from 'react-native-gesture-handler';
import CommenterListItem from '../components/CommenterListItem';
import { IComment } from '../types/IComment';

export interface ClosePostScreenProps {}

const ClosePostScreen = (props: ClosePostScreenProps) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<IPost>();
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [showRating, setShowRating] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    if (!!route.params) {
      if (isMounted) {
        const params: any = route.params;
        setPost(params.post);
        setLoading(false);
      }
    }

    () => {
      isMounted = false;
    };
  }, [setShowRating, setSelectedUserId]);

  const onFinishRating = (rating: number) => {
    addRating(selectedUserId, rating)
      .then((response) => {
        console.log(`rated ${selectedUserId} successfully, response:`);
        console.log(response);
        if (!!post) {
          let ratedPost: IPost = post;
          ratedPost.isActive = false;
          closePostHandler(ratedPost);
        }
      })
      .catch((error) => {
        console.log(`error rating ${selectedUserId}:`);
        console.log(error);
      });
  };

  const closePostHandler = (updatedPost: IPost) => {
    updatePost(updatedPost)
      .then((response) => {
        console.log(`closed post ${updatedPost.postId} successfully, response:`);
        console.log(response);
        navigation.goBack();
      })
      .catch((error) => {
        console.log(`error closing post ${updatedPost.postId}:`);
        console.log(error);
      });
  };

  const renderCommenterListItem = (item: any) => {
    return <CommenterListItem comment={item} setShowRating={setShowRating} setSelectedUserId={setSelectedUserId} />;
  };

  if (!!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.closePostText}>Close Post</Text>
        <SinglePostItem post={post} />
        {showRating === false && (
          <KeyboardAvoidingView enabled style={styles.viewContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
            <FlatList
              style={styles.commentsList}
              data={post.comments}
              ListFooterComponent={
                <View style={styles.container}>
                  <TouchableOpacity activeOpacity={0.7} onPress={() => closePostHandler(post)} style={styles.settingButton}>
                    <Text style={styles.buttonText}>Close without rating</Text>
                  </TouchableOpacity>
                </View>
              }
              renderItem={renderCommenterListItem}
              keyExtractor={(item) => item.commentId}
              showsVerticalScrollIndicator={true}
            />
          </KeyboardAvoidingView>
        )}

        {showRating === true && <Rating ratingColor="#f3a953" imageSize={20} startingValue={0} ratingCount={5} onFinishRating={onFinishRating} />}
      </View>
    );
  } else return <View>{loading ? <Text>loading...</Text> : <Text>Fetched!!</Text>}</View>;
};

const styles = StyleSheet.create({
  settingButton: {
    margin: 10,
    marginVertical: 15,
    backgroundColor: '#f2a853',
    borderRadius: 30,
    alignItems: 'center',
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  container: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' },
  closePostText: { fontSize: 32, fontWeight: 'bold', backgroundColor: 'white', textAlign: 'center', width: '100%', padding: 10 },
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

export default ClosePostScreen;
