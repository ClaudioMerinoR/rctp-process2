import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import PageLayout from '../components/layout/PageLayout';
import Breadcrumb from '../components/layout/Breadcrumb';
import styles from './Settings.module.css';

const SIDEBAR_ITEMS = {
  General: [
    'Currency & Approval Groups',
    'Duplication',
    'Risk Scoring Settings',
    'Red Flags',
    'Mitigation Measures',
    'Approvals',
    'Renewals',
    'Notifications',
    'Lists',
    'Private Lists',
    'Screening & Monitoring',
  ],
  Process: [
    'Stages',
    'Screening & Monitoring',
    'Pre-Onboarding Entity Verification',
    'Enhanced Due Diligence Reports',
    'Integrity Check Report Review',
    'Reminders',
  ],
};

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function unslugify(slug, tab) {
  const items = SIDEBAR_ITEMS[tab] || [];
  return items.find(i => slugify(i) === slug) || items[0];
}

const ROWS = [
  { version: 47, createdBy: 'Claudio Merino', createdDate: '11 Feb 2025', modifiedBy: 'Claudio Merino', modifiedDate: '11 Feb 2025', published: true },
  { version: 46, createdBy: 'Claudio Merino', createdDate: '11 Feb 2025', modifiedBy: 'Claudio Merino', modifiedDate: '11 Feb 2025', published: false },
  { version: 45, createdBy: 'Claudio Merino', createdDate: '03 Feb 2025', modifiedBy: 'Claudio Merino', modifiedDate: '03 Feb 2025', published: true },
  { version: 44, createdBy: 'Claudio Merino', createdDate: '03 Feb 2025', modifiedBy: 'Claudio Merino', modifiedDate: '03 Feb 2025', published: false },
  { version: 43, createdBy: 'Claudio Merino', createdDate: '03 Feb 2025', modifiedBy: 'Claudio Merino', modifiedDate: '03 Feb 2025', published: false },
  { version: 42, createdBy: 'Claudio Merino', createdDate: '03 Feb 2025', modifiedBy: 'Claudio Merino', modifiedDate: '03 Feb 2025', published: true },
  { version: 41, createdBy: 'Claudio Merino', createdDate: '03 Feb 2025', modifiedBy: 'Claudio Merino', modifiedDate: '03 Feb 2025', published: false },
  { version: 40, createdBy: 'Claudio Merino', createdDate: '03 Feb 2025', modifiedBy: 'Claudio Merino', modifiedDate: '03 Feb 2025', published: false },
  { version: 39, createdBy: 'Claudio Merino', createdDate: '30 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '30 Jan 2025', published: true },
  { version: 38, createdBy: 'Claudio Merino', createdDate: '30 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '30 Jan 2025', published: false },
  { version: 37, createdBy: 'Claudio Merino', createdDate: '30 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '30 Jan 2025', published: false },
  { version: 36, createdBy: 'Claudio Merino', createdDate: '30 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '30 Jan 2025', published: true },
  { version: 35, createdBy: 'Claudio Merino', createdDate: '29 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '29 Jan 2025', published: false },
  { version: 34, createdBy: 'Claudio Merino', createdDate: '29 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '29 Jan 2025', published: false },
  { version: 33, createdBy: 'Claudio Merino', createdDate: '21 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '21 Jan 2025', published: true },
  { version: 32, createdBy: 'Claudio Merino', createdDate: '21 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '21 Jan 2025', published: false },
  { version: 31, createdBy: 'Claudio Merino', createdDate: '21 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '21 Jan 2025', published: false },
  { version: 30, createdBy: 'Claudio Merino', createdDate: '21 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '21 Jan 2025', published: false },
  { version: 29, createdBy: 'Claudio Merino', createdDate: '13 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '13 Jan 2025', published: true },
  { version: 28, createdBy: 'Claudio Merino', createdDate: '13 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '13 Jan 2025', published: false },
  { version: 27, createdBy: 'Claudio Merino', createdDate: '13 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '13 Jan 2025', published: false },
  { version: 26, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: true },
  { version: 25, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: false },
  { version: 24, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: false },
  { version: 23, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: false },
  { version: 22, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: false },
  { version: 21, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: false },
  { version: 20, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: true },
  { version: 19, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: false },
  { version: 18, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: false },
  { version: 17, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: false },
  { version: 16, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: false },
  { version: 15, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: false },
  { version: 14, createdBy: 'Claudio Merino', createdDate: '18 Dec 2024', modifiedBy: 'Claudio Merino', modifiedDate: '18 Dec 2024', published: true },
  { version: 13, createdBy: 'Claudio Merino', createdDate: '18 Dec 2024', modifiedBy: 'Claudio Merino', modifiedDate: '18 Dec 2024', published: false },
  { version: 12, createdBy: 'Claudio Merino', createdDate: '16 Dec 2024', modifiedBy: 'Claudio Merino', modifiedDate: '18 Dec 2024', published: false },
  { version: 11, createdBy: 'Claudio Merino', createdDate: '16 Dec 2024', modifiedBy: 'Claudio Merino', modifiedDate: '18 Dec 2024', published: true },
  { version: 10, createdBy: 'Claudio Merino', createdDate: '16 Dec 2024', modifiedBy: 'Claudio Merino', modifiedDate: '18 Dec 2024', published: false },
  { version: 9,  createdBy: 'Claudio Merino', createdDate: '16 Dec 2024', modifiedBy: 'Claudio Merino', modifiedDate: '18 Dec 2024', published: false },
  { version: 8,  createdBy: 'Claudio Merino', createdDate: '16 Dec 2024', modifiedBy: 'Claudio Merino', modifiedDate: '16 Dec 2024', published: false },
  { version: 7,  createdBy: 'Claudio Merino', createdDate: '16 Dec 2024', modifiedBy: 'Claudio Merino', modifiedDate: '16 Dec 2024', published: true },
  { version: 6,  createdBy: 'Claudio Merino', createdDate: '16 Dec 2024', modifiedBy: 'Claudio Merino', modifiedDate: '16 Dec 2024', published: false },
  { version: 5,  createdBy: 'Claudio Merino', createdDate: '12 Dec 2024', modifiedBy: 'Claudio Merino', modifiedDate: '12 Dec 2024', published: false },
  { version: 4,  createdBy: 'Barry Marbles',  createdDate: '05 Dec 2022', modifiedBy: 'Barry Marbles',  modifiedDate: '05 Dec 2022', published: true },
  { version: 3,  createdBy: 'Barry Marbles',  createdDate: '05 Dec 2022', modifiedBy: 'Barry Marbles',  modifiedDate: '05 Dec 2022', published: false },
  { version: 2,  createdBy: 'Barry Marbles',  createdDate: '05 Dec 2022', modifiedBy: 'Barry Marbles',  modifiedDate: '05 Dec 2022', published: false },
  { version: 1,  createdBy: 'System',         createdDate: '05 Dec 2022', modifiedBy: 'System',         modifiedDate: '05 Dec 2022', published: false },
];

/* ── Stages data ── */
const STAGES_COLS = ['Enabled', 'Low Risk', 'Medium Risk', 'High Risk'];
// perms: [enabled, lowRisk, medRisk, highRisk]
// null = N/A, true/false = checkable
const STAGES_ROWS = [
  { name: 'Risk Assessment',             info: true, perms: [true,  null,  null,  null ] },
  { name: 'Due Diligence',               info: true, perms: [null,  null,  null,  null ], expandable: true,
    children: [
      { name: 'Internal Due Diligence',  info: true, perms: [null,  null,  true,  null ] },
      { name: 'External Due Diligence',  info: true, perms: [null,  null,  true,  null ] },
    ],
  },
  { name: 'Enhanced Due Diligence Report', info: true, perms: [null, null, null,  null ] },
  { name: 'Integrity Check',             info: true, perms: [null,  null,  null,  null ] },
  { name: 'UBO',                         info: true, perms: [null,  null,  null,  true ] },
  { name: 'Monitoring Required',         info: true, perms: [true,  null,  null,  null ] },
  { name: 'Auto Approval',               info: true, perms: [null,  null,  null,  null ] },
];

function buildStagesState(rows) {
  const flat = {};
  function process(r) {
    flat[r.name] = r.perms.map(v => v);
    if (r.children) r.children.forEach(process);
  }
  rows.forEach(process);
  return flat;
}

function StagesPanel() {
  const [isEditing, setIsEditing] = useState(false);
  const [expanded, setExpanded] = useState({ 'Due Diligence': true });
  const [perms, setPerms] = useState(() => buildStagesState(STAGES_ROWS));
  const [draft, setDraft] = useState(() => buildStagesState(STAGES_ROWS));
  const [approvalAutoStart, setApprovalAutoStart] = useState(false);

  function handleEdit() { setDraft({ ...perms }); setIsEditing(true); }
  function handleCancel() { setIsEditing(false); }
  function handleSave() { setPerms({ ...draft }); setIsEditing(false); }
  function togglePerm(name, colIdx) {
    setDraft(prev => ({
      ...prev,
      [name]: prev[name].map((v, i) => i === colIdx && typeof v === 'boolean' ? !v : v),
    }));
  }

  const state = isEditing ? draft : perms;

  function renderRow(row, indent = false) {
    const rowPerms = state[row.name] ?? row.perms;
    return (
      <tr key={row.name} className={indent ? styles.stagesRowIndent : ''}>
        <td className={styles.stagesTdName}>
          <div className={styles.stagesTdNameInner}>
            {row.expandable && (
              <span
                className={`material-icons-outlined ${styles.stagesChevron}${expanded[row.name] ? ' ' + styles.stagesChevronOpen : ''}`}
                onClick={() => setExpanded(p => ({ ...p, [row.name]: !p[row.name] }))}
              >chevron_right</span>
            )}
            {indent && <span className={styles.stagesIndentSpacer} />}
            {row.name}
            {row.info && <span className={`material-icons-outlined ${styles.stagesInfoIcon}`}>info</span>}
          </div>
        </td>
        {rowPerms.map((val, j) => (
          <td key={j} className={styles.stagesTdPerm}>
            {val === null ? null
              : typeof val === 'string' ? <span className={styles.stagesPeriodText}>{val}</span>
              : isEditing
                ? <input type="checkbox" className={styles.stagesCheckbox} checked={val} onChange={() => togglePerm(row.name, j)} />
                : val ? <span className={`material-icons-outlined ${styles.stagesCheck}`}>check</span> : null
            }
          </td>
        ))}
      </tr>
    );
  }

  function renderRows(rows) {
    const out = [];
    rows.forEach(row => {
      out.push(renderRow(row, false));
      if (row.children && expanded[row.name]) {
        row.children.forEach(child => out.push(renderRow(child, true)));
      }
    });
    return out;
  }

  return (
    <div className={styles.stagesPanel}>

      {/* Header */}
      <div className={styles.stagesHeader}>
        <h2 className={styles.contentTitle}>Stages</h2>
        <div className={styles.contentActions}>
          {isEditing ? (
            <>
              <button className={`${styles.btn} ${styles.btnOutline}`} onClick={handleCancel}>Cancel</button>
              <button className={`${styles.btn} ${styles.btnFilled}`} onClick={handleSave}>Save</button>
            </>
          ) : (
            <button className={`${styles.btn} ${styles.btnFilled}`} onClick={handleEdit}>Edit</button>
          )}
        </div>
      </div>

      {/* Main table */}
      <div className={styles.stagesTableWrap}>
        <table className={styles.stagesTable}>
          <thead>
            <tr>
              <th className={styles.stagesThName}>Name</th>
              {STAGES_COLS.map(col => (
                <th key={col} className={styles.stagesTh}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {renderRows(STAGES_ROWS)}
          </tbody>
        </table>
      </div>

      {/* Footer row — Approval Auto Start */}
      <div className={styles.stagesFooter}>
        <div className={styles.stagesFooterCell}>
          <span>Approval Auto Start</span>
          <span className={`material-icons-outlined ${styles.stagesInfoIcon}`}>info</span>
        </div>
        <div className={styles.stagesFooterBadge}>
          <div
            className={`${styles.stagesBadge}${approvalAutoStart ? ' ' + styles.stagesBadgeActive : ' ' + styles.stagesBadgeInactive}`}
            onClick={() => isEditing && setApprovalAutoStart(v => !v)}
            style={{ cursor: isEditing ? 'pointer' : 'default' }}
          >
            {approvalAutoStart ? 'ACTIVE' : 'INACTIVE'}
          </div>
        </div>
      </div>

    </div>
  );
}

const CURRENCY_OPTIONS = ['EUR €', 'USD $', 'GBP £', 'CHF ₣', 'JPY ¥'];
const LANGUAGE_OPTIONS = ['English', 'French', 'German', 'Spanish'];
const APPROVAL_GROUP_OPTIONS = [
  'Not Approval Group',
  'This is the name of my default group',
  'Test Group A',
  'Test Group B',
];

function CurrencyApprovalGroupsPanel() {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState({
    currency: 'EUR €',
    language: 'English',
    eddGroup: 'This is the name of my default group',
    riskGroup: 'This is the name of my default group',
    redFlagGroup: 'This is the name of my default group',
  });
  const [draft, setDraft] = useState(data);

  function handleEdit() { setDraft({ ...data }); setIsEditing(true); }
  function handleCancel() { setIsEditing(false); }
  function handleSave() { setData({ ...draft }); setIsEditing(false); }
  function set(key, val) { setDraft(prev => ({ ...prev, [key]: val })); }

  const d = isEditing ? draft : data;

  return (
    <div className={styles.cagPanel}>

      {/* Header */}
      <div className={styles.cagHeader}>
        <h2 className={styles.contentTitle}>Currency &amp; Approval Groups</h2>
        <div className={styles.cagHeaderRight}>
          <div className={styles.langSelector}>
            <div className={styles.langFlag}>
              <span className="material-icons-outlined" style={{ fontSize: 16 }}>translate</span>
            </div>
            {isEditing ? (
              <select className={styles.langSelect} value={d.language} onChange={e => set('language', e.target.value)}>
                {LANGUAGE_OPTIONS.map(l => <option key={l}>{l}</option>)}
              </select>
            ) : (
              <div className={styles.langValue}>{d.language}</div>
            )}
          </div>
          {isEditing ? (
            <>
              <button className={`${styles.btn} ${styles.btnOutline}`} onClick={handleCancel}>Cancel</button>
              <button className={`${styles.btn} ${styles.btnFilled}`} onClick={handleSave}>Save</button>
            </>
          ) : (
            <button className={`${styles.btn} ${styles.btnFilled}`} onClick={handleEdit}>Edit</button>
          )}
        </div>
      </div>

      {/* Currency */}
      <div className={styles.cagSection}>
        <label className={styles.cagLabel}>Currency</label>
        {isEditing ? (
          <select className={styles.cagSelect} value={d.currency} onChange={e => set('currency', e.target.value)}>
            {CURRENCY_OPTIONS.map(c => <option key={c}>{c}</option>)}
          </select>
        ) : (
          <div className={styles.cagValue}>{d.currency}</div>
        )}
      </div>

      <div className={styles.cagDivider} />

      {/* Approval group fields */}
      {[
        { key: 'eddGroup',     label: 'Enhanced Due Diligence (EDD) Report Approval Group', required: true },
        { key: 'riskGroup',    label: 'Manual Risk Level Amendment Approval Group',          required: true },
        { key: 'redFlagGroup', label: 'Red Flag Cancel Approval',                            required: true },
      ].map(({ key, label, required }) => (
        <div key={key} className={styles.cagSection}>
          <label className={styles.cagLabel}>
            {label}
            {required && <span className={styles.cagReq}> *</span>}
            <span className={`material-icons-outlined ${styles.cagInfoIcon}`}>info</span>
          </label>
          {isEditing ? (
            <select className={styles.cagSelect} value={d[key]} onChange={e => set(key, e.target.value)}>
              {APPROVAL_GROUP_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          ) : (
            <div className={styles.cagValue}>{d[key]}</div>
          )}
        </div>
      ))}

    </div>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const { tab: tabParam, section: sectionParam } = useParams();

  const activeTopTab = tabParam
    ? Object.keys(SIDEBAR_ITEMS).find(t => slugify(t) === tabParam) || 'General'
    : 'General';

  const activeNav = sectionParam ? unslugify(sectionParam, activeTopTab) : SIDEBAR_ITEMS[activeTopTab][0];

  function handleTopTabChange(tab) {
    navigate(`/settings/${slugify(tab)}/${slugify(SIDEBAR_ITEMS[tab][0])}`);
  }

  function handleNavChange(item) {
    navigate(`/settings/${slugify(activeTopTab)}/${slugify(item)}`);
  }
  const [selectedProcess, setSelectedProcess] = useState('Standard RCTP');
  const [renewalsEnabled, setRenewalsEnabled] = useState(true);
  const [reminderPeriod, setReminderPeriod] = useState('30');
  const [reminderUnit, setReminderUnit] = useState('Day(s)');
  const [reminderCount, setReminderCount] = useState('2');
  const [reminderDaysBetween, setReminderDaysBetween] = useState('3');
  const [notificationGroup, setNotificationGroup] = useState('Not Approval Group');

  return (
    <PageLayout>
      <Breadcrumb
        items={[
          { label: 'Settings', to: `/settings/${slugify(activeTopTab)}/${slugify(activeNav)}` },
          { label: activeTopTab },
          { label: activeNav },
        ]}
      />

      {/* Top tabs */}
      <div className={styles.topTabsBar}>
        <div className={styles.topTabs}>
          {Object.keys(SIDEBAR_ITEMS).map(tab => (
            <div
              key={tab}
              className={`${styles.topTab}${activeTopTab === tab ? ' ' + styles.topTabActive : ''}`}
              onClick={() => handleTopTabChange(tab)}
              style={{ position: 'relative' }}
            >
              {tab}
              {activeTopTab === tab && (
                <motion.div
                  layoutId="settings-top-tab-indicator"
                  className={styles.topTabIndicator}
                  transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.sectionGap} />

      {/* Two-column layout */}
      <div className={styles.adminLayout}>

        {/* Left sidebar nav */}
        <nav className={styles.adminNav}>
          {activeTopTab === 'Process' && (
            <div className={styles.processPickerWrap}>
              <select
                className={styles.processPicker}
                value={selectedProcess}
                onChange={e => setSelectedProcess(e.target.value)}
              >
                <option>Standard RCTP</option>
                <option>Enhanced Due Diligence</option>
                <option>Basic Screening</option>
              </select>
            </div>
          )}
          {SIDEBAR_ITEMS[activeTopTab].map(item => (
            <button
              key={item}
              className={`${styles.adminNavItem}${activeNav === item ? ' ' + styles.adminNavItemActive : ''}`}
              onClick={() => handleNavChange(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Right column */}
        <div className={styles.contentStack}>

          {activeNav === 'Stages' && <StagesPanel />}

          {activeNav === 'Currency & Approval Groups' && <CurrencyApprovalGroupsPanel />}

          {activeNav === 'Renewals' && <>
          {/* Card 1: title + toggle */}
          <div className={styles.cardTitle}>
            <h2 className={styles.contentTitle}>Renewals</h2>
            <div className={styles.contentHeaderRight}>
              <span className={styles.renewalsStateLabel}>Renewals current state</span>
              <span className={styles.infoIconWrap}>
                <span className={`material-icons-outlined ${styles.infoIcon}`}>info</span>
                <span className={styles.infoTooltip}>If set to Enabled renewal dates will be calculated for any records approved after the setting was set to enabled.</span>
              </span>
              <div
                className={`${styles.activeToggle}${!renewalsEnabled ? ' ' + styles.activeToggleOff : ''}`}
                onClick={() => setRenewalsEnabled(v => !v)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setRenewalsEnabled(v => !v)}
              >
                <div className={styles.activeToggleTrack}>{renewalsEnabled ? 'Enabled' : 'Disabled'}</div>
                <div className={styles.activeToggleThumb} />
              </div>
            </div>
          </div>

          {/* Card 2: Reminder & Notification Settings */}
          <div className={styles.cardSettings}>
            <div className={styles.settingsRow}>

              {/* Reminder Settings */}
              <div className={styles.settingsBlockReminder}>
                <p className={styles.settingsBlockTitle}>Reminder Settings</p>
                <div className={styles.reminderFields}>
                  <div className={styles.reminderField}>
                    <label className={styles.fieldLabel}>
                      Period before Renewals <span className={styles.required}>*</span>
                    </label>
                    <div className={styles.periodInputRow}>
                      <input
                        className={`${styles.fieldInput} ${styles.fieldInputNarrow}`}
                        value={reminderPeriod}
                        onChange={e => setReminderPeriod(e.target.value)}
                      />
                      <select
                        className={styles.fieldSelect}
                        value={reminderUnit}
                        onChange={e => setReminderUnit(e.target.value)}
                      >
                        <option>Day(s)</option>
                        <option>Week(s)</option>
                        <option>Month(s)</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.reminderField}>
                    <label className={styles.fieldLabel}>
                      Number of reminders <span className={styles.required}>*</span>
                    </label>
                    <input
                      className={styles.fieldInput}
                      value={reminderCount}
                      onChange={e => setReminderCount(e.target.value)}
                    />
                  </div>
                  <div className={styles.reminderField}>
                    <label className={styles.fieldLabel}>
                      Days between reminder emails <span className={styles.required}>*</span>
                    </label>
                    <input
                      className={styles.fieldInput}
                      value={reminderDaysBetween}
                      onChange={e => setReminderDaysBetween(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className={styles.settingsBlockNotification}>
                <p className={styles.settingsBlockTitle}>Notification Settings</p>
                <div className={styles.reminderFields}>
                  <div className={`${styles.reminderField} ${styles.reminderFieldGrow}`}>
                    <label className={styles.fieldLabel}>
                      Renewals Notification Group <span className={styles.required}>*</span>
                    </label>
                    <select
                      className={`${styles.fieldSelect} ${styles.fieldSelectNotification}`}
                      value={notificationGroup}
                      onChange={e => setNotificationGroup(e.target.value)}
                    >
                      <option>Not Approval Group</option>
                      <option>Approval Group A</option>
                      <option>Approval Group B</option>
                    </select>
                  </div>
                  <div className={styles.saveBtnWrap}>
                    <button className={styles.saveBtn}>Save</button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Card 3: Table */}
          <div className={styles.cardTable}>
            <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Version</th>
                  <th>Created By</th>
                  <th>Created Date</th>
                  <th>Last Modified By</th>
                  <th>Last Modified Date</th>
                  <th className={styles.thCenter}>Saved/Published</th>
                  <th className={styles.thCenter}>Action</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(row => (
                  <tr key={row.version}>
                    <td>{row.version}</td>
                    <td>{row.createdBy}</td>
                    <td>{row.createdDate}</td>
                    <td>{row.modifiedBy}</td>
                    <td>{row.modifiedDate}</td>
                    <td className={styles.tdCenter}>
                      <span className={`${styles.statusDot}${row.published ? ' ' + styles.statusDotPublished : ''}`} />
                    </td>
                    <td className={styles.tdCenter}>
                      <button className={styles.actionBtn} onClick={() => navigate(`/settings/renewals/${row.version}/edit`)}>
                        <span className="material-icons-outlined">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

          </>}

        </div>
      </div>
    </PageLayout>
  );
}
