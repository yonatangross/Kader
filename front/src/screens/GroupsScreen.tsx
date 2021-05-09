import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getGroupsForUser } from '../services/groups';
import GroupListItem from '../components/GroupListItem';
import { View } from '../components/Themed';
import CreateGroupPostModal from '../components/CreateGroupPostModal';
import { useAuth } from '../contexts/Auth';

export interface GroupsProps {}

const GroupsScreen = () => {
  const auth = useAuth();

  const [visibleCreateGroup, setVisibleCreateGroup] = useState<boolean>(false);

  const [groups, setGroups] = useState<any[]>();

  useEffect(() => {
    if (auth.authData)
      getGroupsForUser(auth.authData?.userId)
        .then((response) => {
          const groupsResult: any[] = response.data.groupView;

          setGroups(groupsResult);
        })
        .catch((error) => {
          console.log(`error while fetching groups ${error}`);
        });
  }, []);

  if (groups) {
    return (
      <View style={styles.container}>
        <CreateGroupPostModal visible={visibleCreateGroup} onChange={setVisibleCreateGroup} />
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
        <FlatList
          style={styles.list}
          data={groups}
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
    bottom: 30,
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
    color: '#4975aa',
  },
  myGroups: {
    textAlign: 'left',
  },
});

export default GroupsScreen;
