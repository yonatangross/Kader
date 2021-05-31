import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, FlatList, SafeAreaView, Text, Button, ActivityIndicator, TouchableWithoutFeedback, RefreshControl } from 'react-native';
import { GroupPrivacy } from '../types/GroupPrivacy';
import { IGroup } from '../types/IGroup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getGroup, joinGroup } from '../services/groups';
import { getGroupPrivacyName } from '../types/GroupPrivacy';
import { TouchableOpacity } from 'react-native-gesture-handler';
import UserListItem from '../components/UserListItem';
import { useFonts } from 'expo-font';
import LoadingIndicator from '../components/LoadingIndicator';

export interface SingleGroupDetailsPageProps {}

const SingleGroupDetailsScreen = (props: SingleGroupDetailsPageProps) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [group, setGroup] = useState<IGroup>();
  let [fontsLoaded] = useFonts({
    Pattaya: require('../assets/fonts/Pattaya/Pattaya-Regular.ttf'),
  });

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    if (route.params) {
      const params: any = route.params;
      getGroup(params.id)
        .then((response) => {
          const groupResponse: IGroup = response.data;
          setGroup(groupResponse);
          setRefreshing(false);
        })
        .catch((error) => {
          console.log(`error fetching group details,${error}`);
          setRefreshing(false);
        });
    }
  }, [refreshing]);

  useEffect(() => {
    let mounted = true;
    if (route.params) {
      const params: any = route.params;
      if (mounted) {
        getGroup(params.id)
          .then((response) => {
            const groupResponse: IGroup = response.data;
            setGroup(groupResponse);
          })
          .catch((error) => {
            console.log(`error fetching group details,${error}`);
          });
      }
    } else {
      console.log(`error fetching route.params`);
    }
    () => {
      mounted = false;
    };
  }, [fontsLoaded, setGroup, refreshing]);

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

  if (!!group) {
    return (
      <View style={styles.container}>
        <Text style={styles.nameText}>{group.name}</Text>
        <Text style={styles.descriptionText}>{group.description}</Text>
        <Text style={styles.groupPrivacyText}>Group Privacy: {getGroupPrivacyName(group.groupPrivacy)}</Text>

        <View style={styles.membersContainer}>
          <FlatList
            contentContainerStyle={{ justifyContent: 'center', width: 350 }}
            data={group.members.slice(0, 7)}
            renderItem={renderMemberListItem}
            keyExtractor={(item, index) => item.userId + index.toString()}
            ListFooterComponentStyle={{ flex: 0.1 }}
            ListFooterComponent={
              <TouchableWithoutFeedback
                onPress={() => {
                  console.log('pressed more members load');
                }}
              >
                <View style={[styles.profileImageContainer]}>
                  <Text style={styles.extraMembersText}>...</Text>
                </View>
              </TouchableWithoutFeedback>
            }
            horizontal
            refreshControl={<RefreshControl enabled={true} refreshing={refreshing} onRefresh={onRefresh} />}
          />
        </View>
        <View style={styles.membersHeaderContainer}>
          <Text style={styles.membersLengthText}>{group.members.length} members</Text>
        </View>

        <View style={styles.buttonsContainer}>
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
  } else return loading && <LoadingIndicator />;
};

const styles = StyleSheet.create({
  buttonsContainer: { alignSelf: 'center', width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 40 },
  postCreationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  groupDataContainer: { flexDirection: 'column', backgroundColor: 'white', width: '100%' },
  container: { flexDirection: 'column', width: '100%', justifyContent: 'flex-start', alignItems: 'center', marginTop: 40, flex: 1, },
  membersHeaderContainer: { alignItems: 'center' },
  membersContainer: { flexDirection: 'column', marginBottom: 10, height: 60 },
  postsContainer: { flexDirection: 'column', width: '100%' },
  nameText: {
    fontSize: 30,
    fontFamily: 'Pattaya',
    color: '#f2a854',
  },
  groupPrivacyText: { alignSelf: 'center', fontSize: 20, },
  descriptionText: { alignSelf: 'center', fontSize: 16 ,},
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
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#4975aa',
    borderRadius: 30,
    alignItems: 'center',
    width: 150,
    height: 40,
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  button: {
    margin: 2,
  },
  profileImageContainer: {
    marginVertical: 5,
    marginHorizontal: -10,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderColor: 'black',
    borderWidth: 2,
  },
  extraMembersText: { textAlign: 'center', justifyContent: 'center', fontSize: 16 },
});

export default SingleGroupDetailsScreen;
