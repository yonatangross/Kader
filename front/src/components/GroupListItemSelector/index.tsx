import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { IGroup } from '../../types/IGroup';
import { Button, CheckBox, Icon, ListItem, Text } from '@ui-kitten/components';
import { CreatePostStateType } from '../../types/CreatePostTypes';
import * as _ from 'lodash';

export interface GroupListItemSelectorProps {
  item: IGroup;
  index: number;
  state: CreatePostStateType;
  dispatch: Function;
}

const GroupListItemSelector = (props: GroupListItemSelectorProps) => {
  const [groupSelected, setGroupSelected] = useState<boolean>(false);
  const updateGroups = (selection: boolean) => {
    setGroupSelected(selection);
    if (!selection) {
      props.dispatch({
        type: 'Groups',
        payload: _.filter(props.state.groups, (groupId) => {
          return groupId !== item.groupId;
        }),
      });
    } else {
      props.dispatch({
        type: 'Groups',
        payload: _.union(props.state.groups, [item.groupId]),
      });
    }
  };

  let { item, index } = props;

  const renderItemAccessory = (props: any) => (
    <CheckBox
      style={styles.checkbox}
      checked={groupSelected}
      onChange={(nextChecked) => {
        updateGroups(nextChecked);
      }}
    >
      Select
    </CheckBox>
  );

  const renderItemIcon = (props: any) => <Icon {...props} name="person" />;

  return (
    <>
      <ListItem title={`${item.name} `} description={`${item.description}`} accessoryLeft={renderItemIcon} accessoryRight={renderItemAccessory} />
    </>
  );
};
const styles = StyleSheet.create({
  checkbox: {
    margin: 2,
  },
});
export default GroupListItemSelector;
