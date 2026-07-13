import { Router } from "express";
import { createComment, createPost, deleteComment, deletePost, getAllComments, getAllPosts } from "../controllers/post.controller";
import { authenticate } from "../middleware/authenticate";
import upload from "../middleware/multerMiddleware";

const router = Router()

router.get("/", getAllPosts)
router.get("/comment/:parentId", getAllComments);
router.get("/comment/:parentId/replies/:replyParentId", getAllComments);

router.post("/", upload.single("image"), createPost)
router.post("/comment/:parentId", createComment);
router.post("/comment/:parentId/replies/:replyParentId", createComment);

router.delete("/delete", deletePost)
router.delete("/comment/:deleteId", deleteComment);

export default router