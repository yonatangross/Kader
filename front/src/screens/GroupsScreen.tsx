import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { getGroupsForUser, searchGroups } from '../services/groups';
import GroupListItem from '../components/GroupListItem';
import { View } from '../components/Themed';
import CreateGroupModal from '../components/CreateGroupModal';
import { useAuth } from '../contexts/Auth';
import { useNavigation } from '@react-navigation/native';
import { IGroup } from '../types/IGroup';
import { GroupPrivacy } from '../types/GroupPrivacy';
import { IUser } from '../types/IUser';
import Autocomplete from 'react-native-autocomplete-input';
import { useFonts } from 'expo-font';

export interface GroupsProps {}

const GroupsScreen = () => {
  const auth = useAuth();
  const navigation = useNavigation();

  const [visibleCreateGroup, setVisibleCreateGroup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userGroups, setUserGroups] = useState<any[]>();
  const [searchedGroups, setSearchedGroups] = React.useState<any[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  let [fontsLoaded] = useFonts({
    Roboto: require('../assets/fonts/Roboto/Roboto-Light.ttf'),
  });

  const updateData = () => {
    if (auth.authData)
      searchGroups(searchQuery, undefined, undefined, undefined)
        .then((response) => {
          const groupsResult: any[] = response.data;
          setSearchedGroups(groupsResult);
        })
        .catch((error) => {
          console.log(`error while fetching groups ${error}`);
        });
  };

  const onSelect = (group: IGroup) => {
    switch (group.groupPrivacy) {
      case GroupPrivacy.Invisible:
        navigation.navigate('SingleGroupDetails', {
          id: group.groupId,
          name: group.name,
        });
        break;
      case GroupPrivacy.Private:
      case GroupPrivacy.Public: {
        if (!!auth && !!auth.authData) {
          let isMember = getMembershipStatus(group.members, auth.authData?.userId);
          if (isMember) {
            console.log('singleGroup');
            navigation.navigate('SingleGroup', {
              id: group.groupId,
              name: group.name,
            });
          } else {
            console.log('SingleGroupDetails');
            navigation.navigate('SingleGroupDetails', {
              id: group.groupId,
              name: group.name,
            });
          }
        }
        break;
      }
      default:
        break;
    }
  };

  const getMembershipStatus = (members: IUser[], userId: string) => {
    members.forEach((member) => {
      if (member.id === userId) {
        return true;
      }
    });
    return false;
  };

  useEffect(() => {
    let isMounted = true;
    if (!!auth.authData)
      getGroupsForUser(auth.authData?.userId)
        .then((response) => {
          if (isMounted) {
            const groupsResult: any[] = response.data;
            setUserGroups(groupsResult);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(`error while fetching groups ${error}`);
        });
    updateData();

    return () => {
      isMounted = false;
    };
  }, [fontsLoaded, searchQuery, setUserGroups, setSearchedGroups]);

  if (!!userGroups && !!fontsLoaded) {
    return (
      <View style={styles.container}>
        <CreateGroupModal visible={visibleCreateGroup} setVisible={setVisibleCreateGroup} />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setVisibleCreateGroup(!visibleCreateGroup);
            console.log('Pressed group creation');
          }}
          style={styles.groupCreationButton}
        >
          <Image source={require('../assets/images/createGroupIcon2.png')} style={styles.floatingButtonStyle} />
        </TouchableOpacity>
        <Text style={styles.groupsTitle}>Groups</Text>
        <View style={styles.autocompleteContainer}>
          <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            // Data to show in suggestion
            data={searchedGroups}
            // Default value if you want to set something in input
            defaultValue={JSON.stringify(searchQuery) === '{}' ? '' : searchQuery}
            // Onchange of the text changing the state of the query
            // Which will trigger the findFilm method
            // To show the suggestions
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search groups here..."
            renderItem={({ item }) => (
              // For the suggestion view
              <TouchableOpacity
                onPress={() => {
                  onSelect(item);
                  setSearchedGroups([]);
                }}
              >
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <Text style={styles.myGroupsTitle}>My Groups</Text>
        <FlatList
          style={styles.list}
          data={userGroups}
          renderItem={({ item }) => <GroupListItem key={item.groupId} group={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  } else return <View>{loading ? <Text>loading...</Text> : <Text>Fetched!!</Text>}</View>;
};

const styles = StyleSheet.create({
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    margin: 50,
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 32,
    height: 32,
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
    top: 30,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
    borderColor: 'black',
    borderWidth: 0.8,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  list: {
    width: '100%',
  },
  groupsTitle: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 40,
    margin: 0,
    marginTop: 20,
    color: 'black',
    alignSelf: 'center',
  },
  myGroupsTitle: {
    fontFamily: 'Roboto',
    fontWeight: '300',
    fontSize: 32,
    color: 'black',
    alignSelf: 'center',
  },
  myGroups: {},
});

export default GroupsScreen;
