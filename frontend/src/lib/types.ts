export enum PrivacyStatus {
  PUBLIC = "public",
  PRIVATE = "private",
}

export enum PostType {
  POST = "post",
  COMMENT = "comment",
}

export enum ReactionType {
  LIKE = "like",
  UNLIKE = "unlike",
}

export interface Reaction {
  _id: string;
  userId: string;
  userName: string;
  reaction: "like" | "unlike";
}

export interface Comment {
  _id: string;
  userName: string;
  mainText: string;
}

export interface Post {
  _id: string;
  userId: string;
  userName: string;
  mainText: string;
  privacyStatus: PrivacyStatus;
  parentId?: string;
  reactionList: Reaction[];
  commentList: Comment[];
  createdAt: string;
  updatedAt: string;

  image?: Buffer;
  imageType?: string;
}