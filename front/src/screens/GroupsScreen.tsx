import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import GroupListItem from '../components/GroupListItem';
import { Text, View } from '../components/Themed';
import Groups from '../data/Groups';
import { GroupPrivacy } from '../types/GroupPrivacy';
import { IGroup } from '../types/IGroup';

export interface GroupsProps {}

const GroupsScreen = () => {
  let arr: IGroup[] = [];
  for (let index = 0; index < 10; index++) {
    arr.push({
      id: index.toString(),
      name: `Senior devs${index}`,
      category: 'Sports',
      description: 'searching for a football 30cm.\n brand new please!',
      mainLocation: 'Ashkelon',
      searchable: true,
      groupPrivacy: GroupPrivacy.PUBLIC,
      members: [],
      posts: [],
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{arr.length}</Text>
      <FlatList
        style={styles.list}
        data={arr}
        renderItem={({ item }) => <GroupListItem group={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    width: '100%',
  },
});

export default GroupsScreen;
