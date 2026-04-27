import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import PageLayout from '../components/layout/PageLayout';
import Breadcrumb from '../components/layout/Breadcrumb';
import styles from './CompanyAdmin.module.css';

/* ── helpers ── */
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

/* ── Full field list ── */
const FIELD_LABELS = [
  'Legal Name', 'Industry / Sector', 'Third Party Owner', 'Process Name',
  'Country of Registration', 'Third Party Contact Email', 'Business Unit',
  'Screening & Monitoring Policy', 'Entity Type', 'Commercial Significance',
  'Expiry Date', 'Tags', 'Also Known As', 'Company Number',
  'Identification Type', 'Identification Value', 'Registered Address',
  'Internal Reference or ID', 'Company Website', 'Company Telephone',
  'ABC Policy Applies to', 'ABC Risk Assess', 'Active Date', 'Adequate housing',
  'Adverse Impact Awareness on Biodiversity', 'Adverse Impact Awareness on Biodiversity Details',
  'AFTE Policy', 'AFTE Risk Assessment', 'Agreement Documented', 'All Relevant Client Units',
  'Allowed POPs usage', 'Allowed POPs usage details', 'Allowed working minimum age',
  'Allowed working minimum age details', 'Amended Risk Level', 'Anti-Bribery Policy',
  'Audited Accounts', 'Average Turnover',
  'Awareness Usage of Hazardous Chemicals Ozone Layer in Value Chain',
  'Awareness Usage of Hazardous Chemicals Ozone Layer in Value Chain Details',
  'Bank Account Country', 'Biodiversity Laws Compliance',
  'Biodiversity Laws in Country of Operations', 'Biodiversity Laws in Country of Operations Details',
  'Bribery and Corruption Risk Level', 'Bribery and Corruption Risk Score',
  'Business Description', 'Business Description Details',
  'Business environmental enforcement', 'Business environmental enforcement details',
  'Child labour awareness', 'Child labour awareness details',
  'Child workforce supply chain', 'Child workforce supply chain details',
  'Children education', 'Children education details',
  'Children exploitation', 'Children exploitation details',
  'Children health', 'Children health details',
  'Children rights compliance', 'Children rights compliance details',
  'Children Welfare', 'Children Welfare details',
  'Chlorine alkaline method usage', 'Collective labour agreements',
  'Collective labour compliance', 'Collective labour laws',
  'Comission Fee Details', 'Comission Success Fee',
  'Commercial Significance of Product or Service',
  'Commercial Significance of Product or Service Unknown Details',
  'Commission Success Fee', 'Commission Success Fee Details', 'Commission Success Fee Unknown',
  'Compliance natural resources protection laws', 'Compliance Training', 'Compliance Training Details',
  'Confirmation ESG Legislation Compliance', 'Contract Value Amount', 'Contract Value Banding',
  'Contract Value Known', 'Contract Value Not Known Explanation',
  'Contractors', 'Contractors Entities', 'Contractors Persons',
  'Country/Territory Risk Level', 'Country/Territory Risk Score',
  'Current Risk Level', 'Current Risk Level - BreakDown', 'Current Risk Score', 'Current Risk Status',
  'Date business established', 'Date of Decision',
  'Degradation natural resources', 'Degradation natural resources details',
  'Deleted Date', 'Detention instances', 'Detention instances details', 'Directors',
  'Disagree with External Questionnaire Certification',
  'Disagree with External Questionnaire Certification Details',
  'Discrimination', 'Discrimination Details',
  'Dumping Laws in Country of Operations', 'Dumping Prevention from Ships',
  'Dumping Prevention from Ships Other Details',
  'EDD Acknowledement', 'EDD Signature Job Title',
  'Endangered Species Trade Permit', 'Endangered Species Trade Permit Details',
  'Ensurement of No Negative Impact in Biodiversity',
  'Entity Company Number', 'Entity ID Type', 'Entity ID Value',
  'Entity Industry Sector - onboarding', 'Entity Industry Sector Other Details',
  'Entity Industry Sector Unknown Details', 'Entity Other Known Name or Alias',
  'Entity Registered Address', 'Entity Registered Country',
  'Entity Third Party Legal Name', 'Entity Website',
  'Environmental Impact Reports', 'Environmental Impact Reports Details',
  'Environmental Impact Reports Documentation', 'Environmental Policies',
  'Environmental Risk Level', 'Environmental Risk Score',
  'Equal Pay Compliance', 'Equal Pay Laws', 'Equal Pay Non Compliance Details',
  'ESG and CSR Guidelines', 'ESG and CSR Guidelines Other', 'ESG and CSR Guidelines Reporting Standards',
  'ESG Legislation Compliance', 'ESG Legislation Compliance Other',
  'ESG Non-Compliance Vulnerable Groups', 'ESG Non-Compliance Vulnerable Groups Other',
  'Financial Referee 1', 'Financial Referee 2', 'Financial Referee 3',
  'Forced Labour', 'Forced Labour details', 'Fourth Party Due Diligence',
  'Freedom interference', 'Freedom to move', 'Freedom to move details', 'Gender',
  'Genetically Modified Materials Access Provider',
  'Genetically Modified Materials Access Provider Details',
  'Genetically Modified Materials Crossborder Transfer',
  'Genetically Modified Materials Crossborder Transfer Details',
  'Gifts and Hospitality', 'Government Contracts Debarment', 'Government Contracts Debarment Details',
  'Government Interaction', 'Government Interaction Details',
  'Green field production sites', 'Green field production sites details',
  'Handling of Genetically Modified Material', 'Handling of Genetically Modified Material Details',
  'Handling of Hazardous Chemicals Others', 'Handling of Hazardous Chemicals Others Under PIC',
  'Handling of Hazardous Chemicals Others Under PIC Details',
  'Handling of Hazardous Chemicals Ozone Layer', 'Handling of Hazardous Chemicals Ozone Layer Details',
  'Handling of Hazardous Waste',
  'Handling of Product Containing Hazardous Chemicals Ozone Layer',
  'Harmful Substances Transportation', 'Harmful Substances Transportation Details',
  'Harmful work', 'Harmful work by children',
  'Hazardous Chemicals Details', 'Hazardous Laws Compliance',
  'Hazardous Waste Exportation Details', 'Hazardous Waste Exportation Other Details',
  'Hazardous Waste Importation Details', 'Hazardous Waste Laws in Country of Operations',
  'Health and safety compliance', 'Health and safety compliance details',
  'Health and safety incidents', 'Health and safety incidents details',
  'Health and safety KPIs', 'Health and safety risk assessment',
  'Health and safety risk assessment frequency', 'Health exposure',
  'Housing', 'Housing details',
  'Human Rights Incidents', 'Human Rights Incidents Details',
  'Human Rights Risk Level', 'Human Rights Risk Score',
  'Human Rights Violations', 'Human Rights Violations Details',
  'Human Rights Violations Prevention', 'Human Rights Violations Prevention Other',
  'Human Rights Violations Value Chain Prevention',
  'Human Rights Violations Value Chain Prevention Other',
  'Illegal Activity', 'Illegal Activity Details',
  'Immigrant workers', 'Immigrant workers details',
  'Importation of Hazardous Waste', 'InActive Date',
  'Instances of Trafficking', 'Instances of Trafficking Details',
  'Internal investigations responsibles', 'Internal investigations responsibles other',
  'Internal Reference or ID',
  'Key health and safety risks', 'Key Products', 'Key Products Other Details',
  'Local mercury laws', 'Mandatory schooling', 'Mandatory schooling details',
  'MARPOL Compliance', 'Maximum working hours',
  'Mercury disposal', 'Mercury in chlorine alkaline method', 'Mercury law compliance',
  'Mercury presence', 'Mercury presence details', 'Mercury usage', 'Mercury waste',
  'Minimization Adverse Impacts on Wetlands', 'Minimization Adverse Impacts on World Heritage',
  'Minimum age engagement', 'Minimum age engagement details',
  'Minimum Wage Compliance', 'Minimum Wage Laws',
  'Modern Slavery Policy Applies To', 'Monitoring Last Update',
  'National regulations on POPs', 'Negative impact in value chain',
  'Negative impact in value chain details', 'No association freedom',
  'No association freedom details', 'No basic facilities', 'No basic facilities details',
  'No Slavery or Human Trafficking Policy',
  'Non Discrimination', 'Non Discrimination Laws', 'Non retaliation',
  'Non-Discrimination Compliance',
  'Noxious Liquid Substances Transportation', 'Noxious Liquid Substances Transportation Details',
  'OHS issues in value chain', 'OHS issues in value chain details',
  'Order Volume to Total Purchase Volume', 'Other Red Flag(s)', 'Other Red Flag(s) Details',
  'Ozone Hazards Annex D Detail', 'Passport custody', 'Passport custody details',
  'Payment Method', 'Person Business Address', 'Person Country of Residence',
  'Person ID Type', 'Person ID Value',
  'Person Industry Sector - onboarding', 'Person Industry Sector Other Details',
  'Person Industry Sector Unknown Details', 'Person Operating as Entity',
  'Person Operating as Entity Company Number', 'Person Operating as Entity Legal Name',
  'Person Operating as Entity Registered Address', 'Person Operating as Entity Registered Country',
  'Person Other Known Name or Alias', 'Person Third Party Legal Name', 'Person Year of Birth',
  'Police arrest circumstances', 'Politically Exposed Person', 'Politically Exposed Persons Details',
  'POPs compliance', 'POPs disposal', 'POPs products supplied', 'POPs products supplied details',
  'POPs used', 'POPs used details', 'POPs waste',
  'Potential Conflicts of Interest', 'Potential Conflicts of Interest Details',
  'Potential Environmental Risk', 'Potential Environmental Risk Details',
  'Potential Environmental Risk Details Other', 'Potential Environmental Risk Explanation',
  'Potential Human Rights Risk', 'Potential Human Rights Risk Details',
  'Potential Human Rights Risk Details Other', 'Potential Human Rights Risk Explanation',
  'Privacy training', 'Privacy training other', 'Private investigators',
  'Private investigators details',
  'Products Containing Hazardous Chemicals Ozone Layer Compliance Laws',
  'Products containing POPs', 'Products containing POPs details',
  'Products produced with chlorine alkaline method',
  'Protective environmental measures', 'Protective environmental measures details',
  'Protective equipment', 'Publicly listed company', 'Purge Date',
  'Raw Material Share Percentage', 'Raw Material Share Significant',
  'Reasonable Living Standard', 'Recommended by customer or individual',
  'Recommended by customer or individual Details',
  'References 1', 'References 2', 'References 3', 'References 4',
  'Relevant Client Unit Other Details', 'Relevant Experience', 'Religious breaks',
  'Relocation of inhabitants', 'Relocation of inhabitants details',
  'Responsible Client Unit', 'Rest period',
  'Sector Industry - Bribery and Corruption', 'Sector Industry - Human Rights',
  'Sector Industry - Other', 'Security forces control', 'Security forces control details',
  'Security forces protection', 'Security issues', 'Security issues details',
  'Service Type ESG - Bribery and Corruption', 'Service Type ESG - Human Rights',
  'Shared Internal Reference Confirmation', 'Shareholder legal structure',
  'Shareholders', 'Shareholding company',
  'Ship Transportation in Business Operations', 'Ship Transportation in Business Operations Details',
  'Slavery Practice', 'Slavery Practice details', 'Slavery Practice Value Chain',
  'Staff Age', 'Staff housing', 'Staff housing description', 'Staff housing requirements',
  'Staff minorities religions', 'Staff minorities religions protections',
  'Staff minorities religions protections details', 'Staff religions',
  'Stock Market Details', 'Strikes', 'Subcontractor legal structure',
  'Subsidiaries', 'Subsidiaries or parent company',
  'Third Party Code of Conduct', 'Third Party Contact Email Address',
  'Third Party Contact First Name', 'Third Party Contact Name', 'Third Party Contact Surname',
  'Third Party Contract Description', 'Third Party Contract Name',
  'Third Party Country of Operation', 'Third Party Country of Operation - EDD',
  'Third Party Country of Sourcing', 'Third Party Country of Sourcing - EDD',
  'Third Party Email Address', 'Third Party Expiry Date',
  'Third Party Interaction with Public Officials',
  'Third Party Interaction with Public Officials Details',
  'Third Party Legal Structure', 'Third Party Product Type', 'Third Party Service Type Other',
  'Torture events', 'Torture events details', 'Total Number of Employees',
  'Trade Licence or Commercial Licence', 'Trade Licence or Commercial Licence Number',
  'Trade of Endangered Species Awareness', 'Trade of Endangered Species Awareness Details',
  'Trade unions', 'Trade unions percentage',
  'Trafficking Risk Explanation Steps Details', 'Trafficking Risk Explanation Steps List2',
  'UnDeleted Date', 'Unknown ID Types', 'Unknown ID Value',
  'Unknown Industry Sector - onboarding', 'Unknown Industry Sector Other Details',
  'Unknown Industry Sector Unknown Details', 'Unknown Other Known Name or Alias',
  'Unknown Registered Address', 'Unknown Registered Country',
  'Unknown Third Party Legal Name', 'Unknown Third Party Type',
  'Unknown Third Party Type Other details',
  'Unlawful arrests', 'Unlawful arrests details',
  'Unlawful eviction awareness', 'Unlawful eviction awareness details',
  'Usage Awareness of Hazardous Chemicals Others Under PIC in Value Chain',
  'Usage Awareness of Hazardous Chemicals Others Under PIC in Value Chain Details',
  'VAT Registration or Tax Code', 'VAT Registration or Tax Code Value',
  'Vulnerable Groups Impacted', 'Wage Levels Details', 'Wage to Average Income',
  'Wages Below Minimum', 'Wages Below Minimum Details',
  'Wetlands Interference Awareness', 'Wetlands Interference Awareness Yes Details',
  'Work Force Diversity Details', 'Workplace sanitation',
  'World Bank Contracts Debarment', 'World Bank Contracts Debarment Details',
  'World Heritage Interference Awareness', 'World Heritage Interference Awareness Yes Details',
];

