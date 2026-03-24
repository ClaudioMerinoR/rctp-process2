import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Breadcrumb from '../components/layout/Breadcrumb';
import styles from './AddThirdParty.module.css';

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

const VERIFY_ROWS = [
  { name: 'INITECH Co., Ltd.', duns: '690000463', address: '61 Digital-ro 26-gil, Guro-gu, Seoul, 08389, Seoul', country: 'Republic Of Korea', ubo: true },
  { name: 'Initech Systems Ltd', duns: '204329382', address: 'Suite 3000, 421-7th Ave SW, Calgary, T2P 4K9, ALBERTA', country: 'Canada', ubo: false },
  { name: 'Initech Global, LLC', duns: '623292385', address: '5075 Cascade Rd SE Ste J, Grand Rapids, 49546-3751, Michigan', country: 'United States', ubo: false },
  { name: 'INITECH SOLUTIONS', duns: '771297084', address: 'HALIMA APT, A\\202, KISMAT COLONY, Thane, 400612, Maharashtra', country: 'India', ubo: true },
  { name: 'Initech Inc', duns: '808241405', address: '1033 US Highway 46 Ste 201, Clifton, 07013-2474, New Jersey', country: 'United States', ubo: false },
  { name: 'INITECH CONSULTING LIMITED', duns: '591303052', address: '62 Woodward Street, Featherston, 5710', country: 'New Zealand', ubo: true },
  { name: 'INITECH SOFTWARE SOLUTIONS PRIVATE LIMITED', duns: '860258229', address: 'Unit No. 9A, 5th Office Floor, Mindspace, Hi Tech City, Hyderabad, 500081', country: 'India', ubo: true },
  { name: 'INITECH INFOSOLUTION', duns: '961530403', address: 'Th 18, Dlf New Town Heights, Gurugram, 122004, Haryana', country: 'India', ubo: false },
  { name: 'INITECH SOLUTIONS', duns: '856274180', address: '9-1, KAMARAJAR STREET, Coimbatore, 641008, Tamil Nadu', country: 'India', ubo: false },
  { name: 'INITECH ENTERPRISE INTERNATIONAL LLC', duns: '067470522', address: '6807 Emmett F Lowry Expy Ste 105, Texas City, 77591-2546, Texas', country: 'United States', ubo: false },
];

const COUNTRIES = ['Argentina','Australia','Brazil','Canada','China','France','Germany','India','Italy','Japan','Mexico','Netherlands','Republic of Korea','Russian Federation','Singapore','Spain','Sweden','Switzerland','United Kingdom','United States'];

const STEPS = [
  { n: 1, label: 'Third Party Details' },
  { n: 2, label: 'Duplicate Check' },
  { n: 3, label: 'Entity Verification' },
  { n: 4, label: 'Onboarding Details' },
];

