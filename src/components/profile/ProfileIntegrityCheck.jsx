import { useParams } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { Sidebar } from './ProfilePage';
import ProfilePageHeader from './ProfilePageHeader';
import styles from './profile.module.css';
import secStyles from './ProfileProcessSection.module.css';

export default function ProfileIntegrityCheck() {
  const { profileId } = useParams();
  const profile = profiles[profileId];
  if (!profile) return null;

  const ic = profile.integrityCheck || {};
  const rows = ic.rows || [];

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
              <div className={secStyles.cardTitleRow}>
                <h2 className={styles.cardTitle}>Integrity Check</h2>
                <span className={secStyles.poweredBy}>
                  POWERED BY
                  <span className={secStyles.poweredByLogo}>xapien</span>
                </span>
              </div>
              <button className={`${styles.btn} ${styles.btnFilled}`}>
                Create New Report
              </button>
            </div>

            <div className={secStyles.tableWrap}>
              {rows.length === 0 ? (
                <div className={secStyles.emptyState}>
                  <span className="material-icons-outlined">info</span>
                  No integrity check reports yet.
                </div>
              ) : (
                <table className={styles.table} style={{ minWidth: 0 }}>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Requestor</th>
                      <th>Created Date</th>
                      <th>Renewal Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i}>
                        <td>{row.subject}</td>
                        <td>{row.requestor}</td>
                        <td>{row.createdDate || ''}</td>
                        <td>{row.renewalDate || ''}</td>
                        <td>{row.status || ''}</td>
                        <td>
                          <div className={secStyles.actionBtns}>
                            <button className={secStyles.iconBtn} title="View">
                              <span className="material-icons-outlined" style={{ fontSize: 18 }}>visibility</span>
                            </button>
                            <button className={secStyles.iconBtn} title="Copy">
                              <span className="material-icons-outlined" style={{ fontSize: 18 }}>content_copy</span>
                            </button>
                            <button className={secStyles.iconBtn} title="Delete">
                              <span className="material-icons-outlined" style={{ fontSize: 18 }}>delete_outline</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </main>
      </div>
    </PageLayout>
  );
}
