import prisma from "../src/config/prisma";

async function main() {
  await prisma.category.createMany({
    skipDuplicates: true,
    data: [
      {
        name: "Restaurant",
        slug: "restaurant",
    },
      {
        name: "Cafe",
        slug: "cafe",
    },
      {
        name: "Stationery",
        slug: "stationery",
    },
      {
        name: "Fashion",
        slug: "fashion",
    },
      {
        name: "Electronics",
        slug: "electronics",
    },
      {
        name: "Medical",
        slug: "medical",
    },
      {
        name: "Salon",
        slug: "salon",
    },
      {
        name: "Gym",
        slug: "gym",
    }
    ]
  });

  console.log("Categories Seeded");
}

main();