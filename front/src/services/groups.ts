import axios, { AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { GroupApiDataType } from '../types/ApiDataTypes';
import { IGroup } from '../types/IGroup';

const baseUrl: string | undefined = 'http://193.106.55.127:5000/api';


// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    SecureStore.getItemAsync('jwt_token').then((token: any) => {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      } catch {
        console.log(`yoin in catch`);
      }
    });
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const getGroups = async (): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await axios.get(`${baseUrl}/groups`, {
      params: {},
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getGroupsForUser = async (userId: string): Promise<AxiosResponse<any>> => {
  try {
    const requestedGroup: AxiosResponse<any> = await axios.get(`${baseUrl}/groups/users/${userId}`);
    return requestedGroup;
  } catch (error) {
    throw new Error(error);
  }
};

export const getGroup = async (groupId: string): Promise<AxiosResponse<any>> => {
  try {
    console.log(groupId);

    const requestedGroup: AxiosResponse<any> = await axios.get(`${baseUrl}/groups/${groupId}`);
    return requestedGroup;
  } catch (error) {
    throw new Error(error);
  }
};

export const addGroup = async (formData: any): Promise<AxiosResponse<any>> => {
  try {
    const group = {
      category: formData.category,
      description: formData.description,
      groupPrivacy: formData.groupPrivacy,
      mainLocation: formData.mainLocation,
      members: formData.members,
      name: formData.name,
      posts: [],
    };

    const saveGroup: AxiosResponse<any> = await axios.post(`${baseUrl}/groups`, group);
    return saveGroup;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateGroup = async (group: IGroup): Promise<AxiosResponse<any>> => {
  try {
    const updatedGroup: AxiosResponse<GroupApiDataType> = await axios.put(`${baseUrl}/groups/${group.groupId}`, group);
    return updatedGroup;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteGroup = async (id: string): Promise<AxiosResponse<any>> => {
  try {
    const deletedGroup: AxiosResponse<any> = await axios.delete(`${baseUrl}/groups/${id}`);
    return deletedGroup;
  } catch (error) {
    throw new Error(error);
  }
};
