import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Breadcrumb from '../components/layout/Breadcrumb';
import integrityLogo from '../assets/integrity-check-logo.png';
import iconInactiveOrder from '../assets/icon-inactive-order.svg';
import styles from './BruceWayneProfile.module.css';

// ── Data ────────────────────────────────────────────────────────────────────

const RISK_CARDS = [
  { title: 'Country',               level: 'low',  flags: 0, score: 0 },
  { title: 'Bribery & Corruption',  level: 'low',  flags: 0, score: 0 },
  { title: 'Environmental',         level: 'low',  flags: 0, score: 0 },
  { title: 'Human Rights',          level: 'low',  flags: 0, score: 0 },
  { title: 'General',               level: 'low',  flags: 0, score: 0 },
  { title: 'Screening & Monitoring',level: 'low',  flags: 0, score: 0 },
  { title: 'Cyber',                 level: 'low',  flags: 0, score: 0 },
];

const OPEN_TASKS = [
  { type: 'Onboarding', icon: iconInactiveOrder, name: 'Onboarding', status: 'Not Started', owner: 'Claudio Merino', dateCreated: '28 Nov 2024', age: '1 Year' },
];

const SCREENING_ROWS = [
  {
    name: 'Bruce Wayne Batman',
    matches: [
      { bg: 'var(--success-500)', color: 'var(--text-normal)', val: '2' },
      { bg: 'var(--success-500)', color: 'var(--text-normal)', val: '1' },
      { bg: 'var(--text-light)',  color: '#fff',               val: '0' },
      { bg: 'var(--neutral-200)', color: 'var(--text-normal)', val: '0' },
      { bg: 'var(--warning-500)', color: 'var(--text-normal)', val: '0' },
    ],
    updated: '15 Jan 2025',
    type: 'Primary Entity',
    statusDot: 'var(--success-500)',
    statusLabel: 'No Action Required',
    categories: [{ label: 'AM', bg: '#edd500', color: 'var(--neutral-900)' }],
    categoryIcon: 'check_circle_outline',
    entityType: 'Person',
  },
];

const CONNECTED_ROWS = [
  { name: 'Bruce Wayne Batman', connType: 'Subsidiary', idType: 'DUNS Number', idValue: '\u2014', intRef: '\u2014', country: 'United States' },
];

