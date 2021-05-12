import { PostType } from './PostType';
import { IGroup } from './IGroup';

type CreatePostStateType = {
  postType: PostType;
  category: string;
  details: { title: string; description: string; location: string; image: any };
  groups: string[];
};

type CreatePostActionsTypes =
  | { type: 'PostType'; payload: PostType }
  | { type: 'Category'; payload: string }
  | { type: 'Details'; payload: { title: string; description: string; location: string; image: any } }
  | { type: 'Groups'; payload: string[] }
  | { type: 'Reset' };
