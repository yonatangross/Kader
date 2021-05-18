import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { IUser } from '../../types/IUser';
import { useNavigation } from '@react-navigation/native';
const testImage = require('../../assets/images/test.png');
import StarRating from '../StarRating/index';
import { Avatar } from '@ui-kitten/components';
import { useAuth } from '../../contexts/Auth';

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
      if (user.id === auth.authData.userId) {
        navigation.navigate('Profile');
      } else {
        navigation.navigate('UserProfile', { id: user.id, name: user.firstName + ' ' + user.lastName });
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.ImageContainer}>
        <Avatar style={styles.profileAvatar} size="large" source={require('../../assets/images/imagePlaceholder.png')} />
      </View>
    </TouchableWithoutFeedback>
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
