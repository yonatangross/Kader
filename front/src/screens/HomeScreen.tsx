import { Text } from '@ui-kitten/components';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import PostListItem from '../components/PostListItem';
import { View } from '../components/Themed';
import { IPost } from '../types/IPost';
import CreateGeneralPostModal from '../components/CreateGeneralPostModal';
import { getPostsForUser, getRecommendedPosts } from '../services/posts';
import CreateGroupModal from '../components/CreateGroupModal';
import LoadingIndicator from '../components/LoadingIndicator';
import { useAuth } from '../contexts/Auth';
import { getUser } from '../services/users';
import { IUser } from '../types/IUser';
import Alert from '../components/Alert';

export interface HomeProps {}

const HomeScreen = () => {
  const auth = useAuth();
  const [visibleCreatePost, setVisibleCreatePost] = useState<boolean>(false);
  const [visibleCreateGroup, setVisibleCreateGroup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [groupsNumber, setGroupsNumber] = useState<number>(0);
  const [showErrorCreatingPost, setShowErrorCreatingPost] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getRecommendedPosts()
      .then((response) => {
        const postsResult: IPost[] = response.data;
        setPosts(postsResult);
        if (!!auth && !!auth.authData) {
          getUser(auth.authData?.userId)
            .then((response) => {
              const userResponse: IUser = response.data;
              setGroupsNumber(userResponse.memberInGroupsCount);
              setRefreshing(false);
              setLoading(false);
            })
            .catch((error) => {
              console.log(`error while fetching ${auth.authData?.userId} data.`);
              console.log(error);
              setRefreshing(false);
            });
        }
      })
      .catch((error) => {
        console.log(`error while fetching posts ${error}`);
        setRefreshing(false);
      });
  }, [refreshing]);

  useEffect(() => {
    let isMounted = true;
    getRecommendedPosts()
      .then((response) => {
        if (isMounted) {
          const postsResult: IPost[] = response.data;
          setPosts(postsResult);
          if (!!auth && !!auth.authData) {
            getUser(auth.authData?.userId)
              .then((response) => {
                const userResponse: IUser = response.data;
                setGroupsNumber(userResponse.memberInGroupsCount);
                setLoading(false);
              })
              .catch((error) => {
                console.log(`error while fetching ${auth.authData?.userId} data.`);
                console.log(error);
              });
          }
        }
      })
      .catch((error) => {
        console.log(`error while fetching posts ${error}`);
      });
    () => {
      isMounted = false;
    };
  }, [setPosts, loading, visibleCreateGroup, visibleCreatePost, showErrorCreatingPost, setGroupsNumber, refreshing]);

  const renderPostListItem = ({ item: item }: { item: IPost }) => {
    return <PostListItem post={item} key={item.postId} showComments={true} groupName={item.groupName} groupCategory={item.category} />;
  };
  if (!!posts) {
    return (
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (groupsNumber > 0) {
                setVisibleCreatePost(!visibleCreatePost);
              } else {
                setShowErrorCreatingPost(true);
              }
            }}
            style={styles.buttonContainer}
          >
            <Text style={styles.postCreationText}>Create Post</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setVisibleCreateGroup(!visibleCreateGroup);
            }}
            style={styles.buttonContainer}
          >
            <Text style={styles.postCreationText}>Create Group</Text>
          </TouchableOpacity>
        </View>
        {showErrorCreatingPost && (
          <Alert
            title={'Ooops!'}
            message={'Please join a group first!'}
            showErrorCreatingPost={showErrorCreatingPost}
            setShowErrorCreatingPost={setShowErrorCreatingPost}
          />
        )}
        <CreateGeneralPostModal visible={visibleCreatePost} setVisible={setVisibleCreatePost} />
        <CreateGroupModal visible={visibleCreateGroup} setVisible={setVisibleCreateGroup} />
        <FlatList
          style={{ width: '100%' }}
          data={posts}
          renderItem={renderPostListItem}
          keyExtractor={(item) => item.postId}
          initialNumToRender={6}
          maxToRenderPerBatch={2}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl enabled={true} refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </View>
    );
  } else return loading && <LoadingIndicator />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  postCreationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 32,
    height: 32,
  },

  buttonsContainer: {
    marginVertical: 0,
    marginBottom: 10,
    marginTop: -10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: 'white',
  },
  buttonContainer: {
    margin: 10,
    backgroundColor: '#4975aa',
    borderRadius: 30,
    alignItems: 'center',
    width: 120,
    height: 40,
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
});

export default HomeScreen;
