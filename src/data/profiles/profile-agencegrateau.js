export default {
  id: 'agencegrateau',
  name: 'AGENCE GRATEAU',
  shortName: 'Agence Grateau',
  entityType: 'entity',
  verifiedText: 'Entity Verified',
  currentStatus: { label: 'Approved' },
  riskLevel: { label: 'Medium', icon: 'error_outline', level: 'medium' },

  embedded: false,
  deleteModal: true,
  alertBanners: false,

  sidebarSteps: [
    { label: 'Risk Assessment', dot: 'green', path: 'risk-assessment' },
    { label: 'Due Diligence', dot: 'green', path: 'due-diligence' },
    { label: 'Integrity Check', dot: 'green', partner: 'integrity', tooltip: 'Powered by Xapiens', newTag: true, path: 'integrity-check' },
    { label: 'Enhanced Due Diligence Reports', dot: 'grey', path: 'enhanced-due-diligence' },
    { label: 'UBO', dot: 'green', partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet', path: 'ubo' },
    { label: 'Risk Mitigation', dot: 'green', path: 'risk-mitigation' },
    { label: 'Approval', dot: 'green', path: 'approval' },
    { label: 'Screening & Monitoring', dot: 'green', path: 'screening-monitoring' },
  ],
  sidebarSections: [
    { label: 'Properties', path: 'properties' },
    { label: 'Documents', path: 'documents' },
    { label: 'Entity Verification', partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet', path: 'entity-verification' },
    { label: 'Audit', path: 'audit' },
  ],

  overviewFields: [
    { label: 'Entity Third Party Legal Name', value: 'Agence Grateau' },
    { label: 'Entity Industry Sector - onboarding', value: 'Marketing & Public Relations' },
    { label: 'Third Party Owner', value: 'Claudio Merino' },
    { label: 'Process Name', value: 'Standard RCTP' },
    { label: 'Entity Registered Country', value: 'France', flag: '🇫🇷' },
    { label: 'Third Party Contact Email Address', value: 'sylvie.grateau@agencegrateau.fr' },
    { label: 'Business Unit', value: 'Communications & Media' },
    { label: 'Screening & Monitoring Policy', value: 'Default Standard KYBP Policy' },
    { label: 'Third Party Legal Structure', value: 'Entity' },
    { label: 'Commercial Significance of Product or Service', value: '[Between 1 and 5%] / Significant / Not in top 10' },
    { label: 'Third Party Renewal Date', value: '01 Sep 2026' },
    { label: 'Tags', value: 'PR, Fashion, Paris' },
  ],

  additionalFields: [
    { label: 'Entity Other Known Name or Alias', value: 'Grateau Agency' },
    { label: 'Responsible Client Unit', value: 'Communications (Central)' },
    { label: 'Entity Company Number', value: 'FR-51234567800019' },
    { label: 'Entity ID Type', value: 'SIRET Number' },
    { label: 'Entity Registered Address', value: '6 Rue des Entrepreneurs, 75015 Paris, France' },
    { label: 'All Relevant Client Units', value: 'Communications & Media, Marketing' },
    { label: 'Internal Reference or ID', value: 'AGR-COM-001' },
    { label: 'Entity ID Value', value: '51234567800019' },
    { label: 'Entity Website', value: 'www.agencegrateau.fr', link: true, href: 'https://www.agencegrateau.fr' },
  ],

  riskCards: [
    { title: 'Country', level: 'low', flags: 0, score: 2 },
    { title: 'Bribery & Corruption', level: 'medium', flags: 1, score: 12 },
    { title: 'Enviromental', level: 'low', flags: 0, score: 0 },
    { title: 'Human Rights', level: 'low', flags: 0, score: 0 },
    { title: 'General', level: 'medium', flags: 1, score: 8 },
    { title: 'Screening & Monitoring', level: 'low', flags: 0, score: 0 },
    { title: 'Cyber', level: 'low', flags: 0, score: 2 },
  ],

  openTasks: [
    { type: 'Renewal', icon: 'iconArmingCountdown', name: 'Annual Renewal Review', status: 'Pending', owner: 'Claudio Merino', dateCreated: '01 Mar 2026', age: '71 Days' },
  ],

  screeningRows: [
    {
      name: 'Agence Grateau',
      matches: [
        { bg: '#13DF81', color: 'var(--text-normal)', val: '0' },
        { bg: '#E34C53', color: '#fff', val: '1' },
        { bg: '#014155', color: '#fff', val: '0' },
        { bg: '#f89406', color: '#fff', val: '0' },
        { bg: '#F0C043', color: 'var(--text-normal)', val: '0' },
      ],
      updated: '01 Mar 2026',
      type: 'Primary Entity',
      statusDot: 'var(--warning-500)',
      statusLabel: 'Under Review',
      categories: [
        { label: 'PEP', bg: 'var(--warning-500)', color: 'var(--text-normal)' },
      ],
      categoryIcon: 'warning',
      entityType: 'Entity',
    },
  ],

  connectedRows: [
    { name: 'Grateau Conseil SARL', connType: 'Subsidiary', idType: 'SIRET Number', idValue: '61234567800028', intRef: 'AGR-CS-002', country: 'France' },
  ],

  suggestedRows: [
    { name: 'Groupe Grateau Holding', connType: 'Parent Company', idType: 'SIRET Number', idValue: '71234567800037', intRef: 'GGH-001', country: 'France' },
    { name: 'Fashion Communications SAS', connType: 'Affiliated Entity', idType: 'SIRET Number', idValue: '81234567800046', intRef: 'FCS-001', country: 'France' },
  ],
  suggestedHasConnType: true,

  documents: [
    { name: 'AgenceGrateau-ServiceAgreement-2025', type: 'PDF', size: '1.2 MB', section: 'Onboarding', date: '15 Jan 2025', owner: 'Claudio Merino' },
    { name: 'AgenceGrateau-DueDiligenceReport-2025', type: 'PDF', size: '2.1 MB', section: 'Due Diligence', date: '20 Feb 2025', owner: 'Compliance Group' },
    { name: 'AntiCorruptionPolicy-2025', type: 'PDF', size: '580 KB', section: 'Risk Assessment', date: '20 Feb 2025', owner: 'Compliance Group' },
  ],

  riskReport: {
    currentScore: 24,
    accordionSections: [
      {
        id: 'country', label: 'Country Risk Level', level: 'low',
        rows: [
          { property: 'Country of Registration', value: 'France', score: 2 },
        ],
        totalScore: 2,
      },
      {
        id: 'bribery', label: 'Bribery & Corruption Risk Level', level: 'medium',
        rows: [
          { property: 'Industry Sector Risk', value: 'Marketing & PR — Elevated', score: 8 },
          { property: 'PEP Association', value: 'Indirect association identified', score: 4 },
        ],
        totalScore: 12,
      },
      { id: 'environmental', label: 'Environmental Risk Level', level: 'low', rows: [], totalScore: 0 },
      { id: 'human-rights', label: 'Human Right Risk Level', level: 'low', rows: [], totalScore: 0 },
      {
        id: 'general', label: 'General Risk Level', level: 'medium',
        rows: [
          { property: 'Third Party Service Type', value: 'Service Provider', score: 4 },
          { property: 'Commercial Significance', value: 'Significant', score: 4 },
        ],
        totalScore: 8,
      },
      { id: 'screening', label: 'Screening & Monitoring Risk Level', level: 'low', rows: [], totalScore: 0 },
      {
        id: 'cyber', label: 'Cyber Risk Level', level: 'low',
        rows: [
          { property: 'Data Handling Classification', value: 'Low sensitivity', score: 2 },
        ],
        totalScore: 2,
      },
    ],
    matchResults: [
      { count: 0, bg: '#E34C53', color: '#fff', label: 'Open (Pending Review)' },
      { count: 1, bg: '#F0C043', color: 'var(--text-normal)', label: 'Open (Investigation Under Review)' },
      { count: 0, bg: '#014155', color: '#fff', label: 'Permanently Clear (Without Updates)' },
      { count: 0, bg: '#f89406', color: '#fff', label: 'Confirmed (Matches)' },
      { count: 0, bg: '#13DF81', color: 'var(--text-normal)', label: 'Open (Pending Review)' },
    ],
    screeningResults: [
      { name: 'Agence Grateau', type: 'Primary Entity', level: 'medium', redFlags: '1 PEP', categories: ['PEP'] },
    ],
    redFlags: [
      { title: 'PEP association identified — Sylvie Grateau (indirect)', isLink: false, status: 'Under Review', cat: 'Bribery & Corruption' },
    ],
    processSummary: [
      { step: 'Onboarding', isLink: true, status: 'Completed', startDate: '15 Jan 2025', by: 'Claudio Merino', date: '15 Jan 2025' },
      { step: 'Risk Assessment', isLink: true, status: 'Completed', startDate: '16 Jan 2025', by: 'Claudio Merino', date: '17 Jan 2025' },
      { step: 'Internal Due Diligence', isLink: true, status: 'Completed', startDate: '17 Jan 2025', by: 'Claudio Merino', date: '20 Feb 2025' },
      { step: 'External Due Diligence', isLink: true, status: 'Completed', startDate: '20 Feb 2025', by: 'Compliance Group', date: '28 Feb 2025' },
      { step: 'Enhanced Due Diligence Report', isLink: true, status: 'Not Required', startDate: '', by: '', date: '' },
      { step: 'UBO', isLink: false, status: 'Completed', startDate: '28 Feb 2025', by: 'Claudio Merino', date: '05 Mar 2025' },
      { step: 'Risk Mitigation', isLink: true, status: 'Completed', startDate: '05 Mar 2025', by: 'Claudio Merino', date: '10 Mar 2025' },
      { step: 'Approval', isLink: true, status: 'Completed', startDate: '10 Mar 2025', by: 'Claudio Merino', date: '15 Mar 2025' },
      { step: 'Screening and Monitoring', isLink: true, status: 'In Progress', startDate: '01 Mar 2026', by: '', date: '' },
    ],
  },

  riskMitigation: {
    openRisks: [],
    mitigatedRisks: [
      { id: 1, title: 'PEP Association — Enhanced Monitoring Applied', owner: 'Claudio Merino', status: 'Mitigated', createdDate: '05 Mar 2025', lastEditedBy: 'Claudio Merino', dueDate: '10 Mar 2025', source: 'Risk Assessment', comments: 0 },
    ],
    cancelledRisks: [],
  },

  approval: {
    startDate: '10 Mar 2025',
    completedDate: '15 Mar 2025',
    cancelledDate: '',
    renewalDate: '01 Sep 2026',
  },
};
