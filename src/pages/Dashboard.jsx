import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import PageLayout from '../components/layout/PageLayout';
import Breadcrumb from '../components/layout/Breadcrumb';
import Badge from '../components/ui/Badge';
import Flag from '../components/ui/Flag';
import styles from './Dashboard.module.css';

const TABS = ['Actions', 'Screening & Monitoring', 'Screening & Monitoring Tasks', 'Enhanced Due Diligence Reports'];

const TASK_TYPE_CONFIG = {
  'APPROVAL':                      { icon: 'fact_check',     color: 'var(--primary-600)' },
  'RED FLAG':                      { icon: 'flag',           color: 'var(--alert-500)' },
  'QUESTIONNAIRE':                 { icon: 'list_alt',       color: 'var(--neutral-500)' },
  'ENHANCED DUE DILIGENCE REPORT': { icon: 'description',   color: 'var(--primary-600)' },
  'RISK LEVEL AMEND APPROVAL':     { icon: 'manage_history', color: 'var(--warning-600)' },
};

const STATUS_CONFIG = {
  'Not Started':     { cls: 'statusNotStarted' },
  'In Progress':     { cls: 'statusInProgress' },
  'Completed':       { cls: 'statusCompleted' },
  'Action Required': { cls: 'statusActionRequired' },
};

// ── Actions tab data ────────────────────────────────────────────────────────
const ACTIONS_ROWS = [
  { type: 'APPROVAL',    name: 'Approval Stage 1',                                    tp: 'Apparel Empire',    tpId: null,           status: 'Not Started',  risk: 'high',   owner: 'Claudio Merino', date: '04 May 2026', age: '2 Days' },
  { type: 'RED FLAG',    name: 'Adverse Media',                                        tp: 'GAZPROM, PAO',      tpId: 'gazprom',      status: 'Not Started',  risk: 'high',   owner: 'Claudio Merino', date: '30 Apr 2026', age: '6 Days' },
  { type: 'QUESTIONNAIRE', name: 'Onboarding',                                         tp: 'Coinbase',          tpId: null,           status: 'In Progress',  risk: 'low',    owner: 'Claudio Merino', date: '13 Apr 2026', age: '23 Days' },
  { type: 'RED FLAG',    name: 'Anti-bribery policy does not apply to Third Parties',  tp: 'Pied Piper',        tpId: 'piedpiper',    status: 'Not Started',  risk: 'medium', owner: 'Claudio Merino', date: '09 Apr 2026', age: '27 Days' },
  { type: 'RED FLAG',    name: 'Anti-bribery policy does not apply to Third Parties',  tp: 'fds',               tpId: null,           status: 'Not Started',  risk: 'medium', owner: 'Claudio Merino', date: '01 Apr 2026', age: '1 Month' },
  { type: 'QUESTIONNAIRE', name: 'Onboarding',                                         tp: 'Pied Piper Inc',    tpId: 'piedpiper',    status: 'In Progress',  risk: null,     owner: 'Claudio Merino', date: '26 Mar 2026', age: '1 Month' },
  { type: 'QUESTIONNAIRE', name: 'Onboarding',                                         tp: 'Bruce Wayne',       tpId: 'brucewayne',   status: 'In Progress',  risk: null,     owner: 'Claudio Merino', date: '25 Mar 2026', age: '1 Month' },
  { type: 'QUESTIONNAIRE', name: 'Onboarding',                                         tp: 'agence grateau',    tpId: null,           status: 'In Progress',  risk: null,     owner: 'Claudio Merino', date: '24 Mar 2026', age: '1 Month' },
  { type: 'QUESTIONNAIRE', name: 'Onboarding',                                         tp: 'Pied Piper Inc',    tpId: 'piedpiper',    status: 'In Progress',  risk: null,     owner: 'Claudio Merino', date: '17 Mar 2026', age: '1 Month' },
  { type: 'QUESTIONNAIRE', name: 'Onboarding',                                         tp: 'THE PIED PIPER EXTERMINATORS INC', tpId: null, status: 'Not Started', risk: 'low', owner: 'Claudio Merino', date: '17 Mar 2026', age: '1 Month' },
  { type: 'QUESTIONNAIRE', name: 'Risk Assessment',                                    tp: 'Gazprom',           tpId: 'gazprom',      status: 'Not Started',  risk: 'high',   owner: 'Claudio Merino', date: '18 Nov 2025', age: '5 Months' },
  { type: 'QUESTIONNAIRE', name: 'Risk Assessment',                                    tp: 'GAZPROM, PAO',      tpId: 'gazprom',      status: 'Not Started',  risk: 'high',   owner: 'Claudio Merino', date: '21 Aug 2025', age: '8 Months' },
  { type: 'QUESTIONNAIRE', name: 'Onboarding',                                         tp: 'dundler mifflin',   tpId: 'dundermifflin', status: 'Not Started', risk: null,     owner: 'Claudio Merino', date: '16 Jun 2025', age: '10 Months' },
  { type: 'RED FLAG',    name: 'ADVERSE MEDIA',                                         tp: 'Google Europe',     tpId: null,           status: 'Not Started',  risk: 'high',   owner: 'Claudio Merino', date: '24 Apr 2025', age: '1 Year' },
  { type: 'RED FLAG',    name: 'Countries/Territories of Operations - Afghanistan',     tp: 'Google Europe',     tpId: null,           status: 'Not Started',  risk: 'high',   owner: 'Claudio Merino', date: '24 Apr 2025', age: '1 Year' },
];

