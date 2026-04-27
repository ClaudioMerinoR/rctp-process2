import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import PageLayout from '../components/layout/PageLayout';
import Breadcrumb from '../components/layout/Breadcrumb';
import { ROLES_DATA } from './CompanyAdmin';
import Checkbox from '../components/ui/Checkbox';
import styles from './RoleDetails.module.css';

const PERMISSION_TABS = ['Dashboard', 'Third parties', 'Employees', 'Risk Search', 'Company Admin', 'Settings', 'Reports'];

const PERMISSIONS_BY_TAB = {
  Dashboard: [
    { name: 'Dashboard',                                view: true,  export: false },
    { name: 'Screening & Monitoring Dashboard',          view: true,  export: true  },
    { name: 'Enhanced Due Diligence Reports Dashboard',  view: true,  export: true  },
    { name: 'Screening & Monitoring Tasks Dashboard',    view: true,  export: false },
  ],
  Employees: [
    { name: 'Employee List',           view: true,  export: true  },
    { name: 'Employee Profile',        view: true,  export: false },
  ],
  'Risk Search': [
    { name: 'Risk Search',             view: true,  export: false },
    { name: 'Risk Report',             view: true,  export: true  },
  ],
  'Company Admin': [
    { name: 'Third Party Details',     view: true,  export: false },
    { name: 'Roles',                   view: true,  export: false },
    { name: 'Company Admin Settings',  view: true,  export: false },
  ],
  Settings: [
    { name: 'General Settings',        view: true,  export: false },
    { name: 'Process Settings',        view: true,  export: false },
    { name: 'Renewals',                view: true,  export: true  },
  ],
  Reports: [
    { name: 'Reports Dashboard',       view: true,  export: true  },
    { name: 'Custom Reports',          view: true,  export: false },
  ],
};

// Third parties tab — accordion sections, each with its own columns
const THIRD_PARTIES_SECTIONS = [
  {
    title: 'General',
    cols: ['View', 'Edit', 'Create', 'Delete', 'Export'],
    rows: [
      { name: 'Third Parties',                    perms: [true,  true,  false, false, true ] },
      { name: 'Third Party Owner',                perms: [true,  true,  false, false, false] },
      { name: 'Business Unit',                    perms: [true,  false, false, false, false] },
      { name: 'Active / Inactive',                perms: [true,  true,  false, false, false] },
      { name: 'Tags',                             perms: [true,  true,  false, false, false] },
      { name: 'Third Party Expiry Date',          perms: [true,  true,  false, false, false] },
      { name: 'Expiry Date Rationale',            perms: [true,  true,  false, false, false] },
      { name: 'Screening & Monitoring Policy',    perms: [true,  false, false, false, false] },
      { name: 'Pre-Onboarding Entity Verification', perms: [true, false, false, false, false] },
    ],
  },
  {
    title: 'Current Risk Level',
    cols: ['View', 'Edit', 'Reassign'],
    rows: [
      { name: 'Current Risk Level',               perms: [true,  false, false] },
      { name: 'Current Risk Level Detail & Amend', perms: [true,  true,  true ] },
    ],
  },
  {
    title: 'Current Risk Status',
    cols: ['View', 'Edit'],
    rows: [
      { name: 'Current Risk Status',              perms: [true,  false] },
      { name: 'Allow Mid Process Decline',        perms: [false, true ] },
      { name: 'View Mid Process Decline Reason',  perms: [true,  false] },
    ],
  },
  {
    title: 'Standard RCTP',
    cols: null, // separator only
    rows: [],
    isSeparator: true,
  },
  {
    title: 'Process Section',
    cols: ['View', 'Start', 'Admin/Re-Assign', 'Re-Send/Write', 'View History', 'Cancel', 'Skip'],
    rows: [
      { name: 'Onboarding',                       perms: [true,  true,  false, false, true,  true,  false] },
      { name: 'Risk Assessment',                  perms: [true,  true,  true,  false, false, true,  false] },
      { name: 'Due Diligence',                    perms: [true,  true,  false, false, false, false, false], expandable: true },
      { name: 'Enhanced Due Diligence Reports',   perms: [true,  true,  false, true,  false, false, false], indent: true },
      { name: 'Enhanced Due Diligence Report Review Task', perms: [true, false, true, false, false, false, false], indent: true },
      { name: 'Integrity Check',                  perms: [true,  true,  false, false, false, true,  false], indent: true },
      { name: 'UBO',                              perms: [true,  true,  false, false, false, true,  false], indent: true },
      { name: 'Risk Mitigation',                  perms: [true,  true,  true,  false, false, true,  false], indent: true },
      { name: 'Red Flag Cancellation Request Task', perms: [true, false, false, true, false, false, false], indent: true },
    ],
  },
  {
    title: 'Approval',
    cols: ['View', 'Start', 'Admin/Re-Assign', 'View History', 'Cancel'],
    rows: [
      { name: 'Approval',                         perms: [true,  true,  true,  true,  true ] },
    ],
  },
  {
    title: 'Screening & Monitoring',
    cols: ['View', 'Edit', 'Create', 'Delete', 'Reassign'],
    rows: [
      { name: 'Active/Inactive',                  perms: [true,  true,  false, false, false] },
      { name: 'Association',                      perms: [true,  true,  true,  true,  false] },
      { name: 'View Association Category',        perms: [true,  false, false, false, false] },
      { name: 'Remediate',                        perms: [true,  false, false, false, true ] },
      { name: 'Monitoring Alert Bell',            perms: [true,  true,  false, false, false] },
    ],
  },
  {
    title: 'Entity Verification',
    cols: ['Start'],
    rows: [
      { name: 'Post-Onboarding Entity Verification', perms: [true] },
    ],
  },
  {
    title: 'Properties',
    cols: ['View', 'Edit'],
    rows: [
      { name: 'Properties',                       perms: [true,  true ] },
    ],
  },
  {
    title: 'Documents',
    cols: ['View', 'Export'],
    rows: [
      { name: 'Documents',                        perms: [false, false] },
    ],
  },
  {
    title: 'Audit',
    cols: ['View'],
    rows: [
      { name: 'Audit',                            perms: [true ] },
      { name: 'Print',                            perms: [true ] },
    ],
  },
  {
    title: 'Bulk Import',
    cols: ['View'],
    rows: [
      { name: 'Bulk Import',                      perms: [true ] },
    ],
  },
];

