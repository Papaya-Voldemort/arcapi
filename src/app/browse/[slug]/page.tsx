import Link from "next/link";
import TestAPI from "@/components/TestAPI";
import { prisma } from "@/lib/db";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

type ApiSource = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  pricing: string;
  latency: string | number;
  uptime: string | number;
  auth: string;
  endpoint: string;
  version: string;
};

type ApiDetails = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  pricing: string;
  latency: string;
  uptime: string;
  auth: string;
  endpoint: string;
  version: string;
};

function toDisplayApi(api: ApiSource): ApiDetails {
  return {
    slug: api.slug,
    name: api.name,
    tagline: api.tagline,
    description: api.description,
    category: api.category,
    pricing: api.pricing,
    latency: `${api.latency}`,
    uptime: `${api.uptime}`,
    auth: api.auth,
    endpoint: api.endpoint,
    version: api.version,
  };
}

export default async function BrowseItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let apiRecord: ApiSource | null = null;

  try {
    apiRecord = await prisma.apiItem.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error("Database error in BrowseItemPage:", error);
    apiRecord = null;
  }

  const api = apiRecord ? toDisplayApi(apiRecord) : null;

  if (!api) {
    return (
      <section className={styles.page}>
        <header className={styles.header}>
          <Link className={styles.backLink} href="/browse">
            ← Back to browse
          </Link>
          <p className={styles.kicker}>Not found</p>
          <h1>API not found</h1>
          <p>
            The API you’re looking for doesn’t exist. Please check the URL or
            return to the browse page.
          </p>
        </header>
      </section>
    );
  }
  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.backLink} href="/browse">
          ← Back to browse
        </Link>
        <p className={styles.kicker}>{api.category}</p>
        <h1>{api.name}</h1>
        <p>{api.tagline}</p>
      </header>

      <div className={styles.details}>
        <p>{api.description}</p>
        <ul>
          <li>
            <strong>Pricing:</strong> {api.pricing}
          </li>
          <li>
            <strong>Latency:</strong> {api.latency}
          </li>
          <li>
            <strong>Uptime:</strong> {api.uptime}
          </li>
          <li>
            <strong>Auth:</strong> {api.auth}
          </li>
          <li>
            <strong>Endpoint:</strong>{" "}
            <a href={api.endpoint} rel="noreferrer" target="_blank">
              {api.endpoint}
            </a>
          </li>
          <li>
            <strong>Version:</strong> {api.version}
          </li>
        </ul>
      </div>
      <TestAPI endpoint={api.endpoint} />
    </section>
  );
}
