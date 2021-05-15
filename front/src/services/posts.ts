import kaderApi, { kaderPhotoUploadApi } from './axios';
import axios, { AxiosResponse } from 'axios';
import { PostApiDataType } from '../types/ApiDataTypes';
import { IPost } from '../types/IPost';
import { ImagePickerResult } from 'expo-image-picker';
import { Platform } from 'react-native';

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
    const response: AxiosResponse<any> = await kaderApi.get(`/posts/post/${postId}`, { params: {} });
    return response;
  } catch (error) {
    throw new Error(`error while fetching post ${postId}, error: ${error}`);
  }
};

export const addPost = async (postData: any): Promise<AxiosResponse<any>> => {
  try {
    // console.log(`postData`);
    // console.log(postData);
    const response: AxiosResponse<any> = await kaderApi.post(`/posts/post/${postData.groupId}`, { postData: postData });

    console.log('postId:');

    console.log(response.data.postId);

    let postImage = postData.image as ImagePickerResult;

    //use formdata
    var formData = new FormData();

    //append created photo{} to formdata
    formData.append('postId', response.data.postId);
    formData.append('post_image', {
      // @ts-ignore
      uri: Platform.OS === 'android' ? postImage.uri : postImage.uri.replace('file://', ''),
      type: 'image/jpeg',
      name: `${response.data.postId}.jpg`,
    });
    //use axios to POST
    kaderPhotoUploadApi({
      method: 'POST',
      url: `/posts/post/${response.data.postId}/image`,
      data: formData,
    })
      .then((response) => {
        console.log('image uploaded, response:');
        console.log(response);
      })
      .catch((error) => {
        console.log('error while uploading photo, error:');
        console.log(error);
      });
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
