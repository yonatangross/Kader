import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet, ImageStyle } from 'react-native';
import { IUser } from '../../types/IUser';
import { useNavigation } from '@react-navigation/native';
const testImage = require('../../assets/images/test.png');
import StarRating from '../StarRating/index';
import { Avatar } from '@ui-kitten/components';
import { useAuth } from '../../contexts/Auth';
import { imageBaseUrl } from '../../services/axios';

export interface UserListItemProps {
  user: IUser;
  key: string;
}

const UserListItem = (props: UserListItemProps) => {
  let { user } = props;
  const auth = useAuth();

  const navigation = useNavigation();

  const onClick = () => {
    if (!!auth && !!auth.authData) {
      if (user.userId === auth.authData.userId) {
        navigation.navigate('Profile');
      } else {
        navigation.navigate('UserProfile', { id: user.userId, name: user.firstName + ' ' + user.lastName });
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.profileImageContainer}>
        {!!user && !!user.imageUri ? (
          <Image source={{ uri: imageBaseUrl + user.imageUri }} style={styles.profileImage as ImageStyle} />
        ) : (
          <Image source={require('../../assets/images/celebrity.png')} style={styles.profileImage as ImageStyle} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  profileImageContainer: {
    marginVertical: 5,
    marginHorizontal: -10,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderColor: 'black',
    borderWidth: 2,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
});
export default UserListItem;
