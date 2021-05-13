import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getGroupsForUser } from '../services/groups';
import GroupListItem from '../components/GroupListItem';
import { View } from '../components/Themed';
import CreateGroupModal from '../components/CreateGroupModal';
import { useAuth } from '../contexts/Auth';
import { Text } from '@ui-kitten/components';
import { Autocomplete, AutocompleteItem, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { IGroup } from '../types/IGroup';
import { GroupPrivacy } from '../types/GroupPrivacy';
import { IUser } from '../types/IUser';

export interface GroupsProps {}

const filter = (item: any, query: string) => item.title.toLowerCase().includes(query.toLowerCase());

const StarIcon = (props: any) => <Icon {...props} name="star" />;

const GroupsScreen = () => {
  const auth = useAuth();
  const navigation = useNavigation();

  const [visibleCreateGroup, setVisibleCreateGroup] = useState<boolean>(false);

  const [userGroups, setUserGroups] = useState<any[]>();

  const [query, setQuery] = React.useState<string>('');
  const [groups, setGroups] = React.useState<any[]>();

  const updateData = () => {
    if (auth.authData)
      getGroupsForUser(auth.authData?.userId)
        .then((response) => {
          const groupsResult: any[] = response.data.groupView;

          setGroups(groupsResult);
        })
        .catch((error) => {
          console.log(`error while fetching groups ${error}`);
        });
  };

  const onSelect = (index: number) => {
    if (groups) {
      let group = groups[index] as IGroup;
      switch (group.groupPrivacy) {
        case GroupPrivacy.Invisible:
          navigation.navigate('SingleGroup', {
            id: groups[index].groupId,
          });
          break;
        case GroupPrivacy.Private:
        case GroupPrivacy.Public: {
          if (!!auth && !!auth.authData) {
            let isMember = getMembershipStatus(group.members, auth.authData?.userId);
            if (isMember) {
              console.log('singleGroup');
              navigation.navigate('SingleGroup', {
                id: groups[index].groupId,
              });
            } else {
              console.log('SingleGroupDetails');
              navigation.navigate('SingleGroupDetails', {
                id: groups[index].groupId,
              });
            }
          }
          break;
        }
        default:
          break;
      }
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

  const onChangeText = (nextQuery: string) => {
    setQuery(nextQuery);
  };

  const applyFilter = (options: any) => {
    return options.filter((item: { name: string }) => item.name.toLowerCase().includes(query.toLowerCase()));
  };
  const renderOption = (item: any, index: number) => <AutocompleteItem key={index} title={item.name} accessoryLeft={StarIcon} />;

  useEffect(() => {
    if (auth.authData)
      getGroupsForUser(auth.authData?.userId)
        .then((response) => {
          const groupsResult: any[] = response.data.groupView;

          setUserGroups(groupsResult);
        })
        .catch((error) => {
          console.log(`error while fetching groups ${error}`);
        });
    updateData();
  }, [query]);

  if (userGroups) {
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
        <Text style={styles.text} category="h1">
          Groups
        </Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Autocomplete
            style={{ width: '100%', alignSelf: 'flex-start' }}
            placeholder="Search Groups here!"
            value={query}
            onChangeText={onChangeText}
            onSelect={onSelect}
          >
            {!!groups ? groups.map(renderOption) : <></>}
          </Autocomplete>
        </View>
        <Text style={styles.text} category="h6">
          My Groups
        </Text>
        <FlatList
          style={styles.list}
          data={userGroups}
          renderItem={({ item: group }) => <GroupListItem group={group} />}
          keyExtractor={(item) => item.groupId}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  } else return <></>;
};

const styles = StyleSheet.create({
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 32,
    height: 32,
    //backgroundColor:'black'
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'white',
    textDecorationColor: 'blue',
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    width: '100%',
  },
  text: {
    margin: 2,
    color: 'black',
    alignSelf: 'center',
  },
  myGroups: {
    textAlign: 'left',
  },
});

export default GroupsScreen;
