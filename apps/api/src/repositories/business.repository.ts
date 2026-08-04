import prisma from "../config/prisma";

import { RegisterInput } from "../validators/auth.validator";

export class BusinessRepository {
  async findByEmail(email: string) {
    return prisma.business.findUnique({
      where: {
        email,
      },
    });
  }

  async create(
    data: RegisterInput,
    passwordHash: string
  ) {
    return prisma.business.create({
      data: {
        ...data,
        passwordHash,
      },
    });
  }
}

export default new BusinessRepository();