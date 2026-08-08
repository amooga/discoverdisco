import express from "express";
import cors from "cors";
import {
  apiLimiter,
  authLimiter,
} from "./middleware/rateLimit.middleware";

import routes from "./routes";
import { errorMiddleware } from "./middleware/error.middleware";
import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes";
import categoryRoutes from "./routes/category.routes";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import uploadRoutes from "./routes/upload.routes";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

app.use(
    morgan(process.env.NODE_ENV === "production"
        ? "combined"
        : "dev")
);

app.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "DiscoverDisco API is running.",
  });
});
app.use(apiLimiter);

app.use("/api/posts", postRoutes);
app.use("/api/v1", routes);
app.use("/api/auth", authLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/uploads", uploadRoutes);
app.use(errorMiddleware);

export default app;
