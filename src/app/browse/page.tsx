import ApiCard from "@/components/ApiCard";
import { prisma } from "@/lib/db";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

function toCardApi(api: {
  slug: string;
  name: string;
  tagline: string;
  description: string;
}) {
  return {
    slug: api.slug,
    name: api.name,
    tagline: api.tagline,
    description: api.description,
  };
}

export default async function BrowsePage() {
  const apis = await prisma.apiItem
    .findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "asc" }],
    })
    .then((records) => records.map(toCardApi))
    .catch((error) => {
      console.error("Database error in BrowsePage:", error);
      return [];
    });

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>Public API directory</p>
        <h1>Browse APIs</h1>
        <p>
          Explore the APIs stored in the directory. Click any API card to view
          the details and test the endpoint directly in your browser.
        </p>
      </header>

      {apis.length > 0 ? (
        <div className={styles.results}>
          {apis.map((api) => (
            <ApiCard key={api.slug} api={api} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>No APIs are stored yet.</p>
          <p>Seed the database or add a new API to populate this directory.</p>
        </div>
      )}
    </section>
  );
}
