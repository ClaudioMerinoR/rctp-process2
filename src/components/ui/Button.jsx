import styles from './Button.module.css';

export default function Button({ variant = 'outline', children, icon, ...props }) {
  return (
    <button className={`${styles.btn} ${styles[variant]}`} {...props}>
      {children}
      {icon && <span className="material-icons-outlined" style={{ fontSize: 16 }}>{icon}</span>}
    </button>
  );
}
