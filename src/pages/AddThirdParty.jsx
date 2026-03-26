import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Breadcrumb from '../components/layout/Breadcrumb';
import ProfilePage from '../components/profile/ProfilePage';
import { piedpiper, brucewayne } from '../data/profiles';
import styles from './AddThirdParty.module.css';

/* ─────────────────────── Static data ─────────────────────── */

const DUP_ROWS = [
  { name: 'THE PIED PIPER EXTERMINATORS INC', duns: '029302064', address: '100 Enterprise Way, Scotts Valley, 95066-3248, California', country: 'United States', ubo: true },
  { name: 'Pied Piper Mills, Inc.', duns: '057420044', address: '423 E Lake Dr, Hamlin, 79520-4204, Texas', country: 'United States', ubo: true },
  { name: 'Pied Piper Exterminating Company, Inc.', duns: '027050962', address: '3507 N Sunbelt Dr, San Antonio, 78218-3334, Texas', country: 'United States', ubo: true },
  { name: 'PIED PIPER PRESCHOOL CHILD CARE INC', duns: '876571803', address: '1108 S Main St, Traer, 50675-1437, Iowa', country: 'United States', ubo: false },
  { name: 'PIED PIPER PEST CONTROL, INC.', duns: '150146004', address: '1041 Derbigny St, Gretna, 70053-6329, Louisiana', country: 'United States', ubo: false },
  { name: 'PIED PIPER PRE-SCHOOL OF TRAER, INC.', duns: '803332878', address: '1108 S Main St, Traer, 50675-1437, Iowa', country: 'United States', ubo: false },
  { name: 'PIED PIPER PRE SCHOOL ASSN (WALLERAWANG) INC', duns: '744662352', address: '18 Pindari Pl, Wallerawang, 2845, NEW SOUTH WALES', country: 'Australia', ubo: false },
  { name: 'Pied Piper Pest Control, Inc.', duns: '103201968', address: '12026 Gardengate Dr, Saint Louis, 63146-4809, Missouri', country: 'United States', ubo: true },
  { name: 'Pied Piper Farms Inc', duns: '064212574', address: '423 E Lake Dr, Hamlin, 79520-4204, Texas', country: 'United States', ubo: false },
  { name: 'Pied Piper International, Inc.', duns: '801595307', address: '163 Little Harbor Rd, New Castle, 03854-9702, New Hampshire', country: 'United States', ubo: true },
];

const PERSON_DUP_ROWS = [
  { name: 'Bruce Wayne Batman', owner: 'Claudio Merino', bu: 'test', process: 'Standard RCTP', status: 'Pending Approval', ref: '', active: 'Active' },
];

const VERIFY_ROWS = [
  { name: 'THE PIED PIPER EXTERMINATORS INC', duns: '029302064', address: '100 Enterprise Way,Scotts Valley,95066-3248,California', country: 'United States', ubo: true },
  { name: 'Pied Piper Mills, Inc.', duns: '057420044', address: '423 E Lake Dr,Hamlin,79520-4204,Texas', country: 'United States', ubo: true },
  { name: 'Pied Piper Exterminating Company, Inc.', duns: '027050962', address: '3507 N Sunbelt Dr,San Antonio,78218-3334,Texas', country: 'United States', ubo: true },
  { name: 'PIED PIPER PRESCHOOL CHILD CARE INC', duns: '876571803', address: '1108 S Main St,Traer,50675-1437,Iowa', country: 'United States', ubo: false },
  { name: 'PIED PIPER PEST CONTROL, INC.', duns: '150146004', address: '1041 Derbigny St,Gretna,70053-6329,Louisiana', country: 'United States', ubo: false },
  { name: 'PIED PIPER PRE-SCHOOL OF TRAER, INC.', duns: '803332878', address: '1108 S Main St,Traer,50675-1437,Iowa', country: 'United States', ubo: false },
  { name: 'PIED PIPER PRE SCHOOL ASSN (WALLERAWANG) INC', duns: '744662352', address: '18 Pindari Pl,Wallerawang,2845,NEW SOUTH WALES', country: 'Australia', ubo: false },
  { name: 'Pied Piper Pest Control, Inc.', duns: '103201968', address: '12026 Gardengate Dr,Saint Louis,63146-4809,Missouri', country: 'United States', ubo: true },
  { name: 'Pied Piper Farms Inc', duns: '064212574', address: '423 E Lake Dr,Hamlin,79520-4204,Texas', country: 'United States', ubo: false },
  { name: 'Pied Piper International, Inc.', duns: '801595307', address: '163 Little Harbor Rd,New Castle,03854-9702,New Hampshire', country: 'United States', ubo: true },
];

const DUP_PROPERTIES = [
  { name: 'Entity Third Party Legal Name', value: '', cat: 'identity' },
  { name: 'Entity Registered Country', value: 'United States', cat: 'identity' },
  { name: 'Entity Registered Address', value: '1033 US Hwy 46 Ste 201, Clifton, NJ 07013', cat: 'identity' },
  { name: 'Entity Company Number', value: 'US-12345678', cat: 'identity' },
  { name: 'Entity ID Type', value: 'DUNS Number', cat: 'identity' },
  { name: 'Entity ID Value', value: '808241405', cat: 'identity' },
  { name: 'Entity Industry Sector - onboarding', value: 'Technology', cat: 'identity' },
  { name: 'Entity Other Known Name or Alias', value: '', cat: 'identity' },
  { name: 'Entity Website', value: 'www.initech.com', cat: 'contact' },
  { name: 'Third Party Contact First Name', value: 'John', cat: 'contact' },
  { name: 'Third Party Contact Surname', value: 'Smith', cat: 'contact' },
  { name: 'Third Party Contact Email Address', value: 'contact@initech.com', cat: 'contact' },
  { name: 'Third Party Country of Operation', value: 'United States', cat: 'contact' },
  { name: 'Person Business Address', value: '', cat: 'contact' },
  { name: 'Person Country of Residence', value: '', cat: 'contact' },
  { name: 'Current Risk Level', value: 'Low', cat: 'risk' },
  { name: 'Current Risk Level - BreakDown', value: '', cat: 'risk' },
  { name: 'Current Risk Score', value: '12', cat: 'risk' },
  { name: 'Current Risk Status', value: 'Open', cat: 'risk' },
  { name: 'Monitoring Last Update', value: '2024-01-15', cat: 'risk' },
  { name: 'Other Red Flag(s)', value: 'No', cat: 'risk' },
  { name: 'Other Red Flag(s) Details', value: '', cat: 'risk' },
  { name: 'Politically Exposed Person', value: 'No', cat: 'risk' },
  { name: 'Politically Exposed Persons Details', value: '', cat: 'risk' },
  { name: 'Anti-Bribery Policy', value: 'Yes', cat: 'compliance' },
  { name: 'Third Party Code of Conduct', value: 'Yes', cat: 'compliance' },
  { name: 'Compliance Training', value: 'Yes', cat: 'compliance' },
  { name: 'Compliance Training Details', value: '', cat: 'compliance' },
  { name: 'Modern Slavery Policy Applies To', value: '', cat: 'compliance' },
  { name: 'Fourth Party Due Diligence', value: '', cat: 'compliance' },
  { name: 'Government Contracts Debarment', value: 'No', cat: 'compliance' },
  { name: 'World Bank Contracts Debarment', value: 'No', cat: 'compliance' },
  { name: 'Illegal Activity', value: 'No', cat: 'compliance' },
  { name: 'Internal Reference or ID', value: 'INT-0001', cat: 'operational' },
  { name: 'Date business established', value: '2005-03-15', cat: 'operational' },
  { name: 'Total number of employees', value: '250', cat: 'operational' },
  { name: 'Average Turnover', value: '$5M – $10M', cat: 'operational' },
  { name: 'Publicly listed company', value: 'No', cat: 'operational' },
  { name: 'Third Party Legal Structure', value: 'Limited Liability', cat: 'operational' },
  { name: 'Directors', value: '', cat: 'operational' },
  { name: 'Shareholders', value: '', cat: 'operational' },
  { name: 'Subcontractor legal structure', value: '', cat: 'operational' },
  { name: 'Subsidiaries', value: '', cat: 'operational' },
  { name: 'Third Party Product Type', value: 'Software', cat: 'operational' },
  { name: 'Third Party Service Type', value: 'IT Services', cat: 'operational' },
  { name: 'Payment Method', value: '', cat: 'operational' },
  { name: 'Contract Value Known', value: 'Yes', cat: 'operational' },
  { name: 'Contract Value Amount', value: '$250,000', cat: 'operational' },
  { name: 'References 1', value: '', cat: 'operational' },
  { name: 'References 2', value: '', cat: 'operational' },
];

