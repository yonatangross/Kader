import axios, { AxiosResponse } from 'axios';
import { GroupApiDataType } from '../types/ApiDataTypes';
import { IGroup } from '../types/IGroup';
axios.defaults.headers.common['Authorization'] =
  'Bearer ' +
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiWW9uaSIsImp0aSI6IjYyNTMwZjc5LTJkYTQtNGMwMC04MjQ2LTVlNThlZmYxOWU3YSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjE2MDEwMzk5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjU5OTIxIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIn0.doWJn7S111HnAZ1q8UrkLFFMK8ds7BLO9HPDUxOvoOk';

const baseUrl: string | undefined = 'http://193.106.55.127:5000/api';

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
