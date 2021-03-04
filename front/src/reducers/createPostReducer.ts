import { PostType } from './../types/PostType';
import { CreatePostActionsTypes, CreatePostStateType } from '../types/CreatePostTypes';

export default (state: CreatePostStateType, action: CreatePostActionsTypes) => {
  switch (action.type) {
    case 'PostType':
      let postType: PostType = <PostType>action.payload;
      return { ...state, PostType: postType };
    case 'Category':
      return { ...state, Category: action.payload };
    case 'Details':
      return { ...state, Details: action.payload };
    case 'Groups':
      return { ...state, Groups: action.payload };
    default:
      return state;
  }
};