export default function AddThirdParty() {
  const navigate = useNavigate();
  const [openStep, setOpenStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [summaries, setSummaries] = useState({});

  // Step 1
  const [tpType, setTpType] = useState('');
  const [tpName, setTpName] = useState('');
  const [owner, setOwner] = useState('');
  const [businessUnit, setBusinessUnit] = useState('');
  const [process, ] = useState('Standard RCTP');
  const [s1Errors, setS1Errors] = useState({});

  // Step 3
  const [verifyCountry, setVerifyCountry] = useState('');
  const [selectedVerify, setSelectedVerify] = useState(null);
  const [skipVerify, setSkipVerify] = useState(false);

  // Step 4
  const [ob, setOb] = useState({ legalName: '', companyNum: '', address: '', country: '', website: '', industry: '' });

  const updateOb = (k, v) => setOb(prev => ({ ...prev, [k]: v }));

  function completeStep(n, summary) {
    setCompletedSteps(prev => new Set([...prev, n]));
    setSummaries(prev => ({ ...prev, [n]: summary }));
  }

  function openAc(n) {
    setOpenStep(n);
  }

  function handleStep1Continue() {
    const errors = {};
    if (!tpType) errors.type = true;
    if (!tpName.trim()) errors.name = true;
    if (!owner.trim()) errors.owner = true;
    if (!businessUnit.trim()) errors.bu = true;
    setS1Errors(errors);
    if (Object.keys(errors).length) return;
    completeStep(1, `${tpType === 'entity' ? 'Entity' : tpType === 'person' ? 'Individual' : 'Unknown'} · ${tpName}`);
    openAc(2);
  }

  function handleStep2Continue() {
    completeStep(2, 'Continued as new third party');
    if (tpType === 'entity') openAc(3);
    else openAc(4);
  }

  function handleStep3Continue() {
    if (selectedVerify) {
      const row = VERIFY_ROWS.find(r => r.duns === selectedVerify);
      if (row) {
        updateOb('legalName', row.name);
        updateOb('companyNum', row.duns);
        updateOb('address', row.address);
        updateOb('country', row.country);
      }
      completeStep(3, `Verified: ${row?.name || ''}`);
    } else {
      completeStep(3, skipVerify ? 'Skipped' : 'Not verified');
      updateOb('legalName', tpName);
    }
    openAc(4);
  }

  function handleFinish() {
    navigate('/third-parties');
  }

  const filteredVerify = verifyCountry
    ? VERIFY_ROWS.filter(r => r.country.toLowerCase().includes(verifyCountry.toLowerCase()))
    : VERIFY_ROWS;

  const stepIsLocked = n => !completedSteps.has(n - 1) && n > 1;

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: 'Third Parties', to: '/third-parties' }, { label: 'Create a Third Party' }]} />

      <div className={styles.titleCard}>
        <h1 className={styles.title}>Create a Third Party</h1>
        <div className={styles.titleDivider} />
      </div>

      <div className={styles.accordion}>
        {STEPS.map(({ n, label }) => {
          const isOpen = openStep === n;
          const isDone = completedSteps.has(n);
          const isLocked = stepIsLocked(n) && !isDone;
          const cls = [styles.acItem, isOpen ? styles.open : '', isDone && !isOpen ? styles.completed : '', isLocked ? styles.locked : ''].filter(Boolean).join(' ');

          return (
            <div key={n} className={cls}>
              <button
                className={styles.acHeader}
                onClick={() => !isLocked && setOpenStep(isOpen ? null : n)}
                disabled={isLocked}
              >
                <div className={styles.acBadge}>
                  {isDone && !isOpen
                    ? <span className="material-icons-outlined" style={{ fontSize: 16 }}>check</span>
                    : <span>{n}</span>}
                </div>
                <div className={styles.acHeaderText}>
                  <span className={styles.acTitle}>{label}</span>
                  {summaries[n] && !isOpen && <span className={styles.acSummary}>{summaries[n]}</span>}
                </div>
                <span className={`material-icons-outlined ${styles.acChevron} ${isOpen ? styles.rotated : ''}`}>expand_more</span>
              </button>

              {isOpen && (
                <div className={styles.acBody}>
                  {n === 1 && <Step1 tpType={tpType} setTpType={setTpType} tpName={tpName} setTpName={setTpName} owner={owner} setOwner={setOwner} businessUnit={businessUnit} setBusinessUnit={setBusinessUnit} process={process} errors={s1Errors} onContinue={handleStep1Continue} />}
                  {n === 2 && <Step2 onBack={() => openAc(1)} onContinue={handleStep2Continue} />}
                  {n === 3 && <Step3 verifyCountry={verifyCountry} setVerifyCountry={setVerifyCountry} rows={filteredVerify} selectedVerify={selectedVerify} setSelectedVerify={setSelectedVerify} skipVerify={skipVerify} setSkipVerify={setSkipVerify} onBack={() => openAc(2)} onContinue={handleStep3Continue} />}
                  {n === 4 && <Step4 ob={ob} updateOb={updateOb} tpType={tpType} onBack={() => openAc(tpType === 'entity' ? 3 : 2)} onFinish={handleFinish} />}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PageLayout>
  );
}

/* ── Step 1 ── */
function Step1({ tpType, setTpType, tpName, setTpName, owner, setOwner, businessUnit, setBusinessUnit, process, errors, onContinue }) {
  const types = [
    { id: 'entity', icon: 'business', title: 'Entity / Organisation', desc: 'A company, firm, partnership or other registered legal entity.' },
    { id: 'person', icon: 'person', title: 'Individual / Person', desc: 'A natural person acting as a sole trader, contractor or individual.' },
    { id: 'unknown', icon: 'help_outline', title: 'Unknown', desc: 'The type of third party is not yet known or cannot be determined.' },
  ];
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

      {tpType && (
        <>
          <div className={styles.sectionHeading} style={{ marginTop: 24 }}>Summary</div>
          <div className={styles.editGrid}>
            <div className={`${styles.editField} ${errors.name ? styles.hasError : ''}`}>
              <label className={styles.editLabel}>Third Party Name <span className={styles.req}>*</span></label>
              <input className={styles.editInput} type="text" placeholder="Enter the full legal name" value={tpName} onChange={e => setTpName(e.target.value)} />
              {errors.name && <div className={styles.fieldError}>Third Party Name is required.</div>}
            </div>
            <div className={`${styles.editField} ${errors.owner ? styles.hasError : ''}`}>
              <label className={styles.editLabel}>Third Party Owner <span className={styles.req}>*</span></label>
              <input className={styles.editInput} type="text" placeholder="Type and select employee name" value={owner} onChange={e => setOwner(e.target.value)} />
              {errors.owner && <div className={styles.fieldError}>Owner is required.</div>}
            </div>
            <div className={styles.editField}>
              <label className={styles.editLabel}>Process</label>
              <input className={styles.editInput} type="text" value={process} readOnly />
            </div>
            <div className={`${styles.editField} ${errors.bu ? styles.hasError : ''}`}>
              <label className={styles.editLabel}>Business Unit <span className={styles.req}>*</span></label>
              <select className={styles.editInput} value={businessUnit} onChange={e => setBusinessUnit(e.target.value)}>
                <option value="">Select…</option>
                {['Europe','Americas','Asia Pacific','Entity Verification','test'].map(o => <option key={o}>{o}</option>)}
              </select>
              {errors.bu && <div className={styles.fieldError}>Business unit is required.</div>}
            </div>
          </div>
        </>
      )}

      <div className={styles.acFooter}>
        <div />
        <div className={styles.acFooterRight}>
          <Link to="/third-parties" className={styles.btnGhost}>Cancel</Link>
          <button className={styles.btnFilled} onClick={onContinue}>
            Continue <span className="material-icons-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Step 2 ── */
function Step2({ onBack, onContinue }) {
  return (
    <div className={styles.stepBody}>
      <div className={styles.dupBanner}>
        <span className="material-icons-outlined">warning_amber</span>
        <div><strong>10 potential matches found.</strong> These records have a similar name and may already exist in the system. If one of the matches above is the same third party, use an existing record instead of creating a new one.</div>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.dupTable}>
          <thead>
            <tr><th>Name</th><th>DUNS Number</th><th>Address</th><th>Country / Territory</th><th style={{ textAlign: 'center' }}>UBO Status</th><th style={{ width: 40 }} /></tr>
          </thead>
          <tbody>
            {DUP_ROWS.map((r, i) => (
              <tr key={i}>
                <td className={styles.cellLink}>{r.name}</td>
                <td>{r.duns}</td>
                <td>{r.address}</td>
                <td>{r.country}</td>
                <td className={styles.uboCell}>
                  <span className={`material-icons-outlined ${r.ubo ? styles.uboOk : styles.uboFail}`}>{r.ubo ? 'check_circle' : 'cancel'}</span>
                </td>
                <td><button className={styles.moreBtn}>View properties</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.acFooter}>
        <button className={styles.btnOutline} onClick={onBack}><span className="material-icons-outlined" style={{ fontSize: 16 }}>arrow_back</span> Back</button>
        <div className={styles.acFooterRight}>
          <Link to="/third-parties" className={styles.btnGhost}>Cancel</Link>
          <button className={styles.btnFilled} onClick={onContinue}>Continue <span className="material-icons-outlined" style={{ fontSize: 16 }}>arrow_forward</span></button>
        </div>
      </div>
    </div>
  );
}

/* ── Step 3 ── */
function Step3({ verifyCountry, setVerifyCountry, rows, selectedVerify, setSelectedVerify, skipVerify, setSkipVerify, onBack, onContinue }) {
  return (
    <div className={styles.stepBody}>
      <div className={styles.fieldGroup} style={{ maxWidth: 320, marginBottom: 16 }}>
        <label className={styles.fieldLabel}>Country / Territory</label>
        <select className={styles.fieldSelect} value={verifyCountry} onChange={e => setVerifyCountry(e.target.value)}>
          <option value="">All countries</option>
          {['Canada','India','New Zealand','Republic Of Korea','United States'].map(c => <option key={c}>{c}</option>)}
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
                <td>{r.name}</td>
                <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{r.duns}</td>
                <td style={{ fontSize: 12 }}>{r.address}</td>
                <td>{r.country}</td>
                <td className={styles.uboCell}><span className={`material-icons-outlined ${r.ubo ? styles.uboOk : styles.uboFail}`}>{r.ubo ? 'check_circle' : 'cancel'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <label className={styles.skipOption}>
        <input type="checkbox" checked={skipVerify} onChange={e => { setSkipVerify(e.target.checked); if (e.target.checked) setSelectedVerify(null); }} />
        Skip entity verification
      </label>
      <div className={styles.acFooter}>
        <button className={styles.btnOutline} onClick={onBack}><span className="material-icons-outlined" style={{ fontSize: 16 }}>arrow_back</span> Back</button>
        <div className={styles.acFooterRight}>
          <Link to="/third-parties" className={styles.btnGhost}>Cancel</Link>
          <button className={styles.btnFilled} onClick={onContinue}>Continue <span className="material-icons-outlined" style={{ fontSize: 16 }}>arrow_forward</span></button>
        </div>
      </div>
    </div>
  );
}

/* ── Step 4 ── */
function Step4({ ob, updateOb, tpType, onBack, onFinish }) {
  const [countryError, setCountryError] = useState(false);

  function handleSave() {
    if (!ob.country) { setCountryError(true); return; }
    onFinish();
  }

  return (
    <div className={styles.stepBody}>
      <div className={styles.obBlocks}>
        <div className={styles.obBlock}>
          <div className={styles.obBlockHead}><span className={styles.obNum}>1.</span><span className={styles.obLabel}>Legal Name of the Third Party <span className={styles.req}>*</span></span></div>
          <input className={styles.obInput} type="text" readOnly value={ob.legalName} onChange={e => updateOb('legalName', e.target.value)} />
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
        <div className={`${styles.obBlock} ${countryError ? styles.hasError : ''}`} id="ob-block-country">
          <div className={styles.obBlockHead}><span className={styles.obNum}>5.</span><span className={styles.obLabel}>Registered Country / Territory <span className={styles.req}>*</span></span></div>
          <select className={`${styles.obInput} ${styles.obSelect}`} value={ob.country} onChange={e => { updateOb('country', e.target.value); setCountryError(false); }}>
            <option value="">Choose…</option>
            {COUNTRIES.map(c => <option key={c}>{c}</option>)}
          </select>
          {countryError && <div className={styles.obError}>Registered country is required.</div>}
        </div>
        <div className={styles.obBlock}>
          <div className={styles.obBlockHead}><span className={styles.obNum}>6.</span><span className={styles.obLabel}>Company Website</span></div>
          <input className={styles.obInput} type="url" placeholder="https://www.example.com" value={ob.website} onChange={e => updateOb('website', e.target.value)} />
        </div>
        <div className={styles.obBlock}>
          <div className={styles.obBlockHead}><span className={styles.obNum}>7.</span><span className={styles.obLabel}>Industry / Sector</span></div>
          <select className={`${styles.obInput} ${styles.obSelect}`} value={ob.industry} onChange={e => updateOb('industry', e.target.value)}>
            <option value="">Select…</option>
            {['Technology','Energy','Finance','Healthcare','Manufacturing','Retail','Other'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>
      <div className={styles.acFooter}>
        <button className={styles.btnOutline} onClick={onBack}><span className="material-icons-outlined" style={{ fontSize: 16 }}>arrow_back</span> Back</button>
        <div className={styles.acFooterRight}>
          <Link to="/third-parties" className={styles.btnGhost}>Cancel</Link>
          <button className={styles.btnFilled} onClick={handleSave}><span className="material-icons-outlined" style={{ fontSize: 16 }}>check</span> Save &amp; Finish</button>
        </div>
      </div>
    </div>
  );
}
