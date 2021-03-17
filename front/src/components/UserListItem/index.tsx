import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { IUser } from '../../types/IUser';
import { useNavigation } from '@react-navigation/native';
const testImage = require('../../assets/images/test.png');
import StarRating from '../StarRating/index';
import { Avatar } from '@ui-kitten/components';

export interface UserListItemProps {
  user: IUser;
}

const UserListItem = (props: UserListItemProps) => {
  let { user } = props;

  const navigation = useNavigation();

  // const onClick = () => {
  //   navigation.navigate('Profile', {
  //     id: user.id,
  //   });
  // };

  return (
    // <TouchableWithoutFeedback onPress={onClick}>
    <View style={styles.ImageContainer}>
      <Avatar style={styles.profileAvatar} size="large" source={require('../../layouts/social/profile/assets/image-profile-1.jpg')} />
    </View>
    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    padding: 5,
    alignItems: 'flex-start',
  },
  profileAvatar: {
    marginHorizontal: 8,
  },
});
export default UserListItem;
