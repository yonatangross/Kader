import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { Avatar, Button, Divider } from '@ui-kitten/components';
import { getPost } from '../services/posts';
const testImage = require('../assets/images/test.png');
import moment from 'moment';
import { useFonts } from 'expo-font';
import { IPost } from '../types/IPost';
import PostCommentItem from '../components/PostCommentItem';
import InputBox from '../components/InputBox';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { getPostTypeName } from '../types/PostType';
import StarRating from '../components/StarRating';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface SinglePostScreenProps {}

const SinglePostScreen = (props: SinglePostScreenProps) => {
  const route = useRoute();
  const [post, setPost] = useState<IPost>();

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
    };
  }, [fontsLoaded]);

  if (!!post && fontsLoaded) {
    return (
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

        <View>
          <Text style={styles.commentsNumber}>{post.comments.length} comments</Text>
          <SafeAreaView style={styles.commentsContainer}>
            <FlatList
              style={styles.commentsList}
              data={post.comments}
              renderItem={({ item: comment }) => <PostCommentItem comment={comment} />}
              keyExtractor={(item) => item.commentId}
              showsVerticalScrollIndicator={true}
            />
          </SafeAreaView>
          <View style={styles.addCommentBar}>
            <InputBox post={post} />
          </View>
        </View>
      </View>
    );
  } else return <></>;
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flex: 1,
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#f9f9fb',
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#fefefe',
    padding: 15,
    paddingTop: 20,
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
  creatorContainer: { flexDirection: 'column' },
  upperCreatorContainer: {
    flexDirection: 'row',
  },
  lowerCreatorContainer: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingLeft: 5,
  },
  descriptionTitle: { fontFamily: 'Rubik', fontWeight: 'bold', alignSelf: 'flex-start', marginVertical: 5, marginTop: 0, fontSize: 24 },
  description: { fontFamily: 'Rubik', alignSelf: 'flex-start', padding: 0, marginHorizontal: 20, fontSize: 16 },
  creatorTitle: { fontWeight: 'bold', alignSelf: 'flex-start', marginTop: 10, marginRight: 5, fontSize: 16 },
  postTypeTitle: { fontWeight: '100', alignSelf: 'flex-start', marginTop: 10, fontSize: 16 },
  postDate: { paddingHorizontal: 0, alignSelf: 'flex-start', justifyContent: 'flex-start' },
  categoryContainer: { flexDirection: 'row' },
  categoryText: { fontWeight: 'bold', fontSize: 16 },
  locationText: { paddingHorizontal: 0, alignSelf: 'flex-start', justifyContent: 'flex-start', marginTop: -2 },
  commentsNumber: { alignSelf: 'flex-end', justifyContent: 'center', marginRight: 20, fontWeight: 'bold' },
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
  manageIcons: {
    backgroundColor: 'white',
    width: 35,
    height: 35,
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
    width: 25,
    height: 25,
  },
  postData: {
    backgroundColor: '#fefefe',
    padding: 15,
    alignItems: 'center',
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 1,
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
  commentsContainer: { marginTop: -30, maxHeight: 200, paddingTop: 0 },
  commentsList: {
    backgroundColor: '#fefefe',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingTop: 0,
  },
  addCommentBar: {
    justifyContent: 'center',
    marginBottom: 36,
  },
});

export default SinglePostScreen;
