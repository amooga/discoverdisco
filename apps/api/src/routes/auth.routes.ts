import { Router } from "express";

import authController from "../controllers/auth.controller.js";
import { loginLimiter, registerLimiter } from "../middleware/rateLimit.middleware.js";

const router = Router();

router.post(
  "/register",
  registerLimiter,
  authController.register
);

router.post(
  "/login",
  loginLimiter,
  authController.login
);

export default router;