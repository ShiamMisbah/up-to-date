import { Router } from "express";
import { createReaction, deleteReaction,  } from "../controllers/reaction.controller";

const router = Router()

router.post("/:parentId", createReaction);
router.delete("/delete/:deleteId", deleteReaction);

export default router