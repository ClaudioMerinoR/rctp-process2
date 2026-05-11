import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import PageLayout from '../components/layout/PageLayout';
import Breadcrumb from '../components/layout/Breadcrumb';
import Badge from '../components/ui/Badge';
import Flag from '../components/ui/Flag';
import Chip from '../components/ui/Chip';
import Checkbox from '../components/ui/Checkbox';
import styles from './Dashboard.module.css';

const TABS = ['Actions', 'Screening & Monitoring', 'Screening & Monitoring Tasks', 'Enhanced Due Diligence Reports'];

const TASK_TYPE_CONFIG = {
  'APPROVAL':                      { icon: 'fact_check' },
  'RED FLAG':                      { icon: 'flag' },
  'QUESTIONNAIRE':                 { icon: 'grid_view' },
  'ENHANCED DUE DILIGENCE REPORT': { icon: 'person_search' },
  'RISK LEVEL AMEND APPROVAL':     { icon: 'manage_history' },
  'RENEWAL':                       { icon: 'autorenew' },
};

const STATUS_CONFIG = {
  'Not Started':     { cls: 'statusNotStarted' },
  'In Progress':     { cls: 'statusInProgress' },
  'Completed':       { cls: 'statusCompleted' },
  'Action Required': { cls: 'statusActionRequired' },
};

