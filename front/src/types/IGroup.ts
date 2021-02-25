import { GroupPrivacy } from './GroupPrivacy';
import { IPost } from './IPost';
import { IUser } from './IUser';

export interface IGroup {
  id: string;
  name: string;
  category: string;
  description: string;
  mainLocation: string;
  searchable: boolean; // flag that indicates whether the group can be found in general search or not
  groupPrivacy: GroupPrivacy;
  members: IUser[];
  posts: IPost[];
}