// ── Screening & Monitoring tab data ─────────────────────────────────────────
// matches: [amber, green, blue, dark-red, red] — same order as ProfilePage screeningRows
const SM_ROWS = [
  { alert: true,  tpName: 'Gazprom',             tpId: 'gazprom',      shortName: 'gazprom',          type: 'Entity', subtype: 'Primary Entity',  flags: [{ type: 'am', icon: 'entity' }, { type: 'pep', icon: 'person' }],  remediation: true,  matches: [363, 6, 0, 0, 1],  updated: '25 Apr 2026', alertCount: 22 },
  { alert: false, tpName: 'Volkswagen',           tpId: null,           shortName: 'volkswagen',       type: 'Entity', subtype: 'Primary Entity',  flags: [{ type: 'am', icon: 'entity' }, { type: 'san', icon: 'person' }], remediation: true,  matches: [118, 0, 0, 0, 0],  updated: '25 Apr 2026', alertCount: 0 },
  { alert: false, tpName: 'Dunder Mifflin',       tpId: 'dundermifflin', shortName: 'dunder mifflin',  type: 'Entity', subtype: 'Primary Entity',  flags: [{ type: 'am', icon: 'entity' }],                                  remediation: false, matches: [12, 0, 0, 0, 0],   updated: '20 Apr 2026', alertCount: 0 },
  { alert: false, tpName: 'Pied Piper, Inc.',     tpId: 'piedpiper',    shortName: 'Pied Piper',       type: 'Entity', subtype: 'Primary Entity',  flags: [{ type: 'am', icon: 'entity' }, { type: 'pep', icon: 'person' }], remediation: false, matches: [8, 2, 0, 1, 2],    updated: '30 Nov 2025', alertCount: 3 },
  { alert: false, tpName: 'GAZPROM, PAO',         tpId: 'gazprom',      shortName: 'GAZPROM',          type: 'Entity', subtype: 'Associated Entity', flags: [{ type: 'san', icon: 'entity' }, { type: 'sco', icon: 'entity' }], remediation: true, matches: [201, 14, 2, 5, 8], updated: '18 Apr 2026', alertCount: 0 },
  { alert: false, tpName: 'Bruce Wayne Enterprises', tpId: 'brucewayne', shortName: 'BWE',             type: 'Entity', subtype: 'Primary Entity',  flags: [{ type: 'am', icon: 'entity' }],                                  remediation: false, matches: [4, 0, 0, 0, 0],    updated: '10 Mar 2026', alertCount: 0 },
  { alert: false, tpName: 'Waystar Royco',         tpId: 'waystar',      shortName: 'Waystar',          type: 'Entity', subtype: 'Primary Entity',  flags: [{ type: 'am', icon: 'entity' }, { type: 'pep', icon: 'person' }], remediation: false, matches: [25, 1, 0, 0, 2],   updated: '05 Mar 2026', alertCount: 1 },
  { alert: false, tpName: 'Initech Solutions',     tpId: 'initech',      shortName: 'Initech',          type: 'Entity', subtype: 'Primary Entity',  flags: [],                                                                remediation: false, matches: [0, 0, 0, 0, 0],    updated: '01 Feb 2026', alertCount: 0 },
  { alert: false, tpName: 'Lumon Industries',      tpId: 'lumon',        shortName: 'Lumon',            type: 'Entity', subtype: 'Primary Entity',  flags: [{ type: 'am', icon: 'entity' }],                                  remediation: false, matches: [3, 0, 0, 0, 0],    updated: '15 Jan 2026', alertCount: 0 },
  { alert: false, tpName: 'eComoda',               tpId: 'ecomoda',      shortName: 'eComoda',          type: 'Entity', subtype: 'Primary Entity',  flags: [],                                                                remediation: false, matches: [0, 0, 0, 0, 0],    updated: '10 Jan 2026', alertCount: 0 },
  { alert: false, tpName: 'Los Pollos Hermanos',   tpId: 'lospollos',    shortName: 'LPH',              type: 'Entity', subtype: 'Primary Entity',  flags: [{ type: 'san', icon: 'entity' }, { type: 'am', icon: 'entity' }], remediation: true, matches: [44, 3, 0, 2, 4],   updated: '08 Jan 2026', alertCount: 5 },
];

