import businessRepository from "../repositories/business.repository";

import { RegisterInput, LoginInput } from "../validators/auth.validator";

import { comparePassword, hashPassword } from "../utils/password";
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

  async login(data: LoginInput) {
    const business = await businessRepository.findByEmail(data.email);

    if (!business) {
        throw new Error("Invalid email or password.");
    }

    const isValid = await comparePassword(
        data.password,
        business.passwordHash
    );

    if (!isValid) {
        throw new Error("Invalid email or password.");
    }

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