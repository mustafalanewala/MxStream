import { db } from "@/db";
import { categories } from "@/db/schema";

const categoryNames = [
  "Cars and Vehicles",
  "Comedy",
  "Cooking",
  "Education",
  "Entertainment",
  "Health",
  "People and Blogs",
  "Gaming",
  "Beauty and Fashion",
  "How-to & DIY",
  "Film and Animation",
  "Music",
  "News and Politics",
  "Pets and Animals",
  "Science and Technology",
  "Sports",
  "Travel",
];

async function main() {
  console.log("Seeding categories...");
  try {
    const values = categoryNames.map((name) => ({
      name,
      description: `Videos related to ${name}`,
    }));
    await db.insert(categories).values(values);
    console.log("Categories seeded successfully");
  }
  catch (error) {
    console.error("Error seeding categories", error);
    process.exit(1);
  }
}

main(); 