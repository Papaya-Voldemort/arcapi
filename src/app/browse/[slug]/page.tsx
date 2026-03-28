import Link from "next/link";
import styles from "./page.module.css";
import { prisma } from "@/lib/db";
import TestAPI from "@/components/TestAPI";


export default async function BrowseItemPage({
												 params,
											 }: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const api = await prisma.apiItem.findUnique({
        where: { slug }
    });
	console.log("api:", api);

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
						The API you’re looking for doesn’t exist. Please check the URL or return to the browse page.
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
					<li><strong>Pricing:</strong> {api.pricing}</li>
					<li><strong>Latency:</strong> {api.latency}</li>
					<li><strong>Uptime:</strong> {api.uptime}</li>
					<li><strong>Auth:</strong> {api.auth}</li>
					<li><strong>Endpoint:</strong> <a href={api.endpoint} target="_blank">{api.endpoint}</a></li>
					<li><strong>Version:</strong> {api.version}</li>
				</ul>
			</div>
			<TestAPI endpoint={api.endpoint} />
		</section>
	);
}

