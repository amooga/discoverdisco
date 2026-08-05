import prisma from "../config/prisma";

import { CreatePostInput } from "../validators/post.validator";

class PostRepository {
  async create(
    businessId: string,
    data: CreatePostInput
  ) {
    return prisma.post.create({
      data: {
        businessId,
        title: data.title,
        description: data.description,
        category: data.category,
        imageUrl: data.imageUrl,
        validUntil: data.validUntil
          ? new Date(data.validUntil)
          : null,
      },
    });
  }

  async findAll() {
    return prisma.post.findMany({
      include: {
        business: {
          select: {
            id: true,
            name: true,
            locality: true,
            city: true,
            logoUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        business: {
          select: {
            id: true,
            name: true,
            locality: true,
            city: true,
            logoUrl: true,
          },
        },
      },
    });
  }
}

export default new PostRepository();