import React, { createContext, useState, useContext, useEffect } from 'react';

import { AuthData, authService } from '../services/authService';
import * as SecureStore from 'expo-secure-store';
import decode from 'jwt-decode';
import kaderApi from '../services/axios';
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
    //and call the loadStorage function.
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    // console.log('in authContext loadStorageData');

    try {
      SecureStore.getItemAsync('jwt_token').then(async (token: any) => {
        try {
          const decodedToken: any = decode(token);
          let tokenExpDate = new Date(decodedToken.exp * 1000);

          if (tokenExpDate > new Date()) {
            // console.log('got valid token, setting AuthData');
            try {
              setAuthData({
                token: token,
                userId: decodedToken.userid,
                email: decodedToken.email,
                firstName: decodedToken.firstname,
                lastName: decodedToken.lastname,
              });
              // console.log('Finished adding authData');
            } catch (error) {
              console.log(`error while setting auth data ${error}`);
            }
          } else {
            console.log(`token ${token} expired`);
            signOut();
          }
        } catch (error) {
          console.log(`error while reading token: ${error}`);
        }
      });
    } catch (error) {
      console.log(`error while fetching jwt_token: ${error}`);
    } finally {
      //loading finished
      // console.log('finished loadStorageData');

      setLoading(false);
    }
  }

  const signIn = async (email: string, password: string) => {
    //call the service passing credential (email and password).
    //In a real App this data will be provided by the user from some InputText components.
    // console.log('in authcontext signin');
    await authService
      .signIn(email, password)
      .then((response) => {
        const decodedToken: any = decode(response.data.token);
        setAuthData({
          token: response.data.token,
          userId: decodedToken.userid,
          email: decodedToken.email,
          firstName: decodedToken.firstname,
          lastName: decodedToken.lastname,
        });
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
      console.log(`authData isn't null, saving token`);
      SecureStore.setItemAsync('jwt_token', authData.token);
    }

    // AsyncStorage.setItem('@AuthData', JSON.stringify(authData));
  };

  const signOut = async () => {
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    console.log(`Singing out, Removing authData`);
    setAuthData(undefined);

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