const ALL_FIELDS = [
  { value: '', label: '—' },
  ...FIELD_LABELS.map(label => ({ value: slugify(label), label })),
];

function fieldByValue(value) {
  return ALL_FIELDS.find(f => f.value === value) || null;
}

function fieldLabel(value) {
  const f = fieldByValue(value);
  return f && f.value ? f.label : '';
}

/* ── Initial slot definitions ── */
const INITIAL_ENTITY_OVERVIEW = [
  { value: slugify('Entity Third Party Legal Name'),                  readonly: false },
  { value: slugify('Entity Industry Sector - onboarding'),           readonly: false },
  { value: slugify('Third Party Owner'),                             readonly: true  },
  { value: slugify('Process Name'),                                  readonly: true  },
  { value: slugify('Entity Registered Country'),                     readonly: false },
  { value: slugify('Third Party Contact Email Address'),             readonly: false },
  { value: slugify('Business Unit'),                                 readonly: true  },
  { value: slugify('Screening & Monitoring Policy'),                 readonly: true  },
  { value: slugify('Third Party Legal Structure'),                   readonly: false },
  { value: slugify('Commercial Significance of Product or Service'), readonly: false },
  { value: slugify('Third Party Expiry Date'),                       readonly: false },
  { value: slugify('Tags'),                                          readonly: true  },
];

