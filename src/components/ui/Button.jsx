import styles from './Button.module.css';

export default function Button({ variant = 'outline', size = 'md', children, icon, ...props }) {
  return (
    <button className={`${styles.btn} ${styles[variant]} ${styles[size]}`} {...props}>
      {children}
      {icon && <span className="material-icons-outlined" style={{ fontSize: size === 'sm' ? 14 : 16 }}>{icon}</span>}
    </button>
  );
}
