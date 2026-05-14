import { useState, useRef, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { Sidebar } from './ProfilePage';
import { STATUS_CONFIG } from './ProfilePageHeader';
import { RiskLevelIcon } from './profileAssets';
import Checkbox from '../ui/Checkbox';
import styles from './ProfileEdit.module.css';
import profileStyles from './profile.module.css';

/* ── Static data (mirroring AddThirdParty) ── */
const OWNER_OPTIONS = ['Not Approval Group','Sed Bibendum Felis A Posuere Consectetur','Test','Test 4','This Is The Name Of My Default Group','Ut Condimentum Rutrum Posuere','Vivamus Sed Sodales Erat','Tamara Knoetschke','Miruna Menzopol (Admin)','Emily Forbes'];
const BU_OPTIONS = ['Europe','Americas','Asia Pacific','Entity Verification','Global Operations','Global'];
const TAG_OPTIONS = ['Gas & Oil','Energy','Manufacturing','Financial Services','Technology','Healthcare'];
const PROCESS_OPTIONS = ['Standard RCTP','Fast Track RCTP','Enhanced RCTP'];
const POLICY_OPTIONS = ['Default Standard KYBP Policy','Default Screening & Monitoring Policy','Enhanced Monitoring Policy'];

function useOutsideClick(ref, cb) {
  useEffect(() => {
    function handler(e) { if (ref.current && !ref.current.contains(e.target)) cb(); }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, cb]);
}

export default function ProfileEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const profile = profiles[params.profileId];
  const [alert, setAlert] = useState(null);

  /* ── Form state (derived from profile data) ── */
  const [tpName, setTpName] = useState(profile?.name || '');
  const [active, setActive] = useState(true);
  const [ownerMode, setOwnerMode] = useState('user');
  const [owner, setOwner] = useState(() => {
    const v = profile?.overviewFields?.find(f => f.label === 'Third Party Owner')?.value;
    return v || '';
  });
  const [process, setProcess] = useState(() => profile?.overviewFields?.find(f => f.label === 'Process Name')?.value || 'Standard RCTP');
  const [businessUnits, setBusinessUnits] = useState(() => {
    const v = profile?.overviewFields?.find(f => f.label === 'Business Unit')?.value;
    return v && v !== '\u2014' ? [v] : [];
  });
  const [policy, setPolicy] = useState(() => profile?.overviewFields?.find(f => f.label === 'Screening & Monitoring Policy')?.value || '');
  const [tags, setTags] = useState(() => {
    const v = profile?.overviewFields?.find(f => f.label === 'Tags')?.value;
    return v && v !== '\u2014' ? [v] : [];
  });

  /* ── Dropdown open state ── */
  const [ownerOpen, setOwnerOpen] = useState(false);
  const [buOpen, setBuOpen] = useState(false);
  const [processOpen, setProcessOpen] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [tagsOpen, setTagsOpen] = useState(false);
  const ownerRef = useRef();
  const buRef = useRef();
  const processRef = useRef();
  const policyRef = useRef();
  const tagsRef = useRef();

  useOutsideClick(ownerRef, () => setOwnerOpen(false));
  useOutsideClick(buRef, () => setBuOpen(false));
  useOutsideClick(processRef, () => setProcessOpen(false));
  useOutsideClick(policyRef, () => setPolicyOpen(false));
  useOutsideClick(tagsRef, () => setTagsOpen(false));

  if (!profile) return <div style={{ padding: 40, textAlign: 'center' }}>Profile not found</div>;

  function selectOwner(val) { setOwner(val); setOwnerOpen(false); }
  function toggleBu(val) { setBusinessUnits(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]); }
  function removeBu(val) { setBusinessUnits(prev => prev.filter(x => x !== val)); }
  function toggleTag(val) { setTags(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]); }

  function handleSave() {
    setAlert({ type: 'success', message: 'Third Party Details saved successfully.' });
    setTimeout(() => navigate(`/profile/${profile.id}`), 1500);
  }

  function handleCancel() {
    navigate(`/profile/${profile.id}`);
  }

  return (
    <PageLayout>
      {alert && (
        <div className={profileStyles.rlrAlert}>
          <span className={`material-icons-outlined ${profileStyles.rlrAlertIcon}`}>check_circle</span>
          <span className={profileStyles.rlrAlertText}>{alert.message}</span>
        </div>
      )}

      <Breadcrumb items={[
        { label: 'Third Parties', to: '/third-parties' },
        { label: profile.shortName, to: `/profile/${profile.id}` },
        { label: 'Edit' },
      ]} />

      {/* Top Strip */}
      <div className={`${profileStyles.tpTopStrip}${profile.riskLevel.level === 'high' ? ' ' + profileStyles.tpTopStripHigh : profile.riskLevel.level === 'medium' ? ' ' + profileStyles.tpTopStripMedium : profile.riskLevel.level === 'low' ? ' ' + profileStyles.tpTopStripLow : ''}`}>
        <div className={profileStyles.tpPageHeader}>
          <Link to={`/profile/${profile.id}`} className={profileStyles.tpBack}>
            <span className="material-icons-outlined">chevron_left</span> Back
          </Link>
          <div className={profileStyles.tpTitleRow}>
            <div className={profileStyles.tpNameGroup}>
              <h1>{profile.name}</h1>
              <span className={profileStyles.tpVerified}>
                <span className="material-icons-outlined">verified</span>
                {profile.verifiedText}
              </span>
            </div>
            <div className={profileStyles.tpBadges}>
              <div className={profileStyles.tpBadgeGroup}>
                <div className={profileStyles.tpBadgeLabel}>Current status:</div>
                {(() => {
                  const statusLabel = profile.currentStatus?.label ?? 'Pending Approval';
                  const { cls, icon } = STATUS_CONFIG[statusLabel] ?? STATUS_CONFIG['Pending Approval'];
                  return (
                    <div className={`${profileStyles.badge} ${profileStyles[cls]} ${profileStyles.badgeBtn}`}>
                      {statusLabel}
                      <span className="material-icons-outlined" style={{ fontSize: 16 }}>{icon}</span>
                    </div>
                  );
                })()}
              </div>
              <div className={profileStyles.tpBadgeGroup}>
                <div className={profileStyles.tpBadgeLabel}>Risk level:</div>
                <div className={`${profileStyles.badge} ${profileStyles['badge' + profile.riskLevel.level.charAt(0).toUpperCase() + profile.riskLevel.level.slice(1)]} ${profileStyles.badgeBtn}`}>
                  {profile.riskLevel.label}
                  <RiskLevelIcon level={profile.riskLevel.level} size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Body */}
      <div className={profileStyles.pageBody}>
        <Sidebar profile={profile} activePage="summary" />

        <main className={profileStyles.mainContent}>
          <div className={styles.adminContent}>
            {/* Summary section */}
            <div className={styles.contentSection}>
              <div className={styles.contentTitle}>Summary</div>
              <div className={styles.summaryGrid}>

              {/* LEFT COLUMN */}
              <div className={styles.summaryCol}>

                {/* Third Party Name */}
                <div className={styles.editField}>
                  <label className={styles.editLabel}>Third Party Name <span className={styles.req}>*</span></label>
                  <input
                    className={styles.editInput}
                    type="text"
                    value={tpName}
                    onChange={e => setTpName(e.target.value)}
                  />
                </div>

                {/* Third Party Owner */}
                <div className={styles.editField} ref={ownerRef}>
                  <label className={styles.editLabel}>
                    Third Party Owner <span className={styles.req}>*</span>
                    <span className={styles.infoTip} title="Each third party requires a group or user owner.">
                      <span className="material-icons-outlined" style={{ fontSize: 16 }}>info</span>
                    </span>
                  </label>
                  <div className={styles.ownerInputRow}>
                    <div className={styles.ownerToggle}>
                      <button type="button" className={`${styles.ownerBtn} ${ownerMode === 'group' ? styles.ownerBtnActive : ''}`} onClick={() => setOwnerMode('group')}>Group</button>
                      <button type="button" className={`${styles.ownerBtn} ${ownerMode === 'user' ? styles.ownerBtnActive : ''}`} onClick={() => setOwnerMode('user')}>User</button>
                    </div>
                    <div className={styles.dropdownWrap} style={{ flex: 1, minWidth: 0 }}>
                      <div className={styles.dropdownTrigger} onClick={() => setOwnerOpen(v => !v)}>
                        <span className={owner ? styles.dropdownValueSelected : styles.dropdownPlaceholder}>{owner || 'Type And Select Employee Name'}</span>
                        <span className="material-icons-outlined" style={{ fontSize: 18, color: 'var(--text-light)' }}>expand_more</span>
                      </div>
                      {ownerOpen && (
                        <div className={styles.dropdown}>
                          {OWNER_OPTIONS.map(o => <div key={o} className={styles.dropdownItem} onClick={() => selectOwner(o)}>{o}</div>)}
                        </div>
                      )}
                    </div>
                  </div>
                  {owner && (
                    <div className={styles.tagChips}>
                      <span className={styles.tagChip}>{owner}<button onClick={() => setOwner('')}>&times;</button></span>
                    </div>
                  )}
                </div>

                {/* Business Unit */}
                <div className={styles.editField} ref={buRef}>
                  <label className={styles.editLabel}>Business Unit <span className={styles.req}>*</span></label>
                  <div className={styles.tagSelectWrap}>
                    <div className={styles.tagSelectTrigger} onClick={() => setBuOpen(v => !v)}>
                      <span className={styles.dropdownPlaceholder}>Search</span>
                      <span className="material-icons-outlined" style={{ fontSize: 18, color: 'var(--text-light)' }}>expand_more</span>
                    </div>
                    {businessUnits.length > 0 && (
                      <div className={styles.tagChips}>
                        {businessUnits.map(b => (
                          <span key={b} className={styles.tagChip}>{b}<button onClick={() => removeBu(b)}>&times;</button></span>
                        ))}
                      </div>
                    )}
                    {buOpen && (
                      <div className={styles.dropdown}>
                        {BU_OPTIONS.map(o => (
                          <div key={o} className={`${styles.dropdownItem} ${businessUnits.includes(o) ? styles.dropdownItemSelected : ''}`} onClick={() => toggleBu(o)}>
                            {businessUnits.includes(o) && <span className="material-icons-outlined" style={{ fontSize: 14, marginRight: 4 }}>check</span>}
                            {o}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Third Party Tags */}
                <div className={styles.editField} ref={tagsRef}>
                  <label className={styles.editLabel}>Third Party Tags</label>
                  <div className={styles.tagSelectWrap}>
                    <div className={styles.tagSelectTrigger} onClick={() => setTagsOpen(v => !v)}>
                      <span className={styles.dropdownPlaceholder}>Search</span>
                      <span className="material-icons-outlined" style={{ fontSize: 18, color: 'var(--text-light)' }}>expand_more</span>
                    </div>
                    {tags.length > 0 && (
                      <div className={styles.tagChips}>
                        {tags.map(t => (
                          <span key={t} className={styles.tagChip}>{t}<button onClick={() => toggleTag(t)}>&times;</button></span>
                        ))}
                      </div>
                    )}
                    {tagsOpen && (
                      <div className={styles.dropdown}>
                        {TAG_OPTIONS.map(o => (
                          <label key={o} className={styles.dropdownCheckItem}>
                            <Checkbox checked={tags.includes(o)} onChange={() => toggleTag(o)} size="small" />
                            {o}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className={styles.helperText}>
                    Tag your Third party to allow for faster searching. Just start typing and if we have tags available they will appear in the dropdown where you can click to select them.
                  </p>
                </div>

              </div>

              {/* RIGHT COLUMN */}
              <div className={styles.summaryCol}>

                {/* Active */}
                <div className={styles.editField}>
                  <label className={styles.editLabel}>
                    Active
                    <span className={styles.infoTip} title="Active status of this third party.">
                      <span className="material-icons-outlined" style={{ fontSize: 16 }}>info</span>
                    </span>
                  </label>
                  <div className={`${styles.activeToggle} ${!active ? styles.activeToggleOff : ''}`} onClick={() => setActive(a => !a)}>
                    <div className={styles.activeToggleTrack}>{active ? 'YES' : 'NO'}</div>
                    <div className={styles.activeToggleThumb} />
                  </div>
                </div>

                {/* Process */}
                <div className={styles.editField} ref={processRef}>
                  <label className={styles.editLabel}>
                    Process
                    <span className={styles.infoTip} title="The process defines the compliance workflow applied to this third party.">
                      <span className="material-icons-outlined" style={{ fontSize: 16 }}>info</span>
                    </span>
                  </label>
                  <div className={styles.dropdownWrap}>
                    <div className={styles.dropdownTrigger} onClick={() => setProcessOpen(v => !v)}>
                      <span className={styles.dropdownValueSelected}>{process}</span>
                      <span className="material-icons-outlined" style={{ fontSize: 18, color: 'var(--text-light)' }}>expand_more</span>
                    </div>
                    {processOpen && (
                      <div className={styles.dropdown}>
                        {PROCESS_OPTIONS.map(o => (
                          <div key={o} className={`${styles.dropdownItem} ${process === o ? styles.dropdownItemSelected : ''}`} onClick={() => { setProcess(o); setProcessOpen(false); }}>
                            {process === o && <span className="material-icons-outlined" style={{ fontSize: 14, marginRight: 4 }}>check</span>}
                            {o}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Screening & Monitoring Policy */}
                <div className={styles.editField} ref={policyRef}>
                  <label className={styles.editLabel}>
                    Screening &amp; Monitoring Policy <span className={styles.req}>*</span>
                    <span className={styles.infoTip} title="The Screening & Monitoring Policy determines how the third party will be screened and monitored.">
                      <span className="material-icons-outlined" style={{ fontSize: 16 }}>info</span>
                    </span>
                  </label>
                  <div className={styles.dropdownWrap}>
                    <div className={styles.dropdownTrigger} onClick={() => setPolicyOpen(v => !v)}>
                      <span className={policy ? styles.dropdownValueSelected : styles.dropdownPlaceholder}>{policy || 'Select a policy\u2026'}</span>
                      <span className="material-icons-outlined" style={{ fontSize: 18, color: 'var(--text-light)' }}>expand_more</span>
                    </div>
                    {policyOpen && (
                      <div className={styles.dropdown}>
                        {POLICY_OPTIONS.map(o => (
                          <div key={o} className={`${styles.dropdownItem} ${policy === o ? styles.dropdownItemSelected : ''}`} onClick={() => { setPolicy(o); setPolicyOpen(false); }}>
                            {policy === o && <span className="material-icons-outlined" style={{ fontSize: 14, marginRight: 4 }}>check</span>}
                            {o}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
            </div>

            <div className={styles.contentDivider} />

            {/* Footer */}
            <div className={styles.formFooter}>
              <button className={`${profileStyles.btn} ${profileStyles.btnOutline} ${profileStyles.btnDanger}`}>Delete</button>
              <button className={`${profileStyles.btn} ${profileStyles.btnOutline}`} onClick={handleCancel}>Cancel</button>
              <button className={`${profileStyles.btn} ${profileStyles.btnFilled}`} onClick={handleSave}>Save</button>
            </div>
          </div>
        </main>
      </div>
    </PageLayout>
  );
}
