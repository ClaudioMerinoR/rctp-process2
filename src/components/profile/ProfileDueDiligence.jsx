import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { patchInitechProfile, getExternalDDFlow } from '../../utils/initechFlow';
import { Sidebar } from './ProfilePage';
import ProfilePageHeader from './ProfilePageHeader';
import styles from './profile.module.css';
import secStyles from './ProfileProcessSection.module.css';

export default function ProfileDueDiligence() {
  const { profileId } = useParams();
  const rawProfile = profiles[profileId];
  if (!rawProfile) return null;
  const profile = patchInitechProfile(rawProfile);

  const dd = profile.dueDiligence || {};
  const sidebarStep = (profile.sidebarSteps || []).find(s => s.label === 'Due Diligence');
  const baseRows = dd.rows || (
    sidebarStep?.subSteps?.length
      ? sidebarStep.subSteps.map(sub => ({ name: sub.label, required: true, owner: '', startDate: '', completedDate: '', cancelledDate: '', renewalDate: '' }))
      : [
          { name: 'Internal Due Diligence', required: true, owner: '', startDate: '', completedDate: '', cancelledDate: '', renewalDate: '' },
          { name: 'External Due Diligence', required: true, owner: '', startDate: '', completedDate: '', cancelledDate: '', renewalDate: '' },
        ]
  );

  const [tick, setTick] = useState(0);
  const externalSent = getExternalDDFlow(profileId).sent;
  const rows = baseRows.map(r =>
    r.name === 'External Due Diligence' && externalSent ? { ...r, status: 'In Progress' } : r
  );

  return (
    <PageLayout>
      <Breadcrumb items={[
        { label: 'Third Parties', to: '/third-parties' },
        { label: profile.name },
      ]} />

      <ProfilePageHeader profile={profile} />

      <div className={styles.pageBody}>
        <Sidebar profile={profile} onExternalDDSent={() => setTick(t => t + 1)} />

        <main className={styles.mainContent}>
          <section className={secStyles.card}>
            <div className={secStyles.cardHeader}>
              <h2 className={styles.cardTitle}>Due Diligence</h2>
            </div>

            <p className={secStyles.requiredNote}>
              Items marked with <span className={secStyles.requiredStar}>*</span> are required.
            </p>

            <div className={secStyles.tableWrap}>
              <table className={styles.table} style={{ minWidth: 0 }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Owner</th>
                    <th>Start Date</th>
                    <th>Completed Date</th>
                    <th>Cancelled Date</th>
                    <th>Renewal Date</th>
                    <th>Status</th>
                    <th style={{ width: 48 }} />
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i}>
                      <td>
                        {row.name}
                        {row.required && <span className={secStyles.requiredStar}> *</span>}
                      </td>
                      <td>{row.owner || ''}</td>
                      <td>{row.startDate || ''}</td>
                      <td>{row.completedDate || ''}</td>
                      <td>{row.cancelledDate || ''}</td>
                      <td>{row.renewalDate || ''}</td>
                      <td>{row.status || ''}</td>
                      <td style={{ textAlign: 'center' }}>
                        {row.name !== 'External Due Diligence' && (
                          <button className={secStyles.playBtn} title="Start">
                            <span className="material-icons-outlined" style={{ fontSize: 18 }}>play_arrow</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </PageLayout>
  );
}
