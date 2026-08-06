import { Router } from "express";

import postController from "../controllers/post.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/",
  postController.getAll
);

router.get(
  "/me",
  authenticate,
  postController.getMyPosts
);

router.get("/:id", postController.getById);

router.post(
  "/",
  authenticate,
  postController.create
);

router.patch(
  "/:id",
  authenticate,
  postController.update
);

router.delete(
  "/:id",
  authenticate,
  postController.delete
);

router.get(
  "/feed",
  postController.feed
);

export default router;