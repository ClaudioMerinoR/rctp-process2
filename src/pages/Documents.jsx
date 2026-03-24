import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Breadcrumb from '../components/layout/Breadcrumb';
import styles from './Documents.module.css';

import integrityIcon from '../assets/partner-icon-integrity.png';
import uboIcon from '../assets/partner-icon-ubo.png';

/* ── Static data ── */
const DOCUMENTS = [
  { name: 'Passport-John Luther',   type: 'PDF',  size: '1.1 MB',  section: 'Risk Assessment', date: '10 Nov 2025', owner: 'Compliance Group' },
  { name: 'VAT-Registration',        type: 'PDF',  size: '0.5 MB',  section: 'Risk Assessment', date: '10 Nov 2025', owner: 'Compliance Group' },
  { name: 'AuditedAccounts',         type: 'XLSX', size: '2.2 MB',  section: 'Due Diligence',   date: '7 Nov 2025',  owner: 'Third Party Contact' },
  { name: 'Insurance',               type: 'PDF',  size: '1.1 MB',  section: 'Onboarding',      date: '7 Nov 2025',  owner: 'Sustainability Team' },
  { name: 'AntiBriberyPolicy',       type: 'PDF',  size: '850 KB',  section: 'Risk Assessment', date: '2 Nov 2025',  owner: 'Emily Forbes' },
  { name: 'Third Party Contract',    type: 'PDF',  size: '2.2 MB',  section: 'Onboarding',      date: '2 Nov 2025',  owner: 'Red Flag Approval Group' },
];

/* ── Sidebar nav items ── */
function SideNav() {
  return (
    <aside className={styles.sideNav}>
      <Link to="/tp-profile" className={styles.navItem} style={{ textDecoration: 'none' }}>
        Summary page
      </Link>
      <div className={styles.navDivider} />

      <div className={styles.navItem}>
        <span className={`${styles.dot} ${styles.dotRed}`} />
        Risk Assessment
      </div>
      <div className={styles.navItem}>
        <span className={`${styles.dot} ${styles.dotGrey}`} />
        Due Diligence
      </div>
      <div className={styles.navItem}>
        <div className={styles.navItemWrap}>
          <span className={`${styles.dot} ${styles.dotRed}`} />
          Integrity Check
          <span className={styles.navPartnerIconWrap}>
            <span className={styles.navPartnerIcon}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" fill="white" stroke="#B1BCC5"/></svg>
              <img src={integrityIcon} alt="" />
            </span>
            <span className={styles.navTooltip}>Powered by Xapiens</span>
          </span>
          <span className={styles.navNewTag}>New</span>
        </div>
      </div>
      <div className={styles.navItem}>
        <span className={`${styles.dot} ${styles.dotGrey}`} />
        Enhanced Due Diligence Reports
      </div>
      <div className={styles.navItem}>
        <span className={`${styles.dot} ${styles.dotGreen}`} />
        UBO
        <span className={styles.navPartnerIconWrap}>
          <span className={styles.navPartnerIcon}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" fill="white" stroke="#B1BCC5"/></svg>
            <img src={uboIcon} alt="" />
          </span>
          <span className={styles.navTooltip}>Powered by Duns &amp; Bradstreet</span>
        </span>
      </div>
      <div className={styles.navItem}>
        <span className={`${styles.dot} ${styles.dotRed}`} />
        Risk Mitigation
      </div>
      <div className={styles.navItem}>
        <span className={`${styles.dot} ${styles.dotAmber}`} />
        Approval
      </div>
      <div className={styles.navItem}>
        <span className={`${styles.dot} ${styles.dotRed}`} />
        Screening &amp; Monitoring
      </div>

      <div className={styles.navDivider} />
      <div className={styles.navSectionLabel}>Properties</div>
      <div className={styles.navSectionLabelActive}>Documents</div>
      <div className={styles.navSectionLabel}>
        Entity Verification
        <span className={styles.navPartnerIconWrap} style={{ verticalAlign: 'middle', marginLeft: 4 }}>
          <span className={styles.navPartnerIcon}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" fill="white" stroke="#B1BCC5"/></svg>
            <img src={uboIcon} alt="" />
          </span>
          <span className={styles.navTooltip}>Powered by Duns &amp; Bradstreet</span>
        </span>
      </div>
      <div className={styles.navSectionLabel}>Audit</div>
      <div className={styles.navDivider} />
    </aside>
  );
}

