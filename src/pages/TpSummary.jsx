import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Breadcrumb from '../components/layout/Breadcrumb';
import partnerIconIntegrity from '../assets/partner-icon-integrity.png';
import partnerIconUbo from '../assets/partner-icon-ubo.png';
import iconFlag from '../assets/icon-flag.svg';
import iconInactiveOrder from '../assets/icon-inactive-order.svg';
import iconFactCheck from '../assets/icon-fact-check.svg';
import iconFinanceMode from '../assets/icon-finance-mode.svg';
import iconFrame9 from '../assets/icon-frame9.svg';
import iconArmingCountdown from '../assets/icon-arming-countdown.svg';
import styles from './TpSummary.module.css';

// ── Data ─────────────────────────────────────────────────────────────────────

const RISK_CARDS = [
  { title: 'Country',               level: 'medium', flags: 1, score: 4  },
  { title: 'Bribery & Corruption',  level: 'low',    flags: 0, score: 0  },
  { title: 'Enviromental',          level: 'low',    flags: 0, score: 0  },
  { title: 'Human Rights',          level: 'medium', flags: 1, score: 4  },
  { title: 'General',               level: 'high',   flags: 3, score: 12 },
  { title: 'Screening & Monitoring',level: 'low',    flags: 0, score: 0  },
  { title: 'Cyber',                 level: 'high',   flags: 2, score: 7  },
];

const OPEN_TASKS = [
  { type: 'Red Flag',                          icon: iconFlag,            name: 'Public or Foreign Officials Interaction',                                                    status: 'Open',        owner: 'Compliance Group',          dateCreated: '13 Nov 2025', age: '37 Days' },
  { type: 'Red Flag',                          icon: iconFlag,            name: 'High Risk Third Party Service Type',                                                          status: 'In Progress', owner: 'Compliance Group',          dateCreated: '29 Nov 2025', age: '14 Days' },
  { type: 'Questionnaire Incomplete',          icon: iconInactiveOrder,   name: 'Risk Assessment',                                                                             status: 'In Progress', owner: 'Emily Forbes',              dateCreated: '03 Dec 2025', age: '11 Days' },
  { type: 'Approval Task',                     icon: iconFactCheck,       name: 'Approval Stage 1',                                                                            status: 'Not Started', owner: 'Sustainability Team',       dateCreated: '04 Dec 2025', age: '10 Days' },
  { type: 'Enhanced Due Diligence Report Task',icon: iconFinanceMode,     name: 'Enhanced Due Diligence Report Review Task - Test RCTP Notification 4',                       status: 'Not Started', owner: 'Emily Forbes',              dateCreated: '18 Dec 2025', age: '4 Days'  },
  { type: 'Cancel Red Flag Task',              icon: iconFrame9,          name: 'Red Flag Cancellation Request',                                                               status: 'Not Started', owner: 'Red Flag Approval Group',   dateCreated: '18 Dec 2025', age: '4 Days'  },
  { type: 'Risk Level Amend Approval Stage 1', icon: iconArmingCountdown, name: 'Risk Level Amend Approval Stage 1',                                                           status: 'Not Started', owner: 'Compliance Group',          dateCreated: '21 Dec 2025', age: '1 Days'  },
];

