import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ImageStyle, ActivityIndicator } from 'react-native';
import _ from 'lodash';
import { Text } from '@ui-kitten/components';

import { IPost } from '../../types/IPost';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from '../../services/moment';
import { imageBaseUrl } from '../../services/axios';
import Fonts from '../../constants/Fonts';

export interface SinglePostItemProps {
  post: IPost;
}

const SinglePostItem = (props: SinglePostItemProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { post } = props;
  useEffect(() => {
    let mounted = true;
    setLoading(false);
    () => {
      mounted = false;
    };
  }, [loading]);

  if (!!post) {
    return (
      <View style={styles.postContainer}>
        <View style={styles.postDataContainer}>
          <View style={styles.postImageContainer}>
          {!!post.imagesUri && post.imagesUri.length >= 1 ? (
                <Image source={{ uri: imageBaseUrl + post.imagesUri[0] }} style={styles.postImage as ImageStyle} />
            ) : (
              <Image source={require('../../assets/images/itemPlaceholder.png')} style={styles.postImage as ImageStyle} />
            )}
          </View>
          <View style={styles.middleDataContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>{post.title}</Text>
            </View>
            <View style={styles.postDateContainer}>
              <FontAwesome5 name="clock" color={'#4975aa'} size={20} />
              <Text style={styles.postDate}>{moment(post.created).fromNow()}</Text>
            </View>
            <View style={styles.locationContainer}>
              <MaterialCommunityIcons name="map-marker-outline" color={'#4975aa'} size={20} />
              <Text style={styles.locationText}>{post.address}</Text>
            </View>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionHeader}>Description</Text>
          <Text style={styles.description}>{post.description}</Text>
        </View>
      </View>
    );
  } else
    return (
      <>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'row',
              padding: 10,
            }}
          >
            <ActivityIndicator size="large" color="#4975aa" />
          </View>
        ) : (
          <Text>Fetched!!</Text>
        )}
      </>
    );
};

const styles = StyleSheet.create({
  textContainer: { flexDirection: 'row', width: 200, marginTop: 5 ,},
  titleText: {
    flexDirection: 'row',
    flexShrink: 1,
    fontWeight: 'bold',
    fontSize: 18,
  },
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
  descriptionHeader: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 24,
  },
  description: { fontFamily: 'Rubik', alignSelf: 'flex-start', marginVertical: 20, marginLeft: 30, padding: 0, fontSize: 16, color: 'grey', maxWidth: 300 },
  ratingText: { color: '#f3a953', fontSize: 18, fontWeight: 'bold', alignSelf: 'center', justifyContent: 'center' },
  postDateContainer: { flexDirection: 'column', alignItems: 'center', marginVertical: 20 },
  locationContainer: { flexDirection: 'column', alignItems: 'center', marginVertical: 20 },
  viewContainer: {
    flex: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  postContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 10,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  middleDataContainer: { flexDirection: 'column', justifyContent: 'center', alignSelf: 'flex-start', marginTop: 20, backgroundColor: '#fefefe' },
  extraDataContainer: { flexDirection: 'column', justifyContent: 'center', alignContent: 'center' },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#fefefe',
    width: '100%',
  },
  postDataContainer: {
    alignItems: 'center',
    flexDirection: 'row',
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
    marginHorizontal: 15,
    shadowOffset: { width: 15, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 10,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#0000',
  },
  postImage: {
    width: 170,
    height: 170,
    borderRadius: 15,
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

export default SinglePostItem;
