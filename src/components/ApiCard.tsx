import styles from "./ApiCard.module.css";
import { type ApiItem } from "@prisma/client";
import Link from "next/link";

type ApiCardProps = {
    api: ApiItem;
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