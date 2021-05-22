import React, { useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { IGroup } from '../../types/IGroup';
import { CreatePostStateType } from '../../types/CreatePostTypes';
import * as _ from 'lodash';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
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

  let { item } = props;

  return (
    <View style={styles.GroupListItemContainer}>
      <View style={styles.groupCategoryImageContainer}>
        {!!item.category && !!item.category.imageUri ? (
          <Image source={require('../../assets/images/categoryIcon.png')} style={{ height: 40, width: 40 }} />
        ) : (
          <Image source={require('../../assets/images/categoryIcon.png')} style={{ height: 40, width: 40 }} />
        )}
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.upperContainer}>
          <Text style={styles.upperText}>{item.membersCount} members already posting in</Text>
        </View>
        <View style={styles.middleContainer}>
          <Text style={styles.dataText}>{item.name}</Text>
        </View>
        <View style={styles.lowerContainer}>
          <Text>members</Text>
        </View>
      </View>
      <View style={styles.linkContainer}>
        <BouncyCheckbox
          size={22}
          fillColor="#f2a854"
          unfillColor="#FFFFFF"
          iconStyle={{ borderColor: '#f2a854' }}
          onPress={() => {
            if (groupSelected) {
              setGroupSelected(false);
              updateGroups(false);
            } else {
              setGroupSelected(true);
              updateGroups(true);
            }
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  checkbox: {
    margin: 2,
  },
  categoryIcon: {
    marginVertical: 15,
    height: 40,
    width: 40,
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
  dataContainer: { flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', width: '75%' },
  upperContainer: { flexDirection: 'row', alignItems: 'flex-start', width: '100%' },
  middleContainer: { flexDirection: 'row', width: '100%' },
  lowerContainer: { flexDirection: 'row', width: '100%' },
  linkContainer: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0eff5',
    marginLeft: 20,
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
});
export default GroupListItemSelector;
