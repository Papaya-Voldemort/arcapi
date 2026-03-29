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
    .findMany()
    .then((records) => records.map(toCardApi))
    .catch((error) => {
      console.error("Database error in BrowsePage:", error);
      return [];
    });

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>Browse template</p>
        <h1>Browse APIs</h1>
        <p>
          Explore the APIs that have been added to the directory. Click on any
          API card to view more details and try it out directly in your browser.
        </p>
      </header>

      <div className={styles.results}>
        {apis.map((api) => (
          <ApiCard key={api.slug} api={api} />
        ))}
      </div>
    </section>
  );
}
