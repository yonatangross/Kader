import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import moment from 'moment';
import styles from './style';
import { getGroupPrivacyName } from '../../types/GroupPrivacy';
export interface ProfileGroupListItemProps {
  group: any;
}

const ProfileGroupListItem = (props: ProfileGroupListItemProps) => {
  let { group: group } = props;

  const navigation = useNavigation();

  useEffect(() => {
    // console.log(group);
  }, []);

  const onClick = () => {
    navigation.navigate('SingleGroup', {
      id: group.groupId,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <Text style={styles.PostedBy}>
          {group.name} {getGroupPrivacyName(group.groupPrivacy)}
        </Text>
        <Text>{group.postsCount}</Text>
        <Text>{group.membersCount}</Text>
        <Text style={styles.postDate}>{moment(group.created).fromNow()}</Text>
        //todo: add manager icon
        <Text>isManager</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileGroupListItem;
