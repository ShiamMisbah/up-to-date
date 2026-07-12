import { Router } from "express";
import userRoutes from "./user.routes";
import postRoutes from "./post.routes";
import reactionRoutes from "./reaction.routes";

const router = Router();

router.use("/user", userRoutes)
router.use("/content", postRoutes)
router.use("/reaction", reactionRoutes)

export default router;
