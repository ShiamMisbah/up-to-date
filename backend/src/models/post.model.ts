import { Types } from "mongoose";
import { model, Schema } from "mongoose";
import { IReaction } from "./reaction.model";

export type PrivacyStatus = "public" | "private";

export type PostType = "post" | "comment" | "reply"

export interface IContent extends Document {
  id: string;
  userId: Types.ObjectId;
  userName: string;
  mainText: string;
  reactionList: IReaction[];
}

export interface IPost extends IContent {
  privacyStatus: PrivacyStatus;
  commentList: Types.ObjectId[];
  postType: PostType;
  parentId: Types.ObjectId;

  image?: Buffer;
  imageType?: string;
}

const postSchema = new Schema<IPost>(
  {
    mainText: {
      type: String,
      required: true,
      trim: true,
    },
    userId: { type: Types.ObjectId, ref: "User", required: true },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    // For Posts only
    privacyStatus: {
      type: String,
      enum: ["public", "private"],
      default: "public",
      required: false,
    },
    //  For Comments and replies
    parentId: {
      type: Types.ObjectId,
      ref: "Post",
      required: false,
      default: null,
    },
    postType: {
      type: String,
      enum: ["post", "comment", "reply"],
      default: "post",
      required: true,
    },
    reactionList: [{ type: Types.ObjectId, ref: "Reaction" }],
    commentList: [{ type: Types.ObjectId, ref: "Post" }],

    image: {
      type: Buffer,
    },

    imageType: {
      type: String,
    },
  },
  { timestamps: true },
);

const Post = model<IPost>("Post", postSchema);

export default Post;
