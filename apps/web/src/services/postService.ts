import { mockPosts } from "../data/posts";
import type { Post } from "../types/post";

class PostService {
  private Posts = [...mockPosts];

  getAll(): Post[] {
    return this.Posts;
  }

  getById(id: string): Post | undefined {
    return this.Posts.find(ad => ad.id === id);
  }

  create(Post: Post) {
    this.Posts.unshift(Post);
    return Post;
  }

  update(id: string, updated: Partial<Post>) {
    const index = this.Posts.findIndex(ad => ad.id === id);

    if (index === -1) return null;

    this.Posts[index] = {
      ...this.Posts[index],
      ...updated,
    };

    return this.Posts[index];
  }

  delete(id: string) {
    this.Posts = this.Posts.filter(
      ad => ad.id !== id
    );
  }
}

const API_URL = "http://localhost:5000/api";

export async function getPosts() {
  const response = await fetch(`${API_URL}/posts`);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

export default new PostService();