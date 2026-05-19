import styles from './TokenSwatch.module.css';

export default function TokenSwatch({ name, value }) {
  return (
    <div className={styles.row}>
      <div className={styles.swatch} style={{ background: value }} />
      <code className={styles.name}>{name}</code>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
