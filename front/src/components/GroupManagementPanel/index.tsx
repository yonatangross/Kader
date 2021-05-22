import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

export interface GroupManagementPanelProps {
  isAdmin: boolean;
}

const GroupManagementPanel = (props: GroupManagementPanelProps) => {
  if (props.isAdmin) {
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => {}} style={styles.manageIcons}>
          <Image source={require('../../assets/images/leaveGroupIcon.png')} style={styles.floatingButtonStyle} />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} onPress={() => {}} style={styles.manageIcons}>
          <Image source={require('../../assets/images/deleteGroupIcon.png')} style={styles.floatingButtonStyle} />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} onPress={() => {}} style={styles.manageIcons}>
          <Image source={require('../../assets/images/settingsIcon.png')} style={styles.floatingButtonStyle} />
        </TouchableOpacity>
      </View>
    );
  } else
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => {}} style={styles.manageIcons}>
          <Image source={require('../../assets/images/leaveGroupIcon.png')} style={styles.floatingButtonStyle} />
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  manageIcons: {
    backgroundColor: 'white',
    width:35,
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
