import { Link } from 'react-router-dom';
import styles from './profile.module.css';

const STATUS_CONFIG = {
  'Pending Approval':             { cls: 'statusPendingApproval', icon: 'pending' },
  'Approved':                     { cls: 'statusApproved',        icon: 'check_circle' },
  'Not Approved':                 { cls: 'statusNotApproved',     icon: 'dangerous' },
  'Declined':                     { cls: 'statusDeclined',        icon: 'feedback' },
  'Approved*':                    { cls: 'statusExpired',         icon: 'history_toggle_off' },
  'Approved! (Renewal Required)': { cls: 'statusExpired',         icon: 'history_toggle_off' },
};

export default function ProfilePageHeader({ profile }) {
  const statusLabel = profile.currentStatus?.label ?? 'Pending Approval';
  const { cls, icon } = STATUS_CONFIG[statusLabel] ?? STATUS_CONFIG['Pending Approval'];

  const riskLevelCls = profile.riskLevel?.level === 'high'   ? ' ' + styles.tpTopStripHigh
    : profile.riskLevel?.level === 'medium' ? ' ' + styles.tpTopStripMedium
    : ' ' + styles.tpTopStripLow;

  const riskCapCls = 'badge' + (profile.riskLevel?.level ?? 'low').charAt(0).toUpperCase()
    + (profile.riskLevel?.level ?? 'low').slice(1);

  return (
    <div className={`${styles.tpTopStrip}${riskLevelCls}`}>
      <div className={styles.tpPageHeader}>
        <Link to={`/profile/${profile.id}`} className={styles.tpBack}>
          <span className="material-icons-outlined">chevron_left</span> Back
        </Link>
        <div className={styles.tpTitleRow}>
          <div className={styles.tpNameGroup}>
            <h1>{profile.name}</h1>
            <span className={styles.tpVerified}>
              <span className="material-icons-outlined">verified</span>
              {profile.verifiedText}
            </span>
          </div>
          <div className={styles.tpBadges}>
            <div className={styles.tpBadgeGroup}>
              <div className={styles.tpBadgeLabel}>Current status:</div>
              <div className={`${styles.badge} ${styles[cls]} ${styles.badgeBtn}`}>
                {statusLabel}
                <span className="material-icons-outlined" style={{ fontSize: 16 }}>{icon}</span>
              </div>
            </div>
            <div className={styles.tpBadgeGroup}>
              <div className={styles.tpBadgeLabel}>Risk level:</div>
              <Link to={`/profile/${profile.id}/risk-report`} style={{ textDecoration: 'none' }}>
                <div className={`${styles.badge} ${styles[riskCapCls]} ${styles.badgeBtn}`}>
                  {profile.riskLevel?.label}
                  <span className="material-icons-outlined" style={{ fontSize: 16 }}>{profile.riskLevel?.icon}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
