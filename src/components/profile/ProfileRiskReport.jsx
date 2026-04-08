import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { Sidebar, riskBadge } from './ProfilePage';
import styles from './profile.module.css';

function RiskBadge({ level }) {
  const cls = level === 'high' ? styles.badgeHigh
    : level === 'medium' ? styles.badgeMedium
    : styles.badgeLow;
  return <span className={`${styles.badge} ${cls}`}>{level.toUpperCase()}</span>;
}

function Accordion({ section, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  const headerCls = `${styles.accordionHeader} ${
    section.level === 'high' ? styles.levelHigh
      : section.level === 'medium' ? styles.levelMedium
      : styles.levelLow
  }`;

  return (
    <div className={styles.accordion} id={section.id}>
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
          <button className={`${styles.btn} ${styles.btnOutline}`} onClick={onClose}>Cancel</button>
          <button className={`${styles.btn} ${styles.btnFilled}`} onClick={() => onSave(selectedLevel)}>Save</button>
        </div>
      </div>
      <div className={styles.amendBody}>
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
            <button className={`${styles.btn} ${styles.btnOutline}`}>Upload</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfileRiskReport() {
  const params = useParams();
  const profile = profiles[params.profileId];
  const [activeTab, setActiveTab] = useState('breakdown');
  const [showAmend, setShowAmend] = useState(false);
  const [riskLevel, setRiskLevel] = useState(profile?.riskLevel?.level || 'low');
  const [amendSuccess, setAmendSuccess] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [location.hash]);

  if (!profile) return <div style={{ padding: 40, textAlign: 'center' }}>Profile not found</div>;

  const rr = profile.riskReport || {};
  const matchResults = rr.matchResults || [];

  function handleSave(newLevel) {
    if (newLevel) setRiskLevel(newLevel);
    setShowAmend(false);
    setAmendSuccess(true);
    setTimeout(() => setAmendSuccess(false), 5000);
  }

  return (
    <PageLayout>
      {amendSuccess && (
        <div className={styles.rlrAlert}>
          <span className={`material-icons-outlined ${styles.rlrAlertIcon}`}>check_circle</span>
          <span className={styles.rlrAlertText}>Risk Level amended successfully.</span>
        </div>
      )}

      <Breadcrumb items={[
        { label: 'Third Parties', to: '/third-parties' },
        { label: profile.shortName, to: `/profile/${profile.id}` },
        { label: 'Risk Level Report' },
      ]} />

      {/* Top Strip */}
      <div className={`${styles.tpTopStrip}${riskLevel === 'high' ? ' ' + styles.tpTopStripHigh : riskLevel === 'medium' ? ' ' + styles.tpTopStripMedium : riskLevel === 'low' ? ' ' + styles.tpTopStripLow : ''}`}>
        <div className={styles.tpPageHeader}>
          <Link to={`/profile/${profile.id}`} className={styles.tpBack}>
            <span className="material-icons-outlined">chevron_left</span> Back
          </Link>
          <div className={styles.tpTitleRow}>
            <div className={styles.tpNameGroup}>
              <h1>{profile.name}</h1>
              <span className={styles.tpVerified}>
                <span className="material-icons-outlined">verified</span>
                {profile.verifiedText}
              </span>
            </div>
            <div className={styles.tpBadges}>
              <div className={styles.tpBadgeGroup}>
                <div className={styles.tpBadgeLabel}>Current status:</div>
                <div className={`${styles.badge} ${styles.badgePending} ${styles.badgeBtn}`}>
                  {profile.currentStatus.label}
                  <span className="material-icons-outlined" style={{ fontSize: 16 }}>{profile.currentStatus.icon}</span>
                </div>
              </div>
              <div className={styles.tpBadgeGroup}>
                <div className={styles.tpBadgeLabel}>Risk level:</div>
                <div className={`${styles.badge} ${styles['badge' + riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)]} ${styles.badgeBtn}`}>
                  {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
                  <span className="material-icons-outlined" style={{ fontSize: 16 }}>warning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Body */}
      <div className={styles.pageBody}>
        <Sidebar profile={profile} activePage="risk-report" />

        <main className={styles.mainContent}>
          {showAmend && (
            <AmendPanel currentLevel={riskLevel} onClose={() => setShowAmend(false)} onSave={handleSave} />
          )}

          {!showAmend && (
            <>
              <section className={styles.rlrHeaderCard}>
                <div className={styles.rlrRow1}>
                  <h2 className={styles.cardTitle}>Current Risk Level Report</h2>
                  <div className={styles.cardHeaderRight}>
                    <button className={`${styles.btn} ${styles.btnOutline}`} onClick={() => window.print()}>
                      Print <span className="material-icons-outlined" style={{ fontSize: 14 }}>print</span>
                    </button>
                    <button className={`${styles.btn} ${styles.btnFilled}`} onClick={() => setShowAmend(true)}>Amend</button>
                  </div>
                </div>

                <div className={styles.rlrMetaRow}>
                  <div className={styles.rlrMetaItem}>
                    <span className={styles.rlrMetaLabel}>Current Status:</span>
                    <span className={`${styles.badge} ${styles.badgePending}`}>
                      <span className="material-icons-outlined" style={{ fontSize: 14 }}>pending</span>
                      {profile.currentStatus.label}
                    </span>
                  </div>
                  <div className={styles.rlrMetaItem}>
                    <span className={styles.rlrMetaLabel}>Risk Level:</span>
                    <span className={`${styles.badge} ${styles['badge' + riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)]}`}>
                      {riskLevel.toUpperCase()}
                    </span>
                  </div>
                  <div className={styles.rlrMetaItem}>
                    <span className={styles.rlrMetaLabel}>Current Risk Score:</span>
                    <span className={styles.rlrRiskScore}>{rr.currentScore}</span>
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
                    <div className={styles.riskCategorySection}>
                      <h3 className={styles.riskCategoryTitle}>Risk Category Risk Levels</h3>
                      {(rr.accordionSections || []).map(section => (
                        <Accordion key={section.id} section={section} defaultOpen={true} />
                      ))}
                    </div>

                    {/* Screening Results */}
                    {(rr.screeningResults || []).length > 0 && (
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
                            {rr.screeningResults.map((row, i) => (
                              <tr key={i}>
                                <td className={styles.screeningCell}><span className={styles.cellLink}>{row.name}</span></td>
                                <td className={styles.screeningCell}>{row.type}</td>
                                <td className={styles.screeningMatchCell}>
                                  {matchResults.map((m, j) => (
                                    <div key={j} className={styles.matchResultLine}>
                                      <span className={styles.matchSquare} style={{ background: m.bg, color: m.color }}>
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
                    )}

                    {/* Red Flags */}
                    {(rr.redFlags || []).length > 0 && (
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
                            {rr.redFlags.map((row, i) => (
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
                    )}
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
                      {(rr.processSummary || []).map((row, i) => (
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
