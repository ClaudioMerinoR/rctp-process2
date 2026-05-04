export default {
  id: 'lumon2',
  name: 'LUMON TECHNOLOGIES 2',
  shortName: 'Lumon Technologies 2',
  entityType: 'entity',
  verifiedText: 'Entity Verified',
  currentStatus: { label: 'Approved*' },
  riskLevel: { label: 'Low', icon: 'check_circle_outline', level: 'low' },

  embedded: false,
  deleteModal: true,
  alertBanners: false,

  sidebarSteps: [
    { label: 'Risk Assessment', dot: 'green', path: 'risk-assessment' },
    { label: 'Due Diligence', dot: 'green', path: 'due-diligence' },
    { label: 'Integrity Check', dot: 'green', partner: 'integrity', tooltip: 'Powered by Xapiens' , path: 'integrity-check'},
    { label: 'Enhanced Due Diligence Reports', dot: 'grey', path: 'enhanced-due-diligence' },
    { label: 'UBO', dot: 'green', partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet' , path: 'ubo'},
    { label: 'Risk Mitigation', dot: 'red' , path: 'risk-mitigation'},
    { label: 'Approval', dot: 'red', path: 'approval' },
    { label: 'Screening & Monitoring', dot: 'green', path: 'screening-monitoring' },
  ],
  sidebarSections: [
    { label: 'Properties' },
    { label: 'Documents', path: 'documents' },
    { label: 'Entity Verification', partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet' },
    { label: 'Audit' },
  ],

  overviewFields: [
    { label: 'Entity Third Party Legal Name', value: 'Lumon Technologies 2' },
    { label: 'Entity Industry Sector - onboarding', value: 'Biotech & Pharmaceutical Research' },
    { label: 'Third Party Owner', value: 'Tamara Knoetschke' },
    { label: 'Process Name', value: 'Standard RCTP' },
    { label: 'Entity Registered Country', value: 'United States', flag: '🇺🇸' },
    { label: 'Third Party Contact Email Address', value: 'irving.b@kier.lumontechnologies.com' },
    { label: 'Business Unit', value: 'Macrodata Refinement' },
    { label: 'Screening & Monitoring Policy', value: 'Default Standard KYBP Policy' },
    { label: 'Third Party Legal Structure', value: 'Entity' },
    { label: 'Commercial Significance of Product or Service', value: '[Between 1 and 5%] / Significant / Not in top 10' },
    { label: 'Third Party Renewal Date', value: '15 Jun 2026' },
    { label: 'Tags', value: 'Biotech, Severance' },
  ],

  additionalFields: [
    { label: 'Entity Other Known Name or Alias', value: 'Lumon Tech 2' },
    { label: 'Responsible Client Unit', value: 'Procurement (Central, direct material)' },
    { label: 'Entity Company Number', value: 'US-00741853' },
    { label: 'Entity ID Type', value: 'DUNS Number' },
    { label: 'Entity Registered Address', value: '2 Lumon Drive, Kier, PE 04101' },
    { label: 'All Relevant Client Units', value: 'Macrodata Refinement, Optics & Design, Overtime Contingency' },
    { label: 'Internal Reference or ID', value: 'LMN-MDR-002' },
    { label: 'Entity ID Value', value: '441209874' },
    { label: 'Entity Website', value: 'www.lumontechnologies.com', link: true, href: 'https://www.lumontechnologies.com' },
  ],

  riskCards: [
    { title: 'Country', level: 'low', flags: 0, score: 0 },
    { title: 'Bribery & Corruption', level: 'low', flags: 0, score: 0 },
    { title: 'Enviromental', level: 'low', flags: 0, score: 0 },
    { title: 'Human Rights', level: 'low', flags: 0, score: 0 },
    { title: 'General', level: 'low', flags: 0, score: 2 },
    { title: 'Screening & Monitoring', level: 'low', flags: 0, score: 0 },
    { title: 'Cyber', level: 'low', flags: 0, score: 0 },
  ],

  openTasks: [
    { type: 'Screening & Monitoring', icon: 'iconArmingCountdown', name: 'Annual Screening Review', status: 'Pending', owner: 'Seth Milchick', dateCreated: '02 Jan 2026', age: '26 Days' },
  ],

  screeningRows: [
    {
      name: 'Lumon Technologies 2',
      matches: [
        { bg: 'var(--success-500)', color: 'var(--text-normal)', val: '0' },
        { bg: 'var(--success-500)', color: 'var(--text-normal)', val: '0' },
        { bg: 'var(--text-light)', color: '#fff', val: '0' },
        { bg: 'var(--neutral-200)', color: 'var(--text-normal)', val: '0' },
        { bg: 'var(--neutral-200)', color: 'var(--text-normal)', val: '0' },
      ],
      updated: '02 Jan 2026',
      type: 'Primary Entity',
      statusDot: 'var(--success-500)',
      statusLabel: 'No Action Required',
      categories: [],
      categoryIcon: 'check_circle_outline',
      entityType: 'Entity',
    },
  ],

  connectedRows: [
    { name: 'Lumon Technologies 2 – Optics & Design', connType: 'Division', idType: 'DUNS Number', idValue: '556712341', intRef: 'LMN2-OD-002', country: 'United States' },
    { name: 'Lumon Technologies 2 – Overtime Contingency', connType: 'Division', idType: 'DUNS Number', idValue: '778823402', intRef: 'LMN2-OC-003', country: 'United States' },
  ],

  suggestedRows: [
    { name: 'Kier Eagan Foundation', connType: 'Affiliated Entity', idType: 'DUNS Number', idValue: '123445678', intRef: 'KEF-001', country: 'United States' },
    { name: 'Perpetuity Wing LLC', connType: 'Subsidiary', idType: 'LEI', idValue: 'US0019283746', intRef: 'PW-001', country: 'United States' },
  ],
  suggestedHasConnType: true,

  documents: [
    { name: 'LumonTechnologies2-AnnualReport-2025', type: 'PDF', size: '2.8 MB', section: 'Due Diligence', date: '10 Dec 2025', owner: 'Harmony Cobel' },
    { name: 'SupplyAgreement-2025', type: 'PDF', size: '1.1 MB', section: 'Onboarding', date: '05 Jan 2025', owner: 'Seth Milchick' },
    { name: 'AntiCorruptionPolicy', type: 'PDF', size: '640 KB', section: 'Risk Assessment', date: '05 Jan 2025', owner: 'Compliance Group' },
    { name: 'SeveranceDisclosureAgreement', type: 'PDF', size: '1.4 MB', section: 'Onboarding', date: '05 Jan 2025', owner: 'Harmony Cobel' },
  ],

  riskReport: {
    currentScore: 2,
    accordionSections: [
      { id: 'country', label: 'Country Risk Level', level: 'low', rows: [], totalScore: 0 },
      { id: 'bribery', label: 'Bribery & Corruption Risk Level', level: 'low', rows: [], totalScore: 0 },
      { id: 'environmental', label: 'Environmental Risk Level', level: 'low', rows: [], totalScore: 0 },
      { id: 'human-rights', label: 'Human Right Risk Level', level: 'low', rows: [], totalScore: 0 },
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
      { name: 'Lumon Technologies 2', type: 'Primary Entity', level: 'low', redFlags: '', categories: [] },
    ],
    redFlags: [],
    processSummary: [
      { step: 'Onboarding', isLink: true, status: 'Completed', startDate: '5 Jan 2025', by: 'Helly Riggs', date: '5 Jan 2025' },
      { step: 'Risk Assessment', isLink: true, status: 'Completed', startDate: '5 Jan 2025', by: 'Mark Scout', date: '6 Jan 2025' },
      { step: 'Internal Due Diligence', isLink: true, status: 'Completed', startDate: '6 Jan 2025', by: 'Dylan George', date: '8 Jan 2025' },
      { step: 'External Due Diligence', isLink: true, status: 'Completed', startDate: '8 Jan 2025', by: 'Irving Bailiff', date: '10 Jan 2025' },
      { step: 'Enhanced Due Diligence Report', isLink: true, status: 'Not Required', startDate: '', by: '', date: '' },
      { step: 'UBO', isLink: false, status: 'Completed', startDate: '10 Jan 2025', by: 'Mark Scout', date: '12 Jan 2025' },
      { step: 'Risk Mitigation', isLink: true, status: 'Completed', startDate: '12 Jan 2025', by: 'Harmony Cobel', date: '14 Jan 2025' },
      { step: 'Approval', isLink: true, status: 'Completed', startDate: '14 Jan 2025', by: 'Natalie Herbst', date: '15 Jan 2025' },
      { step: 'Screening and Monitoring', isLink: true, status: 'In Progress', startDate: '2 Jan 2026', by: '', date: '' },
    ],
  },
  riskMitigation: {
    openRisks: [
      { id: 1, title: 'Severance Programme — Regulatory Compliance', owner: 'Tamara Knoetschke', status: 'Open', createdDate: '05 Jan 2025', lastEditedBy: '', dueDate: '', source: '', comments: 0 },
    ],
    mitigatedRisks: [],
    cancelledRisks: [],
  },
};
