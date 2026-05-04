import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { Sidebar } from './ProfilePage';
import Checkbox from '../ui/Checkbox';
import styles from './profile.module.css';
import rmStyles from './ProfileRiskMitigation.module.css';

function RiskTable({ rows, onMenuClick }) {
  const [checked, setChecked] = useState({});
  const allChecked = rows.length > 0 && rows.every(r => checked[r.id]);
  const someChecked = rows.some(r => checked[r.id]) && !allChecked;

  function toggleAll() {
    if (allChecked) setChecked({});
    else setChecked(Object.fromEntries(rows.map(r => [r.id, true])));
  }

  return (
    <table className={styles.table} style={{ minWidth: 0 }}>
      <thead>
        <tr>
          <th style={{ width: 36 }}>
            <Checkbox checked={allChecked} indeterminate={someChecked} onChange={toggleAll} />
          </th>
          <th>Title</th>
          <th>Owner</th>
          <th>Status</th>
          <th>Created Date</th>
          <th>Last Edited By</th>
          <th>Due Date</th>
          <th>Source</th>
          <th style={{ width: 72 }}></th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.id} className={checked[row.id] ? rmStyles.rowSelected : ''}>
            <td>
              <Checkbox
                checked={!!checked[row.id]}
                onChange={e => setChecked(p => ({ ...p, [row.id]: e.target.checked }))}
              />
            </td>
            <td className={styles.cellLink}>{row.title}</td>
            <td>{row.owner || '—'}</td>
            <td>{row.status || '—'}</td>
            <td>{row.createdDate || '—'}</td>
            <td>{row.lastEditedBy || '—'}</td>
            <td>{row.dueDate || '—'}</td>
            <td>{row.source || '—'}</td>
            <td className={rmStyles.actionsCell}>
              <button className={rmStyles.iconBtn} onClick={() => onMenuClick(row)}>
                <span className="material-icons-outlined" style={{ fontSize: 18 }}>more_vert</span>
              </button>
              <button className={rmStyles.iconBtn}>
                <span className="material-icons-outlined" style={{ fontSize: 18 }}>
                  {row.comments > 0 ? 'mark_chat_read' : 'chat_bubble_outline'}
                </span>
                {row.comments > 0 && <span className={rmStyles.commentBadge}>{row.comments}</span>}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function EmptyRow({ message }) {
  return (
    <div className={rmStyles.emptyRow}>
      <span className="material-icons-outlined" style={{ fontSize: 16, flexShrink: 0 }}>info</span>
      {message}
    </div>
  );
}

function Section({ title, rows, onMenuClick }) {
  return (
    <div className={rmStyles.section}>
      <h3 className={rmStyles.sectionTitle}>{title}</h3>
      {rows.length > 0
        ? <div className={rmStyles.tableWrap}><RiskTable rows={rows} onMenuClick={onMenuClick} /></div>
        : <EmptyRow message={`Currently no ${title}.`} />
      }
    </div>
  );
}

export default function ProfileRiskMitigation() {
  const params = useParams();
  const profile = profiles[params.profileId];

  if (!profile) return <div style={{ padding: 40, textAlign: 'center' }}>Profile not found</div>;

  const rm = profile.riskMitigation || { openRisks: [], mitigatedRisks: [], cancelledRisks: [] };
  const hasOpenRisks = rm.openRisks.length > 0;
  const riskMitigationDot = profile.sidebarSteps?.find(s => s.label === 'Risk Mitigation')?.dot;
  const isCompleted = riskMitigationDot === 'green';

  const [menuOpen, setMenuOpen] = useState(null);

  const riskLevelCls = profile.riskLevel.level === 'high' ? ' ' + styles.tpTopStripHigh
    : profile.riskLevel.level === 'medium' ? ' ' + styles.tpTopStripMedium
    : profile.riskLevel.level === 'low' ? ' ' + styles.tpTopStripLow : '';

  function handleMenuClick(row) {
    setMenuOpen(menuOpen?.id === row.id ? null : row);
  }

  return (
    <PageLayout>
      <Breadcrumb items={[
        { label: 'Third Parties', to: '/third-parties' },
        { label: profile.name },
      ]} />

      <div className={`${styles.tpTopStrip}${riskLevelCls}`}>
        <div className={styles.tpPageHeader}>
          <Link to={`/profile/${profile.id}`} className={styles.tpBack}>
            <span className="material-icons-outlined">chevron_left</span> Back
          </Link>
          <div className={styles.tpTitleRow}>
            <div className={styles.tpNameGroup}>
              <h1>{profile.name}</h1>
              <span className={styles.tpVerified}>
                <span className="material-icons-outlined">verified</span>
                {profile.verifiedText}
              </span>
            </div>
            <div className={styles.tpBadges}>
              <div className={styles.tpBadgeGroup}>
                <div className={styles.tpBadgeLabel}>Current status:</div>
                <div className={`${styles.badge} ${styles.badgePending} ${styles.badgeBtn}`}>
                  {profile.currentStatus.label}
                </div>
              </div>
              <div className={styles.tpBadgeGroup}>
                <div className={styles.tpBadgeLabel}>Risk level:</div>
                <div className={`${styles.badge} ${styles['badge' + profile.riskLevel.level.charAt(0).toUpperCase() + profile.riskLevel.level.slice(1)]} ${styles.badgeBtn}`}>
                  {profile.riskLevel.label}
                  <span className="material-icons-outlined" style={{ fontSize: 16 }}>{profile.riskLevel.icon}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.pageBody}>
        <Sidebar profile={profile} activePage="risk-mitigation" />

        <main className={styles.mainContent}>
          <section className={rmStyles.card}>

            {/* Header */}
            <div className={`${styles.cardHeader} ${rmStyles.cardHeader}`}>
              <div className={rmStyles.cardTitleRow}>
                <h2 className={styles.cardTitle}>Risk Mitigation</h2>
                <span className="material-icons-outlined" style={{ fontSize: 18, color: 'var(--text-light)', cursor: 'pointer' }}>info</span>
              </div>
              <button className={`${styles.btn} ${styles.btnFilled} ${rmStyles.createBtn}`}>
                Create New Risk
                <span className="material-icons-outlined" style={{ fontSize: 16 }}>arrow_drop_down</span>
              </button>
            </div>

            {/* Warning banner — only when there are open risks */}
            {hasOpenRisks && !isCompleted && (
              <div className={rmStyles.warningBanner}>
                <span className="material-icons-outlined" style={{ fontSize: 18, flexShrink: 0 }}>error</span>
                <span>
                  You have open risks, all 'Open'/'In Progress' risks need to be 'Mitigated Risks' (Completed) or 'Open Risks' with a status of 'Post Approval' before approval will be available to start.
                </span>
              </div>
            )}

            <div className={rmStyles.sectionsWrap}>
              <Section title="Open Risks" rows={rm.openRisks} onMenuClick={handleMenuClick} />
              <Section title="Mitigated Risks" rows={rm.mitigatedRisks} onMenuClick={handleMenuClick} />
              <Section title="Cancelled Risks" rows={rm.cancelledRisks} onMenuClick={handleMenuClick} />
            </div>
          </section>
        </main>
      </div>
    </PageLayout>
  );
}
