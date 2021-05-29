import { PostType } from './../types/PostType';
import { CreatePostActionsTypes, CreatePostStateType } from '../types/CreatePostTypes';

export const initCreatePost = () => {
  const initPost: {
    postType: PostType;
    details: { title: string; description: string; address: string; image: any };
    groups: string[];
  } = {
    postType: PostType.Request,
    details: { title: '', description: '', address: '', image: undefined },
    groups: [],
  };
  return initPost;
};

export const createPostReducer = (state: CreatePostStateType, action: CreatePostActionsTypes) => {
  switch (action.type) {
    case 'PostType':
      return { ...state, postType: action.payload };
    case 'Details':
      return { ...state, details: action.payload };
    case 'Groups':
      return { ...state, groups: action.payload };
    case 'Reset':
      return initCreatePost();
    default:
      return state;
  }
};
