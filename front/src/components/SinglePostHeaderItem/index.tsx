import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ImageStyle, ActivityIndicator } from 'react-native';
import _ from 'lodash';
import { Text } from '@ui-kitten/components';

import { IPost } from '../../types/IPost';
import { Ionicons } from '@expo/vector-icons';
import { getPostTypeName } from '../../types/PostType';

export interface SinglePostHeaderItemProps {
  post: IPost;
}

const SinglePostHeaderItem = (props: SinglePostHeaderItemProps) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  const { post } = props;
  useEffect(() => {
    let mounted = true;
    setLoading(false);
    () => {
      mounted = false;
    };
  }, []);

  if (!!post) {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.backButtonContainer}
          >
            <Ionicons name="arrow-back" color={'#4975aa'} size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerRightContainer}>
          <View style={styles.ImageContainer}>
            {!!post.creator.imageUri ? (
              <Image source={{ uri: post.creator.imageUri }} style={styles.imageDesign as ImageStyle} />
            ) : (
              <Image source={require('../../assets/images/imagePlaceholder.png')} style={styles.imageDesign as ImageStyle} />
            )}
          </View>
          <View style={styles.creatorContainer}>
            <View style={styles.upperCreatorContainer}>
              <Text style={styles.creatorTitle}>{post.creator.firstName + ' ' + post.creator.lastName}</Text>
            </View>
            <View style={styles.lowerCreatorContainer}>
              <Text style={styles.postTypeTitle}>{getPostTypeName(post.type)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.categoryContainer}>{!!post.category ? <Text style={styles.categoryText}>{post.category.name}</Text> : <></>}</View>
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
  headerContainer: { flexDirection: 'row', paddingTop: 40, backgroundColor: 'white', justifyContent: 'space-between' },
  locationText: { paddingHorizontal: 0, marginTop: -2 },
  creatorContainer: { flexDirection: 'column', marginTop: 10, marginLeft: 10 },
  categoryContainer: {
    margin: 10,
    marginVertical: 15,
    backgroundColor: '#f2a853',
    borderRadius: 30,
    alignItems: 'center',
    width: 120,
    height: 40,
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  creatorTitle: { fontWeight: 'bold', marginRight: 5, fontSize: 16 },
  postTypeTitle: { fontWeight: '100', fontSize: 16, color: '#848484' },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  lowerCreatorContainer: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  postDate: { paddingHorizontal: 0, color: 'black' },
  backButtonContainer: {
    margin: 20,
  },
  headerRightContainer: {
    flexDirection: 'row',
  },
  headerLeftContainer: {
    flexDirection: 'column',
  },
  ImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#fefefe',
  },
  upperCreatorContainer: {
    flexDirection: 'row',
  },
  imageDesign: {
    width: 40,
    height: 40,
    borderRadius: 15,
  },
});

export default SinglePostHeaderItem;
