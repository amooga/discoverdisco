import { Router } from "express";

import postController from "../controllers/post.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

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

router.get(
  "/feed",
  postController.feed
);

router.post(
  "/",
  authenticate,
  postController.create
);

router.get(
  "/nearby",
  postController.getNearbyPosts
);

router.get("/:id", postController.getById);

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

export default router;