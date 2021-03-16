import axios, { AxiosResponse } from 'axios';
import { PostApiDataType } from '../types/ApiDataTypes';
import { IPost } from '../types/IPost';

const baseUrl: string | undefined = 'http://localhost:5000';

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
    const requestedPost: AxiosResponse<PostApiDataType> = await axios.get(`${baseUrl}/posts/${postId}`);
    return requestedPost;
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

    const savePost: AxiosResponse<PostApiDataType> = await axios.post(`${baseUrl}/posts/${post}`, post);
    return savePost;
  } catch (error) {
    throw new Error(error);
  }
};

export const updatePost = async (post: IPost): Promise<AxiosResponse<PostApiDataType>> => {
  try {
    const updatedPost: AxiosResponse<PostApiDataType> = await axios.put(`${baseUrl}/posts/${post.id}`, post);
    return updatedPost;
  } catch (error) {
    throw new Error(error);
  }
};

export const deletePost = async (id: string): Promise<AxiosResponse<PostApiDataType>> => {
  try {
    const deletedPost: AxiosResponse<PostApiDataType> = await axios.delete(`${baseUrl}/posts/${id}`);
    return deletedPost;
  } catch (error) {
    throw new Error(error);
  }
};