const SCREENING_ROWS = [
  {
    name: 'Gazmash, AO',
    matches: [
      { bg: 'var(--alert-500)',   color: '#fff',               val: '91' },
      { bg: 'var(--success-500)', color: 'var(--text-normal)', val: '1'  },
      { bg: 'var(--text-light)',  color: '#fff',               val: '0'  },
      { bg: 'var(--neutral-200)', color: 'var(--text-normal)', val: '0'  },
      { bg: 'var(--warning-500)', color: 'var(--text-normal)', val: '0'  },
    ],
    updated: '20 Jun 2024',
    type: 'Primary Entity',
    statusDot: 'var(--alert-500)',
    statusLabel: 'Remediation Required',
    categories: [
      { label: 'SOC', bg: '#c38000', color: 'var(--neutral-900)' },
      { label: 'AM',  bg: '#edd500', color: 'var(--neutral-900)' },
    ],
    categoryIcon: 'pending',
    entityType: 'Entity',
  },
  {
    name: 'Gazmash, AO',
    matches: [
      { bg: 'var(--alert-500)',   color: '#fff',               val: '91' },
      { bg: 'var(--success-500)', color: 'var(--text-normal)', val: '1'  },
      { bg: 'var(--text-light)',  color: '#fff',               val: '0'  },
      { bg: 'var(--neutral-200)', color: 'var(--text-normal)', val: '0'  },
      { bg: 'var(--warning-500)', color: 'var(--text-normal)', val: '0'  },
    ],
    updated: '20 Jun 2024',
    type: 'Primary Entity',
    statusDot: 'var(--alert-500)',
    statusLabel: 'Remediation Required',
    categories: [
      { label: 'SOC', bg: '#c38000', color: 'var(--neutral-900)' },
      { label: 'AM',  bg: '#edd500', color: 'var(--neutral-900)' },
    ],
    categoryIcon: 'pending',
    entityType: 'Entity',
  },
];

const CONNECTED_ROWS = [
  { name: 'GAZPROM PAO', connType: 'Subsidiary', idType: 'DUNS Number', idValue: '644908233', intRef: 'F5543343K', country: 'Russian Federation' },
];