// ── Screening & Monitoring Tasks data ───────────────────────────────────────
const SMT_ROWS = [
  { type: 'QUESTIONNAIRE', name: 'Periodic Review',   tp: 'GAZPROM, PAO',   tpId: 'gazprom',       status: 'Not Started', risk: 'high',   owner: 'Claudio Merino', date: '18 Nov 2025', age: '5 Months' },
  { type: 'QUESTIONNAIRE', name: 'Annual Review',     tp: 'Dunder Mifflin', tpId: 'dundermifflin', status: 'Not Started', risk: 'medium', owner: 'Claudio Merino', date: '16 Jun 2025', age: '10 Months' },
];

// ── EDD data ────────────────────────────────────────────────────────────────
const EDD_ROWS = [
  { type: 'ENHANCED DUE DILIGENCE REPORT', name: 'Enhanced Due Diligence Report Review Task - Vladimir Vladimirovich Putin', tp: 'Apple', tpId: null, status: 'Not Started', risk: 'low', owner: 'This is the name of my default group', date: '06 Sep 2024', age: '1 Year' },
];

// match badge styles by position (amber, green, blue/dark, dark-red, red)
const MATCH_STYLES = ['incomplete', 'completed', 'no-action', 'confirmed', 'action-required'];

function TaskTypeBadge({ type }) {
  const cfg = TASK_TYPE_CONFIG[type] || { icon: 'assignment', color: 'var(--neutral-500)' };
  return (
    <span className={styles.typeBadge}>
      <span className="material-icons-outlined" style={{ fontSize: 13, color: cfg.color }}>{cfg.icon}</span>
      {type}
    </span>
  );
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG['Not Started'];
  return <span className={`${styles.statusBadge} ${styles[cfg.cls]}`}>{status}</span>;
}

function RiskChip({ risk }) {
  if (!risk) return <span className={`${styles.riskChip} ${styles.riskUnknown}`}>UNKNOWN <span className="material-icons-outlined" style={{ fontSize: 13 }}>help_outline</span></span>;
  const map    = { high: styles.riskHigh, medium: styles.riskMedium, low: styles.riskLow };
  const labels = { high: 'HIGH RISK', medium: 'MEDIUM RISK', low: 'LOW RISK' };
  const icons  = { high: 'error', medium: 'error_outline', low: 'check_circle_outline' };
  return (
    <span className={`${styles.riskChip} ${map[risk]}`}>
      {labels[risk]}
      <span className="material-icons-outlined" style={{ fontSize: 13 }}>{icons[risk]}</span>
    </span>
  );
}

