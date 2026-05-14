import { RiskLevelIcon } from '../profile/profileAssets';
import styles from './RiskBadge.module.css';

const config = {
  high:   { cls: styles.high,   label: 'High Risk' },
  medium: { cls: styles.medium, label: 'Medium Risk' },
  low:    { cls: styles.low,    label: 'Low Risk' },
};

export default function RiskBadge({ level }) {
  const { cls, label } = config[level] || config.low;
  return (
    <span className={`${styles.badge} ${cls}`}>
      {label}
      <RiskLevelIcon level={level || 'low'} size={16} />
    </span>
  );
}
