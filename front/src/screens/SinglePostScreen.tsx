import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, FlatList, Text, Platform, ImageStyle, TouchableOpacity, SafeAreaView } from 'react-native';
import { getPost } from '../services/posts';
const testImage = require('../assets/images/test.png');
import moment from 'moment';
import { useFonts } from 'expo-font';
import { IPost } from '../types/IPost';
import PostCommentItem from '../components/PostCommentItem';
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
import Comments from '../components/Comments';

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
      const params: any = route.params;
      getPost(params.id)
        .then((response) => {
          if (mounted) {
            const postResponse: IPost = response.data.post;
            setPost(postResponse);
            if (post?.creator.id === auth.authData?.userId) {
              setIsPostOwner(true);
              console.log('yes');
            } 
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return () => {
      mounted = false;
      setPostUpdated(false);
    };
  }, [fontsLoaded, setPost, setPostUpdated, showSettingsSection]);

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
      <KeyboardAvoidingView enabled style={styles.viewContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
        <View style={styles.container}>
          {isPostOwner && (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity activeOpacity={0.7} onPress={onPressSettingsButton} style={styles.postCreationButton}>
                <Image source={require('../assets/images/settingsIcon.png')} style={styles.floatingButtonStyle} />
              </TouchableOpacity>
              {showSettingsSection && (
                <>
                  <TouchableOpacity activeOpacity={0.7} onPress={onPressEditButton} style={styles.postCreationButton}>
                    <Text style={styles.postCreationText}>Edit Post</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.7} onPress={onPressCloseButton} style={styles.postCreationButton}>
                    <Text style={styles.postCreationText}>Close Post</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}

          <View style={styles.postContainer}>
            <View style={styles.postDataContainer}>
              <View style={styles.postImageContainer}>
                {post.image !== undefined ? (
                  <Image source={{ uri: post.image }} style={styles.postImage as ImageStyle} />
                ) : (
                  <Image source={require('../assets/images/itemPlaceholder.png')} style={styles.postImage as ImageStyle} />
                )}
              </View>

              <View style={styles.middleDataContainer}>
                <Text style={styles.titleText}>{post.title}</Text>
                <View style={styles.extraDataContainer}>
                  <Rating fractions={1} ratingColor="#f3a953" imageSize={20} startingValue={post.creator.rating} ratingCount={5} readonly />
                  <Text style={styles.ratingText}> stars</Text>
                </View>
              </View>
            </View>
            <View style={styles.lowerDataContainer}>
              <View style={styles.postDateContainer}>
                <FontAwesome5 name="clock" color={'#4975aa'} size={20} />
                <Text style={styles.postDate}>{moment(post.created).fromNow()}</Text>
              </View>
              <View style={styles.locationContainer}>
                <MaterialCommunityIcons name="map-marker-outline" color={'#4975aa'} size={20} />
                <Text style={styles.locationText}>{post.address}</Text>
              </View>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionHeader}>Description</Text>
              <Text style={styles.description}>{post.description}</Text>
            </View>
          </View>
          <Comments data={post.comments} postId={post.postId} setPostUpdated={setPostUpdated} />
        </View>
      </KeyboardAvoidingView>
    );
  } else return <></>;
};

const styles = StyleSheet.create({
  postCreationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  postCreationButton: {
    backgroundColor: 'white',
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 15,
    bottom: 30,
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
    //backgroundColor:'black'
  },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'center' },
  descriptionContainer: {
    flexDirection: 'column',
    backgroundColor: '#fefefe',
    paddingTop: 0,
    marginHorizontal: 10,
    marginVertical: 10,
    width: '95%',
    paddingHorizontal: 15,
  },
  ratingBar: { justifyContent: 'center', alignContent: 'center' },
  descriptionHeader: { alignSelf: 'flex-start', justifyContent: 'center', fontWeight: 'bold', fontSize: 20 },
  description: { fontFamily: 'Rubik', alignSelf: 'flex-start', marginVertical: 20, padding: 0, fontSize: 14, color: 'grey' },
  ratingText: { color: '#f3a953', fontSize: 18, fontWeight: 'bold', alignSelf: 'center', justifyContent: 'center' },
  postDateContainer: { flexDirection: 'column', alignItems: 'center' },
  locationContainer: { flexDirection: 'column', alignItems: 'center' },
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
    alignItems: 'center',
  },
  middleDataContainer: { flexDirection: 'column', justifyContent: 'center', alignSelf: 'flex-start', marginTop: 20 },
  extraDataContainer: { flexDirection: 'row', justifyContent: 'center', alignContent: 'center' },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#fefefe',
    width: '100%',
  },
  postDataContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 20,
    width: '100%',
    backgroundColor: '#fefefe',
  },
  userImageAndRatingContainer: { flexDirection: 'column', backgroundColor: '#fefefe' },
  avatar: {
    margin: 8,
    borderRadius: 15,
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  creatorContainer: { flexDirection: 'column', width: '95%' },
  upperCreatorContainer: {
    flexDirection: 'row',
  },
  lowerDataContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    margin: 10,
  },
  postDate: { paddingHorizontal: 0 },
  locationText: { paddingHorizontal: 0, marginTop: -2 },
  postImageContainer: {
    margin: 15,
    shadowOffset: { width: 15, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 10,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#0000',
  },
  postImage: {
    width: 200,
    height: 200,
    borderRadius: 15,
    resizeMode: 'contain',
  },
  creatorTitle: { fontWeight: 'bold', alignSelf: 'flex-start', marginTop: 10, marginRight: 5, fontSize: 16 },
  postTypeTitle: { fontWeight: '100', alignSelf: 'flex-start', marginTop: 10, fontSize: 16 },
  categoryContainer: { flexDirection: 'row' },
  categoryText: { fontWeight: 'bold', fontSize: 16 },
  commentsNumber: { alignSelf: 'flex-start', justifyContent: 'center', marginLeft: 5, fontWeight: 'bold', fontSize: 20 },
  profileAvatar: {
    width: 15,
    height: 15,
    marginHorizontal: 2,
    paddingRight: 2,
  },
  ImageContainer: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#fefefe',
  },
  imageDesign: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  commentsHeader: { alignSelf: 'center', justifyContent: 'center', fontSize: 24, margin: 10 },
  titleText: { fontWeight: '700', fontSize: 24 },

  postTabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  postData: {
    backgroundColor: '#fefefe',
    padding: 15,
    alignItems: 'center',
    borderRadius: 30,
    width: '95%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    margin: 2,
    alignSelf: 'center',
  },
  rating: {},
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
});

export default SinglePostScreen;
