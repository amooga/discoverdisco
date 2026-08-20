import { Router } from "express";

import categoryController from "../controllers/category.controllers.js";

const router = Router();

router.get("/", categoryController.getAll);

export default router;