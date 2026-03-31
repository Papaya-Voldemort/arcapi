# ArcAPI

ArcAPI is a small Next.js + Prisma app for cataloging APIs in one place, browsing their metadata, and testing their public endpoints from the browser.

The project currently has three main user-facing parts:

1. A landing page at `/` that points you into the app.
2. A browse flow at `/browse` and `/browse/[slug]` that lists API records from PostgreSQL.
3. An add form at `/add-api` that creates new API records in the database.

If you were confused about what this project is, the short version is:

- It is not an API itself.
- It is a directory for APIs.
- It stores API metadata in PostgreSQL through Prisma.
- It can call an API endpoint from the browser and display the JSON response.

## What You Can Do

- Browse the APIs already stored in the database.
- Open a single API record to view its details.
- Click a button to test the API endpoint directly in the browser.
- Add new API records through a form instead of editing the database manually.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Prisma 7
- PostgreSQL
- Biome for formatting and linting

## Prerequisites

Before you run the app, make sure you have:

- Node.js installed
- npm installed
- A reachable PostgreSQL database
- A valid `DATABASE_URL`

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with your database connection string:

   ```env
   DATABASE_URL="postgresql://user:password@host:5432/database"
   ```

3. Push the Prisma schema to the database:

   ```bash
   npx prisma db push
   ```

4. Seed the database with real public APIs:

   ```bash
   npm run db:seed
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the app:

   ```text
   http://localhost:3000
   ```

## How To Use The App

### Home

The homepage is a simple starting point with links to the two main flows:

- `Browse APIs`
- `Add API`

It also highlights a few seeded public APIs so you can open a live record right
away.

The starter dataset includes:

- PokéAPI
- Random User
- Agify
- Dog CEO
- icanhazdadjoke

### Browse APIs

Go to `/browse` to see every API stored in the database.

Each card shows:

- Name
- Tagline
- Short description

Click a card to open `/browse/[slug]`, where you can see the full record.

The seeded records are real public APIs with no authentication required. They
are there to demonstrate the end-to-end workflow on a fresh install.

### API Details Page

The detail page shows the fields saved for each API:

- Category
- Pricing
- Latency
- Uptime
- Auth type
- Endpoint URL
- Version

This page also includes a `Test Now!` button.

That button:

- Sends a `fetch()` request to the stored endpoint
- Expects a JSON response
- Renders the returned JSON in the page

If the endpoint does not return JSON, the test output will show an error.

### Add API

Go to `/add-api` to create a new API entry.

The form collects these fields:

- `API Name`
- `Category`
- `Tagline`
- `Description`
- `Pricing`
- `Latency (ms)`
- `Uptime (%)`
- `Auth`
- `Endpoint`
- `Version`

When the form is submitted, the app:

- Converts the API name into a slug
- Saves the record to PostgreSQL through Prisma
- Redirects you back to `/browse`

#### Allowed Pricing Values

- Free
- Freemium
- Paid

#### Allowed Auth Values

- `API_KEY` for API Key
- `oauth` for OAuth
- `none` for None

Latency and uptime accept numeric input, but the current form stores them as whole numbers after rounding.

## Data Model

The database stores records in the `ApiItem` table.

Important fields:

- `slug`: used for the detail page URL
- `name`: display name
- `tagline`: short summary shown on browse cards
- `description`: longer description
- `category`: grouping label
- `pricing`: enum value
- `latency`: numeric latency value
- `uptime`: numeric uptime value
- `auth`: enum value
- `endpoint`: public API endpoint to test
- `version`: version label
- `featured`: optional boolean flag

## Project Structure

- `src/app`: App Router pages
- `src/app/browse`: browse list and detail pages
- `src/app/add-api`: API submission form
- `src/components`: shared UI pieces like cards, navigation, footer, and tester
- `src/lib`: shared utilities and the Prisma client
- `prisma`: schema and migrations

## Scripts

- `npm run dev`: start the development server
- `npm run build`: build for production
- `npm run start`: start the production server
- `npm run lint`: run Biome checks
- `npm run format`: format the codebase with Biome

## Implementation Notes

- `npm install` runs `prisma generate` automatically through the `postinstall` script.
- The browse pages are marked dynamic so they always read the latest database records.
- The app uses a PostgreSQL adapter with Prisma in `src/lib/db.ts`.
- The current homepage is intentionally lightweight and acts as a navigation entry point.

## Troubleshooting

### No APIs show up on `/browse`

- Confirm `DATABASE_URL` is set correctly.
- Confirm `npx prisma db push` completed successfully.
- Add at least one API through `/add-api` or insert a row directly in PostgreSQL.

### The test button fails

- Make sure the stored endpoint is reachable from your browser.
- Make sure the endpoint returns JSON.
- Check that the URL begins with `http://` or `https://`.

### Prisma errors on startup

- Confirm the database exists.
- Confirm the database user has permission to create and read tables.
- Re-run `npx prisma db push` after any schema change.

## Example Workflow

1. Start the app.
2. Open `/add-api`.
3. Enter a real API name, description, endpoint, and metadata.
4. Submit the form.
5. Open `/browse`.
6. Click the new card.
7. Use `Test Now!` to verify the endpoint response.