// ── Actions tab data ────────────────────────────────────────────────────────
// dueNow: overdue / urgent (12 rows); upcoming: due within ~30 days (9 rows)
const ACTIONS_ROWS = [
  // ── Actions Due Now (12) ──
  { type: 'RENEWAL',                   name: 'Renewal Approval',                                            tp: 'DUNDER MIFFLIN PAPER COMPANY',    tpId: 'dundermifflin', status: 'Not Started', risk: 'medium', owner: 'Claudio Merino',    date: '06 May 2026', age: '0 Days',    dueNow: true },
  { type: 'APPROVAL',                  name: 'Approval Stage 1',                                        tp: 'GAZPROM, PAO',                    tpId: 'gazprom',      status: 'Not Started',  risk: 'high',   owner: 'Claudio Merino',    date: '04 May 2026', age: '2 Days',    dueNow: true },
  { type: 'RED FLAG',                  name: 'Public or Foreign Officials Interaction',                 tp: 'GAZPROM, PAO',                    tpId: 'gazprom',      status: 'In Progress',  risk: 'high',   owner: 'Compliance Group',  date: '13 Nov 2025', age: '37 Days',   dueNow: true },
  { type: 'RED FLAG',                  name: 'High Risk Third Party Service Type',                      tp: 'GAZPROM, PAO',                    tpId: 'gazprom',      status: 'In Progress',  risk: 'high',   owner: 'Compliance Group',  date: '29 Nov 2025', age: '14 Days',   dueNow: true },
  { type: 'RISK LEVEL AMEND APPROVAL', name: 'Risk Level Amend Approval Stage 1',                      tp: 'GAZPROM, PAO',                    tpId: 'gazprom',      status: 'Not Started',  risk: 'high',   owner: 'Compliance Group',  date: '21 Dec 2025', age: '1 Day',     dueNow: true },
  { type: 'RED FLAG',                  name: 'Brightstar Cruises — Ongoing DOJ Investigation',          tp: 'WAYSTAR ROYCO',                   tpId: 'waystar',      status: 'In Progress',  risk: 'high',   owner: 'Compliance Group',  date: '05 Nov 2025', age: '54 Days',   dueNow: true },
  { type: 'RED FLAG',                  name: 'ATN — Federal Election Interference Allegations',         tp: 'WAYSTAR ROYCO',                   tpId: 'waystar',      status: 'In Progress',  risk: 'high',   owner: 'Compliance Group',  date: '12 Nov 2025', age: '47 Days',   dueNow: true },
  { type: 'APPROVAL',                  name: 'Approval Blocked — Pending Legal Clearance',              tp: 'WAYSTAR ROYCO',                   tpId: 'waystar',      status: 'Not Started',  risk: 'high',   owner: 'Sustainability Team', date: '10 Dec 2025', age: '19 Days', dueNow: true },
  { type: 'QUESTIONNAIRE',             name: 'Due Diligence',                                           tp: 'DUNDER MIFFLIN PAPER COMPANY',    tpId: 'dundermifflin', status: 'In Progress', risk: 'medium', owner: 'Dwight Schrute',    date: '03 Jan 2026', age: '12 Days',   dueNow: true },
  { type: 'RED FLAG',                  name: 'Potential Conflict of Interest — Ryan Howard',            tp: 'DUNDER MIFFLIN PAPER COMPANY',    tpId: 'dundermifflin', status: 'In Progress', risk: 'medium', owner: 'Compliance Group',  date: '10 Jan 2026', age: '5 Days',    dueNow: true },
  { type: 'RED FLAG',                  name: 'IP Ownership Dispute — Hooli / Gavin Belson',            tp: 'PIED PIPER, INC.',                tpId: 'piedpiper',    status: 'In Progress',  risk: 'high',   owner: 'Compliance Group',  date: '10 Oct 2025', age: '81 Days',   dueNow: true },
  { type: 'QUESTIONNAIRE',             name: 'Risk Assessment',                                         tp: 'PIED PIPER, INC.',                tpId: 'piedpiper',    status: 'In Progress',  risk: 'high',   owner: 'Jared Dunn',        date: '15 Nov 2025', age: '45 Days',   dueNow: true },
  { type: 'RED FLAG',                  name: 'Adverse Media — Los Pollos Hermanos Distribution Network', tp: 'LOS POLLOS HERMANOS',           tpId: 'lospollos',    status: 'Not Started',  risk: 'high',   owner: 'Compliance Group',  date: '28 Apr 2026', age: '8 Days',    dueNow: true },

  // ── Upcoming Actions (9) ──
  { type: 'QUESTIONNAIRE',             name: 'Risk Assessment',                                         tp: 'LOS POLLOS HERMANOS',             tpId: 'lospollos',    status: 'Not Started',  risk: 'high',   owner: 'Claudio Merino',    date: '10 Apr 2026', age: '26 Days',   upcoming: true, dueDate: '28 May 2026' },
  { type: 'APPROVAL',                  name: 'Renewal Approval — Annual Review',                        tp: 'DUNDER MIFFLIN PAPER COMPANY',    tpId: 'dundermifflin', status: 'Not Started', risk: 'medium', owner: 'Claudio Merino',    date: '28 Apr 2026', age: '8 Days',    upcoming: true, dueDate: '20 May 2026' },
  { type: 'QUESTIONNAIRE',             name: 'Annual Screening Review',                                 tp: 'LUMON INDUSTRIES, INC.',          tpId: 'lumon',        status: 'In Progress',  risk: 'low',    owner: 'Seth Milchick',     date: '02 Jan 2026', age: '26 Days',   upcoming: true, dueDate: '15 May 2026' },
  { type: 'RISK LEVEL AMEND APPROVAL', name: 'Risk Level Escalation — General Risk',                   tp: 'WAYSTAR ROYCO',                   tpId: 'waystar',      status: 'Not Started',  risk: 'high',   owner: 'Compliance Group',  date: '20 Dec 2025', age: '9 Days',    upcoming: true, dueDate: '10 May 2026' },
  { type: 'RED FLAG',                  name: 'Exec Misconduct — Multiple Senior Officers',              tp: 'WAYSTAR ROYCO',                   tpId: 'waystar',      status: 'In Progress',  risk: 'high',   owner: 'Compliance Group',  date: '20 Nov 2025', age: '39 Days',   upcoming: true, dueDate: '10 May 2026' },
  { type: 'ENHANCED DUE DILIGENCE REPORT', name: 'Enhanced Due Diligence — Brightstar Cruises Cover-Up', tp: 'WAYSTAR ROYCO',                tpId: 'waystar',      status: 'In Progress',  risk: 'high',   owner: 'Emily Forbes',      date: '01 Dec 2025', age: '28 Days',   upcoming: true, dueDate: '08 May 2026' },
  { type: 'QUESTIONNAIRE',             name: 'Integrity Check — Dual Identity Verification',           tp: 'BRUCE WAYNE',                     tpId: 'brucewayne',   status: 'In Progress',  risk: 'low',    owner: 'Alfred Pennyworth', date: '01 Dec 2025', age: '29 Days',   upcoming: true, dueDate: '07 May 2026' },
  { type: 'APPROVAL',                  name: 'Approval Stage 1 — Pending Background Clearance',        tp: 'BRUCE WAYNE',                     tpId: 'brucewayne',   status: 'Not Started',  risk: 'low',    owner: 'Lucius Fox',        date: '15 Dec 2025', age: '14 Days',   upcoming: true, dueDate: '07 May 2026' },
  { type: 'QUESTIONNAIRE',             name: 'Risk Assessment',                                         tp: 'GAZPROM, PAO',                    tpId: 'gazprom',      status: 'Not Started',  risk: 'high',   owner: 'Emily Forbes',      date: '03 Dec 2025', age: '11 Days',   upcoming: true, dueDate: '07 May 2026' },
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
  const cfg = TASK_TYPE_CONFIG[type] || { icon: 'assignment' };
  return (
    <span className={styles.typeBadge}>
      <span className={styles.typeIcon}>
        <span className="material-icons-outlined" style={{ fontSize: 12 }}>{cfg.icon}</span>
      </span>
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

const RISK_LABELS = { high: 'High', medium: 'Medium', low: 'Low' };

// ── Upcoming Actions table — matches Figma node 6606-142461 ─────────────────
function UpcomingTable({ rows, search, selected, onSelect }) {
  const filtered = search
    ? rows.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.tp.toLowerCase().includes(search.toLowerCase()) ||
        r.type.toLowerCase().includes(search.toLowerCase())
      )
    : rows;

  const someChecked = filtered.some((_, i) => selected.has(i));
  const allChecked  = filtered.length > 0 && filtered.every((_, i) => selected.has(i));

  function toggleAll() {
    if (allChecked) {
      onSelect(new Set());
    } else {
      onSelect(new Set(filtered.map((_, i) => i)));
    }
  }

  function toggleRow(i) {
    const next = new Set(selected);
    next.has(i) ? next.delete(i) : next.add(i);
    onSelect(next);
  }

  return (
    <>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: 40 }}><Checkbox checked={allChecked} indeterminate={someChecked && !allChecked} onChange={toggleAll} /></th>
              <th>Task Type <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
              <th>Task Name <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
              <th>Third Party Name <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
              <th>Task Status <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
              <th>Current Risk Level <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
              <th>Owner <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
              <th>Due Date <span className="material-icons-outlined" style={{ fontSize: 12, color: 'var(--primary-600)' }}>arrow_drop_down</span></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8} style={{ textAlign: 'center', color: 'var(--text-light)', padding: '32px 0' }}>No actions found.</td></tr>
            ) : filtered.map((row, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'center' }}><Checkbox checked={selected.has(i)} onChange={() => toggleRow(i)} /></td>
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
                <td>{row.status}</td>
                <td>{RISK_LABELS[row.risk] ?? row.risk}</td>
                <td>{row.owner}</td>
                <td>{row.dueDate}</td>
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

