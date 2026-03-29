import Link from "next/link";
import { type ApiItem } from "@prisma/client";
import styles from "./ApiCard.module.css";

type ApiCardProps = {
  api: Pick<ApiItem, "slug" | "name" | "tagline" | "description">;
};

export default function ApiCard({ api }: ApiCardProps) {
  return (
    <Link href={`/browse/${api.slug}`} className={styles.cardLink}>
      <article className={styles.card}>
        <h2>{api.name}</h2>
        <p>{api.tagline}</p>
        <p>{api.description}</p>
      </article>
    </Link>
  );
}
