import { Button, Icon, Text } from '@ui-kitten/components';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import PostListItem from '../components/PostListItem';
import { View } from '../components/Themed';
import { IPost } from '../types/IPost';
import CreateGeneralPostModal from '../components/CreateGeneralPostModal';
import { getPosts } from '../services/posts';
import CreateGroupPostModal from '../components/CreateGroupPostModal';
import { useAuth } from '../contexts/Auth';

export interface HomeProps {}

const HomeScreen = () => {
  const auth = useAuth();
  const signOut = () => {
    auth.signOut();
  };
  const [visibleCreatePost, setVisibleCreatePost] = useState<boolean>(false);
  const [visibleCreateGroup, setVisibleCreateGroup] = useState<boolean>(false);

  const [posts, setPosts] = useState<IPost[]>();
  useEffect(() => {
    getPosts()
      .then((response) => {
        const postsResult: IPost[] = response.data;
        setPosts(postsResult);
        console.log(`posts length: ${postsResult.length}`);
      })
      .catch((error) => {
        console.log(`error while fetching posts ${error}`);
      });
  }, []);

  const PlusIcon = () => <Icon name="plus-circle-outline" style={{ width: 32, height: 32 }} fill={'#4975aa'} />;
  const renderPostListItem = ({ item }: any) => {
    return <PostListItem post={item} key={item.postId} />;
  };
  return (
    <View style={styles.container}>
      <CreateGeneralPostModal visible={visibleCreatePost} onChange={setVisibleCreatePost} />
      <CreateGroupPostModal visible={visibleCreateGroup} onChange={setVisibleCreateGroup} />
      <Button
        style={styles.groupCreationButton}
        status="success"
        accessoryRight={PlusIcon}
        size="small"
        onPress={() => {
          signOut();
        }}
      >
        {(buttonProps: any) => (
          <Text {...buttonProps} style={{ color: '#4975aa' ,fontWeight:'bold'  }}>
            Sign Out
          </Text>
        )}
      </Button>

      <View style={styles.buttonContainer}>
        {/* <CategoryButton buttonContent={'Create Group'} navigationString={'SinglePost'} /> */}
        {/* <CategoryButton buttonContent={'Register'} navigationString={'Register'} />
        <CategoryButton buttonContent={'Login'} navigationString={'Login'} /> */}

        <Button
          style={styles.postCreationButton}
          status="success"
          accessoryRight={PlusIcon}
          size="small"
          onPress={() => {
            setVisibleCreatePost(!visibleCreatePost);
          }}
        >
          {(buttonProps: any) => (
            <Text {...buttonProps} style={{ color: '#4975aa',fontWeight:'bold'  }}>
              Create Post
            </Text>
          )}
        </Button>
        <Button
          style={styles.groupCreationButton}
          status="success"
          accessoryRight={PlusIcon}
          size="small"
          onPress={() => {
            setVisibleCreatePost(!visibleCreatePost);
          }}
        >
          {(buttonProps: any) => (
            <Text {...buttonProps} style={{ color: '#4975aa' ,fontWeight:'bold' }}>
              Create Group
            </Text>
          )}
        </Button>
      </View>
      <FlatList
        style={{ width: '100%' }}
        data={posts}
        renderItem={renderPostListItem}
        keyExtractor={(item) => item.postId}
        initialNumToRender={6}
        maxToRenderPerBatch={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: 'transparent',
  },
  postCreationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
    textDecorationColor: 'blue',
    marginRight: 10,
  },
  groupCreationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
    textDecorationColor: 'blue',
    marginLeft: 10,
  },
});

export default HomeScreen;
