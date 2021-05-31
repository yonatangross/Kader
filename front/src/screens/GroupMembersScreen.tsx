import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { IGroup } from '../types/IGroup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getGroup } from '../services/groups';
import { getGroupPrivacyName } from '../types/GroupPrivacy';
import UserListItem from '../components/UserListItem';
import { useFonts } from 'expo-font';
import LoadingIndicator from '../components/LoadingIndicator';
import { IUser } from '../types/IUser';
import _ from 'lodash';
import GroupMemberListItem from '../components/GroupMemberListItem';
import { Header } from 'react-native/Libraries/NewAppScreen';

export interface GroupMembersScreenProps {}

const GroupMembersScreen = (props: GroupMembersScreenProps) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  const [managers, setManagers] = useState<IUser[]>([]);
  const [members, setMembers] = useState<IUser[]>([]);
  const [group, setGroup] = useState<IGroup>();

  let [fontsLoaded] = useFonts({
    Pattaya: require('../assets/fonts/Pattaya/Pattaya-Regular.ttf'),
  });

  useEffect(() => {
    let mounted = true;
    if (route.params) {
      const params: any = route.params;
      if (mounted) {
        getGroup(params.id)
          .then((response) => {
            const groupResponse: IGroup = response.data;
            setGroup(groupResponse);
            let membersArr: IUser[] = [];
            groupResponse.members.forEach((member) => {
              const isManager: boolean = _.includes(group?.managers, member);
              if (!isManager) membersArr.push(member);
            });
            setManagers(groupResponse.managers);
            setMembers(membersArr);
            console.log(groupResponse.managers.length);
            console.log(membersArr.length);
          })
          .catch((error) => {
            console.log(`error fetching group:`);
            console.log(error);
          });
      }
    } else {
      console.log(`error fetching route.params`);
    }
    () => {
      mounted = false;
    };
  }, [fontsLoaded, setGroup, setManagers, setMembers]);

  const renderMemberListItem = ({ item: item }: { item: IUser }) => {
    return <GroupMemberListItem user={item} key={item.userId} />;
  };

  const renderHeaderComponent = (headerText: string, length: number) => {
    return (
      <Text style={styles.headerText}>
        {headerText} - {length}
      </Text>
    );
  };

  if (!!group) {
    return (
      <View style={styles.container}>
        <Text style={styles.nameText}>{group.name}</Text>
        <Text style={styles.groupPrivacyText}>Group Privacy: {getGroupPrivacyName(group.groupPrivacy)}</Text>

        <View style={styles.membersContainer}>
          <FlatList
            contentContainerStyle={{ justifyContent: 'center', width: '100%' }}
            data={managers}
            renderItem={renderMemberListItem}
            ListHeaderComponent={() => renderHeaderComponent('Managers', managers.length)}
            keyExtractor={(item, index) => item.userId + index.toString()}
            scrollEnabled={true}
          />
        </View>
        <View style={styles.membersContainer}>
          <FlatList
            contentContainerStyle={{ justifyContent: 'center', width: '100%' }}
            data={members}
            renderItem={renderMemberListItem}
            ListHeaderComponent={() => renderHeaderComponent('Members', members.length)}
            scrollEnabled={true}
            keyExtractor={(item, index) => item.userId + index.toString()}
          />
        </View>
      </View>
    );
  } else return loading && <LoadingIndicator />;
};

const styles = StyleSheet.create({
  headerText: { fontSize: 30, fontWeight: '400' },
  buttonsContainer: { alignSelf: 'center', width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 40 },
  postCreationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  groupDataContainer: { flexDirection: 'column', backgroundColor: 'white', width: '100%' },
  container: { flexDirection: 'column', width: '100%', justifyContent: 'flex-start', alignItems: 'center', marginTop: 40, flex: 1 },
  membersHeaderContainer: { alignItems: 'center' },
  membersContainer: { flexDirection: 'column', marginBottom: 10, height: '40%' },
  postsContainer: { flexDirection: 'column', width: '100%' },
  nameText: {
    fontSize: 30,
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

export default GroupMembersScreen;
