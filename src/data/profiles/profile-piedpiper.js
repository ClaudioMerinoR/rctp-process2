export default {
  id: 'piedpiper',
  name: 'PIED PIPER, INC.',
  shortName: 'Pied Piper',
  entityType: 'entity',
  verifiedText: 'Entity Verified',
  currentStatus: { label: 'Pending Approval' },
  riskLevel: { label: 'High', icon: 'warning', level: 'high' },

  embedded: true,
  deleteModal: false,
  alertBanners: false,

  sidebarSteps: [
    { label: 'Risk Assessment', dot: 'red', path: 'risk-assessment' },
    { label: 'Due Diligence', dot: 'amber', path: 'due-diligence' },
    { label: 'Integrity Check', dot: 'grey', partner: 'integrity', tooltip: 'Powered by Xapiens', newTag: true, path: 'integrity-check'},
    { label: 'Enhanced Due Diligence Reports', dot: 'grey', path: 'enhanced-due-diligence' },
    { label: 'UBO', dot: 'amber', partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet' , path: 'ubo'},
    { label: 'Risk Mitigation', dot: 'grey' , path: 'risk-mitigation'},
    { label: 'Approval', dot: 'amber', path: 'approval' },
    { label: 'Screening & Monitoring', dot: 'grey', path: 'screening-monitoring' },
  ],
  sidebarSections: [
    { label: 'Properties', path: 'properties' },
    { label: 'Documents', path: 'documents' },
    { label: 'Entity Verification', partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet', path: 'entity-verification' },
    { label: 'Audit', path: 'audit' },
  ],

  overviewFields: [
    { label: 'Entity Third Party Legal Name', value: 'Pied Piper, Inc.' },
    { label: 'Entity Industry Sector - onboarding', value: 'Technology — Data Compression & Decentralised Internet' },
    { label: 'Third Party Owner', value: 'Tamara Knoetschke' },
    { label: 'Process Name', value: 'Standard RCTP' },
    { label: 'Entity Registered Country', value: 'United States', flag: '🇺🇸' },
    { label: 'Third Party Contact Email Address', value: 'richard.hendricks@piedpiper.com' },
    { label: 'Business Unit', value: 'US' },
    { label: 'Screening & Monitoring Policy', value: 'Default Standard KYBP Policy' },
    { label: 'Third Party Legal Structure', value: 'Entity' },
    { label: 'Commercial Significance of Product or Service', value: '[Between 1 and 5%] / Significant / Not in top 10' },
    { label: 'Third Party Renewal Date', value: 'Unknown' },
    { label: 'Tags', value: 'Tech, Compression' },
  ],

  additionalFields: [
    { label: 'Entity Other Known Name or Alias', value: 'PP Inc, The New Internet' },
    { label: 'Responsible Client Unit', value: 'Procurement (Central, direct material)' },
    { label: 'Entity Company Number', value: 'US-12345678' },
    { label: 'Entity ID Type', value: 'DUNS Number' },
    { label: 'Entity Registered Address', value: '5230 Newell Road, Palo Alto, CA 94303' },
    { label: 'All Relevant Client Units', value: 'Business Unit 1, Business Unit 2' },
    { label: 'Internal Reference or ID', value: 'INT-0001' },
    { label: 'Entity ID Value', value: '808241405' },
    { label: 'Entity Website', value: 'www.piedpiper.com', link: true },
  ],

  riskCards: [
    { title: 'Country', level: 'low', flags: 0, score: 1 },
    { title: 'Bribery & Corruption', level: 'medium', flags: 1, score: 6 },
    { title: 'Environmental', level: 'low', flags: 0, score: 0 },
    { title: 'Human Rights', level: 'low', flags: 0, score: 0 },
    { title: 'General', level: 'high', flags: 3, score: 16 },
    { title: 'Screening & Monitoring', level: 'medium', flags: 1, score: 7 },
    { title: 'Cyber', level: 'high', flags: 2, score: 12 },
  ],

  openTasks: [
    { type: 'Red Flag', icon: 'iconFlag', name: 'IP Ownership Dispute — Hooli / Gavin Belson', status: 'Open', owner: 'Compliance Group', dateCreated: '10 Oct 2025', age: '81 Days' },
    { type: 'Red Flag', icon: 'iconFlag', name: 'Leadership Instability — Multiple CEO Changes', status: 'In Progress', owner: 'Compliance Group', dateCreated: '01 Nov 2025', age: '59 Days' },
    { type: 'Questionnaire Incomplete', icon: 'iconInactiveOrder', name: 'Risk Assessment', status: 'In Progress', owner: 'Jared Dunn', dateCreated: '15 Nov 2025', age: '45 Days' },
    { type: 'Approval Task', icon: 'iconFactCheck', name: 'Approval Stage 1 — Pending Legal Resolution', status: 'Not Started', owner: 'Sustainability Team', dateCreated: '01 Dec 2025', age: '29 Days' },
  ],

  screeningRows: [
    {
      name: 'Pied Piper, Inc.',
      matches: [
        { bg: '#E34C53', color: '#fff', val: '8' },
        { bg: '#13DF81', color: 'var(--text-normal)', val: '2' },
        { bg: '#014155', color: '#fff', val: '0' },
        { bg: '#f89406', color: '#fff', val: '1' },
        { bg: '#E34C53', color: '#fff', val: '2' },
      ],
      updated: '30 Nov 2025',
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
    {
      name: 'Richard Hendricks',
      matches: [
        { bg: '#E34C53', color: '#fff', val: '1' },
        { bg: '#13DF81', color: 'var(--text-normal)', val: '0' },
        { bg: '#014155', color: '#fff', val: '2' },
        { bg: '#f89406', color: '#fff', val: '0' },
        { bg: '#E34C53', color: '#fff', val: '0' },
      ],
      updated: '30 Nov 2025',
      type: 'Key Person — CEO',
      statusDot: 'var(--success-500)',
      statusLabel: 'Active — No Match',
      categories: [],
      categoryIcon: '',
      entityType: 'Person',
    },
    {
      name: 'Erlich Bachman',
      matches: [
        { bg: '#E34C53', color: '#fff', val: '3' },
        { bg: '#13DF81', color: 'var(--text-normal)', val: '1' },
        { bg: '#014155', color: '#fff', val: '0' },
        { bg: '#f89406', color: '#fff', val: '1' },
        { bg: '#E34C53', color: '#fff', val: '1' },
      ],
      updated: '15 Nov 2025',
      type: 'Former Director',
      statusDot: 'var(--warning-500)',
      statusLabel: 'Requires Review',
      categories: [
        { label: 'PEP', bg: 'var(--warning-100)', color: 'var(--warning-900)' },
        { label: 'SAN', bg: 'var(--alert-100)', color: 'var(--alert-700)' },
      ],
      categoryIcon: 'error_outline',
      entityType: 'Person',
    },
    {
      name: 'Gavin Belson',
      matches: [
        { bg: '#E34C53', color: '#fff', val: '5' },
        { bg: '#13DF81', color: 'var(--text-normal)', val: '1' },
        { bg: '#014155', color: '#fff', val: '0' },
        { bg: '#f89406', color: '#fff', val: '2' },
        { bg: '#E34C53', color: '#fff', val: '3' },
      ],
      updated: '10 Oct 2025',
      type: 'Adverse Party',
      statusDot: 'var(--alert-500)',
      statusLabel: 'Confirmed Match',
      categories: [
        { label: 'SCO', bg: 'var(--alert-100)', color: 'var(--alert-700)' },
        { label: 'OOL', bg: 'var(--neutral-200)', color: 'var(--text-normal)' },
        { label: 'AM', bg: '#edd500', color: 'var(--neutral-900)' },
      ],
      categoryIcon: 'error_outline',
      entityType: 'Person',
    },
  ],

  connectedRows: [
    { name: 'Pied Piper, Inc.', connType: 'Subsidiary', idType: 'DUNS Number', idValue: '808241405', intRef: 'INT-0001', country: 'United States' },
  ],

  suggestedRows: [
    { name: 'Hooli Corporation', connType: 'Competitor / Litigant', idType: 'DUNS Number', idValue: '334409871', intRef: 'HOO-001', country: 'United States' },
    { name: 'Raviga Capital Management', connType: 'Investor', idType: 'DUNS Number', idValue: '556712089', intRef: 'RAV-001', country: 'United States' },
    { name: 'Bream-Hall Capital', connType: 'Investor', idType: 'DUNS Number', idValue: '778812340', intRef: 'BHC-001', country: 'United States' },
  ],
  suggestedHasConnType: true,

  documents: [
    { name: 'Certificate-of-Incorporation', type: 'PDF', size: '0.8 MB', section: 'Onboarding', date: '15 Nov 2025', owner: 'Monica Hall' },
    { name: 'Hooli-IPDispute-LegalNotice', type: 'PDF', size: '2.3 MB', section: 'Risk Assessment', date: '10 Oct 2025', owner: 'Compliance Group' },
    { name: 'PiedPiper-CompressionAlgorithm-Patent', type: 'PDF', size: '1.6 MB', section: 'Due Diligence', date: '20 Oct 2025', owner: 'Jared Dunn' },
    { name: 'AntiCorruptionPolicy', type: 'PDF', size: '720 KB', section: 'Risk Assessment', date: '15 Nov 2025', owner: 'Compliance Group' },
  ],

  riskReport: {
    currentScore: 42,
    accordionSections: [
      {
        id: 'country', label: 'Country Risk Level', level: 'low',
        rows: [{ property: 'Country of Registration', value: 'United States', score: 1 }],
        totalScore: 1,
      },
      {
        id: 'bribery', label: 'Bribery & Corruption Risk Level', level: 'medium',
        rows: [
          { property: 'IP Theft Allegations — Hooli Corporation', value: 'Ongoing Litigation', score: 4 },
          { property: 'Anti-Bribery Policy', value: 'Partial', score: 2 },
        ],
        totalScore: 6,
      },
      { id: 'environmental', label: 'Environmental Risk Level', level: 'low', rows: [], totalScore: 0 },
      { id: 'human-rights', label: 'Human Right Risk Level', level: 'low', rows: [], totalScore: 0 },
      {
        id: 'general', label: 'General Risk Level', level: 'high',
        rows: [
          { property: 'CEO Turnover (3 CEOs in 12 months)', value: 'High Instability', score: 6 },
          { property: 'Ongoing IP Litigation — Hooli', value: 'Yes', score: 5 },
          { property: 'Third Party Service Type', value: 'Tech Supplier', score: 3 },
          { property: 'Board Composition Disputes — Raviga Capital', value: 'Hostile Takeover Attempt', score: 2 },
        ],
        totalScore: 16,
      },
      {
        id: 'screening', label: 'Screening & Monitoring Risk Level', level: 'medium',
        rows: [
          { property: 'Adverse Media Matches', value: '8 Potential Matches', score: 5 },
          { property: 'PEP Match — Gavin Belson (Hooli CEO)', value: 'Indirect Link', score: 2 },
        ],
        totalScore: 7,
      },
      {
        id: 'cyber', label: 'Cyber Risk Level', level: 'high',
        rows: [
          { property: 'Decentralised Internet Platform', value: 'Unregulated Protocol Risk', score: 8 },
          { property: 'Data Privacy Compliance', value: 'Not Yet Assessed', score: 4 },
        ],
        totalScore: 12,
      },
    ],
    matchResults: [
      { count: 8, bg: '#F0C043', color: 'var(--text-normal)', label: 'Open (Pending Review)' },
      { count: 2, bg: '#13DF81', color: 'var(--text-normal)', label: 'Open (Investigation Under Review)' },
      { count: 0, bg: '#014155', color: '#fff', label: 'Permanently Clear (Without Updates)' },
      { count: 1, bg: '#f89406', color: '#fff', label: 'Confirmed (Matches)' },
      { count: 2, bg: '#E34C53', color: '#fff', label: 'Open (Pending Review)' },
    ],
    screeningResults: [
      { name: 'Richard Hendricks', type: 'CEO', level: 'low', redFlags: '', categories: [] },
      { name: 'Gavin Belson', type: 'Adverse Party', level: 'high', redFlags: 'YES', categories: [{ type: 'sco', icon: 'person' }, { type: 'ool', icon: 'entity' }, { type: 'am', icon: 'entity' }] },
      { name: 'Erlich Bachman', type: 'Former Director', level: 'medium', redFlags: 'YES', categories: [{ type: 'pep', icon: 'person' }, { type: 'san', icon: 'person' }] },
    ],
    redFlags: [
      { title: 'IP Ownership Dispute — Hooli / Gavin Belson', isLink: true, status: 'Open', riskCategory: 'Bribery & Corruption', property: '' },
      { title: 'Leadership Instability — Multiple CEO Changes', isLink: false, status: 'In Progress', riskCategory: 'General', property: '' },
      { title: 'Unregulated Decentralised Internet Protocol Risk', isLink: false, status: 'Open', riskCategory: 'Cyber', property: '' },
    ],
    processSummary: [
      { step: 'Onboarding', isLink: true, status: 'Completed', startDate: '15 Nov 2025', by: 'Monica Hall', date: '15 Nov 2025' },
      { step: 'Risk Assessment', isLink: true, status: 'In Progress', startDate: '15 Nov 2025', by: '', date: '' },
      { step: 'Internal Due Diligence', isLink: true, status: 'In Progress', startDate: '20 Nov 2025', by: '', date: '' },
      { step: 'External Due Diligence', isLink: true, status: 'Not Started', startDate: '', by: '', date: '' },
      { step: 'Enhanced Due Diligence Report', isLink: true, status: 'Not Required', startDate: '', by: '', date: '' },
      { step: 'UBO', isLink: false, status: 'Action Required', startDate: '1 Dec 2025', by: '', date: '' },
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
    startDate: '05 May 2025',
    completedDate: '',
    cancelledDate: '',
    renewalDate: '',
  },
};
