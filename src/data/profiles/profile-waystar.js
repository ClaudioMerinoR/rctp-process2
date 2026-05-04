export default {
  id: 'waystar',
  name: 'WAYSTAR ROYCO, INC.',
  shortName: 'Waystar Royco',
  entityType: 'entity',
  verifiedText: 'Entity Verified',
  currentStatus: { label: 'Not Approved' },
  riskLevel: { label: 'High', icon: 'warning', level: 'high' },

  embedded: false,
  deleteModal: true,
  alertBanners: true,

  sidebarSteps: [
    { label: 'Risk Assessment', dot: 'red', path: 'risk-assessment' },
    { label: 'Due Diligence', dot: 'red', path: 'due-diligence' },
    { label: 'Integrity Check', dot: 'red', partner: 'integrity', tooltip: 'Powered by Xapiens', newTag: true , path: 'integrity-check'},
    { label: 'Enhanced Due Diligence Reports', dot: 'red', path: 'enhanced-due-diligence' },
    { label: 'UBO', dot: 'amber', partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet' , path: 'ubo'},
    { label: 'Risk Mitigation', dot: 'red' , path: 'risk-mitigation'},
    { label: 'Approval', dot: 'red', path: 'approval' },
    { label: 'Screening & Monitoring', dot: 'red', path: 'screening-monitoring' },
  ],
  sidebarSections: [
    { label: 'Properties' },
    { label: 'Documents', path: 'documents' },
    { label: 'Entity Verification', partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet' },
    { label: 'Audit' },
  ],

  overviewFields: [
    { label: 'Entity Third Party Legal Name', value: 'Waystar Royco, Inc.' },
    { label: 'Entity Industry Sector - onboarding', value: 'Media, Entertainment & Broadcasting' },
    { label: 'Third Party Owner', value: 'Claudio Merino' },
    { label: 'Process Name', value: 'Standard RCTP' },
    { label: 'Entity Registered Country', value: 'United States', flag: '🇺🇸' },
    { label: 'Third Party Contact Email Address', value: 'greg.hirsch@waystarroyco.com' },
    { label: 'Business Unit', value: 'Global Media & Broadcast' },
    { label: 'Screening & Monitoring Policy', value: 'Default Standard KYBP Policy' },
    { label: 'Third Party Legal Structure', value: 'Entity' },
    { label: 'Commercial Significance of Product or Service', value: '[Greater than 10%] / Critical / Top 10' },
    { label: 'Third Party Renewal Date', value: '—' },
    { label: 'Tags', value: 'Media, ATN' },
  ],

  additionalFields: [
    { label: 'Entity Other Known Name or Alias', value: 'Waystar, Royco Media' },
    { label: 'Responsible Client Unit', value: 'Procurement (Central, direct material)' },
    { label: 'Entity Company Number', value: 'US-10293847' },
    { label: 'Entity ID Type', value: 'DUNS Number' },
    { label: 'Entity Registered Address', value: '1230 Avenue of the Americas, New York, NY 10020' },
    { label: 'All Relevant Client Units', value: 'ATN, Park Broadcasting, Brightstar Cruises, Vaulter' },
    { label: 'Internal Reference or ID', value: 'WYS-NYC-001' },
    { label: 'Entity ID Value', value: '998827364' },
    { label: 'Entity Website', value: 'www.waystarroyco.com', link: true, href: 'https://www.waystarroyco.com' },
  ],

  riskCards: [
    { title: 'Country', level: 'low', flags: 0, score: 1 },
    { title: 'Bribery & Corruption', level: 'high', flags: 4, score: 18 },
    { title: 'Enviromental', level: 'low', flags: 0, score: 0 },
    { title: 'Human Rights', level: 'high', flags: 3, score: 14 },
    { title: 'General', level: 'high', flags: 5, score: 22 },
    { title: 'Screening & Monitoring', level: 'medium', flags: 2, score: 8 },
    { title: 'Cyber', level: 'medium', flags: 1, score: 5 },
  ],

  openTasks: [
    { type: 'Red Flag', icon: 'iconFlag', name: 'Brightstar Cruises — Ongoing DOJ Investigation', status: 'Open', owner: 'Compliance Group', dateCreated: '05 Nov 2025', age: '54 Days' },
    { type: 'Red Flag', icon: 'iconFlag', name: 'ATN — Federal Election Interference Allegations', status: 'Open', owner: 'Compliance Group', dateCreated: '12 Nov 2025', age: '47 Days' },
    { type: 'Red Flag', icon: 'iconFlag', name: 'Exec Misconduct — Multiple Senior Officers', status: 'In Progress', owner: 'Compliance Group', dateCreated: '20 Nov 2025', age: '39 Days' },
    { type: 'Enhanced Due Diligence Report Task', icon: 'iconFinanceMode', name: 'Enhanced Due Diligence — Brightstar Cruises Cover-Up', status: 'In Progress', owner: 'Emily Forbes', dateCreated: '01 Dec 2025', age: '28 Days' },
    { type: 'Approval Task', icon: 'iconFactCheck', name: 'Approval Blocked — Pending Legal Clearance', status: 'Not Started', owner: 'Sustainability Team', dateCreated: '10 Dec 2025', age: '19 Days' },
    { type: 'Cancel Red Flag Task', icon: 'iconFrame9', name: 'Red Flag Cancellation Request — ATN', status: 'Not Started', owner: 'Red Flag Approval Group', dateCreated: '15 Dec 2025', age: '14 Days' },
    { type: 'Risk Level Amend Approval Stage 1', icon: 'iconArmingCountdown', name: 'Risk Level Escalation — General Risk', status: 'Not Started', owner: 'Compliance Group', dateCreated: '20 Dec 2025', age: '9 Days' },
  ],

  screeningRows: [
    {
      name: 'Waystar Royco, Inc.',
      matches: [
        { bg: 'var(--alert-500)', color: '#fff', val: '47' },
        { bg: 'var(--success-500)', color: 'var(--text-normal)', val: '3' },
        { bg: 'var(--text-light)', color: '#fff', val: '1' },
        { bg: 'var(--neutral-200)', color: 'var(--text-normal)', val: '2' },
        { bg: 'var(--warning-500)', color: 'var(--text-normal)', val: '5' },
      ],
      updated: '29 Dec 2025',
      type: 'Primary Entity',
      statusDot: 'var(--alert-500)',
      statusLabel: 'Remediation Required',
      categories: [
        { label: 'SOC', bg: '#c38000', color: 'var(--neutral-900)' },
        { label: 'AM', bg: '#edd500', color: 'var(--neutral-900)' },
        { label: 'PEP', bg: 'var(--warning-100)', color: 'var(--warning-900)' },
      ],
      categoryIcon: 'warning',
      entityType: 'Entity',
    },
  ],

  connectedRows: [
    { name: 'ATN (America\'s Most Trusted News)', connType: 'Subsidiary', idType: 'DUNS Number', idValue: '334412987', intRef: 'WYS-ATN-002', country: 'United States' },
    { name: 'Brightstar Cruises LLC', connType: 'Subsidiary', idType: 'DUNS Number', idValue: '556623410', intRef: 'WYS-BRC-003', country: 'United States' },
    { name: 'Park Broadcasting Corp', connType: 'Subsidiary', idType: 'DUNS Number', idValue: '778934521', intRef: 'WYS-PBC-004', country: 'United States' },
  ],

  suggestedRows: [
    { name: 'GoJo Technologies AB', connType: 'Acquirer', idType: 'LEI', idValue: 'SE0012456789', intRef: 'GOJO-001', country: 'Sweden' },
    { name: 'Vaulter Media Inc.', connType: 'Subsidiary', idType: 'DUNS Number', idValue: '112287634', intRef: 'VLT-001', country: 'United States' },
    { name: 'Royco Holdings Ltd', connType: 'Parent', idType: 'BVD ID', idValue: 'BVD887123', intRef: 'RHC-001', country: 'United States' },
  ],
  suggestedHasConnType: true,

  documents: [
    { name: 'WaystarRoyco-AnnualReport-2024', type: 'PDF', size: '4.2 MB', section: 'Due Diligence', date: '01 Nov 2025', owner: 'Emily Forbes' },
    { name: 'DOJ-InvestigationNotice-BrightstarCruises', type: 'PDF', size: '2.1 MB', section: 'Risk Assessment', date: '05 Nov 2025', owner: 'Compliance Group' },
    { name: 'EnhancedDueDiligence-BrightstarCoverUp', type: 'PDF', size: '3.8 MB', section: 'Due Diligence', date: '01 Dec 2025', owner: 'Emily Forbes' },
    { name: 'ATN-RegulatoryCorrespondence', type: 'PDF', size: '1.6 MB', section: 'Risk Assessment', date: '12 Nov 2025', owner: 'Compliance Group' },
    { name: 'BoardResolution-LoganRoySuccession', type: 'PDF', size: '0.9 MB', section: 'Onboarding', date: '20 Nov 2025', owner: 'Gerri Kellman' },
  ],

  riskReport: {
    currentScore: 68,
    accordionSections: [
      {
        id: 'country', label: 'Country Risk Level', level: 'low',
        rows: [{ property: 'Country of Registration', value: 'United States', score: 1 }],
        totalScore: 1,
      },
      {
        id: 'bribery', label: 'Bribery & Corruption Risk Level', level: 'high',
        rows: [
          { property: 'DOJ Investigation — Brightstar Cruises Cover-Up', value: 'Confirmed', score: 10 },
          { property: 'Political Donations to Candidates via ATN', value: 'Yes', score: 5 },
          { property: 'Anti-Bribery Policy', value: 'Partial — Under Review', score: 3 },
        ],
        totalScore: 18,
      },
      { id: 'environmental', label: 'Environmental Risk Level', level: 'low', rows: [], totalScore: 0 },
      {
        id: 'human-rights', label: 'Human Right Risk Level', level: 'high',
        rows: [
          { property: 'Crew Misconduct Allegations — Brightstar Cruises', value: 'Multiple Incidents', score: 8 },
          { property: 'Senior Executive Misconduct', value: 'Under Investigation', score: 6 },
        ],
        totalScore: 14,
      },
      {
        id: 'general', label: 'General Risk Level', level: 'high',
        rows: [
          { property: 'Third Party Service Type', value: 'Media Conglomerate', score: 6 },
          { property: 'Publicly Listed Company', value: 'Yes — NYSE: WRC', score: 4 },
          { property: 'Contract Value Known', value: 'Yes – >$10M', score: 8 },
          { property: 'Pending Hostile Acquisition — GoJo Technologies', value: 'Ongoing', score: 4 },
        ],
        totalScore: 22,
      },
      {
        id: 'screening', label: 'Screening & Monitoring Risk Level', level: 'medium',
        rows: [
          { property: 'Adverse Media Matches', value: '47 Potential Matches', score: 6 },
          { property: 'PEP Match — Kendall Roy', value: '1 Confirmed Match', score: 2 },
        ],
        totalScore: 8,
      },
      {
        id: 'cyber', label: 'Cyber Risk Level', level: 'medium',
        rows: [
          { property: 'Data Privacy Compliance', value: 'Partial', score: 3 },
          { property: 'ATN Voter Data Handling', value: 'Under Regulatory Review', score: 2 },
        ],
        totalScore: 5,
      },
    ],
    matchResults: [
      { count: 47, bg: '#E34C53', color: '#fff', label: 'Open (Pending Review)' },
      { count: 3, bg: '#13DF81', color: 'var(--text-normal)', label: 'Open (Investigation Under Review)' },
      { count: 1, bg: '#016F91', color: '#fff', label: 'Permanently Clear (Without Updates)' },
      { count: 2, bg: '#9A3438', color: '#fff', label: 'Confirmed (Matches)' },
      { count: 5, bg: '#F0C043', color: 'var(--text-normal)', label: 'Open (Pending Review)' },
    ],
    screeningResults: [
      { name: 'Kendall Roy', type: 'Director', level: 'high', redFlags: 'YES', categories: [{ type: 'pep', icon: 'person' }, { type: 'san', icon: 'person' }, { type: 'sco', icon: 'person' }] },
      { name: 'Logan Roy', type: 'Former CEO', level: 'high', redFlags: 'YES', categories: [{ type: 'pep', icon: 'person' }, { type: 'brd', icon: 'person' }, { type: 'san', icon: 'person' }, { type: 'am', icon: 'entity' }] },
      { name: 'Tom Wambsgans', type: 'CEO', level: 'medium', redFlags: 'YES', categories: [{ type: 'soc', icon: 'entity' }, { type: 'ool', icon: 'person' }] },
      { name: 'Roman Roy', type: 'Former COO', level: 'medium', redFlags: '', categories: [] },
    ],
    redFlags: [
      { title: 'DOJ Investigation — Brightstar Cruises Cover-Up', isLink: true, status: 'Open', riskCategory: 'Bribery & Corruption', property: '' },
      { title: 'ATN — Federal Election Interference Allegations', isLink: true, status: 'Open', riskCategory: 'General', property: '' },
      { title: 'Senior Executive Misconduct — Multiple Officers', isLink: false, status: 'Open', riskCategory: 'Human Rights', property: '' },
      { title: 'PEP Match — Kendall Roy (Politically Exposed)', isLink: true, status: 'Open', riskCategory: 'Screening and Monitoring', property: '' },
      { title: 'Crew Abuse Allegations — Brightstar Cruises', isLink: false, status: 'In Progress', riskCategory: 'Human Rights', property: '' },
    ],
    processSummary: [
      { step: 'Onboarding', isLink: true, status: 'Completed', startDate: '1 Nov 2025', by: 'Gerri Kellman', date: '1 Nov 2025' },
      { step: 'Risk Assessment', isLink: true, status: 'Completed', startDate: '1 Nov 2025', by: 'Emily Forbes', date: '5 Nov 2025' },
      { step: 'Internal Due Diligence', isLink: true, status: 'Completed', startDate: '5 Nov 2025', by: 'Emily Forbes', date: '10 Nov 2025' },
      { step: 'External Due Diligence', isLink: true, status: 'In Progress', startDate: '10 Nov 2025', by: '', date: '' },
      { step: 'Enhanced Due Diligence Report', isLink: true, status: 'In Progress', startDate: '1 Dec 2025', by: '', date: '' },
      { step: 'Enhanced Due Diligence Report Review Task', isLink: true, status: 'Not Started', startDate: '', by: '', date: '' },
      { step: 'UBO', isLink: false, status: 'Action Required', startDate: '20 Dec 2025', by: '', date: '' },
      { step: 'Risk Mitigation', isLink: true, status: 'Action Required', startDate: '20 Dec 2025', by: '', date: '' },
      { step: 'Approval', isLink: true, status: 'Not Approved', startDate: '29 Dec 2025', by: 'Compliance Group', date: '29 Dec 2025' },
      { step: 'Screening and Monitoring', isLink: true, status: 'Action Required', startDate: '29 Dec 2025', by: '', date: '' },
    ],
  },
  riskMitigation: {
    openRisks: [
      { id: 1, title: 'DOJ Investigation — Brightstar Cruises Cover-Up', owner: 'Claudio Merino', status: 'Open', createdDate: '05 Nov 2025', lastEditedBy: '', dueDate: '', source: '', comments: 0 },
      { id: 2, title: 'ATN — Federal Election Interference Allegations', owner: 'Claudio Merino', status: 'Open', createdDate: '12 Nov 2025', lastEditedBy: '', dueDate: '', source: '', comments: 0 },
      { id: 3, title: 'Exec Misconduct — Multiple Senior Officers', owner: 'Claudio Merino', status: 'Open', createdDate: '20 Nov 2025', lastEditedBy: '', dueDate: '', source: '', comments: 1 },
      { id: 4, title: 'PEP Match — Kendall Roy (Politically Exposed)', owner: 'Claudio Merino', status: 'Open', createdDate: '29 Dec 2025', lastEditedBy: '', dueDate: '', source: '', comments: 0 },
    ],
    mitigatedRisks: [],
    cancelledRisks: [],
  },
};
