import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Text, TouchableWithoutFeedback, RefreshControl } from 'react-native';
import _ from 'lodash';
import { getGroup } from '../services/groups';
import PostListItem from '../components/PostListItem';
import UserListItem from '../components/UserListItem';
import { IGroup } from '../types/IGroup';
import { getGroupPrivacyName } from '../types/GroupPrivacy';
import CreateGroupPostModal from '../components/CreateGroupPostModal';
import GroupManagementPanel from '../components/GroupManagementPanel';
import { useAuth } from '../contexts/Auth';
import { useFonts } from 'expo-font';
import LoadingIndicator from '../components/LoadingIndicator';
import { IPost } from '../types/IPost';
import { IUser } from '../types/IUser';
import { capitalize } from '../utils/text';
import EditGroupModal from '../components/EditGroupModal';

export interface SingleGroupScreenProps {}

const SingleGroupScreen = () => {
  const route = useRoute();
  const auth = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleCreatePost, setVisibleCreatePost] = useState<boolean>(false);
  const [group, setGroup] = useState<IGroup>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [editGroupVisible, setEditGroupVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  let [fontsLoaded] = useFonts({
    Pattaya: require('../assets/fonts/Pattaya/Pattaya-Regular.ttf'),
  });

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    if (route.params) {
      const params: any = route.params;
      getGroup(params.id)
        .then((response) => {
          const groupResponse: IGroup = response.data;
          setIsAdmin(
            _.some(groupResponse.managers, (user) => {
              if (user.userId === auth.authData?.userId) return true;
            })
          );
          setGroup(groupResponse);
          setLoading(false);
          setRefreshing(false);
        })
        .catch((error) => {
          console.log(`error fetching group ${params.id}, error:`);
          console.log(error);
          setRefreshing(false);
        });
    } else {
      console.log(`error fetching route.params`);
      setRefreshing(false);
    }
  }, [refreshing]);

  useEffect(() => {
    let mounted = true;

    if (route.params) {
      const params: any = route.params;
      getGroup(params.id)
        .then((response) => {
          if (mounted) {
            const groupResponse: IGroup = response.data;

            setIsAdmin(
              _.some(groupResponse.managers, (user) => {
                if (user.userId === auth.authData?.userId) return true;
              })
            );
            setGroup(groupResponse);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(`error fetching group ${params.id}, error:`);
          console.log(error);
        });
    } else {
      console.log(`error fetching route.params`);
    }
    () => {
      mounted = false;
    };
  }, [fontsLoaded, setGroup, visibleCreatePost, setVisibleCreatePost, setLoading, isUpdated, setIsUpdated, refreshing, setEditGroupVisible, editGroupVisible]);

  const renderMemberListItem = ({ item: item }: { item: IUser }) => {
    return <UserListItem user={item} key={item.userId} />;
  };
  const renderPostListItem = ({ item: item }: { item: IPost }) => {
    return <PostListItem post={item} key={item.postId} showComments={true} groupName={group?.name} groupCategory={group?.category} />;
  };

  if (!!group && fontsLoaded) {
    return (
      <View style={styles.container}>
        <CreateGroupPostModal
          visible={visibleCreatePost}
          setVisible={setVisibleCreatePost}
          groupId={group.groupId}
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
        />
        <EditGroupModal visible={editGroupVisible} setVisible={setEditGroupVisible} group={group} />
        <View style={styles.groupDataContainer}>
          <GroupManagementPanel
            group={group}
            isAdmin={isAdmin}
            isUpdated={isUpdated}
            setIsUpdated={setIsUpdated}
            editGroupVisible={editGroupVisible}
            setEditGroupVisible={setEditGroupVisible}
          />
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{capitalize(group.name)}</Text>
            <Text style={styles.descriptionText}>{capitalize(group.description)}</Text>
            <Text style={styles.groupPrivacyText}>Group privacy: {getGroupPrivacyName(group.groupPrivacy)}</Text>
          </View>
          <View style={styles.membersContainer}>
            <FlatList
              contentContainerStyle={{ flex: 0.9, justifyContent: 'center', width: '100%' }}
              data={group.members.slice(0, 7)}
              renderItem={renderMemberListItem}
              keyExtractor={(item, index) => item.userId + index.toString()}
              showsHorizontalScrollIndicator={true}
              ListFooterComponentStyle={{ flex: 0.1 }}
              ListFooterComponent={
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate('GroupMembers', {
                      id: group.groupId,
                    });
                  }}
                >
                  <View style={[styles.profileImageContainer]}>
                    {group.members.length - 7 <= 0 ? (
                      <Text style={styles.extraMembersText}>... </Text>
                    ) : (
                      <Text style={styles.extraMembersText}>+{group.members.length - 7}</Text>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              }
              horizontal
            />
          </View>
        </View>
        {group.postsCount !== 0 ? (
          <FlatList
            style={styles.postsContainer}
            data={group.posts}
            renderItem={renderPostListItem}
            keyExtractor={(item) => item.postId}
            showsVerticalScrollIndicator={true}
            refreshControl={<RefreshControl enabled={true} refreshing={refreshing} onRefresh={onRefresh} />}
          />
        ) : (
          <View style={styles.noPostsMessageContainer}>
            <Text style={styles.noPostsMessageText}>Be the first to post on {group.name}!</Text>
          </View>
        )}
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
  } else return loading && <LoadingIndicator />;
};

const styles = StyleSheet.create({
  textContainer: { flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  noPostsMessageContainer: { marginHorizontal: 20, alignItems: 'center' },
  noPostsMessageText: { fontSize: 24 },
  extraMembersText: { textAlign: 'center', justifyContent: 'center', fontSize: 12, width: 30 },
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
  groupDataContainer: { flexDirection: 'column', backgroundColor: 'white', width: '100%', borderBottomColor: '#dedcdf', borderBottomWidth: 10 },
  container: { flexDirection: 'column', width: '100%', height: '100%' },
  membersHeaderContainer: { alignItems: 'center' },
  membersContainer: { flexDirection: 'column', marginBottom: 10 },
  postsContainer: { flexDirection: 'column', width: '100%' },
  nameText: {
    alignSelf: 'center',
    fontSize: 32,
    fontFamily: 'Pattaya',
    color: '#f2a854',
  },
  groupPrivacyText: { alignSelf: 'center', fontSize: 20 },
  descriptionText: { alignSelf: 'center', fontSize: 16 },
  membersLengthText: { alignSelf: 'center', fontSize: 16 },
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
