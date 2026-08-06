export type PostStatus = "published" | "draft" | "expired";

export type PostType =
  | "offer"
  | "product"
  | "service"
  | "event"
  | "announcement";

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  color?: string;
}

export interface PostResponse {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  status: string;
  createdAt: string;
  validUntil?: string;
  views: number;
  clicks: number;
  shares: number;
  category: {
      id: string;
      name: string;
      slug: string;
  };
  business: {
    id: string;
    name: string;
    locality: string;
    city: string;
  };
}

export interface CreatePostInput {
  title: string;
  description: string;
  categoryId: string;
  imageUrl?: string;
  validUntil?: string;
}

export interface UpdatePostInput {
  title: string;
  description: string;
  categoryId: string;
  imageUrl?: string;
  validUntil?: string;
}