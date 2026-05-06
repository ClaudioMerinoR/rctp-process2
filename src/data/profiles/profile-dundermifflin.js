export default {
  id: 'dundermifflin',
  name: 'DUNDER MIFFLIN PAPER COMPANY, INC.',
  shortName: 'Dunder Mifflin',
  entityType: 'entity',
  verifiedText: 'Entity Verified',
  currentStatus: { label: 'Approved! (Renewal Required)' },
  riskLevel: { label: 'Medium', icon: 'info', level: 'medium' },

  embedded: false,
  deleteModal: true,
  alertBanners: false,

  sidebarSteps: [
    { label: 'Risk Assessment', dot: 'red', path: 'risk-assessment' },
    { label: 'Due Diligence', dot: 'red', path: 'due-diligence' },
    { label: 'Integrity Check', dot: 'grey', path: 'integrity-check' },
    { label: 'Enhanced Due Diligence Reports', dot: 'grey', path: 'enhanced-due-diligence' },
    { label: 'UBO', dot: 'red', path: 'ubo' },
    { label: 'Risk Mitigation', dot: 'green', path: 'risk-mitigation' },
    { label: 'Approval', dot: 'red', path: 'approval' },
    { label: 'Screening & Monitoring', dot: 'green', path: 'screening-monitoring' },
  ],
  sidebarSections: [
    { label: 'Properties', path: 'properties' },
    { label: 'Documents', path: 'documents' },
    { label: 'Entity Verification', partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet', path: 'entity-verification' },
    { label: 'Audit', path: 'audit' },
  ],

  overviewFields: [
    { label: 'Entity Third Party Legal Name', value: 'Dunder Mifflin Paper Company, Inc.' },
    { label: 'Entity Industry Sector - onboarding', value: 'Office Supplies & Paper Products' },
    { label: 'Third Party Owner', value: 'Tamara Knoetschke' },
    { label: 'Process Name', value: 'Standard RCTP' },
    { label: 'Entity Registered Country', value: 'United States', flag: '🇺🇸' },
    { label: 'Third Party Contact Email Address', value: 'angela@scranton.dundermifflin.com' },
    { label: 'Business Unit', value: 'Scranton Branch' },
    { label: 'Screening & Monitoring Policy', value: 'Default Standard KYBP Policy' },
    { label: 'Third Party Legal Structure', value: 'Entity' },
    { label: 'Commercial Significance of Product or Service', value: '[Between 5 and 10%] / Significant / Top 10' },
    { label: 'Third Party Renewal Date', value: '31 Dec 2025', overdue: true },
    { label: 'Tags', value: 'Paper, Regional' },
  ],

  additionalFields: [
    { label: 'Entity Other Known Name or Alias', value: 'Dunder Mifflin Scranton' },
    { label: 'Responsible Client Unit', value: 'Procurement (Regional Offices)' },
    { label: 'Entity Company Number', value: '11-0848164' },
    { label: 'Entity ID Type', value: 'DUNS Number' },
    { label: 'Entity Registered Address', value: '1725 Slough Avenue, Scranton, PA 18505' },
    { label: 'All Relevant Client Units', value: 'Scranton Branch, Utica Branch, Nashua Branch' },
    { label: 'Internal Reference or ID', value: 'DM-SCR-001' },
    { label: 'Entity ID Value', value: '078459823' },
    { label: 'Entity Website', value: 'www.dundermifflin.com', link: true, href: 'https://www.dundermifflin.com' },
  ],

  riskCards: [
    { title: 'Country', level: 'low', flags: 0, score: 0 },
    { title: 'Bribery & Corruption', level: 'medium', flags: 1, score: 4 },
    { title: 'Enviromental', level: 'low', flags: 0, score: 0 },
    { title: 'Human Rights', level: 'low', flags: 0, score: 0 },
    { title: 'General', level: 'medium', flags: 1, score: 5 },
    { title: 'Screening & Monitoring', level: 'low', flags: 0, score: 0 },
    { title: 'Cyber', level: 'low', flags: 0, score: 0 },
  ],

  openTasks: [
    { type: 'Questionnaire Incomplete', icon: 'iconInactiveOrder', name: 'Due Diligence', status: 'In Progress', owner: 'Dwight Schrute', dateCreated: '03 Jan 2026', age: '12 Days' },
    { type: 'Red Flag', icon: 'iconFlag', name: 'Potential Conflict of Interest — Ryan Howard', status: 'Open', owner: 'Compliance Group', dateCreated: '10 Jan 2026', age: '5 Days' },
  ],

  screeningRows: [
    {
      name: 'Dunder Mifflin Paper Company, Inc.',
      matches: [
        { bg: 'var(--success-500)', color: 'var(--text-normal)', val: '2' },
        { bg: 'var(--success-500)', color: 'var(--text-normal)', val: '0' },
        { bg: 'var(--text-light)', color: '#fff', val: '0' },
        { bg: 'var(--neutral-200)', color: 'var(--text-normal)', val: '0' },
        { bg: 'var(--neutral-200)', color: 'var(--text-normal)', val: '0' },
      ],
      updated: '10 Jan 2026',
      type: 'Primary Entity',
      statusDot: 'var(--warning-500)',
      statusLabel: 'Under Review',
      categories: [
        { label: 'PEP', bg: '#edd500', color: 'var(--neutral-900)' },
      ],
      categoryIcon: 'schedule',
      entityType: 'Entity',
    },
  ],

  connectedRows: [
    { name: 'Dunder Mifflin Utica', connType: 'Branch', idType: 'DUNS Number', idValue: '112334456', intRef: 'DM-UTC-002', country: 'United States' },
    { name: 'Dunder Mifflin Nashua', connType: 'Branch', idType: 'DUNS Number', idValue: '998871234', intRef: 'DM-NAS-003', country: 'United States' },
  ],

  suggestedRows: [
    { name: 'Staples, Inc.', connType: 'Competitor', idType: 'DUNS Number', idValue: '060705931', intRef: 'STP-001', country: 'United States' },
    { name: 'Michael Scott Paper Company', connType: 'Subsidiary', idType: 'DUNS Number', idValue: '345612900', intRef: 'MSPC-001', country: 'United States' },
    { name: 'Sabre Corporation', connType: 'Parent', idType: 'LEI', idValue: 'US0034512890', intRef: 'SABRE-001', country: 'United States' },
  ],
  suggestedHasConnType: true,

  documents: [
    { name: 'DunderMifflin-AnnualReport-2025', type: 'PDF', size: '3.4 MB', section: 'Due Diligence', date: '05 Jan 2026', owner: 'Dwight Schrute' },
    { name: 'PaperSupplyContract-2026', type: 'PDF', size: '1.2 MB', section: 'Onboarding', date: '03 Jan 2026', owner: 'Angela Martin' },
    { name: 'AntiCorruptionPolicy', type: 'PDF', size: '740 KB', section: 'Risk Assessment', date: '03 Jan 2026', owner: 'Compliance Group' },
    { name: 'InsuranceCertificate', type: 'PDF', size: '0.9 MB', section: 'Onboarding', date: '03 Jan 2026', owner: 'Toby Flenderson' },
  ],

  riskReport: {
    currentScore: 9,
    accordionSections: [
      { id: 'country', label: 'Country Risk Level', level: 'low', rows: [], totalScore: 0 },
      {
        id: 'bribery', label: 'Bribery & Corruption Risk Level', level: 'medium',
        rows: [{ property: 'Third party employees identified as Politically Exposed Persons', value: 'Yes', score: 4 }],
        totalScore: 4,
      },
      { id: 'environmental', label: 'Environmental Risk Level', level: 'low', rows: [], totalScore: 0 },
      { id: 'human-rights', label: 'Human Right Risk Level', level: 'low', rows: [], totalScore: 0 },
      {
        id: 'general', label: 'General Risk Level', level: 'medium',
        rows: [
          { property: 'Third Party Service Type', value: 'Supplier', score: 3 },
          { property: 'Third Party Country of Operation', value: 'United States', score: 2 },
        ],
        totalScore: 5,
      },
      { id: 'screening', label: 'Screening & Monitoring Risk Level', level: 'low', rows: [], totalScore: 0 },
      { id: 'cyber', label: 'Cyber Risk Level', level: 'low', rows: [], totalScore: 0 },
    ],
    matchResults: [
      { count: 2, bg: '#F0C043', color: 'var(--text-normal)', label: 'Open (Pending Review)' },
      { count: 0, bg: '#13DF81', color: 'var(--text-normal)', label: 'Open (Investigation Under Review)' },
      { count: 0, bg: '#016F91', color: '#fff', label: 'Permanently Clear (Without Updates)' },
      { count: 0, bg: '#9A3438', color: '#fff', label: 'Confirmed (Matches)' },
      { count: 0, bg: '#E34C53', color: '#fff', label: 'Open (Pending Review)' },
    ],
    screeningResults: [
      { name: 'Ryan Howard', type: 'Director', level: 'medium', redFlags: 'YES', categories: [{ type: 'brd', icon: 'person' }, { type: 'san', icon: 'person' }] },
      { name: 'Michael Scott', type: 'Director', level: 'low', redFlags: '', categories: [] },
    ],
    redFlags: [
      { title: 'Potential Conflict of Interest — Ryan Howard', isLink: true, status: 'Open', riskCategory: 'Bribery & Corruption', property: '' },
    ],
    processSummary: [
      { step: 'Onboarding', isLink: true, status: 'Completed', startDate: '3 Jan 2026', by: 'Pam Beesly', date: '3 Jan 2026' },
      { step: 'Risk Assessment', isLink: true, status: 'Completed', startDate: '3 Jan 2026', by: 'Dwight Schrute', date: '3 Jan 2026' },
      { step: 'Internal Due Diligence', isLink: true, status: 'In Progress', startDate: '5 Jan 2026', by: '', date: '' },
      { step: 'External Due Diligence', isLink: true, status: 'Not Started', startDate: '', by: '', date: '' },
      { step: 'Enhanced Due Diligence Report', isLink: true, status: 'Not Required', startDate: '', by: '', date: '' },
      { step: 'UBO', isLink: false, status: 'Not Started', startDate: '', by: '', date: '' },
      { step: 'Risk Mitigation', isLink: true, status: 'Not Started', startDate: '', by: '', date: '' },
      { step: 'Approval', isLink: true, status: 'Not Started', startDate: '', by: '', date: '' },
      { step: 'Screening and Monitoring', isLink: true, status: 'Not Started', startDate: '', by: '', date: '' },
    ],
  },
  riskMitigation: {
    openRisks: [],
    mitigatedRisks: [],
    cancelledRisks: [],
  },
  approval: {
    startDate: '',
    completedDate: '',
    cancelledDate: '',
    renewalDate: '',
  },
};
