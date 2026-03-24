import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Breadcrumb from '../components/layout/Breadcrumb';
import styles from './RiskLevelReport.module.css';

// ── Data ──────────────────────────────────────────────────────────────────────

const ACCORDION_SECTIONS = [
  {
    id: 'country',
    label: 'Country Risk Level',
    level: 'medium',
    rows: [
      { property: "Wetlands impacted by third party's business operations", value: 'Yes', score: 5 },
    ],
    totalScore: 5,
  },
  {
    id: 'bribery',
    label: 'Bribery & Corruption Risk Level',
    level: 'low',
    rows: [],
    totalScore: 0,
  },
  {
    id: 'environmental',
    label: 'Environmental Risk Level',
    level: 'low',
    rows: [],
    totalScore: 0,
  },
  {
    id: 'human-rights',
    label: 'Human Right Risk Level',
    level: 'medium',
    rows: [
      {
        property:
          'Third party engages persons under the age of 15 or of an age for which primary schooling is mandatory under local laws',
        value: 'Yes',
        score: 5,
      },
    ],
    totalScore: 6,
  },
  {
    id: 'general',
    label: 'General Risk Level',
    level: 'high',
    rows: [
      { property: 'Third Party Country of Operation', value: 'Argentina', score: 1 },
      { property: 'Third Party Service Type', value: 'Reseller', score: 2 },
      { property: 'Third Party Country of Formation', value: 'China', score: 11 },
    ],
    totalScore: 14,
  },
  {
    id: 'screening',
    label: 'Screening & Monitoring Risk Level',
    level: 'low',
    rows: [],
    totalScore: 0,
  },
  {
    id: 'cyber',
    label: 'Cyber Risk Level',
    level: 'high',
    rows: [
      { property: 'Third Party Country of Operation', value: 'Argentina', score: 1 },
      { property: 'Third Party Service Type', value: 'Reseller', score: 2 },
      { property: 'Third Party Country of Formation', value: 'China', score: 11 },
    ],
    totalScore: 14,
  },
];

const MATCH_RESULTS = [
  { count: 91, bg: '#E34C53', color: '#fff', label: 'Open (Pending Review)' },
  { count: 1,  bg: '#13DF81', color: 'var(--text-normal)', label: 'Open (Investigation Under Review)' },
  { count: 0,  bg: '#016F91', color: '#fff', label: 'Permanently Clear (Without Updates)' },
  { count: 0,  bg: '#9A3438', color: '#fff', label: 'Confirmed (Matches)' },
  { count: 0,  bg: '#F0C043', color: 'var(--text-normal)', label: 'Open (Pending Review)' },
];

const SCREENING_ROWS = [
  { name: 'John Smith', type: 'Director', matches: MATCH_RESULTS, level: 'high',   redFlags: 'YES' },
  { name: 'John Smith', type: 'Director', matches: MATCH_RESULTS, level: 'medium', redFlags: '' },
  { name: 'BP Plc',     type: 'Entity',   matches: MATCH_RESULTS, level: 'high',   redFlags: 'YES' },
];

const RED_FLAGS_ROWS = [
  { title: 'Watchlist - Other Official List',                               isLink: true,  status: 'Open',         cat: 'SaM' },
  { title: 'Third Party High Risk Country Involvement',                     isLink: false, status: 'Open',         cat: 'Bribery & Corruption' },
  { title: "Native inhabitants relocated by third party's business operations", isLink: true,  status: 'Mitigated',    cat: 'Environmental' },
  { title: "Native inhabitants relocated by third party's business operations", isLink: false, status: 'Post Approval', cat: 'General' },
];

