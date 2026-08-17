import prisma from "../config/prisma.js";

import { CreatePostInput } from "../validators/post.validator.js";

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

  // Haversine formula
  async findNearby(
    latitude: number,
    longitude: number,
    radiusKm: number = 5
  ) {
    const posts = await prisma.post.findMany({
      where: {
        status: "ACTIVE",
        business: {
          latitude: {
            not: null,
          },
          longitude: {
            not: null,
          },
        },
      },
      include: {
        category: true,
        business: {
          select: {
            id: true,
            name: true,
            address: true,
            locality: true,
            city: true,
            latitude: true,
            longitude: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const earthRadiusKm = 6371;

    return posts
      .map((post) => {
        const businessLat = post.business.latitude!;
        const businessLng = post.business.longitude!;

        const latDifference =
          ((businessLat - latitude) * Math.PI) / 180;

        const lngDifference =
          ((businessLng - longitude) * Math.PI) / 180;

        const a =
          Math.sin(latDifference / 2) ** 2 +
          Math.cos((latitude * Math.PI) / 180) *
            Math.cos((businessLat * Math.PI) / 180) *
            Math.sin(lngDifference / 2) ** 2;

        const c =
          2 * Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
          );

        const distance = earthRadiusKm * c;

        return {
          ...post,
          distanceKm: Number(distance.toFixed(2)),
        };
      })
      .filter(
        (post) => post.distanceKm <= radiusKm
      )
      .sort(
        (a, b) => a.distanceKm - b.distanceKm
      );
  }

}

export default new PostRepository();