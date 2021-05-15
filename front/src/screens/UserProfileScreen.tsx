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
import { useNavigation, useRoute } from '@react-navigation/native';
import ProfilePostListItem from '../components/ProfilePostListItem';
import ProfileGroupListItem from '../components/ProfileGroupListItem';
import { getPostsForUser } from '../services/posts';
import { getGroupsForUser } from '../services/groups';
import _ from 'lodash';

const profile: Profile = Profile.jenniferGreen();

interface ISectionsData {
  title: string;
  data: any[];
  key: string;
  renderItem: any;
}

export default function UserProfileScreen(navigation: any) {
  const route = useRoute();

  const [user, setUser] = useState<IUser>();
  const [userPosts, setUserPosts] = useState<IPost[]>();
  const [userGroups, setUserGroups] = useState<IGroup[]>();

  const renderPostItem = ({ item }: any) => {
    return <ProfilePostListItem key={item.postId} post={item} />;
  };
  const renderGroupItem = ({ item }: any) => {
    return <ProfileGroupListItem key={item.groupId} group={item} />;
  };
  useEffect(() => {
    if (route.params) {
      const params: any = route.params;
      getUser(params.id)
        .then((response) => {
          const userResponse: IUser = response.data;
          setUser(userResponse);
          getPostsForUser(params.id)
            .then((response) => {
              const userPostsResult: IPost[] = response.data;
              setUserPosts(userPostsResult);
            })
            .catch((error) => console.log(`error while fetching ${params.id} posts, ${error}`));
          getGroupsForUser(params.id)
            .then((response) => {
              const userGroupsResult: IGroup[] = response.data;
              _.filter(userGroupsResult, (group) => {
                !group.isManager;
              });
              setUserGroups(userGroupsResult);
            })
            .catch((error) => console.log(`error while fetching ${params.id} groups, ${error}`));
        })
        .catch((error) => {
          console.log(`error while fetching user data ${error}`);
        });
    }
  }, []);

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
            <ProfileSocial style={styles.userDataItemContainer} hint="Posts" value={`${!userPosts?.length ? 0 : userPosts.length}`} />
            <ProfileSocial style={styles.userDataItemContainer} hint="Groups" value={`${!userGroups?.length ? 0 : userGroups.length}`} />
          </View>

          {/* <StarRating numOfStars={user?.rating} numOfRatings={user?.numberOfRatings} displayRatings={false} /> */}
        </View>

        <View style={styles.userListsContainer}>
          <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 20, paddingHorizontal: 10 }}>Posts</Text>
          <SafeAreaView style={styles.postsContainer}>
            <FlatList
              data={userPosts}
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
              data={userGroups}
              renderItem={renderGroupItem}
              keyExtractor={(item) => item.groupId}
              showsVerticalScrollIndicator={true}
              initialNumToRender={6}
              maxToRenderPerBatch={2}
            />
          </SafeAreaView>
          <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 20, paddingHorizontal: 10 }}>Managed Groups</Text>
        </View>
      </View>
    );
  } else
    return (
      <View style={styles.container}>
        <Text>Loading User data...</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'flex-start', backgroundColor: 'white' },
  postsContainer: { flex: 2 },
  groupsContainer: { flex: 2 },
  userListsContainer: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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
