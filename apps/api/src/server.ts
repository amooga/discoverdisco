import "dotenv/config";

import app from "./app.js";

import prisma from "./config/prisma.js";

const PORT = Number(process.env.PORT) || 5000;

async function bootstrap() {
  try {
    await prisma.$connect();

    console.log("✅ Connected to PostgreSQL");

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

bootstrap();