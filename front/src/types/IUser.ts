import { IComment } from './IComment';
import { IGroup } from './IGroup';
import { IPost } from './IPost';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  rating: number;
  numberOfRatings: number;
  groups: IGroup[];
  posts: IPost[];
  comments: IComment[];
  imageUrl: string;
}
