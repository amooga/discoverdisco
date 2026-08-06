import prisma from "../config/prisma";

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