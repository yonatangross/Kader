import { IGroup } from './IGroup';
import { PostType } from './PostType';
import { IComment } from './IComment';
import { IUser } from './IUser';

export interface IPost {
  id: string;
  type: PostType;
  category: string;
  title: string;
  description: string;
  comments: IComment[];
  location: string;
  images: string[];
  creator: IUser;
  groupId: string;
  createdAt: Date;
  updatedAt: Date;
}
