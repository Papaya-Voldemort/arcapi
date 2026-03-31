import styles from "./Footer.module.css";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>{year}&copy; ArcAPI</p>
    </footer>
  );
}
