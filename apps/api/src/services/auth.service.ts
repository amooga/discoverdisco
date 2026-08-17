import businessRepository from "../repositories/business.repository.js";

import {
  RegisterInput,
  LoginInput,
} from "../validators/auth.validator.js";

import {
  hashPassword,
  comparePassword,
} from "../utils/password.js";

import { generateToken } from "../utils/jwt.js";

import AppError from "../utils/AppError.js";

class AuthService {
  async register(data: RegisterInput) {
    const existing = await businessRepository.findByEmail(data.email);

    if (existing) {
      throw new AppError(
        "Email already registered.",
        409
      );
    }

    const passwordHash = await hashPassword(data.password);

    const business = await businessRepository.create(
      data,
      passwordHash
    );

    const { passwordHash: _, ...safeBusiness } = business;


    const token = generateToken({
      sub: business.id
    });

    return {
      token,
      business: safeBusiness,
    };
  }

  async login(data: LoginInput) {
    const business = await businessRepository.findByEmailWithPassword(
      data.email
    );

    if (!business) {
      throw new AppError(
        "Invalid email or password.",
        401
      );
    }

    const isValid = await comparePassword(
      data.password,
      business.passwordHash
    );

    if (!isValid) {
      throw new AppError(
        "Invalid email or password.",
        401
      );
    }

    const { passwordHash: _, ...safeBusiness } = business;

    const token = generateToken({
      sub: business.id
    });

    return {
      token,
      business: safeBusiness,
    };
  }
}

export default new AuthService();