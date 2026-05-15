import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { transition as mot } from '../../utils/motion';
import { useParams, useLocation } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { Sidebar } from './ProfilePage';
import ProfilePageHeader from './ProfilePageHeader';
import { riskBadge, RiskLevelIcon } from './profileAssets';
import Badge from '../ui/Badge';
import Flag from '../ui/Flag';
import styles from './profile.module.css';


const STATUS_CONFIG = {
  'Pending Approval':             { cls: 'statusPendingApproval', icon: 'pending' },
  'Approved':                     { cls: 'statusApproved',        icon: 'check_circle' },
  'Not Approved':                 { cls: 'statusNotApproved',     icon: 'dangerous' },
  'Declined':                     { cls: 'statusDeclined',        icon: 'feedback' },
  'Approved*':                    { cls: 'statusExpired',         icon: 'history_toggle_off' },
  'Approved! (Renewal Required)': { cls: 'statusExpired',         icon: 'history_toggle_off' },
};
function getStatusConfig(label) {
  return STATUS_CONFIG[label] ?? { cls: 'statusPendingApproval', icon: 'pending' };
}

function RiskBadge({ level }) {
  const cls = level === 'high' ? styles.badgeHigh
    : level === 'medium' ? styles.badgeMedium
    : styles.badgeLow;
  return (
    <span className={`${styles.badge} ${cls}`}>
      {level.toUpperCase()}
      <RiskLevelIcon level={level} size={14} />
    </span>
  );
}

function StatusPill({ status }) {
  const map = {
    'Completed':       styles.sPillCompleted,
    'In Progress':     styles.sPillInProgress,
    'Action Required': styles.sPillAction,
    'Not Started':     styles.sPillNotStarted,
    'Not Required':    styles.sPillNotRequired,
    'Mitigated':       styles.sPillMitigated,
    'Incomplete':      styles.sPillIncomplete,
    'Open':            styles.sPillOpen,
    'Post Approval':   styles.sPillPostApproval,
  };
  return <span className={`${styles.sPill} ${map[status] || styles.sPillDefault}`}>{status}</span>;
}