/* ── Upload area (drag-and-drop zone shown above table) ── */
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

/* ── Main page component ── */
export default function Documents() {
  return (
    <PageLayout>
      <Breadcrumb
        items={[
          { label: 'Third Parties', to: '/third-parties' },
          { label: 'GAZPROM' },
        ]}
      />

      {/* ── Third-Party Page Header (white strip) ── */}
      <div className={styles.tpTopStrip}>
        <div className={styles.tpPageHeader}>
          <Link to="/third-parties" className={styles.tpBack}>
            <span className="material-icons-outlined">chevron_left</span>
            Back
          </Link>
          <div className={styles.tpTitleRow}>
            <div className={styles.tpNameGroup}>
              <h1 className={styles.tpName}>GAZPROM, PAO</h1>
              <span className={styles.tpVerified}>
                <span className="material-icons-outlined">verified</span>
                Entity Verified
              </span>
            </div>
            <div className={styles.tpBadges}>
              <div className={styles.tpBadgeGroup}>
                <div className={styles.tpBadgeLabel}>Current status:</div>
                <div className={`${styles.badge} ${styles.badgePending} ${styles.badgeBtn}`}>
                  Pending Approval
                  <span className="material-icons-outlined" style={{ fontSize: 16 }}>pending</span>
                </div>
              </div>
              <div className={styles.tpBadgeGroup}>
                <div className={styles.tpBadgeLabel}>Risk level:</div>
                <div className={`${styles.badge} ${styles.badgeHigh} ${styles.badgeBtn}`}>
                  High
                  <span className="material-icons-outlined" style={{ fontSize: 16 }}>warning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Page Body ── */}
      <div className={styles.pageBody}>
        <SideNav />

        <main className={styles.mainContent}>
          {/* Documents card */}
          <section className={styles.documentsCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Documents</h2>
              <div className={styles.cardHeaderRight}>
                <button className={styles.btnOutline}>
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
                    <th>
                      Name{' '}
                      <span className="material-icons-outlined" style={{ fontSize: 14, verticalAlign: 'middle' }}>arrow_upward</span>
                    </th>
                    <th>
                      Type{' '}
                      <span className="material-icons-outlined" style={{ fontSize: 14, verticalAlign: 'middle' }}>unfold_more</span>
                    </th>
                    <th>
                      Size{' '}
                      <span className="material-icons-outlined" style={{ fontSize: 14, verticalAlign: 'middle' }}>unfold_more</span>
                    </th>
                    <th>
                      Section{' '}
                      <span className="material-icons-outlined" style={{ fontSize: 14, verticalAlign: 'middle' }}>unfold_more</span>
                    </th>
                    <th>
                      Date{' '}
                      <span className="material-icons-outlined" style={{ fontSize: 14, verticalAlign: 'middle' }}>unfold_more</span>
                    </th>
                    <th>
                      Owner{' '}
                      <span className="material-icons-outlined" style={{ fontSize: 14, verticalAlign: 'middle' }}>unfold_more</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {DOCUMENTS.map((doc, i) => (
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

            <div className={styles.tablePagination}>
              <select className={styles.pageSize}>
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span>Showing results 1 – 20 of 199</span>
              <div className={styles.pageControls}>
                <button className={styles.pageBtn} disabled>
                  <span className="material-icons-outlined" style={{ fontSize: 20 }}>first_page</span>
                </button>
                <button className={styles.pageBtn} disabled>
                  <span className="material-icons-outlined" style={{ fontSize: 20 }}>chevron_left</span>
                </button>
                <span className={styles.pageLabel}>Page</span>
                <input
                  type="number"
                  defaultValue={1}
                  min={1}
                  max={8}
                  className={styles.pageInput}
                />
                <span className={styles.pageLabel}>of 8</span>
                <button className={styles.pageBtn}>
                  <span className="material-icons-outlined" style={{ fontSize: 20 }}>chevron_right</span>
                </button>
                <button className={styles.pageBtn}>
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
