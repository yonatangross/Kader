import axios, { AxiosResponse } from 'axios';
import { PostApiDataType } from '../types/ApiDataTypes';
import { IPost } from '../types/IPost';

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
    const response: AxiosResponse<any> = await axios.get(`${baseUrl}/posts/${postId}`, { params: {} });
    return response;
  } catch (error) {
    throw new Error(`error while fetching post ${postId}, error: ${error}`);
  }
};

export const addPost = async (postData: any): Promise<AxiosResponse<any>> => {
  try {
    console.log(`postData`);
    console.log(postData);
    const response: AxiosResponse<PostApiDataType> = await axios.post(`${baseUrl}/posts/post/${postData.groupId}`, { postData: postData });
    //todo: send image with postid after response is succesful and returns postId
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
