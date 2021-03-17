import React from 'react';
import { IGroup } from '../../types/IGroup';
import { Button, Icon, ListItem, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface GroupListItemProps {
  group: IGroup;
}

const GroupListItem = (props: GroupListItemProps) => {
  let { group: group } = props;

  const navigation = useNavigation();

  const renderItemAccessory = (props: any) => <Button size="tiny">Join Group</Button>;

  const renderItemIcon = (props: any) => <Icon {...props} name="person" />;

  const onClick = () => {
    console.log(`in on click ${group.id}`);
    navigation.navigate('SingleGroup', {
      id: group.id,
    });
  };

  return (
    <TouchableOpacity onPress={onClick}>
      <ListItem title={`${group.name}`} description={`${group.description}`} accessoryLeft={renderItemIcon} accessoryRight={renderItemAccessory} />
    </TouchableOpacity>
  );
};

export default GroupListItem;
