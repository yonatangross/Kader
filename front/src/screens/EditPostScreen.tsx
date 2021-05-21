import { Button, Icon, Text } from '@ui-kitten/components';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PostListItem from '../components/PostListItem';
import { View } from '../components/Themed';
import { IPost } from '../types/IPost';
import CreateGeneralPostModal from '../components/CreateGeneralPostModal';
import { getPost, getPostsForUser } from '../services/posts';
import CreateGroupModal from '../components/CreateGroupModal';
import { useNavigation } from '@react-navigation/native';

export interface ClosePostScreenProps {}

const ClosePostScreen = () => {
  const navigation = useNavigation();
    
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<IPost>();

  useEffect(() => {
    let isMounted = true;
    getPost()
      .then((response) => {
        if (isMounted) {
          const postsResult: IPost[] = response.data;
          setPost(postsResult);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(`error while fetching posts ${error}`);
      });
    () => {
      isMounted = false;
    };
  }, [setPost, setLoading]);


  if (!!post) {
    return (
      <View style={styles.container}>
   
      </View>
    );
  } else return <View>{loading ? <Text>loading...</Text> : <Text>Fetched!!</Text>}</View>;
};

const styles = StyleSheet.create({});

export default ClosePostScreen;
