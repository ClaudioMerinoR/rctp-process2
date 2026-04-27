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
  'Third parties': [
    { name: 'Third Party List',        view: true,  export: true  },
    { name: 'Third Party Profile',     view: true,  export: false },
    { name: 'Add Third Party',         view: true,  export: false },
    { name: 'Third Party Documents',   view: true,  export: true  },
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

export default function RoleDetails() {
  const navigate = useNavigate();
  const { roleIndex } = useParams();
  const role = ROLES_DATA[parseInt(roleIndex, 10)] || ROLES_DATA[0];

  const [activeTab, setActiveTab] = useState('Dashboard');

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
                    {r.name}
                    <span className={`material-icons-outlined ${styles.rowInfoIcon}`}>info</span>
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

      <div className={styles.gap} />
    </PageLayout>
  );
}

