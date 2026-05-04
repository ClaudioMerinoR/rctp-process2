export default {
  id: 'brucewayne',
  name: 'BRUCE WAYNE',
  shortName: 'Bruce Wayne',
  entityType: 'person',
  verifiedText: 'Identity Verified',
  currentStatus: { label: 'Pending Approval' },
  riskLevel: { label: 'Low', icon: 'check_circle_outline', level: 'low' },

  embedded: true,
  deleteModal: false,
  alertBanners: false,

  sidebarSteps: [
    { label: 'Risk Assessment', dot: 'green', path: 'risk-assessment' },
    { label: 'Integrity Check', dot: 'amber', partner: 'integrity', tooltip: 'Powered by Xapiens' , path: 'integrity-check'},
    { label: 'Due Diligence', dot: 'amber', path: 'due-diligence' },
    { label: 'Enhanced Due Diligence Reports', dot: 'grey', path: 'enhanced-due-diligence' },
    { label: 'UBO', dot: 'green', partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet' , path: 'ubo'},
    { label: 'Risk Mitigation', dot: 'grey' , path: 'risk-mitigation'},
    { label: 'Approval', dot: 'amber', path: 'approval' },
    { label: 'Screening & Monitoring', dot: 'grey', path: 'screening-monitoring' },
  ],
  sidebarSections: [
    { label: 'Properties' },
    { label: 'Documents', path: 'documents' },
    { label: 'Entity Verification', partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet' },
    { label: 'Audit' },
  ],

  overviewFields: [
    { label: 'Person Third Party Legal Name', value: 'Bruce Thomas Wayne' },
    { label: 'Person Industry Sector - onboarding', value: 'Philanthropy & Vigilante Justice' },
    { label: 'Third Party Owner', value: 'Claudio Merino' },
    { label: 'Process Name', value: 'Standard RCTP' },
    { label: 'Person Country of Residence', value: 'United States', flag: '🇺🇸' },
    { label: 'Third Party Contact Email Address', value: 'alfred.pennyworth@waynemanor.gotham.com' },
    { label: 'Business Unit', value: 'Gotham City Operations' },
    { label: 'Screening & Monitoring Policy', value: 'Default Standard KYBP Policy' },
    { label: 'Third Party Legal Structure', value: 'Individual / Person' },
    { label: 'Commercial Significance of Product or Service', value: '[Greater than 10%] / Critical / Top 10' },
    { label: 'Third Party Renewal Date', value: 'Unknown' },
    { label: 'Tags', value: 'Billionaire, Gotham' },
  ],

  additionalFields: [
    { label: 'Person Other Known Name or Alias', value: 'Batman, The Dark Knight, The Caped Crusader' },
    { label: 'Person Business Address', value: '1007 Mountain Drive, Gotham City, NJ 07001' },
    { label: 'Person ID Type', value: 'Passport' },
    { label: 'Person ID Value', value: 'US-GCT-000001' },
    { label: 'Responsible Client Unit', value: 'Gotham City Operations' },
    { label: 'Person Year of Birth', value: '1972' },
    { label: 'Gender', value: 'Male' },
    { label: 'Internal Reference or ID', value: 'BW-GCT-001' },
    { label: 'All Relevant Client Units', value: 'Gotham City Operations, Wayne Enterprises, Wayne Foundation' },
  ],

  riskCards: [
    { title: 'Country', level: 'low', flags: 0, score: 0 },
    { title: 'Bribery & Corruption', level: 'low', flags: 0, score: 0 },
    { title: 'Environmental', level: 'low', flags: 0, score: 0 },
    { title: 'Human Rights', level: 'low', flags: 0, score: 0 },
    { title: 'General', level: 'low', flags: 0, score: 2 },
    { title: 'Screening & Monitoring', level: 'low', flags: 0, score: 1 },
    { title: 'Cyber', level: 'low', flags: 0, score: 0 },
  ],

  openTasks: [
    { type: 'Questionnaire Incomplete', icon: 'iconInactiveOrder', name: 'Integrity Check — Dual Identity Verification', status: 'In Progress', owner: 'Alfred Pennyworth', dateCreated: '01 Dec 2025', age: '29 Days' },
    { type: 'Approval Task', icon: 'iconFactCheck', name: 'Approval Stage 1 — Pending Background Clearance', status: 'Not Started', owner: 'Lucius Fox', dateCreated: '15 Dec 2025', age: '14 Days' },
  ],

  screeningRows: [
    {
      name: 'Bruce Thomas Wayne',
      matches: [
        { bg: 'var(--success-500)', color: 'var(--text-normal)', val: '2' },
        { bg: 'var(--success-500)', color: 'var(--text-normal)', val: '1' },
        { bg: 'var(--text-light)', color: '#fff', val: '0' },
        { bg: 'var(--neutral-200)', color: 'var(--text-normal)', val: '0' },
        { bg: 'var(--warning-500)', color: 'var(--text-normal)', val: '1' },
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
    { name: 'Wayne Enterprises, Inc.', connType: 'Own Company', idType: 'DUNS Number', idValue: '334421089', intRef: 'WE-GCT-001', country: 'United States' },
    { name: 'Wayne Foundation', connType: 'Own Company', idType: 'DUNS Number', idValue: '556788123', intRef: 'WF-GCT-002', country: 'United States' },
  ],

  suggestedRows: [
    { name: 'Wayne Enterprises, Inc.', connType: 'Own Company', idType: 'DUNS Number', idValue: '334421089', intRef: 'WE-GCT-001', country: 'United States' },
    { name: 'Ace Chemicals Corp.', connType: 'Adverse Party', idType: 'DUNS Number', idValue: '778899001', intRef: '', country: 'United States' },
    { name: 'Gotham City Police Dept.', connType: 'Government Entity', idType: 'LEI', idValue: 'US-GCPD-001', intRef: 'GCPD-001', country: 'United States' },
  ],
  suggestedHasConnType: true,

  documents: [
    { name: 'Passport-BruceWayne', type: 'PDF', size: '1.1 MB', section: 'Risk Assessment', date: '01 Dec 2025', owner: 'Alfred Pennyworth' },
    { name: 'WayneFoundation-CharityRegistration', type: 'PDF', size: '2.4 MB', section: 'Due Diligence', date: '05 Dec 2025', owner: 'Lucius Fox' },
    { name: 'DualIdentity-VerificationRequest', type: 'PDF', size: '0.8 MB', section: 'Due Diligence', date: '10 Dec 2025', owner: 'Alfred Pennyworth' },
    { name: 'AntiCorruptionPolicy-WayneEnterprises', type: 'PDF', size: '1.2 MB', section: 'Risk Assessment', date: '01 Dec 2025', owner: 'Lucius Fox' },
  ],

  riskReport: {
    currentScore: 3,
    accordionSections: [
      { id: 'country', label: 'Country Risk Level', level: 'low', rows: [], totalScore: 0 },
      { id: 'bribery', label: 'Bribery & Corruption Risk Level', level: 'low', rows: [], totalScore: 0 },
      { id: 'environmental', label: 'Environmental Risk Level', level: 'low', rows: [], totalScore: 0 },
      { id: 'human-rights', label: 'Human Right Risk Level', level: 'low', rows: [], totalScore: 0 },
      {
        id: 'general', label: 'General Risk Level', level: 'low',
        rows: [
          { property: 'High Net Worth Individual', value: 'Yes — Est. $9.2B', score: 2 },
        ],
        totalScore: 2,
      },
      {
        id: 'screening', label: 'Screening & Monitoring Risk Level', level: 'low',
        rows: [
          { property: 'Adverse Media — Vigilante Activity Speculation', value: '2 Matches', score: 1 },
        ],
        totalScore: 1,
      },
      { id: 'cyber', label: 'Cyber Risk Level', level: 'low', rows: [], totalScore: 0 },
    ],
    matchResults: [
      { count: 2, bg: '#F0C043', color: 'var(--text-normal)', label: 'Open (Pending Review)' },
      { count: 1, bg: '#13DF81', color: 'var(--text-normal)', label: 'Open (Investigation Under Review)' },
      { count: 0, bg: '#016F91', color: '#fff', label: 'Permanently Clear (Without Updates)' },
      { count: 0, bg: '#9A3438', color: '#fff', label: 'Confirmed (Matches)' },
      { count: 1, bg: '#E34C53', color: '#fff', label: 'Open (Pending Review)' },
    ],
    screeningResults: [
      { name: 'Bruce Thomas Wayne', type: 'Primary Person', level: 'low', redFlags: '', categories: [] },
    ],
    redFlags: [],
    processSummary: [
      { step: 'Risk Assessment', isLink: true, status: 'Completed', startDate: '1 Dec 2025', by: 'Lucius Fox', date: '1 Dec 2025' },
      { step: 'Integrity Check', isLink: true, status: 'In Progress', startDate: '1 Dec 2025', by: '', date: '' },
      { step: 'Due Diligence', isLink: true, status: 'In Progress', startDate: '5 Dec 2025', by: '', date: '' },
      { step: 'Enhanced Due Diligence Report', isLink: true, status: 'Not Required', startDate: '', by: '', date: '' },
      { step: 'UBO', isLink: false, status: 'Completed', startDate: '5 Dec 2025', by: 'Lucius Fox', date: '5 Dec 2025' },
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
};
