import businessRepository from "../repositories/business.repository";

import { RegisterInput } from "../validators/auth.validator";

import { hashPassword } from "../utils/password";
import { generateToken } from "../utils/jwt";

export class AuthService {
  async register(data: RegisterInput) {
    const existing = await businessRepository.findByEmail(data.email);

    if (existing) {
      throw new Error("Email already registered.");
    }

    const passwordHash = await hashPassword(data.password);

    const business = await businessRepository.create(
      data,
      passwordHash
    );

    const token = generateToken({
      businessId: business.id,
      email: business.email,
    });

    return {
      token,
      business,
    };
  }
}

export default new AuthService();