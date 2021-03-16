import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { IGroup } from '../../types/IGroup';
import { Button, List } from '@ui-kitten/components';
import { GroupPrivacy } from '../../types/GroupPrivacy';
import GroupListItemSelector from '../GroupListItemSelector';
import { CreatePostStateType } from '../../types/CreatePostTypes';

export interface GroupsSelectorProps {
  active: boolean;
  state: CreatePostStateType;
  dispatch: Function;
  setActiveSection: Function;
  setVisible: Function;
  setSubmitFlag: Function;
}

const GroupsSelector = (props: GroupsSelectorProps) => {
  let arr: IGroup[] = [];
  for (let index = 0; index < 5; index++) {
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

  const renderItem = ({ item: item, index }: { item: IGroup; index: number }) => {
    //todo: change index to item.id
    return <GroupListItemSelector item={item} index={index} state={props.state} dispatch={props.dispatch} />;
  };
  if (props.active) {
    return (
      <>
        <List style={styles.list} data={arr} renderItem={renderItem} contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 4 }} />

        <Button
          status="success"
          size="small"
          onPress={() => {
            props.setActiveSection([false, false, false, false]);
            props.setVisible(false);
            props.setSubmitFlag(true);
            console.log(props.state);
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
