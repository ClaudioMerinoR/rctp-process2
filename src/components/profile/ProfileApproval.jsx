import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { Sidebar } from './ProfilePage';
import ProfilePageHeader from './ProfilePageHeader';
import styles from './profile.module.css';
import apStyles from './ProfileApproval.module.css';

const STEPS_BEFORE_APPROVAL = [
  'Risk Assessment',
  'Due Diligence',
  'Integrity Check',
  'Enhanced Due Diligence Reports',
  'UBO',
  'Risk Mitigation',
];

export default function ProfileApproval() {
  const { profileId } = useParams();
  const profile = profiles[profileId];
  const [blockerOpen, setBlockerOpen] = useState(true);

  if (!profile) return <div style={{ padding: 40, textAlign: 'center' }}>Profile not found</div>;

  const approvalDot = profile.sidebarSteps?.find(s => s.label === 'Approval')?.dot;
  const isCompleted = approvalDot === 'green';

  const blockedSteps = isCompleted ? [] : (profile.sidebarSteps || [])
    .filter(s => STEPS_BEFORE_APPROVAL.includes(s.label) && s.dot !== 'green' && s.dot !== 'grey');

  const ap = profile.approval || {};

  return (
    <PageLayout>
      <Breadcrumb items={[
        { label: 'Third Parties', to: '/third-parties' },
        { label: profile.name },
      ]} />

      <ProfilePageHeader profile={profile} />

      <div className={styles.pageBody}>
        <Sidebar profile={profile} />

        <main className={styles.mainContent}>
          <section className={apStyles.card}>

            <div className={`${styles.cardHeader} ${apStyles.cardHeader}`}>
              <h2 className={styles.cardTitle}>Approval</h2>
            </div>

            {!isCompleted && blockedSteps.length > 0 && (
              <div className={apStyles.blocker}>
                <div className={apStyles.blockerHeader} onClick={() => setBlockerOpen(o => !o)}>
                  <span className="material-icons-outlined" style={{ fontSize: 16, flexShrink: 0 }}>error</span>
                  <span className={apStyles.blockerTitle}>Approval cannot proceed for the following :</span>
                  <span className={`material-icons-outlined ${apStyles.blockerChevron} ${blockerOpen ? apStyles.blockerChevronOpen : ''}`} style={{ fontSize: 18, marginLeft: 'auto' }}>
                    expand_more
                  </span>
                </div>
                {blockerOpen && (
                  <div className={apStyles.blockerList}>
                    {blockedSteps.map((step, i) => (
                      <div key={i} className={apStyles.blockerItem}>
                        {step.label} has not been Completed.
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className={apStyles.tableWrap}>
              <table className={styles.table} style={{ minWidth: 0 }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Owner</th>
                    <th>Start Date</th>
                    <th>Completed Date</th>
                    <th>Cancelled Date</th>
                    <th>Renewal Date</th>
                    <th style={{ width: 48 }}></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Approval</td>
                    <td>{ap.owner || '—'}</td>
                    <td>{ap.startDate || '—'}</td>
                    <td>{ap.completedDate || '—'}</td>
                    <td>{ap.cancelledDate || '—'}</td>
                    <td>{ap.renewalDate || '—'}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button className={apStyles.playBtn} title="Start approval">
                        <span className="material-icons-outlined" style={{ fontSize: 16 }}>play_arrow</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </section>
        </main>
      </div>
    </PageLayout>
  );
}
