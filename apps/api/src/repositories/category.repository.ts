import prisma from "../config/prisma";

export class CategoryRepository {
    async findAll() {
		return prisma.category.findMany({
			orderBy: {
				name: "asc",
			},
		});
	}
}
