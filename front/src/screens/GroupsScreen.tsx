import * as React from 'react';
import { StyleSheet } from 'react-native';
import GroupListItem from '../components/GroupListItem';
import { Text, View } from '../components/Themed';
import { GroupPrivacy } from '../types/GroupPrivacy';
import { IGroup } from '../types/IGroup';
import { List } from '@ui-kitten/components';

export interface GroupsProps {}

const GroupsScreen = () => {
  let arr: IGroup[] = [];
  for (let index = 0; index < 20; index++) {
    arr.push({
      id: index.toString(),
      name: 'Senior devs',
      category: 'Sports',
      description: 'searching for a football 30cm.\n brand new please!',
      mainLocation: 'Ashkelon',
      searchable: true,
      groupPrivacy: GroupPrivacy.PUBLIC,
      members: [],
      posts: [],
    });
  }

  const renderItem = ({ item: item, index }: { item: IGroup; index: number }) => <GroupListItem item={item} index={index} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{arr.length}</Text>

      <List style={styles.list} data={arr} renderItem={renderItem} contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 4 }} />
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
