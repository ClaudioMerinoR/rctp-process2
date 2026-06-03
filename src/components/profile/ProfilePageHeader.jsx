import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { patchInitechProfile } from '../../utils/initechFlow';
import { RiskLevelIcon } from './profileAssets';
import styles from './profile.module.css';

export const STATUS_CONFIG = {
  'Pending Approval':             { cls: 'statusPendingApproval', icon: 'pending' },
  'Approved':                     { cls: 'statusApproved',        icon: 'check_circle' },
  'Not Approved':                 { cls: 'statusNotApproved',     icon: 'dangerous' },
  'Declined':                     { cls: 'statusDeclined',        icon: 'feedback' },
  'Approved*':                    { cls: 'statusExpired',         icon: 'history_toggle_off' },
  'Approved(!) Renewal Required': { cls: 'statusExpired',         icon: 'history_toggle_off' },
};

export default function ProfilePageHeader({ profile: profileProp }) {
  const profile = patchInitechProfile(profileProp);
  const statusLabel = profile.currentStatus?.label ?? 'Pending Approval';
  const { cls, icon } = STATUS_CONFIG[statusLabel] ?? STATUS_CONFIG['Pending Approval'];

  const [scrolled, setScrolled] = useState(false);
  const badgeRef = useRef(null);
  const firedRef = useRef(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 10); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (statusLabel !== 'Approved' || firedRef.current) return;
    firedRef.current = true;
    const badge = badgeRef.current;
    if (!badge) return;
    const rect = badge.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({
      particleCount: 140,
      spread: 90,
      startVelocity: 50,
      origin: { x, y },
      colors: ['#02A3D5', '#028FBB', '#13DF81', '#F0C043', '#ffffff'],
      zIndex: 9999,
    });
  }, [statusLabel]);

  const riskLevelCls = profile.riskLevel?.level === 'high'   ? ' ' + styles.tpTopStripHigh
    : profile.riskLevel?.level === 'medium' ? ' ' + styles.tpTopStripMedium
    : ' ' + styles.tpTopStripLow;

  const riskCapCls = 'badge' + (profile.riskLevel?.level ?? 'low').charAt(0).toUpperCase()
    + (profile.riskLevel?.level ?? 'low').slice(1);

  return (
    <div
      className={`${styles.tpTopStrip}${riskLevelCls}${scrolled ? ' ' + styles.tpTopStripScrolled : ''}`}
    >
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
              <div ref={badgeRef} className={`${styles.badge} ${styles[cls]} ${styles.badgeBtn}`}>
                {statusLabel}
                <span className="material-icons-outlined" style={{ fontSize: 16 }}>{icon}</span>
              </div>
            </div>
            <div className={styles.tpBadgeGroup}>
              <div className={styles.tpBadgeLabel}>Risk level:</div>
              <Link to={`/profile/${profile.id}/risk-report`} style={{ textDecoration: 'none' }}>
                <div className={`${styles.badge} ${styles[riskCapCls]} ${styles.badgeBtn}`}>
                  {profile.riskLevel?.label}
                  <RiskLevelIcon level={profile.riskLevel?.level} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
