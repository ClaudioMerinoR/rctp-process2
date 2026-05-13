import { useParams } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { Sidebar } from './ProfilePage';
import ProfilePageHeader from './ProfilePageHeader';
import styles from './profile.module.css';

export default function ProfileDocuments() {
  const { profileId } = useParams();
  const profile = profiles[profileId];

  if (!profile) return <div style={{ padding: 40, textAlign: 'center' }}>Profile not found</div>;

  const docs = profile.documents || [];
  const totalDocs = docs.length;
  const totalPages = Math.max(1, Math.ceil(totalDocs / 20));

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
          <section className={styles.documentsCard}>
            <div className={`${styles.cardHeader} ${styles.documentsCardHeader}`}>
              <h2 className={styles.cardTitle}>Documents</h2>
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.table} style={{ minWidth: 0 }}>
                <thead>
                  <tr>
                    <th>Name <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                    <th>Type <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                    <th>Size <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                    <th>Section <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                    <th>Date <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                    <th>Owner <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((doc, i) => (
                    <tr key={i}>
                      <td><span className={styles.cellLink}>{doc.name}</span></td>
                      <td>{doc.type}</td>
                      <td>{doc.size}</td>
                      <td>{doc.section}</td>
                      <td>{doc.date}</td>
                      <td>{doc.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.docPagination}>
              <select className={styles.pageSize}>
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span>Showing results 1 – {Math.min(20, totalDocs)} of {totalDocs}</span>
              <div className={styles.pageControls}>
                <button className={styles.pageBtn} disabled>
                  <span className="material-icons-outlined" style={{ fontSize: 20 }}>first_page</span>
                </button>
                <button className={styles.pageBtn} disabled>
                  <span className="material-icons-outlined" style={{ fontSize: 20 }}>chevron_left</span>
                </button>
                <span className={styles.pageLabel}>Page</span>
                <input type="number" defaultValue={1} min={1} max={totalPages} className={styles.pageInput} />
                <span className={styles.pageLabel}>of {totalPages}</span>
                <button className={styles.pageBtn} disabled={totalPages <= 1}>
                  <span className="material-icons-outlined" style={{ fontSize: 20 }}>chevron_right</span>
                </button>
                <button className={styles.pageBtn} disabled={totalPages <= 1}>
                  <span className="material-icons-outlined" style={{ fontSize: 20 }}>last_page</span>
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </PageLayout>
  );
}
