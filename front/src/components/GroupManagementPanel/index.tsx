import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { deleteGroup, leaveGroup } from '../../services/groups';
import { IGroup } from '../../types/IGroup';

export interface GroupManagementPanelProps {
  group: IGroup;
  isAdmin: boolean;
  isUpdated:boolean;
  setIsUpdated:Function
}

const GroupManagementPanel = (props: GroupManagementPanelProps) => {
  const navigation = useNavigation();

  const onPressEditGroup = () => {
    navigation.navigate('EditGroup', {
      group: props.group,
    });
  };
  const onPressDeleteGroup = () => {
    deleteGroup(props.group.groupId)
      .then((response) => {
        const deleteGroupResponse: any = response.data;
        navigation.navigate('Groups');
      })
      .catch((error) => {
        console.log(`error deleting group ${props.group.groupId}, error: ${error}`);
      });
  };
  const onPressLeaveGroup = () => {
    leaveGroup(props.group.groupId)
      .then((response) => {
        const leaveGroupResponse: any = response.data;
        console.log(leaveGroupResponse);
        navigation.navigate('Groups');
      })
      .catch((error) => {
        console.log(`error leaving group ${props.group.groupId}, error: ${error}`);
      });
  };

  if (props.isAdmin) {
    return (
      <View style={styles.buttonsContainer}>
        <TouchableOpacity activeOpacity={0.7} onPress={onPressEditGroup} style={styles.buttonContainer}>
          <Text style={styles.postCreationText}>Edit Group</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={onPressDeleteGroup} style={styles.buttonContainer}>
          <Text style={styles.postCreationText}>Delete Group</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={onPressLeaveGroup} style={styles.buttonContainer}>
          <Text style={styles.postCreationText}>Leave Group</Text>
        </TouchableOpacity>
      </View>
    );
  } else
    return (
      <View style={styles.buttonsContainer}>
        <TouchableOpacity activeOpacity={0.7} onPress={onPressLeaveGroup} style={styles.buttonContainer}>
          <Text style={styles.postCreationText}>Leave Group</Text>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  postCreationText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonsContainer: {
    marginVertical: 0,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: 'white',
  },
  buttonContainer: {
    margin: 10,
    backgroundColor: '#f2a854',
    borderRadius: 30,
    alignItems: 'center',
    width: 80,
    height: 30,
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  manageIcons: {
    backgroundColor: 'white',
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
    borderColor: 'black',
    borderWidth: 0.8,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
  },
});

export default GroupManagementPanel;
