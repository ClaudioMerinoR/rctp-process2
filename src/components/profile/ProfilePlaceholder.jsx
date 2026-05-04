import { Link, useParams } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { Sidebar } from './ProfilePage';
import styles from './profile.module.css';

export default function ProfilePlaceholder({ title }) {
  const { profileId } = useParams();
  const profile = profiles[profileId];
  if (!profile) return null;

  const riskLevelCls = profile.riskLevel?.level === 'high'   ? ` ${styles.stripHigh}`
    : profile.riskLevel?.level === 'medium' ? ` ${styles.stripMedium}`
    : ` ${styles.stripLow}`;

  return (
    <PageLayout>
      <Breadcrumb items={[
        { label: 'Third Parties', to: '/third-parties' },
        { label: profile.name },
      ]} />

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
                <div className={`${styles.badge} ${styles.badgePending} ${styles.badgeBtn}`}>
                  {profile.currentStatus.label}
                </div>
              </div>
              <div className={styles.tpBadgeGroup}>
                <div className={styles.tpBadgeLabel}>Risk level:</div>
                <div className={`${styles.badge} ${styles['badge' + profile.riskLevel.level.charAt(0).toUpperCase() + profile.riskLevel.level.slice(1)]} ${styles.badgeBtn}`}>
                  {profile.riskLevel.label}
                  <span className="material-icons-outlined" style={{ fontSize: 16 }}>{profile.riskLevel.icon}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.pageBody}>
        <Sidebar profile={profile} />
        <main className={styles.mainContent}>
          <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--text-light)' }}>
            <span className="material-icons-outlined" style={{ fontSize: 48, display: 'block', marginBottom: 12 }}>construction</span>
            <h2 style={{ fontSize: 20, fontWeight: 500, color: 'var(--text-primary)' }}>{title}</h2>
            <p style={{ marginTop: 8, fontSize: 13 }}>This page is under construction.</p>
          </div>
        </main>
      </div>
    </PageLayout>
  );
}
