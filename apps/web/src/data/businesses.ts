import type { Business } from "../types/business";

export const mockBusinesses: Business[] = [
  {
    id: "business-1",
    name: "ABC Stationery",
    category: "Stationery",
    ownerName: "Ajay",
    phone: "9876543210",
    address: "Sector 10",
    locality: "Dwarka",
    city: "New Delhi",
    verified: true,
    createdAt: new Date().toISOString(),
  },
];