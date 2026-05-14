import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { Sidebar } from './ProfilePage';
import ProfilePageHeader from './ProfilePageHeader';
import Badge from '../ui/Badge';
import Flag from '../ui/Flag';
import styles from './profile.module.css';
import rmStyles from './ProfileRiskMitigation.module.css';
import smStyles from './ProfileScreeningMonitoring.module.css';


export default function ProfileScreeningMonitoring() {
  const { profileId } = useParams();
  const profile = profiles[profileId];
  const [active, setActive] = useState(true);

  if (!profile) return null;

  const rows = profile.screeningRows || [];

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
                <h2 className={styles.cardTitle}>Screening &amp; Monitoring</h2>
                <span className="material-icons-outlined" style={{ fontSize: 18, color: 'var(--text-light)', cursor: 'pointer' }}>info</span>
              </div>
              <div className={smStyles.headerActions}>
                <span className={smStyles.policyLink}>
                  Policy
                  <span className={smStyles.helpIcon}>?</span>
                </span>
                <span className={smStyles.policyLink}>
                  Category Key
                  <span className={smStyles.helpIcon}>?</span>
                </span>
                <div
                  className={`${smStyles.activeToggle}${!active ? ' ' + smStyles.activeToggleOff : ''}`}
                  onClick={() => setActive(v => !v)}
                >
                  <div className={smStyles.activeToggleTrack}>{active ? 'Active' : 'Inactive'}</div>
                  <div className={smStyles.activeToggleThumb} />
                </div>
                <button className={`${styles.btn} ${styles.btnFilled}`}>Add</button>
              </div>
            </div>

            <div className={smStyles.tableWrap}>
              <table className={styles.table} style={{ minWidth: 0 }}>
                <thead>
                  <tr>
                    <th>Name <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                    <th>Entity/Person/Unknown</th>
                    <th>Category</th>
                    <th>Type <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                    <th>Match Results</th>
                    <th>Assoc Status <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                    <th><span className="material-icons-outlined" style={{ fontSize: 14, color: 'var(--alert-500)' }}>notifications</span></th>
                    <th>Inherent Risk Level</th>
                    <th>Match Titles</th>
                    <th style={{ width: 40 }} />
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i}>
                      <td><span className={styles.cellLink}>{r.name}</span></td>
                      <td>{r.entityType}</td>
                      <td>
                        <div className={styles.categoryCell}>
                          {(r.categories || []).map((c, j) => (
                            <Flag key={j} type={c.label.toLowerCase()} icon={c.label === 'AM' ? 'entity' : 'person'} />
                          ))}
                        </div>
                      </td>
                      <td><strong>{r.type}</strong></td>
                      <td>
                        <div className={styles.matchBadges}>
                          {(r.matches || []).map((m, j) => (
                            <Badge key={j} label={m.val} bgColor={m.bg} textColor={m.color} size="large" shape="square" />
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className={styles.assocStatus}>
                          <span className={styles.statusDot} style={{ background: r.statusDot }} />
                          {r.statusLabel}
                        </div>
                      </td>
                      <td />
                      <td>{r.inherentRisk || '—'}</td>
                      <td>{r.matchTitles || ''}</td>
                      <td>
                        <button className={smStyles.menuBtn}>
                          <span className="material-icons-outlined" style={{ fontSize: 18 }}>more_vert</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={styles.tablePagination}>
                <select><option>20</option></select>
                <span>Showing Results 1 – {rows.length} of {rows.length}</span>
              </div>
            </div>

          </section>
        </main>
      </div>
    </PageLayout>
  );
}
