import { IComment } from './IComment';
import { IUser } from './IUser';
import { PostType } from './PostType';

export interface IPost {
  postId: string;
  type: PostType; 
  category: string;
  title: string;
  description: string;
  comments: IComment[];
  location: string;
  image: any;
  creator: IUser;
  groupId: string;
  created: Date;
  // updatedAt: Date;
}
