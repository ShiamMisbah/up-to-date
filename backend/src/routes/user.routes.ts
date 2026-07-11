import { Router } from "express";
import { loginUser, logoutUser, signupUser } from "../controllers/user.controller";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.post("/login", loginUser);
router.post("/signup", authenticate, signupUser);
router.post("/logout", logoutUser);

export default router;