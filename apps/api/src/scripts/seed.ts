import prisma from "../config/prisma.js";

async function main() {
  const categories = [
    {
      name: "Stationery",
      slug: "stationery",
      icon: "📝",
      color: "#3B82F6",
    },
    {
      name: "Restaurant",
      slug: "restaurant",
      icon: "🍽️",
      color: "#F97316",
    },
    {
      name: "Grocery",
      slug: "grocery",
      icon: "🛒",
      color: "#22C55E",
    },
    {
      name: "Medical",
      slug: "medical",
      icon: "💊",
      color: "#EF4444",
    },
    {
      name: "Salon",
      slug: "salon",
      icon: "💇",
      color: "#EC4899",
    },
    {
      name: "Electronics",
      slug: "electronics",
      icon: "💻",
      color: "#6366F1",
    },
    {
      name: "Clothing",
      slug: "clothing",
      icon: "👕",
      color: "#8B5CF6",
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        slug: category.slug,
      },
      update: {},
      create: category,
    });
  }

  console.log("✅ Categories seeded.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });