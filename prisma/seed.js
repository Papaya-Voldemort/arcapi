require("dotenv/config");

const { PrismaPg } = require("@prisma/adapter-pg");
const { Auth, PrismaClient, Pricing } = require("@prisma/client");
const pg = require("pg");

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL must be set before seeding");
}

const pool = new pg.Pool({
  connectionString: databaseUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

const starterApis = [
  {
    slug: "pokeapi",
    name: "PokéAPI",
    tagline: "Free Pokemon data with zero auth",
    description:
      "A free, open REST API for Pokémon data. The response is browser-safe and makes an easy live example for the test flow.",
    category: "Games",
    pricing: Pricing.Free,
    latency: 120,
    uptime: 99.9,
    auth: Auth.None,
    endpoint: "https://pokeapi.co/api/v2/pokemon/pikachu",
    version: "v2",
    featured: true,
  },
  {
    slug: "random-user",
    name: "Random User",
    tagline: "Random people data for testing",
    description:
      "A free open-source API that generates random user profiles. It returns JSON and is easy to understand in the browser tester.",
    category: "People",
    pricing: Pricing.Free,
    latency: 90,
    uptime: 99.8,
    auth: Auth.None,
    endpoint: "https://randomuser.me/api/",
    version: "v1.4",
    featured: true,
  },
  {
    slug: "agify",
    name: "Agify",
    tagline: "Predict the age associated with a name",
    description:
      "A lightweight public JSON API that estimates age from a first name. It is easy to test and returns immediately recognizable output.",
    category: "Demographics",
    pricing: Pricing.Free,
    latency: 75,
    uptime: 99.7,
    auth: Auth.None,
    endpoint: "https://api.agify.io/?name=michael",
    version: "v1",
    featured: true,
  },
  {
    slug: "dog-ceo",
    name: "Dog CEO",
    tagline: "Random dog images and breed data",
    description:
      "A simple no-auth API for random dog images and breed information. Useful for proving that the browser test endpoint can handle real public responses.",
    category: "Animals",
    pricing: Pricing.Free,
    latency: 100,
    uptime: 99.9,
    auth: Auth.None,
    endpoint: "https://dog.ceo/api/breeds/image/random",
    version: "v1",
    featured: false,
  },
  {
    slug: "icanhazdadjoke",
    name: "icanhazdadjoke",
    tagline: "Random dad jokes as JSON",
    description:
      "A no-auth API that returns random dad jokes. The /slack endpoint is a reliable JSON response for demonstrating browser-based testing.",
    category: "Entertainment",
    pricing: Pricing.Free,
    latency: 95,
    uptime: 99.8,
    auth: Auth.None,
    endpoint: "https://icanhazdadjoke.com/slack",
    version: "v1",
    featured: false,
  },
];

async function main() {
  for (const api of starterApis) {
    await prisma.apiItem.upsert({
      where: { slug: api.slug },
      update: {
        name: api.name,
        tagline: api.tagline,
        description: api.description,
        category: api.category,
        pricing: api.pricing,
        latency: api.latency,
        uptime: api.uptime,
        auth: api.auth,
        endpoint: api.endpoint,
        version: api.version,
        featured: api.featured,
      },
      create: api,
    });
  }
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
