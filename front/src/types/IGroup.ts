import { ICategory } from './ICategory';
import { IPost } from './IPost';
import { GroupPrivacy } from './GroupPrivacy';
import { IUser } from './IUser';

export interface IGroup {
  groupId: string;
  name: string;
  category: ICategory;
  description: string;
  mainLocation: string;
  address: string;
  groupPrivacy: GroupPrivacy;
  members: IUser[];
  managers: IUser[];
  posts: IPost[];
  membersCount: number;
  managersCount: number;
  postsCount: number;
  isManager: boolean;
}