const INITIAL_ENTITY_ADDITIONAL = [
  { value: slugify('Entity Other Known Name or Alias'), readonly: false },
  { value: slugify('Entity Registered Address'),        readonly: false },
  { value: slugify('Entity ID Type'),                   readonly: false },
  { value: slugify('Entity ID Value'),                  readonly: false },
  { value: slugify('Responsible Client Unit'),          readonly: true  },
  { value: slugify('Entity Website'),                   readonly: false },
  { value: slugify('Entity Company Number'),            readonly: false },
  { value: slugify('Internal Reference or ID'),         readonly: true  },
  { value: slugify('All Relevant Client Units'),        readonly: true  },
  { value: '', readonly: false },
  { value: '', readonly: false },
  { value: '', readonly: false },
  { value: '', readonly: false },
  { value: '', readonly: false },
  { value: '', readonly: false },
  { value: '', readonly: false },
];

const INITIAL_PERSON_OVERVIEW = [
  { value: slugify('Person Third Party Legal Name'),                  readonly: false },
  { value: slugify('Person Industry Sector - onboarding'),           readonly: false },
  { value: slugify('Third Party Owner'),                             readonly: true  },
  { value: slugify('Process Name'),                                  readonly: true  },
  { value: slugify('Person Country of Residence'),                   readonly: false },
  { value: slugify('Third Party Contact Email Address'),             readonly: false },
  { value: slugify('Business Unit'),                                 readonly: true  },
  { value: slugify('Screening & Monitoring Policy'),                 readonly: true  },
  { value: slugify('Third Party Legal Structure'),                   readonly: false },
  { value: slugify('Commercial Significance of Product or Service'), readonly: false },
  { value: slugify('Third Party Expiry Date'),                       readonly: false },
  { value: slugify('Tags'),                                          readonly: true  },
];

