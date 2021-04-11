import axios, { AxiosResponse } from 'axios';
import { UserApiDataType } from '../types/ApiDataTypes';
import { IUser } from '../types/IUser';

axios.defaults.headers.common['Authorization'] =
  'Bearer ' +
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiWW9uaSIsImp0aSI6IjYyNTMwZjc5LTJkYTQtNGMwMC04MjQ2LTVlNThlZmYxOWU3YSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjE2MDEwMzk5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjU5OTIxIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIn0.doWJn7S111HnAZ1q8UrkLFFMK8ds7BLO9HPDUxOvoOk';


const baseUrl: string | undefined = 'http://193.106.55.127:5000/api';

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
      groups: [],
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
