import kaderApi from './axios';
import { AxiosResponse } from 'axios';
import { CommentApiDataType } from '../types/ApiDataTypes';
import { IComment } from '../types/IComment';

export const getComments = async (): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await kaderApi.get(`/comments`, {
      params: {},
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getComment = async (commentId: string): Promise<AxiosResponse<any>> => {
  try {
    const requestedComment: AxiosResponse<any> = await kaderApi.get(`/comments/comment/${commentId}`);
    return requestedComment;
  } catch (error) {
    throw new Error(error);
  }
};

export const addComment = async (content: string, postId: string): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await kaderApi.post(`/comments/${postId}`, { content });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateComment = async (comment: any): Promise<AxiosResponse<any>> => {
  try {
    const updatedComment: AxiosResponse<any> = await kaderApi.put(`/comments/${comment.commentId}`, comment);
    return updatedComment;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteComment = async (id: string): Promise<AxiosResponse<CommentApiDataType>> => {
  try {
    const deletedComment: AxiosResponse<CommentApiDataType> = await kaderApi.delete(`/comments/${id}`);
    return deletedComment;
  } catch (error) {
    throw new Error(error);
  }
};
