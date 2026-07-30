export type PostStatus = "published" | "draft" | "expired";

export type PostType =
  | "offer"
  | "product"
  | "service"
  | "event"
  | "announcement";

export interface Post {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  type: PostType;
  status: PostStatus;
  createdAt: string;
  validUntil?: string;
}