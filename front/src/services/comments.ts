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
    const requestedComment: AxiosResponse<any> = await kaderApi.get(`/comments/${commentId}`);
    return requestedComment;
  } catch (error) {
    throw new Error(error);
  }
};

export const addComment = async (formData: any): Promise<AxiosResponse<any>> => {
  try {
    const comment = {
      content: formData.content,
      created: new Date(),
      //todo: userId
      creator: '0c3084e2-8799-48ff-8b55-e9a24cc7d026',
      post: formData.post,
      postId: formData.post.postId,
    };

    const saveComment: AxiosResponse<any> = await kaderApi.post(`/comments/`, comment);
    return saveComment;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateComment = async (comment: IComment): Promise<AxiosResponse<any>> => {
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