// ── Actions / SMT / EDD table (shared layout) ────────────────────────────────
function ActionsTable({ rows, search }) {
  const filtered = search
    ? rows.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.tp.toLowerCase().includes(search.toLowerCase()) ||
        r.type.toLowerCase().includes(search.toLowerCase())
      )
    : rows;

  return (
    <>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: 40 }}><input type="checkbox" style={{ cursor: 'pointer' }} /></th>
              <th>Task Type <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
              <th>Task Name <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
              <th>Third Party Name <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
              <th>Task Status <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
              <th>Current Risk Level <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
              <th>Owner <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
              <th>Date Created <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
              <th>Age <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9} style={{ textAlign: 'center', color: 'var(--text-light)', padding: '32px 0' }}>No actions found.</td></tr>
            ) : filtered.map((row, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'center' }}><input type="checkbox" style={{ cursor: 'pointer' }} /></td>
                <td><TaskTypeBadge type={row.type} /></td>
                <td>
                  {row.tpId
                    ? <Link to={`/profile/${row.tpId}`} className={styles.cellLink}>{row.name}</Link>
                    : <span className={styles.cellLink}>{row.name}</span>}
                </td>
                <td>
                  {row.tpId
                    ? <Link to={`/profile/${row.tpId}`} className={styles.cellLink}>{row.tp}</Link>
                    : <span className={styles.cellLink}>{row.tp}</span>}
                </td>
                <td><StatusBadge status={row.status} /></td>
                <td><RiskChip risk={row.risk} /></td>
                <td>{row.owner}</td>
                <td>{row.date}</td>
                <td>{row.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.divider} />
      <TablePagination count={filtered.length} />
    </>
  );
}

// ── Screening & Monitoring table ─────────────────────────────────────────────
function SMTable({ rows, search }) {
  const filtered = search
    ? rows.filter(r =>
        r.tpName.toLowerCase().includes(search.toLowerCase()) ||
        (r.shortName || '').toLowerCase().includes(search.toLowerCase())
      )
    : rows;

  return (
    <>
      <div className={styles.smTableWrap}>
        <table className={`${styles.table} ${styles.smTable}`}>
          <thead>
            <tr>
              <th style={{ width: 44 }}>
                <span className="material-icons-outlined" style={{ fontSize: 16, color: 'var(--alert-500)', verticalAlign: 'middle' }}>notifications</span>
              </th>
              <th>Third Party Name <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
              <th>Short Name <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
              <th style={{ width: 100 }}>Type <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
              <th style={{ width: 160 }}>Subtype <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
              <th style={{ width: 180 }}>Categories <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
              <th style={{ width: 180 }}>Remediation Required <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
              <th style={{ width: 200 }}>Match Results <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
              <th style={{ width: 130 }}>Last Updated <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
              <th className={styles.smFixedCol}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={10} style={{ textAlign: 'center', color: 'var(--text-light)', padding: '32px 0' }}>No results found.</td></tr>
            ) : filtered.map((row, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'center' }}>
                  {row.alert && (
                    <span className="material-icons-outlined" style={{ fontSize: 16, color: 'var(--alert-500)' }}>notifications_active</span>
                  )}
                </td>
                <td>
                  {row.tpId
                    ? <Link to={`/profile/${row.tpId}`} className={styles.cellLink}>{row.tpName}</Link>
                    : <span className={styles.cellLink}>{row.tpName}</span>}
                </td>
                <td>
                  {row.tpId
                    ? <Link to={`/profile/${row.tpId}`} className={styles.cellLink}>{row.shortName}</Link>
                    : <span>{row.shortName}</span>}
                </td>
                <td>{row.type}</td>
                <td>{row.subtype}</td>
                <td>
                  <div className={styles.flagsCell}>
                    {row.flags.map((f, j) => (
                      <Flag key={j} type={f.type} icon={f.icon} />
                    ))}
                  </div>
                </td>
                <td>
                  <label className={styles.remediationCell}>
                    <input type="checkbox" checked={row.remediation} readOnly style={{ cursor: 'pointer' }} />
                    {row.remediation ? 'Remediation Required' : ''}
                  </label>
                </td>
                <td>
                  <div className={styles.matchBadges}>
                    {row.matches.map((val, j) => (
                      <Badge key={j} label={val} style={MATCH_STYLES[j]} size="large" shape="square" />
                    ))}
                  </div>
                </td>
                <td>{row.updated}</td>
                <td className={styles.smFixedCol}>
                  <div className={styles.smActionsCell}>
                    <button className={styles.smAlertBtn} title="Alerts">
                      <span className="material-icons-outlined" style={{ fontSize: 16 }}>notifications</span>
                      {row.alertCount > 0 && <span className={styles.alertBadge}>{row.alertCount}</span>}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.divider} />
      <TablePagination count={filtered.length} />
    </>
  );
}

