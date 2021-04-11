import axios, { AxiosResponse } from 'axios';
import { PostApiDataType } from '../types/ApiDataTypes';
import { IPost } from '../types/IPost';
axios.defaults.headers.common['Authorization'] =
  'Bearer ' +
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiWW9uaSIsImp0aSI6IjYyNTMwZjc5LTJkYTQtNGMwMC04MjQ2LTVlNThlZmYxOWU3YSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjE2MDEwMzk5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjU5OTIxIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIn0.doWJn7S111HnAZ1q8UrkLFFMK8ds7BLO9HPDUxOvoOk';

const baseUrl: string | undefined = 'http://kader.cs.colman.ac.il:5000/api';

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
    const response: AxiosResponse<any> = await axios.get(`${baseUrl}/posts/${postId}`);
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
