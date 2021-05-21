import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from '../components/Themed';
import { useAuth } from '../contexts/Auth';
import { useFonts } from 'expo-font';
import { getUser } from '../services/users';

export interface UserSettingsScreenProps {}

const UserSettingsScreen = () => {
  const auth = useAuth();

  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>();

  let [fontsLoaded] = useFonts({
    Roboto: require('../assets/fonts/Roboto/Roboto-Light.ttf'),
  });

  useEffect(() => {
    let isMounted = true;
    if (!!auth.authData)
      getUser(auth.authData?.userId)
        .then((response) => {
          if (isMounted) {
            const userResult: any[] = response.data;
            setUser(userResult);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(`error while fetching posts ${error}`);
        });

    return () => {
      isMounted = false;
    };
  }, [fontsLoaded, setUser]);

  if (!!user && !!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.userTitle}>{user.firstName + ' ' + user.lastName}</Text>
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
  userTitle: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
    marginHorizontal: 20,
    alignSelf: 'flex-start',
  },
});

export default UserSettingsScreen;