const COUNTRIES = ['Argentina','Australia','Brazil','Canada','China','France','Germany','India','Italy','Japan','Mexico','Netherlands','Republic of Korea','Russian Federation','Singapore','Spain','Sweden','Switzerland','United Kingdom','United States'];
const OWNER_OPTIONS = ['Not Approval Group','Sed Bibendum Felis A Posuere Consectetur','Test','Test 4','This Is The Name Of My Default Group','Ut Condimentum Rutrum Posuere','Vivamus Sed Sodales Erat'];
const BU_OPTIONS = ['Europe','Americas','Asia Pacific','Entity Verification','Global Operations'];
const TAG_OPTIONS = ['Gas & Oil','Energy','Manufacturing','Financial Services','Technology','Healthcare'];
const INDUSTRIES = ['Aerospace & Defence','Agriculture','Automotive','Banking & Finance','Chemicals','Construction','Consumer Goods','Education','Energy & Utilities','Gas & Oil','Healthcare & Pharmaceuticals','Hospitality & Tourism','Insurance','Legal Services','Logistics & Transportation','Manufacturing','Media & Entertainment','Mining & Metals','Professional Services','Real Estate','Retail','Technology','Telecommunications'];

const STEPS = [
  { n: 1, label: 'Third Party Details' },
  { n: 2, label: 'Duplicate Check' },
  { n: 3, label: 'Entity Verification' },
  { n: 4, label: 'Onboarding Details' },
];

/* ─────────────────────── Main component ─────────────────────── */

