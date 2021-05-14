import React, { useEffect } from 'react';
import { Avatar, Button, ListItem } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface GroupListItemProps {
  group: any;
}

const GroupListItem = (props: GroupListItemProps) => {
  let { group: group } = props;

  const navigation = useNavigation();

  useEffect(() => {
    console.log(group);
  }, []);

  const renderItemAccessory = (props: any) => <Button size="tiny">Go to Group</Button>;

  const renderItemIcon = (props: any) => (
    <Avatar {...props} style={styles.profileAvatar} size="large" source={require('../../layouts/social/profile/assets/image-profile-1.jpg')} />
  );

  const onClick = () => {
    navigation.navigate('SingleGroup', {
      id: group.groupId,
    });
  };

  return (
    <TouchableOpacity onPress={onClick}>
      <ListItem
        title={`${group.name} - ${group.category}`}
        description={group.description}
        accessoryLeft={renderItemIcon}
        accessoryRight={renderItemAccessory}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileAvatar: {
    marginHorizontal: 8,
  },
  goToGroupButton: {
    color: 'black',
  },
});

export default GroupListItem;
