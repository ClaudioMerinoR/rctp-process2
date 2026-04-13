export default {
  id: 'piedpiper',
  name: 'Pied Piper Inc',
  shortName: 'Pied Piper Inc',
  entityType: 'entity',
  verifiedText: 'Entity Verified',
  currentStatus: { label: 'Pending Approval', icon: 'pending' },
  riskLevel: { label: 'Low', icon: 'check_circle_outline', level: 'low' },

  embedded: true,
  deleteModal: false,
  alertBanners: false,

  sidebarSteps: [
    { label: 'Risk Assessment', dot: 'grey' },
    { label: 'Integrity Check', dot: 'grey', partner: 'integrity' },
    { label: 'Due Diligence', dot: 'grey' },
    { label: 'Enhanced Due Diligence Reports', dot: 'grey' },
    { label: 'UBO', dot: 'green', partner: 'ubo' },
    { label: 'Risk Mitigation', dot: 'grey' },
    { label: 'Approval', dot: 'grey' },
    { label: 'Screening & Monitoring', dot: 'grey' },
  ],
  sidebarSections: [
    { label: 'Properties' },
    { label: 'Documents', isDocuments: true },
    { label: 'Entity Verification', partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet' },
    { label: 'Audit' },
  ],

  overviewFields: [
    { label: 'Entity Third Party Legal Name', value: 'Pied Piper Inc' },
    { label: 'Entity Industry Sector - onboarding', value: 'Technology' },
    { label: 'Third Party Owner', value: 'Claudio Merino' },
    { label: 'Process Name', value: 'Standard RCTP' },
    { label: 'Entity Registered Country', value: 'United States', flag: '\u{1F1FA}\u{1F1F8}' },
    { label: 'Third Party Contact Email Address', value: 'contact@piedpiper.com' },
    { label: 'Business Unit', value: 'US' },
    { label: 'Screening & Monitoring Policy', value: 'Default Standard KYBP Policy' },
    { label: 'Third Party Legal Structure', value: 'Entity' },
    { label: 'Commercial Significance of Product or Service', value: '[Between 1 and 5%] / Significant / Not in top 10' },
    { label: 'Third Party Expiry Date', value: 'Unknown' },
    { label: 'Tags', value: 'US' },
  ],

  additionalFields: [
    { label: 'Entity Other Known Name or Alias', value: 'PP Inc' },
    { label: 'Responsible Client Unit', value: 'Procurement (Central, direct material)' },
    { label: 'Entity Company Number', value: 'US-12345678' },
    { label: 'Entity ID Type', value: 'DUNS Number' },
    { label: 'Entity Registered Address', value: '1033 US Highway 46 Ste 201, Clifton, NJ 07013' },
    { label: 'All Relevant Client Units', value: 'Business Unit 1, Business Unit 2' },
    { label: 'Internal Reference or ID', value: 'INT-0001' },
    { label: 'Entity ID Value', value: '808241405' },
    { label: 'Entity Website', value: 'www.piedpiper.com', link: true },
  ],

  riskCards: [
    { title: 'Country', level: 'low', flags: 0, score: 0 },
    { title: 'Bribery & Corruption', level: 'low', flags: 0, score: 0 },
    { title: 'Environmental', level: 'low', flags: 0, score: 0 },
    { title: 'Human Rights', level: 'low', flags: 0, score: 0 },
    { title: 'General', level: 'low', flags: 0, score: 0 },
    { title: 'Screening & Monitoring', level: 'low', flags: 0, score: 0 },
    { title: 'Cyber', level: 'low', flags: 0, score: 0 },
  ],

  openTasks: [
    { type: 'Onboarding', icon: 'iconInactiveOrder', name: 'Onboarding', status: 'Not Started', owner: 'Claudio Merino', dateCreated: '28 Nov 2024', age: '1 Year' },
  ],

  screeningRows: [
    {
      name: 'Pied Piper Inc',
      matches: [
        { bg: 'var(--success-500)', color: 'var(--text-normal)', val: '2' },
        { bg: 'var(--success-500)', color: 'var(--text-normal)', val: '1' },
        { bg: 'var(--text-light)', color: '#fff', val: '0' },
        { bg: 'var(--neutral-200)', color: 'var(--text-normal)', val: '0' },
        { bg: 'var(--warning-500)', color: 'var(--text-normal)', val: '0' },
      ],
      updated: '15 Jan 2025',
      type: 'Primary Entity',
      statusDot: 'var(--success-500)',
      statusLabel: 'No Action Required',
      categories: [{ label: 'AM', bg: '#edd500', color: 'var(--neutral-900)' }],
      categoryIcon: 'check_circle_outline',
      entityType: 'Entity',
    },
  ],

  connectedRows: [
    { name: 'Pied Piper Inc', connType: 'Subsidiary', idType: 'DUNS Number', idValue: '808241405', intRef: 'INT-0001', country: 'United States' },
  ],

  suggestedRows: [
    { name: 'Pied Piper Inc', connType: 'Subsidiary', idType: 'DUNS Number', idValue: '808241405', intRef: 'INT-0001', country: 'United States' },
    { name: 'Initech Inc', connType: 'Subsidiary', idType: 'DUNS Number', idValue: '808241405', intRef: 'INT-0002', country: 'United States' },
  ],
  suggestedHasConnType: true,

  documents: [
    { name: 'Certificate-of-Incorporation', type: 'PDF', size: '0.8 MB', section: 'Onboarding', date: '15 Nov 2024', owner: 'Claudio Merino' },
    { name: 'Anti-Bribery-Policy', type: 'PDF', size: '1.2 MB', section: 'Risk Assessment', date: '20 Nov 2024', owner: 'Compliance Group' },
    { name: 'Insurance-Certificate', type: 'PDF', size: '0.5 MB', section: 'Due Diligence', date: '22 Nov 2024', owner: 'Claudio Merino' },
  ],

  riskReport: {
    currentScore: 0,
    accordionSections: [
      { id: 'country', label: 'Country Risk Level', level: 'low', rows: [], totalScore: 0 },
      { id: 'bribery', label: 'Bribery & Corruption Risk Level', level: 'low', rows: [], totalScore: 0 },
      { id: 'environmental', label: 'Environmental Risk Level', level: 'low', rows: [], totalScore: 0 },
      { id: 'human-rights', label: 'Human Right Risk Level', level: 'low', rows: [], totalScore: 0 },
      { id: 'general', label: 'General Risk Level', level: 'low', rows: [], totalScore: 0 },
      { id: 'screening', label: 'Screening & Monitoring Risk Level', level: 'low', rows: [], totalScore: 0 },
      { id: 'cyber', label: 'Cyber Risk Level', level: 'low', rows: [], totalScore: 0 },
    ],
    screeningResults: [],
    redFlags: [],
    processSummary: [
      { step: 'Risk Assessment', isLink: true, status: 'Not Started', by: '', date: '' },
      { step: 'Due Diligence', isLink: true, status: 'Not Started', by: '', date: '' },
      { step: 'Enhanced Due Diligence Report', isLink: true, status: 'Not Required', by: '', date: '' },
      { step: 'UBO Module', isLink: false, status: 'Not Started', by: '', date: '' },
      { step: 'Risk Mitigation Module', isLink: true, status: 'Not Started', by: '', date: '' },
      { step: 'Approval Module', isLink: true, status: 'Not Started', by: '', date: '' },
      { step: 'Screening and Monitoring Module', isLink: true, status: 'Not Started', by: '', date: '' },
    ],
  },
};
