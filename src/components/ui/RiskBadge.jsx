import styles from './RiskBadge.module.css';

const config = {
  high:   { cls: styles.high,   icon: 'error',               label: 'High Risk' },
  medium: { cls: styles.medium, icon: 'error_outline',       label: 'Medium Risk' },
  low:    { cls: styles.low,    icon: 'check_circle_outline', label: 'Low Risk' },
};

export default function RiskBadge({ level }) {
  const { cls, icon, label } = config[level] || config.low;
  return (
    <span className={`${styles.badge} ${cls}`}>
      {label}
      <span className="material-icons-outlined" style={{ fontSize: 16 }}>{icon}</span>
    </span>
  );
}
