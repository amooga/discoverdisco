import express from "express";
import cors from "cors";

import routes from "./routes";
import { errorMiddleware } from "./middleware/error.middleware";
import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes";
import categoryRoutes from "./routes/category.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "DiscoverDisco API is running.",
  });
});

app.use("/api", routes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);
app.use(errorMiddleware);

export default app;