function TablePagination({ count }) {
  return (
    <div className={styles.pagination}>
      <div className={styles.paginationLeft}>
        <select className={styles.pageSize} defaultValue="100">
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <span>Showing results 1 – {count} of {count}</span>
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
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Actions');
  const [search, setSearch] = useState('');
  const [filterDueNow, setFilterDueNow] = useState(false);
  const [filterUpcoming, setFilterUpcoming] = useState(false);

  const isSM = activeTab === 'Screening & Monitoring';
  const currentRows = isSM ? SM_ROWS
    : activeTab === 'Screening & Monitoring Tasks' ? SMT_ROWS
    : activeTab === 'Enhanced Due Diligence Reports' ? EDD_ROWS
    : ACTIONS_ROWS;

  const visibleCount = search
    ? currentRows.filter(r =>
        isSM
          ? (r.tpName + r.shortName).toLowerCase().includes(search.toLowerCase())
          : (r.name + r.tp + r.type).toLowerCase().includes(search.toLowerCase())
      ).length
    : currentRows.length;

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: 'Dashboard' }]} />

      <div className={styles.card}>
        {/* Tab bar */}
        <div className={styles.tabBar}>
          {TABS.map(tab => (
            <div
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => { setActiveTab(tab); setSearch(''); }}
              style={{ position: 'relative' }}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="dashboard-tab-indicator"
                  className={styles.tabIndicator}
                  transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Header row */}
        <div className={styles.headerRow}>
          <h1 className={styles.title}>
            {activeTab} Dashboard
            <span className="material-icons-outlined" style={{ fontSize: 16, color: 'var(--primary-500)', marginLeft: 6, verticalAlign: 'middle' }}>info</span>
          </h1>
          <div className={styles.headerRight}>
            <span className={styles.recentLabel}>
              <span className="material-icons-outlined" style={{ fontSize: 14, verticalAlign: 'middle', marginRight: 4 }}>history</span>
              RECENT ACTIVITY
            </span>
          </div>
        </div>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.searchWrap}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Quick search across all available columns"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <span className="material-icons-outlined" style={{ position: 'absolute', right: 8, color: 'var(--text-light)', fontSize: 18, pointerEvents: 'none' }}>search</span>
          </div>
          <button className={styles.refreshBtn} title="Refresh" onClick={() => setSearch('')}>
            <span className="material-icons-outlined" style={{ fontSize: 18 }}>refresh</span>
          </button>
          <span className={styles.resultCount}>Showing results 1 – {visibleCount} of {visibleCount}</span>
        </div>

        {/* Filter chips */}
        <div className={styles.chipRow}>
          <button
            className={`${styles.chip} ${filterDueNow ? styles.chipActive : ''}`}
            onClick={() => setFilterDueNow(v => !v)}
          >
            Actions Due Now
            {filterDueNow
              ? <span className={styles.chipBadge}>!</span>
              : <span className={`material-icons-outlined ${styles.chipClose}`}>close</span>}
          </button>
          <button
            className={`${styles.chip} ${filterUpcoming ? styles.chipActive : ''}`}
            onClick={() => setFilterUpcoming(v => !v)}
          >
            Upcoming Actions
            {filterUpcoming
              ? <span className={styles.chipBadge}>!</span>
              : <span className={`material-icons-outlined ${styles.chipClose}`}>close</span>}
          </button>
          <div style={{ flex: 1 }} />
          <button className={styles.reassignBtn}>
            <span className="material-icons-outlined" style={{ fontSize: 14 }}>swap_horiz</span>
            REASSIGN
          </button>
        </div>

        {/* Table — switches by tab */}
        {isSM
          ? <SMTable rows={SM_ROWS} search={search} />
          : <ActionsTable rows={currentRows} search={search} />
        }
      </div>
    </PageLayout>
  );
}
