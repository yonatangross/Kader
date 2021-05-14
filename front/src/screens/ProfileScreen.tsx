import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, ListRenderItemInfo, StyleSheet, View, Image, SectionList, SafeAreaView } from 'react-native';
import { Avatar, Button, Card, Layout, Text } from '@ui-kitten/components';
import { ProfileSocial } from '../layouts/social/profile/extra/profile-social.component';
import { HeartIcon } from '../layouts/social/profile/extra/icons';
import { Post, Profile } from '../layouts/social/profile/extra/data';
import { useAuth } from '../contexts/Auth';
import { getUser } from '../services/users';
import { IUser } from '../types/IUser';
import StarRating from '../components/StarRating';
import { TouchableOpacity } from 'react-native';
import { IPost } from '../types/IPost';
import { IGroup } from '../types/IGroup';
import PostListItem from '../components/PostListItem';
import GroupListItem from '../components/GroupListItem';

const profile: Profile = Profile.jenniferGreen();

interface ISectionsData {
  title: string;
  data: any[];
  key: string;
  renderItem: any;
}

export default function ProfileScreen(navigation: any) {
  const auth = useAuth();
  const [user, setUser] = useState<IUser>();
  const renderPostItem = ({ item }: any) => {
    return <PostListItem post={item} />;
  };
  const renderGroupItem = ({ item }: any) => {
    console.log(item);

    return <GroupListItem group={item} />;
  };

  useEffect(() => {
    if (!!auth && !!auth.authData) {
      getUser(auth.authData.userId)
        .then((response) => {
          // console.log('user data: ' + response.data);

          const userResult: IUser = response.data;
          setUser(userResult);
        })
        .catch((error) => {
          console.log(`error while fetching user data ${error}`);
        });
    }
  }, []);

  const signOut = () => {
    auth.signOut();
  };

  if (user) {
    return (
      <View style={styles.container}>
        <View style={styles.userBasicDetailsContainer}>
          <Avatar size="large" source={profile.photo} style={styles.profileAvatar} />
          <Text category="h4">{user?.firstName + ' ' + user?.lastName}</Text>
          <Text appearance="hint" category="s1">
            {user?.email}
          </Text>
          <View style={styles.userDataContainer}>
            <ProfileSocial style={styles.userDataItemContainer} hint="Posts" value={`${!user.posts ? 0 : user.posts.length}`} />
            <ProfileSocial style={styles.userDataItemContainer} hint="Groups" value={`${!user.memberInGroups ? 0 : user.memberInGroups.length}`} />
            <ProfileSocial style={styles.userDataItemContainer} hint="Managed Groups" value={`${!user.managerInGroups ? 0 : user.managerInGroups.length}`} />
          </View>

          {/* <StarRating numOfStars={user?.rating} numOfRatings={user?.numberOfRatings} displayRatings={false} /> */}
        </View>

        <View style={styles.userListsContainer}>
          <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 20, paddingHorizontal: 10 }}>Posts</Text>
          <SafeAreaView style={styles.postsContainer}>
            <FlatList
              data={user.posts}
              renderItem={renderPostItem}
              keyExtractor={(item) => item.postId}
              showsVerticalScrollIndicator={true}
              initialNumToRender={6}
              maxToRenderPerBatch={2}
            />
          </SafeAreaView>
          <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 20, paddingHorizontal: 10 }}>Groups</Text>
          <SafeAreaView style={styles.groupsContainer}>
            <FlatList
              data={user.memberInGroups}
              renderItem={renderGroupItem}
              keyExtractor={(item) => item.groupId}
              showsVerticalScrollIndicator={true}
              initialNumToRender={6}
              maxToRenderPerBatch={2}
            />
          </SafeAreaView>
          <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 20, paddingHorizontal: 10 }}>Managed Groups</Text>
          <SafeAreaView style={styles.ManagedGroupsContainer}>
            <FlatList
              data={user.managerInGroups}
              renderItem={renderGroupItem}
              keyExtractor={(item) => item.groupId}
              showsVerticalScrollIndicator={true}
              initialNumToRender={6}
              maxToRenderPerBatch={2}
            />
          </SafeAreaView>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={signOut} style={styles.logoutButton}>
          <Image source={require('../assets/images/log-out.png')} style={styles.floatingButtonStyle} />
        </TouchableOpacity>
      </View>
    );
  } else
    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 20, paddingHorizontal: 10 }}>{auth.authData?.firstName}</Text>

        <TouchableOpacity activeOpacity={0.7} onPress={signOut} style={styles.logoutButton}>
          <Image source={require('../assets/images/log-out.png')} style={styles.floatingButtonStyle} />
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'flex-start', backgroundColor: 'white' },
  membersContainer: { flex: 1, marginVertical: -40 },
  postsContainer: { flex: 5, marginTop: -40 },
  groupsContainer: { flex: 5, marginTop: -40 },
  ManagedGroupsContainer: { flex: 5, marginTop: -40 },
  userListsContainer: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 32,
    height: 32,
  },
  logoutButton: {
    backgroundColor: 'white',
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 15,
    bottom: 30,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
    borderColor: 'black',
    borderWidth: 0.8,
  },
  profileAvatar: {
    marginHorizontal: 8,
  },
  userBasicDetailsContainer: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
  },
  userDataContainer: {
    flexDirection: 'row',
  },
  sectionsContainer: {},

  userDataItemContainer: {
    flex: 1,
  },
});
