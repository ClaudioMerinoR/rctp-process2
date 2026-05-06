import { useParams } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { Sidebar } from './ProfilePage';
import ProfilePageHeader from './ProfilePageHeader';
import styles from './profile.module.css';
import secStyles from './ProfileProcessSection.module.css';

export default function ProfileDueDiligence() {
  const { profileId } = useParams();
  const profile = profiles[profileId];
  if (!profile) return null;

  const dd = profile.dueDiligence || {};
  const rows = dd.rows || [
    { name: 'Internal Due Diligence', required: true, owner: '', startDate: '', completedDate: '', cancelledDate: '', renewalDate: '' },
    { name: 'External Due Diligence', required: true, owner: '', startDate: '', completedDate: '', cancelledDate: '', renewalDate: '' },
  ];

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
                      <td style={{ textAlign: 'center' }}>
                        <button className={secStyles.playBtn} title="Start">
                          <span className="material-icons-outlined" style={{ fontSize: 18 }}>play_arrow</span>
                        </button>
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
