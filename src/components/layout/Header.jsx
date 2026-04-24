import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <img src="/assets/logo-d.svg" alt="Dow Jones" className={styles.brandLogo} />
        <span className={styles.brandName}>DOW JONES</span>
        <span className={styles.brandSep} aria-hidden="true">|</span>
        <span className={styles.brandProduct}>RISKCENTER</span>
      </div>
      <div className={styles.actions}>
        {['Customer Support', 'Feedback'].map(label => (
          <button key={label} className={styles.actionLink}>{label}</button>
        ))}
        <button className={styles.iconBtn} aria-label="Notifications">
          <span className="material-icons-outlined">notifications</span>
        </button>
        <button className={styles.iconBtn} aria-label="Help">
          <span className="material-icons-outlined">help_outline</span>
        </button>
        <button className={styles.iconBtn} aria-label="Settings">
          <span className="material-icons-outlined">settings</span>
        </button>
        <div className={styles.avatar} aria-label="User menu">CM</div>
      </div>
    </header>
  );
}
