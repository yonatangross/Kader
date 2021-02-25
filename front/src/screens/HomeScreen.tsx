import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import PostListItem from '../components/PostListItem';
import { View } from '../components/Themed';
import Posts from '../data/Posts';

export interface HomeProps {
    
}

const HomeScreen = (props: HomeProps) => {
  return (
    <View style={styles.container}>
      <FlatList style={{ width: '100%' }} data={Posts} renderItem={({ item }) => <PostListItem post={item} />} keyExtractor={(item) => item.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
