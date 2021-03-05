import { PostType } from './PostType';
import { IGroup } from './IGroup';

type CreatePostStateType = {
  postType: PostType;
  category: string;
  details: { title: string; description: string; location: string; images: string[] };
  groups: IGroup[];
};

type CreatePostActionsTypes =
  | { type: 'PostType'; payload: PostType }
  | { type: 'Category'; payload: string }
  | { type: 'Details'; payload: { title: string; description: string; location: string; images: string[] } }
  | { type: 'Groups'; payload: IGroup[] }
  | { type: 'Reset' };
