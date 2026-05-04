export default {
  id: 'ecomoda',
  name: 'ECOMODA S.A.',
  shortName: 'Ecomoda',
  entityType: 'entity',
  verifiedText: 'Entity Verified',
  currentStatus: { label: 'Approved! (Renewal Required)' },
  riskLevel: { label: 'Medium', icon: 'warning_amber', level: 'medium' },

  embedded: false,
  deleteModal: true,
  alertBanners: false,

  sidebarSteps: [
    { label: 'Risk Assessment', dot: 'green', path: 'risk-assessment' },
    { label: 'Due Diligence', dot: 'green', path: 'due-diligence' },
    { label: 'Integrity Check', dot: 'green', partner: 'integrity', tooltip: 'Powered by Xapiens' , path: 'integrity-check'},
    { label: 'Enhanced Due Diligence Reports', dot: 'grey', path: 'enhanced-due-diligence' },
    { label: 'UBO', dot: 'green', partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet' , path: 'ubo'},
    { label: 'Risk Mitigation', dot: 'green' , path: 'risk-mitigation'},
    { label: 'Approval', dot: 'green', path: 'approval' },
    { label: 'Screening & Monitoring', dot: 'green', path: 'screening-monitoring' },
  ],
  sidebarSections: [
    { label: 'Properties' },
    { label: 'Documents', path: 'documents' },
    { label: 'Entity Verification', partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet' },
    { label: 'Audit' },
  ],

  overviewFields: [
    { label: 'Entity Third Party Legal Name', value: 'Ecomoda S.A.' },
    { label: 'Entity Industry Sector - onboarding', value: 'Fashion & Apparel Manufacturing' },
    { label: 'Third Party Owner', value: 'Claudio Merino' },
    { label: 'Process Name', value: 'Standard RCTP' },
    { label: 'Entity Registered Country', value: 'Colombia', flag: '🇨🇴' },
    { label: 'Third Party Contact Email Address', value: 'betty.pinzon@ecomoda.com.co' },
    { label: 'Business Unit', value: 'Sourcing & Procurement' },
    { label: 'Screening & Monitoring Policy', value: 'Default Standard KYBP Policy' },
    { label: 'Third Party Legal Structure', value: 'Entity' },
    { label: 'Commercial Significance of Product or Service', value: '[Between 5 and 10%] / Significant / Top 10' },
    { label: 'Third Party Renewal Date', value: '30 Jun 2026' },
    { label: 'Tags', value: 'Fashion, Colombia' },
  ],

  additionalFields: [
    { label: 'Entity Other Known Name or Alias', value: 'Ecomoda' },
    { label: 'Responsible Client Unit', value: 'Procurement (Central, direct material)' },
    { label: 'Entity Company Number', value: 'CO-00384712' },
    { label: 'Entity ID Type', value: 'NIT' },
    { label: 'Entity Registered Address', value: 'Cra. 7 #32-16, Bogotá, Cundinamarca, Colombia' },
    { label: 'All Relevant Client Units', value: 'Design & Collections, Export Sales, Retail Operations' },
    { label: 'Internal Reference or ID', value: 'ECO-COL-001' },
    { label: 'Entity ID Value', value: '900.184.736-1' },
    { label: 'Entity Website', value: 'www.ecomoda.com.co', link: true, href: 'https://www.ecomoda.com.co' },
  ],

  riskCards: [
    { title: 'Country', level: 'medium', flags: 1, score: 4 },
    { title: 'Bribery & Corruption', level: 'medium', flags: 1, score: 3 },
    { title: 'Enviromental', level: 'low', flags: 0, score: 0 },
    { title: 'Human Rights', level: 'low', flags: 0, score: 1 },
    { title: 'General', level: 'low', flags: 0, score: 2 },
    { title: 'Screening & Monitoring', level: 'low', flags: 0, score: 0 },
    { title: 'Cyber', level: 'low', flags: 0, score: 0 },
  ],

  openTasks: [
    { type: 'Renewal', icon: 'iconArmingCountdown', name: 'Annual Renewal Review', status: 'Pending', owner: 'Beatriz Pinzón', dateCreated: '01 Apr 2026', age: '29 Days' },
  ],

  screeningRows: [
    {
      name: 'Ecomoda S.A.',
      matches: [
        { bg: 'var(--success-500)', color: 'var(--text-normal)', val: '0' },
        { bg: 'var(--success-500)', color: 'var(--text-normal)', val: '0' },
        { bg: 'var(--text-light)', color: '#fff', val: '0' },
        { bg: 'var(--neutral-200)', color: 'var(--text-normal)', val: '0' },
        { bg: 'var(--neutral-200)', color: 'var(--text-normal)', val: '0' },
      ],
      updated: '01 Apr 2026',
      type: 'Primary Entity',
      statusDot: 'var(--success-500)',
      statusLabel: 'No Action Required',
      categories: [],
      categoryIcon: 'check_circle_outline',
      entityType: 'Entity',
    },
  ],

  connectedRows: [
    { name: 'Ecomoda – Design & Collections', connType: 'Division', idType: 'NIT', idValue: '900.184.737-2', intRef: 'ECO-DC-002', country: 'Colombia' },
    { name: 'Ecomoda – Export Sales', connType: 'Division', idType: 'NIT', idValue: '900.184.738-3', intRef: 'ECO-ES-003', country: 'Colombia' },
  ],

  suggestedRows: [
    { name: 'Mendoza & Asociados S.A.S.', connType: 'Affiliated Entity', idType: 'NIT', idValue: '800.123.456-7', intRef: 'MEN-001', country: 'Colombia' },
    { name: 'Hugo Lombardi Ateliers', connType: 'Supplier', idType: 'NIT', idValue: '830.567.890-1', intRef: 'HLA-001', country: 'Colombia' },
  ],
  suggestedHasConnType: true,

  documents: [
    { name: 'Ecomoda-AnnualReport-2025', type: 'PDF', size: '3.1 MB', section: 'Due Diligence', date: '15 Jan 2026', owner: 'Armando Mendoza' },
    { name: 'SupplyAgreement-Ecomoda-2025', type: 'PDF', size: '980 KB', section: 'Onboarding', date: '10 Feb 2025', owner: 'Beatriz Pinzón' },
    { name: 'AntiCorruptionPolicy-Colombia', type: 'PDF', size: '720 KB', section: 'Risk Assessment', date: '10 Feb 2025', owner: 'Compliance Group' },
    { name: 'ExportLicense-2025', type: 'PDF', size: '540 KB', section: 'Onboarding', date: '10 Feb 2025', owner: 'Nicolás Mora' },
  ],

  riskReport: {
    currentScore: 10,
    accordionSections: [
      {
        id: 'country', label: 'Country Risk Level', level: 'medium',
        rows: [
          { property: 'Country of Registration', value: 'Colombia', score: 4 },
        ],
        totalScore: 4,
      },
      {
        id: 'bribery', label: 'Bribery & Corruption Risk Level', level: 'medium',
        rows: [
          { property: 'Corruption Perception Index', value: 'Moderate Risk', score: 3 },
        ],
        totalScore: 3,
      },
      { id: 'environmental', label: 'Environmental Risk Level', level: 'low', rows: [], totalScore: 0 },
      {
        id: 'human-rights', label: 'Human Right Risk Level', level: 'low',
        rows: [
          { property: 'Labour Practices', value: 'Standard', score: 1 },
        ],
        totalScore: 1,
      },
      {
        id: 'general', label: 'General Risk Level', level: 'low',
        rows: [
          { property: 'Third Party Service Type', value: 'Supplier', score: 2 },
        ],
        totalScore: 2,
      },
      { id: 'screening', label: 'Screening & Monitoring Risk Level', level: 'low', rows: [], totalScore: 0 },
      { id: 'cyber', label: 'Cyber Risk Level', level: 'low', rows: [], totalScore: 0 },
    ],
    matchResults: [
      { count: 0, bg: '#E34C53', color: '#fff', label: 'Open (Pending Review)' },
      { count: 0, bg: '#13DF81', color: 'var(--text-normal)', label: 'Open (Investigation Under Review)' },
      { count: 0, bg: '#016F91', color: '#fff', label: 'Permanently Clear (Without Updates)' },
      { count: 0, bg: '#9A3438', color: '#fff', label: 'Confirmed (Matches)' },
      { count: 0, bg: '#F0C043', color: 'var(--text-normal)', label: 'Open (Pending Review)' },
    ],
    screeningResults: [
      { name: 'Ecomoda S.A.', type: 'Primary Entity', level: 'medium', redFlags: '', categories: [] },
    ],
    redFlags: [],
    processSummary: [
      { step: 'Onboarding', isLink: true, status: 'Completed', startDate: '10 Feb 2025', by: 'Beatriz Pinzón', date: '10 Feb 2025' },
      { step: 'Risk Assessment', isLink: true, status: 'Completed', startDate: '10 Feb 2025', by: 'Nicolás Mora', date: '12 Feb 2025' },
      { step: 'Internal Due Diligence', isLink: true, status: 'Completed', startDate: '12 Feb 2025', by: 'Patricia Fernández', date: '14 Feb 2025' },
      { step: 'External Due Diligence', isLink: true, status: 'Completed', startDate: '14 Feb 2025', by: 'Hugo Lombardi', date: '18 Feb 2025' },
      { step: 'Enhanced Due Diligence Report', isLink: true, status: 'Not Required', startDate: '', by: '', date: '' },
      { step: 'UBO', isLink: false, status: 'Completed', startDate: '18 Feb 2025', by: 'Beatriz Pinzón', date: '20 Feb 2025' },
      { step: 'Risk Mitigation', isLink: true, status: 'Completed', startDate: '20 Feb 2025', by: 'Armando Mendoza', date: '24 Feb 2025' },
      { step: 'Approval', isLink: true, status: 'Completed', startDate: '24 Feb 2025', by: 'Armando Mendoza', date: '25 Feb 2025' },
      { step: 'Screening and Monitoring', isLink: true, status: 'Completed', startDate: '1 Mar 2025', by: '', date: '1 Mar 2025' },
    ],
  },
  riskMitigation: {
    openRisks: [],
    mitigatedRisks: [
      { id: 1, title: 'Country Risk — Colombia Corruption Perception Index', owner: 'Claudio Merino', status: 'Mitigated', createdDate: '10 Feb 2025', lastEditedBy: 'Claudio Merino', dueDate: '24 Feb 2025', source: 'Risk Assessment', comments: 0 },
      { id: 2, title: 'Labour Practices — Supplier Code of Conduct', owner: 'Claudio Merino', status: 'Mitigated', createdDate: '14 Feb 2025', lastEditedBy: 'Claudio Merino', dueDate: '24 Feb 2025', source: 'Due Diligence', comments: 0 },
    ],
    cancelledRisks: [],
  },
};
