import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Checkbox from '../ui/Checkbox';
import Flag from '../ui/Flag';
import Badge from '../ui/Badge';

const MATCH_BG_TO_STYLE = {
  'var(--alert-500)':   'action-required',
  'var(--success-500)': 'completed',
  'var(--warning-500)': 'incomplete',
  'var(--warning-300)': 'incomplete',
  'var(--neutral-200)': 'not-initiated',
  'var(--text-light)':  'no-action',
};
import { transition as mot } from '../../utils/motion';
import { patchInitechProfile, setDMFlow, setLumonFlow } from '../../utils/initechFlow';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import styles from './profile.module.css';
import { TASK_ICONS, riskBadge as riskBadgeFn } from './profileAssets';
import Sidebar, { PartnerIcon } from './Sidebar';

const STATUS_CONFIG = {
  'Pending Approval':            { cls: 'statusPendingApproval', icon: 'pending' },
  'Approved':                    { cls: 'statusApproved',        icon: 'check_circle' },
  'Not Approved':                { cls: 'statusNotApproved',     icon: 'dangerous' },
  'Declined':                    { cls: 'statusDeclined',        icon: 'feedback' },
  'Approved*':                   { cls: 'statusExpired',         icon: 'history_toggle_off' },
  'Approved! (Renewal Required)':{ cls: 'statusExpired',         icon: 'history_toggle_off' },
};

function getStatusConfig(label) {
  return STATUS_CONFIG[label] ?? { cls: 'statusPendingApproval', icon: 'pending' };
}


export { default as Sidebar, PartnerIcon } from './Sidebar';

