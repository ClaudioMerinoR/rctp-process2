import { Link, useLocation } from 'react-router-dom';
import { patchInitechProfile } from '../../utils/initechFlow';
import { PARTNER_ICONS } from './profileAssets';
import styles from './profile.module.css';

const DOT_LABELS = {
  green:   'Complete',
  amber:   'Required — In Progress',
  red:     'Required — Not Started',
  grey:    'Not Required',
  blocked: 'Blocked by another activity',
};

const STEP_STATUS_LABEL = {
  green:   'Completed',
  amber:   'In Progress',
  red:     'Not Started',
  grey:    'Not Required',
  blocked: 'Blocked',
  black:   'Pending',
};

function PartnerIcon({ partner, tooltip }) {
  const img = PARTNER_ICONS[partner];
  if (!img) return null;
  const icon = (
    <span className={styles.navPartnerIcon}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7.5" fill="white" stroke="#B1BCC5" />
      </svg>
      <img src={img} alt="" />
    </span>
  );
  if (tooltip) {
    return (
      <span className={styles.navPartnerIconWrap}>
        {icon}
        <span className={styles.navTooltip}>{tooltip}</span>
      </span>
    );
  }
  return icon;
}

function effectiveDotFor(step, profileLoading) {
  if (!profileLoading) return step.dot;
  if (step.label === 'Approval') return 'red';
  if (step.label === 'Risk Mitigation') return 'green';
  if (step.label === 'Due Diligence') return 'black';
  if (step.partner === 'ubo') return 'grey';
  return step.dot;
}

export default function Sidebar({ profile: profileProp, profileLoading = false }) {
  const profile = patchInitechProfile(profileProp);
  const location = useLocation();
  const currentPath = location.pathname;

  const summaryPath = `/profile/${profile.id}`;
  const summaryActive = currentPath === summaryPath;

  const steps = profile.sidebarSteps || [];
  const stepDots = steps.map(s => effectiveDotFor(s, profileLoading));
  const nextIdx = stepDots.findIndex(d => d === 'red' || d === 'amber' || d === 'black');
  const requiredDots = stepDots.filter(d => d !== 'grey' && d !== 'blocked');
  const completedCount = requiredDots.filter(d => d === 'green').length;
  const totalCount = requiredDots.length;
  const pct = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <aside className={styles.sideNav}>
      {summaryActive ? (
        <div className={styles.navItemActive}>Summary Page</div>
      ) : (
        <Link to={summaryPath} className={styles.navItem} style={{ textDecoration: 'none' }}>
          Summary Page
        </Link>
      )}

      <div className={styles.navDivider} />

      <div className={styles.navProgress}>
        <div className={styles.navProgressHeader}>
          <span className={styles.navProgressTitle}>Workflow</span>
          <span className={styles.navProgressInfoWrap}>
            <span className={`material-icons-outlined ${styles.navProgressInfoIcon}`}>info</span>
            <span className={styles.navProgressInfoTooltip}>
              Track third party progress through each workflow stage. Click a stage below to open its page.
            </span>
          </span>
        </div>
        <div className={styles.navProgressMeta}>
          <span className={styles.navProgressLabel}>Progress</span>
          <span className={styles.navProgressCount}>{completedCount}/{totalCount} · {pct}%</span>
        </div>
        <div className={styles.navProgressBar}>
          <span className={styles.navProgressBarFill} style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className={styles.navStepper}>
        {steps.map((step, i) => {
          const effectiveDot = stepDots[i];
          const nodeCls = styles['navStepperNode_' + effectiveDot] || styles.navStepperNode_grey;
          const stepPath = step.path ? `/profile/${profile.id}/${step.path}` : null;
          const stepActive = stepPath && currentPath === stepPath;
          const isNext = i === nextIdx;
          const isLast = i === steps.length - 1;
          const connectorDone = effectiveDot === 'green';
          const statusLabel = STEP_STATUS_LABEL[effectiveDot] || 'Not Required';

          const rowClass = [
            styles.navStepperRow,
            stepActive && styles.navStepperRowActive,
            isNext && styles.navStepperRowNext,
            effectiveDot === 'grey' && styles.navStepperRowDim,
          ].filter(Boolean).join(' ');

          const nodeClass = [
            styles.navStepperNode,
            nodeCls,
            isNext && styles.navStepperNodeNext,
          ].filter(Boolean).join(' ');

          const content = (
            <>
              <span className={styles.navStepperGutter}>
                <span className={nodeClass}>
                  {effectiveDot === 'green' && (
                    <span className={`material-icons-outlined ${styles.navStepperNodeIcon}`}>check</span>
                  )}
                </span>
                {!isLast && (
                  <span
                    className={`${styles.navStepperConnector} ${connectorDone ? styles.navStepperConnectorDone : ''}`}
                  />
                )}
              </span>
              <span className={styles.navStepperContent}>
                <span className={styles.navStepperTopRow}>
                  <span className={styles.navStepperLabel}>{step.label}</span>
                  {step.partner && <PartnerIcon partner={step.partner} tooltip={step.tooltip} />}
                  {isNext && <span className={styles.navNextChip}>Next</span>}
                </span>
                <span className={styles.navStepperStatus} title={DOT_LABELS[effectiveDot] ?? DOT_LABELS.grey}>
                  {statusLabel}
                </span>
              </span>
            </>
          );

          return stepPath && !stepActive ? (
            <Link key={i} to={stepPath} className={rowClass} style={{ textDecoration: 'none' }}>
              {content}
            </Link>
          ) : (
            <div key={i} className={rowClass}>
              {content}
            </div>
          );
        })}
      </div>

      <div className={styles.navDivider} />

      {profile.sidebarSections.map((sec, i) => {
        if (sec.path) {
          const fullPath = `/profile/${profile.id}/${sec.path}`;
          const active = currentPath === fullPath;
          const secInner = (
            <>
              {sec.label}
              {sec.partner && <PartnerIcon partner={sec.partner} tooltip={sec.tooltip} />}
            </>
          );
          if (active) {
            return <div key={i} className={styles.navSectionLabelActive}>{secInner}</div>;
          }
          return (
            <Link key={i} to={fullPath} className={styles.navSectionLabel} style={{ textDecoration: 'none' }}>
              {secInner}
            </Link>
          );
        }
        return (
          <div key={i} className={styles.navSectionLabel}>
            {sec.label}
            {sec.partner && <PartnerIcon partner={sec.partner} tooltip={sec.tooltip} />}
          </div>
        );
      })}

      <div className={styles.navDivider} />
    </aside>
  );
}

export { PartnerIcon };
