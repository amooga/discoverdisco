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
        categoryId: data.categoryId,
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

  async findAllActive() {
    return prisma.post.findMany({
      where: {
        status: "ACTIVE",
      },
      include: {
        business: true,
        category: true,
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

	async findByBusinessAndId(
		businessId: string,
		postId: string
	) {
		return prisma.post.findFirst({
			where: {
				id: postId,
				businessId,
			},
		});
	}

  async update(
    id: string,
    data: Partial<CreatePostInput>
	) {
    return prisma.post.update({
        where: {
        id,
        },
        data: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        validUntil: data.validUntil
            ? new Date(data.validUntil)
            : undefined,

        ...(data.categoryId && {
            category: {
            connect: {
                id: data.categoryId,
            },
            },
        }),
        },
        include: {
        business: true,
        category: true,
        },
    });
  } 

	async delete(id: string) {
		return prisma.post.delete({
			where: {
				id,
			},
		});
	}

	async findByBusiness(
		businessId: string
	) {
		return prisma.post.findMany({
			where: {
				businessId,
			},
			include: {
				category: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	}

	async findByBusinessId(businessId: string) {
		return prisma.post.findMany({
      where: {
        businessId,
      },
      include: {
        category: true,
        business: {
          select: {
            id: true,
            name: true,
            locality: true,
            city: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
	}

}

export default new PostRepository();