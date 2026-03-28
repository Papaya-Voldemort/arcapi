import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const connectionString = `${process.env.DATABASE_URL}`
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const newItem = await prisma.apiItem.create({
    data: {
      slug: 'test-api-' + Math.random().toString(36).substring(7),
      name: 'Test API',
      tagline: 'A test API item',
      description: 'This is a test API item created via script.',
      category: 'Testing',
      pricing: 'Free',
      latency: 100,
      uptime: 99.9,
      auth: 'None',
      endpoint: 'https://api.example.com',
      version: '1.0.0',
    },
  })
  console.log('Created new API item:', newItem.id)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

