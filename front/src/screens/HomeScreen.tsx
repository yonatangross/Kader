import { Button, Icon, Text } from '@ui-kitten/components';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PostListItem from '../components/PostListItem';
import { View } from '../components/Themed';
import { IPost } from '../types/IPost';
import CreateGeneralPostModal from '../components/CreateGeneralPostModal';
import { getPosts } from '../services/posts';
import CreateGroupModal from '../components/CreateGroupModal';

export interface HomeProps {}

const HomeScreen = () => {
  const [visibleCreatePost, setVisibleCreatePost] = useState<boolean>(false);
  const [visibleCreateGroup, setVisibleCreateGroup] = useState<boolean>(false);

  const [posts, setPosts] = useState<IPost[]>();
  useEffect(() => {
    // console.log(`entered homepage useEffect`);

    getPosts()
      .then((response) => {
        const postsResult: IPost[] = response.data;
        setPosts(postsResult);
        // console.log(`posts length: ${postsResult.length}`);
      })
      .catch((error) => {
        console.log(`error while fetching posts ${error}`);
      });
  }, [setPosts]);

  const renderPostListItem = ({ item }: any) => {
    return <PostListItem post={item} key={item.postId} />;
    // return <></>;
  };
  if (!!posts) {
    return (
      <View style={styles.container}>
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
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setVisibleCreateGroup(!visibleCreateGroup);
          }}
          style={styles.groupCreationButton}
        >
          <Image source={require('../assets/images/createGroupIcon2.png')} style={styles.floatingButtonStyle} />
        </TouchableOpacity>
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
  } else return <></>;
};

const styles = StyleSheet.create({
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
  groupCreationButton: {
    backgroundColor: 'white',
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 15,
    bottom: 100,
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: 'transparent',
  },
});

export default HomeScreen;
