import { create } from "zustand";
import { mockPosts } from "../data/posts";
import type { Post } from "../types/post";

interface PostStore {
  posts: Post[];
  addPost: (post: Post) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: mockPosts,

  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
    })),
}));