const SUGGESTED_ROWS = [
  { name: 'GAZMASH IO',   idType: 'DUNS Number', idValue: '788234901',   intRef: 'G9921234A', country: 'Russian Federation' },
  { name: 'NOVATEK PJSC', idType: 'LEI',         idValue: 'RU0520000045',intRef: 'N4456789B', country: 'Russian Federation' },
  { name: 'LUKOIL OAO',   idType: 'BVD ID',      idValue: 'BVD432187',   intRef: 'L3312678C', country: 'Russian Federation' },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function riskBadge(level) {
  if (level === 'high')   return { className: styles.badgeHigh,   icon: 'error_outline',       label: 'High'   };
  if (level === 'medium') return { className: styles.badgeMedium, icon: 'error_outline',        label: 'Medium' };
  return                         { className: styles.badgeLow,    icon: 'check_circle_outline', label: 'LOW'    };
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function TpSummary() {
  const [activeTab, setActiveTab] = useState('overview');

  // Connection alert state
  const [alert, setAlert] = useState(null); // { type: 'success'|'warning', message }

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Connections checkbox state
  const [checked, setChecked] = useState(SUGGESTED_ROWS.map(() => false));
  const allChecked  = checked.every(Boolean);
  const someChecked = checked.some(Boolean) && !allChecked;
  const anyChecked  = checked.some(Boolean);

  function handleSelectAll(e) {
    setChecked(checked.map(() => e.target.checked));
  }

  function handleRowCheck(i, val) {
    const next = [...checked];
    next[i] = val;
    setChecked(next);
  }

  function handleConnect() {
    setChecked(SUGGESTED_ROWS.map(() => false));
    setAlert({ type: 'success', message: 'Connection added successfully' });
    setTimeout(() => setAlert(null), 5000);
  }

  function handleDiscard() {
    setChecked(SUGGESTED_ROWS.map(() => false));
    setAlert({ type: 'warning', message: 'Connection discarded' });
    setTimeout(() => setAlert(null), 5000);
  }

  return (
    <PageLayout>
      {/* Connection alert banner */}
      {alert && (
        <div className={`${styles.connAlert} ${styles['connAlert_' + alert.type]}`}>
          <span className={`${styles.connAlertIcon} material-icons-outlined`}>
            {alert.type === 'success' ? 'check_circle' : 'remove_circle'}
          </span>
          <span className={styles.connAlertText}>{alert.message}</span>
        </div>
      )}

      {/* Delete modal */}
      {deleteModalOpen && (
        <div className={styles.deleteModalOverlay} onClick={() => setDeleteModalOpen(false)}>
          <div className={styles.deleteModal} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className={styles.deleteModalHeader}>
              <span className={styles.deleteModalTitle}>Delete a Third party</span>
              <button className={styles.deleteModalClose} aria-label="Close" onClick={() => setDeleteModalOpen(false)} />
            </div>
            <div className={styles.deleteModalBody}>
              <p className={styles.deleteModalQuestion}>Are you sure you wish to delete the following Third Party?</p>
              <p className={styles.deleteModalName}>Gazprom</p>
              <p className={styles.deleteModalConfirm}>Do you want to continue?</p>
            </div>
            <div className={styles.deleteModalActions}>
              <button className={`${styles.deleteModalBtn} ${styles.deleteModalCancel}`} onClick={() => setDeleteModalOpen(false)}>Cancel</button>
              <button className={`${styles.deleteModalBtn} ${styles.deleteModalContinue}`} onClick={() => setDeleteModalOpen(false)}>Continue</button>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Third Parties', to: '/third-parties' },
        { label: 'Gazprom' },
      ]} />

      {/* ── Top Strip ── */}
      <div className={styles.tpTopStrip}>
        <div className={styles.tpPageHeader}>
          <Link to="/third-parties" className={styles.tpBack}>
            <span className="material-icons-outlined">chevron_left</span> Back
          </Link>
          <div className={styles.tpTitleRow}>
            <div className={styles.tpNameGroup}>
              <h1>GAZPROM, PAO</h1>
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

        {/* ── Side Nav ── */}
        <aside className={styles.sideNav}>
          <div className={styles.navItemActive}>Summary page</div>
          <div className={styles.navDivider} />

          <div className={styles.navItem}><span className={`${styles.dot} ${styles.dotRed}`} /> Risk Assessment</div>
          <div className={styles.navItem}><span className={`${styles.dot} ${styles.dotGrey}`} /> Due Diligence</div>

          <div className={styles.navItem}>
            <div className={styles.navItemWrap}>
              <span className={`${styles.dot} ${styles.dotRed}`} />
              Integrity Check
              <span className={styles.navPartnerIconWrap}>
                <span className={styles.navPartnerIcon}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" fill="white" stroke="#B1BCC5" /></svg>
                  <img src={partnerIconIntegrity} alt="" />
                </span>
                <span className={styles.navTooltip}>Powered by Xapiens</span>
              </span>
              <span className={styles.navNewTag}>New</span>
            </div>
          </div>

          <div className={styles.navItem}><span className={`${styles.dot} ${styles.dotGrey}`} /> Enhanced Due Diligence Reports</div>

          <div className={styles.navItem}>
            <span className={`${styles.dot} ${styles.dotGreen}`} /> UBO
            <span className={styles.navPartnerIconWrap}>
              <span className={styles.navPartnerIcon}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" fill="white" stroke="#B1BCC5" /></svg>
                <img src={partnerIconUbo} alt="" />
              </span>
              <span className={styles.navTooltip}>Powered by Duns &amp; Bradstreet</span>
            </span>
          </div>

          <div className={styles.navItem}><span className={`${styles.dot} ${styles.dotRed}`} /> Risk Mitigation</div>
          <div className={styles.navItem}><span className={`${styles.dot} ${styles.dotAmber}`} /> Approval</div>
          <div className={styles.navItem}><span className={`${styles.dot} ${styles.dotRed}`} /> Screening &amp; Monitoring</div>
          <div className={styles.navDivider} />

          <div className={styles.navSectionLabel}>Properties</div>
          <div className={styles.navSectionLabel}>Documents</div>
          <div className={styles.navSectionLabel}>
            Entity Verification
            <span className={styles.navPartnerIconWrap} style={{ marginLeft: 4 }}>
              <span className={styles.navPartnerIcon}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" fill="white" stroke="#B1BCC5" /></svg>
                <img src={partnerIconUbo} alt="" />
              </span>
              <span className={styles.navTooltip}>Powered by Duns &amp; Bradstreet</span>
            </span>
          </div>
          <div className={styles.navSectionLabel}>Audit</div>
          <div className={styles.navDivider} />
        </aside>

        {/* ── Main Content ── */}
        <main className={styles.mainContent}>

          {/* Details Card */}
          <section className={`${styles.card} ${styles.detailsCard}`}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Gazprom Details</h2>
              <div className={styles.cardHeaderRight}>
                <div className={styles.statusInline}>
                  Third party STATUS:
                  <span className={styles.activeText}>Active</span>
                  <span className="material-icons-outlined" style={{ fontSize: 16, color: 'var(--success-700)' }}>verified</span>
                </div>
                <button className={`${styles.btn} ${styles.btnOutline}`}>Notes</button>
                <button className={`${styles.btn} ${styles.btnFilled}`}>Edit</button>
              </div>
            </div>

            <div className={styles.tabs}>
              {['overview', 'additional', 'connections'].map(tab => (
                <div
                  key={tab}
                  className={`${styles.tab}${activeTab === tab ? ' ' + styles.tabActive : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'overview' ? 'Overview' : tab === 'additional' ? 'Additional Details' : 'Connections'}
                </div>
              ))}
            </div>

            <div className={styles.tabPanels}>

              {/* Overview */}
              {activeTab === 'overview' && (
                <div className={styles.tabPanel}>
                  <div className={styles.fieldGrid}>
                    <div><div className={styles.fieldLabel}>Legal name</div><div className={styles.fieldValue}>Gazprom</div></div>
                    <div><div className={styles.fieldLabel}>Industry / Sector</div><div className={styles.fieldValue}>Energy</div></div>
                    <div><div className={styles.fieldLabel}>Third Party Owner</div><div className={styles.fieldValue}>Tamara Knoetschke</div></div>
                    <div><div className={styles.fieldLabel}>Process Name</div><div className={styles.fieldValue}>Standard RCTP</div></div>
                    <div>
                      <div className={styles.fieldLabel}>Country of Registration</div>
                      <div className={`${styles.fieldValue} ${styles.fieldValueFlag}`}>
                        <span style={{ fontSize: 20 }}>&#127479;&#127482;</span> Russia
                      </div>
                    </div>
                    <div><div className={styles.fieldLabel}>Third Party Contact Email</div><div className={styles.fieldValue}>claudio@gazprom.com</div></div>
                    <div><div className={styles.fieldLabel}>Business Unit</div><div className={styles.fieldValue}>Global</div></div>
                    <div><div className={styles.fieldLabel}>Screening &amp; Monitoring Policy</div><div className={styles.fieldValue}>Default Screening &amp; Monitoring Policy</div></div>
                    <div><div className={styles.fieldLabel}>Entity Type</div><div className={styles.fieldValue}>Entity</div></div>
                    <div><div className={styles.fieldLabel}>Commercial Significance</div><div className={styles.fieldValue}>[Between 1 and 5%] / Significant / Not in top 10</div></div>
                    <div><div className={styles.fieldLabel}>Expiry date</div><div className={styles.fieldValue}>&mdash;</div></div>
                    <div><div className={styles.fieldLabel}>Tags</div><div className={styles.fieldValue}>&mdash;</div></div>
                  </div>
                </div>
              )}

              {/* Additional Details */}
              {activeTab === 'additional' && (
                <div className={styles.tabPanel}>
                  <div className={styles.fieldGrid}>
                    <div><div className={styles.fieldLabel}>Also Known As</div><div className={styles.fieldValue}>Gazmash</div></div>
                    <div><div className={styles.fieldLabel}>Responsible Client Unit</div><div className={styles.fieldValue}>Procurement (Central, direct material)</div></div>
                    <div><div className={styles.fieldLabel}>Company Number</div><div className={styles.fieldValue}>587762367</div></div>
                    <div><div className={styles.fieldLabel}>Identification Type</div><div className={styles.fieldValue}>DUNS Number</div></div>
                    <div><div className={styles.fieldLabel}>Address Details</div><div className={styles.fieldValue}>Primorskiy Prospekt, 54/1A/1N</div></div>
                    <div><div className={styles.fieldLabel}>All Relevant Client Units</div><div className={styles.fieldValue}>Business Unit 1, Business Unit 2, Business Unit 3</div></div>
                    <div><div className={styles.fieldLabel}>Internal Reference or ID</div><div className={styles.fieldValue}>123GAZ789</div></div>
                    <div><div className={styles.fieldLabel}>Identification Value</div><div className={styles.fieldValue}>366162464</div></div>
                    <div><div className={styles.fieldLabel}>Company Website</div><div className={styles.fieldValue}><a href="https://www.gazprom.ru" className={styles.fieldLink}>www.gazprom.ru</a></div></div>
                  </div>
                </div>
              )}

              {/* Connections */}
              {activeTab === 'connections' && (
                <div className={styles.tabPanel}>
                  <h3 className={styles.connSectionTitle}>Connected Third Parties</h3>
                  <div className={styles.connTableWrap}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Third Party Name</th>
                          <th>Connection Type</th>
                          <th>ID Type</th>
                          <th>ID Value</th>
                          <th>Internal Reference or ID</th>
                          <th>Country of Registration</th>
                          <th style={{ width: 32 }} />
                        </tr>
                      </thead>
                      <tbody>
                        {CONNECTED_ROWS.map((r, i) => (
                          <tr key={i}>
                            <td><span className={styles.cellLink}>{r.name}</span></td>
                            <td>{r.connType}</td>
                            <td>{r.idType}</td>
                            <td>{r.idValue}</td>
                            <td>{r.intRef}</td>
                            <td>{r.country}</td>
                            <td className={styles.moreMenu}><span className="material-icons-outlined" style={{ fontSize: 18 }}>more_vert</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className={styles.connSubHeader}>
                    <h3 className={styles.connSectionTitle} style={{ marginBottom: 0 }}>Suggested Third Parties</h3>
                    <div className={styles.connActions}>
                      <button className={`${styles.btn} ${styles.btnDiscard}`} disabled={!anyChecked} onClick={handleDiscard}>Discard</button>
                      <button className={`${styles.btn} ${styles.btnConnect}`} disabled={!anyChecked} onClick={handleConnect}>Connect</button>
                    </div>
                  </div>

                  <div className={styles.connTableWrap}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th style={{ width: 32 }}>
                            <input
                              type="checkbox"
                              checked={allChecked}
                              ref={el => { if (el) el.indeterminate = someChecked; }}
                              onChange={handleSelectAll}
                            />
                          </th>
                          <th>Third Party Name</th>
                          <th>ID Type</th>
                          <th>ID Value</th>
                          <th>Internal Reference or ID</th>
                          <th>Country of Registration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SUGGESTED_ROWS.map((r, i) => (
                          <tr key={i}>
                            <td><input type="checkbox" checked={checked[i]} onChange={e => handleRowCheck(i, e.target.checked)} /></td>
                            <td><span className={styles.cellLink}>{r.name}</span></td>
                            <td>{r.idType}</td>
                            <td>{r.idValue}</td>
                            <td>{r.intRef}</td>
                            <td>{r.country}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className={styles.connLookMore}>
                    <button className={`${styles.btn} ${styles.btnOutline} ${styles.btnSearch}`}>
                      <span className="material-icons-outlined" style={{ fontSize: 16 }}>search</span>
                      Look for more connections
                    </button>
                  </div>
                </div>
              )}

            </div>
          </section>

          {/* Risk Level Report */}
          <section className={styles.riskReport}>
            <div className={styles.sectionRow}>
              <h2 className={styles.cardTitle}>Risk Level Report</h2>
              <span className={styles.linkText}>VIEW FULL REPORT</span>
            </div>
            <div className={styles.riskRow}>
              {RISK_CARDS.map((rc, i) => {
                const b = riskBadge(rc.level);
                return (
                  <div key={i} className={`${styles.rcard} ${styles['rcard_' + rc.level]}`}>
                    <div className={styles.rcardTitle}>{rc.title}</div>
                    <span className={`${styles.rcardLbl} ${styles.lblRisk}`}>Risk Level</span>
                    <span className={`${styles.rcardLbl} ${styles.lblFlags}`}>Red flags</span>
                    <span className={`${styles.rcardLbl} ${styles.lblScore}`}>Category score</span>
                    <span className={`${styles.rcardVal} ${styles.valFlags}`}>{rc.flags}</span>
                    <span className={`${styles.rcardVal} ${styles.valScore}`}>{rc.score}</span>
                    <span className={styles.rcardBadge}>
                      <span className={`${styles.badge} ${b.className}`} style={{ fontSize: 12, padding: '4px 8px' }}>
                        {b.label}
                        <span className="material-icons-outlined" style={{ fontSize: 14, verticalAlign: 'middle' }}>{b.icon}</span>
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Open Tasks */}
          <section className={styles.tableCard}>
            <div className={styles.sectionBar}>
              <div className={styles.sectionRowSmall}>
                <h2 className={styles.cardTitle}>Open Tasks</h2>
                <span className={`material-icons-outlined ${styles.infoIcon}`}>info</span>
              </div>
            </div>
            <div className={styles.cardInner}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th style={{ width: '20%' }}>Task Type <span className="material-icons-outlined" style={{ fontSize: 14, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
                    <th style={{ width: '26%' }}>Task Name <span className="material-icons-outlined" style={{ fontSize: 14, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
                    <th style={{ width: '12%' }}>Task Status <span className="material-icons-outlined" style={{ fontSize: 14, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
                    <th style={{ width: '16%' }}>Owner <span className="material-icons-outlined" style={{ fontSize: 14, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
                    <th style={{ width: '14%' }}>Date Created <span className="material-icons-outlined" style={{ fontSize: 14, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
                    <th style={{ width: '12%' }}>AGE <span className="material-icons-outlined" style={{ fontSize: 14, verticalAlign: 'middle' }}>arrow_drop_up</span></th>
                  </tr>
                </thead>
                <tbody>
                  {OPEN_TASKS.map((t, i) => (
                    <tr key={i}>
                      <td>
                        <div className={styles.cellTaskType}>
                          <span className={styles.taskIconCircle}><img src={t.icon} alt="" /></span>
                          {t.type}
                        </div>
                      </td>
                      <td><span className={styles.cellLink}>{t.name}</span></td>
                      <td>{t.status}</td>
                      <td>{t.owner}</td>
                      <td>{t.dateCreated}</td>
                      <td>{t.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={styles.tablePagination}>
                <select><option>20</option></select>
                <span>Showing results 1 - 7 of 7</span>
              </div>
            </div>
          </section>

          {/* Screening and Monitoring Associations */}
          <section className={`${styles.tableCard} ${styles.tableCardShadow}`}>
            <div className={styles.sectionBarFlat}>
              <div className={styles.sectionRowSmall}>
                <h2 className={styles.cardTitle}>Screening and Monitoring Associations</h2>
                <span className={`material-icons-outlined ${styles.infoIcon}`}>info</span>
              </div>
            </div>
            <div className={styles.cardInner}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Match results</th>
                    <th>Updated</th>
                    <th>Type</th>
                    <th>Assoc Status</th>
                    <th>Category</th>
                    <th>Entity/Person/Unknown</th>
                  </tr>
                </thead>
                <tbody>
                  {SCREENING_ROWS.map((r, i) => (
                    <tr key={i}>
                      <td><span className={styles.cellLink}>{r.name}</span></td>
                      <td>
                        <div className={styles.matchBadges}>
                          {r.matches.map((m, j) => (
                            <span key={j} className={styles.mbadge} style={{ background: m.bg, color: m.color }}>{m.val}</span>
                          ))}
                        </div>
                      </td>
                      <td>{r.updated}</td>
                      <td>{r.type}</td>
                      <td>
                        <div className={styles.assocStatus}>
                          <span className={styles.statusDot} style={{ background: r.statusDot }} />
                          {r.statusLabel}
                        </div>
                      </td>
                      <td>
                        <div className={styles.categoryCell}>
                          {r.categories.map((c, j) => (
                            <span key={j} className={styles.catTag} style={{ background: c.bg, color: c.color }}>{c.label}</span>
                          ))}
                          <span className="material-icons-outlined" style={{ fontSize: 16, color: 'var(--text-light)' }}>{r.categoryIcon}</span>
                        </div>
                      </td>
                      <td>{r.entityType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={styles.tablePagination}>
                <select><option>20</option></select>
                <span>Showing results 1 - 2 of 2</span>
              </div>
            </div>
          </section>

        </main>
      </div>
    </PageLayout>
  );
}
