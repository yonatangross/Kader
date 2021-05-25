import { Button, Icon, Text } from '@ui-kitten/components';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import PostListItem from '../components/PostListItem';
import { View } from '../components/Themed';
import { IPost } from '../types/IPost';
import CreateGeneralPostModal from '../components/CreateGeneralPostModal';
import { getPostsForUser } from '../services/posts';
import CreateGroupModal from '../components/CreateGroupModal';
import LoadingIndicator from '../components/LoadingIndicator';

export interface HomeProps {}

const HomeScreen = () => {
  const [visibleCreatePost, setVisibleCreatePost] = useState<boolean>(false);
  const [visibleCreateGroup, setVisibleCreateGroup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<IPost[]>();

  useEffect(() => {
    let isMounted = true;
    getPostsForUser()
      .then((response) => {
        if (isMounted) {
          const postsResult: IPost[] = response.data;
          setPosts(postsResult);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(`error while fetching posts ${error}`);
      });
    () => {
      isMounted = false;
    };
  }, [setPosts, setLoading, setVisibleCreateGroup, setVisibleCreatePost]);

  const renderPostListItem = ({ item }: any) => {
    return <PostListItem post={item} key={item.postId} showComments={true} />;
  };
  if (!!posts) {
    return (
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setVisibleCreatePost(!visibleCreatePost);
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
        <CreateGeneralPostModal visible={visibleCreatePost} setVisible={setVisibleCreatePost} />
        <CreateGroupModal visible={visibleCreateGroup} setVisible={setVisibleCreateGroup} />
        <FlatList
          style={{ width: '100%', marginVertical: 0 }}
          data={posts}
          renderItem={renderPostListItem}
          keyExtractor={(item) => item.postId}
          initialNumToRender={6}
          maxToRenderPerBatch={2}
          showsVerticalScrollIndicator={false}
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
