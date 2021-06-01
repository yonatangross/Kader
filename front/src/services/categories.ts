import { AxiosResponse } from 'axios';
import kaderApi from './axios';

export const getCategories = async (): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await kaderApi.get(`/categories`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCategoryByName = async (categoryName: string): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await kaderApi.get(`/categories/${categoryName}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
