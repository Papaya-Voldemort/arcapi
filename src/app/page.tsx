import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.kicker}>Starter template</p>
        <h1 className={styles.title}>Build your next page from here.</h1>
        <p className={styles.description}>
          Replace this scaffold with your own product copy, sections, and data as the app takes shape.
        </p>

        <div className={styles.actions}>
          <Link className={styles.primaryAction} href="/browse">
            Browse APIs
          </Link>
          <a className={styles.secondaryAction} href="/add-api">
            Add API
          </a>
        </div>
      </header>

      <div className={styles.grid} id="template-sections">
        <article className={styles.card}>
          <h2>Step One</h2>
          <p>Upload Your API</p>
        </article>

        <article className={styles.card}>
          <h2>Step Two</h2>
          <p>Browse APIs</p>
        </article>

        <article className={styles.card}>
          <h2>Step Three</h2>
          <p>Try them out here in the browser!</p>
        </article>
      </div>
    </section>
  );
}