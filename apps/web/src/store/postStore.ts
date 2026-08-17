import { create } from "zustand";
import type { PostResponse } from "../types/api/post";;
import postService from "../services/post.service";

interface CreatePostInput {
  title: string;
  description: string;
  categoryId: string;
  imageUrl?: string;
  validUntil?: string;
}

interface PostStore {
  posts: PostResponse[];
  feed: PostResponse[];
  loading: boolean;
  error: string | null;

  loadPosts: () => Promise<void>;
  loadFeed: () => Promise<void>;
  
  addPost: (
    data: CreatePostInput
  ) => Promise<void>;

  deletePost: (
    id: string
  ) => Promise<void>;

  loadPublicPosts: () => Promise<void>;

  loadNearbyPosts: (
    latitude: number,
    longitude: number,
    radiusKm?: number
  ) => Promise<void>;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  feed: [],
  loading: false,
  error: null,

  loadPosts: async () => {
    set({ loading: true });

    try {
      const posts = await postService.getMine();

      set({
        posts,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      });

      throw error;
    }
  },

  loadFeed: async () => {
    const posts = await postService.getFeed();

    set({
      feed: posts,
    });
  },

  addPost: async (data) => {
    const post = await postService.create(data);

    set((state) => ({
      posts: [post, ...state.posts],
    }));
  },

  deletePost: async (id) => {
    await postService.delete(id);

    set((state) => ({
      posts: state.posts.filter(
        (p) => p.id !== id
      ),
    }));
  },

  loadPublicPosts: async () => {
    set({ loading: true });

    try {
      const posts = await postService.getAll();

      set({
        posts,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to load posts.",
      });

      throw error;
    }
  },

  loadNearbyPosts: async (
    latitude,
    longitude,
    radiusKm = 5
  ) => {
    set({ loading: true });

    try {
      const posts = await postService.getNearby(
        latitude,
        longitude,
        radiusKm
      );

      set({
        posts,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  }

}));