const SUGGESTED_ROWS = [
  { name: 'Bruce Wayne Batman', connType: 'Subsidiary', idType: 'DUNS Number', idValue: '\u2014', intRef: '\u2014', country: 'United States' },
  { name: 'Initech Inc',        connType: 'Subsidiary', idType: 'DUNS Number', idValue: '\u2014', intRef: 'INT-0002', country: 'United States' },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

function riskBadge(level) {
  if (level === 'high')   return { className: styles.badgeHigh,   icon: 'error_outline',      label: 'High'   };
  if (level === 'medium') return { className: styles.badgeMedium, icon: 'error_outline',       label: 'Medium' };
  return                         { className: styles.badgeLow,    icon: 'check_circle_outline', label: 'LOW'   };
}

// ── Component ────────────────────────────────────────────────────────────────

export default function BruceWayneProfile({ embedded = false }) {
  const [activeTab, setActiveTab] = useState('overview');

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

  const content = (
    <>
      {!embedded && <Breadcrumb items={[
        { label: 'Third Parties', to: '/third-parties' },
        { label: 'Bruce Wayne Batman' },
      ]} />}

      {/* ── Top Strip ── */}
      <div className={styles.tpTopStrip}>
        <div className={styles.tpPageHeader}>
          <Link to="/third-parties" className={styles.tpBack}>
            <span className="material-icons-outlined">chevron_left</span> Back
          </Link>
          <div className={styles.tpTitleRow}>
            <div className={styles.tpNameGroup}>
              <h1>Bruce Wayne Batman</h1>
              <span className={styles.tpVerified}>
                <span className="material-icons-outlined">verified</span>
                Identity Verified
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
                <div className={`${styles.badge} ${styles.badgeLow} ${styles.badgeBtn}`}>
                  Low
                  <span className="material-icons-outlined" style={{ fontSize: 16 }}>check_circle_outline</span>
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
          <div className={styles.navItem}><span className={`${styles.dot} ${styles.dotAmber}`} /> Onboarding</div>
          <div className={styles.navItem}><span className={`${styles.dot} ${styles.dotGrey}`} /> Risk Assessment</div>
          <div className={styles.navItem}>
            <span className={`${styles.dot} ${styles.dotGrey}`} /> Integrity Check
            <span className={styles.navPartnerIcon}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" fill="white" stroke="#B1BCC5" /></svg>
              <img src={integrityLogo} alt="" />
            </span>
          </div>
          <div className={styles.navItem}><span className={`${styles.dot} ${styles.dotGrey}`} /> Due Diligence</div>
          <div className={styles.navItem}><span className={`${styles.dot} ${styles.dotGrey}`} /> Enhanced Due Diligence Reports</div>
          <div className={styles.navItem}>
            <span className={`${styles.dot} ${styles.dotGreen}`} /> UBO
            <span className={styles.navPartnerIcon}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" fill="white" stroke="#B1BCC5" /></svg>
              <img src={integrityLogo} alt="" />
            </span>
          </div>
          <div className={styles.navItem}><span className={`${styles.dot} ${styles.dotGrey}`} /> Risk Mitigation</div>
          <div className={styles.navItem}><span className={`${styles.dot} ${styles.dotGrey}`} /> Approval</div>
          <div className={styles.navItem}><span className={`${styles.dot} ${styles.dotGrey}`} /> Screening &amp; Monitoring</div>
          <div className={styles.navDivider} />
          <div className={styles.navSectionLabel}>Properties</div>
          <div className={styles.navSectionLabel}>Documents</div>
          <div className={styles.navSectionLabel}>
            Entity Verification
            <span className={styles.navPartnerIcon} style={{ marginLeft: 4 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" fill="white" stroke="#B1BCC5" /></svg>
              <img src={integrityLogo} alt="" />
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
              <h2 className={styles.cardTitle}>Bruce Wayne Batman Details</h2>
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
                    <div><div className={styles.fieldLabel}>First Name</div><div className={styles.fieldValue}>Bruce Wayne</div></div>
                    <div><div className={styles.fieldLabel}>Last Name</div><div className={styles.fieldValue}>Batman</div></div>
                    <div><div className={styles.fieldLabel}>Third Party Owner</div><div className={styles.fieldValue}>Claudio Merino</div></div>
                    <div><div className={styles.fieldLabel}>Process Name</div><div className={styles.fieldValue}>Standard RCTP</div></div>
                    <div>
                      <div className={styles.fieldLabel}>Country of Residence</div>
                      <div className={`${styles.fieldValue} ${styles.fieldValueFlag}`}>
                        <span style={{ fontSize: 20 }}>&#127482;&#127480;</span> United States
                      </div>
                    </div>
                    <div><div className={styles.fieldLabel}>Third Party Contact Email</div><div className={styles.fieldValue}>bruce.wayne@wayneenterprises.com</div></div>
                    <div><div className={styles.fieldLabel}>Business Unit</div><div className={styles.fieldValue}>test</div></div>
                    <div><div className={styles.fieldLabel}>Screening &amp; Monitoring Policy</div><div className={styles.fieldValue}>Default Standard KYBP Policy</div></div>
                    <div><div className={styles.fieldLabel}>Entity Type</div><div className={styles.fieldValue}>Individual / Person</div></div>
                    <div><div className={styles.fieldLabel}>Year of Birth</div><div className={styles.fieldValue}>1972</div></div>
                    <div><div className={styles.fieldLabel}>Expiry date</div><div className={styles.fieldValue}>Unknown</div></div>
                    <div><div className={styles.fieldLabel}>Tags</div><div className={styles.fieldValue}>{'\u2014'}</div></div>
                  </div>
                </div>
              )}

              {/* Additional Details */}
              {activeTab === 'additional' && (
                <div className={styles.tabPanel}>
                  <div className={styles.fieldGrid}>
                    <div><div className={styles.fieldLabel}>Also Known As</div><div className={styles.fieldValue}>The Dark Knight</div></div>
                    <div><div className={styles.fieldLabel}>Responsible Client Unit</div><div className={styles.fieldValue}>test</div></div>
                    <div><div className={styles.fieldLabel}>National ID Number</div><div className={styles.fieldValue}>{'\u2014'}</div></div>
                    <div><div className={styles.fieldLabel}>Identification Type</div><div className={styles.fieldValue}>Passport</div></div>
                    <div><div className={styles.fieldLabel}>Address Details</div><div className={styles.fieldValue}>1007 Mountain Drive, Gotham City, NJ 07001</div></div>
                    <div><div className={styles.fieldLabel}>All Relevant Client Units</div><div className={styles.fieldValue}>test</div></div>
                    <div><div className={styles.fieldLabel}>Internal Reference or ID</div><div className={styles.fieldValue}>{'\u2014'}</div></div>
                    <div><div className={styles.fieldLabel}>Identification Value</div><div className={styles.fieldValue}>{'\u2014'}</div></div>
                    <div><div className={styles.fieldLabel}>Personal Website</div><div className={styles.fieldValue}><a href="#" className={styles.fieldLink}>www.wayneenterprises.com</a></div></div>
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
                      <button className={`${styles.btn} ${styles.btnDiscard}`} disabled={!anyChecked}>Discard</button>
                      <button className={`${styles.btn} ${styles.btnConnect}`} disabled={!anyChecked}>Connect</button>
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
                          <th>Connection Type</th>
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
                            <td>{r.connType}</td>
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
                    <button className={styles.btnSearch}>
                      <span className="material-icons-outlined" style={{ fontSize: 18 }}>search</span>
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
              <div className={styles.sectionRow}>
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
                <span>Showing results 1 - 1 of 1</span>
              </div>
            </div>
          </section>

          {/* Screening and Monitoring Associations */}
          <section className={`${styles.tableCard} ${styles.tableCardShadow}`}>
            <div className={styles.sectionBarFlat}>
              <div className={styles.sectionRow}>
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
                <span>Showing results 1 - 1 of 1</span>
              </div>
            </div>
          </section>

        </main>
      </div>
    </>
  );

  return embedded ? content : <PageLayout>{content}</PageLayout>;
}
