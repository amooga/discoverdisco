import type { Advertisement } from "../types/advertisement";

export const advertisements: Advertisement[] = [
  {
    id: 1,
    title: "Premium School Bags",
    businessName: "ABC Stationery",
    image: "/images/bag-sale.jpg",
    category: "Stationery",
    location: "Dwarka Sector 10",
    distance: "450 m",
    offer: "20% OFF",
    featured: true,
  },
  {
    id: 2,
    title: "Buy 1 Get 1 Pizza",
    businessName: "Pizza Hub",
    image: "/images/pizza-offer.jpg",
    category: "Food",
    location: "Dwarka Sector 12",
    distance: "700 m",
    offer: "BUY 1 GET 1",
  },
  {
    id: 3,
    title: "Haircut ₹199",
    businessName: "Urban Salon",
    image: "/images/salon-offer.jpg",
    category: "Salon",
    location: "Dwarka Sector 6",
    distance: "1.2 km",
    offer: "₹199",
  },
];