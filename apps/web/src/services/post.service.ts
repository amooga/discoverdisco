import api from "./api";
import type {
  CreatePostInput,
  PostResponse,
} from "../types/api/post";

class PostService {
  async create(data: CreatePostInput) {
    const response = await api.post(
      "/posts",
      data
    );

    return response.data.data as PostResponse;
  }

  async getMine() {
    const response = await api.get(
      "/posts/me"
    );

    return response.data.data as PostResponse[];
  }

  async getAll() {
    const response = await api.get(
      "/posts"
    );

    return response.data.data as PostResponse[];
  }

  async delete(id: string) {
    await api.delete(`/posts/${id}`);
  }

  async getFeed() {
    const response = await api.get("/posts/feed");

    return response.data.data as PostResponse[];
  }
}

export default new PostService();