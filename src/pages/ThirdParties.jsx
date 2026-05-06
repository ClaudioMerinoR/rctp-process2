import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Breadcrumb from '../components/layout/Breadcrumb';
import RiskBadge from '../components/ui/RiskBadge';
import Button from '../components/ui/Button';
import { piedpiper, brucewayne, gazprom, initech, dundermifflin, lumon, waystar, ecomoda, lospollos } from '../data/profiles';
import styles from './ThirdParties.module.css';

const STATUS_CLS = {
  'Approved':                     'statusApproved',
  'Not Approved':                 'statusNotApproved',
  'Declined':                     'statusDeclined',
  'Approved*':                    'statusExpired',
  'Approved! (Renewal Required)': 'statusExpired',
};
function StatusBadge({ status }) {
  const cls = STATUS_CLS[status] || 'statusPending';
  return <span className={`${styles.statusBadge} ${styles[cls]}`}>{status}</span>;
}

function getOwner(p) { return p.overviewFields.find(f => f.label === 'Third Party Owner')?.value || ''; }
function getBU(p) { return p.overviewFields.find(f => f.label === 'Business Unit')?.value || ''; }
function getTags(p) { const t = p.overviewFields.find(f => f.label === 'Tags')?.value; return t && t !== '—' ? t : ''; }
function getRef(p) { return p.additionalFields.find(f => f.label === 'Internal Reference or ID')?.value?.replace('—','') || ''; }
function getStage(p) {
  const task = p.openTasks?.[0];
  if (!task) return 'Approved';
  if (task.type === 'Onboarding') return 'Requires Onboarding';
  if (task.name?.toLowerCase().includes('risk assessment')) return 'Requires Risk Assessment';
  if (task.type?.toLowerCase().includes('risk mitigation')) return 'Requires Risk Mitigation';
  return 'Requires Review';
}

const ROWS = [
  { profile: piedpiper,      id: 'piedpiper' },
  { profile: brucewayne,     id: 'brucewayne' },
  { profile: gazprom,        id: 'gazprom' },
  { profile: initech,        id: 'initech' },
  { profile: dundermifflin,  id: 'dundermifflin' },
  { profile: lumon,          id: 'lumon' },
  { profile: waystar,        id: 'waystar' },
  { profile: ecomoda,        id: 'ecomoda' },
  { profile: lospollos,      id: 'lospollos' },
].map(({ profile, id }) => ({
  id,
  name:   profile.name,
  owner:  getOwner(profile),
  bu:     getBU(profile),
  tag:    getTags(profile),
  stage:  getStage(profile),
  risk:   profile.riskLevel.level,
  ref:    getRef(profile),
  status: profile.currentStatus.label,
}));

export default function ThirdParties() {
  return (
    <PageLayout>
      <Breadcrumb items={[{ label: 'Third Parties' }]} />

      <div className={styles.card}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Third parties</h1>
          <div className={styles.titleActions}>
            <button className={styles.btnView}>
              Standard View
              <span className="material-icons-outlined" style={{ fontSize: 18 }}>arrow_drop_down</span>
            </button>
            <Button variant="outline" icon="tune" />
            <Button variant="outline" icon="file_upload">Bulk Import</Button>
            <Link to="/add-third-party" className={styles.btnAdd}>Add New</Link>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <div className={styles.searchWrap}>
              <input className={styles.searchInput} type="text" placeholder="Quick search" />
              <span className="material-icons-outlined" style={{ position: 'absolute', right: 8, color: 'var(--text-light)', fontSize: 18, pointerEvents: 'none' }}>search</span>
            </div>
          </div>
          <div className={styles.toolbarRight}>
            <Button variant="outline" icon="file_download">Export</Button>
            <Button variant="soft">Save</Button>
            <Button variant="soft">Save As</Button>
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name <span className="material-icons-outlined" style={{ fontSize: 14, verticalAlign: 'middle' }}>arrow_upward</span></th>
                <th>Owner Name</th>
                <th>Business Unit</th>
                <th>Tags</th>
                <th>Approval Stage</th>
                <th>Current Risk Level</th>
                <th>Internal Reference</th>
                <th>Current Status</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={i}>
                  <td><Link to={`/profile/${row.id}`} className={styles.cellLink}>{row.name}</Link></td>
                  <td>{row.owner}</td>
                  <td>{row.bu}</td>
                  <td>
                    {row.tag && (
                      <div className={styles.tagList}>
                        {row.tag.split(',').map(t => t.trim()).filter(Boolean).map(t => (
                          <span key={t} className={styles.tag}>{t}</span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td>{row.stage}</td>
                  <td><RiskBadge level={row.risk} /></td>
                  <td>{row.ref || ''}</td>
                  <td><StatusBadge status={row.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.divider} />
        <div className={styles.pagination}>
          <div className={styles.paginationLeft}>
            <select className={styles.pageSize}>
              <option>20</option><option>50</option><option>100</option>
            </select>
            <span>Showing results 1 – {ROWS.length} of {ROWS.length}</span>
          </div>
          <div className={styles.paginationRight}>
            <button className={styles.pageBtn} disabled><span className="material-icons-outlined">first_page</span></button>
            <button className={styles.pageBtn} disabled><span className="material-icons-outlined">chevron_left</span></button>
            <span>Page</span>
            <input className={styles.pageInput} type="number" defaultValue={1} min={1} max={1} />
            <span>of 1</span>
            <button className={styles.pageBtn} disabled><span className="material-icons-outlined">chevron_right</span></button>
            <button className={styles.pageBtn} disabled><span className="material-icons-outlined">last_page</span></button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
