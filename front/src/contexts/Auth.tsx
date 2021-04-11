import React, { createContext, useState, useContext, useEffect } from 'react';

import { AuthData, authService } from '../services/authService';
import * as SecureStore from 'expo-secure-store';
import decode from 'jwt-decode';

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(username: string, password: string): Promise<void>;
  signOut(): void;
};

//Create the Auth Context with the data type specified
//and a empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>();

  //the AuthContext start with loading equals true
  //and stay like this, until the data be load from Async Storage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorage function.
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      // //Try get the data from Async Storage
      // const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      // if (authDataSerialized) {
      //   //If there are data, it's converted to an Object and the state is updated.
      //   const _authData: AuthData = JSON.parse(authDataSerialized);
      //   setAuthData(_authData);
      // }

      SecureStore.getItemAsync('jwt_token').then((token: any) => {
        try {
          console.log(`token: ${token}`);

          const decodedToken: any = decode(token);
          console.log(`decodedToken:`);
          console.log(decodedToken);

          setAuthData({
            token,
          });
        } catch {
          console.log(`yoin in catch`);
        }
      });
    } catch (error) {
    } finally {
      //loading finished
      setLoading(false);
    }
  }

  const signIn = async (username: string, password: string) => {
    //call the service passing credential (email and password).
    //In a real App this data will be provided by the user from some InputText components.
    await authService
      .signIn(username, password)
      .then((response) => {
        // console.log(`signIn response:`);
        // console.log(response.data);

        setAuthData(response.data);
        SecureStore.setItemAsync('jwt_token', response.data.token);
      })
      .catch((error) => {
        console.log(`error in signIn function, ${error}`);
      });

    //Set the data in the context, so the App can be notified
    //and send the user to the AuthStack

    //Persist the data in the Async Storage
    //to be recovered in the next user session.

    if (!!authData) {
      console.log(`in authData saving`);
      console.log(authData);

      SecureStore.setItemAsync('jwt_token', authData.token);
    }

    // AsyncStorage.setItem('@AuthData', JSON.stringify(authData));
  };

  const signOut = async () => {
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    console.log(`authData:`);
    console.log(authData);
    setAuthData(undefined);

    //Remove the data from Async Storage
    //to NOT be recovered in next session.
    // await AsyncStorage.removeItem('@AuthData');
    await SecureStore.deleteItemAsync('jwt_token');
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>{children}</AuthContext.Provider>
  );
};

//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };
