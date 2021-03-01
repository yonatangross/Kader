import * as React from 'react';
import { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import GroupListItem from '../components/GroupListItem';
import { Text, View } from '../components/Themed';
import { GroupPrivacy } from '../types/GroupPrivacy';
import { IGroup } from '../types/IGroup';

export interface GroupsProps {}

const GroupsScreen = (props: GroupsProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const updateSearch = (searchInput: string) => {
    setSearchQuery(searchInput);
  };

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Groups</Text>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        inputContainerStyle={styles.searchBar}
        containerStyle={styles.searchBarContainer}
        value={searchQuery}
      />
      <FlatList
        style={{
          width: '100%',
          height: '30%',
          marginBottom: 10,
          borderTopColor: '#000000',
          borderLeftColor: '#000000',
          borderRightColor: '#000000',
          borderBottomColor: '#000000',
          borderWidth: 1,
          borderRadius: 3,
        }}
        data={arr}
        //@ts-ignore
        renderItem={({ item }) => <GroupListItem group={arr} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <FlatList
        style={{ width: '100%',
        height: '30%',
        marginBottom: 10,
        borderTopColor: '#000000',
        borderLeftColor: '#000000',
        borderRightColor: '#000000',
        borderBottomColor: '#000000',
        borderWidth: 1,
        borderRadius: 3, }}
        data={arr}
        //@ts-ignore
        renderItem={({ item }) => <GroupListItem group={arr} />}
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
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  searchBarContainer: {
    backgroundColor: 'white',
    borderWidth: 0, //no effect
    shadowColor: 'white', //no effect
  },
  searchBar: {
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default GroupsScreen;
