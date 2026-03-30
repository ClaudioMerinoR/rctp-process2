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

const PROCESS_POLICIES = {
  'Standard RCTP': {
    managed: ['Default Standard KYBP Policy'],
    unmanaged: ['Entity Verification Policy 2', 'Test'],
  },
  'Enhanced Due Diligence': {
    managed: ['Enhanced KYBP Policy', 'Full Compliance Policy'],
    unmanaged: ['Premium Monitoring Policy', 'Extended Screening Policy'],
  },
  'Basic Screening': {
    managed: ['Minimal Screening Policy'],
    unmanaged: ['Quick Check Policy', 'Lite Compliance Policy'],
  },
};
const PROCESS_OPTIONS = Object.keys(PROCESS_POLICIES);

/* ─────────────────────── Main component ─────────────────────── */

export default function AddThirdParty() {
  const navigate = useNavigate();

  // TP type & name
  const [tpType, setTpType] = useState('');
  const [tpName, setTpName] = useState('');

  // Inline sections visibility
  const [showDupCheck, setShowDupCheck] = useState(false);
  const [showVerify, setShowVerify] = useState(false);

  // Summary fields
  const [ownerMode, setOwnerMode] = useState('user');
  const [owner, setOwner] = useState('');
  const [businessUnits, setBusinessUnits] = useState([]);
  const [process, setProcess] = useState('Standard RCTP');
  const [policy, setPolicy] = useState('');
  const [tags, setTags] = useState([]);

  // Entity verification
  const [verifyCountry, setVerifyCountry] = useState('');
  const [selectedVerify, setSelectedVerify] = useState(null);
  const [entityVerified, setEntityVerified] = useState(false);

  // Onboarding - entity
  const [ob, setOb] = useState({ legalName: '', companyNum: '', address: '', country: '', website: '', industry: '', idType: '', idValue: '', internalRef: '' });
  const updateOb = (k, v) => setOb(prev => ({ ...prev, [k]: v }));

  // Onboarding - person
  const [obPerson, setObPerson] = useState({ legalName: '', alias: '', address: '', country: '', yob: '', gender: '', industry: '', idType: '', idValue: '', internalRef: '' });
  const updateObP = (k, v) => setObPerson(prev => ({ ...prev, [k]: v }));

  // Onboarding - unknown
  const [obUnknown, setObUnknown] = useState({ legalName: '', alias: '', tpDesc: [], address: '', country: '', industry: '', idType: '', idValue: '', internalRef: '' });
  const updateObU = (k, v) => setObUnknown(prev => ({ ...prev, [k]: v }));

  // Onboarding - shared pre-fields
  const [obNotes, setObNotes] = useState('');
  const [obLanguage, setObLanguage] = useState('');

  // Active / Inactive
  const [isActive, setIsActive] = useState(true);

  // Side panels
  const [profilePanel, setProfilePanel] = useState(null);
  const [propsPanel, setPropsPanel] = useState(null);
  const [showNotesPanel, setShowNotesPanel] = useState(false);
  const [showLanguagePanel, setShowLanguagePanel] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState([]);

  // Cancel modal & creating
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [creatingLabel, setCreatingLabel] = useState('');
  const [creatingProgress, setCreatingProgress] = useState(0);

  // Validation
  const [errors, setErrors] = useState({});

  // Dropdowns
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

  // Sync legal name to onboarding when tpName changes
  useEffect(() => {
    updateOb('legalName', tpName);
    updateObP('legalName', tpName);
    updateObU('legalName', tpName);
  }, [tpName]);

  // Reset sections when type changes
  useEffect(() => {
    setShowDupCheck(false);
    setShowVerify(false);
    setSelectedVerify(null);
    setEntityVerified(false);
    setErrors({});
  }, [tpType]);

  const types = [
    { id: 'entity', icon: 'business', title: 'Entity / Organisation', desc: 'A company, firm, partnership or other registered legal entity.' },
    { id: 'person', icon: 'person', title: 'Individual / Person', desc: 'A natural person acting as a sole trader, contractor or individual.' },
    { id: 'unknown', icon: 'help_outline', title: 'Unknown', desc: 'The type of third party is not yet known or cannot be determined.' },
  ];

  function selectOwner(val) { setOwner(val); setOwnerOpen(false); }
  function toggleBu(val) { setBusinessUnits(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]); }
  function removeBu(val) { setBusinessUnits(prev => prev.filter(x => x !== val)); }
  function toggleTag(val) { setTags(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]); }

  function handleCheckDuplicates() {
    if (!tpName.trim()) {
      setErrors(prev => ({ ...prev, name: true }));
      return;
    }
    setShowDupCheck(true);
    setShowVerify(false);
  }

  function handleEntityVerification() {
    if (!tpName.trim()) {
      setErrors(prev => ({ ...prev, name: true }));
      return;
    }
    setShowVerify(true);
    setShowDupCheck(false);
  }

  function applyVerification(duns) {
    const row = VERIFY_ROWS.find(r => r.duns === duns);
    if (row) {
      updateOb('legalName', row.name);
      updateOb('companyNum', row.duns);
      updateOb('address', row.address);
      const match = COUNTRIES.find(c => c.toLowerCase() === row.country.toLowerCase());
      if (match) updateOb('country', match);
      setEntityVerified(true);
    }
  }

  function handleCreate() {
    const errs = {};
    if (!tpType) errs.type = true;
    if (!tpName.trim()) errs.name = true;
    if (!owner.trim()) errs.owner = true;
    if (!businessUnits.length) errs.bu = true;

    if (tpType === 'entity' && !ob.country) errs.country = true;
    if (tpType === 'person' && !obPerson.country) errs.country = true;
    if (tpType === 'unknown') {
      if (!obUnknown.country) errs.country = true;
      if (!obUnknown.tpDesc.length) errs.tpDesc = true;
    }

    setErrors(errs);
    if (Object.keys(errs).length) return;

    // Start creating animation
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
      setTimeout(() => { setCreatingProgress(width); setCreatingLabel(text); }, delay);
    });
    setTimeout(() => navigate('/profile/piedpiper'), 3600);
  }

  function handleCancel(e) {
    e.preventDefault();
    setShowCancelModal(true);
  }

  const filteredVerify = verifyCountry
    ? VERIFY_ROWS.filter(r => r.country.toLowerCase().includes(verifyCountry.toLowerCase()))
    : VERIFY_ROWS;

  const isPerson = tpType === 'person';

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: 'Third Parties', to: '/third-parties' }, { label: 'Create a Third Party' }]} />

      <div className={styles.titleCard}>
        <h1 className={styles.title}>Create a Third Party</h1>
        <div className={styles.titleDivider} />
      </div>

      {/* ── Section 1: Third Party Type + Name + Dup Check + Entity Verification ── */}
      <div className={styles.section}>
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

        {/* ── Third Party Name (shown after type is selected) ── */}
        {tpType && (
          <>
            <div className={styles.sectionHeading} style={{ marginTop: 24 }}>Third Party Name</div>
            <div className={styles.nameRow}>
              <div className={`${styles.nameField} ${errors.name ? styles.hasError : ''}`}>
                <input
                  className={styles.editInput}
                  type="text"
                  placeholder="Enter the full legal name"
                  value={tpName}
                  onChange={e => { setTpName(e.target.value); setErrors(prev => ({ ...prev, name: false })); }}
                />
                {errors.name && <div className={styles.fieldError}>Third Party Name is required.</div>}
              </div>
              <div className={styles.nameActions}>
                <button className={styles.btnOutline} onClick={handleCheckDuplicates}>
                  <span className="material-icons-outlined" style={{ fontSize: 16 }}>content_copy</span>
                  Check for Duplicates
                </button>
                {tpType === 'entity' && (
                  <button className={styles.btnOutline} onClick={handleEntityVerification}>
                    <span className="material-icons-outlined" style={{ fontSize: 16 }}>verified</span>
                    Entity Verification
                  </button>
                )}
              </div>
            </div>

            {/* ── Inline: Duplicate Check Results ── */}
            <div className={`${styles.inlineSectionWrap} ${showDupCheck ? styles.open : ''}`}>
              <div className={styles.inlineSectionInner}>
                <div className={styles.inlineSection}>
                  <div className={styles.inlineSectionHeader}>
                    <h3 className={styles.inlineSectionTitle}>
                      <span className="material-icons-outlined" style={{ fontSize: 20, color: 'var(--warning-500)' }}>content_copy</span>
                      Duplicate Check Results
                    </h3>
                    <button className={styles.btnGhost} onClick={() => setShowDupCheck(false)}>
                      <span className="material-icons-outlined" style={{ fontSize: 16 }}>close</span> Close
                    </button>
                  </div>
                  <div className={styles.dupBanner}>
                    <span className="material-icons-outlined">warning_amber</span>
                    <div>
                      <strong>{isPerson ? '1 potential match found.' : '10 potential matches found.'}</strong>{' '}
                      These records have a similar name and may already exist in the system. If one of the matches above is the same third party, use an existing record instead of creating a new one.
                    </div>
                  </div>

                  {!isPerson && (
                    <div className={styles.tableWrap}>
                      <table className={styles.dupTable}>
                        <thead>
                          <tr><th>Name</th><th>DUNS Number</th><th>Address</th><th>Country / Territory</th><th style={{ textAlign: 'center' }}>UBO Status</th><th style={{ width: 40 }} /></tr>
                        </thead>
                        <tbody>
                          {DUP_ROWS.map((r, i) => (
                            <tr key={i}>
                              <td><span className={styles.cellLink} onClick={() => window.open('/#/profile/piedpiper', '_blank')}>{r.name}</span></td>
                              <td>{r.duns}</td>
                              <td>{r.address}</td>
                              <td>{r.country}</td>
                              <td className={styles.uboCell}>
                                <span className={`material-icons-outlined ${r.ubo ? styles.uboOk : styles.uboFail}`}>{r.ubo ? 'check_circle' : 'cancel'}</span>
                              </td>
                              <td><button className={styles.moreBtn} onClick={() => setPropsPanel(r.name)}>View properties</button></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {isPerson && (
                    <div className={styles.tableWrap}>
                      <table className={styles.dupTable}>
                        <thead>
                          <tr><th>Name</th><th>Owner</th><th>Business Unit</th><th>Process</th><th>Current Status</th><th>Internal Reference</th><th>Active/Inactive</th><th style={{ width: 40 }} /></tr>
                        </thead>
                        <tbody>
                          {PERSON_DUP_ROWS.map((r, i) => (
                            <tr key={i}>
                              <td><span className={styles.cellLink} onClick={() => window.open(`/profile/${r.name.toLowerCase().replace(/\s+/g,'-')}`, '_blank')}>{r.name}</span></td>
                              <td>{r.owner}</td>
                              <td>{r.bu}</td>
                              <td>{r.process}</td>
                              <td><span className={styles.statusBadge}>{r.status}</span></td>
                              <td>{r.ref}</td>
                              <td>{r.active}</td>
                              <td><button className={styles.moreBtn} onClick={() => setPropsPanel(r.name)}>View properties</button></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className={styles.dupFooter}>
                    <button className={styles.btnOutline} onClick={() => setShowDupCheck(false)}>
                      <span className="material-icons-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                      Ignore duplicates and continue
                    </button>
                    <button className={styles.btnFilled} onClick={() => setShowCancelModal(true)}>
                      Exit creation process
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Inline: Entity Verification ── */}
            {tpType === 'entity' && (
              <div className={`${styles.inlineSectionWrap} ${showVerify ? styles.open : ''}`}>
                <div className={styles.inlineSectionInner}>
                  <div className={styles.inlineSection}>
                    <div className={styles.inlineSectionHeader}>
                      <h3 className={styles.inlineSectionTitle}>
                        <span className="material-icons-outlined" style={{ fontSize: 20, color: 'var(--primary-500)' }}>verified</span>
                        Entity Verification
                      </h3>
                      <button className={styles.btnGhost} onClick={() => setShowVerify(false)}>
                        <span className="material-icons-outlined" style={{ fontSize: 16 }}>close</span> Close
                      </button>
                    </div>
                    <div className={styles.verifyIntro}>
                      Entity verification will screen the Third Party Name against the Dun&amp;Bradstreet company data source, allowing you to verify the legal existence of your Third Party before creating the RCTP record.<br />
                      If you select an entity, corresponding properties will be prepopulated within the Third Party record.
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
                          {filteredVerify.map((r, i) => (
                            <tr key={i} className={selectedVerify === r.duns ? styles.rowSelected : ''}>
                              <td>
                                <input
                                  type="radio"
                                  name="verify-pick"
                                  checked={selectedVerify === r.duns}
                                  onChange={() => { setSelectedVerify(r.duns); applyVerification(r.duns); }}
                                  style={{ accentColor: 'var(--primary-500)' }}
                                />
                              </td>
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
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Section 3: Summary ── */}
      {tpType && (
        <div className={styles.section}>
          <div className={styles.sectionHeading}>
            <span>Summary</span>
            <div className={styles.activeToggleWrap}>
              <div
                className={`${styles.activeToggle} ${!isActive ? styles.activeToggleOff : ''}`}
                onClick={() => setIsActive(v => !v)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setIsActive(v => !v)}
              >
                <div className={styles.activeToggleTrack}>{isActive ? 'Active' : 'Inactive'}</div>
                <div className={styles.activeToggleThumb} />
              </div>
              <p className={styles.activeToggleHint}>Check to make your third party active and uncheck to deactivate. Deactivated Third parties cannot be invited to processes.</p>
            </div>
          </div>
          <div className={styles.summaryGrid}>

            {/* LEFT COLUMN */}
            <div className={styles.summaryCol}>

              {/* Owner */}
              <div className={`${styles.editField} ${errors.owner ? styles.hasError : ''}`} ref={ownerRef}>
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
                      <span className={owner ? styles.dropdownValueSelected : styles.dropdownPlaceholder}>{owner || 'Type and select employee name'}</span>
                      <span className="material-icons-outlined" style={{ fontSize: 18, color: 'var(--text-light)' }}>expand_more</span>
                    </div>
                    {ownerOpen && (
                      <div className={styles.dropdown}>
                        {OWNER_OPTIONS.map(o => <div key={o} className={styles.dropdownItem} onClick={() => selectOwner(o)}>{o}</div>)}
                      </div>
                    )}
                  </div>
                </div>
                {errors.owner && <div className={styles.fieldError}>Owner is required.</div>}
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

            {/* RIGHT COLUMN */}
            <div className={styles.summaryCol}>

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
                        <div key={o} className={`${styles.dropdownItem} ${process === o ? styles.dropdownItemSelected : ''}`} onClick={() => { setProcess(o); setPolicy(''); setProcessOpen(false); }}>
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
                    <span className={policy ? styles.dropdownValueSelected : styles.dropdownPlaceholder}>{policy || 'Select a policy…'}</span>
                    <span className="material-icons-outlined" style={{ fontSize: 18, color: 'var(--text-light)' }}>expand_more</span>
                  </div>
                  {policyOpen && (
                    <div className={styles.dropdown}>
                      <div className={styles.dropdownGroup}>Process Managed Policies</div>
                      {PROCESS_POLICIES[process].managed.map(o => (
                        <div key={o} className={styles.dropdownItem} onClick={() => { setPolicy(o); setPolicyOpen(false); }}>{o}</div>
                      ))}
                      <div className={styles.dropdownGroup}>Unmanaged Policies</div>
                      {PROCESS_POLICIES[process].unmanaged.map(o => (
                        <div key={o} className={styles.dropdownItem} onClick={() => { setPolicy(o); setPolicyOpen(false); }}>{o}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ── Section 4: Onboarding Details ── */}
      {tpType && (
        <div className={styles.section}>
          <div className={styles.sectionHeading}>
            <span>Onboarding Details</span>
            <div className={styles.sectionHeadingActions}>
              <button className={styles.btnOutline} onClick={() => setShowLanguagePanel(true)}>
                <span className="material-icons-outlined" style={{ fontSize: 16 }}>translate</span>
                Questionnaire Language{obLanguage ? `: ${obLanguage}` : ''}
              </button>
              <button className={styles.btnOutline} onClick={() => setShowNotesPanel(true)}>
                <span className="material-icons-outlined" style={{ fontSize: 16 }}>note_add</span>
                Add Notes
              </button>
            </div>
          </div>

          {/* Entity verified warning */}
          {tpType === 'entity' && entityVerified && (
            <div className={styles.obWarningIntro}>
              <span className="material-icons-outlined">warning_amber</span>
              <div>
                <strong>Entity verification data detected.</strong> If you completed entity verification, the fields below have been pre-filled with verified data. Modifying this information will override the verified record and the entity verification will be lost.
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
                  <input className={styles.obInput} type="text" value={ob.legalName} onChange={e => updateOb('legalName', e.target.value)} placeholder="Enter the full legal name" />
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
                  <input className={styles.obInput} type="text" value={obPerson.legalName} onChange={e => updateObP('legalName', e.target.value)} placeholder="Enter the full legal name" />
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
                  <input className={styles.obInput} type="text" value={obUnknown.legalName} onChange={e => updateObU('legalName', e.target.value)} placeholder="Enter the full legal name" />
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
        </div>
      )}

      {/* ── Footer ── */}
      {tpType && (
        <div className={styles.formFooter}>
          <a href="#" className={styles.btnGhost} onClick={handleCancel}>Cancel</a>
          <button className={styles.btnFilled} onClick={handleCreate}>
            <span className="material-icons-outlined" style={{ fontSize: 16 }}>check</span> Create Third Party
          </button>
        </div>
      )}

      {/* Language side panel */}
      {showLanguagePanel && (
        <LanguagePanel
          selected={obLanguage}
          onSelect={setObLanguage}
          onClose={() => setShowLanguagePanel(false)}
        />
      )}

      {/* Notes side panel */}
      {showNotesPanel && (
        <NotesPanel
          notes={notes}
          noteText={noteText}
          onNoteTextChange={setNoteText}
          onAddNote={() => {
            if (noteText.trim()) {
              setNotes(prev => [...prev, { text: noteText.trim(), time: new Date().toLocaleString() }]);
              setNoteText('');
            }
          }}
          onClose={() => setShowNotesPanel(false)}
        />
      )}

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

/* ─────────────────────── Language side panel ─────────────────────── */

const LANGUAGES = [
  { code: 'de', label: 'Deutsch (German)' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español (Spanish)' },
  { code: 'fr', label: 'Français (French)' },
  { code: 'ja', label: '日本語 (Japanese)' },
  { code: 'nl', label: 'Nederlands (Dutch)' },
  { code: 'pl', label: 'Polski (Polish)' },
  { code: 'ru', label: 'Русский (Russian)' },
  { code: 'zh-s', label: '中文 (Chinese - Simplified)' },
  { code: 'zh-t', label: '中文 (Chinese - Traditional)' },
];

function LanguagePanel({ selected, onSelect, onClose }) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const filtered = search
    ? LANGUAGES.filter(l => l.label.toLowerCase().includes(search.toLowerCase()))
    : LANGUAGES;

  return (
    <>
      <div className={styles.panelOverlay} onClick={onClose} />
      <div className={styles.langPanel}>
        <div className={styles.langPanelHeader}>
          <span className={styles.langPanelTitle}>Choose Language</span>
          <button className={styles.btnOutline} onClick={onClose}>Close</button>
        </div>
        <div className={styles.langSearchRow}>
          <input
            className={styles.langSearchInput}
            type="text"
            placeholder="Search for languages.."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {selected && <span className={styles.langSelectedBadge}>{selected}</span>}
        </div>
        <div className={styles.langDivider} />
        <div className={styles.langList}>
          {filtered.map(l => (
            <div
              key={l.code}
              className={`${styles.langItem} ${selected === l.label ? styles.langItemActive : ''}`}
              onClick={() => { onSelect(l.label); onClose(); }}
            >
              <span className={styles.langItemLabel}>{l.label}</span>
              <span className={`material-icons-outlined ${styles.langItemCheck}`}>check</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─────────────────────── Notes side panel ─────────────────────── */

function NotesPanel({ notes, noteText, onNoteTextChange, onAddNote, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const toolbarButtons = [
    { icon: 'format_bold', title: 'Bold' },
    { icon: 'format_italic', title: 'Italic' },
    { icon: 'format_underlined', title: 'Underline' },
    { icon: 'format_list_bulleted', title: 'Bullet List' },
    { icon: 'format_list_numbered', title: 'Numbered List' },
    { icon: 'keyboard_return', title: 'Line Break' },
  ];

  return (
    <>
      <div className={styles.panelOverlay} onClick={onClose} />
      <div className={styles.notesPanel}>
        <div className={styles.notesPanelHeader}>
          <span className={styles.notesPanelTitle}>Note - Onboarding / Available Threads</span>
          <button className={styles.btnOutline} onClick={onClose}>Close</button>
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
            {toolbarButtons.map(b => (
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
            <button className={styles.btnOutline} type="button">
              <span className="material-icons-outlined" style={{ fontSize: 16 }}>person_add</span>
              Include Internal User
            </button>
            <button className={styles.btnOutline} type="button">
              <span className="material-icons-outlined" style={{ fontSize: 16 }}>person_add_alt</span>
              Include External User
            </button>
            <button className={styles.btnOutline} type="button">
              <span className="material-icons-outlined" style={{ fontSize: 16 }}>attach_file</span>
              Add Attachment
            </button>
            <button className={styles.btnFilled} type="button" onClick={onAddNote}>
              Add Note
            </button>
          </div>
        </div>
      </div>
    </>
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
