import type { Post } from "../types/post";

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "20% OFF School Bags",
    description: "Back to school special offer.",
    image: "/images/bag.jpg",
    category: "Stationery",
    status: "offer",
    status: "published",
    createdAt: "2026-07-30",
  },
  {
    id: "2",
    title: "New Notebooks Available",
    description: "Premium notebooks now in stock.",
    image: "/images/notebook.jpg",
    category: "Stationery",
    status: "product",
    status: "draft",
    createdAt: "2026-07-29",
  },
];