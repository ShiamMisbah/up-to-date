import { Router } from "express";
import { createComment, createPost, deleteComment, deletePost, getAllComments, getAllPosts } from "../controllers/post.controller";

const router = Router()

router.get("/", getAllPosts)
router.get("/comment/:parentId", getAllComments);
router.get("/comment/:parentId/replies/:replyParentId", getAllComments);

router.post("/", createPost)
router.post("/comment/:parentId", createComment);
router.post("/comment/:parentId/replies/:replyParentId", createComment);

router.delete("/delete", deletePost)
router.delete("/comment/:deleteId", deleteComment);

export default router