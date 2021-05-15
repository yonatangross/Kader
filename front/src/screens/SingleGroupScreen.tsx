import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, FlatList, TouchableOpacity, Image, StatusBar } from 'react-native';
import _ from 'lodash';
import { Text } from '@ui-kitten/components';

import { getGroup } from '../services/groups';
import PostListItem from '../components/PostListItem';
import UserListItem from '../components/UserListItem';
import { IGroup } from '../types/IGroup';
import { getGroupPrivacyName } from '../types/GroupPrivacy';
import CreateGroupPostModal from '../components/CreateGroupPostModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import GroupManagementPanel from '../components/GroupManagementPanel';
import { useAuth } from '../contexts/Auth';

export interface SingleGroupScreenProps {}

const SingleGroupScreen = (props: SingleGroupScreenProps) => {
  const route = useRoute();
  const auth = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleCreatePost, setVisibleCreatePost] = useState<boolean>(false);
  const [group, setGroup] = useState<IGroup>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    if (route.params) {
      const params: any = route.params;
      getGroup(params.id)
        .then((response) => {
          if (mounted) {
            const groupResponse: IGroup = response.data.group;
            setIsAdmin(
              _.some(groupResponse.managers, (user) => {
                if (user.id === auth.authData?.userId) return true;
              })
            );
            setGroup(groupResponse);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(`error fetching group ${params.id}, error: ${error}`);
        });
    } else {
      console.log(`error fetching route.params`);
    }
    () => {
      mounted = false;
    };
  }, []);

  if (!!group) {
    return (
      <View style={styles.container}>
        <CreateGroupPostModal visible={visibleCreatePost} setVisible={setVisibleCreatePost} groupId={group.groupId} />
        <Text style={styles.text} category="h5">
          {group.name}
        </Text>
        <Text style={styles.text} category="h6">
          {group.description}
        </Text>
        <GroupManagementPanel isAdmin={isAdmin} />
        <Text style={styles.text} category="c1">
          Group Privacy: {getGroupPrivacyName(group.groupPrivacy)}
        </Text>
        <Text style={styles.text} category="c2">
          {group.members.length} members
        </Text>
        <SafeAreaView style={styles.membersContainer}>
          <FlatList
            data={group.members}
            renderItem={({ item: user }) => <UserListItem user={user} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            horizontal
          />
        </SafeAreaView>
        <SafeAreaView style={styles.postsContainer}>
          <FlatList
            data={group.posts}
            renderItem={({ item: post }) => <PostListItem post={post} />}
            keyExtractor={(item) => item.postId}
            showsVerticalScrollIndicator={true}
          />
        </SafeAreaView>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setVisibleCreatePost(!visibleCreatePost);
          }}
          style={styles.postCreationButton}
        >
          <Image source={require('../assets/images/createPostIcon.png')} style={styles.floatingButtonStyle} />
        </TouchableOpacity>
      </View>
    );
  } else return <View>{loading ? <p>loading...</p> : <p>Fetched!!</p>}</View>;
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  membersContainer: { flex: 1, marginVertical: -40 },
  postsContainer: { flex: 5, marginTop: -40 },
  text: {
    margin: 5,
    alignSelf: 'center',
  },
  postCreationButton: {
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
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 32,
    height: 32,
    //backgroundColor:'black'
  },
});

export default SingleGroupScreen;
