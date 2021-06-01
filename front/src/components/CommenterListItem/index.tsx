import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ImageStyle, ActivityIndicator } from 'react-native';
import _ from 'lodash';
import { Text } from '@ui-kitten/components';
import { IComment } from '../../types/IComment';
import { capitalize } from '../../utils/text';
import { imageBaseUrl } from '../../services/axios';

export interface CommenterListItemProps {
  comment: IComment;
  setShowRating: Function;
  setSelectedUser: Function;
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
    props.setSelectedUser(comment);
    props.setShowRating(true);
  };

  if (!!comment) {
    return (
      <View style={styles.container}>
        <View style={styles.ImageContainer}>
          {!!comment.creator.imageUri ? (
            <Image source={{ uri: imageBaseUrl + comment.creator.imageUri }} style={styles.imageDesign as ImageStyle} />
          ) : (
            <Image source={require('../../assets/images/imagePlaceholder.png')} style={styles.imageDesign as ImageStyle} />
          )}
        </View>
        <View style={styles.creatorContainer}>
          <Text style={styles.creatorTitle}>{capitalize(comment.creator.firstName) + ' ' + capitalize(comment.creator.lastName)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity activeOpacity={0.7} onPress={onPressRateUser} style={styles.settingButton}>
            <Text style={styles.buttonText}>Rate user</Text>
          </TouchableOpacity>
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
  buttonContainer: { alignSelf: 'flex-end' },
  settingButton: {
    margin: 10,
    marginVertical: 15,
    backgroundColor: '#f2a853',
    borderRadius: 30,
    alignItems: 'center',
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'flex-start',
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
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  locationText: { paddingHorizontal: 0, marginTop: -2 },
  creatorContainer: { flexDirection: 'column', marginLeft: 10, marginRight: 75, width: 100 },
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
