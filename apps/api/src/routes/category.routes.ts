import { Router } from "express";

import categoryController from "../controllers/category.controllers";

const router = Router();

router.get("/", categoryController.getAll);

export default router;