import Link from "next/link";
import ApiCard from "@/components/ApiCard";
import { prisma } from "@/lib/db";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredApis = await prisma.apiItem
    .findMany({
      where: { featured: true },
      orderBy: { createdAt: "asc" },
      take: 3,
      select: {
        slug: true,
        name: true,
        tagline: true,
        description: true,
      },
    })
    .catch((error) => {
      console.error("Database error in Home:", error);
      return [];
    });

  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.kicker}>Public API directory</p>
        <h1 className={styles.title}>
          Browse real APIs and test them instantly.
        </h1>
        <p className={styles.description}>
          ArcAPI is a directory for API discovery, comparison, and quick browser
          testing. The seeded entries are real, free, no-auth APIs so you can
          see the workflow end to end without setting up credentials first.
        </p>

        <div className={styles.actions}>
          <Link className={styles.primaryAction} href="/browse">
            Browse APIs
          </Link>
          <Link className={styles.secondaryAction} href="/add-api">
            Add API
          </Link>
        </div>
      </header>

      <section
        className={styles.featuredSection}
        aria-labelledby="featured-apis"
      >
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Starter data</p>
          <h2 id="featured-apis">Featured public APIs</h2>
          <p>
            These records point to live endpoints you can open in the browser
            and test right away.
          </p>
        </div>

        {featuredApis.length > 0 ? (
          <div className={styles.grid}>
            {featuredApis.map((api) => (
              <ApiCard key={api.slug} api={api} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>No featured APIs are seeded yet.</p>
            <p>
              Run the Prisma seed command, then come back here to see the live
              examples.
            </p>
          </div>
        )}
      </section>
    </section>
  );
}
