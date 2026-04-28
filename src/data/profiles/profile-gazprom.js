export default {
  id: 'gazprom',
  name: 'GAZPROM, PAO',
  shortName: 'Gazprom',
  entityType: 'entity',
  verifiedText: 'Entity Verified',
  currentStatus: { label: 'Pending Approval' },
  riskLevel: { label: 'High', icon: 'warning', level: 'high' },

  embedded: false,
  deleteModal: true,
  alertBanners: true,

  sidebarSteps: [
    { label: 'Risk Assessment', dot: 'red' },
    { label: 'Due Diligence', dot: 'grey' },
    { label: 'Integrity Check', dot: 'red', partner: 'integrity', tooltip: 'Powered by Xapiens', newTag: true },
    { label: 'Enhanced Due Diligence Reports', dot: 'grey' },
    { label: 'UBO', dot: 'green', partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet' },
    { label: 'Risk Mitigation', dot: 'red' },
    { label: 'Approval', dot: 'amber' },
    { label: 'Screening & Monitoring', dot: 'red' },
  ],
  sidebarSections: [
    { label: 'Properties' },
    { label: 'Documents', isDocuments: true },
    { label: 'Entity Verification', partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet' },
    { label: 'Audit' },
  ],

  overviewFields: [
    { label: 'Entity Third Party Legal Name', value: 'Gazprom' },
    { label: 'Entity Industry Sector - onboarding', value: 'Energy' },
    { label: 'Third Party Owner', value: 'Tamara Knoetschke' },
    { label: 'Process Name', value: 'Standard RCTP' },
    { label: 'Entity Registered Country', value: 'Russia', flag: '\u{1F1F7}\u{1F1FA}' },
    { label: 'Third Party Contact Email Address', value: 'claudio@gazprom.com' },
    { label: 'Business Unit', value: 'Global' },
    { label: 'Screening & Monitoring Policy', value: 'Default Screening & Monitoring Policy' },
    { label: 'Third Party Legal Structure', value: 'Entity' },
    { label: 'Commercial Significance of Product or Service', value: '[Between 1 and 5%] / Significant / Not in top 10' },
    { label: 'Third Party Renewal Date', value: '\u2014' },
    { label: 'Tags', value: '\u2014' },
  ],

  additionalFields: [
    { label: 'Entity Other Known Name or Alias', value: 'Gazmash' },
    { label: 'Responsible Client Unit', value: 'Procurement (Central, direct material)' },
    { label: 'Entity Company Number', value: '587762367' },
    { label: 'Entity ID Type', value: 'DUNS Number' },
    { label: 'Entity Registered Address', value: 'Primorskiy Prospekt, 54/1A/1N' },
    { label: 'All Relevant Client Units', value: 'Business Unit 1, Business Unit 2, Business Unit 3' },
    { label: 'Internal Reference or ID', value: '123GAZ789' },
    { label: 'Entity ID Value', value: '366162464' },
    { label: 'Entity Website', value: 'www.gazprom.ru', link: true, href: 'https://www.gazprom.ru' },
  ],

  riskCards: [
    { title: 'Country', level: 'medium', flags: 1, score: 4 },
    { title: 'Bribery & Corruption', level: 'low', flags: 0, score: 0 },
    { title: 'Enviromental', level: 'low', flags: 0, score: 0 },
    { title: 'Human Rights', level: 'medium', flags: 1, score: 4 },
    { title: 'General', level: 'high', flags: 3, score: 12 },
    { title: 'Screening & Monitoring', level: 'low', flags: 0, score: 0 },
    { title: 'Cyber', level: 'high', flags: 2, score: 7 },
  ],

  openTasks: [
    { type: 'Red Flag', icon: 'iconFlag', name: 'Public or Foreign Officials Interaction', status: 'Open', owner: 'Compliance Group', dateCreated: '13 Nov 2025', age: '37 Days' },
    { type: 'Red Flag', icon: 'iconFlag', name: 'High Risk Third Party Service Type', status: 'In Progress', owner: 'Compliance Group', dateCreated: '29 Nov 2025', age: '14 Days' },
    { type: 'Questionnaire Incomplete', icon: 'iconInactiveOrder', name: 'Risk Assessment', status: 'In Progress', owner: 'Emily Forbes', dateCreated: '03 Dec 2025', age: '11 Days' },
    { type: 'Approval Task', icon: 'iconFactCheck', name: 'Approval Stage 1', status: 'Not Started', owner: 'Sustainability Team', dateCreated: '04 Dec 2025', age: '10 Days' },
    { type: 'Enhanced Due Diligence Report Task', icon: 'iconFinanceMode', name: 'Enhanced Due Diligence Report Review Task - Test RCTP Notification 4', status: 'Not Started', owner: 'Emily Forbes', dateCreated: '18 Dec 2025', age: '4 Days' },
    { type: 'Cancel Red Flag Task', icon: 'iconFrame9', name: 'Red Flag Cancellation Request', status: 'Not Started', owner: 'Red Flag Approval Group', dateCreated: '18 Dec 2025', age: '4 Days' },
    { type: 'Risk Level Amend Approval Stage 1', icon: 'iconArmingCountdown', name: 'Risk Level Amend Approval Stage 1', status: 'Not Started', owner: 'Compliance Group', dateCreated: '21 Dec 2025', age: '1 Days' },
  ],

  screeningRows: [
    {
      name: 'Gazmash, AO',
      matches: [
        { bg: 'var(--alert-500)', color: '#fff', val: '91' },
        { bg: 'var(--success-500)', color: 'var(--text-normal)', val: '1' },
        { bg: 'var(--text-light)', color: '#fff', val: '0' },
        { bg: 'var(--neutral-200)', color: 'var(--text-normal)', val: '0' },
        { bg: 'var(--warning-500)', color: 'var(--text-normal)', val: '0' },
      ],
      updated: '20 Jun 2024',
      type: 'Primary Entity',
      statusDot: 'var(--alert-500)',
      statusLabel: 'Remediation Required',
      categories: [
        { label: 'SOC', bg: '#c38000', color: 'var(--neutral-900)' },
        { label: 'AM', bg: '#edd500', color: 'var(--neutral-900)' },
      ],
      categoryIcon: 'pending',
      entityType: 'Entity',
    },
    {
      name: 'Gazmash, AO',
      matches: [
        { bg: 'var(--alert-500)', color: '#fff', val: '91' },
        { bg: 'var(--success-500)', color: 'var(--text-normal)', val: '1' },
        { bg: 'var(--text-light)', color: '#fff', val: '0' },
        { bg: 'var(--neutral-200)', color: 'var(--text-normal)', val: '0' },
        { bg: 'var(--warning-500)', color: 'var(--text-normal)', val: '0' },
      ],
      updated: '20 Jun 2024',
      type: 'Primary Entity',
      statusDot: 'var(--alert-500)',
      statusLabel: 'Remediation Required',
      categories: [
        { label: 'SOC', bg: '#c38000', color: 'var(--neutral-900)' },
        { label: 'AM', bg: '#edd500', color: 'var(--neutral-900)' },
      ],
      categoryIcon: 'pending',
      entityType: 'Entity',
    },
  ],

  connectedRows: [
    { name: 'GAZPROM PAO', connType: 'Subsidiary', idType: 'DUNS Number', idValue: '644908233', intRef: 'F5543343K', country: 'Russian Federation' },
  ],

  suggestedRows: [
    { name: 'GAZMASH IO', connType: 'Subsidiary', idType: 'DUNS Number', idValue: '788234901', intRef: 'G9921234A', country: 'Russian Federation' },
    { name: 'NOVATEK PJSC', connType: 'Subsidiary', idType: 'LEI', idValue: 'RU0520000045', intRef: 'N4456789B', country: 'Russian Federation' },
    { name: 'LUKOIL OAO', connType: 'Subsidiary', idType: 'BVD ID', idValue: 'BVD432187', intRef: 'L3312678C', country: 'Russian Federation' },
  ],
  suggestedHasConnType: true,

  documents: [
    { name: 'Passport-John Luther', type: 'PDF', size: '1.1 MB', section: 'Risk Assessment', date: '10 Nov 2025', owner: 'Compliance Group' },
    { name: 'VAT-Registration', type: 'PDF', size: '0.5 MB', section: 'Risk Assessment', date: '10 Nov 2025', owner: 'Compliance Group' },
    { name: 'AuditedAccounts', type: 'XLSX', size: '2.2 MB', section: 'Due Diligence', date: '7 Nov 2025', owner: 'Third Party Contact' },
    { name: 'Insurance', type: 'PDF', size: '1.1 MB', section: 'Onboarding', date: '7 Nov 2025', owner: 'Sustainability Team' },
    { name: 'AntiBriberyPolicy', type: 'PDF', size: '850 KB', section: 'Risk Assessment', date: '2 Nov 2025', owner: 'Emily Forbes' },
    { name: 'Third Party Contract', type: 'PDF', size: '2.2 MB', section: 'Onboarding', date: '2 Nov 2025', owner: 'Red Flag Approval Group' },
  ],

  riskReport: {
    currentScore: 25,
    accordionSections: [
      {
        id: 'country', label: 'Country Risk Level', level: 'medium',
        rows: [{ property: "Wetlands impacted by third party's business operations", value: 'Yes', score: 5 }],
        totalScore: 5,
      },
      { id: 'bribery', label: 'Bribery & Corruption Risk Level', level: 'low', rows: [], totalScore: 0 },
      { id: 'environmental', label: 'Environmental Risk Level', level: 'low', rows: [], totalScore: 0 },
      {
        id: 'human-rights', label: 'Human Right Risk Level', level: 'medium',
        rows: [{ property: 'Third party engages persons under the age of 15 or of an age for which primary schooling is mandatory under local laws', value: 'Yes', score: 5 }],
        totalScore: 6,
      },
      {
        id: 'general', label: 'General Risk Level', level: 'high',
        rows: [
          { property: 'Third Party Country of Operation', value: 'Argentina', score: 1 },
          { property: 'Third Party Service Type', value: 'Reseller', score: 2 },
          { property: 'Third Party Country of Formation', value: 'China', score: 11 },
        ],
        totalScore: 14,
      },
      { id: 'screening', label: 'Screening & Monitoring Risk Level', level: 'low', rows: [], totalScore: 0 },
      {
        id: 'cyber', label: 'Cyber Risk Level', level: 'high',
        rows: [
          { property: 'Third Party Country of Operation', value: 'Argentina', score: 1 },
          { property: 'Third Party Service Type', value: 'Reseller', score: 2 },
          { property: 'Third Party Country of Formation', value: 'China', score: 11 },
        ],
        totalScore: 14,
      },
    ],
    matchResults: [
      { count: 91, bg: '#E34C53', color: '#fff', label: 'Open (Pending Review)' },
      { count: 1, bg: '#13DF81', color: 'var(--text-normal)', label: 'Open (Investigation Under Review)' },
      { count: 0, bg: '#016F91', color: '#fff', label: 'Permanently Clear (Without Updates)' },
      { count: 0, bg: '#9A3438', color: '#fff', label: 'Confirmed (Matches)' },
      { count: 0, bg: '#F0C043', color: 'var(--text-normal)', label: 'Open (Pending Review)' },
    ],
    screeningResults: [
      { name: 'John Smith', type: 'Director', level: 'high', redFlags: 'YES' },
      { name: 'John Smith', type: 'Director', level: 'medium', redFlags: '' },
      { name: 'BP Plc', type: 'Entity', level: 'high', redFlags: 'YES' },
    ],
    redFlags: [
      { title: 'Watchlist - Other Official List', isLink: true, status: 'Open', cat: 'SaM' },
      { title: 'Third Party High Risk Country Involvement', isLink: false, status: 'Open', cat: 'Bribery & Corruption' },
      { title: "Native inhabitants relocated by third party's business operations", isLink: true, status: 'Mitigated', cat: 'Environmental' },
      { title: "Native inhabitants relocated by third party's business operations", isLink: false, status: 'Post Approval', cat: 'General' },
    ],
    processSummary: [
      { step: 'Onboarding', isLink: true, status: 'Completed', by: 'Angela Martin', date: '2 Apr 2024' },
      { step: 'Risk Assessment', isLink: true, status: 'Incomplete', by: 'Angela Martin', date: '2 Apr 2024' },
      { step: 'Risk Assessment 2', isLink: true, status: 'Mitigated', by: 'Angela Martin', date: '2 Apr 2024' },
      { step: 'Internal Due Diligence', isLink: true, status: 'In Progress', by: '', date: '2 Apr 2024' },
      { step: 'External Due Diligence', isLink: true, status: 'Not Started', by: 'Angela Martin', date: '2 Apr 2024' },
      { step: 'External Due Diligence 2', isLink: true, status: 'Not Started', by: 'Angela Martin', date: '2 Apr 2024' },
      { step: 'Enhanced Due Diligence Report', isLink: true, status: 'Not Required', by: 'Angela Martin', date: '2 Apr 2024' },
      { step: 'UBO Module', isLink: false, status: 'Action Required', by: 'Angela Martin', date: '2 Apr 2024' },
      { step: 'Risk Mitigation Module', isLink: true, status: 'Action Required', by: 'Angela Martin', date: '2 Apr 2024' },
      { step: 'Approval Module', isLink: true, status: 'Action Required', by: 'Angela Martin', date: '2 Apr 2024' },
      { step: 'Screening and Monitoring Module', isLink: true, status: 'Completed', by: 'Angela Martin', date: '2 Apr 2024' },
    ],
  },
};
