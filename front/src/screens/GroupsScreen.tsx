import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image, Text, ActivityIndicator, RefreshControl, ImageStyle } from 'react-native';
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
import LoadingIndicator from '../components/LoadingIndicator';
import { imageBaseUrl } from '../services/axios';

export interface GroupsProps {}

const GroupsScreen = () => {
  const auth = useAuth();
  const navigation = useNavigation();

  const [visibleCreateGroup, setVisibleCreateGroup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userGroups, setUserGroups] = useState<IGroup[]>();
  const [searchedGroups, setSearchedGroups] = React.useState<IGroup[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  let [fontsLoaded] = useFonts({
    Roboto: require('../assets/fonts/Roboto/Roboto-Light.ttf'),
  });

  const searchGroupsByParameter = () => {
    if (!!auth.authData)
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

  const renderSearchHeader = () => {
    return (
      <View style={styles.searchHeaderContainer}>
        <Text style={styles.searchResultsHeaderText}>Search Results:</Text>
      </View>
    );
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getGroupsForUser(auth.authData?.userId)
      .then((response) => {
        const groupsResult: IGroup[] = response.data;
        setUserGroups(groupsResult);
        setRefreshing(false);
      })
      .catch((error) => {
        console.log(`error while fetching groups ${error}`);
        setRefreshing(false);
      });
  }, [refreshing]);

  useEffect(() => {
    let isMounted = true;
    if (!!auth.authData)
      getGroupsForUser(auth.authData?.userId)
        .then((response) => {
          if (isMounted) {
            const groupsResult: IGroup[] = response.data;
            
            setUserGroups(groupsResult);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(`error while fetching groups:`);
          console.log(error);
        });
    searchGroupsByParameter();

    return () => {
      isMounted = false;
    };
  }, [fontsLoaded, searchQuery, setUserGroups, searchGroups, setLoading, refreshing]);

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
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginHorizontal: 20,
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: 'white',
            borderBottomColor: '#dedcdf',
            borderBottomWidth: 20,
          }}
        >
          <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            inputContainerStyle={styles.autocompleteContainer}
            // Data to show in suggestion
            data={searchedGroups.slice(0, 3)}
            // Default value if you want to set something in input
            defaultValue={searchQuery}
            // Onchange of the text changing the state of the query
            // Which will trigger the findFilm method
            // To show the suggestions
            onChangeText={(text) => setSearchQuery(text)}
            placeholder="Search groups here..."
            flatListProps={{
              ListHeaderComponent: renderSearchHeader,
              style: styles.searchResultContainer,
              keyExtractor: (item) => item.groupId,
              renderItem: ({ item }) => (
                <TouchableOpacity
                  style={{ width: '100%', alignContent: 'center', justifyContent: 'center', height: 50 }}
                  onPress={() => {
                    onSelect(item);
                  }}
                >
                  <View style={styles.GroupListItemContainer}>
                    <View style={styles.searchCategoryContainer}>
                      {!!item.category && !!item.category.imageUri ? (
                        <Image source={{ uri: imageBaseUrl + item.category.imageUri }} style={styles.searchCategoryIcon as ImageStyle} />
                      ) : (
                        <Image source={require('../assets/images/categoryIcon.png')} style={styles.searchCategoryIcon as ImageStyle} />
                      )}
                    </View>
                    <View style={styles.searchGroupNameContainer}>
                      <Text style={styles.searchItemText}>{item.name}</Text>
                    </View>
                    <View style={styles.searchGoToContainer}>
                      <Image source={require('../assets/images/right-arrow2.png')} style={styles.searchGoToIcon as ImageStyle} />
                    </View>
                  </View>
                </TouchableOpacity>
              ),
            }}
            onBlur={(event) => {}}
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
          refreshControl={<RefreshControl enabled={true} refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </View>
    );
  } else return loading && <LoadingIndicator />;
};

const styles = StyleSheet.create({
  searchGroupNameContainer: { width: '50%', backgroundColor: 'transparent', marginHorizontal: 20 },
  searchItemText: { fontSize: 12, marginBottom: 0 },
  goToContainer: {
    marginHorizontal: 30,
    marginLeft: 0,
    borderRadius: 15,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
  },
  goToIcon: {
    marginVertical: 15,
    height: 35,
    width: 35,
    resizeMode: 'contain',
  },
  searchGoToContainer: {
    marginHorizontal: 30,
    marginLeft: 0,
    borderRadius: 15,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    width: 20,
  },
  searchGoToIcon: {
    marginVertical: 15,
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },

  searchCategoryContainer: {
    marginVertical: 15,
    marginLeft: 15,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
  },
  searchCategoryIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  categoryContainer: {
    margin: 15,
    marginRight: 20,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 10,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
  categoryIcon: {
    marginVertical: 15,
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  GroupListItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    borderBottomColor: '#f8f7fa',
    borderBottomWidth: 1,
  },
  groupCategoryImageContainer: { flexDirection: 'column', justifyContent: 'center', alignContent: 'center', marginRight: 20 },
  searchDataContainer: { flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', width: '65%' },

  dataContainer: { flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', width: '65%' },
  upperContainer: { flexDirection: 'row', alignItems: 'flex-start', width: '100%' },
  middleContainer: { flexDirection: 'row', width: '100%' },
  lowerContainer: { flexDirection: 'row', width: '100%' },
  linkContainer: { flexDirection: 'column', alignItems: 'center' },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-start',
    width: '100%',
    height:50,
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    margin: 10,
    backgroundColor: '#4975aa',
    borderRadius: 30,
    alignItems: 'center',
    width: 120,
    height: 40,
    justifyContent: 'center',
  },
  profileAvatar: {
    marginHorizontal: 8,
  },
  goToGroupButton: {
    color: '#96bfe5',
  },
  upperText: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 12,
  },
  dataText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  searchResultsHeaderText: { fontWeight: 'bold' },
  searchHeaderContainer: {
    backgroundColor: 'transparent',
    margin: 10,
  },
  searchResultContainer: {
    marginHorizontal: 20,
    borderWidth: 0,
    borderRadius: 7,
  },
  autocompleteContainer: {
    marginHorizontal: 20,
    width: '100%',
    borderWidth: 0,
    borderRadius: 7,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  autocompleteView: {
    margin: 30,
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
    height: '100%',
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
    margin: 20,

    alignSelf: 'flex-start',
  },
  myGroups: {},
});

export default GroupsScreen;
