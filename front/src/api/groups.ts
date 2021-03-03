import axios, { AxiosResponse } from 'axios';
import { GroupApiDataType } from '../types/ApiDataTypes';
import { IGroup } from '../types/IGroup';

const baseUrl: string | undefined = 'http://localhost:4000';

export const getGroups = async (): Promise<AxiosResponse<GroupApiDataType>> => {
  try {
    const response: AxiosResponse<GroupApiDataType> = await axios.get(`${baseUrl}/groups`, {
      params: {},
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getGroup = async (groupId: string): Promise<AxiosResponse<GroupApiDataType>> => {
  try {
    const requestedGroup: AxiosResponse<GroupApiDataType> = await axios.get(`${baseUrl}/groups/${groupId}`);
    return requestedGroup;
  } catch (error) {
    throw new Error(error);
  }
};

export const addGroup = async (formData: IGroup): Promise<AxiosResponse<GroupApiDataType>> => {
  try {
    console.log(formData);
    const group: Omit<IGroup, 'id'> = {
      category: formData.category,
      description: formData.description,
      groupPrivacy: formData.groupPrivacy,
      mainLocation: formData.mainLocation,
      members: formData.members,
      name: formData.name,
      posts: [],
      searchable: formData.searchable,
    };
    console.log(`group: ${Object.keys(group)}\n ${Object.values(group)}`);

    const saveGroup: AxiosResponse<GroupApiDataType> = await axios.post(`${baseUrl}/groups/${group}`, group);
    return saveGroup;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateGroup = async (group: IGroup): Promise<AxiosResponse<GroupApiDataType>> => {
  try {
    const updatedGroup: AxiosResponse<GroupApiDataType> = await axios.put(`${baseUrl}/groups/${group.id}`, group);
    return updatedGroup;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteGroup = async (id: string): Promise<AxiosResponse<GroupApiDataType>> => {
  try {
    const deletedGroup: AxiosResponse<GroupApiDataType> = await axios.delete(`${baseUrl}/groups/${id}`);
    return deletedGroup;
  } catch (error) {
    throw new Error(error);
  }
};
