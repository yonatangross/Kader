import axios, { AxiosResponse } from 'axios';
import { PostApiDataType } from '../types/ApiDataTypes';
import { IPost } from '../types/IPost';

const baseUrl: string | undefined = 'http://193.106.55.127:5000';

export const getPosts = async (): Promise<AxiosResponse<PostApiDataType>> => {
  try {
    const response: AxiosResponse<PostApiDataType> = await axios.get(`${baseUrl}/posts`, {
      params: {},
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getPost = async (postId: string): Promise<AxiosResponse<PostApiDataType>> => {
  try {
    const response: AxiosResponse<PostApiDataType> = await axios.get(`${baseUrl}/posts/${postId}`);
    return response;
  } catch (error) {
    throw new Error(`error while fetching post ${postId}, error: ${error}`);
  }
};

export const addPost = async (formData: IPost): Promise<AxiosResponse<PostApiDataType>> => {
  try {
    //(formData);
    const post: Omit<IPost, 'id'> = {
      type: formData.type,
      category: formData.category,
      creator: formData.creator,
      title: formData.title,
      description: formData.description,
      groupId: formData.groupId,
      comments: [],
      location: formData.location,
      images: formData.images,
    };
    //console.log(`post: ${Object.keys(post)}\n ${Object.values(post)}`);

    const response: AxiosResponse<PostApiDataType> = await axios.post(`${baseUrl}/posts/${post}`, post);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const updatePost = async (post: IPost): Promise<AxiosResponse<PostApiDataType>> => {
  try {
    const response: AxiosResponse<PostApiDataType> = await axios.put(`${baseUrl}/posts/${post.id}`, post);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCategories = async (): Promise<AxiosResponse<PostApiDataType>> => {
  try {
    const response: AxiosResponse<PostApiDataType> = await axios.get(`${baseUrl}/posts/categories`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const deletePost = async (id: string): Promise<AxiosResponse<PostApiDataType>> => {
  try {
    const response: AxiosResponse<PostApiDataType> = await axios.delete(`${baseUrl}/posts/${id}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
