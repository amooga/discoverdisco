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
    req: Request<{id: string}>,
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

  async update(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.businessId) {
        throw new AppError("Unauthorized", 401);
      }

      const data = createPostSchema.parse(req.body);

      const post = await postService.update(
        req.businessId,
        req.params.id,
        data
      );

      successResponse(
        res,
        post,
        "Advertisement updated successfully."
      );

      return;
    } catch (error) {
      next(error);
    }

    }   

    async delete(
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) {
      try {
        if (!req.businessId) {
          throw new AppError("Unauthorized", 401);
        }

        await postService.delete(
          req.businessId,
          req.params.id
        );

        successResponse(
          res,
          null,
          "Advertisement deleted successfully."
        );

        return;
      } catch (error) {
        next(error);
      }     
    }

    async getMyPosts(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            if (!req.businessId) {
                throw new AppError("Unauthorized", 401);
            }

            const posts = await postService.getMyPosts(
                req.businessId
            );

            successResponse(
                res,
                posts,
                "Advertisements fetched successfully."
            );

            return;
        } catch (error) {
            next(error);
        }
    }
}

export default new PostController();