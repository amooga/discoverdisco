import type {
  Request,
  Response,
  NextFunction,
} from "express";

import locationService from "../services/location.service.js";

class LocationController {
  async search(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const query = String(
        req.query.q ?? ""
      ).trim();

      if (!query) {
        return res.status(400).json({
          success: false,
          message: "Search query is required.",
        });
      }

      if (query.length < 3) {
        return res.status(400).json({
          success: false,
          message:
            "Search query must contain at least 3 characters.",
        });
      }

      const results =
        await locationService.search(query);

      return res.json({
        success: true,
        data: results,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new LocationController();