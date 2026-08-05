import postRepository from "../repositories/post.repository";

import { CreatePostInput } from "../validators/post.validator";

class PostService {
  async create(
    businessId: string,
    data: CreatePostInput
  ) {
    return postRepository.create(
      businessId,
      data
    );
  }

  async getAll() {
    return postRepository.findAll();
  }

  async getById(id: string) {
    return postRepository.findById(id);
  }
}

export default new PostService();