import partnerIconIntegrity from '../../assets/partner-icon-integrity.png';
import partnerIconUbo from '../../assets/partner-icon-ubo.png';
import iconFlag from '../../assets/icon-flag.svg';
import iconInactiveOrder from '../../assets/icon-inactive-order.svg';
import iconFactCheck from '../../assets/icon-fact-check.svg';
import iconFinanceMode from '../../assets/icon-finance-mode.svg';
import iconFrame9 from '../../assets/icon-frame9.svg';
import iconArmingCountdown from '../../assets/icon-arming-countdown.svg';
import iconRiskHigh from '../../assets/icon-risk-high.svg';
import styles from './profile.module.css';

export const TASK_ICONS = { iconFlag, iconInactiveOrder, iconFactCheck, iconFinanceMode, iconFrame9, iconArmingCountdown };
export const PARTNER_ICONS = { integrity: partnerIconIntegrity, ubo: partnerIconUbo };
export { iconRiskHigh };

export function RiskLevelIcon({ level, size = 16 }) {
  if (level === 'high') {
    return <img src={iconRiskHigh} alt="" style={{ width: size, height: size, display: 'inline-block', verticalAlign: 'middle', color: 'inherit' }} />;
  }
  const icon = level === 'medium' ? 'error_outline' : 'check_circle_outline';
  return <span className="material-icons-outlined" style={{ fontSize: size }}>{icon}</span>;
}

export function riskBadge(level) {
  if (level === 'high')   return { className: styles.badgeHigh,   label: 'High'   };
  if (level === 'medium') return { className: styles.badgeMedium, label: 'Medium' };
  return                         { className: styles.badgeLow,    label: 'LOW'    };
}