const INITIAL_PERSON_ADDITIONAL = [
  { value: slugify('Person Other Known Name or Alias'), readonly: false },
  { value: slugify('Person Business Address'),          readonly: false },
  { value: slugify('Person ID Type'),                   readonly: false },
  { value: slugify('Person ID Value'),                  readonly: false },
  { value: slugify('Responsible Client Unit'),          readonly: true  },
  { value: slugify('Person Year of Birth'),             readonly: false },
  { value: slugify('Gender'),                           readonly: false },
  { value: slugify('Internal Reference or ID'),         readonly: true  },
  { value: slugify('All Relevant Client Units'),        readonly: true  },
  { value: '', readonly: false },
  { value: '', readonly: false },
  { value: '', readonly: false },
  { value: '', readonly: false },
  { value: '', readonly: false },
  { value: '', readonly: false },
  { value: '', readonly: false },
];

const INITIAL_UNKNOWN_OVERVIEW = [
  { value: slugify('Unknown Third Party Legal Name'),                 readonly: false },
  { value: slugify('Unknown Industry Sector - onboarding'),          readonly: false },
  { value: slugify('Third Party Owner'),                             readonly: true  },
  { value: slugify('Process Name'),                                  readonly: true  },
  { value: slugify('Unknown Registered Country'),                    readonly: false },
  { value: slugify('Third Party Contact Email Address'),             readonly: false },
  { value: slugify('Business Unit'),                                 readonly: true  },
  { value: slugify('Screening & Monitoring Policy'),                 readonly: true  },
  { value: slugify('Third Party Legal Structure'),                   readonly: false },
  { value: slugify('Commercial Significance of Product or Service'), readonly: false },
  { value: slugify('Third Party Expiry Date'),                       readonly: false },
  { value: slugify('Tags'),                                          readonly: true  },
];

