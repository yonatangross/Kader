import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Text } from 'react-native';
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

export interface SingleGroupScreenProps {}

const SingleGroupScreen = (props: SingleGroupScreenProps) => {
  const route = useRoute();
  const auth = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleCreatePost, setVisibleCreatePost] = useState<boolean>(false);
  const [group, setGroup] = useState<IGroup>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  let [fontsLoaded] = useFonts({
    Pattaya: require('../assets/fonts/Pattaya/Pattaya-Regular.ttf'),
  });
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
  }, [fontsLoaded, setGroup]);

  const renderMemberListItem = ({ item }: any) => {
    return <UserListItem user={item} key={item.id} />;
  };

  const renderPostListItem = ({ item }: any) => {
    return <PostListItem post={item} key={item.postId} showComments={true} />;
  };

  if (!!group && fontsLoaded) {
    return (
      <View style={styles.container}>
        <CreateGroupPostModal visible={visibleCreatePost} setVisible={setVisibleCreatePost} groupId={group.groupId} />
        <View style={styles.groupDataContainer}>
          <GroupManagementPanel group={group} isAdmin={isAdmin} />
          <Text style={styles.nameText}>{group.name}</Text>
          <Text style={styles.descriptionText}>{group.description}</Text>
          <Text style={styles.groupPrivacyText}>Group Privacy: {getGroupPrivacyName(group.groupPrivacy)}</Text>

          <View style={styles.membersContainer}>
            <View style={styles.membersHeaderContainer}>
              <Text style={styles.membersLengthText}>{group.members.length} members</Text>
            </View>
            <FlatList
              contentContainerStyle={{ flex: 1, justifyContent: 'space-around' }}
              data={group.members}
              renderItem={renderMemberListItem}
              keyExtractor={(item, index) => item.id + index.toString()}
              showsVerticalScrollIndicator={false}
              horizontal
            />
          </View>
        </View>
        <FlatList
          style={styles.postsContainer}
          data={group.posts}
          renderItem={renderPostListItem}
          keyExtractor={(item) => item.postId}
          showsVerticalScrollIndicator={true}
        />
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
  } else return <View>{loading ? <Text>loading...</Text> : <Text>Fetched!!</Text>}</View>;
};

const styles = StyleSheet.create({
  groupDataContainer: { flexDirection: 'column', backgroundColor: 'white', width: '100%' },
  container: { flexDirection: 'column', width: '100%' },
  membersHeaderContainer: { alignItems: 'center' },
  membersContainer: { flexDirection: 'column', marginBottom: 10 },
  postsContainer: { flexDirection: 'column', width: '100%' },
  nameText: {
    alignSelf: 'center',
    fontSize: 42,
    fontFamily: 'Pattaya',
    color: '#f2a854',
  },
  groupPrivacyText: { alignSelf: 'center', fontSize: 20 },
  descriptionText: { alignSelf: 'center', fontSize: 16 },
  membersLengthText: { alignSelf: 'center', fontSize: 20 },
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
