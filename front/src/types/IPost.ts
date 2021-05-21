import { ICategory } from './ICategory';
import { IComment } from './IComment';
import { IUser } from './IUser';
import { PostType } from './PostType';

export interface IPost {
  postId: string;
  type: PostType;
  category: ICategory;
  title: string;
  description: string;
  comments: IComment[];
  location: string;
  address: string;
  image: any;
  creator: IUser;
  groupId: string;
  groupName: string;
  created: Date;
  isActive:boolean;
  // updatedAt: Date;
}
