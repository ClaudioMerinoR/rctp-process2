import { useParams } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { Sidebar } from './ProfilePage';
import ProfilePageHeader from './ProfilePageHeader';
import styles from './profile.module.css';
import rmStyles from './ProfileRiskMitigation.module.css';

const REPORT_GROUPS = [
  { key: 'draft',     label: 'Draft Reports',     emptyMsg: 'Currently there are no draft reports.' },
  { key: 'active',    label: 'Active Reports',     emptyMsg: 'Currently there are no active reports.' },
  { key: 'completed', label: 'Completed Reports',  emptyMsg: 'Currently there are no completed reports.' },
  { key: 'cancelled', label: 'Cancelled Reports',  emptyMsg: 'Currently there are no cancelled reports.' },
];

function ReportTable({ rows }) {
  return (
    <div className={rmStyles.tableWrap}>
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
              <td>{row.createdDate || '—'}</td>
              <td>{row.renewalDate || '—'}</td>
              <td>{row.status || '—'}</td>
              <td>
                <div className={rmStyles.actionsCell}>
                  <button className={rmStyles.iconBtn} title="View">
                    <span className="material-icons-outlined" style={{ fontSize: 18 }}>visibility</span>
                  </button>
                  <button className={rmStyles.iconBtn} title="Copy">
                    <span className="material-icons-outlined" style={{ fontSize: 18 }}>content_copy</span>
                  </button>
                  <button className={rmStyles.iconBtn} title="Delete">
                    <span className="material-icons-outlined" style={{ fontSize: 18 }}>delete_outline</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ProfileEnhancedDueDiligence() {
  const { profileId } = useParams();
  const profile = profiles[profileId];
  if (!profile) return null;

  const edd = profile.enhancedDueDiligence || {};

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
          <section className={rmStyles.card}>

            <div className={`${styles.cardHeader} ${rmStyles.cardHeader}`}>
              <div className={rmStyles.cardTitleRow}>
                <h2 className={styles.cardTitle}>Enhanced Due Diligence Reports</h2>
                <span className="material-icons-outlined" style={{ fontSize: 18, color: 'var(--text-light)', cursor: 'pointer' }}>info</span>
              </div>
              <button className={`${styles.btn} ${styles.btnFilled}`}>
                Create New Report
              </button>
            </div>

            <div className={rmStyles.sectionsWrap}>
              {REPORT_GROUPS.map(({ key, label, emptyMsg }) => {
                const rows = edd[key] || [];
                return (
                  <div key={key} className={rmStyles.section}>
                    <h3 className={rmStyles.sectionTitle}>{label}</h3>
                    {rows.length > 0
                      ? <ReportTable rows={rows} />
                      : (
                        <div className={rmStyles.emptyRow}>
                          <span className="material-icons-outlined" style={{ fontSize: 16, flexShrink: 0 }}>info</span>
                          {emptyMsg}
                        </div>
                      )
                    }
                  </div>
                );
              })}
            </div>

          </section>
        </main>
      </div>
    </PageLayout>
  );
}
