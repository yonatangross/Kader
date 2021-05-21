import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { IGroup } from '../../types/IGroup';
import { Button, List } from '@ui-kitten/components';
import { GroupPrivacy } from '../../types/GroupPrivacy';
import GroupListItemSelector from '../GroupListItemSelector';
import { CreatePostStateType } from '../../types/CreatePostTypes';
import { getGroups, getGroupsForUser } from '../../services/groups';
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
          const groupsResult: any[] = response.data;
          setGroups(groupsResult);
        })
        .catch((error) => {
          console.log(`error while fetching groups ${error}`);
        });
  }, [setGroups, props.active]);

  const renderItem = ({ item: item, index }: { item: IGroup; index: number }) => {
    return <GroupListItemSelector item={item} index={index} state={props.state} dispatch={props.dispatch} />;
  };
  if (props.active === 3) {
    return (
      <>
        <List style={styles.list} data={groups} renderItem={renderItem} contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 4 }} />
        <Button
          status="success"
          size="small"
          onPress={() => {
            props.setActiveSection(-1);
            props.setVisible(false);
            props.setSubmitFlag(true);
          }}
        >
          {(buttonProps: any) => (
            <Text {...buttonProps} style={{ color: 'rgba(34, 83, 231,1)' }}>
              Submit Post
            </Text>
          )}
        </Button>
      </>
    );
  } else return null;
};

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    width: '100%',
  },
});

export default GroupsSelector;