// ── Actions / SMT / EDD table (shared layout) ────────────────────────────────
function ActionsTable({ rows, search, selected, onSelect }) {
  const filtered = search
    ? rows.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.tp.toLowerCase().includes(search.toLowerCase()) ||
        r.type.toLowerCase().includes(search.toLowerCase())
      )
    : rows;

  const someChecked = filtered.some((_, i) => selected.has(i));
  const allChecked  = filtered.length > 0 && filtered.every((_, i) => selected.has(i));

  function toggleAll() {
    if (allChecked) {
      onSelect(new Set());
    } else {
      onSelect(new Set(filtered.map((_, i) => i)));
    }
  }

  function toggleRow(i) {
    const next = new Set(selected);
    next.has(i) ? next.delete(i) : next.add(i);
    onSelect(next);
  }

  return (
    <>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: 40 }}><Checkbox checked={allChecked} indeterminate={someChecked && !allChecked} onChange={toggleAll} /></th>
              <th>Task Type <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
              <th>Task Name <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
              <th>Third Party Name <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
              <th>Task Status <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
              <th>Current Risk Level <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
              <th>Owner <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
              <th>Date Created <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
              <th>Age <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9} style={{ textAlign: 'center', color: 'var(--text-light)', padding: '32px 0' }}>No actions found.</td></tr>
            ) : filtered.map((row, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'center' }}><Checkbox checked={selected.has(i)} onChange={() => toggleRow(i)} /></td>
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
                <td>{row.status}</td>
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
              <th>Third Party Name <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
              <th>Short Name <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
              <th style={{ width: 100 }}>Type <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
              <th style={{ width: 160 }}>Subtype <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
              <th style={{ width: 180 }}>Categories <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
              <th style={{ width: 180 }}>Remediation Required <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
              <th style={{ width: 200 }}>Match Results <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
              <th style={{ width: 130 }}>Last Updated <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
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