function Accordion({ section, open, onToggle, hideScore = false, screeningResults = null, matchResults = [] }) {
  const headerCls = `${styles.accordionHeader} ${
    section.level === 'high' ? styles.levelHigh
      : section.level === 'medium' ? styles.levelMedium
      : styles.levelLow
  }`;

  return (
    <div className={styles.accordion} id={section.id}>
      <div className={headerCls} onClick={onToggle}>
        <div className={styles.accordionHeaderLeft}>
          <span className={styles.accordionLabel}>{section.label}</span>
          {section.rows.length > 0 && screeningResults === null && (
            <span className={styles.accordionFactorCount}>
              {section.rows.length} {section.rows.length === 1 ? 'factor' : 'factors'}
            </span>
          )}
        </div>
        <div className={styles.accordionHeaderRight}>
          {!hideScore && (
            <span className={styles.accordionScoreStat}>
              Category Risk Score: <strong>{section.totalScore}</strong>
            </span>
          )}
          <RiskBadge level={section.level} />
          <span className={`material-icons-outlined ${styles.accordionCaret} ${open ? '' : styles.accordionCaretCollapsed}`}>
            expand_less
          </span>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className={styles.accordionBody}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: mot.accordionOpen,
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: mot.accordionClose,
            }}
          >
            <div className={styles.accordionBodyInner}>
              {screeningResults !== null ? (
                screeningResults.length === 0 ? (
                  <div className={styles.noRiskMessage}>No screening results found</div>
                ) : (
                  <table className={styles.screeningTable}>
                    <thead>
                      <tr>
                        <th style={{ width: '26%' }}>Association Name</th>
                        <th style={{ width: '12%' }}>Type</th>
                        <th style={{ width: '24%' }}>Match Results</th>
                        <th style={{ width: '16%' }}>Category</th>
                        <th style={{ width: '11%' }}>Risk Level</th>
                        <th style={{ width: '11%' }}>Red Flags</th>
                      </tr>
                    </thead>
                    <tbody>
                      {screeningResults.map((row, i) => (
                        <tr key={i}>
                          <td className={styles.screeningCell}><span className={styles.cellLink}>{row.name}</span></td>
                          <td className={styles.screeningCell}>{row.type}</td>
                          <td className={styles.screeningMatchCell}>
                            {matchResults.map((m, j) => (
                              <div key={j} className={styles.matchResultLine}>
                                <Badge label={String(m.count)} bgColor={m.bg} textColor={m.color} size="large" shape="square" />
                                <span>{m.label}</span>
                              </div>
                            ))}
                          </td>
                          <td className={styles.screeningCell}>
                            <div className={styles.screeningFlagCell}>
                              {(row.categories || []).map((c, j) => (
                                <Flag key={j} type={c.type} icon={c.icon} />
                              ))}
                            </div>
                          </td>
                          <td className={styles.screeningCell}><RiskBadge level={row.level} /></td>
                          <td className={styles.screeningCell}>{row.redFlags}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              ) : section.rows.length === 0 ? (
                <div className={styles.noRiskMessage}>No risks were found in this category</div>
              ) : (
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
                        <td className={styles.riskScoreCol}>{row.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AmendPanel({ currentLevel, riskReport, onClose, onSave }) {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [reason, setReason] = useState('');
  const [fileName, setFileName] = useState('');

  function handleFileChange(e) {
    setFileName(e.target.files.length ? e.target.files[0].name : '');
  }

  const otherLevels = ['low', 'medium', 'high'].filter(lv => lv !== currentLevel);

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
        {/* LEFT column */}
        <div>
          <div className={styles.amendField}>
            <div className={styles.amendLabel}>Current Risk Level :</div>
            <div>
              <span className={`${styles.amendCurrentBadge} ${styles['amendBadgeSolid_' + currentLevel]}`}>
                {currentLevel.toUpperCase()}
              </span>
            </div>
          </div>
          <div className={styles.amendField}>
            <div className={styles.amendLabel}>Current Reason :</div>
            <div className={styles.amendReasonBlock}>
              <p className={styles.amendReasonLine}>Current Risk Level: {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}</p>
              <p className={styles.amendReasonLine}>Current Risk Score: {riskReport?.currentScore ?? 0}</p>
              {(riskReport?.accordionSections || []).map((s, i) => (
                <p key={i} className={styles.amendReasonLine}>{s.label} – {s.totalScore} – {s.level.charAt(0).toUpperCase() + s.level.slice(1)}</p>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT column */}
        <div>
          <div className={styles.amendField}>
            <div className={styles.amendLabel}>
              New Current Risk Level <span className={styles.req}>*</span>
            </div>
            <div className={styles.amendLevelGroup}>
              {otherLevels.map((lv, idx) => (
                <button
                  key={lv}
                  className={`${styles.amendLevelBtn} ${selectedLevel === lv ? styles.amendLevelBtnActive : ''} ${idx === 0 ? styles.amendLevelBtnFirst : ''} ${idx === otherLevels.length - 1 ? styles.amendLevelBtnLast : ''}`}
                  onClick={() => setSelectedLevel(lv)}
                >
                  {lv.toUpperCase()}
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
              <span className={styles.amendFileName}>{fileName || 'CHOOSE FILE'}</span>
              <label className={styles.amendBrowseBtn}>
                Browse
                <input type="file" accept=".csv,.pdf,.doc,.docx" style={{ display: 'none' }} onChange={handleFileChange} />
              </label>
            </div>
            <p className={styles.amendHelper}>
              Click the &apos;Choose Files&apos; button to browse for a file and then click the &apos;Upload&apos;.
              Uploaded files will appear below. Allowed file types include: .csv,.pdf,.doc,.docx<br />
              Multiple uploads are permitted.
            </p>
            <button className={`${styles.btn} ${styles.btnOutline} ${styles.amendUploadBtn}`}>Upload</button>
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
  const targetId = location.hash ? location.hash.slice(1) : null;

  const sortedSections = [...((profile?.riskReport?.accordionSections) || [])].sort(
    (a, b) => a.id === 'screening' ? 1 : b.id === 'screening' ? -1 : 0
  );

  const [openSections, setOpenSections] = useState(() => {
    const ids = sortedSections.map(s => s.id);
    if (targetId && ids.includes(targetId)) {
      return Object.fromEntries(ids.map(id => [id, id === targetId]));
    }
    return Object.fromEntries(ids.map(id => [id, true]));
  });

  function toggleSection(id) {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  }

  useEffect(() => {
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [targetId]);

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

      <ProfilePageHeader profile={profile} />

      {/* Page Body */}
      <div className={styles.pageBody}>
        <Sidebar profile={profile} activePage="risk-report" />

        <main className={styles.mainContent}>
          {showAmend && (
            <AmendPanel currentLevel={riskLevel} riskReport={rr} onClose={() => setShowAmend(false)} onSave={handleSave} />
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
                    {(() => {
                      const label = profile.currentStatus?.label || 'Pending Approval';
                      const { cls, icon } = getStatusConfig(label);
                      return (
                        <span className={`${styles.badge} ${styles[cls]}`}>
                          {label}
                          <span className="material-icons-outlined" style={{ fontSize: 16 }}>{icon}</span>
                        </span>
                      );
                    })()}
                  </div>
                  <div className={styles.rlrMetaItem}>
                    <span className={styles.rlrMetaLabel}>Risk Level:</span>
                    <span className={`${styles.badge} ${styles['badge' + riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)]}`}>
                      {riskLevel.toUpperCase()}
                      <RiskLevelIcon level={riskLevel} size={14} />
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
                    style={{ position: 'relative' }}
                  >
                    Current Risk Level Breakdown
                    {activeTab === 'breakdown' && (
                      <motion.div
                        layoutId="rr-tab-indicator"
                        className={styles.tabIndicator}
                        transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                      />
                    )}
                  </div>
                  <div
                    className={`${styles.tab} ${activeTab === 'process' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('process')}
                    style={{ position: 'relative' }}
                  >
                    Process Summary
                    {activeTab === 'process' && (
                      <motion.div
                        layoutId="rr-tab-indicator"
                        className={styles.tabIndicator}
                        transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                      />
                    )}
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
                      {sortedSections.map(section => (
                        <Accordion
                          key={section.id}
                          section={section.id === 'screening' ? { ...section, label: 'Screening Results' } : section}
                          open={openSections[section.id] ?? true}
                          onToggle={() => toggleSection(section.id)}
                          hideScore={section.id === 'screening'}
                          screeningResults={section.id === 'screening' ? (rr.screeningResults || []) : null}
                          matchResults={section.id === 'screening' ? matchResults : []}
                        />
                      ))}
                    </div>

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
                              <th style={{ width: '44%' }}>Title</th>
                              <th style={{ width: '10%' }}>Status</th>
                              <th style={{ width: '18%' }}>Risk Category</th>
                              <th style={{ width: '28%' }}>Property</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rr.redFlags.map((row, i) => (
                              <tr key={i}>
                                <td><span className={styles.cellLink}>{row.title}</span></td>
                                <td>{row.status}</td>
                                <td>{row.riskCategory || row.cat}</td>
                                <td>{row.property || ''}</td>
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
                  <div className={styles.processSummaryInner}>
                  <table className={styles.genericTable}>
                    <thead>
                      <tr>
                        <th style={{ width: '28%' }}>Process Steps</th>
                        <th style={{ width: '18%' }}>Status</th>
                        <th style={{ width: '16%' }}>Start Date</th>
                        <th style={{ width: '16%' }}>Completed Date</th>
                        <th style={{ width: '22%' }}>Completed By</th>
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
                          <td>{row.startDate}</td>
                          <td>{row.date}</td>
                          <td>{row.by}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </section>
              )}
            </>
          )}
        </main>
      </div>
    </PageLayout>
  );
}
