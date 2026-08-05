import { Router } from "express";

import postController from "../controllers/post.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/",
  postController.getAll
);

router.get(
  "/:id",
  postController.getById
);

router.post(
  "/",
  authenticate,
  postController.create
);

export default router;