// ── Screening & Monitoring Tasks layout ──────────────────────────────────────
function SMTContent({ rows }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('bel');

  const filtered = search
    ? rows.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.tp.toLowerCase().includes(search.toLowerCase())
      )
    : rows;

  return (
    <>
      {/* Title row */}
      <div className={styles.smtHeaderRow}>
        <h2 className={styles.smtTitle}>Screening &amp; Monitoring Tasks</h2>
        <div className={styles.smtHeaderRight}>
          <span className={styles.smtCategoryKey}>
            CATEGORY KEY
            <span className="material-icons-outlined" style={{ fontSize: 14, verticalAlign: 'middle', marginLeft: 3 }}>help_outline</span>
          </span>
          <select
            className={styles.smtSelect}
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="bel">bel</option>
            <option value="all">all</option>
          </select>
          <button className={styles.smtFilterBtn}>
            <span className="material-icons-outlined" style={{ fontSize: 16 }}>filter_list</span>
          </button>
        </div>
      </div>

      {/* Toolbar row */}
      <div className={styles.smtToolbar}>
        <div className={styles.smtToolbarLeft}>
          <div className={styles.searchWrap} style={{ maxWidth: 396 }}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Quick Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <span className="material-icons-outlined" style={{ position: 'absolute', right: 8, color: 'var(--text-light)', fontSize: 18, pointerEvents: 'none' }}>search</span>
          </div>
          <button className={styles.refreshBtn} title="Reset" onClick={() => setSearch('')}>
            <span className="material-icons-outlined" style={{ fontSize: 18 }}>refresh</span>
          </button>
          <span className={styles.resultCount}>
            Showing results {filtered.length === 0 ? '0 - 0' : `1 – ${filtered.length}`} of {filtered.length}
          </span>
        </div>
        <div className={styles.smtToolbarRight}>
          <button className={styles.smtExportBtn}>
            Export
            <span className="material-icons-outlined" style={{ fontSize: 16, color: 'var(--neutral-300)' }}>download</span>
          </button>
          <button className={`${styles.smtSaveBtn}`}>Save</button>
          <button className={`${styles.smtSaveBtn}`}>Save As</button>
        </div>
      </div>

      {/* Empty state or table */}
      {filtered.length === 0 ? (
        <div className={styles.smtEmptyBanner}>
          <span className="material-icons-outlined" style={{ fontSize: 18, color: 'var(--text-normal)', flexShrink: 0 }}>warning</span>
          <span>Currently we do not have records matching your search criteria.</span>
        </div>
      ) : (
        <>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th><input type="checkbox" style={{ cursor: 'pointer' }} /></th>
                  <th>Task Type <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                  <th>Task Name <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                  <th>Third Party Name <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                  <th>Task Status <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                  <th>Current Risk Level <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                  <th>Owner <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                  <th>Date Created <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                  <th>Age <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr key={i}>
                    <td style={{ width: 40, textAlign: 'center' }}><input type="checkbox" style={{ cursor: 'pointer' }} /></td>
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
      )}
    </>
  );
}