const INITIAL_UNKNOWN_ADDITIONAL = [
  { value: slugify('Unknown Other Known Name or Alias'),         readonly: false },
  { value: slugify('Unknown Registered Address'),                readonly: false },
  { value: slugify('Unknown ID Types'),                          readonly: false },
  { value: slugify('Unknown ID Value'),                          readonly: false },
  { value: slugify('Responsible Client Unit'),                   readonly: true  },
  { value: slugify('Unknown Third Party Type'),                  readonly: false },
  { value: slugify('Unknown Third Party Type Other details'),    readonly: false },
  { value: slugify('Internal Reference or ID'),                  readonly: true  },
  { value: slugify('All Relevant Client Units'),                 readonly: true  },
  { value: '', readonly: false },
  { value: '', readonly: false },
  { value: '', readonly: false },
  { value: '', readonly: false },
  { value: '', readonly: false },
  { value: '', readonly: false },
  { value: '', readonly: false },
];

const INITIAL_TAB_SLOTS = {
  entity:  { overview: INITIAL_ENTITY_OVERVIEW,  additional: INITIAL_ENTITY_ADDITIONAL  },
  person:  { overview: INITIAL_PERSON_OVERVIEW,  additional: INITIAL_PERSON_ADDITIONAL  },
  unknown: { overview: INITIAL_UNKNOWN_OVERVIEW, additional: INITIAL_UNKNOWN_ADDITIONAL },
};

const DETAIL_TABS = [
  { key: 'entity',  label: 'Entity'  },
  { key: 'person',  label: 'Person'  },
  { key: 'unknown', label: 'Unknown'               },
];

/* ── Connections section (static, from the page concept) ── */
/* ── Left admin nav items ── */
const ADMIN_NAV_ITEMS = [
  'Summary',
  'Tags',
  'Properties',
  'Third Party Details',
  'Roles',
  'Groups',
  'Business Units',
  'SSO Authentication',
  'Questionnaire Builder',
];

