import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ImageStyle, Text, Alert, Platform } from 'react-native';
import { ProfileSocial } from '../layouts/social/profile/extra/profile-social.component';
import { useAuth } from '../contexts/Auth';
import { getUser } from '../services/users';
import { IUser } from '../types/IUser';
import { TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/core';
import { useFonts } from 'expo-font';
import { imageBaseUrl } from '../services/axios';
import { Linking } from 'react-native';
import { Fontisto, SimpleLineIcons } from '@expo/vector-icons';
import { capitalize } from '../utils/text';
import { Rating } from 'react-native-elements';

export default function ProfileScreen() {
  const auth = useAuth();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [user, setUser] = useState<IUser>();

  let [fontsLoaded] = useFonts({
    Pattaya: require('../assets/fonts/Pattaya/Pattaya-Regular.ttf'),
    Fredoka_One: require('../assets/fonts/Fredoka_One/FredokaOne-Regular.ttf'),
  });

  
  useEffect(() => {
    if (!!auth && !!auth.authData) {
      getUser(auth.authData.userId)
        .then((response) => {
          const userResult: IUser = response.data;
          setUser(userResult);
        })
        .catch((error) => {
          console.log(`error while fetching user data:`);
          console.log(error);
        });
    }
  }, [user, fontsLoaded, isFocused, navigation, setUser, auth]);

  const signOut = () => {
    auth.signOut();
  };

  const onPressUserPosts = () => {
    if (!!user)
      navigation.navigate('UserPosts', {
        user: user,
      });
  };

  const onPressUserGroups = () => {
    if (!!user)
      navigation.navigate('UserGroups', {
        user: user,
      });
  };

  const onPressUserSettings = () => {
    if (!!user)
      navigation.navigate('UserSettings', {
        user: user,
      });
  };

  const callNumber = (phone: string) => {
    console.log('callNumber ----> ', phone);
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };

  if (!!user && fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.userBasicDetailsContainer}>
          <View style={styles.profileImageContainer}>
            {!!user.imageUri ? (
              <Image source={{ uri: imageBaseUrl + user.imageUri }} style={styles.profileImage as ImageStyle} />
            ) : (
              <Image source={require('../assets/images/celebrity.png')} style={styles.profileImage as ImageStyle} />
            )}
          </View>
          <Text style={styles.fullNameText}>{capitalize(user?.firstName) + ' ' + capitalize(user?.lastName)}</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={signOut} style={styles.logoutButton}>
            <Image source={require('../assets/images/log-out.png')} style={styles.floatingButtonStyle} />
          </TouchableOpacity>
        </View>
        <View style={styles.userContactInfoContainer}>
          {!!user.phoneNumber && (
            <TouchableOpacity onPress={() => callNumber(user.phoneNumber)} style={styles.userContactInfoItem}>
              <SimpleLineIcons name="call-in" color={'#4975aa'} size={22} />
              <Text style={styles.phoneText}> {user.phoneNumber.replace(/[^\d]+/g, '')}</Text>
            </TouchableOpacity>
          )}
          {!!user.email && (
            <TouchableOpacity onPress={() => Linking.openURL(`mailto:${user.email}?subject=Kader App&body=Description`)} style={styles.userDataContainer}>
              <Fontisto name="email" color={'#4975aa'} size={22} />
              <Text style={styles.phoneText}> {user.email}</Text>
            </TouchableOpacity>
          )}
          {!!user.rating && (
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingNumberText}>Ratings: {user.numberOfRating}</Text>
              <Rating readonly ratingColor="#f3a953" imageSize={22} startingValue={user.rating} ratingCount={5} />
            </View>
          )}
        </View>
        <View style={styles.userDataContainer}>
          <ProfileSocial style={styles.userDataItemContainer} hint="Posts" value={`${!user.postsCount ? 0 : user.postsCount}`} />
          <ProfileSocial style={styles.userDataItemContainer} hint="Groups" value={`${!user.memberInGroupsCount ? 0 : user.memberInGroupsCount}`} />
          <ProfileSocial style={styles.userDataItemContainer} hint="Managed Groups" value={`${!user.managerInGroupsCount ? 0 : user.managerInGroupsCount}`} />
        </View>

        <View style={styles.UserActionListsContainer}>
          <TouchableOpacity onPress={onPressUserPosts} style={styles.actionItemButton}>
            <View style={styles.categoryContainer}>
              <Image source={require('../assets/images/posts.png')} style={styles.categoryIcon as ImageStyle} />
            </View>
            <Text style={styles.actionItemText}>Posts</Text>
            <View style={styles.goToContainer}>
              <Image source={require('../assets/images/right-arrow2.png')} style={styles.goToIcon as ImageStyle} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressUserGroups} style={styles.actionItemButton}>
            <View style={styles.categoryContainer}>
              <Image source={require('../assets/images/group.png')} style={styles.categoryIcon as ImageStyle} />
            </View>
            <Text style={styles.actionItemText}>Groups</Text>
            <View style={styles.goToContainer}>
              <Image source={require('../assets/images/right-arrow2.png')} style={styles.goToIcon as ImageStyle} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressUserSettings} style={styles.actionItemButton}>
            <View style={styles.categoryContainer}>
              <Image source={require('../assets/images/settings3.png')} style={styles.categoryIcon as ImageStyle} />
            </View>
            <Text style={styles.actionItemText}>Settings</Text>
            <View style={styles.goToContainer}>
              <Image source={require('../assets/images/right-arrow2.png')} style={styles.goToIcon as ImageStyle} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.7} onPress={signOut} style={styles.logoutButton}>
          <Image source={require('../assets/images/log-out.png')} style={styles.floatingButtonStyle} />
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  ratingNumberText: { fontWeight: '600', fontSize: 20, marginBottom: 5 },
  ratingContainer: { justifyContent: 'center', alignItems: 'center', margin: 15, flexDirection: 'column' },
  userContactInfoContainer: { justifyContent: 'center', alignItems: 'center', flexDirection: 'column' },
  userContactInfoItem: { alignSelf: 'center', marginRight: 10, marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  fullNameText: { fontFamily: 'Fredoka_One', fontSize: 36, marginTop: 15 },
  phoneText: { fontWeight: '700', fontSize: 18 },
  actionItemText: {
    fontFamily: 'Fredoka_One',
    textAlign: 'left',
    marginLeft: 40,
    fontSize: 26,
    width: '30%',
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
    marginLeft: 30,
    marginRight: 0,

    borderRadius: 15,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
  },
  categoryIcon: {
    marginVertical: 15,
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  container: { flex: 1, backgroundColor: 'white', flexDirection: 'column' },
  actionItemButton: { flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginVertical: 30 },
  UserActionListsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  logoutButton: {
    marginTop: 20,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatar: {
    marginHorizontal: 8,
  },
  userBasicDetailsContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  userDataContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionsContainer: {},

  userDataItemContainer: {
    flex: 1,
  },
  profileImageContainer: {
    margin: 20,
    marginLeft: 10,
    marginRight: 0,
    marginBottom: 2,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#0000',
    borderColor: 'black',
    borderWidth: 2,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});
