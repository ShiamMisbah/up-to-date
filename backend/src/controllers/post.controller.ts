import { NextFunction, Request, Response } from "express";
import Post, { IPost, PostType } from "../models/post.model";
import { Types } from "mongoose";

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  try {
    const allPosts = await Post.find(
      { postType: "post" },
      "-parentId -postType",
    )
      .populate("reactionList", "userId userName reaction")
      .populate("commentList", "userId userName mainText")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const formattedPosts = allPosts.map((post) => {
      const obj: any = post.toObject();

      if (obj.image) {
        obj.image = `data:${obj.imageType};base64,${obj.image.toString("base64")}`;
      }

      return obj;
    });
    if (formattedPosts.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No posts found",
      });
    }
    const total = await Post.countDocuments({ postType: "post" });
    return res.status(200).json({
      success: true,
      message: "Posts Found",
      posts: formattedPosts,
      pagination: {
        page,
        limit,
        total,
        hasMore: page * limit < total,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id, mainText, userId, userName, privacyStatus, parentId } = req.body;
  const file = req.file;

  // Check if Post  already exists for the same Id
  const existingPost = await Post.findById(id);
  try {
    if (existingPost) {
      const updatedData: any = {
        mainText,
        privacyStatus,
      };

      if (file) {
        updatedData.image = file.buffer;
        updatedData.imageType = file.mimetype;
      }

      await existingPost.updateOne(updatedData, { runValidators: true });
      return res.status(201).json({
        success: true,
        message: "Post updated successfully",
      });
    }
    const newPost = new Post({
      mainText,
      userId,
      userName,
      privacyStatus,
      parentId: parentId || null,
      postType: "post",
      image: file?.buffer,
      imageType: file?.mimetype,
    });
    await newPost.save();
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { deleteId } = req.params;
  const deletedPost = await Post.findByIdAndDelete(deleteId);
  if (!deletedPost) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Post deleted Successfully",
  });
};

// Comment Controller

export const getAllComments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  try {
    const { parentId, replyParentId = null } = req.params;
    if (!parentId) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    //   Check if Comment or Reply
    let postType: PostType = "comment";
    let dynamicParentId = parentId;
    if (replyParentId) {
      postType = "reply";
      dynamicParentId = replyParentId;
    }

    const allComments = await Post.find({ postType, parentId: dynamicParentId })
      .populate("reactionList", "userId userName reaction")
      .populate("commentList", "userId userName mainText")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Post.countDocuments({
      postType: "comment",
      parentId: dynamicParentId,
    });

    if (allComments.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No Comments found",
        pagination: {
          page,
          limit,
          total,
          hasMore: page * limit < total,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Comments Found",
      comments: allComments,
      pagination: {
        page,
        limit,
        total,
        hasMore: page * limit < total,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { parentId, replyParentId = null } = req.params;
  if (!parentId) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }
  const { id, mainText, userId, userName } = req.body;

  //   Check if Comment or Reply
  let postType: PostType = "comment";
  let dynamicParentId = parentId;
  if (replyParentId) {
    postType = "reply";
    dynamicParentId = replyParentId;
  }

  // Check if Comment already exists for the same Id
  const existingComment = await Post.findById(id);
  try {
    if (existingComment) {
      await existingComment.updateOne({ mainText });
      return res.status(201).json({
        success: true,
        message: "Comment updated successfully",
      });
    }
    const newComment = new Post({
      mainText,
      userId,
      userName,
      parentId: dynamicParentId,
      postType,
    });
    await newComment.save();
    await Post.findByIdAndUpdate(
      dynamicParentId,
      { $push: { commentList: newComment._id } },
      { new: true },
    );

    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: newComment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { deleteId } = req.params;
  const deletedComment = await Post.findByIdAndDelete(deleteId);
  if (!deletedComment) {
    return res.status(404).json({
      success: false,
      message: "Comment not found",
    });
  }
  await Post.findByIdAndUpdate(deletedComment?.parentId, {
    $pull: {
      commentList: deletedComment?.id,
    },
  });
  return res.status(200).json({
    success: true,
    message: "Comment deleted Successfully",
  });
};