export default function RoleDetails() {
  const navigate = useNavigate();
  const { roleIndex } = useParams();
  const role = ROLES_DATA[parseInt(roleIndex, 10)] || ROLES_DATA[0];

  const [activeTab, setActiveTab] = useState('Dashboard');
  const [openSections, setOpenSections] = useState(() => {
    const init = {};
    THIRD_PARTIES_SECTIONS.forEach(s => { init[s.title] = true; });
    return init;
  });

  function toggleSection(title) {
    setOpenSections(prev => ({ ...prev, [title]: !prev[title] }));
  }

  const rows = PERMISSIONS_BY_TAB[activeTab] || [];

  return (
    <PageLayout>
      <Breadcrumb
        items={[
          { label: 'Company Admin', to: '/company-admin/roles' },
          { label: 'Roles', to: '/company-admin/roles' },
          { label: role.name },
        ]}
      />

      {/* Header card */}
      <div className={styles.headerCard}>
        <div className={styles.titleRow}>
          <div className={styles.titleGroup}>
            <h1 className={styles.pageTitle}>View Company Role</h1>
            <span className={`material-icons-outlined ${styles.titleIcon}`}>info</span>
          </div>
          <div className={styles.headerActions}>
            <button className={`${styles.btn} ${styles.btnOutline}`} onClick={() => navigate('/company-admin/roles')}>
              Back
            </button>
            <button className={`${styles.btn} ${styles.btnFilled}`}>
              Edit
            </button>
          </div>
        </div>

        <div className={styles.fieldsRow}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Role Name <span className={styles.required}>*</span></label>
            <input className={styles.fieldInput} value={role.name} readOnly />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Description <span className={styles.required}>*</span></label>
            <input className={styles.fieldInput} value={role.description} readOnly />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Business unit restricted by:</label>
            <div className={styles.checkboxRow}>
              <label className={styles.checkboxLabel}>
                <Checkbox checked={false} onChange={() => {}} />
                Third parties
              </label>
              <label className={styles.checkboxLabel}>
                <Checkbox checked={false} onChange={() => {}} />
                Employees
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.gap} />

      {/* Tab bar */}
      <div className={styles.tabBar}>
        <div className={styles.tabs}>
          {PERMISSION_TABS.map(tab => (
            <div
              key={tab}
              className={`${styles.tab}${activeTab === tab ? ' ' + styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
              style={{ position: 'relative' }}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="role-tab-indicator"
                  className={styles.tabIndicator}
                  transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.gap} />

      {/* Permissions table */}
      {activeTab === 'Third parties' ? (
        <div className={styles.tableCard}>
          {THIRD_PARTIES_SECTIONS.map(section => {
            if (section.isSeparator) {
              return (
                <div key={section.title} className={styles.sectionSeparator}>
                  {section.title}
                </div>
              );
            }
            const isOpen = openSections[section.title];
            return (
              <div key={section.title} className={styles.accordionSection}>
                <div className={styles.accordionHeader} onClick={() => toggleSection(section.title)}>
                  <span className={styles.accordionTitle}>{section.title}</span>
                  <span className={`material-icons-outlined ${styles.accordionChevron}${isOpen ? ' ' + styles.accordionChevronOpen : ''}`}>
                    expand_more
                  </span>
                </div>
                {isOpen && (
                  <div className={styles.tableWrap}>
                    <table className={styles.table} style={{ minWidth: 0 }}>
                      <thead>
                        <tr>
                          <th className={styles.thName}>Name</th>
                          {section.cols.map(col => (
                            <th key={col} className={styles.thPerm}>{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.rows.map((r, i) => (
                          <tr key={i}>
                            <td className={styles.tdName}>
                              <div className={`${styles.tdNameInner}${r.indent ? ' ' + styles.tdNameIndent : ''}`}>
                                {r.indent && <span className={styles.indentBar} />}
                                {r.name}
                                <span className={`material-icons-outlined ${styles.rowInfoIcon}`}>info</span>
                              </div>
                            </td>
                            {r.perms.map((val, j) => (
                              <td key={j} className={styles.tdPerm}>
                                <Checkbox checked={val} disabled onChange={() => {}} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.tableCard}>
          <div className={styles.tableWrap}>
            <table className={styles.table} style={{ minWidth: 0 }}>
              <thead>
                <tr>
                  <th className={styles.thName}>Name</th>
                  <th className={styles.thPerm}>View</th>
                  <th className={styles.thPerm}>Export</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td className={styles.tdName}>
                      <div className={styles.tdNameInner}>
                        {r.name}
                        <span className={`material-icons-outlined ${styles.rowInfoIcon}`}>info</span>
                      </div>
                    </td>
                    <td className={styles.tdPerm}>
                      <Checkbox checked={r.view} disabled onChange={() => {}} />
                    </td>
                    <td className={styles.tdPerm}>
                      <Checkbox checked={r.export} disabled onChange={() => {}} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className={styles.gap} />
    </PageLayout>
  );
}

