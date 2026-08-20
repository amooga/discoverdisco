import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

class UploadController {
  async upload(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Image is required.",
        });
      }

      const result = await new Promise<any>(
        (resolve, reject) => {
          const stream =
            cloudinary.uploader.upload_stream(
              {
                folder: "discoverdisco",
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );

          if(req.file) streamifier.createReadStream(req.file.buffer).pipe(stream);
        }
      );

      res.json({
        success: true,
        data: {
          url: result.secure_url,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UploadController();