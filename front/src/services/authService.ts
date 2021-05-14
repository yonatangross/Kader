import kaderApi from './axios';
import { AxiosResponse } from 'axios';

const getUser = async (userId: string): Promise<AxiosResponse<any>> => {
  try {
    const requestedUser: AxiosResponse<any> = await kaderApi.get(`/users/${userId}`);
    return requestedUser;
  } catch (error) {
    throw new Error(error);
  }
};

const signIn = async (email: string, password: string): Promise<AxiosResponse<AuthData>> => {
  try {
    let data = { username: email, password };
    const response: AxiosResponse<any> = await kaderApi.post(`/users/login`, data);
    return response;
  } catch (error) {
    console.log(`error in signIn authService, ${error}`);

    throw new Error(error);
  }
};
export type AuthData = {
  token: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
};

export const authService = {
  signIn,
  getUser,
};
