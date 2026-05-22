export default {
  id: 'initech',
  name: 'INITECH CORPORATION',
  shortName: 'Initech',
  entityType: 'entity',
  verifiedText: 'Entity Verified',
  currentStatus: { label: 'Approved*', tooltip: 'New red flag triggered on approved record. No risk level change' },
  riskLevel: { label: 'Medium', icon: 'error_outline', level: 'medium' },

  embedded: false,
  deleteModal: true,
  alertBanners: true,

  sidebarSteps: [
    { label: 'Risk Assessment', dot: 'green', path: 'risk-assessment' },
    { label: 'Due Diligence', dot: 'green', path: 'due-diligence' },
    { label: 'Integrity Check', dot: 'green', partner: 'integrity', tooltip: 'Powered by Xapiens', newTag: true, path: 'integrity-check'},
    { label: 'Enhanced Due Diligence Reports', dot: 'grey', path: 'enhanced-due-diligence' },
    { label: 'UBO', dot: 'green', partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet' , path: 'ubo'},
    { label: 'Risk Mitigation', dot: 'red' , path: 'risk-mitigation'},
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
    { label: 'Entity Third Party Legal Name', value: 'Initech Corporation' },
    { label: 'Entity Industry Sector - onboarding', value: 'Software & Financial Technology' },
    { label: 'Third Party Owner', value: 'Claudio Merino' },
    { label: 'Process Name', value: 'Standard RCTP' },
    { label: 'Entity Registered Country', value: 'United States', flag: '🇺🇸' },
    { label: 'Third Party Contact Email Address', value: 'tom.smykowski@initech.com' },
    { label: 'Business Unit', value: 'Americas' },
    { label: 'Screening & Monitoring Policy', value: 'Default Standard KYBP Policy' },
    { label: 'Third Party Legal Structure', value: 'Entity' },
    { label: 'Commercial Significance of Product or Service', value: '[Between 5 and 10%] / Significant / Not in top 10' },
    { label: 'Third Party Renewal Date', value: '31 Dec 2026' },
    { label: 'Tags', value: 'Software, Finance' },
  ],

  additionalFields: [
    { label: 'Entity Other Known Name or Alias', value: '—' },
    { label: 'Responsible Client Unit', value: 'Procurement (Central, direct material)' },
    { label: 'Entity Company Number', value: 'US-98765432' },
    { label: 'Entity ID Type', value: 'DUNS Number' },
    { label: 'Entity Registered Address', value: '4120 Freidrich Lane, Austin, TX 78744' },
    { label: 'All Relevant Client Units', value: 'Americas, Global Operations' },
    { label: 'Internal Reference or ID', value: 'INT-0042' },
    { label: 'Entity ID Value', value: '808241999' },
    { label: 'Entity Website', value: 'www.initech.com', link: true },
  ],

  riskCards: [
    { title: 'Country Risk', level: 'low', flags: 0, score: 1 },
    { title: 'Bribery & Corruption', level: 'medium', flags: 1, score: 9 },
    { title: 'Environmental', level: 'low', flags: 0, score: 0 },
    { title: 'Human Rights', level: 'low', flags: 0, score: 2 },
    { title: 'General', level: 'medium', flags: 2, score: 11 },
    { title: 'Screening & Monitoring', level: 'medium', flags: 1, score: 7 },
    { title: 'Cyber', level: 'low', flags: 0, score: 3 },
  ],

  openTasks: [
    { type: 'Risk Assessment', icon: 'iconFactCheck', name: 'Annual Risk Assessment', status: 'In Progress', owner: 'Milton Waddams', dateCreated: '02 Jan 2026', age: '26 Days' },
    { type: 'Screening & Monitoring', icon: 'iconArmingCountdown', name: 'Screening Review — Embezzlement Allegation', status: 'Pending', owner: 'Bob Slydell', dateCreated: '15 Jan 2026', age: '13 Days' },
  ],

  screeningRows: [
    {
      name: 'Initech Corporation',
      matches: [
        { bg: '#E34C53', color: '#fff', val: '4' },
        { bg: '#13DF81', color: 'var(--text-normal)', val: '1' },
        { bg: '#014155', color: '#fff', val: '0' },
        { bg: '#f89406', color: '#fff', val: '0' },
        { bg: '#F0C043', color: 'var(--text-normal)', val: '1' },
      ],
      updated: '10 Jan 2026',
      type: 'Primary Entity',
      statusDot: 'var(--warning-500)',
      statusLabel: 'Requires Review',
      categories: [
        { label: 'AM', bg: '#edd500', color: 'var(--neutral-900)' },
      ],
      categoryIcon: 'error_outline',
      entityType: 'Entity',
    },
  ],

  connectedRows: [
    { name: 'Initech Holdings LLC', connType: 'Parent Company', idType: 'DUNS Number', idValue: '123456789', intRef: 'INT-0043', country: 'United States' },
  ],

  suggestedRows: [
    { name: 'Initrode Corporation', connType: 'Competitor', idType: 'DUNS Number', idValue: '987654321', intRef: '', country: 'United States' },
    { name: 'Chotchkies Inc.', connType: 'Vendor', idType: 'DUNS Number', idValue: '556612345', intRef: 'CHT-001', country: 'United States' },
  ],
  suggestedHasConnType: true,

  documents: [
    { name: 'Certificate-of-Incorporation', type: 'PDF', size: '0.9 MB', section: 'Onboarding', date: '05 Jan 2025', owner: 'Bill Lumbergh' },
    { name: 'TPS-Report-Cover-Sheet-Policy', type: 'PDF', size: '0.3 MB', section: 'Due Diligence', date: '10 Jan 2025', owner: 'Bill Lumbergh' },
    { name: 'Y2K-Remediation-Plan', type: 'PDF', size: '2.1 MB', section: 'Risk Assessment', date: '12 Jan 2025', owner: 'Tom Smykowski' },
    { name: 'Embezzlement-InternalReview', type: 'PDF', size: '1.4 MB', section: 'Due Diligence', date: '15 Jan 2026', owner: 'Bob Slydell' },
  ],

  riskReport: {
    currentScore: 33,
    accordionSections: [
      {
        id: 'country', label: 'Country Risk Level', level: 'low',
        rows: [{ property: 'Country of Registration', value: 'United States', score: 1 }],
        totalScore: 1,
      },
      {
        id: 'bribery', label: 'Bribery & Corruption Risk Level', level: 'medium',
        rows: [
          { property: 'Internal Embezzlement Allegation (salami slicing)', value: 'Under Review', score: 6 },
          { property: 'Anti-Bribery Policy', value: 'Partial', score: 3 },
        ],
        totalScore: 9,
      },
      { id: 'environmental', label: 'Environmental Risk Level', level: 'low', rows: [], totalScore: 0 },
      {
        id: 'human-rights', label: 'Human Right Risk Level', level: 'low',
        rows: [{ property: 'Workplace Environment Complaints', value: 'Multiple Filed', score: 2 }],
        totalScore: 2,
      },
      {
        id: 'general', label: 'General Risk Level', level: 'medium',
        rows: [
          { property: 'Mass Redundancy — Consultants Engaged (Bobs)', value: 'Confirmed', score: 5 },
          { property: 'Third Party Service Type', value: 'Software Supplier', score: 4 },
          { property: 'Key Person Dependency', value: 'High — Single IT Team', score: 2 },
        ],
        totalScore: 11,
      },
      {
        id: 'screening', label: 'Screening & Monitoring Risk Level', level: 'medium',
        rows: [
          { property: 'Adverse Media — Embezzlement Coverage', value: '4 Matches', score: 5 },
          { property: 'Whistleblower Report Filed', value: 'Yes', score: 2 },
        ],
        totalScore: 7,
      },
      {
        id: 'cyber', label: 'Cyber Risk Level', level: 'low',
        rows: [{ property: 'Legacy System Risk', value: 'Y2K Remediation Ongoing', score: 3 }],
        totalScore: 3,
      },
    ],
    matchResults: [
      { count: 4, bg: '#F0C043', color: 'var(--text-normal)', label: 'Open (Pending Review)' },
      { count: 1, bg: '#13DF81', color: 'var(--text-normal)', label: 'Open (Investigation Under Review)' },
      { count: 0, bg: '#014155', color: '#fff', label: 'Permanently Clear (Without Updates)' },
      { count: 0, bg: '#f89406', color: '#fff', label: 'Confirmed (Matches)' },
      { count: 1, bg: '#E34C53', color: '#fff', label: 'Open (Pending Review)' },
    ],
    screeningResults: [
      { name: 'Initech Corporation', type: 'Primary Entity', level: 'medium', redFlags: 4, categories: [{ type: 'soc', icon: 'entity' }, { type: 'ool', icon: 'entity' }, { type: 'mrb', icon: 'entity' }] },
    ],
    redFlags: [
      { title: 'Embezzlement Allegation — Salami Slicing Scheme', isLink: true, status: 'Under Review', riskCategory: 'Bribery & Corruption', property: 'Financial Misconduct Risk' },
      { title: 'Mass Redundancy — Downsizing Consultants Engaged', isLink: false, status: 'Acknowledged', riskCategory: 'General', property: 'Reputational Risk' },
      { title: 'Workplace Environment Complaints — Multiple Employees', isLink: false, status: 'Not Started', riskCategory: 'Human Rights', property: 'Labour Standards Risk' },
    ],
    processSummary: [
      { step: 'Onboarding', isLink: true, status: 'Completed', startDate: '5 Jan 2025', by: 'Bill Lumbergh', date: '5 Jan 2025' },
      { step: 'Risk Assessment', isLink: true, status: 'In Progress', startDate: '2 Jan 2026', by: '', date: '' },
      { step: 'Internal Due Diligence', isLink: true, status: 'Completed', startDate: '6 Jan 2025', by: 'Bob Porter', date: '15 Jan 2025' },
      { step: 'External Due Diligence', isLink: true, status: 'Completed', startDate: '15 Jan 2025', by: 'Bob Slydell', date: '20 Jan 2025' },
      { step: 'Integrity Check', isLink: true, status: 'For Completion', startDate: '', by: '', date: '' },
      { step: 'Enhanced Due Diligence Report', isLink: true, status: 'Not Required', startDate: '', by: '', date: '' },
      { step: 'UBO', isLink: false, status: 'Completed', startDate: '20 Jan 2025', by: 'Tom Smykowski', date: '25 Jan 2025' },
      { step: 'Risk Mitigation', isLink: true, status: 'Action Required', startDate: '15 Jan 2026', by: '', date: '' },
      { step: 'Approval', isLink: true, status: 'Completed', startDate: '25 Jan 2025', by: 'Bill Lumbergh', date: '1 Feb 2025' },
      { step: 'Screening and Monitoring', isLink: true, status: 'In Progress', startDate: '15 Jan 2026', by: '', date: '' },
    ],
  },
  riskMitigation: {
    openRisks: [
      { id: 4, title: 'Y2K Legacy System Exposure — Critical Infrastructure Risk', owner: 'Tom Smykowski', status: 'Not Started', createdDate: '02 Jan 2026', lastEditedBy: 'Bill Lumbergh', dueDate: '30 Jun 2026', source: 'Risk Assessment', comments: 0 },
    ],
    mitigatedRisks: [
      { id: 1, title: 'Embezzlement Allegation — Salami Slicing Scheme', owner: 'Claudio Merino', status: 'Mitigated', createdDate: '02 Jan 2026', lastEditedBy: 'Claudio Merino', dueDate: '31 Mar 2026', source: 'Risk Assessment', comments: 0 },
      { id: 2, title: 'Mass Redundancy — Downsizing Consultants Engaged', owner: 'Claudio Merino', status: 'Mitigated', createdDate: '15 Jan 2026', lastEditedBy: 'Claudio Merino', dueDate: '28 Feb 2026', source: 'Due Diligence', comments: 1 },
      { id: 3, title: 'Workplace Environment Complaints', owner: 'Claudio Merino', status: 'Mitigated', createdDate: '06 Jan 2025', lastEditedBy: 'Claudio Merino', dueDate: '20 Jan 2025', source: 'Risk Assessment', comments: 0 },
    ],
    cancelledRisks: [],
  },
  approval: {
    startDate: '20 Nov 2024',
    completedDate: '14 Dec 2024',
    cancelledDate: '',
    renewalDate: '14 Dec 2025',
    owner: 'Claudio Merino',
  },
};
