import type { Advertisement } from "../types/advertisement";

export const mockAdvertisements: Advertisement[] = [
  {
    id: "ad-1",
    businessId: "business-1",
    title: "20% OFF School Bags",
    description: "Premium school bags at discounted prices.",
    image: "",
    category: "Stationery",
    status: "published",
    createdAt: new Date().toISOString(),
    validUntil: "2026-08-15",
    views: 120,
    clicks: 18,
    shares: 4,
  },
];