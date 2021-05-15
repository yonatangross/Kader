import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, FlatList } from 'react-native';
import { GroupPrivacy } from '../types/GroupPrivacy';
import { IGroup } from '../types/IGroup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getGroup, joinGroup } from '../services/groups';
import { Text, Button } from '@ui-kitten/components';
import { getGroupPrivacyName } from '../types/GroupPrivacy';

export interface SingleGroupDetailsPageProps {}

const SingleGroupDetailsScreen = (props: SingleGroupDetailsPageProps) => {
  const route = useRoute();
  const navigation = useNavigation();

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

  const askToJoinPrivateGroup = () => {
    //todo: ask Aviv to implement logic
    
  };
  const joinPublicGroupNow = () => {
    if (group)
      joinGroup(group.groupId)
        .then((response) => {
          console.log('joined group successfully, response:');
          console.log(response);

          navigation.navigate('SingleGroup', {
            id: group.groupId,
          });
        })
        .catch((error) => {
          console.log(error);
        });
  };

  if (group) {
    return (
      <View>
        <Text style={styles.text} category="h5">
          {group.name}
        </Text>
        <Text style={styles.text} category="h6">
          {group.description}
        </Text>
        <Text style={styles.text} category="h6">
          The Group is {getGroupPrivacyName(group.groupPrivacy)}
        </Text>
        <Text style={styles.text} category="h6">
          {group.members.length} members
        </Text>
        <FlatList
          data={group.members}
          renderItem={({ item }) => {
            if (!!item.imageUri) {
              return <Image source={require('../assets/images/imagePlaceholder.png')} style={styles.memberImage} />;
            } else return <Image source={require('../assets/images/imagePlaceholder.png')} style={styles.memberImage} />;
          }}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          horizontal
        />
        <View style={styles.buttonContainer}>
          {group.groupPrivacy === GroupPrivacy.Private ? (
            <Button onPress={askToJoinPrivateGroup} size="large" appearance="outline" status="success">
              Ask to Join Group
            </Button>
          ) : (
            <Button onPress={joinPublicGroupNow} size="large" appearance="outline" status="success">
              Join Group
            </Button>
          )}
        </View>
      </View>
    );
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({
  text: {
    margin: 5,
    alignSelf: 'center',
  },
  memberImage: {
    width: 40,
    height: 40,
    borderRadius: 15,
  },
  buttonContainer: {
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  button: {
    margin: 2,
  },
});

export default SingleGroupDetailsScreen;
