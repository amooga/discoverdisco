import prisma from "../config/prisma.js";

class CategoryRepository {
  async findAll() {
    return prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }
}

export default new CategoryRepository();