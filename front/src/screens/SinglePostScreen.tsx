import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, FlatList, Text, Platform, ImageStyle, TouchableOpacity, SafeAreaView } from 'react-native';
import { getPost } from '../services/posts';
const testImage = require('../assets/images/test.png');
import moment from '../services/moment';
import { useFonts } from 'expo-font';
import { IPost } from '../types/IPost';
import PostCommentItemHolder from '../components/PostCommentItemHolder';
import InputBox from '../components/InputBox';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { getPostTypeName } from '../types/PostType';
import StarRating from '../components/StarRating';
import { KeyboardAvoidingView } from '../layouts/auth/login/extra/3rd-party';
import { Rating } from 'react-native-elements';
import { authService } from '../services/authService';
import { useAuth } from '../contexts/Auth';
import { ScrollView } from 'react-native-gesture-handler';
import Posts from '../data/Posts';
import SinglePostComments from '../components/SinglePostComments';
import SinglePostItem from '../components/SinglePostItem';

export interface SinglePostScreenProps {}

const SinglePostScreen = (props: SinglePostScreenProps) => {
  const auth = useAuth();
  const route = useRoute();
  const navigation = useNavigation();
  const [post, setPost] = useState<IPost>();
  const [postUpdated, setPostUpdated] = useState<boolean>(false);
  const [isPostOwner, setIsPostOwner] = useState<boolean>(false);
  const [showSettingsSection, setShowSettingsSection] = useState<boolean>(false);

  let [fontsLoaded] = useFonts({
    Rubik: require('../assets/fonts/Rubik/Rubik-VariableFont_wght.ttf'),
  });

  useEffect(() => {
    let mounted = true;

    if (!!route.params) {
      console.log('yoni');
      const params: any = route.params;

      getPost(params.id)
        .then((response) => {
          if (mounted) {
            const postResponse: IPost = response.data.post;
            setPost(postResponse);
            if (postResponse?.creator.id === auth.authData?.userId) {
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
  }, [fontsLoaded, setPost, setShowSettingsSection, isPostOwner,postUpdated]);

  const onPressSettingsButton = () => {
    if (showSettingsSection) {
      setShowSettingsSection(false);
    } else {
      setShowSettingsSection(true);
    }
  };
  const onPressEditButton = () => {
    navigation.navigate('EditPost', {
      post: post,
    });
  };

  const onPressCloseButton = () => {
    navigation.navigate('ClosePost', {
      post: post,
    });
  };

  if (!!post && fontsLoaded) {
    return (
      <View style={styles.container}>
        {/* {isPostOwner && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity activeOpacity={0.7} onPress={onPressSettingsButton} style={styles.settingsButton}>
              <Image source={require('../assets/images/settingsIcon.png')} style={styles.floatingButtonStyle} />
            </TouchableOpacity>
          </View>
        )} */}
        {/* 
        {showSettingsSection && (
          <View style={styles.settingsButtonsContainer}>
            <TouchableOpacity activeOpacity={0.7} onPress={onPressEditButton} style={styles.settingButton}>
              <Text style={styles.closePostButtonText}>Edit Post</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={onPressCloseButton} style={styles.settingButton}>
              <Text style={styles.buttonText}>Close Post</Text>
            </TouchableOpacity>
          </View>
        )} */}
        <SinglePostItem post={post} />
        <Text style={styles.commentsNumber}>Comments</Text>
        <SinglePostComments comments={post.comments} postId={post.postId} postUpdated={postUpdated} setPostUpdated={setPostUpdated}  />
        <InputBox postId={post.postId} postUpdated={postUpdated} setPostUpdated={setPostUpdated} />
      </View>
    );
  } else return <></>;
};

const styles = StyleSheet.create({
  commentsNumber: { alignSelf: 'flex-start', justifyContent: 'center', marginLeft: 25, fontWeight: 'bold', fontSize: 20 },

  settingsButtonsContainer: { flexDirection: 'row', backgroundColor: 'white', width: '100%' },
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
    borderRadius: 30,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
    borderColor: 'black',
    borderWidth: 0.8,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 32,
    height: 32,
  },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white', width: '100%' },
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
