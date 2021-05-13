import React from 'react';
import { AutocompleteItem, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface GroupListSearchItemProps {
  item: any;
  index: number;
  key: number;
}
const StarIcon = (props: any) => <Icon {...props} name="star" />;

const GroupListSearchItem = (props: GroupListSearchItemProps) => {
  const navigation = useNavigation();

  const onClick = () => {
    navigation.navigate('SingleGroupDetailsScreen', {
      id: props.item.groupId,
    });
  };

  return (
    <TouchableOpacity onPress={onClick}>
      <AutocompleteItem key={props.key} title={props.item.name} accessoryLeft={StarIcon} />;
    </TouchableOpacity>
  );
};

export default GroupListSearchItem;
