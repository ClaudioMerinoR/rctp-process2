import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import partnerIconIntegrity from '../../assets/partner-icon-integrity.png';
import partnerIconUbo from '../../assets/partner-icon-ubo.png';
import iconFlag from '../../assets/icon-flag.svg';
import iconInactiveOrder from '../../assets/icon-inactive-order.svg';
import iconFactCheck from '../../assets/icon-fact-check.svg';
import iconFinanceMode from '../../assets/icon-finance-mode.svg';
import iconFrame9 from '../../assets/icon-frame9.svg';
import iconArmingCountdown from '../../assets/icon-arming-countdown.svg';
import styles from './profile.module.css';

const TASK_ICONS = { iconFlag, iconInactiveOrder, iconFactCheck, iconFinanceMode, iconFrame9, iconArmingCountdown };
const PARTNER_ICONS = { integrity: partnerIconIntegrity, ubo: partnerIconUbo };

function riskBadge(level) {
  if (level === 'high')   return { className: styles.badgeHigh,   icon: 'error_outline',       label: 'High'   };
  if (level === 'medium') return { className: styles.badgeMedium, icon: 'error_outline',        label: 'Medium' };
  return                         { className: styles.badgeLow,    icon: 'check_circle_outline', label: 'LOW'    };
}

function PartnerIcon({ partner, tooltip }) {
  const img = PARTNER_ICONS[partner];
  if (!img) return null;
  const icon = (
    <span className={styles.navPartnerIcon}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" fill="white" stroke="#B1BCC5" /></svg>
      <img src={img} alt="" />
    </span>
  );
  if (tooltip) {
    return (
      <span className={styles.navPartnerIconWrap}>
        {icon}
        <span className={styles.navTooltip}>{tooltip}</span>
      </span>
    );
  }
  return icon;
}

function Sidebar({ profile, activePage = 'summary' }) {
  return (
    <aside className={styles.sideNav}>
      {activePage === 'summary' ? (
        <div className={styles.navItemActive}>Summary page</div>
      ) : (
        <Link to={`/profile/${profile.id}`} className={styles.navItem} style={{ textDecoration: 'none' }}>
          Summary page
        </Link>
      )}
      <div className={styles.navDivider} />

      {profile.sidebarSteps.map((step, i) => {
        const dotCls = step.dot === 'red' ? styles.dotRed
          : step.dot === 'green' ? styles.dotGreen
          : step.dot === 'amber' ? styles.dotAmber
          : styles.dotGrey;

        if (step.tooltip || step.newTag) {
          return (
            <div key={i} className={styles.navItem}>
              <div className={styles.navItemWrap}>
                <span className={`${styles.dot} ${dotCls}`} />
                {step.label}
                {step.partner && <PartnerIcon partner={step.partner} tooltip={step.tooltip} />}
                {step.newTag && <span className={styles.navNewTag}>New</span>}
              </div>
            </div>
          );
        }

        return (
          <div key={i} className={styles.navItem}>
            <span className={`${styles.dot} ${dotCls}`} />
            {step.label}
            {step.partner && <PartnerIcon partner={step.partner} />}
          </div>
        );
      })}

      <div className={styles.navDivider} />

      {profile.sidebarSections.map((sec, i) => {
        if (sec.isDocuments && activePage === 'documents') {
          return <div key={i} className={styles.navSectionLabelActive}>{sec.label}</div>;
        }
        if (sec.isDocuments) {
          return (
            <Link key={i} to={`/profile/${profile.id}/documents`} className={styles.navSectionLabel} style={{ textDecoration: 'none' }}>
              {sec.label}
            </Link>
          );
        }
        return (
          <div key={i} className={styles.navSectionLabel}>
            {sec.label}
            {sec.partner && (
              <span style={{ marginLeft: 4 }}>
                <PartnerIcon partner={sec.partner} tooltip={sec.tooltip} />
              </span>
            )}
          </div>
        );
      })}

      <div className={styles.navDivider} />
    </aside>
  );
}

export { Sidebar, PartnerIcon, PARTNER_ICONS, TASK_ICONS, riskBadge };

