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

const register = async (formData: any): Promise<AxiosResponse<any>> => {
  delete formData.passwordConfirmation;
  console.log(formData);

  try {
    const saveUser: AxiosResponse<any> = await kaderApi.post(`/users/register`, formData);
    return saveUser;
  } catch (error) {
    console.log(`error in sign up authService`);
    console.log(error);

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
  register,
  getUser,
};
