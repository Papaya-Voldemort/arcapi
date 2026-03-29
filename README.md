# ArcAPI

ArcAPI is a modern directory and testing platform for APIs. It allows developers to discover, compare, and interactively test various APIs across different categories.

## Features

- **Comprehensive API Directory**: Browse APIs categorized by function (Weather, Auth, Payments, etc.).
- **Live Performance Metrics**: View latency and uptime statistics for each API.
- **Interactive Playground**: Test API endpoints directly from the browser using the built-in testing interface.
- **Detailed API Profiles**: Deep dive into API capabilities, pricing models (Free, Freemium, Paid), and authentication methods (API Key, OAuth, None).
- **Easy Submission**: Add new APIs to the directory via a simple submission flow.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Styling**: CSS Modules
- **Linting/Formatting**: [Biome](https://biomejs.dev/)

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Papaya-Voldemort/arcapi.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up your environment**:
   Create a `.env` file with your `DATABASE_URL`.

4. **Initialize the database**:
   ```bash
   npx prisma db push
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: Next.js pages and routing.
- `src/components`: Reusable UI components (Navbar, Footer, ApiCard, TestAPI).
- `src/lib`: Shared utilities, database client, and mock data.
- `prisma`: Database schema and configuration.

## Scripts

- `npm run dev`: Start development server.
- `npm run build`: Build for production.
- `npm run start`: Start production server.
- `npm run lint`: Run Biome check.
- `npm run format`: Format code with Biome.
