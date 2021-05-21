import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { getGroupsForUser } from '../services/groups';
import GroupListItem from '../components/GroupListItem';
import { View } from '../components/Themed';
import { useAuth } from '../contexts/Auth';
import { useFonts } from 'expo-font';

export interface UserGroupsScreenProps {}

const UserGroupsScreen = () => {
  const auth = useAuth();

  const [loading, setLoading] = useState<boolean>(true);
  const [userGroups, setUserGroups] = useState<any[]>();

  let [fontsLoaded] = useFonts({
    Roboto: require('../assets/fonts/Roboto/Roboto-Light.ttf'),
  });

  useEffect(() => {
    let isMounted = true;
    if (!!auth.authData)
      getGroupsForUser(auth.authData?.userId)
        .then((response) => {
          if (isMounted) {
            const groupsResult: any[] = response.data;
            console.log(groupsResult);

            setUserGroups(groupsResult);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(`error while fetching groups ${error}`);
        });

    return () => {
      isMounted = false;
    };
  }, [fontsLoaded, setUserGroups]);

  if (!!userGroups && !!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.myGroupsTitle}>My Groups</Text>
        <FlatList
          style={styles.list}
          data={userGroups}
          renderItem={({ item }) => <GroupListItem key={item.groupId} group={item} />}
          keyExtractor={(item) => item.groupId}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  } else return <View>{loading ? <Text>loading...</Text> : <Text>Fetched!!</Text>}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    width: '100%',
  },
  myGroupsTitle: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
    marginHorizontal: 20,
    alignSelf: 'flex-start',
  },
});

export default UserGroupsScreen;
