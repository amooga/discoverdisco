import api from "./api";

export interface LoginRequest {
  email: string;
  password: string;
}

export async function login(data: LoginRequest) {
  const response = await api.post("/auth/login", data);

  return response.data.data;
}

export async function register(data: any) {
  const response = await api.post("/auth/register", data);

  return response.data.data;
}