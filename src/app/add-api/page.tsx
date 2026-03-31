import { Auth, Pricing } from "@prisma/client";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import styles from "./page.module.css";

function toSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Invalid field: ${key}`);
  }
  return value.trim();
}

export async function addApiItem(formData: FormData) {
  "use server";

  const name = getString(formData, "name");
  const category = getString(formData, "category");
  const tagline = getString(formData, "tagline");
  const description = getString(formData, "description");
  const pricing = getString(formData, "pricing");
  const endpoint = getString(formData, "endpoint");
  const auth = getString(formData, "auth");
  const latency = getString(formData, "latency");
  const uptime = getString(formData, "uptime");
  const version = getString(formData, "version");

  const pricingMap: Record<string, Pricing> = {
    free: Pricing.Free,
    freemium: Pricing.Freemium,
    paid: Pricing.Paid,
  };

  const authMap: Record<string, Auth> = {
    API_KEY: Auth.API_KEY,
    oauth: Auth.OAuth,
    none: Auth.None,
  };

  const parsedPricing = pricingMap[pricing];
  const parsedAuth = authMap[auth];

  if (!parsedPricing) throw new Error("Invalid pricing value");
  if (!parsedAuth) throw new Error("Invalid auth value");

  await prisma.apiItem.create({
    data: {
      id: crypto.randomUUID(),
      name,
      slug: toSlug(name),
      category,
      tagline,
      description,
      pricing: parsedPricing,
      endpoint,
      auth: parsedAuth,
      latency: Math.round(parseFloat(latency)),
      uptime: Math.round(parseFloat(uptime)),
      version,
    },
  });

  redirect("/browse");
}

export default function Home() {
  return (
    <section className={styles.page}>
      <form action={addApiItem} className={styles.form}>
        <h1 className={styles.title}>Add a new API</h1>
        <label htmlFor="name">API Name</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="category">Category</label>
        <input type="text" id="category" name="category" required />

        <label htmlFor="tagline">Tagline</label>
        <input type="text" id="tagline" name="tagline" required />

        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" required></textarea>

        <label htmlFor="pricing">Pricing</label>
        <select name="pricing" id="pricing" required defaultValue={"disabled"}>
          <option value="disabled" disabled>
            Pick an option
          </option>
          <option value="free">Free</option>
          <option value="freemium">Freemium</option>
          <option value="paid">Paid</option>
        </select>

        <label htmlFor="latency">Latency (ms)</label>
        <input type="number" step={0.01} id="latency" name="latency" required />

        <label htmlFor="uptime">Uptime (%)</label>
        <input
          type="number"
          step={0.01}
          max={100}
          id="uptime"
          name="uptime"
          required
        />

        <label htmlFor="auth">Auth</label>
        <select name="auth" id="auth" required defaultValue={"disabled"}>
          <option value="disabled" disabled>
            Pick an option
          </option>
          <option value="API_KEY">API Key</option>
          <option value="oauth">OAuth</option>
          <option value="none">None</option>
        </select>

        <label htmlFor="endpoint">Endpoint</label>
        <input type="url" id="endpoint" name="endpoint" required />

        <label htmlFor="version">Version</label>
        <input type="text" id="version" name="version" required />

        <button type="submit">Add API</button>
      </form>
    </section>
  );
}
