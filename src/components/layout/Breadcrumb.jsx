import { Link } from 'react-router-dom';
import styles from './Breadcrumb.module.css';

export default function Breadcrumb({ items }) {
  return (
    <div className={styles.row}>
      <Link to="/" className={styles.homeLink}>
        <span className="material-icons-outlined" style={{ fontSize: 16 }}>home</span>
      </Link>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className={styles.sep}>/</span>
          {item.to
            ? <Link to={item.to} className={styles.link}>{item.label}</Link>
            : <span className={styles.current}>{item.label}</span>
          }
        </span>
      ))}
    </div>
  );
}