const PROCESS_SUMMARY_ROWS = [
  { step: 'Onboarding',                      isLink: true,  status: 'Completed',       by: 'Angela Martin', date: '2 Apr 2024' },
  { step: 'Risk Assessment',                 isLink: true,  status: 'Incomplete',      by: 'Angela Martin', date: '2 Apr 2024' },
  { step: 'Risk Assessment 2',               isLink: true,  status: 'Mitigated',       by: 'Angela Martin', date: '2 Apr 2024' },
  { step: 'Internal Due Diligence',          isLink: true,  status: 'In Progress',     by: '',              date: '2 Apr 2024' },
  { step: 'External Due Diligence',          isLink: true,  status: 'Not Started',     by: 'Angela Martin', date: '2 Apr 2024' },
  { step: 'External Due Diligence 2',        isLink: true,  status: 'Not Started',     by: 'Angela Martin', date: '2 Apr 2024' },
  { step: 'Enhanced Due Diligence Report',   isLink: true,  status: 'Not Required',    by: 'Angela Martin', date: '2 Apr 2024' },
  { step: 'UBO Module',                      isLink: false, status: 'Action Required', by: 'Angela Martin', date: '2 Apr 2024' },
  { step: 'Risk Mitigation Module',          isLink: true,  status: 'Action Required', by: 'Angela Martin', date: '2 Apr 2024' },
  { step: 'Approval Module',                 isLink: true,  status: 'Action Required', by: 'Angela Martin', date: '2 Apr 2024' },
  { step: 'Screening and Monitoring Module', isLink: true,  status: 'Completed',       by: 'Angela Martin', date: '2 Apr 2024' },
];

