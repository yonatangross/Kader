import axios, { AxiosResponse } from 'axios';
import { IUser } from '../types/IUser';
import * as SecureStore from 'expo-secure-store';

const baseUrl: string | undefined = 'http://kader.cs.colman.ac.il:5000/api';

axios.interceptors.request.use(
  function (config) {
    SecureStore.getItemAsync('jwt_token').then((token: any) => {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        console.log(`added interceptor ${token}`);

      } catch {
        console.log(`error creating axios interceptor inside users service.`);
      }
    });
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const getUsers = async (): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await axios.get(`${baseUrl}/users`, {
      params: {},
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUser = async (userId: string): Promise<AxiosResponse<any>> => {
  try {
    const requestedUser: AxiosResponse<any> = await axios.get(`${baseUrl}/users/${userId}`);
    return requestedUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const addUser = async (formData: IUser): Promise<AxiosResponse<any>> => {
  try {
    //console.log(formData);
    const user: Omit<IUser, 'id'> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      rating: 0,
      numberOfRatings: 0,
      memberInGroups: [],
      managerInGroups: [],
      comments: [],
      posts: [],
      imageUri: undefined,
    };
    //console.log(`user: ${Object.keys(user)}\n ${Object.values(user)}`);

    const saveUser: AxiosResponse<any> = await axios.post(`${baseUrl}/users/${user}`, user);
    return saveUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUser = async (user: IUser): Promise<AxiosResponse<any>> => {
  try {
    const updatedUser: AxiosResponse<any> = await axios.put(`${baseUrl}/users/${user.id}`, user);
    return updatedUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUser = async (id: string): Promise<AxiosResponse<any>> => {
  try {
    const deletedUser: AxiosResponse<any> = await axios.delete(`${baseUrl}/users/${id}`);
    return deletedUser;
  } catch (error) {
    throw new Error(error);
  }
};
