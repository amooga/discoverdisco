import api from "./api";
import type {
  CreatePostInput,
  Post,
} from "../types/api/post";

class PostService {
  async create(data: CreatePostInput) {
    const response = await api.post(
      "/posts",
      data
    );

    return response.data.data as Post;
  }

  async getMine() {
    const response = await api.get(
      "/posts/me"
    );

    return response.data.data as Post[];
  }

  async getAll() {
    const response = await api.get(
      "/posts"
    );

    return response.data.data as Post[];
  }

  async delete(id: string) {
    await api.delete(`/posts/${id}`);
  }
}

export default new PostService();