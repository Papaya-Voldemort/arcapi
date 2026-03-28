import styles from "./page.module.css";
import ApiCard from "@/components/ApiCard"
import { prisma } from "@/lib/db"

export const dynamic = 'force-dynamic';

export default async function BrowsePage() {
  const apis = await prisma.apiItem.findMany();
  return (
	<section className={styles.page}>
	  <header className={styles.header}>
		<p className={styles.kicker}>Browse template</p>
		<h1>Browse APIs</h1>
		<p>
		  Explore the APIs that have been added to the directory. Click on any API card to view more details and try it out directly in your browser.
		</p>
	  </header>

	  <div className={styles.results}>
          {apis.map((api) => (
              <ApiCard key={api.id} api={api} />
          ))}
      </div>
	</section>
  );
}

