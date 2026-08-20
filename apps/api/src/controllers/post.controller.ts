import { Request, Response, NextFunction } from "express";

import postService from "../services/post.service.js";

import { createPostSchema } from "../validators/post.validator.js";

import { successResponse } from "../utils/response.js";

import AppError from "../utils/AppError.js";

import { AuthRequest } from "../middleware/auth.middleware.js";

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


    async feed(
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        const posts = await postService.getFeed();

        return successResponse(
          res,
          posts,
          "Feed fetched successfully."
        );
      } catch (error) {
        next(error);
      }
    }
  
  async getNearbyPosts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const latitude = Number(req.query.lat);
      const longitude = Number(req.query.lng);

      const radius = req.query.radius
        ? Number(req.query.radius)
        : 5;

      if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Valid latitude and longitude are required.",
        });
      }

      if (
        !Number.isFinite(radius) ||
        radius <= 0 ||
        radius > 50
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Radius must be between 0 and 50 km.",
        });
      }

      const posts =
        await postService.getNearbyPosts(
          latitude,
          longitude,
          radius
        );

      return res.json({
        success: true,
        data: posts,
      });
    } catch (error) {
      next(error);
    }
  }

    
}

export default new PostController();