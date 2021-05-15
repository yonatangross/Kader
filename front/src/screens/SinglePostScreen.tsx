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
        <View style={styles.ImageContainer}>
          <Image style={styles.imageDesign} source={testImage} />
        </View>
        <Text style={styles.titleText}>{post.title}</Text>
        <View style={styles.categoryAndLocationContainer}>
          <Text style={styles.categoryText}>
            {post.category}
            {' /'}
          </Text>
          <Text style={styles.locationText}>
            <MaterialCommunityIcons name="map-marker-outline" color={'black'} size={20} />
            {post.location}
          </Text>
        </View>
        <View style={styles.postTabsContainer}>
          <Button style={styles.button} appearance="ghost" size="giant" onPress={() => {}}>
            {(buttonProps: any) => (
              <Text {...buttonProps} style={{ color: '#a49fb0' }}>
                Description
              </Text>
            )}
          </Button>
          <Button style={styles.button}  size="giant" appearance="ghost" onPress={() => {}}>
            {(buttonProps: any) => (
              <Text {...buttonProps} style={{ color: '#a49fb0' }}>
                Comments
              </Text>
            )}
          </Button>
        </View>
        <View style={styles.postData}>
          <Text style={styles.descriptionTitle}>Description:</Text>
          <Text style={styles.description}> {post.description}</Text>
          {/* <View style={styles.rating}>
            <StarRating numOfStars={post.creator.rating} numOfRatings={post.creator.numberOfRatings} />
          </View> */}

          {/* <Divider /> */}
          {/* {post.comments.length 0  ? } */}
          {/* <FlatList
            style={styles.list}
            data={post.comments}
            renderItem={({ item: comment }) => <PostCommentItem comment={comment} />}
            keyExtractor={(item) => item.commentId}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.bottom}>
            <InputBox post={post} />
          </View> */}
        </View>
        <View style={styles.creatorData}>
          <Text style={styles.creatorTitle}>Creator:</Text>
          <Avatar style={styles.avatar} size="giant" source={require('../layouts/posts/singlePost/assets/image-profile.jpg')} />
        </View>
      </View>
    );
  } else return <></>;
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 40,
    marginLeft: 40,
    backgroundColor: '#312651',
  },
  container: {
    margin: 5,
    flex: 1,
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#f9f9fb',
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
  titleText: { fontWeight: '700', fontSize: 30 },
  categoryAndLocationContainer: { flexDirection: 'row' },
  categoryText: { fontWeight: 'bold', fontSize: 16 },
  locationText: { fontWeight: '400', fontSize: 16 },
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
  creatorData: {
    backgroundColor: '#fefefe',
    padding: 15,
    alignItems: 'center',
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 1,
    width: '95%',
  },
  descriptionTitle: { fontFamily: 'Rubik', fontWeight: 'bold', alignSelf: 'flex-start', marginVertical: 5, marginTop: 0, fontSize: 24 },
  description: { fontFamily: 'Rubik', alignSelf: 'flex-start', padding: 0, marginHorizontal: 20, fontSize: 16 },
  creatorTitle: { fontFamily: 'Rubik', fontWeight: 'bold', alignSelf: 'flex-start', marginVertical: 5, marginTop: 0, fontSize: 24 },

  profileAvatar: {
    width: 15,
    height: 15,
    marginHorizontal: 2,
    paddingRight: 2,
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 36,
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
  avatar: {
    margin: 8,
    alignSelf: 'center',
  },

  list: {
    width: '100%',
  },
});

export default SinglePostScreen;
