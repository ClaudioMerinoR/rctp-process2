export default {
  id: 'gringotts',
  name: 'GRINGOTTS WIZARDING BANK',
  shortName: 'Gringotts',
  entityType: 'entity',
  verifiedText: 'Entity Verified',
  currentStatus: { label: 'Approved! (Renewal Required)', tooltip: 'Risk Level increase on approved profile.' },
  riskLevel: { label: 'Medium', icon: 'error_outline', level: 'medium' },

  embedded: false,
  deleteModal: false,
  alertBanners: false,

  sidebarSteps: [
    { label: 'Risk Assessment',               dot: 'red',  path: 'risk-assessment' },
    { label: 'Due Diligence',                 dot: 'red',  path: 'due-diligence' },
    { label: 'Integrity Check',               dot: 'grey', partner: 'integrity', tooltip: 'Powered by Xapiens', path: 'integrity-check' },
    { label: 'Enhanced Due Diligence Reports',dot: 'grey', path: 'enhanced-due-diligence' },
    { label: 'UBO',                           dot: 'red',  partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet', path: 'ubo' },
    { label: 'Risk Mitigation',               dot: 'red',  path: 'risk-mitigation' },
    { label: 'Approval',                      dot: 'red',  path: 'approval' },
    { label: 'Screening & Monitoring',        dot: 'red',  path: 'screening-monitoring' },
  ],
  sidebarSections: [
    { label: 'Properties',           path: 'properties' },
    { label: 'Documents',            path: 'documents' },
    { label: 'Entity Verification',  partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet', path: 'entity-verification' },
    { label: 'Audit',                path: 'audit' },
  ],

  overviewFields: [
    { label: 'Entity Third Party Legal Name',              value: 'Gringotts Wizarding Bank' },
    { label: 'Entity Industry Sector - onboarding',        value: 'Financial Services — Wizarding Banking & Vault Management' },
    { label: 'Third Party Owner',                          value: 'Claudio Merino' },
    { label: 'Process Name',                               value: 'Standard RCTP' },
    { label: 'Entity Registered Country',                  value: 'United Kingdom', flag: '🇬🇧' },
    { label: 'Third Party Contact Email Address',          value: 'griphook@gringotts.wiz' },
    { label: 'Business Unit',                              value: 'EMEA' },
    { label: 'Screening & Monitoring Policy',              value: 'Default Standard KYBP Policy' },
    { label: 'Third Party Legal Structure',                value: 'Entity' },
    { label: 'Commercial Significance of Product or Service', value: '[Between 5 and 10%] / Critical / Top 5' },
    { label: 'Third Party Renewal Date',                   value: '31 Jul 2026' },
    { label: 'Tags',                                       value: 'Banking, Wizarding, EMEA' },
  ],

  additionalFields: [
    { label: 'Entity Other Known Name or Alias',  value: 'Gringotts Bank, The Only Wizarding Bank' },
    { label: 'Responsible Client Unit',           value: 'Treasury & Financial Operations' },
    { label: 'Entity Company Number',             value: 'GB-WIZ-0001' },
    { label: 'Entity ID Type',                    value: 'DUNS Number' },
    { label: 'Entity Registered Address',         value: 'Gringotts Bank, Diagon Alley, London, WC2H 0AH' },
    { label: 'All Relevant Client Units',         value: 'Treasury, Procurement, Legal' },
    { label: 'Internal Reference or ID',          value: 'INT-GRG-001' },
    { label: 'Entity ID Value',                   value: '112233445' },
    { label: 'Entity Website',                    value: 'www.gringotts.wiz', link: true },
  ],

  riskCards: [
    { title: 'Country',                  level: 'low',    flags: 0, score: 1 },
    { title: 'Bribery & Corruption',     level: 'low',    flags: 0, score: 2 },
    { title: 'Environmental',            level: 'low',    flags: 0, score: 0 },
    { title: 'Human Rights',             level: 'low',    flags: 0, score: 0 },
    { title: 'General',                  level: 'low',    flags: 0, score: 3 },
    { title: 'Screening & Monitoring',   level: 'low',    flags: 0, score: 1 },
    { title: 'Cyber',                    level: 'low',    flags: 0, score: 2 },
  ],

  openTasks: [],

  screeningRows: [
    {
      name: 'Gringotts Wizarding Bank',
      matches: [
        { bg: 'var(--success-500)', color: 'var(--text-normal)', val: '1' },
        { bg: 'var(--success-500)', color: 'var(--text-normal)', val: '0' },
        { bg: 'var(--text-light)',  color: '#fff',                val: '0' },
        { bg: 'var(--neutral-200)', color: 'var(--text-normal)', val: '0' },
        { bg: 'var(--success-500)', color: 'var(--text-normal)', val: '0' },
      ],
      updated: '01 May 2026',
      type: 'Primary Entity',
      statusDot: 'var(--success-500)',
      statusLabel: 'Clear',
      categories: [],
      categoryIcon: 'check_circle',
      entityType: 'Entity',
    },
  ],

  connectedRows: [
    { name: 'Gringotts Wizarding Bank', connType: 'Primary Entity', idType: 'DUNS Number', idValue: '112233445', intRef: 'INT-GRG-001', country: 'United Kingdom' },
  ],

  suggestedRows: [
    { name: 'Ollivanders Wand Shop',     connType: 'Business Partner', idType: 'DUNS Number', idValue: '223344556', intRef: 'OLV-001', country: 'United Kingdom' },
    { name: 'Borgin and Burkes',         connType: 'Adjacent Entity',  idType: 'DUNS Number', idValue: '334455667', intRef: 'BNB-001', country: 'United Kingdom' },
    { name: 'Madam Malkin\'s Robes',     connType: 'Supplier',         idType: 'DUNS Number', idValue: '445566778', intRef: 'MMR-001', country: 'United Kingdom' },
  ],
  suggestedHasConnType: true,

  documents: [
    { name: 'Gringotts-Certificate-of-Incorporation', type: 'PDF', size: '1.1 MB', section: 'Onboarding',        date: '12 Jan 2024', owner: 'Minerva McGonagall' },
    { name: 'Gringotts-Anti-Bribery-Policy',          type: 'PDF', size: '640 KB', section: 'Risk Assessment',   date: '15 Jan 2024', owner: 'Filius Flitwick' },
    { name: 'Gringotts-Due-Diligence-Report',         type: 'PDF', size: '2.0 MB', section: 'Due Diligence',     date: '20 Jan 2024', owner: 'Pomona Sprout' },
    { name: 'Gringotts-Approval-Sign-Off',            type: 'PDF', size: '480 KB', section: 'Approval',          date: '01 Feb 2024', owner: 'Albus Dumbledore' },
  ],

  riskReport: {
    currentScore: 9,
    accordionSections: [
      {
        id: 'country', label: 'Country Risk Level', level: 'low',
        rows: [{ property: 'Country of Registration', value: 'United Kingdom', score: 1 }],
        totalScore: 1,
      },
      {
        id: 'bribery', label: 'Bribery & Corruption Risk Level', level: 'low',
        rows: [
          { property: 'Anti-Bribery Policy', value: 'Fully Implemented', score: 1 },
          { property: 'Historical Vault Break-In — 1991', value: 'Resolved, No Ongoing Liability', score: 1 },
        ],
        totalScore: 2,
      },
      { id: 'environmental', label: 'Environmental Risk Level', level: 'low', rows: [], totalScore: 0 },
      { id: 'human-rights',  label: 'Human Right Risk Level',   level: 'low', rows: [], totalScore: 0 },
      {
        id: 'general', label: 'General Risk Level', level: 'low',
        rows: [
          { property: 'Third Party Service Type',         value: 'Financial Institution',           score: 2 },
          { property: 'Goblin-Operated Entity',           value: 'Non-Standard Governance Model',   score: 1 },
        ],
        totalScore: 3,
      },
      {
        id: 'screening', label: 'Screening & Monitoring Risk Level', level: 'low',
        rows: [{ property: 'Adverse Media Matches', value: '1 Historical Match — Resolved', score: 1 }],
        totalScore: 1,
      },
      {
        id: 'cyber', label: 'Cyber Risk Level', level: 'low',
        rows: [
          { property: 'Dragon-Guarded Vault Security Protocol', value: 'Assessed — Compliant', score: 1 },
          { property: 'Data Privacy Compliance',                value: 'Fully Compliant',      score: 1 },
        ],
        totalScore: 2,
      },
    ],
    matchResults: [
      { count: 1, bg: '#13DF81', color: 'var(--text-normal)', label: 'Open (Pending Review)' },
      { count: 0, bg: '#F0C043', color: 'var(--text-normal)', label: 'Open (Investigation Under Review)' },
      { count: 0, bg: '#016F91', color: '#fff',               label: 'Permanently Clear (Without Updates)' },
      { count: 0, bg: '#9A3438', color: '#fff',               label: 'Confirmed (Matches)' },
      { count: 0, bg: '#E34C53', color: '#fff',               label: 'Open (Pending Review)' },
    ],
    screeningResults: [
      { name: 'Griphook',          type: 'Chief Executive Goblin', level: 'low',    redFlags: '',    categories: [] },
      { name: 'Bogrod',            type: 'Senior Vault Manager',   level: 'low',    redFlags: '',    categories: [] },
      { name: 'Gornuk',            type: 'Director',               level: 'low',    redFlags: '',    categories: [] },
    ],
    redFlags: [],
    processSummary: [
      { step: 'Onboarding',               isLink: true,  status: 'Completed',    startDate: '12 Jan 2024', by: 'Minerva McGonagall', date: '14 Jan 2024' },
      { step: 'Risk Assessment',          isLink: true,  status: 'Completed',    startDate: '15 Jan 2024', by: 'Filius Flitwick',    date: '17 Jan 2024' },
      { step: 'Internal Due Diligence',   isLink: true,  status: 'Completed',    startDate: '18 Jan 2024', by: 'Pomona Sprout',      date: '20 Jan 2024' },
      { step: 'External Due Diligence',   isLink: true,  status: 'Completed',    startDate: '20 Jan 2024', by: 'Pomona Sprout',      date: '22 Jan 2024' },
      { step: 'Enhanced Due Diligence Report', isLink: true, status: 'Not Required', startDate: '', by: '', date: '' },
      { step: 'UBO',                      isLink: false, status: 'Completed',    startDate: '23 Jan 2024', by: 'Filius Flitwick',    date: '25 Jan 2024' },
      { step: 'Risk Mitigation',          isLink: true,  status: 'Completed',    startDate: '26 Jan 2024', by: 'Minerva McGonagall', date: '28 Jan 2024' },
      { step: 'Approval',                 isLink: true,  status: 'Completed',    startDate: '29 Jan 2024', by: 'Albus Dumbledore',   date: '01 Feb 2024' },
      { step: 'Screening and Monitoring', isLink: true,  status: 'Completed',    startDate: '01 Feb 2024', by: 'Minerva McGonagall', date: '01 Feb 2024' },
    ],
  },

  riskMitigation: {
    openRisks: [],
    mitigatedRisks: [
      { id: 'RM-001', title: 'Vault Break-In Reputational Risk — 1991 Incident', status: 'Mitigated', owner: 'Filius Flitwick', date: '20 Jan 2024' },
    ],
    cancelledRisks: [],
  },

  approval: {
    startDate: '29 Jan 2024',
    completedDate: '01 Feb 2024',
    cancelledDate: '',
    renewalDate: '31 Jul 2026',
  },
};
