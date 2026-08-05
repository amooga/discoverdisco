import { Request, Response, NextFunction } from "express";

import postService from "../services/post.service";

import { createPostSchema } from "../validators/post.validator";

import { successResponse } from "../utils/response";

import AppError from "../utils/AppError";

import { AuthRequest } from "../middleware/auth.middleware";

class PostController {
  async create(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.businessId) {
        throw new AppError("Unauthorized", 401);
      }

      const data = createPostSchema.parse(req.body);

      const post = await postService.create(
        req.businessId,
        data
      );

      successResponse(
        res,
        post,
        "Advertisement created successfully.",
        201
      );

      return;
    } catch (error) {
      next(error);
    }
  }

  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const posts = await postService.getAll();

      successResponse(res, posts);

      return;
    } catch (error) {
      next(error);
    }
  }

  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const post = await postService.getById(
        req.params.id
      );

      if (!post) {
        throw new AppError(
          "Advertisement not found",
          404
        );
      }

      successResponse(res, post);

      return;
    } catch (error) {
      next(error);
    }
  }
}

export default new PostController();