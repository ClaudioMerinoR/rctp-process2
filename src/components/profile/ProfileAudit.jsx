import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { Sidebar } from './ProfilePage';
import ProfilePageHeader from './ProfilePageHeader';
import styles from './profile.module.css';
import rmStyles from './ProfileRiskMitigation.module.css';
import auditStyles from './ProfileAudit.module.css';

const DEFAULT_AUDIT_ROWS = [
  { date: '29 Jan 2026', addedBy: 'Claudio Merino', source: 'Integrity Check', summary: 'Integrity Check Report request created' },
  { date: '27 Jan 2026', addedBy: 'Claudio Merino', source: 'Risk Assessment', summary: 'Key Risk Factor Amended' },
  { date: '26 Jan 2026', addedBy: 'System', source: 'Integrity Check', summary: 'Completed by Claudio Merino' },
  { date: '24 Jan 2026', addedBy: 'System', source: 'Risk Assessment', summary: "Current Risk Level set to 'Medium'" },
  { date: '22 Jan 2026', addedBy: 'System', source: 'Risk Assessment', summary: "Current Risk Level Report\nRisk Level: Medium\nRisk Score: 42" },
  { date: '20 Jan 2026', addedBy: 'Claudio Merino', source: 'Scoring', summary: 'Score updated to 42' },
  { date: '18 Jan 2026', addedBy: 'System', source: 'Scoring', summary: 'Scoring completed' },
  { date: '15 Jan 2026', addedBy: 'System', source: 'Screening & Monitoring', summary: 'Continuous Monitoring activated' },
  { date: '12 Jan 2026', addedBy: 'System', source: 'Onboarding', summary: 'Pre Onboarding Entity Verification completed' },
  { date: '10 Jan 2026', addedBy: 'Monica Hall', source: 'Onboarding', summary: 'New Third Party Added' },
];

const LINKED_SOURCES = new Set(['Onboarding', 'Risk Assessment', 'Integrity Check', 'Screening & Monitoring', 'Scoring']);

export default function ProfileAudit() {
  const { profileId } = useParams();
  const profile = profiles[profileId];
  if (!profile) return null;

  const auditRows = profile.auditRows || DEFAULT_AUDIT_ROWS;

  const [filterDate, setFilterDate]     = useState('');
  const [filterAddedBy, setFilterAddedBy] = useState('');
  const [filterSource, setFilterSource] = useState('');
  const [filterSummary, setFilterSummary] = useState('');

  const allDates   = [...new Set(auditRows.map(r => r.date))];
  const allAdders  = [...new Set(auditRows.map(r => r.addedBy))];
  const allSources = [...new Set(auditRows.map(r => r.source))];

  const filtered = auditRows.filter(r => {
    if (filterDate    && r.date    !== filterDate)                          return false;
    if (filterAddedBy && r.addedBy !== filterAddedBy)                      return false;
    if (filterSource  && r.source  !== filterSource)                        return false;
    if (filterSummary && !r.summary.toLowerCase().includes(filterSummary.toLowerCase())) return false;
    return true;
  });

  function handleReset() {
    setFilterDate('');
    setFilterAddedBy('');
    setFilterSource('');
    setFilterSummary('');
  }

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
          <section className={rmStyles.card} style={{ minHeight: 'unset' }}>

            <div className={`${styles.cardHeader} ${rmStyles.cardHeader}`}>
              <div className={rmStyles.cardTitleRow}>
                <h2 className={styles.cardTitle}>Audit</h2>
                <span className="material-icons-outlined" style={{ fontSize: 18, color: 'var(--text-light)', cursor: 'pointer' }}>info</span>
              </div>
              <div className={styles.cardHeaderRight}>
                <span className={auditStyles.resultCount}>
                  Showing results 1 – {filtered.length} of {filtered.length}
                </span>
                <button className={`${styles.btn} ${styles.btnOutline} ${auditStyles.printBtn}`}>
                  <span className="material-icons-outlined" style={{ fontSize: 15 }}>print</span>
                  Print
                </button>
              </div>
            </div>

            {/* Filter toolbar */}
            <div className={auditStyles.filterBar}>
              <select
                className={auditStyles.filterSelect}
                value={filterDate}
                onChange={e => setFilterDate(e.target.value)}
              >
                <option value="">Date</option>
                {allDates.map(d => <option key={d} value={d}>{d}</option>)}
              </select>

              <select
                className={auditStyles.filterSelect}
                value={filterAddedBy}
                onChange={e => setFilterAddedBy(e.target.value)}
              >
                <option value="">Added By</option>
                {allAdders.map(a => <option key={a} value={a}>{a}</option>)}
              </select>

              <select
                className={auditStyles.filterSelect}
                value={filterSource}
                onChange={e => setFilterSource(e.target.value)}
              >
                <option value="">Source</option>
                {allSources.map(s => <option key={s} value={s}>{s}</option>)}
              </select>

              <input
                type="text"
                className={auditStyles.filterInput}
                placeholder="Summary"
                value={filterSummary}
                onChange={e => setFilterSummary(e.target.value)}
              />

              <button className={`${styles.btn} ${styles.btnFilled}`} style={{ height: 32, fontSize: 12, padding: '0 14px' }}>
                Filter
              </button>

              <button
                className={auditStyles.resetBtn}
                onClick={handleReset}
                title="Reset filters"
              >
                <span className="material-icons-outlined" style={{ fontSize: 18 }}>restart_alt</span>
              </button>
            </div>

            <div className={rmStyles.tableWrap}>
              <table className={styles.table} style={{ minWidth: 0 }}>
                <thead>
                  <tr>
                    <th style={{ width: 130 }}>Date <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                    <th style={{ width: 160 }}>Added By <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                    <th style={{ width: 200 }}>Source <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                    <th>Summary <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-light)', padding: '24px 0' }}>
                        No audit entries match the current filters.
                      </td>
                    </tr>
                  ) : filtered.map((row, i) => (
                    <tr key={i}>
                      <td>{row.date}</td>
                      <td>{row.addedBy}</td>
                      <td>
                        {LINKED_SOURCES.has(row.source)
                          ? <span className={styles.cellLink}>{row.source}</span>
                          : row.source
                        }
                      </td>
                      <td style={{ whiteSpace: 'pre-line' }}>{row.summary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className={auditStyles.pagination}>
              <div className={auditStyles.paginationLeft}>
                <select className={auditStyles.perPageSelect} defaultValue="100">
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
              <div className={auditStyles.paginationRight}>
                <span className={auditStyles.pageInfo}>
                  Showing results 1 – {filtered.length} of {filtered.length}
                </span>
                <button className={auditStyles.pageBtn} disabled>
                  <span className="material-icons-outlined" style={{ fontSize: 16 }}>first_page</span>
                </button>
                <button className={auditStyles.pageBtn} disabled>
                  <span className="material-icons-outlined" style={{ fontSize: 16 }}>chevron_left</span>
                </button>
                <span className={auditStyles.pageInfo}>Page 1 of 1</span>
                <button className={auditStyles.pageBtn} disabled>
                  <span className="material-icons-outlined" style={{ fontSize: 16 }}>chevron_right</span>
                </button>
                <button className={auditStyles.pageBtn} disabled>
                  <span className="material-icons-outlined" style={{ fontSize: 16 }}>last_page</span>
                </button>
              </div>
            </div>

          </section>
        </main>
      </div>
    </PageLayout>
  );
}