export default function ProfilePage({ profile: profileProp, embedded = false }) {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const profile = patchInitechProfile(profileProp || profiles[params.profileId]);

  // New profile loading state (8s simulation after creation)
  const [profileLoading, setProfileLoading] = useState(
    !embedded && new URLSearchParams(location.search).get('new') === '1'
  );
  useEffect(() => {
    if (!profileLoading) return;
    const t = setTimeout(() => setProfileLoading(false), 8000);
    return () => clearTimeout(t);
  }, [profileLoading]);

  useEffect(() => {
    if (!embedded && new URLSearchParams(location.search).get('new') === '1') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  const [activeTab, setActiveTab] = useState('overview');
  const [alert, setAlert] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');

  const [checked, setChecked] = useState((profile?.suggestedRows || []).map(() => false));
  const allChecked  = checked.length > 0 && checked.every(Boolean);
  const someChecked = checked.some(Boolean) && !allChecked;
  const anyChecked  = checked.some(Boolean);

  // Current status panel
  const [statusPanelOpen, setStatusPanelOpen] = useState(false);
  const [declinePanelOpen, setDeclinePanelOpen] = useState(false);
  const [renewalModalOpen, setRenewalModalOpen] = useState(false);
  const [cancelRenewalModalOpen, setCancelRenewalModalOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(profile?.currentStatus?.label || 'Pending Approval');

  // Connect panel state
  const [connectPanelRow, setConnectPanelRow] = useState(null);
  const [connectedRows, setConnectedRows] = useState(profile?.connectedRows || []);
  const [suggestedRows, setSuggestedRows] = useState(profile?.suggestedRows || []);
  const [showLookMore, setShowLookMore] = useState(false);

  // Row menu + edit
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [editRow, setEditRow] = useState(null); // { index, row }

  if (!profile) return <div style={{ padding: 40, textAlign: 'center' }}>Profile not found</div>;

  function handleSelectAll(e) { setChecked(checked.map(() => e.target.checked)); }
  function handleRowCheck(i, val) { const next = [...checked]; next[i] = val; setChecked(next); }

  function handleConnect() {
    const selectedIndex = checked.findIndex(Boolean);
    if (selectedIndex === -1) return;
    setConnectPanelRow(suggestedRows[selectedIndex]);
  }
  function handleConnectConfirm(row, connType) {
    setConnectedRows(prev => [...prev, { ...row, connType }]);
    setSuggestedRows(prev => prev.filter(r => r !== row));
    setConnectPanelRow(null);
    setChecked(prev => prev.filter((_, i) => suggestedRows[i] !== row));
    setActiveTab('connections');
    setAlert({ type: 'success', message: 'Connection added successfully' });
    setTimeout(() => setAlert(null), 5000);
  }
  function handleDiscard() {
    const indicesToRemove = checked.map((c, i) => c ? i : -1).filter(i => i !== -1);
    setSuggestedRows(prev => prev.filter((_, i) => !indicesToRemove.includes(i)));
    setChecked(prev => prev.filter((_, i) => !indicesToRemove.includes(i)));
    setAlert({ type: 'warning', message: 'Connection discarded' });
    setTimeout(() => setAlert(null), 5000);
  }

  const content = (
    <>
      {/* Alert banner */}
      <AnimatePresence>
        {profile.alertBanners && alert && (
          <motion.div
            key="alert"
            className={`${styles.connAlert} ${styles['connAlert_' + alert.type]}`}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            <span className={`${styles.connAlertIcon} material-icons-outlined`}>
              {alert.type === 'success' ? 'check_circle' : 'remove_circle'}
            </span>
            <span className={styles.connAlertText}>{alert.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete modal */}
      <AnimatePresence>
      {profile.deleteModal && deleteModalOpen && (
        <motion.div
          key="delete-modal-overlay"
          className={styles.deleteModalOverlay}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={mot.overlay}
          onClick={() => setDeleteModalOpen(false)}
        >
          <motion.div
            className={styles.deleteModal}
            initial={{ scale: 0.92, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 10 }}
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className={styles.deleteModalHeader}>
              <span className={styles.deleteModalTitle}>Delete a Third party</span>
              <button className={styles.deleteModalClose} aria-label="Close" onClick={() => setDeleteModalOpen(false)} />
            </div>
            <div className={styles.deleteModalBody}>
              <p className={styles.deleteModalQuestion}>Are you sure you wish to delete the following Third Party?</p>
              <p className={styles.deleteModalName}>{profile.shortName}</p>
              <p className={styles.deleteModalConfirm}>Do you want to continue?</p>
            </div>
            <div className={styles.deleteModalActions}>
              <button className={`${styles.deleteModalBtn} ${styles.deleteModalCancel}`} onClick={() => setDeleteModalOpen(false)}>Cancel</button>
              <button className={`${styles.deleteModalBtn} ${styles.deleteModalContinue}`} onClick={() => setDeleteModalOpen(false)}>Continue</button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {!embedded && <Breadcrumb items={[
        { label: 'Third Parties', to: '/third-parties' },
        { label: profile.shortName },
      ]} />}

      {/* Top Strip */}
      <div className={`${styles.tpTopStrip}${profileLoading ? ' ' + styles.tpTopStripPending : profile.riskLevel.level === 'high' ? ' ' + styles.tpTopStripHigh : profile.riskLevel.level === 'medium' ? ' ' + styles.tpTopStripMedium : profile.riskLevel.level === 'low' ? ' ' + styles.tpTopStripLow : ''}`}>
        <div className={styles.tpPageHeader}>
          <Link to="/third-parties" className={styles.tpBack}>
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
                {(() => {
                  const { cls, icon } = getStatusConfig(currentStatus);
                  return (
                    <div
                      className={`${styles.badge} ${styles[cls]} ${styles.badgeBtn}`}
                      onClick={() => setStatusPanelOpen(true)}
                    >
                      {currentStatus}
                      <span className="material-icons-outlined" style={{ fontSize: 16 }}>{icon}</span>
                    </div>
                  );
                })()}
              </div>
              <div className={styles.tpBadgeGroup}>
                <div className={styles.tpBadgeLabel}>Risk level:</div>
                <AnimatePresence mode="wait">
                {profileLoading ? (
                  <motion.div key="loading-badge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                    className={`${styles.badge} ${styles.badgePending} ${styles.badgeBtn}`}
                  >
                    Unknown
                    <span className="material-icons-outlined" style={{ fontSize: 16 }}>help_outline</span>
                  </motion.div>
                ) : (
                  <Link to={`/profile/${profile.id}/risk-report`} style={{ textDecoration: 'none' }}>
                    <motion.div key="loaded-badge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                      className={`${styles.badge} ${styles['badge' + profile.riskLevel.level.charAt(0).toUpperCase() + profile.riskLevel.level.slice(1)]} ${styles.badgeBtn}`}
                    >
                      {profile.riskLevel.label}
                      <span className="material-icons-outlined" style={{ fontSize: 16 }}>{profile.riskLevel.icon}</span>
                    </motion.div>
                  </Link>
                )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Body */}
      <div className={styles.pageBody}>
        <Sidebar profile={profile} activePage="summary" profileLoading={profileLoading} />

        <main className={styles.mainContent}>
          {/* Details Card */}
          <motion.section className={`${styles.card} ${styles.detailsCard}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>{profile.shortName} Details</h2>
              <div className={styles.cardHeaderRight}>
                <div className={styles.statusInline}>
                  Third party STATUS:
                  <span className={styles.activeText}>Active</span>
                  <span className="material-icons-outlined" style={{ fontSize: 16, color: 'var(--success-700)' }}>verified</span>
                </div>
                <button className={`${styles.btn} ${styles.btnOutline}`} onClick={() => setShowNotes(true)}>Notes</button>
                <button className={`${styles.btn} ${styles.btnFilled}`} onClick={() => navigate(`/profile/${profile.id}/edit`)}>Edit</button>
              </div>
            </div>

            <div className={styles.tabs}>
              {['overview', 'additional', 'connections'].map(tab => (
                <div
                  key={tab}
                  className={`${styles.tab}${activeTab === tab ? ' ' + styles.tabActive : ''}`}
                  onClick={() => setActiveTab(tab)}
                  style={{ position: 'relative' }}
                >
                  {tab === 'overview' ? 'Overview' : tab === 'additional' ? 'Additional Details' : 'Connections'}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tab-indicator"
                      className={styles.tabIndicator}
                      transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className={styles.tabPanels}>
              <AnimatePresence mode="wait">

              {/* Overview */}
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  className={styles.tabPanel}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                >
                  <div className={styles.fieldGrid}>
                    {profile.overviewFields.map((f, i) => (
                      <div key={i}>
                        <div className={styles.fieldLabel}>{f.label}</div>
                        {f.flag ? (
                          <div className={`${styles.fieldValue} ${styles.fieldValueFlag}`}>
                            <span style={{ fontSize: 20 }}>{f.flag}</span> {f.value}
                          </div>
                        ) : f.overdue ? (
                          <div className={styles.fieldValue}>
                            <span
                              className={styles.fieldValueOverdue}
                              style={{ cursor: 'pointer' }}
                              onClick={() => setRenewalModalOpen(true)}
                            >
                              <span className="material-icons-outlined" style={{ fontSize: 14 }}>warning</span>
                              {f.value}
                            </span>
                          </div>
                        ) : (
                          <div className={styles.fieldValue}>{f.value}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Additional Details */}
              {activeTab === 'additional' && (
                <motion.div
                  key="additional"
                  className={styles.tabPanel}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                >
                  <div className={styles.fieldGrid}>
                    {profile.additionalFields.map((f, i) => (
                      <div key={i}>
                        <div className={styles.fieldLabel}>{f.label}</div>
                        <div className={styles.fieldValue}>
                          {f.link ? (
                            <a href={f.href || '#'} className={styles.fieldLink}>{f.value}</a>
                          ) : f.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
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
                        {connectedRows.map((r, i) => (
                          <tr key={i}>
                            <td><span className={styles.cellLink}>{r.name}</span></td>
                            <td>{r.connType}</td>
                            <td>{r.idType}</td>
                            <td>{r.idValue}</td>
                            <td>{r.intRef}</td>
                            <td>{r.country}</td>
                            <td className={styles.moreMenuCell}>
                              <RowMenu
                                open={openMenuIndex === i}
                                onToggle={() => setOpenMenuIndex(openMenuIndex === i ? null : i)}
                                onClose={() => setOpenMenuIndex(null)}
                                onEdit={() => { setOpenMenuIndex(null); setEditRow({ index: i, row: r }); }}
                                onDisconnect={() => {
                                  setOpenMenuIndex(null);
                                  setConnectedRows(prev => prev.filter((_, idx) => idx !== i));
                                }}
                              />
                            </td>
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

                  <div className={styles.connTableWrap} style={{ marginBottom: 16 }}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th style={{ width: 32 }}>
                            <Checkbox
                              checked={allChecked}
                              indeterminate={someChecked}
                              onChange={handleSelectAll}
                            />
                          </th>
                          <th>Third Party Name</th>
                          {profile.suggestedHasConnType && <th>Connection Type</th>}
                          <th>ID Type</th>
                          <th>ID Value</th>
                          <th>Internal Reference or ID</th>
                          <th>Country of Registration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {suggestedRows.map((r, i) => (
                          <tr key={i}>
                            <td><Checkbox checked={checked[i] || false} onChange={e => handleRowCheck(i, e.target.checked)} /></td>
                            <td><span className={styles.cellLink}>{r.name}</span></td>
                            {profile.suggestedHasConnType && <td>{r.connType}</td>}
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
                    <button className={styles.btnSearch} onClick={() => setShowLookMore(true)}>
                      <span className="material-icons-outlined" style={{ fontSize: 18 }}>search</span>
                      Look for more connections
                    </button>
                  </div>
                </div>
              )}

              </AnimatePresence>
            </div>
          </motion.section>

          {/* Risk Level Report */}
          <motion.section className={styles.riskReport} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.07 }}>
            <div className={styles.sectionRow}>
              <h2 className={styles.cardTitle}>Risk Level Report</h2>
              {!profileLoading && <Link to={`/profile/${profile.id}/risk-report`} className={styles.linkText}>VIEW FULL REPORT</Link>}
            </div>
            <AnimatePresence mode="wait">
            {profileLoading ? (
              <motion.div key="risk-loading" className={styles.blankState} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <span className={`material-icons-outlined ${styles.spinIcon}`} style={{ fontSize: 32, color: 'var(--neutral-300)' }}>sync</span>
                <p>Calculating risk profile…</p>
              </motion.div>
            ) : (
              <motion.div key="risk-loaded" className={styles.riskRow} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                {profile.riskCards.map((rc, i) => {
                  const b = riskBadgeFn(rc.level);
                  const sectionId = (profile.riskReport?.accordionSections || []).find(
                    s => s.label.toLowerCase().includes(rc.title.toLowerCase())
                  )?.id || rc.title.toLowerCase().replace(/[^a-z]+/g, '-');
                  const MotionLink = motion(Link);
                  return (
                    <MotionLink key={i} to={`/profile/${profile.id}/risk-report#${sectionId}`} className={`${styles.rcard} ${styles['rcard_' + rc.level]}`} style={{ textDecoration: 'none' }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.18 }}>
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
                    </MotionLink>
                  );
                })}
              </motion.div>
            )}
            </AnimatePresence>
          </motion.section>

          {/* Open Tasks */}
          <motion.section className={styles.tableCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.14 }}>
            <div className={styles.sectionBar}>
              <div className={styles.sectionRow}>
                <div className={styles.sectionTitleGroup}>
                  <h2 className={styles.cardTitle}>Open Tasks</h2>
                  <span className={`material-icons-outlined ${styles.infoIcon}`}>info</span>
                </div>
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
                  {profile.openTasks.map((t, i) => (
                    <tr key={i}>
                      <td>
                        <div className={styles.cellTaskType}>
                          <span className={styles.taskIconCircle}><img src={TASK_ICONS[t.icon]} alt="" /></span>
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
                <span>Showing results 1 - {profile.openTasks.length} of {profile.openTasks.length}</span>
              </div>
            </div>
          </motion.section>

          {/* Screening and Monitoring Associations */}
          <motion.section className={`${styles.tableCard} ${styles.tableCardShadow}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.21 }}>
            <div className={styles.sectionBarFlat}>
              <div className={styles.sectionRow}>
                <div className={styles.sectionTitleGroup}>
                  <h2 className={styles.cardTitle}>Screening and Monitoring Associations</h2>
                  <span className={`material-icons-outlined ${styles.infoIcon}`}>info</span>
                </div>
              </div>
            </div>
            <AnimatePresence mode="wait">
            {profileLoading ? (
              <motion.div key="screening-loading" className={styles.blankState} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <span className={`material-icons-outlined ${styles.spinIcon}`} style={{ fontSize: 32, color: 'var(--neutral-300)' }}>sync</span>
                <p>Setting up screening associations…</p>
              </motion.div>
            ) : (
              <motion.div key="screening-loaded" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
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
                  {profile.screeningRows.map((r, i) => (
                    <tr key={i}>
                      <td><span className={styles.cellLink}>{r.name}</span></td>
                      <td>
                        <div className={styles.matchBadges}>
                          {r.matches.map((m, j) => (
                            <Badge key={j} label={m.val} style={MATCH_BG_TO_STYLE[m.bg] || 'no-action'} size="large" shape="square" />
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
                            <Flag key={j} type={c.label.toLowerCase()} icon={c.label === 'AM' ? 'entity' : c.label === 'SOC' ? 'entity' : 'person'} />
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
                <span>Showing results 1 - {profile.screeningRows.length} of {profile.screeningRows.length}</span>
              </div>
            </div>
              </motion.div>
            )}
            </AnimatePresence>
          </motion.section>
        </main>
      </div>

      {/* Edit connection panel */}
      <AnimatePresence>
      {editRow && (
        <EditConnectionPanel
          row={editRow.row}
          onClose={() => setEditRow(null)}
          onSave={(connType) => {
            setConnectedRows(prev => prev.map((r, i) => i === editRow.index ? { ...r, connType } : r));
            setEditRow(null);
            setAlert({ type: 'success', message: 'Connection updated successfully' });
            setTimeout(() => setAlert(null), 5000);
          }}
        />
      )}
      </AnimatePresence>

      {/* Connect side panel */}
      <AnimatePresence>
      {connectPanelRow && (
        <ConnectPanel
          key="connect-panel"
          row={connectPanelRow}
          onClose={() => setConnectPanelRow(null)}
          onConfirm={handleConnectConfirm}
        />
      )}
      </AnimatePresence>

      {/* Look for more connections panel */}
      <AnimatePresence>
      {showLookMore && (
        <LookMorePanel
          key="look-more-panel"
          onClose={() => setShowLookMore(false)}
          onSelect={row => {
            setShowLookMore(false);
            setConnectPanelRow(row);
          }}
        />
      )}
      </AnimatePresence>

      {/* Current status side panel */}
      <AnimatePresence>
      {statusPanelOpen && (
        <StatusPanel
          key="status-panel"
          currentStatus={currentStatus}
          renewalDate={profile.overviewFields.find(f => f.label === 'Third Party Renewal Date')?.value}
          canRenew={['Approved', 'Approved*', 'Approved! (Renewal Required)'].includes(currentStatus)}
          renewalInProgress={currentStatus === 'Approved! (Renewal Required)'}
          onClose={() => setStatusPanelOpen(false)}
          onDecline={() => setDeclinePanelOpen(true)}
          onRenewal={() => { setStatusPanelOpen(false); setRenewalModalOpen(true); }}
          onCancelRenewal={() => { setStatusPanelOpen(false); setCancelRenewalModalOpen(true); }}
        />
      )}
      </AnimatePresence>

      {/* Decline panel */}
      <AnimatePresence>
      {declinePanelOpen && (
        <DeclinePanel
          key="decline-panel"
          onClose={() => setDeclinePanelOpen(false)}
          onSave={() => {
            setCurrentStatus('Declined');
            setDeclinePanelOpen(false);
            setStatusPanelOpen(false);
          }}
        />
      )}
      </AnimatePresence>

      {/* Renewal confirmation modal */}
      <AnimatePresence>
      {renewalModalOpen && (
        <motion.div
          key="renewal-modal-overlay"
          className={styles.deleteModalOverlay}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={mot.overlay}
          onClick={() => setRenewalModalOpen(false)}
        >
          <motion.div
            className={styles.deleteModal}
            initial={{ scale: 0.92, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 10 }}
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            onClick={e => e.stopPropagation()} role="dialog" aria-modal="true"
          >
            <div className={styles.deleteModalHeader}>
              <span className={styles.deleteModalTitle}>Start Renewal</span>
              <button className={styles.deleteModalClose} aria-label="Close" onClick={() => setRenewalModalOpen(false)} />
            </div>
            <div className={styles.deleteModalBody}>
              <p className={styles.deleteModalQuestion}>This action cannot be undone.</p>
              <p className={styles.deleteModalName}>{profile.shortName}</p>
              <p className={styles.deleteModalConfirm}>Are you sure you want to start the renewal process for this Third Party?</p>
            </div>
            <div className={styles.deleteModalActions}>
              <button
                className={`${styles.deleteModalBtn} ${styles.deleteModalCancel}`}
                onClick={() => setRenewalModalOpen(false)}
              >Cancel</button>
              <button
                className={`${styles.deleteModalBtn} ${styles.deleteModalContinue}`}
                style={{ background: 'var(--primary-500)' }}
                onClick={() => {
                  if (profile.id === 'dundermifflin') setDMFlow({ renewed: true, approved: false });
                  if (profile.id === 'lumon') setLumonFlow({ renewed: true, approved: false });
                  setCurrentStatus('Approved! (Renewal Required)');
                  setRenewalModalOpen(false);
                }}
              >Continue</button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Cancel renewal confirmation modal */}
      <AnimatePresence>
      {cancelRenewalModalOpen && (
        <motion.div
          key="cancel-renewal-modal-overlay"
          className={styles.deleteModalOverlay}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={mot.overlay}
          onClick={() => setCancelRenewalModalOpen(false)}
        >
          <motion.div
            className={styles.deleteModal}
            initial={{ scale: 0.92, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 10 }}
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            onClick={e => e.stopPropagation()} role="dialog" aria-modal="true"
          >
            <div className={styles.deleteModalHeader}>
              <span className={styles.deleteModalTitle}>Cancel Renewal</span>
              <button className={styles.deleteModalClose} aria-label="Close" onClick={() => setCancelRenewalModalOpen(false)} />
            </div>
            <div className={styles.deleteModalBody}>
              <p className={styles.deleteModalQuestion}>This action cannot be undone.</p>
              <p className={styles.deleteModalName}>{profile.shortName}</p>
              <p className={styles.deleteModalConfirm}>Are you sure you want to cancel the renewal process for this Third Party?</p>
            </div>
            <div className={styles.deleteModalActions}>
              <button
                className={`${styles.deleteModalBtn} ${styles.deleteModalCancel}`}
                onClick={() => setCancelRenewalModalOpen(false)}
              >Cancel</button>
              <button
                className={`${styles.deleteModalBtn} ${styles.deleteModalContinue}`}
                style={{ background: 'var(--alert-500)' }}
                onClick={() => {
                  if (profile.id === 'dundermifflin') { setDMFlow({ renewed: false, approved: false }); setCurrentStatus('Approved! (Renewal Required)'); }
                  else if (profile.id === 'lumon') { setLumonFlow({ renewed: false, approved: false }); setCurrentStatus('Approved'); }
                  else if (profile.id === 'initech') { setCurrentStatus('Approved*'); }
                  setCancelRenewalModalOpen(false);
                }}
              >Confirm</button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Notes side panel */}
      <AnimatePresence>
      {showNotes && (
        <NotesPanel
          key="notes-panel"
          profileName={profile.shortName}
          notes={notes}
          noteText={noteText}
          onNoteTextChange={setNoteText}
          onAddNote={() => {
            if (noteText.trim()) {
              setNotes(prev => [...prev, { text: noteText.trim(), time: new Date().toLocaleString() }]);
              setNoteText('');
            }
          }}
          onClose={() => setShowNotes(false)}
        />
      )}
      </AnimatePresence>
    </>
  );

  return embedded ? content : <PageLayout>{content}</PageLayout>;
}

/* ─────────────────────── Row context menu ─────────────────────── */

function RowMenu({ open, onToggle, onClose, onEdit, onDisconnect }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e) { if (ref.current && !ref.current.contains(e.target)) onClose(); }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onClose]);

  return (
    <div className={styles.rowMenuWrap} ref={ref}>
      <button className={styles.rowMenuTrigger} onClick={onToggle}>
        <span className="material-icons-outlined" style={{ fontSize: 18 }}>more_vert</span>
      </button>
      <AnimatePresence>
      {open && (
        <motion.div
          className={styles.rowMenuDropdown}
          initial={{ opacity: 0, scale: 0.92, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: -4 }}
          transition={{ duration: 0.15 }}
          style={{ transformOrigin: 'top right' }}
        >
          <button className={styles.rowMenuItem} onClick={onEdit}>
            <span className="material-icons-outlined" style={{ fontSize: 16 }}>edit</span>
            Edit
          </button>
          <button className={`${styles.rowMenuItem} ${styles.rowMenuItemDanger}`} onClick={onDisconnect}>
            <span className="material-icons-outlined" style={{ fontSize: 16 }}>link_off</span>
            Disconnect
          </button>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────── Edit connection panel ─────────────────────── */

function EditConnectionPanel({ row, onClose, onSave }) {
  const [connType, setConnType] = useState(row.connType || '');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const fields = [
    { label: 'Third Party Name', value: row.name },
    { label: 'ID Type', value: row.idType },
    { label: 'ID Value', value: row.idValue },
    { label: 'Internal Reference or ID', value: row.intRef },
    { label: 'Country of Registration', value: row.country },
  ];

  return (
    <>
      <motion.div className={styles.connectOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={mot.overlay} onClick={onClose} />
      <div className={styles.connectPanel}><motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={mot.panel} style={{ height: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className={styles.connectPanelHeader}>
          <span className={styles.connectPanelTitle}>Edit Connection</span>
          <button className={`${styles.btn} ${styles.btnOutline}`} onClick={onClose}>Close</button>
        </div>
        <div className={styles.connectPanelBody}>
          <div className={styles.connectPanelInfo}>
            {fields.map((f, i) => (
              <div key={i} className={styles.connectField}>
                <div className={styles.connectFieldLabel}>{f.label}</div>
                <div className={styles.connectFieldValue}>{f.value || '—'}</div>
              </div>
            ))}
          </div>
          <div className={styles.connectTypeSection}>
            <label className={styles.connectTypeLabel}>
              Connection Type <span style={{ color: 'var(--alert-500)' }}>*</span>
            </label>
            <select
              className={styles.connectTypeSelect}
              value={connType}
              onChange={e => setConnType(e.target.value)}
            >
              <option value="">Select a connection type…</option>
              {CONNECTION_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className={styles.connectPanelFooter}>
          <button className={`${styles.btn} ${styles.btnOutline}`} onClick={onClose}>Cancel</button>
          <button
            className={`${styles.btn} ${styles.btnFilled}`}
            disabled={!connType}
            onClick={() => onSave(connType)}
          >
            Save
          </button>
        </div>
      </motion.div></div>
    </>
  );
}

/* ─────────────────────── Connect side panel ─────────────────────── */

const CONNECTION_TYPES = ['Subsidiary', 'Parent Company', 'Joint Venture', 'Affiliate', 'Branch', 'Agent', 'Supplier', 'Customer', 'Subcontractor'];

function ConnectPanel({ row, onClose, onConfirm }) {
  const [connType, setConnType] = useState(row.connType || '');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const fields = [
    { label: 'Third Party Name', value: row.name },
    { label: 'ID Type', value: row.idType },
    { label: 'ID Value', value: row.idValue },
    { label: 'Internal Reference or ID', value: row.intRef },
    { label: 'Country of Registration', value: row.country },
  ];

  return (
    <>
      <motion.div className={styles.connectOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={mot.overlay} onClick={onClose} />
      <div className={styles.connectPanel}><motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={mot.panel} style={{ height: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className={styles.connectPanelHeader}>
          <span className={styles.connectPanelTitle}>Connect Third Party</span>
          <button className={`${styles.btn} ${styles.btnOutline}`} onClick={onClose}>Close</button>
        </div>
        <div className={styles.connectPanelBody}>
          <div className={styles.connectPanelInfo}>
            {fields.map((f, i) => (
              <div key={i} className={styles.connectField}>
                <div className={styles.connectFieldLabel}>{f.label}</div>
                <div className={styles.connectFieldValue}>{f.value || '—'}</div>
              </div>
            ))}
          </div>
          <div className={styles.connectTypeSection}>
            <label className={styles.connectTypeLabel}>
              Connection Type <span style={{ color: 'var(--alert-500)' }}>*</span>
            </label>
            <select
              className={styles.connectTypeSelect}
              value={connType}
              onChange={e => setConnType(e.target.value)}
            >
              <option value="">Select a connection type…</option>
              {CONNECTION_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className={styles.connectPanelFooter}>
          <button className={`${styles.btn} ${styles.btnOutline}`} onClick={onClose}>Cancel</button>
          <button
            className={`${styles.btn} ${styles.btnFilled}`}
            disabled={!connType}
            onClick={() => onConfirm(row, connType)}
          >
            Connect
          </button>
        </div>
      </motion.div></div>
    </>
  );
}

/* ─────────────────────── Notes side panel ─────────────────────── */

const TOOLBAR_BUTTONS = [
  { icon: 'format_bold', title: 'Bold' },
  { icon: 'format_italic', title: 'Italic' },
  { icon: 'format_underlined', title: 'Underline' },
  { icon: 'format_list_bulleted', title: 'Bullet List' },
  { icon: 'format_list_numbered', title: 'Numbered List' },
  { icon: 'keyboard_return', title: 'Line Break' },
];

function NotesPanel({ profileName, notes, noteText, onNoteTextChange, onAddNote, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <>
      <motion.div className={styles.connectOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={mot.overlay} onClick={onClose} />
      <div className={styles.notesPanel}><motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={mot.panel} style={{ height: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className={styles.notesPanelHeader}>
          <h5 className={styles.notesPanelTitle}>Note - {profileName} / Available Threads</h5>
          <button className={`${styles.btn} ${styles.btnOutline}`} onClick={onClose}>Close</button>
        </div>
        <div className={styles.notesPanelContent}>
          {notes.length === 0
            ? <div className={styles.notesEmpty}>No notes yet.</div>
            : notes.map((n, i) => (
                <div key={i} className={styles.noteItem}>
                  <div className={styles.noteItemText}>{n.text}</div>
                  <div className={styles.noteItemMeta}>{n.time}</div>
                </div>
              ))
          }
        </div>
        <div className={styles.notesPanelFooter}>
          <div className={styles.notesToolbar}>
            {TOOLBAR_BUTTONS.map(b => (
              <button key={b.icon} className={styles.notesToolbarBtn} title={b.title} type="button">
                <span className="material-icons-outlined" style={{ fontSize: 18 }}>{b.icon}</span>
              </button>
            ))}
          </div>
          <textarea
            className={styles.notesTextarea}
            placeholder="Start a new thread..."
            value={noteText}
            onChange={e => onNoteTextChange(e.target.value)}
          />
          <div className={styles.notesActions}>
            <button className={`${styles.btn} ${styles.btnOutline}`} type="button">Include Internal User</button>
            <button className={`${styles.btn} ${styles.btnOutline}`} type="button">Include External User</button>
            <button className={`${styles.btn} ${styles.btnOutline}`} type="button">Add Attachment</button>
            <button className={`${styles.btn} ${styles.btnFilled}`} type="button" onClick={onAddNote}>
              Add Note
            </button>
          </div>
        </div>
      </motion.div></div>
    </>
  );
}

/* ─────────────────────── Look for more connections panel ─────────────────────── */

const SEARCH_POOL = [
  { name: 'ROSNEFT OAO',          connType: 'Subsidiary',   idType: 'DUNS Number', idValue: '552341209',    intRef: 'R1100567D', country: 'Russian Federation' },
  { name: 'SURGUTNEFTEGAS PJSC',  connType: 'Affiliate',    idType: 'LEI',         idValue: 'RU0620000088', intRef: 'S2209341E', country: 'Russian Federation' },
  { name: 'TRANSNEFT PJSC',       connType: 'Affiliate',    idType: 'LEI',         idValue: 'RU0430000072', intRef: 'T8823456E', country: 'Russian Federation' },
  { name: 'NOVATEK PJSC',         connType: 'Joint Venture',idType: 'LEI',         idValue: 'RU0520000045', intRef: 'N4456789B', country: 'Russian Federation' },
  { name: 'LUKOIL OAO',           connType: 'Subsidiary',   idType: 'BVD ID',      idValue: 'BVD432187',    intRef: 'L3312678C', country: 'Russian Federation' },
  { name: 'SIBUR HOLDING',        connType: 'Parent',       idType: 'BVD ID',      idValue: 'BVD891234',    intRef: 'S5534567F', country: 'Russian Federation' },
  { name: 'RUSHYDRO PJSC',        connType: 'Subsidiary',   idType: 'LEI',         idValue: 'RU0530000099', intRef: 'RH441200C', country: 'Russian Federation' },
];

function LookMorePanel({ onClose, onSelect }) {
  const [nameQuery, setNameQuery] = useState('');
  const [results, setResults] = useState(null);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  function handleSearch() {
    const filtered = SEARCH_POOL.filter(r =>
      !nameQuery.trim() || r.name.toLowerCase().includes(nameQuery.toLowerCase())
    );
    setResults(filtered);
    setChecked(filtered.map(() => false));
  }

  const allChecked  = checked.length > 0 && checked.every(Boolean);
  const someChecked = checked.some(Boolean) && !allChecked;
  const anyChecked  = checked.some(Boolean);

  function handleSelectAll(e) { setChecked(checked.map(() => e.target.checked)); }
  function handleRowCheck(i, val) { const next = [...checked]; next[i] = val; setChecked(next); }

  function handleConnect() {
    const idx = checked.findIndex(Boolean);
    if (idx === -1) return;
    onSelect(results[idx]);
  }

  function handleDiscard() {
    setChecked(checked.map(() => false));
  }

  return (
    <>
      <motion.div className={styles.connectOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={mot.overlay} onClick={onClose} />
      <div className={styles.lookMorePanel}><motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={mot.panel} style={{ height: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className={styles.connectPanelHeader}>
          <span className={styles.connectPanelTitle}>Search for connections</span>
          <button className={`${styles.btn} ${styles.btnOutline}`} onClick={onClose}>Close</button>
        </div>

        <div className={styles.connectPanelBody}>
          {/* Search row */}
          <div className={styles.searchFormField} style={{ marginBottom: 20 }}>
            <label className={styles.searchFormLabel}>Entity Name</label>
            <div className={styles.searchInlineRow}>
              <input
                className={styles.searchFormInput}
                type="text"
                placeholder="Search for entity"
                value={nameQuery}
                onChange={e => setNameQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
              <button className={`${styles.btn} ${styles.btnFilled}`} style={{ height: 40, padding: '0 16px' }} onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>

          {/* Results */}
          {results !== null && (
            results.length === 0 ? (
              <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--text-light)', fontSize: 13 }}>
                No third parties found matching your search.
              </div>
            ) : (
              <>
                <div className={styles.searchSuggestedHeader}>
                  <span className={styles.searchSuggestedTitle}>Suggested Third Parties</span>
                  <div className={styles.connActions}>
                    <button className={`${styles.btn} ${styles.btnDiscard}`} disabled={!anyChecked} onClick={handleDiscard}>Discard</button>
                    <button className={`${styles.btn} ${styles.btnConnect}`} disabled={!anyChecked} onClick={handleConnect}>Connect</button>
                  </div>
                </div>
                <div className={styles.connTableWrap}>
                <table className={styles.table} style={{ minWidth: 0 }}>
                  <thead>
                    <tr>
                      <th style={{ width: 32 }}>
                        <Checkbox
                          checked={allChecked}
                          indeterminate={someChecked}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th>Third Party Name</th>
                      <th>Connection Type</th>
                      <th>ID Type</th>
                      <th>ID Value</th>
                      <th>Internal Reference or ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr key={i}>
                        <td><Checkbox checked={checked[i] || false} onChange={e => handleRowCheck(i, e.target.checked)} /></td>
                        <td><span className={styles.cellLink}>{r.name}</span></td>
                        <td>{r.connType}</td>
                        <td>{r.idType}</td>
                        <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{r.idValue}</td>
                        <td>{r.intRef}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </>
            )
          )}
        </div>

        <div className={styles.connectPanelFooter}>
          <button className={`${styles.btn} ${styles.btnOutline}`} onClick={onClose}>Cancel</button>
        </div>
      </motion.div></div>
    </>
  );
}

/* ─────────────────────── Status panel ─────────────────────── */

function StatusPanel({ currentStatus, renewalDate, canRenew, renewalInProgress, onClose, onDecline, onRenewal, onCancelRenewal }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const { cls, icon } = getStatusConfig(currentStatus);

  return (
    <>
      <div className={styles.deleteModalOverlay} style={{ background: 'rgba(0,0,0,0.2)' }} onClick={onClose} />
      <motion.div
        className={styles.statusPanel}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className={styles.statusPanelHeader}>
          <span className={styles.statusPanelTitle}>Current Status:</span>
          <button className={styles.statusPanelClose} onClick={onClose}>CLOSE</button>
        </div>
        <div className={styles.statusPanelAccent} />

        <div className={styles.statusPanelBody}>
          <div className={styles.statusPanelSectionLabel}>Current Status</div>
          <div className={styles.statusPanelOptions}>
            <div className={styles.statusOption}>
              <div className={`${styles.badge} ${styles[cls]}`}>
                {currentStatus}
                <span className="material-icons-outlined" style={{ fontSize: 16 }}>{icon}</span>
              </div>
            </div>
          </div>

          {renewalDate && canRenew && (
            <div className={styles.statusPanelRenewal}>
              <div className={styles.statusPanelSectionLabel} style={{ marginTop: 20 }}>Third Party Renewal Date</div>
              <div className={styles.statusPanelRenewalRow}>
                <span className={styles.statusPanelRenewalDate}>{renewalDate}</span>
                {renewalInProgress
                  ? <button className={`${styles.btn} ${styles.btnFilled}`} style={{ background: 'var(--alert-500)' }} onClick={onCancelRenewal}>Cancel Renewal</button>
                  : <button className={`${styles.btn} ${styles.btnFilled}`} onClick={onRenewal}>Renewal</button>
                }
              </div>
            </div>
          )}
        </div>

        <div className={styles.statusPanelFooter}>
          <button className={`${styles.btn} ${styles.btnFilled}`} onClick={onDecline}>Decline</button>
        </div>
      </motion.div>
    </>
  );
}

/* ─────────────────────── Decline panel ─────────────────────── */

function DeclinePanel({ onClose, onSave }) {
  const [reason, setReason] = useState('');
  const [fileName, setFileName] = useState('');
  const fileRef = useRef(null);

  return (
    <>
      <motion.div
        className={styles.statusPanel}
        style={{ zIndex: 'calc(var(--z-panel) + 1)' }}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className={styles.statusPanelHeader}>
          <span className={styles.statusPanelTitle}>Current Status:</span>
          <button className={styles.statusPanelClose} onClick={onClose}>CLOSE</button>
        </div>
        <div className={styles.statusPanelAccent} />

        <div className={styles.statusPanelBody}>
          <div className={styles.statusPanelSectionLabel}>Current Status</div>
          <div className={styles.declineStatusChip}>
            <span>DECLINE</span>
          </div>

          <div className={styles.declineFieldLabel}>
            Decline Reason <span className={styles.declineRequired}>*</span>
          </div>
          <textarea
            className={styles.declineTextarea}
            value={reason}
            onChange={e => setReason(e.target.value)}
          />
          <div className={styles.declineWarning}>Once declined Third Party can't be reinstated.</div>

          <div className={styles.statusPanelSectionLabel} style={{ marginTop: 20 }}>Support Documents</div>
          <div className={styles.declineFileRow}>
            <span className={styles.declineFileLabel}>{fileName || 'Choose Files'}</span>
            <button className={styles.declineBrowseBtn} onClick={() => fileRef.current?.click()}>Browse</button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,.pdf,.doc,.docx"
            multiple
            style={{ display: 'none' }}
            onChange={e => setFileName(e.target.files?.[0]?.name || '')}
          />
          <p className={styles.declineFileHint}>
            Click the 'Choose Files' button to browse for a file and then click the 'Upload'. Uploaded files will appear below. Allowed file types include: <strong>.csv,.pdf,.doc,.docx</strong><br />Multiple uploads are permitted.
          </p>
          <button className={styles.declineUploadBtn}>Upload</button>
        </div>

        <div className={styles.statusPanelFooter}>
          <button className={`${styles.btn} ${styles.btnOutline}`} onClick={onClose}>Cancel</button>
          <button
            className={`${styles.btn} ${styles.btnFilled}`}
            disabled={!reason.trim()}
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </motion.div>
    </>
  );
}
