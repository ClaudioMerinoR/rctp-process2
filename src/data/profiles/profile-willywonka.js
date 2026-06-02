export default {
  id: 'willywonka',
  name: 'WILLY WONKA',
  shortName: 'Willy Wonka',
  entityType: 'unknown',
  verifiedText: 'Identity Unverified',
  currentStatus: { label: 'Pending Approval' },
  riskLevel: { label: 'Medium', icon: 'warning_amber', level: 'medium' },

  embedded: true,
  deleteModal: false,
  alertBanners: false,

  sidebarSteps: [
    { label: 'Risk Assessment', dot: 'amber', path: 'risk-assessment', subSteps: [
      { label: 'Risk Assessment 1', dot: 'amber', path: 'risk-assessment/questionnaire' },
      { label: 'Risk Assessment 2', dot: 'red', path: 'risk-assessment/questionnaire' },
    ]},
    { label: 'Due Diligence', dot: 'red', path: 'due-diligence', subSteps: [
      { label: 'Internal Due Diligence', dot: 'red', path: 'due-diligence/internal' },
      { label: 'External Due Diligence', dot: 'red' },
    ]},
    { label: 'Integrity Check', dot: 'grey', partner: 'integrity', tooltip: 'Powered by Xapiens', newTag: true, path: 'integrity-check' },
    { label: 'Enhanced Due Diligence Reports', dot: 'grey', path: 'enhanced-due-diligence' },
    { label: 'UBO', dot: 'amber', partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet', path: 'ubo' },
    { label: 'Risk Mitigation', dot: 'grey', path: 'risk-mitigation' },
    { label: 'Approval', dot: 'amber', path: 'approval', subSteps: [
      { label: 'Approval 1', dot: 'amber' },
      { label: 'Approval 2', dot: 'red' },
    ]},
    { label: 'Screening & Monitoring', dot: 'grey', path: 'screening-monitoring' },
  ],
  sidebarSections: [
    { label: 'Properties', path: 'properties' },
    { label: 'Documents', path: 'documents' },
    { label: 'Entity Verification', partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet', path: 'entity-verification' },
    { label: 'Audit', path: 'audit' },
  ],

  overviewFields: [
    { label: 'Unknown Third Party Legal Name', value: 'Willy Wonka' },
    { label: 'Unknown Industry Sector - onboarding', value: 'Confectionery Manufacturing & Entertainment' },
    { label: 'Third Party Owner', value: 'Claudio Merino' },
    { label: 'Process Name', value: 'Standard RCTP' },
    { label: 'Unknown Registered Country', value: 'United Kingdom', flag: '🇬🇧' },
    { label: 'Third Party Contact Email Address', value: 'golden.ticket@wonkachocolate.com' },
    { label: 'Business Unit', value: 'Europe' },
    { label: 'Screening & Monitoring Policy', value: 'Default Standard KYBP Policy' },
    { label: 'Third Party Legal Structure', value: 'Unknown' },
    { label: 'Commercial Significance of Product or Service', value: '[Between 5 and 10%] / Significant / Top 10' },
    { label: 'Third Party Renewal Date', value: 'Unknown' },
    { label: 'Tags', value: 'Confectionery, Unknown Identity' },
  ],

  additionalFields: [
    { label: 'Unknown Other Known Name or Alias', value: 'The Chocolatier, Mr Wonka, W. Wonka' },
    { label: 'Unknown Registered Address', value: 'Wonka Chocolate Factory, Buckinghamshire, United Kingdom' },
    { label: 'Unknown ID Types', value: 'Unknown' },
    { label: 'Unknown ID Value', value: 'Unknown' },
    { label: 'Responsible Client Unit', value: 'Procurement (Central, direct material)' },
    { label: 'Unknown Third Party Type', value: 'Individual operating as Business' },
    { label: 'Unknown Third Party Type Other details', value: 'Sole proprietor of a hermetically sealed manufacturing facility; no public company registration found' },
    { label: 'Internal Reference or ID', value: 'WW-UK-001' },
    { label: 'All Relevant Client Units', value: 'Europe, Procurement, Supply Chain' },
  ],

  riskCards: [
    { title: 'Country Risk', level: 'low', flags: 0, score: 1 },
    { title: 'Bribery & Corruption', level: 'medium', flags: 1, score: 5 },
    { title: 'Environmental', level: 'medium', flags: 1, score: 4 },
    { title: 'Human Rights', level: 'high', flags: 2, score: 14 },
    { title: 'General', level: 'medium', flags: 2, score: 9 },
    { title: 'Screening & Monitoring', level: 'medium', flags: 1, score: 6 },
    { title: 'Cyber', level: 'low', flags: 0, score: 1 },
  ],

  openTasks: [
    { type: 'Red Flag', icon: 'iconFlag', name: 'Child Labour Concerns — Factory Workforce (Oompa Loompas)', status: 'In Progress', owner: 'Compliance Group', dateCreated: '10 Jan 2026', age: '19 Days' },
    { type: 'Red Flag', icon: 'iconFlag', name: 'Undisclosed Identity — No Public Company Registration', status: 'Not Started', owner: 'Compliance Group', dateCreated: '10 Jan 2026', age: '19 Days' },
    { type: 'Questionnaire', icon: 'iconInactiveOrder', name: 'Risk Assessment', status: 'In Progress', owner: 'Charlie Bucket', dateCreated: '12 Jan 2026', age: '17 Days' },
    { type: 'Approval Task', icon: 'iconFactCheck', name: 'Approval Stage 1 — Pending Identity Verification', status: 'Not Started', owner: 'Sustainability Team', dateCreated: '15 Jan 2026', age: '14 Days' },
  ],

  screeningRows: [
    {
      name: 'Willy Wonka',
      matches: [
        { bg: '#E34C53', color: '#fff', val: '4' },
        { bg: '#13DF81', color: 'var(--text-normal)', val: '1' },
        { bg: '#014155', color: '#fff', val: '0' },
        { bg: '#f89406', color: '#fff', val: '1' },
        { bg: '#F0C043', color: 'var(--text-normal)', val: '3' },
      ],
      updated: '20 Jan 2026',
      type: 'Primary — Unknown',
      statusDot: 'var(--warning-500)',
      statusLabel: 'Requires Review',
      categories: [
        { label: 'AM', bg: '#edd500', color: 'var(--neutral-900)' },
        { label: 'PEP', bg: 'var(--warning-100)', color: 'var(--warning-900)' },
      ],
      categoryIcon: 'error_outline',
      entityType: 'Unknown',
    },
    {
      name: 'Wonka Chocolate Factory Ltd.',
      matches: [
        { bg: '#E34C53', color: '#fff', val: '2' },
        { bg: '#13DF81', color: 'var(--text-normal)', val: '0' },
        { bg: '#014155', color: '#fff', val: '0' },
        { bg: '#f89406', color: '#fff', val: '0' },
        { bg: '#F0C043', color: 'var(--text-normal)', val: '2' },
      ],
      updated: '20 Jan 2026',
      type: 'Associated Entity',
      statusDot: 'var(--warning-500)',
      statusLabel: 'Requires Review',
      categories: [
        { label: 'AM', bg: '#edd500', color: 'var(--neutral-900)' },
      ],
      categoryIcon: 'error_outline',
      entityType: 'Entity',
    },
  ],

  connectedRows: [],

  suggestedRows: [
    { name: 'Wonka Chocolate Factory Ltd.', connType: 'Own Business', idType: 'Unknown', idValue: 'Unknown', intRef: 'WCF-UK-001', country: 'United Kingdom' },
    { name: 'Loompaland Trade Co.', connType: 'Labour Supplier', idType: 'Unknown', idValue: 'Unknown', intRef: '', country: 'Unknown' },
    { name: 'Slugworth Confectionery', connType: 'Competitor / Adverse Party', idType: 'DUNS Number', idValue: '441209887', intRef: 'SLW-001', country: 'United Kingdom' },
  ],
  suggestedHasConnType: true,

  documents: [
    { name: 'GoldenTicket-ContractDraft', type: 'PDF', size: '0.6 MB', section: 'Onboarding', date: '12 Jan 2026', owner: 'Charlie Bucket' },
    { name: 'FactoryVisit-SafetyReport', type: 'PDF', size: '1.8 MB', section: 'Due Diligence', date: '15 Jan 2026', owner: 'Compliance Group' },
    { name: 'WorkforceComposition-OompaLoompaQuery', type: 'PDF', size: '2.1 MB', section: 'Risk Assessment', date: '10 Jan 2026', owner: 'Compliance Group' },
    { name: 'ConfectioneryIngredients-SupplyChainAudit', type: 'PDF', size: '1.3 MB', section: 'Due Diligence', date: '18 Jan 2026', owner: 'Charlie Bucket' },
  ],

  riskReport: {
    currentScore: 40,
    accordionSections: [
      {
        id: 'country', label: 'Country Risk Level', level: 'low',
        rows: [{ property: 'Country of Registration', value: 'United Kingdom', score: 1 }],
        totalScore: 1,
      },
      {
        id: 'bribery', label: 'Bribery & Corruption Risk Level', level: 'medium',
        rows: [
          { property: 'Undisclosed Business Ownership', value: 'No Public Registration', score: 3 },
          { property: 'Anti-Bribery Policy', value: 'Not Provided', score: 2 },
        ],
        totalScore: 5,
      },
      {
        id: 'environmental', label: 'Environmental Risk Level', level: 'medium',
        rows: [
          { property: 'Effluent Discharge — Chocolate River', value: 'Environmental Breach Risk', score: 4 },
        ],
        totalScore: 4,
      },
      {
        id: 'human-rights', label: 'Human Right Risk Level', level: 'high',
        rows: [
          { property: 'Workforce Identity — Oompa Loompas', value: 'Unverified Immigration Status', score: 8 },
          { property: 'Working Conditions — Sealed Factory', value: 'No External Audit Performed', score: 6 },
        ],
        totalScore: 14,
      },
      {
        id: 'general', label: 'General Risk Level', level: 'medium',
        rows: [
          { property: 'Identity of Third Party', value: 'Unverified — No Public Records', score: 5 },
          { property: 'Third Party Service Type', value: 'Manufacturing & Proprietary IP', score: 2 },
          { property: 'Factory Access', value: 'Restricted — No Independent Inspection', score: 2 },
        ],
        totalScore: 9,
      },
      {
        id: 'screening', label: 'Screening & Monitoring Risk Level', level: 'medium',
        rows: [
          { property: 'Adverse Media — Factory Incidents', value: '4 Potential Matches', score: 4 },
          { property: 'PEP Link — Loompaland Officials', value: 'Indirect Link', score: 2 },
        ],
        totalScore: 6,
      },
      {
        id: 'cyber', label: 'Cyber Risk Level', level: 'low',
        rows: [
          { property: 'Digital Presence', value: 'Minimal — No Known IT Infrastructure', score: 1 },
        ],
        totalScore: 1,
      },
    ],
    matchResults: [
      { count: 3, bg: '#F0C043', color: 'var(--text-normal)', label: 'Open (Pending Review)' },
      { count: 1, bg: '#13DF81', color: 'var(--text-normal)', label: 'Open (Investigation Under Review)' },
      { count: 0, bg: '#014155', color: '#fff', label: 'Permanently Clear (Without Updates)' },
      { count: 1, bg: '#f89406', color: '#fff', label: 'Confirmed (Matches)' },
      { count: 4, bg: '#E34C53', color: '#fff', label: 'Open (Pending Review)' },
    ],
    screeningResults: [
      { name: 'Willy Wonka', type: 'Primary — Unknown', level: 'medium', redFlags: 'YES', categories: [{ type: 'am', icon: 'entity' }, { type: 'pep', icon: 'person' }] },
      { name: 'Wonka Chocolate Factory Ltd.', type: 'Associated Entity', level: 'medium', redFlags: 'YES', categories: [{ type: 'am', icon: 'entity' }] },
    ],
    redFlags: [
      { title: 'Child Labour Concerns — Factory Workforce (Oompa Loompas)', isLink: true, status: 'In Progress', riskCategory: 'Human Rights', property: 'Workforce Compliance Risk' },
      { title: 'Undisclosed Identity — No Public Company Registration', isLink: false, status: 'Not Started', riskCategory: 'General', property: 'Identity Verification Risk' },
      { title: 'Environmental Breach Risk — Chocolate River Discharge', isLink: false, status: 'Not Started', riskCategory: 'Environmental', property: 'Environmental Compliance Risk' },
    ],
    processSummary: [
      { step: 'Onboarding', isLink: true, status: 'Completed', startDate: '12 Jan 2026', by: 'Charlie Bucket', date: '12 Jan 2026' },
      { step: 'Risk Assessment', isLink: true, status: 'In Progress', startDate: '12 Jan 2026', by: '', date: '' },
      { step: 'Internal Due Diligence', isLink: true, status: 'In Progress', startDate: '15 Jan 2026', by: '', date: '' },
      { step: 'External Due Diligence', isLink: true, status: 'Not Started', startDate: '', by: '', date: '' },
      { step: 'Integrity Check', isLink: true, status: 'For Completion', startDate: '', by: '', date: '' },
      { step: 'Enhanced Due Diligence Report', isLink: true, status: 'Not Required', startDate: '', by: '', date: '' },
      { step: 'UBO', isLink: false, status: 'Action Required', startDate: '20 Jan 2026', by: '', date: '' },
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
