import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, FlatList, TouchableOpacity, Image, StatusBar, ImageStyle } from 'react-native';
import _ from 'lodash';
import { Text } from '@ui-kitten/components';

import { IPost } from '../../types/IPost';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from '../../services/moment';
import { Rating } from 'react-native-ratings';
import { getPostTypeName } from '../../types/PostType';
import { IUser } from '../../types/IUser';
import { IComment } from '../../types/IComment';

export interface CommenterListItemProps {
  comment: IComment;
  setShowRating: Function;
  setSelectedUserId: Function;
}

const CommenterListItem = (props: CommenterListItemProps) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  const { comment } = props;
  useEffect(() => {
    let mounted = true;
    setLoading(false);
    () => {
      mounted = false;
    };
  }, []);

  const onPressRateUser = () => {
    props.setShowRating(true);
    props.setSelectedUserId(comment.creator.id);
  };

  if (!!comment) {
    return (
      <View style={styles.container}>
        <View style={styles.headerRightContainer}>
          <View style={styles.ImageContainer}>
            {!!comment.creator.imageUri ? (
              <Image source={{ uri: comment.creator.imageUri }} style={styles.imageDesign as ImageStyle} />
            ) : (
              <Image source={require('../../assets/images/imagePlaceholder.png')} style={styles.imageDesign as ImageStyle} />
            )}
          </View>
          <View style={styles.creatorContainer}>
            <View style={styles.upperCreatorContainer}>
              <Text style={styles.creatorTitle}>{comment.creator.firstName + ' ' + comment.creator.lastName}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={onPressRateUser} style={styles.settingButton}>
          <Text style={styles.buttonText}>Rate user</Text>
        </TouchableOpacity>
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
  container: { flexDirection: 'row', paddingTop: 40, backgroundColor: 'white', justifyContent: 'space-between' },
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

export default CommenterListItem;
