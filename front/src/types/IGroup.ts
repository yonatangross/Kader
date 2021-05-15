import { IPost } from './IPost';
import { GroupPrivacy } from './GroupPrivacy';
import { IUser } from './IUser';

export interface IGroup {
  groupId: string;
  name: string;
  category: string;
  description: string;
  mainLocation: string;
  groupPrivacy: GroupPrivacy;
  members: IUser[];
  managers: IUser[];
  posts: IPost[];
}