export default function AddThirdParty() {
  const navigate = useNavigate();
  const [openStep, setOpenStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [skippedSteps, setSkippedSteps] = useState(new Set());
  const [summaries, setSummaries] = useState({});

  // Step 1
  const [tpType, setTpType] = useState('');
  const [tpName, setTpName] = useState('');
  const [active, setActive] = useState(true);
  const [ownerMode, setOwnerMode] = useState('user');
  const [owner, setOwner] = useState('');
  const [businessUnits, setBusinessUnits] = useState([]);
  const [policy, setPolicy] = useState('');
  const [tags, setTags] = useState([]);
  const [s1Errors, setS1Errors] = useState({});

  // Step 3
  const [verifyCountry, setVerifyCountry] = useState('');
  const [selectedVerify, setSelectedVerify] = useState(null);
  const [skipVerify, setSkipVerify] = useState(false);
  const [entityVerified, setEntityVerified] = useState(false);

  // Step 4
  const [ob, setOb] = useState({ legalName: '', companyNum: '', address: '', country: '', website: '', industry: '', idType: '', idValue: '', internalRef: '' });
  const updateOb = (k, v) => setOb(prev => ({ ...prev, [k]: v }));
  // Person onboarding
  const [obPerson, setObPerson] = useState({ legalName: '', alias: '', address: '', country: '', yob: '', gender: '', industry: '', idType: '', idValue: '', internalRef: '' });
  const updateObP = (k, v) => setObPerson(prev => ({ ...prev, [k]: v }));
  // Unknown onboarding
  const [obUnknown, setObUnknown] = useState({ legalName: '', alias: '', tpDesc: [], address: '', country: '', industry: '', idType: '', idValue: '', internalRef: '' });
  const updateObU = (k, v) => setObUnknown(prev => ({ ...prev, [k]: v }));

  // Side panels
  const [profilePanel, setProfilePanel] = useState(null);
  const [propsPanel, setPropsPanel] = useState(null);

  // Cancel modal
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Creating state
  const [creating, setCreating] = useState(false);
  const [creatingLabel, setCreatingLabel] = useState('');
  const [creatingProgress, setCreatingProgress] = useState(0);

  function completeStep(n, summary) {
    setCompletedSteps(prev => new Set([...prev, n]));
    setSummaries(prev => ({ ...prev, [n]: summary }));
  }

  function skipStep(n, summary) {
    setSkippedSteps(prev => new Set([...prev, n]));
    setCompletedSteps(prev => new Set([...prev, n]));
    setSummaries(prev => ({ ...prev, [n]: summary }));
  }

  function handleStep1Continue() {
    const errors = {};
    if (!tpType) errors.type = true;
    if (!tpName.trim()) errors.name = true;
    if (!owner.trim()) errors.owner = true;
    if (!businessUnits.length) errors.bu = true;
    setS1Errors(errors);
    if (Object.keys(errors).length) return;

    const typeLabel = tpType === 'entity' ? 'Entity' : tpType === 'person' ? 'Individual' : 'Unknown';
    completeStep(1, `${typeLabel} · ${tpName}`);

    // Prepopulate legal name in all onboarding forms
    updateOb('legalName', tpName);
    updateObP('legalName', tpName);
    updateObU('legalName', tpName);

    if (tpType === 'unknown') {
      skipStep(2, 'No duplicates were found');
      skipStep(3, 'Skipped');
      setOpenStep(4);
    } else {
      setOpenStep(2);
    }
  }

  function handleStep2Continue() {
    completeStep(2, 'Continued as new third party');
    if (tpType === 'entity') {
      setOpenStep(3);
    } else {
      skipStep(3, 'Skipped');
      setOpenStep(4);
    }
  }

  function handleStep3Continue() {
    if (selectedVerify) {
      const row = VERIFY_ROWS.find(r => r.duns === selectedVerify);
      if (row) {
        updateOb('legalName', row.name);
        updateOb('companyNum', row.duns);
        updateOb('address', row.address);
        const match = COUNTRIES.find(c => c.toLowerCase() === row.country.toLowerCase());
        if (match) updateOb('country', match);
      }
      setEntityVerified(true);
      completeStep(3, `Verified: ${row?.name || ''}`);
    } else {
      setEntityVerified(false);
      completeStep(3, skipVerify ? 'Skipped' : 'Not verified');
      updateOb('legalName', tpName);
    }
    setOpenStep(4);
  }

  function handleFinish() {
    showCreatingState();
  }

  function showCreatingState() {
    setCreating(true);
    setCreatingProgress(0);
    setCreatingLabel('Creating third party...');

    const stages = [
      { width: 30, text: 'Creating third party...', delay: 0 },
      { width: 60, text: 'Setting up record...', delay: 800 },
      { width: 85, text: 'Configuring associations...', delay: 1800 },
      { width: 100, text: 'Finalising...', delay: 2800 },
    ];
    stages.forEach(({ width, text, delay }) => {
      setTimeout(() => {
        setCreatingProgress(width);
        setCreatingLabel(text);
      }, delay);
    });
    setTimeout(() => {
      navigate('/profile/piedpiper');
    }, 3600);
  }

  function handleCancel(e) {
    e.preventDefault();
    setShowCancelModal(true);
  }

  const filteredVerify = verifyCountry
    ? VERIFY_ROWS.filter(r => r.country.toLowerCase().includes(verifyCountry.toLowerCase()))
    : VERIFY_ROWS;

  const stepIsLocked = n => !completedSteps.has(n - 1) && n > 1;

  // Determine which steps to show based on type
  const isStep3Hidden = tpType === 'person' || tpType === 'unknown';
  const visibleSteps = isStep3Hidden
    ? STEPS.filter(s => s.n !== 3).map((s, i) => ({ ...s, displayN: i + 1, totalSteps: 3 }))
    : STEPS.map(s => ({ ...s, displayN: s.n, totalSteps: 4 }));

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: 'Third Parties', to: '/third-parties' }, { label: 'Create a Third Party' }]} />

      <div className={styles.titleCard}>
        <h1 className={styles.title}>Create a Third Party</h1>
        <div className={styles.titleDivider} />
      </div>

      <div className={styles.accordion}>
        {STEPS.map(({ n, label }) => {
          // Hide step 3 for person/unknown
          if (n === 3 && isStep3Hidden) return null;

          const isOpen = openStep === n;
          const isDone = completedSteps.has(n);
          const isSkipped = skippedSteps.has(n);
          const isLocked = stepIsLocked(n) && !isDone;

          // Calculate display number for person/unknown
          let displayNum = n;
          if (isStep3Hidden && n === 4) displayNum = 3;

          const cls = [
            styles.acItem,
            isOpen && styles.open,
            isDone && !isOpen && (isSkipped ? styles.skipped : styles.completed),
            isLocked && styles.locked,
          ].filter(Boolean).join(' ');

          return (
            <div key={n} className={cls}>
              <button className={styles.acHeader} onClick={() => !isLocked && setOpenStep(isOpen ? null : n)} disabled={isLocked}>
                <div className={styles.acBadge}>
                  {(isDone || isSkipped) && !isOpen
                    ? <span className="material-icons-outlined" style={{ fontSize: 18 }}>check</span>
                    : <span>{displayNum}</span>
                  }
                </div>
                <div className={styles.acHeaderText}>
                  <span className={styles.acTitle}>{label}</span>
                  {summaries[n] && !isOpen && <span className={styles.acSummary}>{summaries[n]}</span>}
                </div>
                <span className={`material-icons-outlined ${styles.acChevron} ${isOpen ? styles.rotated : ''}`}>expand_more</span>
              </button>
              {isOpen && (
                <div className={styles.acBody}>
                  {n === 1 && <Step1 tpType={tpType} setTpType={setTpType} tpName={tpName} setTpName={setTpName} active={active} setActive={setActive} ownerMode={ownerMode} setOwnerMode={setOwnerMode} owner={owner} setOwner={setOwner} businessUnits={businessUnits} setBusinessUnits={setBusinessUnits} policy={policy} setPolicy={setPolicy} tags={tags} setTags={setTags} errors={s1Errors} onContinue={handleStep1Continue} onCancel={handleCancel} />}
                  {n === 2 && <Step2 tpType={tpType} onBack={() => setOpenStep(1)} onContinue={handleStep2Continue} onOpenProfile={name => setProfilePanel(name)} onOpenProps={name => setPropsPanel(name)} onCancel={handleCancel} />}
                  {n === 3 && <Step3 verifyCountry={verifyCountry} setVerifyCountry={setVerifyCountry} rows={filteredVerify} selectedVerify={selectedVerify} setSelectedVerify={setSelectedVerify} skipVerify={skipVerify} setSkipVerify={setSkipVerify} onBack={() => setOpenStep(2)} onContinue={handleStep3Continue} onCancel={handleCancel} />}
                  {n === 4 && <Step4 tpType={tpType} ob={ob} updateOb={updateOb} obPerson={obPerson} updateObP={updateObP} obUnknown={obUnknown} updateObU={updateObU} entityVerified={entityVerified} onBack={() => setOpenStep(tpType === 'entity' ? 3 : tpType === 'unknown' ? 1 : 2)} onFinish={handleFinish} onCancel={handleCancel} />}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Profile side panel */}
      {profilePanel !== null && (
        <ProfilePanel name={profilePanel} tpType={tpType} onClose={() => setProfilePanel(null)} />
      )}

      {/* Properties side panel */}
      {propsPanel !== null && (
        <PropertiesPanel name={propsPanel} onClose={() => setPropsPanel(null)} />
      )}

      {/* Cancel confirmation modal */}
      {showCancelModal && (
        <CancelModal onStay={() => setShowCancelModal(false)} onLeave={() => navigate('/third-parties')} />
      )}

      {/* Creating state overlay */}
      {creating && (
        <div className={styles.creatingOverlay}>
          <div className={styles.creatingProgressWrap}>
            <div className={styles.creatingProgressBar} style={{ width: creatingProgress + '%' }} />
          </div>
          <div className={styles.creatingLabel}>{creatingLabel}</div>
          <div className={styles.creatingSublabel}>RISKCENTER | THIRD PARTY</div>
        </div>
      )}
    </PageLayout>
  );
}

/* ─────────────────────── Step 1 ─────────────────────── */

function Step1({ tpType, setTpType, tpName, setTpName, active, setActive, ownerMode, setOwnerMode, owner, setOwner, businessUnits, setBusinessUnits, policy, setPolicy, tags, setTags, errors, onContinue, onCancel }) {
  const [ownerOpen, setOwnerOpen] = useState(false);
  const [buOpen, setBuOpen] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [tagsOpen, setTagsOpen] = useState(false);
  const ownerRef = useRef();
  const buRef = useRef();
  const policyRef = useRef();
  const tagsRef = useRef();

  useOutsideClick(ownerRef, () => setOwnerOpen(false));
  useOutsideClick(buRef, () => setBuOpen(false));
  useOutsideClick(policyRef, () => setPolicyOpen(false));
  useOutsideClick(tagsRef, () => setTagsOpen(false));

  const types = [
    { id: 'entity', icon: 'business', title: 'Entity / Organisation', desc: 'A company, firm, partnership or other registered legal entity.' },
    { id: 'person', icon: 'person', title: 'Individual / Person', desc: 'A natural person acting as a sole trader, contractor or individual.' },
    { id: 'unknown', icon: 'help_outline', title: 'Unknown', desc: 'The type of third party is not yet known or cannot be determined.' },
  ];

  function selectOwner(val) { setOwner(val); setOwnerOpen(false); }
  function toggleBu(val) { setBusinessUnits(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]); }
  function removeBu(val) { setBusinessUnits(prev => prev.filter(x => x !== val)); }
  function toggleTag(val) { setTags(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]); }

  return (
    <div className={styles.stepBody}>
      <div className={styles.sectionHeading}>Third Party Type <span className={styles.req}>*</span></div>
      <div className={`${styles.typeCards} ${errors.type ? styles.typeError : ''}`}>
        {types.map(t => (
          <div key={t.id} className={`${styles.typeCard} ${tpType === t.id ? styles.selected : ''}`} onClick={() => setTpType(t.id)} tabIndex={0} onKeyDown={e => e.key === 'Enter' && setTpType(t.id)}>
            <span className={`material-icons-outlined ${styles.typeCheck}`}>check_circle</span>
            <div className={styles.typeIconWrap}><span className="material-icons-outlined">{t.icon}</span></div>
            <div className={styles.typeTitle}>{t.title}</div>
            <div className={styles.typeDesc}>{t.desc}</div>
          </div>
        ))}
      </div>
      {errors.type && <p className={styles.errorHint}>Please select a third party type.</p>}

      {tpType && (<>
        <div className={styles.sectionHeading} style={{ marginTop: 24 }}>Summary</div>
        <div className={styles.editGrid}>

          {/* Third Party Name */}
          <div className={`${styles.editField} ${errors.name ? styles.hasError : ''}`}>
            <label className={styles.editLabel}>Third Party Name <span className={styles.req}>*</span></label>
            <input className={styles.editInput} type="text" placeholder="Enter the full legal name" value={tpName} onChange={e => setTpName(e.target.value)} />
            {errors.name && <div className={styles.fieldError}>Third Party Name is required.</div>}
          </div>

          {/* Active toggle */}
          <div className={styles.editField}>
            <label className={styles.editLabel}>
              Active
              <span className={styles.infoTip} title="Setting a Third Party to Inactive will disable all associated process actions.">
                <span className="material-icons-outlined" style={{ fontSize: 16 }}>info</span>
              </span>
            </label>
            <div className={`${styles.activeToggle} ${active ? '' : styles.activeToggleOff}`} onClick={() => setActive(v => !v)} role="switch" aria-checked={active}>
              <div className={styles.activeToggleTrack}>{active ? 'Yes' : 'No'}</div>
              <div className={styles.activeToggleThumb} />
            </div>
          </div>

          {/* Owner */}
          <div className={`${styles.editField} ${errors.owner ? styles.hasError : ''}`} ref={ownerRef}>
            <label className={styles.editLabel}>
              Third Party Owner <span className={styles.req}>*</span>
              <span className={styles.infoTip} title="Each third party requires a group or user owner.">
                <span className="material-icons-outlined" style={{ fontSize: 16 }}>info</span>
              </span>
            </label>
            <div className={styles.ownerToggle}>
              <button type="button" className={`${styles.ownerBtn} ${ownerMode === 'group' ? styles.ownerBtnActive : ''}`} onClick={() => setOwnerMode('group')}>Group</button>
              <button type="button" className={`${styles.ownerBtn} ${ownerMode === 'user' ? styles.ownerBtnActive : ''}`} onClick={() => setOwnerMode('user')}>User</button>
            </div>
            <div className={styles.dropdownWrap}>
              <div className={styles.dropdownTrigger} onClick={() => setOwnerOpen(v => !v)}>
                <span className={owner ? styles.dropdownValueSelected : styles.dropdownPlaceholder}>{owner || 'Type and select employee name'}</span>
                <span className="material-icons-outlined" style={{ fontSize: 18, color: 'var(--text-light)' }}>expand_more</span>
              </div>
              {ownerOpen && (
                <div className={styles.dropdown}>
                  {OWNER_OPTIONS.map(o => <div key={o} className={styles.dropdownItem} onClick={() => selectOwner(o)}>{o}</div>)}
                </div>
              )}
            </div>
            {errors.owner && <div className={styles.fieldError}>Owner is required.</div>}
          </div>

          {/* Process */}
          <div className={styles.editField}>
            <label className={styles.editLabel}>
              Process
              <span className={styles.infoTip} title="Third Party Process is not editable once set.">
                <span className="material-icons-outlined" style={{ fontSize: 16 }}>info</span>
              </span>
            </label>
            <input className={styles.editInput} type="text" value="Standard RCTP" readOnly />
          </div>

          {/* Business Unit */}
          <div className={`${styles.editField} ${errors.bu ? styles.hasError : ''}`} ref={buRef}>
            <label className={styles.editLabel}>Business Unit <span className={styles.req}>*</span></label>
            <div className={styles.tagSelectWrap}>
              <div className={styles.tagSelectTrigger} onClick={() => setBuOpen(v => !v)}>
                <span className={styles.dropdownPlaceholder}>Search</span>
                <span className="material-icons-outlined" style={{ fontSize: 18, color: 'var(--text-light)' }}>expand_more</span>
              </div>
              {businessUnits.length > 0 && (
                <div className={styles.tagChips}>
                  {businessUnits.map(b => (
                    <span key={b} className={styles.tagChip}>{b}<button onClick={() => removeBu(b)}>×</button></span>
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
            {errors.bu && <div className={styles.fieldError}>Business Unit is required.</div>}
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
                <span className={policy ? styles.dropdownValueSelected : styles.dropdownPlaceholder}>{policy || 'Select a policy…'}</span>
                <span className="material-icons-outlined" style={{ fontSize: 18, color: 'var(--text-light)' }}>expand_more</span>
              </div>
              {policyOpen && (
                <div className={styles.dropdown}>
                  <div className={styles.dropdownGroup}>Process Managed Policy</div>
                  <div className={styles.dropdownItem} onClick={() => { setPolicy('Default Standard KYBP Policy'); setPolicyOpen(false); }}>Default Standard KYBP Policy</div>
                  <div className={styles.dropdownGroup}>Unmanaged Policies</div>
                  {['Entity Verification Policy 2','Test'].map(o => (
                    <div key={o} className={styles.dropdownItem} onClick={() => { setPolicy(o); setPolicyOpen(false); }}>{o}</div>
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
                    <span key={t} className={styles.tagChip}>{t}<button onClick={() => toggleTag(t)}>×</button></span>
                  ))}
                </div>
              )}
              {tagsOpen && (
                <div className={styles.dropdown}>
                  {TAG_OPTIONS.map(o => (
                    <label key={o} className={styles.dropdownCheckItem}>
                      <input type="checkbox" checked={tags.includes(o)} onChange={() => toggleTag(o)} style={{ accentColor: 'var(--primary-500)' }} />
                      {o}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <p className={styles.helperText}>Tag your Third Party to allow for faster searching.</p>
          </div>

        </div>
      </>)}

      <div className={styles.acFooter}>
        <div />
        <div className={styles.acFooterRight}>
          <a href="#" className={styles.btnGhost} onClick={onCancel}>Cancel</a>
          <button className={styles.btnFilled} onClick={onContinue}>
            Continue <span className="material-icons-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Step 2 ─────────────────────── */

function Step2({ tpType, onBack, onContinue, onOpenProfile, onOpenProps, onCancel }) {
  const isPerson = tpType === 'person';
  const bannerText = isPerson ? '1 potential match found.' : '10 potential matches found.';

  return (
    <div className={styles.stepBody}>
      <div className={styles.dupBanner}>
        <span className="material-icons-outlined">warning_amber</span>
        <div><strong>{bannerText}</strong> These records have a similar name and may already exist in the system. If one of the matches above is the same third party, use an existing record instead of creating a new one.</div>
      </div>

      {/* Entity duplicate table */}
      {!isPerson && (
        <div className={styles.tableWrap}>
          <table className={styles.dupTable}>
            <thead>
              <tr><th>Name</th><th>DUNS Number</th><th>Address</th><th>Country / Territory</th><th style={{ textAlign: 'center' }}>UBO Status</th><th style={{ width: 40 }} /></tr>
            </thead>
            <tbody>
              {DUP_ROWS.map((r, i) => (
                <tr key={i}>
                  <td><span className={styles.cellLink} onClick={() => onOpenProfile(r.name)}>{r.name}</span></td>
                  <td>{r.duns}</td>
                  <td>{r.address}</td>
                  <td>{r.country}</td>
                  <td className={styles.uboCell}>
                    <span className={`material-icons-outlined ${r.ubo ? styles.uboOk : styles.uboFail}`}>{r.ubo ? 'check_circle' : 'cancel'}</span>
                  </td>
                  <td><button className={styles.moreBtn} onClick={() => onOpenProps(r.name)}>View properties</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Person duplicate table */}
      {isPerson && (
        <div className={styles.tableWrap}>
          <table className={styles.dupTable}>
            <thead>
              <tr><th>Name</th><th>Owner</th><th>Business Unit</th><th>Process</th><th>Current Status</th><th>Internal Reference</th><th>Active/Inactive</th><th style={{ width: 40 }} /></tr>
            </thead>
            <tbody>
              {PERSON_DUP_ROWS.map((r, i) => (
                <tr key={i}>
                  <td><span className={styles.cellLink} onClick={() => onOpenProfile(r.name)}>{r.name}</span></td>
                  <td>{r.owner}</td>
                  <td>{r.bu}</td>
                  <td>{r.process}</td>
                  <td><span className={styles.statusBadge}>{r.status}</span></td>
                  <td>{r.ref}</td>
                  <td>{r.active}</td>
                  <td><button className={styles.moreBtn} onClick={() => onOpenProps(r.name)}>View properties</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className={styles.acFooter}>
        <button className={styles.btnOutline} onClick={onBack}><span className="material-icons-outlined" style={{ fontSize: 16 }}>arrow_back</span> Back</button>
        <div className={styles.acFooterRight}>
          <a href="#" className={styles.btnGhost} onClick={onCancel}>Cancel</a>
          <button className={styles.btnFilled} onClick={onContinue}>Continue <span className="material-icons-outlined" style={{ fontSize: 16 }}>arrow_forward</span></button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Step 3 ─────────────────────── */

function Step3({ verifyCountry, setVerifyCountry, rows, selectedVerify, setSelectedVerify, skipVerify, setSkipVerify, onBack, onContinue, onCancel }) {
  return (
    <div className={styles.stepBody}>
      {/* Verify intro text */}
      <div className={styles.verifyIntro}>
        Entity verification will screen the Third Party Name against a company data source, allowing you to verify the legal existence of your Third Party before creating the RCTP record.
        <br /><br />
        If you select an entity and click Continue, corresponding properties will be prepopulated within the Third Party record and a screening association will be created.
      </div>

      <div className={styles.fieldGroup} style={{ maxWidth: 320, marginBottom: 16 }}>
        <label className={styles.fieldLabel}>Country / Territory</label>
        <select className={styles.fieldSelect} value={verifyCountry} onChange={e => setVerifyCountry(e.target.value)}>
          <option value="">All countries</option>
          {['Australia','United States'].map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className={styles.resultsHeader}>
        <span><strong>265</strong> results found</span>
        <span className={styles.sourceBadge}><span className="material-icons-outlined" style={{ fontSize: 12 }}>verified</span> Dun &amp; Bradstreet</span>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.verifyTable}>
          <thead><tr><th /><th>Name</th><th>DUNS Number</th><th>Address</th><th>Country/Territory</th><th>UBO Status</th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={selectedVerify === r.duns ? styles.rowSelected : ''}>
                <td><input type="radio" name="verify-pick" checked={selectedVerify === r.duns} onChange={() => { setSelectedVerify(r.duns); setSkipVerify(false); }} style={{ accentColor: 'var(--primary-500)' }} /></td>
                <td style={{ fontWeight: 500, color: 'var(--text-normal)' }}>{r.name}</td>
                <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{r.duns}</td>
                <td style={{ fontSize: 12, maxWidth: 240 }}>{r.address}</td>
                <td>{r.country}</td>
                <td className={styles.uboCell}><span className={`material-icons-outlined ${r.ubo ? styles.uboOk : styles.uboFail}`}>{r.ubo ? 'check_circle' : 'cancel'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.verifyPagination}>
        <div className={styles.verifyPaginationLeft}>
          <select className={styles.verifyPageSize}><option>20</option><option>50</option><option>100</option></select>
          <span>Showing results 1 – 10 of 265</span>
        </div>
        <div className={styles.verifyPaginationRight}>
          <button className={styles.verifyPageBtn} disabled title="First page"><span className="material-icons-outlined" style={{ fontSize: 16 }}>first_page</span></button>
          <button className={styles.verifyPageBtn} disabled title="Previous page"><span className="material-icons-outlined" style={{ fontSize: 16 }}>chevron_left</span></button>
          <span>Page</span>
          <input className={styles.verifyPageInput} type="number" defaultValue={1} min={1} max={14} />
          <span>of 14</span>
          <button className={styles.verifyPageBtn} title="Next page"><span className="material-icons-outlined" style={{ fontSize: 16 }}>chevron_right</span></button>
          <button className={styles.verifyPageBtn} title="Last page"><span className="material-icons-outlined" style={{ fontSize: 16 }}>last_page</span></button>
        </div>
      </div>

      <label className={styles.skipOption}>
        <input type="checkbox" checked={skipVerify} onChange={e => { setSkipVerify(e.target.checked); if (e.target.checked) setSelectedVerify(null); }} />
        Skip entity verification
      </label>
      <div className={styles.acFooter}>
        <button className={styles.btnOutline} onClick={onBack}><span className="material-icons-outlined" style={{ fontSize: 16 }}>arrow_back</span> Back</button>
        <div className={styles.acFooterRight}>
          <a href="#" className={styles.btnGhost} onClick={onCancel}>Cancel</a>
          <button className={styles.btnFilled} onClick={onContinue}>Continue <span className="material-icons-outlined" style={{ fontSize: 16 }}>arrow_forward</span></button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Step 4 ─────────────────────── */

function Step4({ tpType, ob, updateOb, obPerson, updateObP, obUnknown, updateObU, entityVerified, onBack, onFinish, onCancel }) {
  const [errors, setErrors] = useState({});

  function handleSave() {
    const errs = {};
    if (tpType === 'entity' || tpType === 'unknown') {
      const countryVal = tpType === 'entity' ? ob.country : obUnknown.country;
      if (!countryVal) errs.country = true;
    }
    if (tpType === 'person') {
      if (!obPerson.country) errs.country = true;
    }
    if (tpType === 'unknown') {
      if (!obUnknown.tpDesc.length) errs.tpDesc = true;
    }
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onFinish();
  }

  return (
    <div className={styles.stepBody}>
      {/* Yellow warning banner for entity verified */}
      {tpType === 'entity' && entityVerified && (
        <div className={styles.obWarningIntro}>
          <span className="material-icons-outlined">warning_amber</span>
          <div>
            <strong>Entity verification data detected.</strong> If you completed entity verification in the previous step, the fields below have been pre-filled with verified data. Modifying this information will override the verified record and the entity verification will be lost.
          </div>
        </div>
      )}

      {/* Entity form */}
      {tpType === 'entity' && (
        <>
          <div className={styles.obSectionLabel}>Entity</div>
          <div className={styles.obBlocks}>
            <div className={styles.obBlock}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>1.</span><span className={styles.obLabel}>Legal Name of the Third Party</span><span className={styles.req}>*</span></div>
              <input className={styles.obInput} type="text" value={ob.legalName} readOnly />
            </div>
            <div className={styles.obBlock}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>2.</span><span className={styles.obLabel}>Other Known Name / Alias</span></div>
              <input className={styles.obInput} type="text" placeholder="e.g. Initech SL" />
            </div>
            <div className={styles.obBlock}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>3.</span><span className={styles.obLabel}>Company Number (or equivalent)</span></div>
              <input className={styles.obInput} type="text" value={ob.companyNum} onChange={e => updateOb('companyNum', e.target.value)} placeholder="e.g. 12345678" />
            </div>
            <div className={styles.obBlock}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>4.</span><span className={styles.obLabel}>Registered Address</span></div>
              <textarea className={`${styles.obInput} ${styles.obTextarea}`} value={ob.address} onChange={e => updateOb('address', e.target.value)} placeholder="Enter the full registered address" />
            </div>
            <div className={`${styles.obBlock} ${errors.country ? styles.hasError : ''}`}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>5.</span><span className={styles.obLabel}>Registered Country / Territory</span><span className={styles.req}>*</span></div>
              <select className={`${styles.obInput} ${styles.obSelect}`} value={ob.country} onChange={e => { updateOb('country', e.target.value); setErrors(prev => ({ ...prev, country: false })); }}>
                <option value="">Choose…</option>
                {COUNTRIES.map(c => <option key={c}>{c}</option>)}
              </select>
              {errors.country && <div className={styles.obError}>Registered country is required.</div>}
            </div>
            <div className={styles.obBlock}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>6.</span><span className={styles.obLabel}>Company Website</span></div>
              <input className={styles.obInput} type="url" placeholder="https://www.example.com" value={ob.website} onChange={e => updateOb('website', e.target.value)} />
            </div>
            <div className={styles.obBlock}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>7.</span><span className={styles.obLabel}>Industry / Sector</span></div>
              <select className={`${styles.obInput} ${styles.obSelect}`} value={ob.industry} onChange={e => updateOb('industry', e.target.value)}>
                <option value="">Select an industry</option>
                {INDUSTRIES.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className={styles.obBlock}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>8.</span><span className={styles.obLabel}>Identification</span></div>
              <div className={styles.obSubGrid}>
                <div>
                  <div className={styles.obSubLabel}>ID Type</div>
                  <select className={`${styles.obInput} ${styles.obSelect}`} value={ob.idType} onChange={e => updateOb('idType', e.target.value)}>
                    <option value="">Select ID type</option>
                    <option>DUNS Number</option><option>LEI</option><option>BVD ID</option><option>VAT Number</option><option>Tax Code</option><option>Trade Licence</option>
                  </select>
                </div>
                <div>
                  <div className={styles.obSubLabel}>ID Value</div>
                  <input className={styles.obInput} type="text" value={ob.idValue} onChange={e => updateOb('idValue', e.target.value)} placeholder="Enter identifier value" />
                </div>
              </div>
            </div>
            <div className={styles.obBlock}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>9.</span><span className={styles.obLabel}>Internal Reference or ID</span></div>
              <input className={styles.obInput} type="text" placeholder="e.g. SMP-0042" value={ob.internalRef} onChange={e => updateOb('internalRef', e.target.value)} />
            </div>
          </div>
        </>
      )}

      {/* Person form */}
      {tpType === 'person' && (
        <>
          <div className={styles.obSectionLabel}>Individual / Person</div>
          <div className={styles.obBlocks}>
            <div className={styles.obBlock}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>1.</span><span className={styles.obLabel}>Legal Name of the Third Party</span><span className={styles.req}>*</span></div>
              <input className={styles.obInput} type="text" value={obPerson.legalName} readOnly />
            </div>
            <div className={styles.obBlock}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>2.</span><span className={styles.obLabel}>Other Known Name/Alias</span></div>
              <input className={styles.obInput} type="text" placeholder="Please select" value={obPerson.alias} onChange={e => updateObP('alias', e.target.value)} />
            </div>
            <div className={styles.obBlock}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>3.</span><span className={styles.obLabel}>Business Address</span></div>
              <textarea className={`${styles.obInput} ${styles.obTextarea}`} placeholder="Enter address" value={obPerson.address} onChange={e => updateObP('address', e.target.value)} />
            </div>
            <div className={`${styles.obBlock} ${errors.country ? styles.hasError : ''}`}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>4.</span><span className={styles.obLabel}>Country/Territory of Residence</span><span className={styles.req}>*</span></div>
              <select className={`${styles.obInput} ${styles.obSelect}`} value={obPerson.country} onChange={e => { updateObP('country', e.target.value); setErrors(prev => ({ ...prev, country: false })); }}>
                <option value="">Please select</option>
                {COUNTRIES.map(c => <option key={c}>{c}</option>)}
              </select>
              {errors.country && <div className={styles.obError}>Country/Territory of Residence is required.</div>}
            </div>
            <div className={styles.obBlock}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>5.</span><span className={styles.obLabel}>Year of Birth</span></div>
              <select className={`${styles.obInput} ${styles.obSelect}`} value={obPerson.yob} onChange={e => updateObP('yob', e.target.value)}>
                <option value="">Please select</option>
                {['2005','2000','1995','1990','1985','1980','1975','1970','1965','1960','1955','1950','1945','1940','1935','1930','1925','1920'].map(y => <option key={y}>{y}</option>)}
              </select>
            </div>
            <div className={styles.obBlock}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>6.</span><span className={styles.obLabel}>Gender</span></div>
              <select className={`${styles.obInput} ${styles.obSelect}`} value={obPerson.gender} onChange={e => updateObP('gender', e.target.value)}>
                <option value="">Please select</option>
                <option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option><option>Other</option>
              </select>
            </div>
            <div className={styles.obBlock}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>7.</span><span className={styles.obLabel}>Industry/Sector</span></div>
              <select className={`${styles.obInput} ${styles.obSelect}`} value={obPerson.industry} onChange={e => updateObP('industry', e.target.value)}>
                <option value="">Please select</option>
                {INDUSTRIES.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className={styles.obBlock}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>8.</span><span className={styles.obLabel}>Identification</span></div>
              <div className={styles.obSubGrid}>
                <div>
                  <div className={styles.obSubLabel}>ID Type</div>
                  <select className={`${styles.obInput} ${styles.obSelect}`} value={obPerson.idType} onChange={e => updateObP('idType', e.target.value)}>
                    <option value="">Please select</option>
                    <option>Passport</option><option>National ID</option><option>Driver's Licence</option><option>Tax Code</option><option>VAT Number</option><option>Social Security Number</option>
                  </select>
                </div>
                <div>
                  <div className={styles.obSubLabel}>ID Value</div>
                  <input className={styles.obInput} type="text" placeholder="Enter identifier value" value={obPerson.idValue} onChange={e => updateObP('idValue', e.target.value)} />
                </div>
              </div>
            </div>
            <div className={styles.obBlock}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>9.</span><span className={styles.obLabel}>Internal Reference or ID</span></div>
              <input className={styles.obInput} type="text" placeholder="e.g. SMP-0042" value={obPerson.internalRef} onChange={e => updateObP('internalRef', e.target.value)} />
            </div>
          </div>
        </>
      )}

      {/* Unknown form */}
      {tpType === 'unknown' && (
        <>
          <div className={styles.obSectionLabel}>Unknown</div>
          <div className={styles.obBlocks}>
            <div className={styles.obBlock}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>1.</span><span className={styles.obLabel}>Legal Name of the Third Party</span><span className={styles.req}>*</span></div>
              <input className={styles.obInput} type="text" value={obUnknown.legalName} readOnly />
            </div>
            <div className={styles.obBlock}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>2.</span><span className={styles.obLabel}>Other Known Name/Alias</span></div>
              <input className={styles.obInput} type="text" placeholder="Please select" value={obUnknown.alias} onChange={e => updateObU('alias', e.target.value)} />
            </div>
            <div className={`${styles.obBlock} ${errors.tpDesc ? styles.hasError : ''}`}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>3.</span><span className={styles.obLabel}>As you have selected Unknown as the Third Party type, please provide a description of the Third Party</span><span className={styles.req}>*</span></div>
              <div className={styles.obCheckboxGroup}>
                {['For Profit Commercial Organisation','Registered Charity','Not For Profit Organisation','Sole Trader','Freelancer','Self employed','Government Entity','Other'].map(opt => (
                  <label key={opt} className={styles.obCheckboxItem}>
                    <input type="checkbox" checked={obUnknown.tpDesc.includes(opt)} onChange={() => {
                      updateObU('tpDesc', obUnknown.tpDesc.includes(opt) ? obUnknown.tpDesc.filter(x => x !== opt) : [...obUnknown.tpDesc, opt]);
                      setErrors(prev => ({ ...prev, tpDesc: false }));
                    }} />
                    {opt}
                  </label>
                ))}
              </div>
              {errors.tpDesc && <div className={styles.obError}>Please select at least one option.</div>}
            </div>
            <div className={styles.obBlock}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>4.</span><span className={styles.obLabel}>Registered Address</span></div>
              <textarea className={`${styles.obInput} ${styles.obTextarea}`} placeholder="Enter address" value={obUnknown.address} onChange={e => updateObU('address', e.target.value)} />
            </div>
            <div className={`${styles.obBlock} ${errors.country ? styles.hasError : ''}`}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>5.</span><span className={styles.obLabel}>Registered Country/Territory</span><span className={styles.req}>*</span></div>
              <select className={`${styles.obInput} ${styles.obSelect}`} value={obUnknown.country} onChange={e => { updateObU('country', e.target.value); setErrors(prev => ({ ...prev, country: false })); }}>
                <option value="">Please select</option>
                {COUNTRIES.map(c => <option key={c}>{c}</option>)}
              </select>
              {errors.country && <div className={styles.obError}>Registered Country/Territory is required.</div>}
            </div>
            <div className={styles.obBlock}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>6.</span><span className={styles.obLabel}>Industry/Sector</span></div>
              <select className={`${styles.obInput} ${styles.obSelect}`} value={obUnknown.industry} onChange={e => updateObU('industry', e.target.value)}>
                <option value="">Please select</option>
                {INDUSTRIES.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className={styles.obBlock}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>7.</span><span className={styles.obLabel}>Identification</span></div>
              <div className={styles.obSubGrid}>
                <div>
                  <div className={styles.obSubLabel}>ID Type</div>
                  <select className={`${styles.obInput} ${styles.obSelect}`} value={obUnknown.idType} onChange={e => updateObU('idType', e.target.value)}>
                    <option value="">Please select</option>
                    <option>DUNS Number</option><option>LEI</option><option>BVD ID</option><option>VAT Number</option><option>Tax Code</option><option>Trade Licence</option>
                  </select>
                </div>
                <div>
                  <div className={styles.obSubLabel}>ID Value</div>
                  <input className={styles.obInput} type="text" placeholder="Enter identifier value" value={obUnknown.idValue} onChange={e => updateObU('idValue', e.target.value)} />
                </div>
              </div>
            </div>
            <div className={styles.obBlock}>
              <div className={styles.obBlockHead}><span className={styles.obNum}>8.</span><span className={styles.obLabel}>Internal Reference or ID</span></div>
              <input className={styles.obInput} type="text" placeholder="e.g. SMP-0042" value={obUnknown.internalRef} onChange={e => updateObU('internalRef', e.target.value)} />
            </div>
          </div>
        </>
      )}

      <div className={styles.acFooter}>
        <button className={styles.btnOutline} onClick={onBack}><span className="material-icons-outlined" style={{ fontSize: 16 }}>arrow_back</span> Back</button>
        <div className={styles.acFooterRight}>
          <a href="#" className={styles.btnGhost} onClick={onCancel}>Cancel</a>
          <button className={styles.btnFilled} onClick={handleSave}><span className="material-icons-outlined" style={{ fontSize: 16 }}>check</span> Save &amp; Finish</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Profile side panel ─────────────────────── */

function ProfilePanel({ name, tpType, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [name]);

  const profileData = name === 'Bruce Wayne Batman' ? brucewayne : piedpiper;

  return (
    <>
      <div className={styles.panelOverlay} onClick={onClose} />
      <div className={styles.profilePanel}>
        <div className={styles.profilePanelTopbar}>
          <button className={styles.panelBackBtn} onClick={onClose}>
            <span className="material-icons-outlined" style={{ fontSize: 18 }}>arrow_back</span> Back
          </button>
          <div className={styles.profilePanelTitle}>{name}</div>
        </div>
        <div className={styles.profilePanelContent}>
          <ProfilePage profile={profileData} embedded />
        </div>
      </div>
    </>
  );
}

/* ─────────────────────── Properties side panel ─────────────────────── */

function PropertiesPanel({ name, onClose }) {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const filtered = DUP_PROPERTIES.filter(p => {
    const matchQ = !search || p.name.toLowerCase().includes(search.toLowerCase());
    const matchC = !cat || p.cat === cat;
    return matchQ && matchC;
  });

  return (
    <>
      <div className={styles.panelOverlay} onClick={onClose} />
      <div className={styles.propsPanel}>
        <div className={styles.propsPanelHeader}>
          <span className={styles.propsPanelTitle}>Properties — <span style={{ fontWeight: 400 }}>{name}</span></span>
          <button className={styles.btnOutline} onClick={onClose}>Close</button>
        </div>
        <div className={styles.propsPanelFilters}>
          <div>
            <div className={styles.filterLabel}>Search Properties</div>
            <input className={styles.filterInput} type="text" placeholder="Search properties…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div>
            <div className={styles.filterLabel}>Filter Categories</div>
            <select className={styles.filterSelect} value={cat} onChange={e => setCat(e.target.value)}>
              <option value="">All</option>
              <option value="identity">Identity</option>
              <option value="risk">Risk</option>
              <option value="contact">Contact</option>
              <option value="compliance">Compliance</option>
              <option value="operational">Operational</option>
            </select>
          </div>
        </div>
        <div className={styles.propsPanelContent}>
          <table className={styles.propsTable}>
            <thead><tr><th>Name</th><th>Value</th><th style={{ width: 32 }} /></tr></thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={i}>
                  <td className={styles.propName}>{p.name}</td>
                  <td className={styles.propVal}>{p.value || '—'}</td>
                  <td className={styles.propIndicator}>
                    {p.value
                      ? (
                        <span className={styles.propWarningWrap}>
                          <span className="material-icons-outlined" style={{ fontSize: 16, color: 'var(--warning-500)', display: 'block' }}>warning</span>
                          <span className={styles.propTooltip}>High Risk Factors</span>
                        </span>
                      )
                      : <span className={styles.propDot} />
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────── Cancel Modal ─────────────────────── */

function CancelModal({ onStay, onLeave }) {
  return (
    <div className={styles.cancelOverlay} onClick={e => e.target === e.currentTarget && onStay()}>
      <div className={styles.cancelModal}>
        <div className={styles.cancelModalHeader}>
          <span className={styles.cancelModalTitle}>Cancel Creation</span>
          <button className={styles.cancelModalClose} onClick={onStay}>
            <span className="material-icons-outlined">close</span>
          </button>
        </div>
        <div className={styles.cancelModalBody}>
          <div className={styles.cancelModalQuestion}>Are you sure you want to cancel?</div>
          <div className={styles.cancelModalDesc}>
            All progress will be lost. You will be redirected to the Third Parties list.
          </div>
        </div>
        <div className={styles.cancelModalFooter}>
          <button className={styles.btnOutline} onClick={onStay}>Stay on Page</button>
          <a href="#/third-parties" className={styles.cancelModalConfirm} onClick={onLeave}>Yes, Cancel</a>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Utility ─────────────────────── */

function useOutsideClick(ref, handler) {
  useEffect(() => {
    function listener(e) { if (ref.current && !ref.current.contains(e.target)) handler(); }
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}
