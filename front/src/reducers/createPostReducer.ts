import { PostType } from './../types/PostType';
import { CreatePostActionsTypes, CreatePostStateType } from '../types/CreatePostTypes';

export const initCreatePost = () => {
  const initPost: {
    postType: PostType;
    category: string;
    details: { title: string; description: string; location: string; image: any };
    groups: string[];
  } = {
    postType: PostType.Request,
    category: '',
    details: { title: '', description: '', location: '', image: undefined },
    groups: [],
  };
  return initPost;
};

export const createPostReducer = (state: CreatePostStateType, action: CreatePostActionsTypes) => {
  switch (action.type) {
    case 'PostType':
      return { ...state, postType: action.payload };
    case 'Category':
      return { ...state, category: action.payload };
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