export default function ProfilePage({ profile: profileProp, embedded = false }) {
  const params = useParams();
  const navigate = useNavigate();
  const profile = profileProp || profiles[params.profileId];
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
      {profile.alertBanners && alert && (
        <div className={`${styles.connAlert} ${styles['connAlert_' + alert.type]}`}>
          <span className={`${styles.connAlertIcon} material-icons-outlined`}>
            {alert.type === 'success' ? 'check_circle' : 'remove_circle'}
          </span>
          <span className={styles.connAlertText}>{alert.message}</span>
        </div>
      )}

      {/* Delete modal */}
      {profile.deleteModal && deleteModalOpen && (
        <div className={styles.deleteModalOverlay} onClick={() => setDeleteModalOpen(false)}>
          <div className={styles.deleteModal} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
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
          </div>
        </div>
      )}

      {!embedded && <Breadcrumb items={[
        { label: 'Third Parties', to: '/third-parties' },
        { label: profile.shortName },
      ]} />}

      {/* Top Strip */}
      <div className={styles.tpTopStrip}>
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
                <div className={`${styles.badge} ${styles.badgePending} ${styles.badgeBtn}`}>
                  {profile.currentStatus.label}
                  <span className="material-icons-outlined" style={{ fontSize: 16 }}>{profile.currentStatus.icon}</span>
                </div>
              </div>
              <div className={styles.tpBadgeGroup}>
                <div className={styles.tpBadgeLabel}>Risk level:</div>
                <div className={`${styles.badge} ${styles['badge' + profile.riskLevel.level.charAt(0).toUpperCase() + profile.riskLevel.level.slice(1)]} ${styles.badgeBtn}`}>
                  {profile.riskLevel.label}
                  <span className="material-icons-outlined" style={{ fontSize: 16 }}>{profile.riskLevel.icon}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Body */}
      <div className={styles.pageBody}>
        <Sidebar profile={profile} activePage="summary" />

        <main className={styles.mainContent}>
          {/* Details Card */}
          <section className={`${styles.card} ${styles.detailsCard}`}>
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
                    {profile.overviewFields.map((f, i) => (
                      <div key={i}>
                        <div className={styles.fieldLabel}>{f.label}</div>
                        {f.flag ? (
                          <div className={`${styles.fieldValue} ${styles.fieldValueFlag}`}>
                            <span style={{ fontSize: 20 }}>{f.flag}</span> {f.value}
                          </div>
                        ) : (
                          <div className={styles.fieldValue}>{f.value}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Details */}
              {activeTab === 'additional' && (
                <div className={styles.tabPanel}>
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
                            <td><input type="checkbox" checked={checked[i] || false} onChange={e => handleRowCheck(i, e.target.checked)} /></td>
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
            </div>
          </section>

          {/* Risk Level Report */}
          <section className={styles.riskReport}>
            <div className={styles.sectionRow}>
              <h2 className={styles.cardTitle}>Risk Level Report</h2>
              <Link to={`/profile/${profile.id}/risk-report`} className={styles.linkText}>VIEW FULL REPORT</Link>
            </div>
            <div className={styles.riskRow}>
              {profile.riskCards.map((rc, i) => {
                const b = riskBadge(rc.level);
                const sectionId = (profile.riskReport?.accordionSections || []).find(
                  s => s.label.toLowerCase().includes(rc.title.toLowerCase())
                )?.id || rc.title.toLowerCase().replace(/[^a-z]+/g, '-');
                return (
                  <Link key={i} to={`/profile/${profile.id}/risk-report#${sectionId}`} className={`${styles.rcard} ${styles['rcard_' + rc.level]}`} style={{ textDecoration: 'none' }}>
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
                  </Link>
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
                  {profile.screeningRows.map((r, i) => (
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
                <span>Showing results 1 - {profile.screeningRows.length} of {profile.screeningRows.length}</span>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Edit connection panel */}
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

      {/* Connect side panel */}
      {connectPanelRow && (
        <ConnectPanel
          row={connectPanelRow}
          onClose={() => setConnectPanelRow(null)}
          onConfirm={handleConnectConfirm}
        />
      )}

      {/* Look for more connections panel */}
      {showLookMore && (
        <LookMorePanel
          onClose={() => setShowLookMore(false)}
          onSelect={row => {
            setShowLookMore(false);
            setConnectPanelRow(row);
          }}
        />
      )}

      {/* Notes side panel */}
      {showNotes && (
        <NotesPanel
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
      {open && (
        <div className={styles.rowMenuDropdown}>
          <button className={styles.rowMenuItem} onClick={onEdit}>
            <span className="material-icons-outlined" style={{ fontSize: 16 }}>edit</span>
            Edit
          </button>
          <button className={`${styles.rowMenuItem} ${styles.rowMenuItemDanger}`} onClick={onDisconnect}>
            <span className="material-icons-outlined" style={{ fontSize: 16 }}>link_off</span>
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────── Edit connection panel ─────────────────────── */

function EditConnectionPanel({ row, onClose, onSave }) {
  const { closing, triggerClose, handleAnimationEnd } = useClosingAnimation(onClose);
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
      <div
        className={`${styles.connectOverlay} ${closing ? styles.connectOverlayClosing : ''}`}
        onClick={triggerClose}
      />
      <div
        className={`${styles.connectPanel} ${closing ? styles.connectPanelClosing : ''}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className={styles.connectPanelHeader}>
          <span className={styles.connectPanelTitle}>Edit Connection</span>
          <button className={`${styles.btn} ${styles.btnOutline}`} onClick={triggerClose}>Close</button>
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
          <button className={`${styles.btn} ${styles.btnOutline}`} onClick={triggerClose}>Cancel</button>
          <button
            className={`${styles.btn} ${styles.btnFilled}`}
            disabled={!connType}
            onClick={() => onSave(connType)}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────── Shared panel close hook ─────────────────────── */

function useClosingAnimation(onClose) {
  const [closing, setClosing] = useState(false);
  function triggerClose() { setClosing(true); }
  function handleAnimationEnd() { if (closing) onClose(); }
  return { closing, triggerClose, handleAnimationEnd };
}

/* ─────────────────────── Connect side panel ─────────────────────── */

const CONNECTION_TYPES = ['Subsidiary', 'Parent Company', 'Joint Venture', 'Affiliate', 'Branch', 'Agent', 'Supplier', 'Customer', 'Subcontractor'];

function ConnectPanel({ row, onClose, onConfirm }) {
  const { closing, triggerClose, handleAnimationEnd } = useClosingAnimation(onClose);
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
      <div
        className={`${styles.connectOverlay} ${closing ? styles.connectOverlayClosing : ''}`}
        onClick={triggerClose}
      />
      <div
        className={`${styles.connectPanel} ${closing ? styles.connectPanelClosing : ''}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className={styles.connectPanelHeader}>
          <span className={styles.connectPanelTitle}>Connect Third Party</span>
          <button className={`${styles.btn} ${styles.btnOutline}`} onClick={triggerClose}>Close</button>
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
          <button className={`${styles.btn} ${styles.btnOutline}`} onClick={triggerClose}>Cancel</button>
          <button
            className={`${styles.btn} ${styles.btnFilled}`}
            disabled={!connType}
            onClick={() => onConfirm(row, connType)}
          >
            <span className="material-icons-outlined" style={{ fontSize: 16 }}>link</span>
            Connect
          </button>
        </div>
      </div>
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
  const { closing, triggerClose, handleAnimationEnd } = useClosingAnimation(onClose);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <>
      <div
        className={`${styles.connectOverlay} ${closing ? styles.connectOverlayClosing : ''}`}
        onClick={triggerClose}
      />
      <div
        className={`${styles.notesPanel} ${closing ? styles.notesPanelClosing : ''}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className={styles.notesPanelHeader}>
          <span className={styles.notesPanelTitle}>Note - {profileName} / Available Threads</span>
          <button className={`${styles.btn} ${styles.btnOutline}`} onClick={triggerClose}>Close</button>
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
            <button className={`${styles.btn} ${styles.btnOutline}`} type="button">
              <span className="material-icons-outlined" style={{ fontSize: 16 }}>person_add</span>
              Include Internal User
            </button>
            <button className={`${styles.btn} ${styles.btnOutline}`} type="button">
              <span className="material-icons-outlined" style={{ fontSize: 16 }}>person_add_alt</span>
              Include External User
            </button>
            <button className={`${styles.btn} ${styles.btnOutline}`} type="button">
              <span className="material-icons-outlined" style={{ fontSize: 16 }}>attach_file</span>
              Add Attachment
            </button>
            <button className={`${styles.btn} ${styles.btnFilled}`} type="button" onClick={onAddNote}>
              Add Note
            </button>
          </div>
        </div>
      </div>
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
  const { closing, triggerClose, handleAnimationEnd } = useClosingAnimation(onClose);
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
    const row = results[idx];
    triggerClose();
    setTimeout(() => onSelect(row), 220);
  }

  function handleDiscard() {
    setChecked(checked.map(() => false));
  }

  return (
    <>
      <div
        className={`${styles.connectOverlay} ${closing ? styles.connectOverlayClosing : ''}`}
        onClick={triggerClose}
      />
      <div
        className={`${styles.lookMorePanel} ${closing ? styles.lookMorePanelClosing : ''}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className={styles.connectPanelHeader}>
          <span className={styles.connectPanelTitle}>Search for connections</span>
          <button className={`${styles.btn} ${styles.btnOutline}`} onClick={triggerClose}>Close</button>
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
              <button className={`${styles.btn} ${styles.btnFilled}`} onClick={handleSearch}>
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
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr key={i}>
                        <td><input type="checkbox" checked={checked[i] || false} onChange={e => handleRowCheck(i, e.target.checked)} /></td>
                        <td><span className={styles.cellLink}>{r.name}</span></td>
                        <td>{r.connType}</td>
                        <td>{r.idType}</td>
                        <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{r.idValue}</td>
                        <td>{r.intRef}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )
          )}
        </div>

        <div className={styles.connectPanelFooter}>
          <button className={`${styles.btn} ${styles.btnOutline}`} onClick={triggerClose}>Cancel</button>
        </div>
      </div>
    </>
  );
}
