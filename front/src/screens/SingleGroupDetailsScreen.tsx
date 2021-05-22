import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, FlatList, SafeAreaView, Text, Button } from 'react-native';
import { GroupPrivacy } from '../types/GroupPrivacy';
import { IGroup } from '../types/IGroup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getGroup, joinGroup } from '../services/groups';
import { getGroupPrivacyName } from '../types/GroupPrivacy';
import { TouchableOpacity } from 'react-native-gesture-handler';
import UserListItem from '../components/UserListItem';
import { useFonts } from 'expo-font';

export interface SingleGroupDetailsPageProps {}

const SingleGroupDetailsScreen = (props: SingleGroupDetailsPageProps) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);

  const [group, setGroup] = useState<IGroup>();
  let [fontsLoaded] = useFonts({
    Pattaya: require('../assets/fonts/Pattaya/Pattaya-Regular.ttf'),
  });
  useEffect(() => {
    let mounted = true;
    if (route.params) {
      const params: any = route.params;
      getGroup(params.id)
        .then((response) => {
          const groupResponse: IGroup = response.data;
          setGroup(groupResponse);
        })
        .catch((error) => {
          console.log(`error fetching group details,${error}`);
        });
    } else {
      console.log(`error fetching route.params`);
    }
    () => {
      mounted = false;
    };
  }, [fontsLoaded, setGroup]);

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

  const renderMemberListItem = ({ item }: any) => {
    return <UserListItem user={item} key={item.id} />;
  };

  if (group) {
    return (
      <View>
        <Text style={styles.nameText}>{group.name}</Text>
        <Text style={styles.descriptionText}>{group.description}</Text>
        <Text style={styles.groupPrivacyText}>Group Privacy: {getGroupPrivacyName(group.groupPrivacy)}</Text>

        <View style={styles.membersContainer}>
          <View style={styles.membersHeaderContainer}>
            <Text style={styles.membersLengthText}>{group.members.length} members</Text>
          </View>
          <FlatList
            contentContainerStyle={{ flex: 1, justifyContent: 'space-around' }}
            data={group.members}
            renderItem={renderMemberListItem}
            keyExtractor={(item, index) => item.id + index.toString()}
            showsVerticalScrollIndicator={false}
            horizontal
          />
        </View>

        <View style={styles.buttonContainer}>
          {group.groupPrivacy === GroupPrivacy.Private ? (
            <TouchableOpacity activeOpacity={0.7} onPress={askToJoinPrivateGroup} style={styles.buttonContainer}>
            <Text style={styles.postCreationText}>Ask to join group</Text>
          </TouchableOpacity>
          ) : (
            <TouchableOpacity activeOpacity={0.7} onPress={joinPublicGroupNow} style={styles.buttonContainer}>
              <Text style={styles.postCreationText}>Join Group</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  } else return <View>{loading ? <Text>loading...</Text> : <Text>Fetched!!</Text>}</View>;
};

const styles = StyleSheet.create({
  postCreationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  groupDataContainer: { flexDirection: 'column', backgroundColor: 'white', width: '100%' },
  container: { flexDirection: 'column', width: '100%' },
  membersHeaderContainer: { alignItems: 'center' },
  membersContainer: { flexDirection: 'column', marginBottom: 10 },
  postsContainer: { flexDirection: 'column', width: '100%' },
  nameText: {
    alignSelf: 'center',
    fontSize: 42,
    fontFamily: 'Pattaya',
    color: '#f2a854',
  },
  groupPrivacyText: { alignSelf: 'center', fontSize: 20 },
  descriptionText: { alignSelf: 'center', fontSize: 16 },
  membersLengthText: { alignSelf: 'center', fontSize: 20 },
  postCreationButton: {
    backgroundColor: 'white',
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 15,
    bottom: 30,
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
    width: 32,
    height: 32,
    //backgroundColor:'black'
  },
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
