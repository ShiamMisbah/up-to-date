import { Router } from "express";
import userRoutes from "./user.routes";
import postRoutes from "./post.routes";
import reactionRoutes from "./reaction.routes";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.use("/user", userRoutes)
router.use("/content", authenticate, postRoutes)
router.use("/reaction", authenticate, reactionRoutes);

export default router;
