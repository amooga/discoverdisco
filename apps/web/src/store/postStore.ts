import { create } from "zustand";
import PostService from "../services/postService";
import type { Post } from "../types/post";

interface PostStore {
  posts: Post[];

  addPost: (
    Post: Post
  ) => void;
}

export const usePostStore =
  create<PostStore>((set) => ({
    posts: PostService.getAll(),
    
    addPost: (Post) => {
        PostService.create(Post);
        set(state => ({
            posts: [
            Post,
            ...state.posts,
            ],
        }));
    }
  }));