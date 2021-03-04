import { PostType } from './PostType';
import { IGroup } from './IGroup';
type CreatePostStateType = {
  postType: PostType;
  category: string;
  details: { title: string; description: string; location: string; images: string[] };
  groups: IGroup[];
};

type CreatePostActionsTypes = {
  type: 'PostType' | 'Category' | 'Details' | 'Groups' | 'Reset';
  payload: PostType | string | { title: string; description: string; location: string; images: string[] } | IGroup[] | undefined;
};
