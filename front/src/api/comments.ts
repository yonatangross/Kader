import axios, { AxiosResponse } from 'axios';
import { CommentApiDataType } from '../types/ApiDataTypes';
import { IComment } from '../types/IComment';

const baseUrl: string | undefined = 'http://localhost:5000';

export const getComments = async (): Promise<AxiosResponse<CommentApiDataType>> => {
  try {
    const response: AxiosResponse<CommentApiDataType> = await axios.get(`${baseUrl}/comments`, {
      params: {},
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getComment = async (commentId: string): Promise<AxiosResponse<CommentApiDataType>> => {
  try {
    const requestedComment: AxiosResponse<CommentApiDataType> = await axios.get(`${baseUrl}/comments/${commentId}`);
    return requestedComment;
  } catch (error) {
    throw new Error(error);
  }
};

export const addComment = async (formData: IComment): Promise<AxiosResponse<CommentApiDataType>> => {
  try {
    console.log(formData);
    const comment: Omit<IComment, 'id'> = {
      content: formData.content,
    };
    console.log(`comment: ${Object.keys(comment)}\n ${Object.values(comment)}`);

    const saveComment: AxiosResponse<CommentApiDataType> = await axios.post(`${baseUrl}/comments/${comment}`, comment);
    return saveComment;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateComment = async (comment: IComment): Promise<AxiosResponse<CommentApiDataType>> => {
  try {
    const updatedComment: AxiosResponse<CommentApiDataType> = await axios.put(`${baseUrl}/comments/${comment.id}`, comment);
    return updatedComment;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteComment = async (id: string): Promise<AxiosResponse<CommentApiDataType>> => {
  try {
    const deletedComment: AxiosResponse<CommentApiDataType> = await axios.delete(`${baseUrl}/comments/${id}`);
    return deletedComment;
  } catch (error) {
    throw new Error(error);
  }
};
