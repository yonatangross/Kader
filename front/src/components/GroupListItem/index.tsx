import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { IGroup } from '../../types/IGroup';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

export interface GroupListItemProps {
  group: IGroup;
}

const GroupListItem = (props: GroupListItemProps) => {
  let { group } = props;

  const navigation = useNavigation();
  //console.log(post);
  //const user = post.creator;

  const onClick = () => {
    navigation.navigate('postPage', {
      // id: post.id,
      // creator: post.creator,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.DetailsContainer}>
          <Text style={styles.PostTitle}>{group.name}</Text>
          <Text style={styles.PostTitle}>{group.description}</Text>
          <Text style={styles.PostedBy}>Posted By: Diana Lanciano</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GroupListItem;
