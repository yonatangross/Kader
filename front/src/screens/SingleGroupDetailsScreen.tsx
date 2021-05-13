import React, { useEffect, useReducer, useState } from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import { GroupPrivacy } from '../types/GroupPrivacy';
import { IGroup } from '../types/IGroup';
import GroupDescriptionBox from '../components/GroupDescriptionBox';
import GroupMembersViewGroupDetails from '../components/GroupMembersViewGroupDetails';
import { useRoute } from '@react-navigation/native';
import { getGroup } from '../services/groups';
import MemberItem from '../components/MemberItem';

export interface SingleGroupDetailsPageProps {}

const SingleGroupDetailsScreen = (props: SingleGroupDetailsPageProps) => {
  const route = useRoute();
  const [group, setGroup] = useState<IGroup>();

  useEffect(() => {
    if (route.params) {
      const params: any = route.params;
      getGroup(params.id)
        .then((response) => {
          const groupResponse: IGroup = response.data.group;
          setGroup(groupResponse);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log(`error fetching route.params`);
    }
  }, []);

  function askToJoinPrivateGroup() {
    //join private group logic
  }
  function joinPublicGroupNow() {
    //join public group logic
  }

  if (group) {
    return (
      <View>
        <View>
          <Text>{group.name}</Text>
          <View>
            <Text>{group.groupPrivacy}</Text>
          </View>
          <Text>{group.members.length}</Text>
          <GroupMembersViewGroupDetails users={group.members} />
        </View>
        <GroupMembersViewGroupDetails users={group.members} />
        <GroupDescriptionBox description={group.description} />
        {group.groupPrivacy === GroupPrivacy.Private ? (
          <Button onPress={askToJoinPrivateGroup} title="Ask to join Group" color="#841584" accessibilityLabel="" />
        ) : (
          <Button onPress={joinPublicGroupNow} title="Join Group" color="#841584" accessibilityLabel="" />
        )}
      </View>
    );
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({});

export default SingleGroupDetailsScreen;
