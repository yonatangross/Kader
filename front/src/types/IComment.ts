import { IPost } from "./IPost";
import { IUser } from "./IUser";

export interface IComment {
  commentId: string;
  content: string;
  created: Date;
  creator: IUser;
  post: IPost;
  postId: string;
}