// ── Enhanced Due Diligence Reports layout ────────────────────────────────────
const EDD_STATUS_CONFIG = {
  draft:      { bg: 'var(--neutral-50)',    color: 'var(--text-normal)' },
  submitted:  { bg: 'var(--primary-500)',   color: '#fff' },
  delivered:  { bg: 'var(--success-500)',   color: '#fff' },
  cancelled:  { bg: 'var(--neutral-300)',   color: 'var(--text-normal)' },
};

const EDD_TABLE_ROWS = [
  { tp: 'ADIDAS ITALY SPA',              tpId: null,          subject: 'fdjhsabfbjsa FKJHSADKLFHA',                   bu: 'Entity Verification', type: 'level1',  date: '02 Apr 2024', status: 'draft',      owner: 'Nataly Baez',           ref: 'kdjnfklsad' },
  { tp: 'Apparel Empire',                tpId: null,          subject: 'Utilities Allowances',                         bu: 'Europe',              type: 'redflag', date: '14 Mar 2024', status: 'cancelled',  owner: 'Darren 1 Schafer',      ref: 'Volkswagen AG - 001' },
  { tp: 'Apparel Empire',                tpId: null,          subject: 'Vladimir Putin',                               bu: 'Europe',              type: 'redflag', date: '01 Jul 2024', status: 'submitted',  owner: 'Darren 1 Schafer',      ref: 'Vladimir' },
  { tp: 'Apparel Empire',                tpId: null,          subject: 'KJASHDKa',                                     bu: 'Europe',              type: 'level1',  date: '02 Apr 2024', status: 'draft',      owner: 'Darren 1 Schafer',      ref: 'v.mns.adnf' },
  { tp: 'Dundler Mifflin',               tpId: 'dundermifflin', subject: 'Creed Bratton',                              bu: 'test',                type: 'redflag', date: '23 Oct 2025', status: 'submitted',  owner: 'Claudio Merino',        ref: 'Dundler Mifflin', comments: true },
  { tp: 'Dundler Mifflin',               tpId: 'dundermifflin', subject: 'Michael Scott',                              bu: 'test',                type: 'redflag', date: '23 Oct 2025', status: 'draft',      owner: 'Claudio Merino',        ref: 'Dundler Mifflin' },
  { tp: 'GAZPROM, PAO',                  tpId: 'gazprom',     subject: 'GAZPROM, PAO',                                 bu: 'Entity Verification', type: 'redflag', date: '04 Nov 2025', status: 'submitted',  owner: 'Miruna Menzopol (Admin)', ref: "Roadrunner's enemies" },
  { tp: 'Gazprom',                       tpId: 'gazprom',     subject: 'Test',                                         bu: 'Europe',              type: 'redflag', date: '04 Apr 2023', status: 'submitted',  owner: 'Darren 2 Schafer',      ref: '09098' },
  { tp: 'Gazprom',                       tpId: 'gazprom',     subject: 'Gazprom',                                      bu: 'Europe',              type: 'redflag', date: '13 Jan 2026', status: 'draft',      owner: 'Darren 2 Schafer',      ref: 'Dundler Mifflin' },
  { tp: 'volkswagen',                    tpId: null,          subject: 'VOLKSWAGEN',                                   bu: 'Europe',              type: 'level1',  date: '09 Oct 2023', status: 'submitted',  owner: 'Darren 2 Schafer',      ref: 'VW1' },
  { tp: 'volkswagen',                    tpId: null,          subject: 'Oliver Blume',                                 bu: 'Europe',              type: 'redflag', date: '09 Oct 2023', status: 'submitted',  owner: 'Darren 2 Schafer',      ref: 'vw2' },
  { tp: 'volkswagen',                    tpId: null,          subject: 'Test',                                         bu: 'Europe',              type: 'level1',  date: '11 Oct 2023', status: 'submitted',  owner: 'Darren 2 Schafer',      ref: 'test 1' },
  { tp: 'volkswagen',                    tpId: null,          subject: 'Volkswagen',                                   bu: 'Europe',              type: 'redflag', date: '13 Oct 2023', status: 'draft',      owner: 'Darren 2 Schafer',      ref: 'Not Approver Group Requestor' },
  { tp: 'volkswagen',                    tpId: null,          subject: 'Test Submit Report',                           bu: 'Europe',              type: 'redflag', date: '12 Oct 2023', status: 'submitted',  owner: 'Darren 2 Schafer',      ref: 'Test Submit Report' },
  { tp: 'volkswagen',                    tpId: null,          subject: 'Test',                                         bu: 'Europe',              type: 'level1',  date: '17 Oct 2023', status: 'draft',      owner: 'Darren 2 Schafer',      ref: 'Test', comments: true, commentCount: 2 },
];

