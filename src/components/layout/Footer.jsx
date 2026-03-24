import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <a href="#">Privacy Notice</a> |
        <a href="#">Cookie Policy</a> |
        <a href="#">Contact Us</a>
      </div>
      <div className={styles.brand}>
        <span>DOW JONES</span>
        &copy; 2025 Dow Jones &amp; Company, Inc. All Rights Reserved.
      </div>
    </footer>
  );
}
