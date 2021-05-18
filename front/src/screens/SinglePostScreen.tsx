import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, FlatList, Text, Platform } from 'react-native';
import { Avatar } from '@ui-kitten/components';
import { getPost } from '../services/posts';
const testImage = require('../assets/images/test.png');
import moment from 'moment';
import { useFonts } from 'expo-font';
import { IPost } from '../types/IPost';
import PostCommentItem from '../components/PostCommentItem';
import InputBox from '../components/InputBox';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getPostTypeName } from '../types/PostType';
import StarRating from '../components/StarRating';
import { KeyboardAvoidingView } from '../layouts/auth/login/extra/3rd-party';

export interface SinglePostScreenProps {}

const SinglePostScreen = (props: SinglePostScreenProps) => {
  const route = useRoute();
  const [post, setPost] = useState<IPost>();
  const [postUpdated, setPostUpdated] = useState<boolean>(false);
  let [fontsLoaded] = useFonts({
    Rubik: require('../assets/fonts/Rubik-VariableFont_wght.ttf'),
  });

  useEffect(() => {
    let mounted = true;
    if (route.params) {
      const params: any = route.params;
      getPost(params.id)
        .then((response) => {
          if (mounted) {
            const postResponse: IPost = response.data.post;
            setPost(postResponse);
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
  }, [fontsLoaded, setPost, setPostUpdated]);

  if (!!post && fontsLoaded) {
    return (
      <KeyboardAvoidingView enabled style={styles.viewContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.userImageAndRatingContainer}>
              <Avatar style={styles.avatar} size="giant" source={require('../layouts/posts/singlePost/assets/image-profile.jpg')} />
              <StarRating numOfStars={post.creator.rating} numOfRatings={post.creator.numberOfRatings} displayRatings={false} />
            </View>
            <View style={styles.creatorContainer}>
              <View style={styles.upperCreatorContainer}>
                <Text style={styles.creatorTitle}>{post.creator.firstName + ' ' + post.creator.lastName}</Text>
                <Text style={styles.postTypeTitle}>{getPostTypeName(post.type)}</Text>
              </View>
              <View style={styles.lowerCreatorContainer}>
                <Text style={styles.postDate}>{moment(post.created).fromNow()},</Text>
                <Text style={styles.locationText}>
                  <MaterialCommunityIcons name="map-marker-outline" color={'black'} size={20} />
                  {post.location}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.postDataContainer}>
            <Text style={styles.titleText}>{post.title}</Text>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>{post.category}</Text>
            </View>
            <View style={styles.ImageContainer}>
              <Image style={styles.imageDesign} source={testImage} />
            </View>
            <View style={styles.postData}>
              <Text style={styles.description}> {post.description}</Text>
            </View>
          </View>

          <FlatList
            style={styles.commentsList}
            data={post.comments}
            ListHeaderComponent={<Text style={styles.commentsNumber}>Comments</Text>}
            ListHeaderComponentStyle={{ marginBottom: 5, marginTop: 10, width: '95%' }}
            ListFooterComponent={<InputBox post={post} setPostUpdated={setPostUpdated} />}
            renderItem={({ item: comment }) => <PostCommentItem key={comment.commentId} comment={comment} />}
            keyExtractor={(item) => item.commentId}
            showsVerticalScrollIndicator={true}
          />
        </View>
      </KeyboardAvoidingView>
    );
  } else return <></>;
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#fefefe',
    padding: 15,
    marginTop: 20,
    borderRadius: 15,
    width: '95%',
  },
  postDataContainer: {
    alignItems: 'center',
    borderRadius: 15,
    margin: 20,
    width: '95%',
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
  lowerCreatorContainer: {
    flexDirection: 'row',
    width: '95%',
    paddingTop: 5,
    paddingLeft: 5,
  },
  postDate: { paddingHorizontal: 0 },
  locationText: { paddingHorizontal: 0, marginTop: -2 },

  description: { fontFamily: 'Rubik', alignSelf: 'flex-start', paddingTop: 20, padding: 0, marginHorizontal: 20, fontSize: 16 },
  creatorTitle: { fontWeight: 'bold', alignSelf: 'flex-start', marginTop: 10, marginRight: 5, fontSize: 16 },
  postTypeTitle: { fontWeight: '100', alignSelf: 'flex-start', marginTop: 10, fontSize: 16 },
  categoryContainer: { flexDirection: 'row' },
  categoryText: { fontWeight: 'bold', fontSize: 16 },
  commentsNumber: { alignSelf: 'center', justifyContent: 'center', marginLeft: 5, fontWeight: 'bold', fontSize: 16 },
  profileAvatar: {
    width: 15,
    height: 15,
    marginHorizontal: 2,
    paddingRight: 2,
  },
  ImageContainer: {
    margin: 20,
    marginTop: 35,
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
  titleText: { fontWeight: '700', fontSize: 30, marginTop: 20 },

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
  commentsContainer: {},
  commentsList: {
    backgroundColor: '#fefefe',
    paddingTop: 0,
    marginHorizontal: 10,
    marginVertical:10,
    width: '95%',
    borderRadius: 15,
    paddingHorizontal: 15,
  },
});

export default SinglePostScreen;
