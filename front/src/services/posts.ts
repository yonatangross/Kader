import axios, { AxiosResponse } from 'axios';
import { PostApiDataType } from '../types/ApiDataTypes';
import { IPost } from '../types/IPost';
import * as SecureStore from 'expo-secure-store';

const baseUrl: string | undefined = 'http://kader.cs.colman.ac.il:5000/api';

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

export const getPosts = async (): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await axios.get(`${baseUrl}/posts`, {
      params: {},
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getPost = async (postId: string): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await axios.get(`${baseUrl}/posts/${postId}`, { params: {} });
    return response;
  } catch (error) {
    throw new Error(`error while fetching post ${postId}, error: ${error}`);
  }
};

export const addPost = async (postData: any): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<PostApiDataType> = await axios.post(`${baseUrl}/posts/post/${postData.groupId}`, { postData: postData });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const updatePost = async (post: IPost): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await axios.put(`${baseUrl}/posts/${post.postId}`, post);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCategories = async (): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await axios.get(`${baseUrl}/posts/categories`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const deletePost = async (id: string): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await axios.delete(`${baseUrl}/posts/${id}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
