import { NumberLocale } from 'yup/lib/locale';
import { IComment } from './IComment';
import { IGroup } from './IGroup';
import { IPost } from './IPost';

export interface IUser {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  rating: number;
  numberOfRating: number;
  memberInGroups: IGroup[];
  posts: IPost[];
  comments: IComment[];
  managerInGroups: IGroup[];
  postsCount: number;
  memberInGroupsCount: number;
  managerInGroupsCount: number;
  imageUri?: string;
  userName: string;
}
