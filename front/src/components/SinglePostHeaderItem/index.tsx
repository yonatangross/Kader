import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ImageStyle, ActivityIndicator } from 'react-native';
import _ from 'lodash';
import { Text } from '@ui-kitten/components';
import { capitalize } from '../../utils/text';
import { IPost } from '../../types/IPost';
import { Ionicons } from '@expo/vector-icons';
import { getPostTypeName } from '../../types/PostType';
import { imageBaseUrl } from '../../services/axios';
import { useAuth } from '../../contexts/Auth';
import { ICategory } from '../../types/ICategory';

export interface SinglePostHeaderItemProps {
  post: IPost;
  groupName: string;
  groupCategory: ICategory;
}

const SinglePostHeaderItem = (props: SinglePostHeaderItemProps) => {
  const navigation = useNavigation();
  const auth = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const { post, groupName, groupCategory } = props;

  const onPressGroupName = (groupId: string) => {
    navigation.navigate('SingleGroup', { id: groupId });
  };

  const onPressUserProfile = (userId: string) => {
    if (auth.authData?.userId === userId) {
      navigation.navigate('Profile');
    } else navigation.navigate('UserProfile', { id: userId });
  };

  useEffect(() => {
    setLoading(false);
    console.log(props.groupCategory);
  }, []);

  if (!!post) {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButtonContainer}
        >
          <Ionicons name="arrow-back" color={'#4975aa'} size={24} />
        </TouchableOpacity>
        <View style={styles.headerRightContainer}>
          <View style={styles.ImageContainer}>
            <TouchableOpacity onPress={() => onPressUserProfile(post.creator.userId)}>
              {!!post.creator.imageUri ? (
                <Image source={{ uri: imageBaseUrl + post.creator.imageUri }} style={styles.imageDesign as ImageStyle} />
              ) : (
                <Image source={require('../../assets/images/imagePlaceholder.png')} style={styles.imageDesign as ImageStyle} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.creatorContainer}>
            <View style={styles.upperCreatorContainer}>
              <Text style={styles.creatorTitle}>
                {capitalize(post.creator.firstName)} {capitalize(post.creator.lastName)}
              </Text>
            </View>
            <View style={styles.lowerCreatorContainer}>
              <Text style={styles.postTypeTitle}>{getPostTypeName(post.type)}</Text>
            </View>
            <View style={styles.lowerCreatorContainer}>
              <TouchableOpacity onPress={() => onPressGroupName(post.groupId)}>
                <Text style={styles.postGroupText}>{groupName}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.categoryContainer}>{!!groupCategory ? <Text style={styles.categoryText}>{groupCategory.name}</Text> : <></>}</View>
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
  postGroupText: { width: 150, fontSize: 12, fontWeight: 'bold' },
  headerContainer: { flexDirection: 'row', paddingTop: 40, backgroundColor: 'white', justifyContent: 'space-between' },
  locationText: { paddingHorizontal: 0, marginTop: -2 },
  creatorContainer: { flexDirection: 'column', marginTop: 10, marginLeft: 20 },
  categoryContainer: {
    margin: 10,
    marginVertical: 20,
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
  },
  postDate: { paddingHorizontal: 0, color: 'black' },
  backButtonContainer: {
    margin: 20,
    marginRight: 0,
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
    marginLeft: 10,
    borderRadius: 15,
    backgroundColor: '#fefefe',
  },
  upperCreatorContainer: {
    flexDirection: 'row',
  },
  imageDesign: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
});

export default SinglePostHeaderItem;
