import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { getGroupsForUser } from '../services/groups';
import GroupListItem from '../components/GroupListItem';
import { View } from '../components/Themed';
import { useAuth } from '../contexts/Auth';
import { useFonts } from 'expo-font';
import LoadingIndicator from '../components/LoadingIndicator';
import { useRoute } from '@react-navigation/core';
import { IGroup } from '../types/IGroup';

export interface UserGroupsScreenProps {}

const UserGroupsScreen = () => {
  const auth = useAuth();
  const route = useRoute();
  const [loading, setLoading] = useState<boolean>(true);
  const [userGroups, setUserGroups] = useState<IGroup[]>();

  let [fontsLoaded] = useFonts({
    Roboto: require('../assets/fonts/Roboto/Roboto-Light.ttf'),
  });

  useEffect(() => {
    let isMounted = true;
    if (!!route.params) {
      const { id }: any = route.params;
      getGroupsForUser(id)
        .then((response) => {
          if (isMounted) {
            const groupsResult: IGroup[] = response.data;

            setUserGroups(groupsResult);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(`error while fetching groups ${error}`);
        });
    }
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
  } else return loading && <LoadingIndicator />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    width: '100%',
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
