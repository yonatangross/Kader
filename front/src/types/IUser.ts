import { IComment } from './IComment';
import { IGroup } from './IGroup';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  rating: number;
  numberOfRatings: number;
  groups: IGroup[];
  posts: IComment[];
  comments: IComment[];
  imageUri?: string;
}
