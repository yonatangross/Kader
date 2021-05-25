import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { View } from '../components/Themed';
import { useAuth } from '../contexts/Auth';
import { useFonts } from 'expo-font';
import { getPostsForUser } from '../services/posts';
import PostListItem from '../components/PostListItem';
import LoadingIndicator from '../components/LoadingIndicator';

export interface UserPostsScreenProps {}

const UserPostsScreen = () => {
  const auth = useAuth();

  const [loading, setLoading] = useState<boolean>(true);
  const [userPosts, setUserPosts] = useState<any[]>();

  let [fontsLoaded] = useFonts({
    Roboto: require('../assets/fonts/Roboto/Roboto-Light.ttf'),
  });

  useEffect(() => {
    let isMounted = true;
    if (!!auth.authData)
      getPostsForUser(auth.authData?.userId)
        .then((response) => {
          if (isMounted) {
            const postsResult: any[] = response.data;
            setUserPosts(postsResult);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(`error while fetching posts ${error}`);
        });

    return () => {
      isMounted = false;
    };
  }, [fontsLoaded, setUserPosts]);

  if (!!userPosts && !!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.myPostsTitle}>My Posts</Text>
        </View>
        <FlatList
          style={styles.list}
          data={userPosts}
          renderItem={({ item }) => <PostListItem key={item.groupId} post={item} showComments={false} />}
          keyExtractor={(item) => item.postId}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  } else return loading && <LoadingIndicator />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#dedcdf',
  },
  list: {
    width: '100%',
    marginTop: 0,
  },
  titleContainer: { backgroundColor: 'white' },
  myPostsTitle: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
    marginHorizontal: 20,
    marginVertical: 0,
    alignSelf: 'flex-start',
  },
});

export default UserPostsScreen;
