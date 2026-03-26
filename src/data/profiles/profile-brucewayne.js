export default {
  id: 'brucewayne',
  name: 'Bruce Wayne Batman',
  shortName: 'Bruce Wayne Batman',
  entityType: 'person',
  verifiedText: 'Identity Verified',
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
    { label: 'First Name', value: 'Bruce Wayne' },
    { label: 'Last Name', value: 'Batman' },
    { label: 'Third Party Owner', value: 'Claudio Merino' },
    { label: 'Process Name', value: 'Standard RCTP' },
    { label: 'Country of Residence', value: 'United States', flag: '\u{1F1FA}\u{1F1F8}' },
    { label: 'Third Party Contact Email', value: 'bruce.wayne@wayneenterprises.com' },
    { label: 'Business Unit', value: 'test' },
    { label: 'Screening & Monitoring Policy', value: 'Default Standard KYBP Policy' },
    { label: 'Entity Type', value: 'Individual / Person' },
    { label: 'Year of Birth', value: '1972' },
    { label: 'Expiry date', value: 'Unknown' },
    { label: 'Tags', value: '\u2014' },
  ],

  additionalFields: [
    { label: 'Also Known As', value: 'The Dark Knight' },
    { label: 'Responsible Client Unit', value: 'test' },
    { label: 'National ID Number', value: '\u2014' },
    { label: 'Identification Type', value: 'Passport' },
    { label: 'Address Details', value: '1007 Mountain Drive, Gotham City, NJ 07001' },
    { label: 'All Relevant Client Units', value: 'test' },
    { label: 'Internal Reference or ID', value: '\u2014' },
    { label: 'Identification Value', value: '\u2014' },
    { label: 'Personal Website', value: 'www.wayneenterprises.com', link: true },
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
      name: 'Bruce Wayne Batman',
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
      entityType: 'Person',
    },
  ],

  connectedRows: [
    { name: 'Bruce Wayne Batman', connType: 'Subsidiary', idType: 'DUNS Number', idValue: '\u2014', intRef: '\u2014', country: 'United States' },
  ],

  suggestedRows: [
    { name: 'Bruce Wayne Batman', connType: 'Subsidiary', idType: 'DUNS Number', idValue: '\u2014', intRef: '\u2014', country: 'United States' },
    { name: 'Initech Inc', connType: 'Subsidiary', idType: 'DUNS Number', idValue: '\u2014', intRef: 'INT-0002', country: 'United States' },
  ],
  suggestedHasConnType: true,

  documents: [
    { name: 'Passport-BruceWayne', type: 'PDF', size: '1.1 MB', section: 'Risk Assessment', date: '10 Nov 2025', owner: 'Compliance Group' },
    { name: 'Background-Check-Report', type: 'PDF', size: '2.4 MB', section: 'Due Diligence', date: '12 Nov 2025', owner: 'Emily Forbes' },
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
