import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { Sidebar } from './ProfilePage';
import Checkbox from '../ui/Checkbox';
import ProfilePageHeader from './ProfilePageHeader';
import styles from './profile.module.css';
import rmStyles from './ProfileRiskMitigation.module.css';
import { getFlow, setFlow, patchInitechProfile } from '../../utils/initechFlow';

function RiskTable({ rows, onMenuClick, onCheckOpen }) {
  const [checked, setChecked] = useState({});
  const allChecked = rows.length > 0 && rows.every(r => checked[r.id]);
  const someChecked = rows.some(r => checked[r.id]) && !allChecked;

  function toggleAll() {
    if (allChecked) setChecked({});
    else setChecked(Object.fromEntries(rows.map(r => [r.id, true])));
  }

  function handleCheck(row, val) {
    setChecked(p => ({ ...p, [row.id]: val }));
    if (onCheckOpen && val) onCheckOpen(row);
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
                onChange={e => handleCheck(row, e.target.checked)}
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

function Section({ title, rows, onMenuClick, onCheckOpen }) {
  return (
    <div className={rmStyles.section}>
      <h3 className={rmStyles.sectionTitle}>{title}</h3>
      {rows.length > 0
        ? <div className={rmStyles.tableWrap}><RiskTable rows={rows} onMenuClick={onMenuClick} onCheckOpen={onCheckOpen} /></div>
        : <EmptyRow message={`Currently no ${title}.`} />
      }
    </div>
  );
}

function ProtoModal({ onClose, onContinue }) {
  return (
    <motion.div
      className={styles.deleteModalOverlay}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.deleteModal}
        initial={{ scale: 0.92, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 10 }}
        transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.deleteModalHeader}>
          <span className={styles.deleteModalTitle}>Prototype Notice</span>
          <button className={styles.deleteModalClose} aria-label="Close" onClick={onClose} />
        </div>
        <div className={styles.deleteModalBody}>
          <p className={styles.deleteModalQuestion}>
            This is a prototype and not a real site.
          </p>
          <p className={styles.deleteModalConfirm}>
            Click <strong>Continue</strong> to simulate mitigating this risk.
          </p>
        </div>
        <div className={styles.deleteModalActions}>
          <button className={`${styles.deleteModalBtn} ${styles.deleteModalCancel}`} onClick={onClose}>Cancel</button>
          <button className={`${styles.deleteModalBtn} ${styles.deleteModalContinue}`} onClick={onContinue}>Continue</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProfileRiskMitigation() {
  const params = useParams();
  const rawProfile = profiles[params.profileId];

  const [tick, setTick] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  if (!rawProfile) return <div style={{ padding: 40, textAlign: 'center' }}>Profile not found</div>;

  const profile = patchInitechProfile(rawProfile);
  const { riskMitigated } = getFlow();

  const baseRm = rawProfile.riskMitigation || { openRisks: [], mitigatedRisks: [], cancelledRisks: [] };
  const rm = riskMitigated
    ? {
        openRisks: [],
        mitigatedRisks: [...baseRm.mitigatedRisks, ...baseRm.openRisks.map(r => ({ ...r, status: 'Mitigated' }))],
        cancelledRisks: baseRm.cancelledRisks,
      }
    : baseRm;

  const [menuOpen, setMenuOpen] = useState(null);

  function handleMenuClick(row) {
    setMenuOpen(menuOpen?.id === row.id ? null : row);
  }

  function handleCheckOpen() {
    if (profile.id === 'initech') setModalOpen(true);
  }

  function handleMitigate() {
    setFlow({ riskMitigated: true });
    setModalOpen(false);
    setTick(t => t + 1);
  }

  return (
    <PageLayout>
      <Breadcrumb items={[
        { label: 'Third Parties', to: '/third-parties' },
        { label: rawProfile.name },
      ]} />

      <ProfilePageHeader profile={rawProfile} />

      <div className={styles.pageBody}>
        <Sidebar profile={rawProfile} activePage="risk-mitigation" />

        <main className={styles.mainContent}>
          <section className={rmStyles.card}>

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

            {rm.openRisks.length > 0 && (
              <div className={rmStyles.warningBanner}>
                <span className="material-icons-outlined" style={{ fontSize: 18, flexShrink: 0 }}>error</span>
                <span>
                  You have open risks, all 'Open'/'In Progress' risks need to be 'Mitigated Risks' (Completed) or 'Open Risks' with a status of 'Post Approval' before approval will be available to start.
                </span>
              </div>
            )}

            <div className={rmStyles.sectionsWrap}>
              <Section title="Open Risks" rows={rm.openRisks} onMenuClick={handleMenuClick} onCheckOpen={handleCheckOpen} />
              <Section title="Mitigated Risks" rows={rm.mitigatedRisks} onMenuClick={handleMenuClick} />
              <Section title="Cancelled Risks" rows={rm.cancelledRisks} onMenuClick={handleMenuClick} />
            </div>
          </section>
        </main>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <ProtoModal
            key="proto-modal"
            onClose={() => setModalOpen(false)}
            onContinue={handleMitigate}
          />
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
