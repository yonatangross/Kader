import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { getGroupsForUser } from '../services/groups';
import GroupListItem from '../components/GroupListItem';
import { View } from '../components/Themed';
import { Button, Icon, Text } from '@ui-kitten/components';
import CreateGroupPostModal from '../components/CreateGroupPostModal';

export interface GroupsProps {}

const PlusIcon = () => <Icon name="plus-circle-outline" style={{ width: 32, height: 32 }} fill={'rgba(34, 83, 231)'} />;

const GroupsScreen = () => {
  const [visibleCreateGroup, setVisibleCreateGroup] = useState<boolean>(false);

  const [groups, setGroups] = useState<any[]>();

  useEffect(() => {
    //todo: userId
    getGroupsForUser('0c3084e2-8799-48ff-8b55-e9a24cc7d026')
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
        <Button
          style={styles.button}
          status="success"
          accessoryRight={PlusIcon}
          size="small"
          onPress={() => {
            setVisibleCreateGroup(!visibleCreateGroup);
          }}
        >
          {(buttonProps: any) => (
            <Text {...buttonProps} style={{ color: 'rgba(34, 83, 231,1)' }}>
              Create group
            </Text>
          )}
        </Button>
        {/* <Text>
          <h3 style={styles.myGroups}>My groups</h3>
        </Text> */}
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
