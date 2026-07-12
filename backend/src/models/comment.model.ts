// import { Schema, Types } from "mongoose";
// import { IContent } from "./post.model";

// export type commentType = "comment" | "reply"
// export interface IComment extends IContent {
//     replyList: Types.ObjectId[];
//     nature: commentType;
//     parentId: Types.ObjectId;
// }

// const commentSchema = new Schema<IComment>(
//   {
//     mainText: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     userId: { type: Types.ObjectId, ref: "User", required: true },
//     userName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     reactionList: [{ type: Types.ObjectId, ref: "Reactions" }],
//     replyList: [{ type: Types.ObjectId, ref: "Comments" }],
//     parentId: { type: Types.ObjectId, ref: "Comments", required: false },
//   },
//   { timestamps: true },
// );