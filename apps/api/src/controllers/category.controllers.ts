import { Request, Response, NextFunction } from "express";

import categoryService from "../services/category.service.js";
import { successResponse } from "../utils/response.js";

class CategoryController {
  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const categories =
        await categoryService.getAll();

      return successResponse(
        res,
        categories,
        "Categories fetched successfully."
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();