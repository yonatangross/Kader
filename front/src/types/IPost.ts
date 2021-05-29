import { ICategory } from './ICategory';
import { IComment } from './IComment';
import { IGroup } from './IGroup';
import { IUser } from './IUser';
import { PostType } from './PostType';

export interface IPost {
  postId: string;
  type: PostType;
  category: ICategory;
  title: string;
  description: string;
  comments: IComment[];
  commentsCount: number;
  location: string;
  address: string;
  image: any;
  creator: IUser;
  groupId: string;
  group: IGroup;
  groupName: string;
  created: Date;
  isActive: boolean;
  // updatedAt: Date;
}
