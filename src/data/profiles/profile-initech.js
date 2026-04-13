export default {
  id: 'initech',
  name: 'Initech',
  shortName: 'Initech',
  entityType: 'entity',
  verifiedText: 'Entity Verified',
  currentStatus: { label: 'Active', icon: 'check_circle' },
  riskLevel: { label: 'Medium', icon: 'error_outline', level: 'medium' },

  embedded: false,
  deleteModal: true,
  alertBanners: true,

  sidebarSteps: [
    { label: 'Risk Assessment', dot: 'amber' },
    { label: 'Integrity Check', dot: 'green', partner: 'integrity' },
    { label: 'Due Diligence', dot: 'amber' },
    { label: 'Enhanced Due Diligence Reports', dot: 'grey' },
    { label: 'UBO', dot: 'green', partner: 'ubo' },
    { label: 'Risk Mitigation', dot: 'grey' },
    { label: 'Approval', dot: 'grey' },
    { label: 'Screening & Monitoring', dot: 'amber' },
  ],
  sidebarSections: [
    { label: 'Properties' },
    { label: 'Documents', isDocuments: true },
    { label: 'Entity Verification', partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet' },
    { label: 'Audit' },
  ],

  overviewFields: [
    { label: 'Entity Third Party Legal Name', value: 'Initech' },
    { label: 'Entity Industry Sector - onboarding', value: 'Technology' },
    { label: 'Third Party Owner', value: 'Claudio Merino' },
    { label: 'Process Name', value: 'Standard RCTP' },
    { label: 'Entity Registered Country', value: 'United States', flag: '\u{1F1FA}\u{1F1F8}' },
    { label: 'Third Party Contact Email Address', value: 'contact@initech.com' },
    { label: 'Business Unit', value: 'Americas' },
    { label: 'Screening & Monitoring Policy', value: 'Default Standard KYBP Policy' },
    { label: 'Third Party Legal Structure', value: 'Entity' },
    { label: 'Commercial Significance of Product or Service', value: '[Between 5 and 10%] / Significant / Not in top 10' },
    { label: 'Third Party Expiry Date', value: '31 Dec 2025' },
    { label: 'Tags', value: 'Technology' },
  ],

  additionalFields: [
    { label: 'Entity Other Known Name or Alias', value: '—' },
    { label: 'Responsible Client Unit', value: 'Procurement (Central, direct material)' },
    { label: 'Entity Company Number', value: 'US-98765432' },
    { label: 'Entity ID Type', value: 'DUNS Number' },
    { label: 'Entity Registered Address', value: '1033 US Hwy 46 Ste 201, Clifton, NJ 07013' },
    { label: 'All Relevant Client Units', value: 'Americas, Global Operations' },
    { label: 'Internal Reference or ID', value: 'INT-0042' },
    { label: 'Entity ID Value', value: '808241999' },
    { label: 'Entity Website', value: 'www.initech.com', link: true },
  ],

  riskCards: [
    { title: 'Country', level: 'low', flags: 0, score: 2 },
    { title: 'Bribery & Corruption', level: 'medium', flags: 1, score: 12 },
    { title: 'Environmental', level: 'low', flags: 0, score: 3 },
    { title: 'Human Rights', level: 'low', flags: 0, score: 2 },
    { title: 'General', level: 'medium', flags: 2, score: 14 },
    { title: 'Screening & Monitoring', level: 'medium', flags: 1, score: 10 },
    { title: 'Cyber', level: 'low', flags: 0, score: 4 },
  ],

  openTasks: [
    { type: 'Risk Assessment', icon: 'iconFactCheck', name: 'Annual Risk Assessment', status: 'In Progress', owner: 'Emily Forbes', dateCreated: '02 Jan 2025', age: '3 Months' },
    { type: 'Screening & Monitoring', icon: 'iconArmingCountdown', name: 'Screening Review – Q1', status: 'Pending', owner: 'Claudio Merino', dateCreated: '15 Jan 2025', age: '2 Months' },
  ],

  screeningRows: [
    {
      name: 'Initech',
      matches: [
        { bg: 'var(--warning-500)', color: 'var(--text-normal)', val: '3' },
        { bg: 'var(--success-500)', color: 'var(--text-normal)', val: '2' },
        { bg: 'var(--text-light)', color: '#fff', val: '1' },
        { bg: 'var(--neutral-200)', color: 'var(--text-normal)', val: '0' },
        { bg: 'var(--warning-300)', color: 'var(--text-normal)', val: '1' },
      ],
      updated: '10 Mar 2025',
      type: 'Primary Entity',
      statusDot: 'var(--warning-500)',
      statusLabel: 'Requires Review',
      categories: [
        { label: 'AM', bg: '#edd500', color: 'var(--neutral-900)' },
        { label: 'PEP', bg: 'var(--warning-100)', color: 'var(--warning-900)' },
      ],
      categoryIcon: 'error_outline',
      entityType: 'Entity',
    },
  ],

  connectedRows: [
    { name: 'Initech Holdings LLC', connType: 'Parent Company', idType: 'DUNS Number', idValue: '123456789', intRef: 'INT-0043', country: 'United States' },
  ],

  suggestedRows: [
    { name: 'Initech Solutions Ltd', connType: 'Subsidiary', idType: 'DUNS Number', idValue: '987654321', intRef: '', country: 'United Kingdom' },
  ],
  suggestedHasConnType: true,

  documents: [
    { name: 'Certificate-of-Incorporation', type: 'PDF', size: '0.9 MB', section: 'Onboarding', date: '05 Jan 2025', owner: 'Claudio Merino' },
    { name: 'Risk-Assessment-Q4-2024', type: 'PDF', size: '2.1 MB', section: 'Risk Assessment', date: '10 Jan 2025', owner: 'Emily Forbes' },
    { name: 'Bribery-Corruption-Policy', type: 'PDF', size: '1.4 MB', section: 'Due Diligence', date: '12 Jan 2025', owner: 'Compliance Group' },
  ],

  riskReport: {
    currentScore: 42,
    accordionSections: [
      { id: 'country', label: 'Country Risk Level', level: 'low', rows: [
        { property: 'Country of Registration', value: 'United States', score: 2 },
      ], totalScore: 2 },
      { id: 'bribery', label: 'Bribery & Corruption Risk Level', level: 'medium', rows: [
        { property: 'Government Interaction', value: 'Yes', score: 8 },
        { property: 'Anti-Bribery Policy', value: 'Partial', score: 4 },
      ], totalScore: 12 },
      { id: 'environmental', label: 'Environmental Risk Level', level: 'low', rows: [
        { property: 'Environmental Policies', value: 'Yes', score: 3 },
      ], totalScore: 3 },
      { id: 'human-rights', label: 'Human Right Risk Level', level: 'low', rows: [
        { property: 'Human Rights Policy', value: 'Yes', score: 2 },
      ], totalScore: 2 },
      { id: 'general', label: 'General Risk Level', level: 'medium', rows: [
        { property: 'Publicly Listed Company', value: 'No', score: 6 },
        { property: 'Contract Value Known', value: 'Yes – $250,000', score: 5 },
        { property: 'Commercial Significance', value: 'Between 5 and 10%', score: 3 },
      ], totalScore: 14 },
      { id: 'screening', label: 'Screening & Monitoring Risk Level', level: 'medium', rows: [
        { property: 'Adverse Media Match', value: '3 Potential Matches', score: 7 },
        { property: 'PEP Match', value: '1 Match', score: 3 },
      ], totalScore: 10 },
      { id: 'cyber', label: 'Cyber Risk Level', level: 'low', rows: [
        { property: 'Data Privacy Compliance', value: 'Compliant', score: 4 },
      ], totalScore: 4 },
    ],
    screeningResults: [
      { name: 'Initech', type: 'Primary Entity', level: 'medium', redFlags: 3 },
    ],
    redFlags: [
      { title: 'Adverse Media – Regulatory Action (2023)', status: 'Under Review', cat: 'Bribery & Corruption', isLink: true },
      { title: 'Politically Exposed Person – Indirect Link', status: 'Under Review', cat: 'Screening & Monitoring', isLink: false },
      { title: 'Contract Value Exceeds Threshold', status: 'Acknowledged', cat: 'General', isLink: false },
    ],
    processSummary: [
      { step: 'Risk Assessment', isLink: true, status: 'In Progress', by: 'Emily Forbes', date: '02 Jan 2025' },
      { step: 'Due Diligence', isLink: true, status: 'In Progress', by: 'Claudio Merino', date: '05 Jan 2025' },
      { step: 'Enhanced Due Diligence Report', isLink: true, status: 'Not Required', by: '', date: '' },
      { step: 'UBO Module', isLink: false, status: 'Completed', by: 'Compliance Group', date: '08 Jan 2025' },
      { step: 'Risk Mitigation Module', isLink: true, status: 'Not Started', by: '', date: '' },
      { step: 'Approval Module', isLink: true, status: 'Not Started', by: '', date: '' },
      { step: 'Screening and Monitoring Module', isLink: true, status: 'Pending', by: 'Claudio Merino', date: '15 Jan 2025' },
    ],
  },
};
