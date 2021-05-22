import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

export interface GroupListItemProps {
  group: any;
  key: string;
}

const GroupListItem = (props: GroupListItemProps) => {
  let { group } = props;

  const navigation = useNavigation();

  useEffect(() => {
    // console.log(group);
  }, [props.group]);

  const onClick = () => {
    navigation.navigate('SingleGroup', {
      id: group.groupId,
    });
  };

  return (
    <View style={styles.GroupListItemContainer}>
      <View style={styles.groupCategoryImageContainer}>
        {!!group.category && !!group.category.imageUri ? (
          <Image source={require('../../assets/images/categoryIcon.png')} style={{ height: 40, width: 40 }} />
        ) : (
          <Image source={require('../../assets/images/categoryIcon.png')} style={{ height: 40, width: 40 }} />
        )}
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.upperContainer}>
          <Text style={styles.upperText}>{group.membersCount} members already posting in</Text>
        </View>
        <View style={styles.middleContainer}>
          <Text style={styles.dataText}>{group.name}</Text>
        </View>
        <View style={styles.lowerContainer}>
          <Text>members</Text>
        </View>
      </View>
      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={onClick} style={styles.buttonContainer}>
          <AntDesign name="doubleright" color={'#96bfe5'} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  dataContainer: { flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', width: '70%' },
  upperContainer: { flexDirection: 'row', alignItems: 'flex-start', width: '100%' },
  middleContainer: { flexDirection: 'row', width: '100%' },
  lowerContainer: { flexDirection: 'row', width: '100%' },
  linkContainer: { flexDirection: 'column', alignItems: 'center' },
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

export default GroupListItem;
