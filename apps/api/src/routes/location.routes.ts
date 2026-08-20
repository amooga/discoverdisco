import { Router } from "express";

import locationController from "../controllers/location.controller.js";

const router = Router();

router.get(
  "/search",
  locationController.search.bind(locationController)
);

export default router;