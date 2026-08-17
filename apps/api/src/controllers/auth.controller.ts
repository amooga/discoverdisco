import { Request, Response, NextFunction } from "express";

import authService from "../services/auth.service.js";
import { successResponse } from "../utils/response.js";
import {
  registerSchema,
  loginSchema,
} from "../validators/auth.validator.js";

class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = registerSchema.parse(req.body);

      const result = await authService.register(data);

      successResponse(
        res,
        result,
        "Business registered successfully.",
        201
      );

      return ;
    } catch (error) {
      next(error);
    }
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = loginSchema.parse(req.body);

      const result = await authService.login(data);

      successResponse(
        res,
        result,
        "Login successful."
      );

      return;
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();