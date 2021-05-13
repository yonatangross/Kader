import kaderApi from './axios';
import { AxiosResponse } from 'axios';
import { PostApiDataType } from '../types/ApiDataTypes';
import { IPost } from '../types/IPost';

export const getPosts = async (): Promise<AxiosResponse<any>> => {
  try {
    // console.log('requesting posts');
    const response: AxiosResponse<any> = await kaderApi.get(`/posts`, {
      params: {},
    });
    // console.log('finished requesting posts');
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getPost = async (postId: string): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await kaderApi.get(`/posts/${postId}`, { params: {} });
    return response;
  } catch (error) {
    throw new Error(`error while fetching post ${postId}, error: ${error}`);
  }
};

export const addPost = async (postData: any): Promise<AxiosResponse<any>> => {
  try {
    console.log(`postData`);
    console.log(postData);
    const response: AxiosResponse<PostApiDataType> = await kaderApi.post(`/posts/post/${postData.groupId}`, { postData: postData });
    //todo: send image with postid after response is succesful and returns postId
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const updatePost = async (post: IPost): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await kaderApi.put(`/posts/${post.postId}`, post);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCategories = async (): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await kaderApi.get(`/posts/categories`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const deletePost = async (id: string): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await kaderApi.delete(`/posts/${id}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
