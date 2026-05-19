import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.brandName}>DOW JONES</span>
        <span className={styles.brandDivider} aria-hidden="true" />
        <span className={styles.brandProduct}>RISKCENTER &nbsp;|&nbsp; THIRD PARTY</span>
      </div>
      <div className={styles.actions}>
        <Link to="/component-catalog" className={styles.actionLink}>Component Catalog</Link>
        <button className={styles.actionLink}>Customer Support</button>
        <button className={styles.actionLink}>Feedback</button>
        <button className={styles.iconBtn} aria-label="Notifications">
          <span className="material-icons-outlined">notifications</span>
        </button>
        <button className={styles.iconBtn} aria-label="Settings">
          <span className="material-icons-outlined">settings</span>
        </button>
      </div>
    </header>
  );
}