const SIDE_NAV_ITEMS = [
  { label: 'Summary page',               dot: null,    isLink: true,  to: '/tp-profile' },
  { divider: true },
  { label: 'Risk Assessment',            dot: 'red',   isLink: false },
  { label: 'Integrity Check',            dot: 'red',   isLink: false, partner: true },
  { label: 'Due Diligence',              dot: 'grey',  isLink: false },
  { label: 'Enhanced Due Diligence Reports', dot: 'grey', isLink: false },
  { label: 'UBO',                        dot: 'green', isLink: false, partner: true },
  { label: 'Risk Mitigation',            dot: 'red',   isLink: false },
  { label: 'Approval',                   dot: 'amber', isLink: false },
  { label: 'Screening & Monitoring',     dot: 'red',   isLink: false },
  { divider: true },
  { label: 'Properties',   isSection: true },
  { label: 'Documents',    isSection: true, isLink: true, to: '#' },
  { label: 'Entity Verification', isSection: true, partner: true },
  { label: 'Audit',        isSection: true },
  { divider: true },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function RiskBadge({ level }) {
  const cls = level === 'high' ? styles.badgeHigh
    : level === 'medium' ? styles.badgeMedium
    : styles.badgeLow;
  return <span className={`${styles.badge} ${cls}`}>{level.toUpperCase()}</span>;
}

function PartnerIcon() {
  return (
    <span className={styles.navPartnerIcon}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7.5" fill="white" stroke="#B1BCC5" />
      </svg>
    </span>
  );
}

function Accordion({ section, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  const headerCls = `${styles.accordionHeader} ${
    section.level === 'high' ? styles.levelHigh
      : section.level === 'medium' ? styles.levelMedium
      : styles.levelLow
  }`;

  return (
    <div className={styles.accordion}>
      <div className={headerCls} onClick={() => setOpen(o => !o)}>
        <div className={styles.accordionHeaderLeft}>
          <span>{section.label}</span>
        </div>
        <div className={styles.accordionHeaderRight}>
          <RiskBadge level={section.level} />
          <span className={`material-icons-outlined ${styles.accordionCaret} ${open ? '' : styles.accordionCaretCollapsed}`}>
            expand_less
          </span>
        </div>
      </div>

      {open && (
        <div className={styles.accordionBody}>
          {section.rows.length === 0 ? (
            <div className={styles.noRiskMessage}>No risk were found in this category</div>
          ) : (
            <>
              <table className={styles.riskTable}>
                <thead>
                  <tr>
                    <th style={{ width: '74%' }}>PROPERTY</th>
                    <th style={{ width: '12%' }}>Value</th>
                    <th style={{ width: '14%' }}>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row, i) => (
                    <tr key={i}>
                      <td className={styles.cellDark}>{row.property}</td>
                      <td>{row.value}</td>
                      <td>{row.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={styles.riskTableFooter}>
                TOTAL RISK SCORE:<span>{section.totalScore}</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ── Amend Panel ────────────────────────────────────────────────────────────────

function AmendPanel({ currentLevel, onClose, onSave }) {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [reason, setReason] = useState('');
  const [fileName, setFileName] = useState('Choose file');

  function handleFileChange(e) {
    setFileName(e.target.files.length ? e.target.files[0].name : 'Choose file');
  }

  return (
    <div className={styles.amendCard}>
      <div className={styles.amendHeader}>
        <h2 className={styles.amendTitle}>Amend Risk Level</h2>
        <div className={styles.amendHeaderActions}>
          <button className={styles.btnOutline} onClick={onClose}>Cancel</button>
          <button className={styles.btnFilled} onClick={() => onSave(selectedLevel)}>Save</button>
        </div>
      </div>
      <div className={styles.amendBody}>
        {/* Left */}
        <div>
          <div className={styles.amendField}>
            <div className={styles.amendLabel}>Current Risk Level :</div>
            <div>
              <span className={`${styles.amendCurrentBadge} ${styles['amendBadge_' + currentLevel]}`}>
                {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}
              </span>
            </div>
          </div>
          <div className={styles.amendField}>
            <div className={styles.amendLabel}>Current Reason :</div>
            <div className={styles.amendValue}>Final Risk Score: 25</div>
            <div className={styles.amendValue}>Final Risk Level: High</div>
          </div>
        </div>
        {/* Right */}
        <div>
          <div className={styles.amendField}>
            <div className={styles.amendLabel}>
              New Current Risk Level <span className={styles.req}>*</span>
            </div>
            <div className={styles.amendLevelGroup}>
              {['low', 'medium', 'high'].map(lv => (
                <button
                  key={lv}
                  className={`${styles.amendLevelBtn} ${selectedLevel === lv ? styles.amendLevelBtnActive : ''}`}
                  onClick={() => setSelectedLevel(lv)}
                >
                  {lv.charAt(0).toUpperCase() + lv.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.amendField}>
            <div className={styles.amendLabel}>
              Amend Reason <span className={styles.req}>*</span>
            </div>
            <textarea
              className={styles.amendTextarea}
              placeholder="Amend Reason"
              value={reason}
              onChange={e => setReason(e.target.value)}
            />
          </div>
          <div className={styles.amendField}>
            <div className={styles.amendFileRow}>
              <span className={styles.amendFileName}>{fileName}</span>
              <label className={styles.amendBrowseBtn}>
                Browse
                <input type="file" accept=".csv,.pdf,.doc,.docx" style={{ display: 'none' }} onChange={handleFileChange} />
              </label>
            </div>
            <p className={styles.amendHelper}>
              Click the &apos;Choose Files&apos; button to browse for a file and then click the &apos;Upload&apos;.
              Uploaded files will appear below. Allowed file types include:{' '}
              <strong>.csv,.pdf,.doc,.docx</strong>
              <br />Multiple uploads are permitted.
            </p>
            <button className={styles.btnOutline}>Upload</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function RiskLevelReport() {
  const [activeTab, setActiveTab] = useState('breakdown');
  const [showAmend, setShowAmend] = useState(false);
  const [riskLevel, setRiskLevel] = useState('high');
  const [amendSuccess, setAmendSuccess] = useState(false);

  function handleSave(newLevel) {
    if (newLevel) setRiskLevel(newLevel);
    setShowAmend(false);
    setAmendSuccess(true);
    setTimeout(() => setAmendSuccess(false), 5000);
  }

  return (
    <PageLayout>
      {/* Success alert */}
      {amendSuccess && (
        <div className={styles.rlrAlert}>
          <span className={`material-icons-outlined ${styles.rlrAlertIcon}`}>check_circle</span>
          <span className={styles.rlrAlertText}>Risk Level amended successfully.</span>
        </div>
      )}

      <Breadcrumb
        items={[
          { label: 'Third Parties', to: '/third-parties' },
          { label: 'Gazprom',       to: '/tp-profile' },
          { label: 'Risk Level Report' },
        ]}
      />

      {/* TP Page Header strip */}
      <div className={styles.tpTopStrip}>
        <div className={styles.tpPageHeader}>
          <Link to="/tp-profile" className={styles.tpBack}>
            <span className="material-icons-outlined">chevron_left</span> Back
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
                <div className={`${styles.badge} ${riskLevel === 'high' ? styles.badgeHigh : riskLevel === 'medium' ? styles.badgeMedium : styles.badgeLow} ${styles.badgeBtn}`}>
                  {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
                  <span className="material-icons-outlined" style={{ fontSize: 16 }}>warning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page body: sidebar + main */}
      <div className={styles.pageBody}>

        {/* Sidebar */}
        <aside className={styles.sideNav}>
          {SIDE_NAV_ITEMS.map((item, i) => {
            if (item.divider) return <div key={i} className={styles.navDivider} />;
            if (item.isSection) {
              return (
                <div key={i} className={styles.navSectionLabel}>
                  {item.label}
                  {item.partner && <PartnerIcon />}
                </div>
              );
            }
            const dotCls = item.dot === 'red' ? styles.dotRed
              : item.dot === 'green' ? styles.dotGreen
              : item.dot === 'amber' ? styles.dotAmber
              : item.dot === 'grey' ? styles.dotGrey
              : null;

            if (item.isLink && item.to) {
              return (
                <Link key={i} to={item.to} className={styles.navItem}>
                  {dotCls && <span className={`${styles.dot} ${dotCls}`} />}
                  {item.label}
                  {item.partner && <PartnerIcon />}
                </Link>
              );
            }
            return (
              <div key={i} className={styles.navItem}>
                {dotCls && <span className={`${styles.dot} ${dotCls}`} />}
                {item.label}
                {item.partner && <PartnerIcon />}
              </div>
            );
          })}
        </aside>

        {/* Main content */}
        <main className={styles.mainContent}>

          {/* Amend panel */}
          {showAmend && (
            <AmendPanel
              currentLevel={riskLevel}
              onClose={() => setShowAmend(false)}
              onSave={handleSave}
            />
          )}

          {/* RLR Header Card */}
          {!showAmend && (
            <>
              <section className={styles.rlrHeaderCard}>
                <div className={styles.rlrRow1}>
                  <h2 className={styles.cardTitle}>Current Risk Level Report</h2>
                  <div className={styles.cardHeaderRight}>
                    <button className={styles.btnOutline} onClick={() => window.print()}>
                      Print <span className="material-icons-outlined" style={{ fontSize: 14 }}>print</span>
                    </button>
                    <button className={styles.btnFilled} onClick={() => setShowAmend(true)}>Amend</button>
                  </div>
                </div>

                <div className={styles.rlrMetaRow}>
                  <div className={styles.rlrMetaItem}>
                    <span className={styles.rlrMetaLabel}>Current Status:</span>
                    <span className={`${styles.badge} ${styles.badgePending}`}>
                      <span className="material-icons-outlined" style={{ fontSize: 14 }}>pending</span>
                      Pending Approval
                    </span>
                  </div>
                  <div className={styles.rlrMetaItem}>
                    <span className={styles.rlrMetaLabel}>Risk Level:</span>
                    <span className={`${styles.badge} ${riskLevel === 'high' ? styles.badgeHigh : riskLevel === 'medium' ? styles.badgeMedium : styles.badgeLow}`}>
                      {riskLevel.toUpperCase()}
                    </span>
                  </div>
                  <div className={styles.rlrMetaItem}>
                    <span className={styles.rlrMetaLabel}>Current Risk Score:</span>
                    <span className={styles.rlrRiskScore}>25</span>
                  </div>
                </div>

                <div className={styles.tabs}>
                  <div
                    className={`${styles.tab} ${activeTab === 'breakdown' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('breakdown')}
                  >
                    Current Risk Level Breakdown
                  </div>
                  <div
                    className={`${styles.tab} ${activeTab === 'process' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('process')}
                  >
                    Process Summary
                  </div>
                </div>
              </section>

              {/* Tab: Breakdown */}
              {activeTab === 'breakdown' && (
                <>
                  <div className={styles.rlrSeparator} />
                  <section className={styles.contentCard}>

                    {/* Risk Category Accordions */}
                    <div className={styles.riskCategorySection}>
                      <h3 className={styles.riskCategoryTitle}>Risk Category Risk Levels</h3>
                      {ACCORDION_SECTIONS.map(section => (
                        <Accordion key={section.id} section={section} defaultOpen={true} />
                      ))}
                    </div>

                    {/* Screening Results */}
                    <div className={styles.screeningSection}>
                      <h3 className={styles.screeningTitle}>Screening Results</h3>
                      <table className={styles.screeningTable}>
                        <thead>
                          <tr>
                            <th style={{ width: '30%' }}>Association Name</th>
                            <th style={{ width: '14%' }}>Type</th>
                            <th style={{ width: '28%' }}>Match Results</th>
                            <th style={{ width: '13%' }}>Risk Level</th>
                            <th style={{ width: '15%' }}>Red Flags</th>
                          </tr>
                        </thead>
                        <tbody>
                          {SCREENING_ROWS.map((row, i) => (
                            <tr key={i}>
                              <td className={styles.screeningCell}><span className={styles.cellLink}>{row.name}</span></td>
                              <td className={styles.screeningCell}>{row.type}</td>
                              <td className={styles.screeningMatchCell}>
                                {row.matches.map((m, j) => (
                                  <div key={j} className={styles.matchResultLine}>
                                    <span
                                      className={styles.matchSquare}
                                      style={{ background: m.bg, color: m.color }}
                                    >
                                      {m.count}
                                    </span>
                                    <span>{m.label}</span>
                                  </div>
                                ))}
                              </td>
                              <td className={styles.screeningCell}><RiskBadge level={row.level} /></td>
                              <td className={styles.screeningCell}>{row.redFlags}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Red Flags */}
                    <div className={styles.redFlagsSection}>
                      <h3 className={styles.redFlagsTitle}>Red Flags</h3>
                      <p className={styles.redFlagsSubtitle}>
                        One or more Red Flags have been identified. All Red Flags identified are within Risk Mitigation
                      </p>
                      <table className={styles.genericTable}>
                        <thead>
                          <tr>
                            <th style={{ width: '66%' }}>Title</th>
                            <th style={{ width: '18%' }}>Status</th>
                            <th style={{ width: '16%' }}>Categorization</th>
                          </tr>
                        </thead>
                        <tbody>
                          {RED_FLAGS_ROWS.map((row, i) => (
                            <tr key={i}>
                              <td>
                                {row.isLink
                                  ? <span className={styles.cellLink}>{row.title}</span>
                                  : <span>{row.title}</span>
                                }
                              </td>
                              <td>{row.status}</td>
                              <td>{row.cat}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </section>
                </>
              )}

              {/* Tab: Process Summary */}
              {activeTab === 'process' && (
                <section className={styles.processSummaryCard}>
                  <table className={styles.genericTable}>
                    <thead>
                      <tr>
                        <th style={{ width: '28%' }}>Process Steps</th>
                        <th style={{ width: '22%' }}>Status</th>
                        <th style={{ width: '25%' }}>Completed By</th>
                        <th style={{ width: '25%' }}>Completed Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PROCESS_SUMMARY_ROWS.map((row, i) => (
                        <tr key={i}>
                          <td>
                            {row.isLink
                              ? <span className={styles.cellLink}>{row.step}</span>
                              : <span>{row.step}</span>
                            }
                          </td>
                          <td>{row.status}</td>
                          <td>{row.by}</td>
                          <td>{row.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              )}
            </>
          )}

        </main>
      </div>
    </PageLayout>
  );
}
