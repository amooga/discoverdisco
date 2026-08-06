import api from "./api";

export interface LoginRequest {
  email: string;
  password: string;
}

class AuthService {
  async register(data: RegisterRequest) {
    const response = await api.post("/auth/register", data);

    return response.data.data;
  }

  async login(data: LoginRequest) {
    const response = await api.post("/auth/login", data);

    return response.data.data;
  }
}

export default new AuthService();