function EDDStatusBadge({ status }) {
  const cfg = EDD_STATUS_CONFIG[status] || EDD_STATUS_CONFIG.draft;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '2px 8px', borderRadius: 2,
      fontSize: 11, fontWeight: 600,
      background: cfg.bg, color: cfg.color,
      textTransform: 'uppercase', letterSpacing: '0.3px',
    }}>
      {status}
    </span>
  );
}

function EDDContent({ rows }) {
  const [search, setSearch] = useState('');
  const [view, setView] = useState('Standard');

  const filtered = search
    ? rows.filter(r =>
        r.tp.toLowerCase().includes(search.toLowerCase()) ||
        r.subject.toLowerCase().includes(search.toLowerCase()) ||
        r.owner.toLowerCase().includes(search.toLowerCase())
      )
    : rows;

  return (
    <>
      {/* Title row */}
      <div className={styles.smtHeaderRow}>
        <h2 className={styles.smtTitle}>Enhanced Due Diligence Reports</h2>
        <div className={styles.smtHeaderRight}>
          <select
            className={styles.smtSelect}
            value={view}
            onChange={e => setView(e.target.value)}
            style={{ minWidth: 140 }}
          >
            <option value="Standard">Standard</option>
            <option value="Compact">Compact</option>
          </select>
          <button className={styles.smtFilterBtn}>
            <span className="material-icons-outlined" style={{ fontSize: 16 }}>filter_list</span>
          </button>
        </div>
      </div>

      {/* Toolbar row */}
      <div className={styles.smtToolbar}>
        <div className={styles.smtToolbarLeft}>
          <div className={styles.searchWrap} style={{ maxWidth: 396 }}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Quick Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <span className="material-icons-outlined" style={{ position: 'absolute', right: 8, color: 'var(--text-light)', fontSize: 18, pointerEvents: 'none' }}>search</span>
          </div>
          <button className={styles.refreshBtn} title="Reset" onClick={() => setSearch('')}>
            <span className="material-icons-outlined" style={{ fontSize: 18 }}>refresh</span>
          </button>
          <span className={styles.resultCount}>
            Showing results {filtered.length === 0 ? '0 - 0' : `1 – ${filtered.length}`} of {filtered.length}
          </span>
        </div>
        <div className={styles.smtToolbarRight}>
          <button className={styles.smtExportBtn}>
            Export
            <span className="material-icons-outlined" style={{ fontSize: 16, color: 'var(--neutral-300)' }}>download</span>
          </button>
          <button className={styles.smtSaveBtn}>Save</button>
          <button className={styles.smtSaveBtn}>Save As</button>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className={styles.smtEmptyBanner}>
          <span className="material-icons-outlined" style={{ fontSize: 18, flexShrink: 0 }}>warning</span>
          <span>Currently we do not have records matching your search criteria.</span>
        </div>
      ) : (
        <>
          <div className={styles.tableWrap}>
            <table className={styles.table} style={{ minWidth: 0 }}>
              <thead>
                <tr>
                  <th>Third Party Name <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                  <th>Report Subject <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                  <th>Business Unit <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                  <th>Report Type <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                  <th>Date Created <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                  <th>Status <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                  <th>Owner <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                  <th>Reference <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
                  <th style={{ width: 44 }} />
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr key={i}>
                    <td>
                      {row.tpId
                        ? <Link to={`/profile/${row.tpId}`} className={styles.cellLink}>{row.tp}</Link>
                        : <span className={styles.cellLink}>{row.tp}</span>}
                    </td>
                    <td>
                      {row.tpId
                        ? <Link to={`/profile/${row.tpId}`} className={styles.cellLink}>{row.subject}</Link>
                        : <span className={styles.cellLink}>{row.subject}</span>}
                    </td>
                    <td>{row.bu}</td>
                    <td>{row.type}</td>
                    <td>{row.date}</td>
                    <td><EDDStatusBadge status={row.status} /></td>
                    <td>{row.owner}</td>
                    <td>{row.ref}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button className={styles.eddCommentBtn} title="Comments">
                        <span className="material-icons-outlined" style={{ fontSize: 16 }}>chat_bubble_outline</span>
                        {row.commentCount > 0 && <span className={styles.alertBadge}>{row.commentCount}</span>}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.divider} />
          <TablePagination count={filtered.length} total={rows.length} />
        </>
      )}
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
  const [activeChip, setActiveChip] = useState('dueNow'); // null | 'dueNow' | 'upcoming'
  const [selectedIndices, setSelectedIndices] = useState(new Set());

  const isSM  = activeTab === 'Screening & Monitoring';
  const isSMT = activeTab === 'Screening & Monitoring Tasks';
  const isEDD = activeTab === 'Enhanced Due Diligence Reports';

  const baseRows = isSM ? SM_ROWS
    : isSMT ? SMT_ROWS
    : isEDD ? EDD_TABLE_ROWS
    : ACTIONS_ROWS;

  // chip sub-tab filtering only applies on Actions tab
  const chipFiltered = (activeTab === 'Actions' && activeChip === 'dueNow')
    ? baseRows.filter(r => r.dueNow)
    : (activeTab === 'Actions' && activeChip === 'upcoming')
    ? baseRows.filter(r => r.upcoming)
    : baseRows;

  const currentRows = chipFiltered;

  const visibleCount = search
    ? currentRows.filter(r =>
        isSM
          ? (r.tpName + r.shortName).toLowerCase().includes(search.toLowerCase())
          : (r.name + r.tp + r.type).toLowerCase().includes(search.toLowerCase())
      ).length
    : currentRows.length;

  return (
    <PageLayout>
      <div className={styles.card} style={{ marginTop: 16 }}>
        {/* Tab bar */}
        <div className={styles.tabBar}>
          {TABS.map(tab => (
            <div
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => { setActiveTab(tab); setSearch(''); setActiveChip(null); setSelectedIndices(new Set()); }}
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

        {/* SMT / EDD tabs have their own full layout */}
        {isSMT ? (
          <div className={styles.smtWrap}>
            <SMTContent rows={SMT_ROWS} />
          </div>
        ) : isEDD ? (
          <div className={styles.smtWrap}>
            <EDDContent rows={EDD_TABLE_ROWS} />
          </div>
        ) : (
          <>
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

            {/* Sub-tab chips */}
            <div className={styles.chipRow}>
              <Chip
                label="Actions Due Now"
                selected={activeChip === 'dueNow'}
                count={ACTIONS_ROWS.filter(r => r.dueNow).length}
                onClick={() => { setActiveChip(v => v === 'dueNow' ? null : 'dueNow'); setSelectedIndices(new Set()); }}
              />
              <Chip
                label="Upcoming Actions"
                selected={activeChip === 'upcoming'}
                count={ACTIONS_ROWS.filter(r => r.upcoming).length}
                onClick={() => { setActiveChip(v => v === 'upcoming' ? null : 'upcoming'); setSelectedIndices(new Set()); }}
              />
              <div style={{ flex: 1 }} />
              <button
                className={styles.reassignBtn}
                disabled={selectedIndices.size === 0}
                style={{ opacity: selectedIndices.size === 0 ? 0.4 : 1, cursor: selectedIndices.size === 0 ? 'not-allowed' : 'pointer' }}
              >
                REASSIGN
              </button>
            </div>

            {/* Table */}
            {isSM
              ? <SMTable rows={SM_ROWS} search={search} />
              : activeChip === 'upcoming'
              ? <UpcomingTable rows={currentRows} search={search} selected={selectedIndices} onSelect={setSelectedIndices} />
              : <ActionsTable rows={currentRows} search={search} selected={selectedIndices} onSelect={setSelectedIndices} />
            }

          </>
        )}
      </div>
    </PageLayout>
  );
}
