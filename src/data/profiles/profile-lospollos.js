export default {
  id: 'lospollos',
  name: 'LOS POLLOS HERMANOS LLC',
  shortName: 'Los Pollos Hermanos',
  entityType: 'entity',
  verifiedText: 'Entity Verified',
  currentStatus: { label: 'Not Approved' },
  riskLevel: { label: 'High', icon: 'warning', level: 'high' },

  embedded: false,
  deleteModal: true,
  alertBanners: true,

  sidebarSteps: [
    { label: 'Risk Assessment', dot: 'red' },
    { label: 'Due Diligence', dot: 'red' },
    { label: 'Integrity Check', dot: 'red', partner: 'integrity', tooltip: 'Powered by Xapiens', newTag: true },
    { label: 'Enhanced Due Diligence Reports', dot: 'red' },
    { label: 'UBO', dot: 'amber', partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet' },
    { label: 'Risk Mitigation', dot: 'red' },
    { label: 'Approval', dot: 'red' },
    { label: 'Screening & Monitoring', dot: 'red' },
  ],
  sidebarSections: [
    { label: 'Properties' },
    { label: 'Documents', path: 'documents' },
    { label: 'Risk Mitigation', path: 'risk-mitigation' },
    { label: 'Entity Verification', partner: 'ubo', tooltip: 'Powered by Duns & Bradstreet' },
    { label: 'Audit' },
  ],

  overviewFields: [
    { label: 'Entity Third Party Legal Name', value: 'Los Pollos Hermanos LLC' },
    { label: 'Entity Industry Sector - onboarding', value: 'Food & Beverage / Restaurant Chain' },
    { label: 'Third Party Owner', value: 'Tamara Knoetschke' },
    { label: 'Process Name', value: 'Enhanced Due Diligence' },
    { label: 'Entity Registered Country', value: 'United States', flag: '🇺🇸' },
    { label: 'Third Party Contact Email Address', value: 'g.fring@lospolloschickens.com' },
    { label: 'Business Unit', value: 'Sourcing & Procurement' },
    { label: 'Screening & Monitoring Policy', value: 'Enhanced KYBP Policy' },
    { label: 'Third Party Legal Structure', value: 'Entity' },
    { label: 'Commercial Significance of Product or Service', value: '[Greater than 10%] / Critical / Top 10' },
    { label: 'Third Party Renewal Date', value: '—' },
    { label: 'Tags', value: 'Food Services, High Risk' },
  ],

  additionalFields: [
    { label: 'Entity Other Known Name or Alias', value: 'Pollos Hermanos, The Chicken Brothers' },
    { label: 'Responsible Client Unit', value: 'Procurement (Central, direct material)' },
    { label: 'Entity Company Number', value: 'US-00583921' },
    { label: 'Entity ID Type', value: 'DUNS Number' },
    { label: 'Entity Registered Address', value: '9516 Snow Heights Circle NE, Albuquerque, NM 87112' },
    { label: 'All Relevant Client Units', value: 'Food Distribution, Chemical Supply Chain, Logistics' },
    { label: 'Internal Reference or ID', value: 'LPH-ABQ-001' },
    { label: 'Entity ID Value', value: '773019284' },
    { label: 'Entity Website', value: 'www.lospolloschickens.com', link: true, href: 'https://www.lospolloschickens.com' },
  ],

  riskCards: [
    { title: 'Country', level: 'low', flags: 0, score: 1 },
    { title: 'Bribery & Corruption', level: 'high', flags: 5, score: 20 },
    { title: 'Enviromental', level: 'low', flags: 0, score: 0 },
    { title: 'Human Rights', level: 'high', flags: 4, score: 16 },
    { title: 'General', level: 'high', flags: 6, score: 24 },
    { title: 'Screening & Monitoring', level: 'high', flags: 5, score: 19 },
    { title: 'Cyber', level: 'medium', flags: 1, score: 4 },
  ],

  openTasks: [
    { type: 'Red Flag', icon: 'iconFlag', name: 'DEA Investigation — Suspected Methamphetamine Distribution', status: 'Open', owner: 'Compliance Group', dateCreated: '10 Jan 2026', age: '80 Days' },
    { type: 'Red Flag', icon: 'iconFlag', name: 'Cartel Links — Juárez Cartel / Don Eladio Vuente', status: 'Open', owner: 'Compliance Group', dateCreated: '15 Jan 2026', age: '75 Days' },
    { type: 'Red Flag', icon: 'iconFlag', name: 'Money Laundering — Unusual Cash Flow Patterns', status: 'Open', owner: 'Compliance Group', dateCreated: '18 Jan 2026', age: '72 Days' },
    { type: 'Enhanced Due Diligence Report Task', icon: 'iconFinanceMode', name: 'Enhanced Due Diligence — Madrigal Electromotive Nexus', status: 'In Progress', owner: 'Mike Ehrmantraut', dateCreated: '20 Jan 2026', age: '70 Days' },
    { type: 'Red Flag', icon: 'iconFlag', name: 'UBO Discrepancy — Undisclosed Beneficial Owners', status: 'In Progress', owner: 'Compliance Group', dateCreated: '25 Jan 2026', age: '65 Days' },
    { type: 'Approval Task', icon: 'iconFactCheck', name: 'Approval Blocked — Pending Law Enforcement Clearance', status: 'Not Started', owner: 'Compliance Group', dateCreated: '01 Feb 2026', age: '58 Days' },
    { type: 'Risk Level Amend Approval Stage 1', icon: 'iconArmingCountdown', name: 'Risk Level Escalation — Organised Crime Nexus', status: 'Not Started', owner: 'Compliance Group', dateCreated: '10 Feb 2026', age: '49 Days' },
  ],

  screeningRows: [
    {
      name: 'Los Pollos Hermanos LLC',
      matches: [
        { bg: 'var(--alert-500)', color: '#fff', val: '38' },
        { bg: 'var(--success-500)', color: 'var(--text-normal)', val: '4' },
        { bg: 'var(--text-light)', color: '#fff', val: '0' },
        { bg: 'var(--neutral-200)', color: 'var(--text-normal)', val: '3' },
        { bg: 'var(--warning-500)', color: 'var(--text-normal)', val: '7' },
      ],
      updated: '15 Apr 2026',
      type: 'Primary Entity',
      statusDot: 'var(--alert-500)',
      statusLabel: 'Remediation Required',
      categories: [
        { label: 'SOC', bg: '#c38000', color: 'var(--neutral-900)' },
        { label: 'AM', bg: '#edd500', color: 'var(--neutral-900)' },
        { label: 'SAN', bg: 'var(--alert-100)', color: 'var(--alert-700)' },
      ],
      categoryIcon: 'warning',
      entityType: 'Entity',
    },
  ],

  connectedRows: [
    { name: 'Madrigal Electromotive GmbH', connType: 'Parent', idType: 'LEI', idValue: 'DE0047382910', intRef: 'MDR-GER-001', country: 'Germany' },
    { name: 'Pollos Distribution LLC', connType: 'Subsidiary', idType: 'DUNS Number', idValue: '441938271', intRef: 'LPH-DST-002', country: 'United States' },
    { name: 'Lavandería Brillante S.A.', connType: 'Affiliated Entity', idType: 'RFC', idValue: 'MX-LB9283746', intRef: 'LVB-MX-003', country: 'Mexico' },
  ],

  suggestedRows: [
    { name: 'Fring Enterprises LLC', connType: 'Affiliated Entity', idType: 'DUNS Number', idValue: '882934710', intRef: 'FRE-001', country: 'United States' },
    { name: 'Cartel Chemical Supply S.A. de C.V.', connType: 'Supplier', idType: 'RFC', idValue: 'MX-CC0129384', intRef: 'CCS-001', country: 'Mexico' },
  ],
  suggestedHasConnType: true,

  documents: [
    { name: 'LosPollosHermanos-AnnualReport-2025', type: 'PDF', size: '1.9 MB', section: 'Due Diligence', date: '15 Jan 2026', owner: 'Mike Ehrmantraut' },
    { name: 'DEA-InvestigationNotice-LPH', type: 'PDF', size: '2.4 MB', section: 'Risk Assessment', date: '10 Jan 2026', owner: 'Compliance Group' },
    { name: 'EnhancedDueDiligence-MadrigalNexus', type: 'PDF', size: '4.1 MB', section: 'Due Diligence', date: '20 Jan 2026', owner: 'Mike Ehrmantraut' },
    { name: 'FinancialAudit-CashFlowAnomalies', type: 'PDF', size: '3.0 MB', section: 'Risk Assessment', date: '18 Jan 2026', owner: 'Compliance Group' },
    { name: 'SupplyChainReview-ChemicalProcurement', type: 'PDF', size: '1.2 MB', section: 'Onboarding', date: '05 Dec 2025', owner: 'Lydia Rodarte-Quayle' },
  ],

  riskReport: {
    currentScore: 84,
    accordionSections: [
      {
        id: 'country', label: 'Country Risk Level', level: 'low',
        rows: [{ property: 'Country of Registration', value: 'United States', score: 1 }],
        totalScore: 1,
      },
      {
        id: 'bribery', label: 'Bribery & Corruption Risk Level', level: 'high',
        rows: [
          { property: 'DEA Investigation — Active', value: 'Confirmed', score: 10 },
          { property: 'Cartel Political Connections', value: 'Yes — Juárez Cartel', score: 6 },
          { property: 'Anti-Bribery Policy', value: 'None on File', score: 4 },
        ],
        totalScore: 20,
      },
      { id: 'environmental', label: 'Environmental Risk Level', level: 'low', rows: [], totalScore: 0 },
      {
        id: 'human-rights', label: 'Human Right Risk Level', level: 'high',
        rows: [
          { property: 'Human Trafficking Indicators — Supply Chain', value: 'Flagged', score: 9 },
          { property: 'Forced Labour Risk — Cartel-Controlled Operations', value: 'Under Investigation', score: 7 },
        ],
        totalScore: 16,
      },
      {
        id: 'general', label: 'General Risk Level', level: 'high',
        rows: [
          { property: 'Third Party Service Type', value: 'Restaurant Chain / Distribution', score: 4 },
          { property: 'Suspected Front for Illegal Operations', value: 'Yes — Drug Distribution', score: 10 },
          { property: 'UBO Disclosure', value: 'Incomplete — Undisclosed Beneficial Owners', score: 6 },
          { property: 'Contract Value Known', value: 'Yes – >$10M', score: 4 },
        ],
        totalScore: 24,
      },
      {
        id: 'screening', label: 'Screening & Monitoring Risk Level', level: 'high',
        rows: [
          { property: 'Adverse Media Matches', value: '38 Potential Matches', score: 8 },
          { property: 'Sanctions Match — Juárez Cartel Associates', value: '3 Confirmed Matches', score: 7 },
          { property: 'PEP Match — Gustavo Fring', value: '1 Potential Match', score: 4 },
        ],
        totalScore: 19,
      },
      {
        id: 'cyber', label: 'Cyber Risk Level', level: 'medium',
        rows: [
          { property: 'Data Security Posture', value: 'Unknown — No Disclosure', score: 4 },
        ],
        totalScore: 4,
      },
    ],
    matchResults: [
      { count: 38, bg: '#E34C53', color: '#fff', label: 'Open (Pending Review)' },
      { count: 4, bg: '#13DF81', color: 'var(--text-normal)', label: 'Open (Investigation Under Review)' },
      { count: 0, bg: '#016F91', color: '#fff', label: 'Permanently Clear (Without Updates)' },
      { count: 3, bg: '#9A3438', color: '#fff', label: 'Confirmed (Matches)' },
      { count: 7, bg: '#F0C043', color: 'var(--text-normal)', label: 'Open (Pending Review)' },
    ],
    screeningResults: [
      { name: 'Gustavo Fring', type: 'CEO / Owner', level: 'high', redFlags: 'YES', categories: [{ type: 'pep', icon: 'person' }, { type: 'am', icon: 'entity' }, { type: 'sco', icon: 'person' }] },
      { name: 'Walter White', type: 'Former Contractor', level: 'high', redFlags: 'YES', categories: [{ type: 'san', icon: 'person' }, { type: 'brd', icon: 'person' }, { type: 'am', icon: 'entity' }] },
      { name: 'Mike Ehrmantraut', type: 'Head of Operations', level: 'high', redFlags: 'YES', categories: [{ type: 'soc', icon: 'entity' }, { type: 'am', icon: 'entity' }] },
      { name: 'Lydia Rodarte-Quayle', type: 'Logistics Manager', level: 'medium', redFlags: 'YES', categories: [{ type: 'ool', icon: 'person' }, { type: 'sco', icon: 'person' }] },
    ],
    redFlags: [
      { title: 'DEA Investigation — Active Methamphetamine Distribution', isLink: true, status: 'Open', riskCategory: 'Bribery & Corruption', property: '' },
      { title: 'Cartel Connections — Juárez Cartel / Don Eladio Vuente', isLink: true, status: 'Open', riskCategory: 'General', property: '' },
      { title: 'Money Laundering — Suspicious Cash Revenue Patterns', isLink: false, status: 'Open', riskCategory: 'Bribery & Corruption', property: '' },
      { title: 'Sanctions Match — Hector Salamanca (Cartel Associate)', isLink: true, status: 'Open', riskCategory: 'Screening and Monitoring', property: '' },
      { title: 'UBO Discrepancy — Madrigal Electromotive Undisclosed Link', isLink: false, status: 'In Progress', riskCategory: 'General', property: '' },
    ],
    processSummary: [
      { step: 'Onboarding', isLink: true, status: 'Completed', startDate: '1 Dec 2025', by: 'Lydia Rodarte-Quayle', date: '1 Dec 2025' },
      { step: 'Risk Assessment', isLink: true, status: 'Completed', startDate: '1 Dec 2025', by: 'Compliance Group', date: '10 Dec 2025' },
      { step: 'Internal Due Diligence', isLink: true, status: 'Completed', startDate: '10 Dec 2025', by: 'Compliance Group', date: '20 Dec 2025' },
      { step: 'External Due Diligence', isLink: true, status: 'In Progress', startDate: '20 Dec 2025', by: '', date: '' },
      { step: 'Enhanced Due Diligence Report', isLink: true, status: 'In Progress', startDate: '20 Jan 2026', by: '', date: '' },
      { step: 'Enhanced Due Diligence Report Review Task', isLink: true, status: 'Not Started', startDate: '', by: '', date: '' },
      { step: 'UBO', isLink: false, status: 'Action Required', startDate: '25 Jan 2026', by: '', date: '' },
      { step: 'Risk Mitigation', isLink: true, status: 'Action Required', startDate: '25 Jan 2026', by: '', date: '' },
      { step: 'Approval', isLink: true, status: 'Not Approved', startDate: '15 Apr 2026', by: 'Compliance Group', date: '15 Apr 2026' },
      { step: 'Screening and Monitoring', isLink: true, status: 'Action Required', startDate: '15 Apr 2026', by: '', date: '' },
    ],
  },
  riskMitigation: {
    openRisks: [
      { id: 1, title: 'DEA Investigation — Suspected Distribution Operations', owner: 'Tamara Knoetschke', status: 'Open', createdDate: '10 Jan 2026', lastEditedBy: '', dueDate: '', source: '', comments: 0 },
      { id: 2, title: 'Cartel Connections — Juárez Cartel Links', owner: 'Tamara Knoetschke', status: 'Open', createdDate: '15 Jan 2026', lastEditedBy: '', dueDate: '', source: '', comments: 0 },
      { id: 3, title: 'Money Laundering — Unusual Cash Flow Patterns', owner: 'Tamara Knoetschke', status: 'Open', createdDate: '18 Jan 2026', lastEditedBy: '', dueDate: '', source: '', comments: 0 },
      { id: 4, title: 'UBO Discrepancy — Undisclosed Beneficial Owners', owner: 'Tamara Knoetschke', status: 'Open', createdDate: '25 Jan 2026', lastEditedBy: '', dueDate: '', source: '', comments: 0 },
      { id: 5, title: 'Adverse Media — 38 Potential Matches', owner: 'Claudio Merino', status: 'Open', createdDate: '01 Feb 2026', lastEditedBy: '', dueDate: '', source: '', comments: 1 },
    ],
    mitigatedRisks: [],
    cancelledRisks: [],
  },
};
