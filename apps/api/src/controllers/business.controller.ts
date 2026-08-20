import type {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  updateBusinessLocationSchema,
} from "../validators/business.validator.js";
import businessRepository from "../repositories/business.repository.js";
import { AuthRequest } from "../middleware/auth.middleware.js";
import AppError from "../utils/AppError.js";

class BusinessController {
	async updateLocation(
		req: AuthRequest,
		res: Response,
		next: NextFunction
	) {
		try {
			if (!req.businessId) {
				return next(
					new AppError(
						"Authentication required.",
						401
					)
				);
			}

			const {
				latitude,
				longitude,
			} = updateBusinessLocationSchema.parse(
				req.body
			);

			const business =
				await businessRepository.updateLocation(
					req.businessId,
					latitude,
					longitude
				);

			return res.json({
				success: true,
				message: "Business location updated.",
				data: business,
			});
		} catch (error) {
			next(error);
		}
	}
}

export default new BusinessController();
