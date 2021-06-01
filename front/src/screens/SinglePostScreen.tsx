import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { deletePost, getPost, updatePost } from '../services/posts';
import { useFonts } from 'expo-font';
import { IPost } from '../types/IPost';
import InputBox from '../components/InputBox';
import { useAuth } from '../contexts/Auth';
import SinglePostComments from '../components/SinglePostComments';
import SinglePostItem from '../components/SinglePostItem';
import EditPostModal from '../components/EditPostModal';

export interface SinglePostScreenProps {}

const SinglePostScreen = (props: SinglePostScreenProps) => {
  const auth = useAuth();
  const route = useRoute();
  const navigation = useNavigation();
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [post, setPost] = useState<IPost>();
  const [postUpdated, setPostUpdated] = useState<boolean>(false);
  const [isPostOwner, setIsPostOwner] = useState<boolean>(false);
  const [showSettingsSection, setShowSettingsSection] = useState<boolean>(false);
  const [commentAdded, setCommentAdded] = useState<boolean>(false);
  const isFocused = useIsFocused();

  let [fontsLoaded] = useFonts({
    Rubik: require('../assets/fonts/Rubik/Rubik-VariableFont_wght.ttf'),
  });

  useEffect(() => {
    let mounted = true;
    if (!!route.params) {
      const params: any = route.params;
      getPost(params.id)
        .then((response) => {
          if (mounted) {
            const postResponse: IPost = response.data;
            setPost(postResponse);
            if (postResponse?.creator.userId === auth.authData?.userId) {
              setIsPostOwner(true);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return () => {
      mounted = false;
    };
  }, [fontsLoaded, setPost, setShowSettingsSection, isPostOwner, postUpdated, setPostUpdated, isFocused, editModalVisible, setEditModalVisible]);

  const onPressSettingsButton = () => {
    if (showSettingsSection) {
      setShowSettingsSection(false);
    } else {
      setShowSettingsSection(true);
    }
  };
  const onPressEditButton = () => {
    setEditModalVisible(true);
  };

  const onPressCloseButton = () => {
    navigation.navigate('ClosePost', {
      postId: post?.postId,
    });
  };

  const onPressDeleteButton = () => {
    if (!!post) {
      deletePost(post.postId)
        .then(() => {
          console.log(`Deleted post ${post.postId}`);
          navigation.navigate('SingleGroup', {
            id: post?.groupId,
          });
        })
        .catch((error) => {
          console.log('error while deleting post');
          console.log(error);
        });
    }
  };

  const onPressReopenButton = () => {
    if (!!post) {
      let updatedPost: IPost = post;
      updatedPost.isActive = true;
      updatePost(updatedPost)
        .then(() => {
          setPostUpdated(true);
          console.log(`Reopened post ${post.postId}`);
        })
        .catch((error) => {
          console.log('error while reopening post');
          console.log(error);
        });
    }
  };

  if (!!post && fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.buttonsContainer}></View>
        <EditPostModal visible={editModalVisible} post={post} setVisible={setEditModalVisible} />
        {isPostOwner && (
          <View style={styles.settingsButtonsContainer}>
            <TouchableOpacity activeOpacity={0.7} onPress={onPressSettingsButton} style={styles.settingsButton}>
              <Image source={require('../assets/images/settingsIcon.png')} style={styles.floatingButtonStyle} />
            </TouchableOpacity>
            {post.isActive && showSettingsSection && (
              <>
                <TouchableOpacity activeOpacity={0.7} onPress={onPressEditButton} style={styles.settingButton}>
                  <Text style={styles.buttonText}>Edit post</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={onPressCloseButton} style={styles.settingButton}>
                  <Text style={styles.buttonText}>Close post</Text>
                </TouchableOpacity>
              </>
            )}
            {!post.isActive && showSettingsSection && (
              <>
                <TouchableOpacity activeOpacity={0.7} onPress={onPressReopenButton} style={styles.settingButton}>
                  <Text style={styles.buttonText}>Reopen post</Text>
                </TouchableOpacity>
              </>
            )}
            {showSettingsSection && (
              <>
                <TouchableOpacity activeOpacity={0.7} onPress={onPressDeleteButton} style={styles.settingButton}>
                  <Text style={styles.buttonText}>Delete post</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
        <SinglePostItem post={post} />
        <Text style={styles.commentsNumber}>Comments</Text>
        <SinglePostComments comments={post.comments.reverse()} postId={post.postId} commentAdded={commentAdded} setCommentAdded={setCommentAdded} />
        <InputBox postId={post.postId} commentAdded={commentAdded} setCommentAdded={setCommentAdded} />
      </View>
    );
  } else return <></>;
};

const styles = StyleSheet.create({
  commentsNumber: { alignSelf: 'flex-start', justifyContent: 'center', marginLeft: 25, fontWeight: 'bold', fontSize: 20 },

  settingsButtonsContainer: { flexDirection: 'row-reverse', backgroundColor: 'white', width: '100%' },
  settingButton: {
    margin: 10,
    marginVertical: 15,
    backgroundColor: '#f2a853',
    borderRadius: 30,
    alignItems: 'center',
    width: 80,
    height: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  editPostButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  closePostButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  settingsButton: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 32,
    height: 32,
  },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white', width: '100%', marginVertical: 20 },
  viewContainer: {
    flex: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  postContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '100%',

    paddingTop: 30,
  },
  container: {
    flexDirection: 'column',
    height: '100%',
  },
});

export default SinglePostScreen;
