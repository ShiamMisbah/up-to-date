import { NextFunction, Request, Response } from "express";
import Reaction from "../models/reaction.model";
import Post from "../models/post.model";

export const createReaction = async (req: Request, res: Response, next: NextFunction) => {
    const { parentId } = req.params;
    const {userId, userName, reaction} = req.body;

    // Check if Reaction already exists for the user on the same parentId
    const existingReaction = await Reaction.findOne({ userId, parentId });
    try {
        if (existingReaction) {
          await existingReaction.updateOne({ reaction }, {runValidators: true});
          return res.status(201).json({
            success: true,
            message: "Reaction updated successfully",
          });
        }
        const newReaction = new Reaction({
          userId,
          userName,
          reaction,
          parentId,
        });
        await newReaction.save();
        await Post.findByIdAndUpdate(
          parentId,
          { $push: { reactionList: newReaction._id } },
          { new: true },
        );

        res.status(201).json({
          success: true,
          message: "Reaction added successfully",
          data: newReaction,
        });
    } catch (error) {
        next(error)
    }
}

export const deleteReaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {deleteId} = req.params
        const deletedReaction = await Reaction.findByIdAndDelete(deleteId)
        if (!deleteReaction) {
            return res.status(404).json({
                success: false,
                message: "Reaction not found"
            })
        }
        await Post.findByIdAndUpdate(deletedReaction?.parentId, {
            $pull: {
                reactionList: deletedReaction?.id
            }
        })

        return res.status(200).json({
          success: true,
          message: "Reaction deleted Successfully",
        });

    } catch (error) {
        
    }
}

