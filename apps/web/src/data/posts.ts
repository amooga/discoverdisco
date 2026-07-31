import type { Post } from "../types/post";

export const mockPosts: Post[] = [
  {
    id: "post-1",
    businessId: "business-1",
    title: "20% OFF School Bags",
    description:
      "Get 20% OFF on all premium school bags. Limited period offer. Visit our store today!",
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1200",
    category: "Stationery",

    status: "published",

    createdAt: "2026-07-31T10:30:00.000Z",

    validUntil: "2026-08-10",

    // views: 245,
    // clicks: 42,
    // shares: 8,
  },

  {
    id: "post-2",
    businessId: "business-1",

    title: "Buy 2 Notebooks, Get 1 Free",
    description:
      "School season special. Purchase any two notebooks and get one notebook absolutely free.",

    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200",

    category: "Stationery",

    status: "published",

    createdAt: "2026-07-30T09:00:00.000Z",

    validUntil: "2026-08-15",

    // views: 198,
    // clicks: 31,
    // shares: 4,
  },

  {
    id: "post-3",
    businessId: "business-2",

    title: "Buy 1 Get 1 Coffee",
    description:
      "Enjoy Buy One Get One Free on all regular coffees between 4 PM and 7 PM.",

    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200",

    category: "Restaurant",

    status: "published",

    createdAt: "2026-07-31T07:45:00.000Z",

    validUntil: "2026-08-02",

    // views: 412,
    // clicks: 93,
    // shares: 18,
  },

  {
    id: "post-4",
    businessId: "business-3",

    title: "Flat ₹500 OFF on Hair Spa",
    description:
      "Pamper yourself with our premium hair spa package and save ₹500 this weekend.",

    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1200",

    category: "Salon",

    status: "published",

    createdAt: "2026-07-29T14:15:00.000Z",

    validUntil: "2026-08-05",

    // views: 155,
    // clicks: 28,
    // shares: 6,
  },

  {
    id: "post-5",
    businessId: "business-4",

    title: "Free Blood Pressure Checkup",
    description:
      "Visit our pharmacy and get a free blood pressure check throughout this week.",

    image:
      "https://images.unsplash.com/photo-1580281657527-47a8f6f9f0d3?w=1200",

    category: "Medical",

    status: "published",

    createdAt: "2026-07-28T12:00:00.000Z",

    validUntil: "2026-08-07",

    // views: 302,
    // clicks: 51,
    // shares: 11,
  },

  {
    id: "post-6",
    businessId: "business-5",

    title: "Weekend Grocery Mega Sale",
    description:
      "Up to 40% OFF on selected grocery items. Fresh fruits, vegetables and daily essentials.",

    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200",

    category: "Grocery",

    status: "draft",

    createdAt: "2026-07-31T11:20:00.000Z",

    validUntil: "2026-08-03",

    // views: 0,
    // clicks: 0,
    // shares: 0,
  },
];