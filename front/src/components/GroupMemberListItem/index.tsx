import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Image, Text, ImageStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { imageBaseUrl } from '../../services/axios';
import { IUser } from '../../types/IUser';

export interface GroupMemberListItemProps {
  user: IUser;
  key: string;
}

const GroupMemberListItem = (props: GroupMemberListItemProps) => {
  let { user } = props;

  const navigation = useNavigation();

  const onClick = () => {
    navigation.navigate('UserProfile', {
      id: user.userId,
    });
  };

  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.GroupListItemContainer}>
        <View style={styles.profileImageContainer}>
          {!!user && !!user.imageUri ? (
            <Image source={{ uri: imageBaseUrl + user.imageUri }} style={styles.profileImage as ImageStyle} />
          ) : (
            <Image source={require('../../assets/images/imagePlaceholder.png')} style={styles.profileImage as ImageStyle} />
          )}
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.upperText}>{user.firstName + ' ' + user.lastName}</Text>
        </View>
        <View style={styles.goToContainer}>
          <Image source={require('../../assets/images/right-arrow2.png')} style={styles.goToIcon as ImageStyle} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileImageContainer: {
    marginLeft: 30,
    marginVertical: 5,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
    borderColor: 'black',
    borderWidth: 2,
  },
  profileImage: {
    height: 35,
    width: 35,
    borderRadius: 100,
  },
  goToContainer: {
    marginHorizontal: 30,
    marginLeft: 0,
    borderRadius: 15,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
  },
  goToIcon: {
    marginVertical: 15,
    height: 35,
    width: 35,
    resizeMode: 'contain',
  },
  categoryContainer: {
    margin: 15,
    marginRight: 20,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 10,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
  categoryIcon: {
    marginVertical: 15,
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  GroupListItemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginVertical: 5,
    marginHorizontal: 20,
    width: '100%',
    borderBottomColor: '#f8f7fa',
    borderBottomWidth: 1,
  },
  groupCategoryImageContainer: { flexDirection: 'column', justifyContent: 'center', alignContent: 'center', marginRight: 20 },
  dataContainer: { flexDirection: 'column', alignItems: 'flex-start', marginLeft: 20, backgroundColor: 'transparent', width: '65%' },
  upperContainer: { flexDirection: 'row', alignItems: 'flex-start', width: '100%' },
  middleContainer: { flexDirection: 'row', width: '100%' },
  lowerContainer: { flexDirection: 'row', width: '100%' },
  linkContainer: { flexDirection: 'column', alignItems: 'center' },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0eff5',
    marginLeft: 20,
  },
  profileAvatar: {
    marginHorizontal: 8,
  },
  goToGroupButton: {
    color: '#96bfe5',
  },
  upperText: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 26,
  },
  dataText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default GroupMemberListItem;
