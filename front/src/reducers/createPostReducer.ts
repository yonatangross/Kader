import { IGroup } from './../types/IGroup';
import { PostType } from './../types/PostType';
import { CreatePostActionsTypes, CreatePostStateType } from '../types/CreatePostTypes';

export const initCreatePost = () => {
  const initPost: {
    postType: PostType;
    category: string;
    details: { title: string; description: string; location: string; images: string[] };
    groups: IGroup[];
  } = {
    postType: PostType.REQUEST,
    category: '',
    details: { title: '', description: '', location: '', images: [] },
    groups: [],
  };
  return initPost;
};

export const createPostReducer = (state: CreatePostStateType, action: CreatePostActionsTypes) => {
  switch (action.type) {
    case 'PostType':
      let postType: PostType = <PostType>action.payload;
      return { ...state, postType: postType };
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
