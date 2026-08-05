import prisma from "../config/prisma";

import { RegisterInput } from "../validators/auth.validator";

const businessSelect = {
  id: true,
  name: true,
  ownerName: true,
  email: true,
  phone: true,
  address: true,
  locality: true,
  city: true,
  state: true,
  pincode: true,
  verified: true,
  logoUrl: true,
  coverImage: true,
  createdAt: true,
  updatedAt: true,
};

export class BusinessRepository {
  async findByEmail(email: string) {
		return prisma.business.findUnique({
			where: {
				email,
			},
			select: {
				...businessSelect
			},
		});
	}

  async create(
    data: RegisterInput,
    passwordHash: string
  ) {
    return prisma.business.create({
        data: {
            name: data.name,
            ownerName: data.ownerName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            locality: data.locality,
            city: data.city,
            state: data.state,
            pincode: data.pincode,
            passwordHash,
        },
    });
  }
 
  async findById(id: string) {
    return prisma.business.findUnique({
        where: {
            id
        }
    });
  }

  async findByEmailWithPassword(email: string) {
    return prisma.business.findUnique({
        where: {
        	email,
        },
        select: {
					...businessSelect,
					passwordHash: true
        },
    });
  }
}

export default new BusinessRepository();
				