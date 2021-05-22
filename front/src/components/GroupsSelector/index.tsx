import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IGroup } from '../../types/IGroup';
import { List } from '@ui-kitten/components';
import GroupListItemSelector from '../GroupListItemSelector';
import { CreatePostStateType } from '../../types/CreatePostTypes';
import { getGroupsForUser } from '../../services/groups';
import { useAuth } from '../../contexts/Auth';

export interface GroupsSelectorProps {
  active: number;
  state: CreatePostStateType;
  dispatch: Function;
  setActiveSection: Function;
  setVisible: Function;
  setSubmitFlag: Function;
  numberOfSections: number;
}

const GroupsSelector = (props: GroupsSelectorProps) => {
  const auth = useAuth();

  const [groups, setGroups] = useState<IGroup[]>();

  useEffect(() => {
    if (!!auth && auth.authData)
      getGroupsForUser(auth.authData?.userId)
        .then((response) => {
          const groupsResult: IGroup[] = response.data;
          setGroups(groupsResult);
        })
        .catch((error) => {
          console.log(`error while fetching groups ${error}`);
        });
  }, [setGroups, props.active]);

  const renderItem = ({ item: item, index }: { item: IGroup; index: number }) => {
    return <GroupListItemSelector item={item} index={index} state={props.state} dispatch={props.dispatch} />;
  };
  if (props.active === 2) {
    return (
      <View style={styles.container}>
        <FlatList
          style={{ width: '100%', height: '78%', paddingTop: 20, marginTop: 10 }}
          data={groups}
          renderItem={renderItem}
          keyExtractor={(item) => item.groupId}
          initialNumToRender={6}
          maxToRenderPerBatch={2}
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            props.setActiveSection(-1);
            props.setVisible(false);
            props.setSubmitFlag(true);
          }}
          style={styles.finishButton}
        >
          <Text style={styles.finishButtonText}>Publish post</Text>
        </TouchableOpacity>
      </View>
    );
  } else return null;
};

const styles = StyleSheet.create({
  container: { flexDirection: 'column' },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    width: '100%',
  },
  finishButton: {
    backgroundColor: '#047cfb',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 0.8,
    borderColor: '#394d51',
    margin: 10,
    marginRight: 40,
    marginLeft: 40,
    padding: 10,
  },
  finishButtonText: { fontSize: 20, fontWeight: 'bold', color: 'white' },
});

export default GroupsSelector;
