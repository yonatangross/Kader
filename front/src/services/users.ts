import kaderApi from './axios';
import { AxiosResponse } from 'axios';
import { IUser } from '../types/IUser';

export const getUsers = async (): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await kaderApi.get(`/users`, {
      params: {},
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUser = async (userId: string): Promise<AxiosResponse<any>> => {
  try {
    const requestedUser: AxiosResponse<any> = await kaderApi.get(`/users/${userId}`);
    return requestedUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const addUser = async (formData: IUser): Promise<AxiosResponse<any>> => {
  try {
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

    const saveUser: AxiosResponse<any> = await kaderApi.post(`/users/${user}`, user);
    return saveUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUser = async (user: IUser): Promise<AxiosResponse<any>> => {
  try {
    const updatedUser: AxiosResponse<any> = await kaderApi.put(`/users/${user.id}`, user);
    return updatedUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUser = async (id: string): Promise<AxiosResponse<any>> => {
  try {
    const deletedUser: AxiosResponse<any> = await kaderApi.delete(`/users/${id}`);
    return deletedUser;
  } catch (error) {
    throw new Error(error);
  }
};
export const addRating = async (userId: string, rating: number): Promise<AxiosResponse<any>> => {
  try {
    const ratedUserResponse: AxiosResponse<any> = await kaderApi.post(`/users/${userId}`, rating);
    return ratedUserResponse;
  } catch (error) {
    throw new Error(error);
  }
};
