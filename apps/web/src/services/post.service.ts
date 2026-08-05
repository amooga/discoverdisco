import api from "./api";

export async function getPosts() {
  const response = await api.get("/posts");

  return response.data.data;
}

export async function createPost(data: any) {
  const response = await api.post("/posts", data);

  return response.data.data;
}

export async function getMyPosts() {
  const response = await api.get("/posts/me");

  return response.data.data;
}

export async function getPost(id: string) {
  const response = await api.get(`/posts/${id}`);

  return response.data.data;
}