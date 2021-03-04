import { Button, Icon, Text } from '@ui-kitten/components';
import * as React from 'react';
import { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import CategoryButton from '../components/CategoryButton';
import DoubleListItem from '../components/DoubleListItem';
import PostListItem from '../components/PostListItem';
import { View } from '../components/Themed';
import Posts from '../data/Posts';
import { IPost } from '../types/IPost';
import { PostType } from '../types/PostType';
import CreatePostModal from '../components/CreatePostModal';

export interface HomeProps {}

const HomeScreen = () => {
  const [visibleCreatePost, setVisibleCreatePost] = useState<boolean>(false);
  let arr: IPost[] = [];
  for (let index = 0; index < 20; index++) {
    arr.push({
      id: index.toString(),
      type: PostType.REQUEST,
      category: 'Sports',
      title: 'Looking for a football',
      description: 'searching for a football 30cm.\n brand new please!',
      comments: [
        { id: '3', content: 'I have a basketball' },
        { id: '2', content: 'I have what you looking for ;-)' },
      ],
      location: 'Ashkelon',
      images: ['https://images1.ynet.co.il/PicServer2/03072003/353264/nurit_wh.jpg', 'https://images1.ynet.co.il/PicServer2/03072003/353264/nurit_wh.jpg'],
      creator: {
        id: '8',
        firstName: 'yoni',
        lastName: 'bolila',
        email: 'yonatan2gross@gmailk.com',
        phoneNumber: '0506656474',
        rating: 5,
        numberOfRatings: 25,
        groups: [],
        posts: [],
        comments: [],
        imageUri: 'https://images1.ynet.co.il/PicServer2/03072003/353264/nurit_wh.jpg',
      },
      groupId: '8',
    });
  }

  const PlusIcon = () => <Icon name="plus-circle-outline" style={{ width: 32, height: 32 }} fill={'rgba(34, 83, 231)'} />;
  return (
    <View style={styles.container}>
      <CreatePostModal visible={visibleCreatePost} onChange={setVisibleCreatePost} />
      <View style={styles.buttonContainer}>
        <CategoryButton buttonContent={'Create Group'} navigationString={'SinglePost'} />
        <Button
          style={styles.button}
          status="success"
          accessoryRight={PlusIcon}
          size="small"
          onPress={() => {
            setVisibleCreatePost(!visibleCreatePost);
          }}
        >
          {(buttonProps: any) => (
            <Text {...buttonProps} style={{ color: 'rgba(34, 83, 231,1)' }}>
              Create post
            </Text>
          )}
        </Button>
      </View>
      <FlatList
        style={{ width: '100%' }}
        data={arr}
        //@ts-ignore
        renderItem={({ item }) => (item.id % 2 == 0 ? <PostListItem post={Posts} /> : <DoubleListItem post={Posts} />)}
        keyExtractor={(item) => item.id}
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
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: 'transparent',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'white',
    textDecorationColor: 'blue',
  },
});

export default HomeScreen;
