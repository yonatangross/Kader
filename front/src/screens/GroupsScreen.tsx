import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image, Text, ActivityIndicator } from 'react-native';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFonts } from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';
import LoadingIndicator from '../components/LoadingIndicator';

export interface GroupsProps {}

const GroupsScreen = () => {
  const auth = useAuth();
  const navigation = useNavigation();

  const [visibleCreateGroup, setVisibleCreateGroup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userGroups, setUserGroups] = useState<IGroup[]>();
  const [searchedGroups, setSearchedGroups] = React.useState<any[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  let [fontsLoaded] = useFonts({
    Roboto: require('../assets/fonts/Roboto/Roboto-Light.ttf'),
  });

  const searchGroupsByParameter = () => {
    if (auth.authData)
      searchGroups(searchQuery, undefined, undefined, undefined)
        .then((response) => {
          const groupsResult: IGroup[] = response.data;
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
      if (member.userId === userId) {
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
    searchGroupsByParameter();

    return () => {
      isMounted = false;
    };
  }, [fontsLoaded, searchQuery, userGroups, searchGroups,loading]);

  if (!!userGroups && !!fontsLoaded) {
    return (
      <View style={styles.container}>
        <CreateGroupModal visible={visibleCreateGroup} setVisible={setVisibleCreateGroup} />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setVisibleCreateGroup(!visibleCreateGroup);
            }}
            style={styles.buttonContainer}
          >
            <Text style={styles.postCreationText}>Create Group</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', marginHorizontal: 20, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white' }}>
          <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            containerStyle={styles.autocompleteContainer}
            // Data to show in suggestion
            data={searchedGroups}
            // Default value if you want to set something in input
            defaultValue={searchQuery}
            // Onchange of the text changing the state of the query
            // Which will trigger the findFilm method
            // To show the suggestions
            onChangeText={(text) => setSearchQuery(text)}
            placeholder="Search groups here..."
            flatListProps={{
              keyExtractor: (item) => item.groupId,
              renderItem: ({ item }) => (
                <TouchableOpacity
                  style={{ width: '100%', marginHorizontal: 20, alignContent: 'center', justifyContent: 'center' }}
                  onPress={() => {
                    onSelect(item);
                  }}
                >
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              ),
            }}
          />
        </View>
        <Text style={styles.myGroupsTitle}>My Groups</Text>
        <FlatList
          style={styles.list}
          data={userGroups}
          renderItem={({ item }) => <GroupListItem key={item.groupId} group={item} />}
          keyExtractor={(item) => item.groupId}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
        />
      </View>
    );
  } else return loading && <LoadingIndicator />;
};

const styles = StyleSheet.create({
  autocompleteContainer: {
    marginHorizontal: 20,
  },
  autocompleteView: {
    margin: 30,
  },
  buttonsContainer: {
    marginVertical: 0,
    marginBottom: 10,
    marginTop: -10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: 'white',
  },
  buttonContainer: {
    margin: 10,
    backgroundColor: '#4975aa',
    borderRadius: 30,
    alignItems: 'center',
    width: 120,
    height: 40,
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  postCreationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
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
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'white',
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
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
    marginHorizontal: 20,
    alignSelf: 'flex-start',
  },
  myGroups: {},
});

export default GroupsScreen;
