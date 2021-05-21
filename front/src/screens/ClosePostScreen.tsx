import { Text } from '@ui-kitten/components';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import { IPost } from '../types/IPost';
import { updatePost } from '../services/posts';
import { useRoute } from '@react-navigation/native';

export interface ClosePostScreenProps {}

const ClosePostScreen = () => {
  const route = useRoute();
  const [loading, setLoading] = useState<boolean>(true);
  const [closedPost, setClosedPost] = useState<IPost>();

  useEffect(() => {
    let isMounted = true;
    if (!!route.params) {
      const { post }: any = route.params;
      if (!!post)
        updatePost(post)
          .then((response) => {
            if (isMounted) {
              const postResult: IPost = response.data;
              setClosedPost(postResult);
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log(`error while fetching post ${closedPost?.postId} ${error}`);
          });
    }

    () => {
      isMounted = false;
    };
  }, [setClosedPost, setLoading]);

  if (!!closedPost) {
    return <View style={styles.container}></View>;
  } else return <View>{loading ? <Text>loading...</Text> : <Text>Fetched!!</Text>}</View>;
};

const styles = StyleSheet.create({
  container: { flexDirection: 'column' },
});

export default ClosePostScreen;
