import partnerIconIntegrity from '../../assets/partner-icon-integrity.png';
import partnerIconUbo from '../../assets/partner-icon-ubo.png';
import iconFlag from '../../assets/icon-flag.svg';
import iconInactiveOrder from '../../assets/icon-inactive-order.svg';
import iconFactCheck from '../../assets/icon-fact-check.svg';
import iconFinanceMode from '../../assets/icon-finance-mode.svg';
import iconFrame9 from '../../assets/icon-frame9.svg';
import iconArmingCountdown from '../../assets/icon-arming-countdown.svg';
import styles from './profile.module.css';

export const TASK_ICONS = { iconFlag, iconInactiveOrder, iconFactCheck, iconFinanceMode, iconFrame9, iconArmingCountdown };
export const PARTNER_ICONS = { integrity: partnerIconIntegrity, ubo: partnerIconUbo };

function RiskHighIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M8 11.3333C8.18889 11.3333 8.34722 11.2694 8.475 11.1417C8.60278 11.0139 8.66667 10.8556 8.66667 10.6667C8.66667 10.4778 8.60278 10.3194 8.475 10.1917C8.34722 10.0639 8.18889 10 8 10C7.81111 10 7.65278 10.0639 7.525 10.1917C7.39722 10.3194 7.33333 10.4778 7.33333 10.6667C7.33333 10.8556 7.39722 11.0139 7.525 11.1417C7.65278 11.2694 7.81111 11.3333 8 11.3333ZM7.33333 8.66667H8.66667V4.66667H7.33333V8.66667ZM8 15.5333L5.76667 13.3333H2.66667V10.2333L0.466667 8L2.66667 5.76667V2.66667H5.76667L8 0.466667L10.2333 2.66667H13.3333V5.76667L15.5333 8L13.3333 10.2333V13.3333H10.2333L8 15.5333ZM8 13.6667L9.66667 12H12V9.66667L13.6667 8L12 6.33333V4H9.66667L8 2.33333L6.33333 4H4V6.33333L2.33333 8L4 9.66667V12H6.33333L8 13.6667Z" fill="currentColor"/>
    </svg>
  );
}

export function RiskLevelIcon({ level, size = 16 }) {
  if (level === 'high') {
    return <RiskHighIcon size={size} />;
  }
  const icon = level === 'medium' ? 'error_outline' : 'check_circle_outline';
  return <span className="material-icons-outlined" style={{ fontSize: size }}>{icon}</span>;
}

export function riskBadge(level) {
  if (level === 'high')   return { className: styles.badgeHigh,   label: 'High'   };
  if (level === 'medium') return { className: styles.badgeMedium, label: 'Medium' };
  return                         { className: styles.badgeLow,    label: 'LOW'    };
}
