import axios, { AxiosResponse } from 'axios';
import { UserApiDataType } from '../types/ApiDataTypes';
import { IUser } from '../types/IUser';

const baseUrl: string | undefined = 'http://localhost:5000';

export const getUsers = async (): Promise<AxiosResponse<UserApiDataType>> => {
  try {
    const response: AxiosResponse<UserApiDataType> = await axios.get(`${baseUrl}/users`, {
      params: {},
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUser = async (petId: string): Promise<AxiosResponse<UserApiDataType>> => {
  try {
    const requestedUser: AxiosResponse<UserApiDataType> = await axios.get(`${baseUrl}/users/${petId}`);
    return requestedUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const addUser = async (formData: IUser): Promise<AxiosResponse<UserApiDataType>> => {
  try {
    console.log(formData);
    const user: Omit<IUser, 'id'> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      rating: 0,
      numberOfRatings: 0,
      groups: [],
      comments: [],
      posts: [],
      imageUri: undefined,
    };
    console.log(`user: ${Object.keys(user)}\n ${Object.values(user)}`);

    const saveUser: AxiosResponse<UserApiDataType> = await axios.post(`${baseUrl}/users/${user}`, user);
    return saveUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUser = async (user: IUser): Promise<AxiosResponse<UserApiDataType>> => {
  try {
    const updatedUser: AxiosResponse<UserApiDataType> = await axios.put(`${baseUrl}/users/${user.id}`, user);
    return updatedUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUser = async (id: string): Promise<AxiosResponse<UserApiDataType>> => {
  try {
    const deletedUser: AxiosResponse<UserApiDataType> = await axios.delete(`${baseUrl}/users/${id}`);
    return deletedUser;
  } catch (error) {
    throw new Error(error);
  }
};
