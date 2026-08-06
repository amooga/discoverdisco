import api from "./api";

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export async function getCategories(): Promise<Category[]> {
  const response = await api.get("/categories");

  return response.data.data;
}