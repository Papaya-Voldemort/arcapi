import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>ArcAPI</h1>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/browse">Browse</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
