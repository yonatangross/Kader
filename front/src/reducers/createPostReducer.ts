import { PostType } from './../types/PostType';
import { CreatePostActionsTypes, CreatePostStateType } from '../types/CreatePostTypes';

export const initCreatePost = () => {
  return {
    postType: PostType.REQUEST,
    category: '',
    details: { title: '', description: '', location: '', images: [] },
    groups: [],
  };
};

export default (state: CreatePostStateType, action: CreatePostActionsTypes) => {
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
