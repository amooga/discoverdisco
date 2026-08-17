import { Router } from "express";
import upload from "../middleware/upload.middleware.js";
import uploadController from "../controllers/upload.controller.js";

const router = Router();

router.post(
  "/",
  upload.single("image"),
  uploadController.upload
);

export default router;