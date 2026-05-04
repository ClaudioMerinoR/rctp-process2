import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { Sidebar } from './ProfilePage';
import ProfilePageHeader from './ProfilePageHeader';
import styles from './profile.module.css';

function UploadArea() {
  const [dragging, setDragging] = useState(false);
  return (
    <div
      className={`${styles.uploadArea} ${dragging ? styles.uploadAreaDragging : ''}`}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => { e.preventDefault(); setDragging(false); }}
    >
      <span className="material-icons-outlined" style={{ fontSize: 32, color: 'var(--neutral-300)' }}>upload_file</span>
      <div className={styles.uploadText}>
        Drag and drop files here, or{' '}
        <span className={styles.uploadLink}>browse</span>
      </div>
      <div className={styles.uploadHint}>Supported formats: PDF, XLSX, DOCX, JPG, PNG — Max 50 MB</div>
    </div>
  );
}

export default function ProfileDocuments() {
  const params = useParams();
  const profile = profiles[params.profileId];

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

      {/* Page Body */}
      <div className={styles.pageBody}>
        <Sidebar profile={profile} activePage="documents" />

        <main className={styles.mainContent}>
          <section className={styles.documentsCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Documents</h2>
              <div className={styles.cardHeaderRight}>
                <button className={`${styles.btn} ${styles.btnOutline}`}>
                  <span className="material-icons-outlined" style={{ fontSize: 16 }}>file_upload</span>
                  Upload
                </button>
              </div>
            </div>

            <UploadArea />

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name <span className="material-icons-outlined" style={{ fontSize: 14, verticalAlign: 'middle' }}>arrow_upward</span></th>
                    <th>Type <span className="material-icons-outlined" style={{ fontSize: 14, verticalAlign: 'middle' }}>unfold_more</span></th>
                    <th>Size <span className="material-icons-outlined" style={{ fontSize: 14, verticalAlign: 'middle' }}>unfold_more</span></th>
                    <th>Section <span className="material-icons-outlined" style={{ fontSize: 14, verticalAlign: 'middle' }}>unfold_more</span></th>
                    <th>Date <span className="material-icons-outlined" style={{ fontSize: 14, verticalAlign: 'middle' }}>unfold_more</span></th>
                    <th>Owner <span className="material-icons-outlined" style={{ fontSize: 14, verticalAlign: 'middle' }}>unfold_more</span></th>
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
