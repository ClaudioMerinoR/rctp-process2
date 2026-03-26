import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
  const profile = profileProp || profiles[params.profileId];
  const [activeTab, setActiveTab] = useState('overview');
  const [alert, setAlert] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [checked, setChecked] = useState((profile?.suggestedRows || []).map(() => false));
  const allChecked  = checked.length > 0 && checked.every(Boolean);
  const someChecked = checked.some(Boolean) && !allChecked;
  const anyChecked  = checked.some(Boolean);

  if (!profile) return <div style={{ padding: 40, textAlign: 'center' }}>Profile not found</div>;

  function handleSelectAll(e) { setChecked(checked.map(() => e.target.checked)); }
  function handleRowCheck(i, val) { const next = [...checked]; next[i] = val; setChecked(next); }

  function handleConnect() {
    setChecked(profile.suggestedRows.map(() => false));
    setAlert({ type: 'success', message: 'Connection added successfully' });
    setTimeout(() => setAlert(null), 5000);
  }
  function handleDiscard() {
    setChecked(profile.suggestedRows.map(() => false));
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
                        {profile.connectedRows.map((r, i) => (
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
                          {profile.suggestedHasConnType && <th>Connection Type</th>}
                          <th>ID Type</th>
                          <th>ID Value</th>
                          <th>Internal Reference or ID</th>
                          <th>Country of Registration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {profile.suggestedRows.map((r, i) => (
                          <tr key={i}>
                            <td><input type="checkbox" checked={checked[i]} onChange={e => handleRowCheck(i, e.target.checked)} /></td>
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
              <Link to={`/profile/${profile.id}/risk-report`} className={styles.linkText}>VIEW FULL REPORT</Link>
            </div>
            <div className={styles.riskRow}>
              {profile.riskCards.map((rc, i) => {
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
    </>
  );

  return embedded ? content : <PageLayout>{content}</PageLayout>;
}
