import { IGroup } from './../types/IGroup';
import { PostType } from './../types/PostType';
import { CreatePostActionsTypes, CreatePostStateType } from '../types/CreatePostTypes';

export const initAuthReducer = () => {
  const initPost: {
    postType: PostType;
    category: string;
    details: { title: string; description: string; location: string; images: string[] };
    groups: string[];
  } = {
    postType: PostType.REQUEST,
    category: '',
    details: { title: '', description: '', location: '', images: [] },
    groups: [],
  };
  return initPost;
};

export const authReducer = (state: CreatePostStateType, action: CreatePostActionsTypes) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };

    case 'Details':
      return { ...state, details: action.payload };
    case 'Groups':
      return { ...state, groups: action.payload };
    case 'Reset':
      return initAuthReducer();
    default:
      return state;
  }
};
