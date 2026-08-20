import { Router } from "express";

import businessController from "../controllers/business.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/me",
  authenticate,
  businessController.getMe.bind(
    businessController
  )
);

router.patch(
  "/location",
  authenticate,
  businessController.updateLocation.bind(
    businessController
  )
);

export default router;