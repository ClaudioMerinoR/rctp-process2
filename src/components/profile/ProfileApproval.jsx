import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { Sidebar } from './ProfilePage';
import ProfilePageHeader from './ProfilePageHeader';
import styles from './profile.module.css';
import apStyles from './ProfileApproval.module.css';
import { getFlow, setFlow, getDMFlow, setDMFlow, getLumonFlow, setLumonFlow, patchInitechProfile } from '../../utils/initechFlow';

const STEPS_BEFORE_APPROVAL = [
  'Risk Assessment',
  'Due Diligence',
  'Integrity Check',
  'Enhanced Due Diligence Reports',
  'UBO',
  'Risk Mitigation',
];

function ApprovalRowMenu({ onApprove }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className={apStyles.menuWrap} ref={ref}>
      <button className={apStyles.playBtn} onClick={() => setOpen(o => !o)}>
        <span className="material-icons-outlined" style={{ fontSize: 18 }}>more_vert</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className={apStyles.menuDropdown}
            initial={{ opacity: 0, scale: 0.92, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -4 }}
            transition={{ duration: 0.15 }}
            style={{ transformOrigin: 'top right' }}
          >
            <button
              className={apStyles.menuItem}
              onClick={() => { setOpen(false); onApprove(); }}
            >
              <span className="material-icons-outlined" style={{ fontSize: 16 }}>check_circle</span>
              Approve
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProfileApproval() {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const rawProfile = profiles[profileId];
  const [tick, setTick] = useState(0);
  const [blockerOpen, setBlockerOpen] = useState(true);

  if (!rawProfile) return <div style={{ padding: 40, textAlign: 'center' }}>Profile not found</div>;

  const profile = patchInitechProfile(rawProfile);

  const isDM    = profileId === 'dundermifflin';
  const isLumon = profileId === 'lumon';
  const { riskMitigated, approved: initechApproved } = getFlow();
  const { renewed: dmRenewed,    approved: dmApproved    } = getDMFlow();
  const { renewed: lumonRenewed, approved: lumonApproved } = getLumonFlow();

  const approvalDot = profile.sidebarSteps?.find(s => s.label === 'Approval')?.dot;
  const isCompleted = approvalDot === 'green';
  const isReady = isDM    ? (dmRenewed    && !dmApproved)
    : isLumon  ? (lumonRenewed && !lumonApproved)
    : approvalDot === 'amber';

  const blockedSteps = isCompleted ? [] : (profile.sidebarSteps || [])
    .filter(s => STEPS_BEFORE_APPROVAL.includes(s.label) && s.dot !== 'green' && s.dot !== 'grey');

  const ap = rawProfile.approval || {};
  const tpOwner = rawProfile.overviewFields?.find(f => f.label === 'Third Party Owner')?.value || '—';

  function handleApprove() {
    if (isDM)        setDMFlow({ approved: true });
    else if (isLumon) setLumonFlow({ approved: true });
    else             setFlow({ approved: true });
    navigate(`/profile/${profileId}`);
  }

  return (
    <PageLayout>
      <Breadcrumb items={[
        { label: 'Third Parties', to: '/third-parties' },
        { label: rawProfile.name },
      ]} />

      <ProfilePageHeader profile={rawProfile} />

      <div className={styles.pageBody}>
        <Sidebar profile={rawProfile} />

        <main className={styles.mainContent}>
          <section className={apStyles.card}>

            <div className={`${styles.cardHeader} ${apStyles.cardHeader}`}>
              <h2 className={styles.cardTitle}>Approval</h2>
            </div>

            {!isCompleted && blockedSteps.length > 0 && (
              <div className={apStyles.blocker}>
                <div className={apStyles.blockerHeader} onClick={() => setBlockerOpen(o => !o)}>
                  <span className="material-icons-outlined" style={{ fontSize: 16, flexShrink: 0 }}>error</span>
                  <span className={apStyles.blockerTitle}>Approval cannot proceed for the following :</span>
                  <span className={`material-icons-outlined ${apStyles.blockerChevron} ${blockerOpen ? apStyles.blockerChevronOpen : ''}`} style={{ fontSize: 18, marginLeft: 'auto' }}>
                    expand_more
                  </span>
                </div>
                {blockerOpen && (
                  <div className={apStyles.blockerList}>
                    {blockedSteps.map((step, i) => (
                      <div key={i} className={apStyles.blockerItem}>
                        {step.label} has not been Completed.
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className={apStyles.tableWrap}>
              <table className={styles.table} style={{ minWidth: 0 }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Owner</th>
                    <th>Start Date</th>
                    <th>Completed Date</th>
                    <th>Cancelled Date</th>
                    <th style={{ width: 48 }}></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Approval</td>
                    <td>{ap.owner || tpOwner}</td>
                    <td>{ap.startDate || '—'}</td>
                    <td>{isCompleted ? ap.completedDate || '—' : '—'}</td>
                    <td>{ap.cancelledDate || '—'}</td>
                    <td style={{ textAlign: 'center' }}>
                      {(isReady || isCompleted) && (
                        <ApprovalRowMenu onApprove={handleApprove} />
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </section>
        </main>
      </div>
    </PageLayout>
  );
}
