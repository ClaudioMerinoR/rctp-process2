import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Breadcrumb from '../components/layout/Breadcrumb';
import styles from './Settings.module.css';

const SIDEBAR_ITEMS = {
  General: [
    'Currency & Approval Groups',
    'Duplication',
    'Risk Scoring Settings',
    'Red Flags',
    'Mitigation Measures',
    'Approvals',
    'Renewals',
    'Notifications',
    'Lists',
    'Private Lists',
    'Screening & Monitoring',
  ],
  Process: [
    'Workflow',
    'Stages',
    'Task Templates',
    'Escalation Rules',
    'SLA Settings',
  ],
};

const ROWS = [
  { version: 47, createdBy: 'Claudio Merino', createdDate: '11 Feb 2025', modifiedBy: 'Claudio Merino', modifiedDate: '11 Feb 2025', published: true },
  { version: 46, createdBy: 'Claudio Merino', createdDate: '11 Feb 2025', modifiedBy: 'Claudio Merino', modifiedDate: '11 Feb 2025', published: false },
  { version: 45, createdBy: 'Claudio Merino', createdDate: '03 Feb 2025', modifiedBy: 'Claudio Merino', modifiedDate: '03 Feb 2025', published: true },
  { version: 44, createdBy: 'Claudio Merino', createdDate: '03 Feb 2025', modifiedBy: 'Claudio Merino', modifiedDate: '03 Feb 2025', published: false },
  { version: 43, createdBy: 'Claudio Merino', createdDate: '03 Feb 2025', modifiedBy: 'Claudio Merino', modifiedDate: '03 Feb 2025', published: false },
  { version: 42, createdBy: 'Claudio Merino', createdDate: '03 Feb 2025', modifiedBy: 'Claudio Merino', modifiedDate: '03 Feb 2025', published: true },
  { version: 41, createdBy: 'Claudio Merino', createdDate: '03 Feb 2025', modifiedBy: 'Claudio Merino', modifiedDate: '03 Feb 2025', published: false },
  { version: 40, createdBy: 'Claudio Merino', createdDate: '03 Feb 2025', modifiedBy: 'Claudio Merino', modifiedDate: '03 Feb 2025', published: false },
  { version: 39, createdBy: 'Claudio Merino', createdDate: '30 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '30 Jan 2025', published: true },
  { version: 38, createdBy: 'Claudio Merino', createdDate: '30 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '30 Jan 2025', published: false },
  { version: 37, createdBy: 'Claudio Merino', createdDate: '30 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '30 Jan 2025', published: false },
  { version: 36, createdBy: 'Claudio Merino', createdDate: '30 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '30 Jan 2025', published: true },
  { version: 35, createdBy: 'Claudio Merino', createdDate: '29 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '29 Jan 2025', published: false },
  { version: 34, createdBy: 'Claudio Merino', createdDate: '29 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '29 Jan 2025', published: false },
  { version: 33, createdBy: 'Claudio Merino', createdDate: '21 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '21 Jan 2025', published: true },
  { version: 32, createdBy: 'Claudio Merino', createdDate: '21 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '21 Jan 2025', published: false },
  { version: 31, createdBy: 'Claudio Merino', createdDate: '21 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '21 Jan 2025', published: false },
  { version: 30, createdBy: 'Claudio Merino', createdDate: '21 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '21 Jan 2025', published: false },
  { version: 29, createdBy: 'Claudio Merino', createdDate: '13 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '13 Jan 2025', published: true },
  { version: 28, createdBy: 'Claudio Merino', createdDate: '13 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '13 Jan 2025', published: false },
  { version: 27, createdBy: 'Claudio Merino', createdDate: '13 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '13 Jan 2025', published: false },
  { version: 26, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: true },
  { version: 25, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: false },
  { version: 24, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: false },
  { version: 23, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: false },
  { version: 22, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: false },
  { version: 21, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: false },
  { version: 20, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: true },
  { version: 19, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: false },
  { version: 18, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: false },
  { version: 17, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: false },
  { version: 16, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: false },
  { version: 15, createdBy: 'Claudio Merino', createdDate: '09 Jan 2025', modifiedBy: 'Claudio Merino', modifiedDate: '09 Jan 2025', published: false },
  { version: 14, createdBy: 'Claudio Merino', createdDate: '18 Dec 2024', modifiedBy: 'Claudio Merino', modifiedDate: '18 Dec 2024', published: true },
  { version: 13, createdBy: 'Claudio Merino', createdDate: '18 Dec 2024', modifiedBy: 'Claudio Merino', modifiedDate: '18 Dec 2024', published: false },
  { version: 12, createdBy: 'Claudio Merino', createdDate: '16 Dec 2024', modifiedBy: 'Claudio Merino', modifiedDate: '18 Dec 2024', published: false },
  { version: 11, createdBy: 'Claudio Merino', createdDate: '16 Dec 2024', modifiedBy: 'Claudio Merino', modifiedDate: '18 Dec 2024', published: true },
  { version: 10, createdBy: 'Claudio Merino', createdDate: '16 Dec 2024', modifiedBy: 'Claudio Merino', modifiedDate: '18 Dec 2024', published: false },
  { version: 9,  createdBy: 'Claudio Merino', createdDate: '16 Dec 2024', modifiedBy: 'Claudio Merino', modifiedDate: '18 Dec 2024', published: false },
  { version: 8,  createdBy: 'Claudio Merino', createdDate: '16 Dec 2024', modifiedBy: 'Claudio Merino', modifiedDate: '16 Dec 2024', published: false },
  { version: 7,  createdBy: 'Claudio Merino', createdDate: '16 Dec 2024', modifiedBy: 'Claudio Merino', modifiedDate: '16 Dec 2024', published: true },
  { version: 6,  createdBy: 'Claudio Merino', createdDate: '16 Dec 2024', modifiedBy: 'Claudio Merino', modifiedDate: '16 Dec 2024', published: false },
  { version: 5,  createdBy: 'Claudio Merino', createdDate: '12 Dec 2024', modifiedBy: 'Claudio Merino', modifiedDate: '12 Dec 2024', published: false },
  { version: 4,  createdBy: 'Barry Marbles',  createdDate: '05 Dec 2022', modifiedBy: 'Barry Marbles',  modifiedDate: '05 Dec 2022', published: true },
  { version: 3,  createdBy: 'Barry Marbles',  createdDate: '05 Dec 2022', modifiedBy: 'Barry Marbles',  modifiedDate: '05 Dec 2022', published: false },
  { version: 2,  createdBy: 'Barry Marbles',  createdDate: '05 Dec 2022', modifiedBy: 'Barry Marbles',  modifiedDate: '05 Dec 2022', published: false },
  { version: 1,  createdBy: 'System',         createdDate: '05 Dec 2022', modifiedBy: 'System',         modifiedDate: '05 Dec 2022', published: false },
];

export default function Settings() {
  const navigate = useNavigate();
  const [activeTopTab, setActiveTopTab] = useState('General');
  const [activeNav, setActiveNav] = useState('Renewals');

  function handleTopTabChange(tab) {
    setActiveTopTab(tab);
    setActiveNav(SIDEBAR_ITEMS[tab][0]);
  }
  const [renewalsEnabled, setRenewalsEnabled] = useState(true);

  return (
    <PageLayout>
      <Breadcrumb
        items={[
          { label: 'Settings', to: '/settings' },
          { label: activeTopTab },
          { label: activeNav },
        ]}
      />

      {/* Top tabs */}
      <div className={styles.topTabsBar} role="tablist">
        {Object.keys(SIDEBAR_ITEMS).map(tab => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTopTab === tab}
            className={`${styles.topTab}${activeTopTab === tab ? ' ' + styles.topTabActive : ''}`}
            onClick={() => handleTopTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.sectionGap} />

      {/* Two-column layout */}
      <div className={styles.adminLayout}>

        {/* Left sidebar nav */}
        <nav className={styles.adminNav}>
          {SIDEBAR_ITEMS[activeTopTab].map(item => (
            <button
              key={item}
              className={`${styles.adminNavItem}${activeNav === item ? ' ' + styles.adminNavItemActive : ''}`}
              onClick={() => setActiveNav(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Right content card */}
        <div className={styles.adminContent}>

          {/* Content header */}
          <div className={styles.contentHeader}>
            <h2 className={styles.contentTitle}>Renewals</h2>
            <div className={styles.contentHeaderRight}>
              <span className={styles.renewalsStateLabel}>Renewals current state</span>
              <span className={`material-icons-outlined ${styles.infoIcon}`}>info</span>
              <div
                className={`${styles.activeToggle}${!renewalsEnabled ? ' ' + styles.activeToggleOff : ''}`}
                onClick={() => setRenewalsEnabled(v => !v)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setRenewalsEnabled(v => !v)}
              >
                <div className={styles.activeToggleTrack}>{renewalsEnabled ? 'Enabled' : 'Disabled'}</div>
                <div className={styles.activeToggleThumb} />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Version</th>
                  <th>Created By</th>
                  <th>Created Date</th>
                  <th>Last Modified By</th>
                  <th>Last Modified Date</th>
                  <th className={styles.thCenter}>Saved/Published</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(row => (
                  <tr key={row.version}>
                    <td>{row.version}</td>
                    <td>{row.createdBy}</td>
                    <td>{row.createdDate}</td>
                    <td>{row.modifiedBy}</td>
                    <td>{row.modifiedDate}</td>
                    <td className={styles.tdCenter}>
                      <span className={`${styles.statusDot}${row.published ? ' ' + styles.statusDotPublished : ''}`} />
                    </td>
                    <td>
                      <button className={styles.actionBtn} onClick={() => navigate(`/settings/renewals/${row.version}/edit`)}>
                        <span className="material-icons-outlined">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
