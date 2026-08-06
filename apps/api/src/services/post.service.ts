import postRepository from "../repositories/post.repository";
import AppError from "../utils/AppError";

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

  async update(
    businessId: string,
    postId: string,
    data: Partial<CreatePostInput>
  ) {
    const post = await postRepository.findByBusinessAndId( businessId, postId );

    if (!post) {
        throw new AppError(
					"Advertisement not found.",
					404
        );
    }

    return postRepository.update(
        postId,
        data
    );
  }

	async delete(
		businessId: string,
		postId: string
	) {
		const post =
			await postRepository.findByBusinessAndId(
				businessId,
				postId
			);

		if (!post) {
			throw new AppError(
				"Advertisement not found.",
				404
			);
		}

		await postRepository.delete(postId);
	}

	async getMyPosts(
		businessId: string
	) {
		return postRepository.findByBusinessId(
			businessId
		);
	}

}

export default new PostService();