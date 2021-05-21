import kaderApi from './axios';
import { AxiosResponse } from 'axios';
import { GroupApiDataType } from '../types/ApiDataTypes';
import { IGroup } from '../types/IGroup';

export const getGroups = async (): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await kaderApi.get(`/groups`, {
      params: {},
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getGroupsForUser = async (userId?: string): Promise<AxiosResponse<any>> => {
  try {
    const requestedGroup: AxiosResponse<any> = await kaderApi.get(`/groups/users`, { params: userId });
    return requestedGroup;
  } catch (error) {
    throw new Error(error);
  }
};

export const getGroup = async (groupId: string): Promise<AxiosResponse<any>> => {
  try {
    const requestedGroup: AxiosResponse<any> = await kaderApi.get(`/groups/${groupId}`);
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

    const saveGroup: AxiosResponse<any> = await kaderApi.post(`/groups`, group);
    return saveGroup;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateGroup = async (group: IGroup): Promise<AxiosResponse<any>> => {
  try {
    const updatedGroup: AxiosResponse<GroupApiDataType> = await kaderApi.put(`/groups/${group.groupId}`, group);
    return updatedGroup;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteGroup = async (id: string): Promise<AxiosResponse<any>> => {
  try {
    const deletedGroup: AxiosResponse<any> = await kaderApi.delete(`/groups/${id}`);
    return deletedGroup;
  } catch (error) {
    throw new Error(error);
  }
};

export const joinGroup = async (id: string): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await kaderApi.put(`/groups/join/${id}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const leaveGroup = async (id: string): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await kaderApi.put(`/groups/leave/${id}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchGroups = async (text?: string, category?: string, radius?: number, address?: string): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await kaderApi.get(`/groups/search`, { params: { text, category, radius, address } });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
