import { Request, Response, NextFunction } from "express";

import { verifyToken } from "../utils/jwt.js";

import AppError from "../utils/AppError.js";

export interface AuthRequest extends Request {
  businessId?: string;
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(
      new AppError("Authentication required.", 401)
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token);

    req.businessId = payload.sub;

    next();
  } catch {
    next(
      new AppError("Invalid or expired token.", 401)
    );
  }
}