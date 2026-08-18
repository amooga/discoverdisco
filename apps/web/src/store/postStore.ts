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
  nearbyPosts: PostResponse[];
  feed: PostResponse[];
  
  loading: boolean;
  nearbyLoading: boolean;
  
  error: string | null;
  nearbyError: string | null;

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

  clearNearbyPosts: () => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  nearbyPosts: [],
  feed: [],
  loading: false,
  nearbyLoading: false,

  error: null,
  nearbyError: null,


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
    try {
      const post = await postService.create(data);

      set((state) => ({
        posts: [post, ...state.posts],
      }));
    } catch (error) {
      console.error(
        "Failed to create advertisement:",
        error
      );

      throw error;
    }
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
    set({
      nearbyLoading: true,
      nearbyError: null,
    });

    try {
      const posts = await postService.getNearby(
        latitude,
        longitude,
        radiusKm
      );

      set({
        nearbyPosts: posts,
        nearbyLoading: false,
      });
    } catch (error) {
      console.error(
        "Failed to load nearby posts:",
        error
      );

      set({
        nearbyLoading: false,
        nearbyError:
          "Failed to load nearby advertisements.",
      });
    }
  },

  
  clearNearbyPosts: () => {
    set({ 
      nearbyPosts: [],
      nearbyError: null,
    });
  }

}));