/* ══════════════════════════════════════════════════════
   SlotCell — a single dropdown slot
══════════════════════════════════════════════════════ */
function SlotCell({ slotNumber, value, readonly, isEditing, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const displayValue = fieldLabel(value);

  const filteredFields = query
    ? ALL_FIELDS.filter(f => f.label.toLowerCase().includes(query.toLowerCase()))
    : ALL_FIELDS;

  function openDropdown() {
    if (!isEditing || readonly) return;
    setQuery('');
    setOpen(true);
    setTimeout(() => inputRef.current && inputRef.current.select(), 0);
  }

  function closeDropdown() {
    setOpen(false);
    setQuery('');
  }

  function commitValue(newValue) {
    onChange(newValue);
    closeDropdown();
  }

  function handleInputChange(e) {
    setQuery(e.target.value);
    setOpen(true);
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      closeDropdown();
      inputRef.current && inputRef.current.blur();
    } else if (e.key === 'Enter') {
      const first = filteredFields[0];
      if (first) commitValue(first.value);
      inputRef.current && inputRef.current.blur();
    }
  }

  function handleBlur() {
    // Delay to allow mousedown on items to fire first
    setTimeout(() => closeDropdown(), 150);
  }

  function handleCaretMouseDown(e) {
    e.preventDefault();
    if (open) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  const inputDisplayValue = open ? query : displayValue;

  return (
    <div className={`${styles.slotCell}${readonly ? ' ' + styles.slotReadonly : ''}`}>
      {isEditing && (
        <div className={`${styles.slotOptionLabel}${readonly ? ' ' + styles.slotOptionLabelReadonly : ''}`}>
          Option {slotNumber}
        </div>
      )}
      <div className={styles.inputWrap}>
        <input
          ref={inputRef}
          type="text"
          className={`${styles.comboInput}${isEditing && !readonly ? ' ' + styles.comboInputEditing : ''}`}
          value={inputDisplayValue}
          placeholder="—"
          readOnly={!isEditing || readonly}
          onChange={handleInputChange}
          onFocus={openDropdown}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
        />
        {isEditing && !readonly && (
          <span
            className={`material-icons-outlined ${styles.inputCaret}`}
            onMouseDown={handleCaretMouseDown}
          >
            expand_more
          </span>
        )}
        {open && (
          <div ref={panelRef} className={styles.dropdownPanel}>
            {filteredFields.length === 0 ? (
              <div className={styles.dropdownNoResults}>No results found</div>
            ) : (
              filteredFields.map(field => (
                <div
                  key={field.value || '__empty__'}
                  className={`${styles.dropdownItem}${field.value === value ? ' ' + styles.dropdownItemSelected : ''}${!field.value ? ' ' + styles.dropdownItemEmpty : ''}`}
                  onMouseDown={e => { e.preventDefault(); commitValue(field.value); }}
                >
                  {field.label}
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {isEditing && readonly && (
        <div className={styles.slotHelperText}>
          This field cannot be modified as it is a system default property.
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SlotGrid — renders a grid of SlotCells
══════════════════════════════════════════════════════ */
function SlotGrid({ slots, isEditing, onChange }) {
  return (
    <div className={styles.slotGrid}>
      {slots.map((slot, i) => (
        <SlotCell
          key={i}
          slotNumber={i + 1}
          value={slot.value}
          readonly={slot.readonly}
          isEditing={isEditing}
          onChange={newVal => onChange(i, newVal)}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   Main page component
══════════════════════════════════════════════════════ */
export default function CompanyAdmin() {
  const [activeNav, setActiveNav] = useState('Third Party Details');
  const [activeDetailsTab, setActiveDetailsTab] = useState('entity');
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const alertTimerRef = useRef(null);

  /* slot state — working copies + committed originals, keyed by tab */
  const [tabSlots, setTabSlots] = useState(INITIAL_TAB_SLOTS);
  const [origTabSlots, setOrigTabSlots] = useState(INITIAL_TAB_SLOTS);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleCancel() {
    setIsEditing(false);
    setTabSlots(prev => ({ ...prev, [activeDetailsTab]: origTabSlots[activeDetailsTab] }));
  }

  function handleSave() {
    setIsEditing(false);
    setOrigTabSlots(prev => ({ ...prev, [activeDetailsTab]: tabSlots[activeDetailsTab] }));
    setShowAlert(true);
    clearTimeout(alertTimerRef.current);
    alertTimerRef.current = setTimeout(() => setShowAlert(false), 5000);
  }

  function updateTabSlot(section, index, newValue) {
    setTabSlots(prev => ({
      ...prev,
      [activeDetailsTab]: {
        ...prev[activeDetailsTab],
        [section]: prev[activeDetailsTab][section].map((s, i) => i === index ? { ...s, value: newValue } : s),
      },
    }));
  }

  function handleTabChange(tabKey) {
    if (isEditing) handleCancel();
    setActiveDetailsTab(tabKey);
  }

  useEffect(() => {
    return () => clearTimeout(alertTimerRef.current);
  }, []);

  return (
    <PageLayout>
      {/* Success alert toast */}
      {showAlert && (
        <div className={`${styles.pageAlert} ${styles.pageAlertSuccess}`}>
          <span className={`material-icons-outlined ${styles.pageAlertIcon}`}>check_circle</span>
          <span className={styles.pageAlertText}>Third Party Details configuration saved successfully.</span>
        </div>
      )}

      <Breadcrumb
        items={[
          { label: 'Company Admin', to: '/company-admin' },
          { label: 'Third Party Details' },
        ]}
      />

      {/* Page header card */}
      <div className={styles.pageHeaderCard}>
        <span className={styles.pageHeaderTitle}>Company Admin</span>
        <span className={`material-icons-outlined ${styles.pageHeaderInfo}`}>info</span>
      </div>

      <div className={styles.sectionGap} />

      {/* Two-column admin layout */}
      <div className={styles.adminLayout}>

        {/* Left sidebar nav */}
        <nav className={styles.adminNav}>
          {ADMIN_NAV_ITEMS.map(item => (
            <button
              key={item}
              className={`${styles.adminNavItem}${activeNav === item ? ' ' + styles.adminNavItemActive : ''}`}
              onClick={() => setActiveNav(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Right content card */}
        <div className={styles.adminContent}>

          {/* Content header */}
          <div className={styles.contentHeader}>
            <div className={styles.contentTitle}>Third Party Details</div>
            <div className={styles.contentActions}>
              {!isEditing && (
                <button className={`${styles.btn} ${styles.btnFilled}`} onClick={handleEdit}>
                  Edit
                </button>
              )}
              {isEditing && (
                <>
                  <button className={`${styles.btn} ${styles.btnOutline}`} onClick={handleCancel}>
                    Cancel
                  </button>
                  <button className={`${styles.btn} ${styles.btnFilled}`} onClick={handleSave}>
                    Save
                  </button>
                </>
              )}
            </div>
          </div>

          <div className={styles.contentDivider} />

          {/* Detail type tabs */}
          <div className={styles.detailTabs}>
            {DETAIL_TABS.map(tab => (
              <button
                key={tab.key}
                className={`${styles.detailTab}${activeDetailsTab === tab.key ? ' ' + styles.detailTabActive : ''}`}
                onClick={() => handleTabChange(tab.key)}
                style={{ position: 'relative' }}
              >
                {tab.label}
                {activeDetailsTab === tab.key && (
                  <motion.div
                    layoutId="ca-tab-indicator"
                    className={styles.detailTabIndicator}
                    transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className={styles.contentDivider} />

          {/* Overview section */}
          <div className={styles.contentSection}>
            <div className={styles.sectionHeading}>Overview</div>
            <div className={styles.sectionDesc}>
              Select which fields appear in each position of the Overview tab on the Third Party summary page.
            </div>
            <SlotGrid
              slots={tabSlots[activeDetailsTab].overview}
              isEditing={isEditing}
              onChange={(i, v) => updateTabSlot('overview', i, v)}
            />
          </div>

          <div className={styles.sectionGapInner} />
          <div className={styles.contentDivider} />

          {/* Additional Details section */}
          <div className={`${styles.contentSection} ${styles.contentSectionBottom}`}>
            <div className={styles.sectionHeading}>Additional Details</div>
            <div className={styles.sectionDesc}>
              Select which fields appear in each position of the Additional Details tab on the Third Party summary page.
            </div>
            <SlotGrid
              slots={tabSlots[activeDetailsTab].additional}
              isEditing={isEditing}
              onChange={(i, v) => updateTabSlot('additional', i, v)}
            />
          </div>


        </div>
      </div>

      <div className={styles.sectionGap} />
    </PageLayout>
  );
}
