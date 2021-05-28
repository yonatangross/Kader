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

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      SecureStore.getItemAsync('jwt_token').then(async (token: any) => {
        try {
          const decodedToken: any = decode(token);
          let tokenExpDate = new Date(decodedToken.exp * 1000);

          if (tokenExpDate > new Date()) {
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
      setLoading(false);
    }
  }

  const signIn = async (email: string, password: string) => {
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

    if (!!authData) {
      console.log(`authData isn't null, saving token`);
      SecureStore.setItemAsync('jwt_token', authData.token);
    }
  };

  const signOut = async () => {
    console.log(`Singing out, Removing authData`);
    setAuthData(undefined);

    await SecureStore.deleteItemAsync('jwt_token');
  };

  return <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>{children}</AuthContext.Provider>;
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };
