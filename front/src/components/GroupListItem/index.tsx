import React from 'react';
import { IGroup } from '../../types/IGroup';
import { Button, Icon, ListItem, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import navigation from '../../navigation';

export interface GroupListItemProps {
  item: IGroup;
  index: number;
}

const GroupListItem = (props: GroupListItemProps) => {

  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('Group');
  };


  let { item, index } = props;

  const renderItemAccessory = (props: any) => <Button size="tiny">Join Group</Button>;

  const renderItemIcon = (props: any) => <Icon {...props} name="person" />;

  return (
    <>
      <ListItem title={`${item.name} `} description={`${item.description}`} accessoryLeft={renderItemIcon} accessoryRight={renderItemAccessory}  onPress={onPress}/>
    </>
  );
};

export default GroupListItem;
