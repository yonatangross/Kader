import { IUser } from './IUser';
import { IGroup } from './IGroup';
import { IComment } from './IComment';
import { IPost } from './IPost';
type PostApiDataType = {
  message: string; // post updated
  status: string; //200
  posts: IPost[]; // all posts
  post?: IPost; // updated post
};

type CommentApiDataType = {
  message: string; // post updated
  status: string; //200
  comments: IComment[]; // all posts
  comment?: IComment; // updated post
};
type GroupApiDataType = {
  message: string; // post updated
  status: string; //200
  groups: IGroup[]; // all posts
  group?: IGroup; // updated post
};

type UserApiDataType = {
  message: string; // post updated
  status: string; //200
  users: IUser[]; // all posts
  user: IUser; // updated post
};
