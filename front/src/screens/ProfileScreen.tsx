import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ImageStyle } from 'react-native';
import { Text } from '@ui-kitten/components';
import { ProfileSocial } from '../layouts/social/profile/extra/profile-social.component';
import { useAuth } from '../contexts/Auth';
import { getUser } from '../services/users';
import { IUser } from '../types/IUser';
import { TouchableOpacity } from 'react-native';
import { IPost } from '../types/IPost';
import { IGroup } from '../types/IGroup';
import { getPostsForUser } from '../services/posts';
import { getGroupsForUser } from '../services/groups';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/core';
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const auth = useAuth();
  const navigation = useNavigation();
  const [user, setUser] = useState<IUser>();
  const [userPosts, setUserPosts] = useState<IPost[]>();
  const [userGroups, setUserGroups] = useState<IGroup[]>();
  const [userManagedGroups, setUserManagedGroups] = useState<IGroup[]>();

  useEffect(() => {
    if (!!auth && !!auth.authData) {
      getUser(auth.authData.userId)
        .then((response) => {
          const userResult: IUser = response.data;
          setUser(userResult);
          getPostsForUser()
            .then((response) => {
              const userPostsResult: IPost[] = response.data;
              setUserPosts(userPostsResult);
            })
            .catch((error) => console.log(`error while fetching ${auth.authData?.userId} posts, ${error}`));
          getGroupsForUser()
            .then((response) => {
              const userGroupsResult: IGroup[] = [];
              const userManagedGroupsResult: IGroup[] = [];
              _.each(response.data, (group) => {
                if (group.isManager) {
                  userGroupsResult.push(group);
                } else {
                  userManagedGroupsResult.push(group);
                }
              });
              setUserGroups(userGroupsResult);
              setUserManagedGroups(userManagedGroupsResult);
            })
            .catch((error) => console.log(`error while fetching ${auth.authData?.userId} groups, ${error}`));
        })
        .catch((error) => {
          console.log(`error while fetching user data ${error}`);
        });
    }
  }, [setUser, setUserPosts, setUserGroups, setUserManagedGroups]);

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

  if (!!user) {
    return (
      <View style={styles.container}>
        <View style={styles.userBasicDetailsContainer}>
          <View style={styles.profileImageContainer}>
            {!!user.imageUri ? (
              <Image source={{ uri: user.imageUri }} style={styles.profileImage as ImageStyle} />
            ) : (
              <Image source={require('../assets/images/imagePlaceholder.png')} style={styles.profileImage as ImageStyle} />
            )}
          </View>
          <Text style={styles.fullNameText}>{user?.firstName + ' ' + user?.lastName}</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={signOut} style={styles.logoutButton}>
            <Image source={require('../assets/images/log-out.png')} style={styles.floatingButtonStyle} />
          </TouchableOpacity>
        </View>

        <Text appearance="hint" category="s1">
          {user?.email}
        </Text>
        <View style={styles.userDataContainer}>
          <ProfileSocial style={styles.userDataItemContainer} hint="Posts" value={`${!userPosts?.length ? 0 : userPosts.length}`} />
          <ProfileSocial style={styles.userDataItemContainer} hint="Groups" value={`${!userGroups?.length ? 0 : userGroups.length}`} />
          <ProfileSocial style={styles.userDataItemContainer} hint="Managed Groups" value={`${!userManagedGroups ? 0 : userManagedGroups.length}`} />
        </View>

        {/* <StarRating numOfStars={user?.rating} numOfRatings={user?.numberOfRatings} displayRatings={false} /> */}

        <View style={styles.UserActionListsContainer}>
          <TouchableOpacity onPress={onPressUserPosts} style={styles.actionItemButton}>
            <MaterialCommunityIcons name="clipboard-multiple-outline" size={40} color={'black'} style={{ marginLeft: 20 }} />
            <Text category="h4">Posts</Text>
            <Ionicons name="ios-arrow-forward-circle-outline" size={42} color={'black'} style={{ marginRight: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressUserGroups} style={styles.actionItemButton}>
            <FontAwesome name="users" size={34} color={'black'} style={{ marginLeft: 20 }} />
            <Text category="h4">Groups</Text>
            <Ionicons name="ios-arrow-forward-circle-outline" size={42} color={'black'} style={{ marginRight: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressUserSettings} style={styles.actionItemButton}>
            <AntDesign name="setting" size={40} color={'black'} style={{ marginLeft: 20 }} />
            <Text category="h4">Settings</Text>
            <Ionicons name="ios-arrow-forward-circle-outline" size={42} color={'black'} style={{ marginRight: 20 }} />
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
  fullNameText: { fontSize: 16, fontWeight: 'bold' },
  container: { flex: 1, backgroundColor: 'white', flexDirection: 'column' },
  actionItemButton: { flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginVertical: 40 },
  UserActionListsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 32,
    height: 32,
  },
  logoutButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionsContainer: {},

  userDataItemContainer: {
    flex: 1,
  },
  profileImageContainer: {
    margin: 15,
    shadowOffset: { width: 15, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 10,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#0000',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
    resizeMode: 'contain',
  },
});
