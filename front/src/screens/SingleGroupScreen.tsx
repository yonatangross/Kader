import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, FlatList } from 'react-native';
import { Text } from '@ui-kitten/components';

import { getGroup } from '../api/groups';
import PostListItem from '../components/PostListItem';
import UserListItem from '../components/UserListItem';
import { IGroup } from '../types/IGroup';
export interface SingleGroupScreenProps {}

const SingleGroupScreen = (props: SingleGroupScreenProps) => {
  const route = useRoute();
  const [group, setGroup] = useState<IGroup>();

  useEffect(() => {
    if (route.params) {
      const params: any = route.params;
      getGroup(params.id)
        .then((response) => {
          const groupResponse: IGroup = response.data;
          setGroup(groupResponse);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log(`error fetching route.params`);
    }
  }, []);

  const handleCreate = () =>
    void (
      {
        //will create new post via modal --> yoni
        // will join the new post to the existing list of posts in group
      }
    );

  if (group) {
    return (
      <View>
        <Text style={styles.text} category="h5">
          {group.name}
        </Text>
        <Text style={styles.text} category="h6">
          {group.description}
        </Text>
        <Button title="Create post" onPress={() => handleCreate()} />
        <Text>Group Privacy: {group.groupPrivacy.valueOf()}</Text>
        <Text>{group.members.length} members</Text>
        <FlatList
          data={group.members}
          renderItem={({ item: user }) => <UserListItem user={user} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          horizontal
        />
        <FlatList
          data={group.posts}
          renderItem={({ item: post }) => <PostListItem post={post} />}
          keyExtractor={(item) => item.postId}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    margin: 2,
  },
});

export default SingleGroupScreen;
