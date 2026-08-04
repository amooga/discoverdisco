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

export interface Post {
  id: string;
  businessId: string;
  title: string;
  description: string;
  image: string;
  categoryId: string;
  status: PostStatus;
  createdAt: string;
  validUntil?: string;
}