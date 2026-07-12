import { model, Schema, Types } from "mongoose";

export type parentModel = "Post" | "Comment";
export type reactionType = "like" | "unlike";
export interface IReaction extends Document {
    userName: string;
    userId: Types.ObjectId;
    reaction: reactionType;
    parentId: Types.ObjectId;
    // parentModel: parentModel;
}

const reactionSchema = new Schema<IReaction>({
    userId: { type: Types.ObjectId, ref: "User", required: true },
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    reaction: {
        type: String,
        enum: ["like", "unlike"],
        required: true
    },
    parentId: {
        type: Types.ObjectId,
        required: true,
        ref: "Post"
    }
}, {timestamps: true});

const Reaction = model<IReaction>("Reaction", reactionSchema)

export default Reaction;