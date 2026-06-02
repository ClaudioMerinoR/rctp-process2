import { useState } from 'react';
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

  const [expandedSubSteps, setExpandedSubSteps] = useState(() => {
    const init = {};
    steps.forEach((step, i) => {
      if (step.subSteps?.length) init[i] = i === nextIdx;
    });
    return init;
  });
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
          <button
            className={styles.navExpandAllBtn}
            onClick={() => {
              const allExpanded = steps.every((s, i) => !s.subSteps?.length || expandedSubSteps[i]);
              setExpandedSubSteps(() => {
                const next = {};
                steps.forEach((s, i) => { if (s.subSteps?.length) next[i] = !allExpanded; });
                return next;
              });
            }}
            aria-label={steps.every((s, i) => !s.subSteps?.length || expandedSubSteps[i]) ? 'Collapse all' : 'Expand all'}
            title={steps.every((s, i) => !s.subSteps?.length || expandedSubSteps[i]) ? 'Collapse all' : 'Expand all'}
          >
            <span className={`material-icons-outlined ${styles.navExpandAllIcon}`}>
              {steps.every((s, i) => !s.subSteps?.length || expandedSubSteps[i]) ? 'unfold_less' : 'unfold_more'}
            </span>
          </button>
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
          const hasSubSteps = step.subSteps && step.subSteps.length > 0;

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

          const subExpanded = hasSubSteps ? !!expandedSubSteps[i] : false;

          const content = (
            <>
              <span className={styles.navStepperGutter}>
                <span className={nodeClass}>
                  {effectiveDot === 'green' && (
                    <span className={`material-icons-outlined ${styles.navStepperNodeIcon}`}>check</span>
                  )}
                </span>
                {(!isLast || hasSubSteps) && (
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
                <span className={styles.navStepperStatusRow}>
                  <span className={styles.navStepperStatus} title={DOT_LABELS[effectiveDot] ?? DOT_LABELS.grey}>
                    {statusLabel}
                  </span>
                  {hasSubSteps && subExpanded && stepPath && (
                    <Link to={stepPath} className={styles.navStepOpenPageLink} style={{ textDecoration: 'none' }} onClick={e => e.stopPropagation()}>
                      Open module
                    </Link>
                  )}
                </span>
              </span>
            </>
          );

          const mainRow = hasSubSteps ? (
            <div
              key={`step-${i}`}
              className={rowClass}
              style={{ cursor: 'pointer' }}
              onClick={() => setExpandedSubSteps(prev => ({ ...prev, [i]: !prev[i] }))}
              role="button"
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpandedSubSteps(prev => ({ ...prev, [i]: !prev[i] })); }}}
            >
              {content}
            </div>
          ) : stepPath && !stepActive ? (
            <Link key={`step-${i}`} to={stepPath} className={rowClass} style={{ textDecoration: 'none' }}>
              {content}
            </Link>
          ) : (
            <div key={`step-${i}`} className={rowClass}>
              {content}
            </div>
          );

          if (!hasSubSteps) return mainRow;

          return (
            <div key={`step-group-${i}`}>
              {mainRow}
              <div className={`${styles.navSubSteps} ${subExpanded ? styles.navSubStepsOpen : styles.navSubStepsClosed}`}>
                {step.subSteps.map((sub, j) => {
                  const subDot = sub.dot || 'grey';
                  const subNodeCls = styles['navStepperNode_' + subDot] || styles.navStepperNode_grey;
                  const isLastSub = j === step.subSteps.length - 1;
                  const subConnectorDone = subDot === 'green';
                  const subStatusLabel = STEP_STATUS_LABEL[subDot] || 'Not Required';
                  const subPath = sub.path ? `/profile/${profile.id}/${sub.path}` : null;
                  const subRowContent = (
                    <>
                      <span className={styles.navSubStepGutter}>
                        <span className={`${styles.navSubStepNode} ${subNodeCls}`}>
                          {subDot === 'green' && (
                            <span className={`material-icons-outlined ${styles.navStepperNodeIcon}`}>check</span>
                          )}
                        </span>
                        {(!isLastSub || !isLast) && (
                          <span className={`${styles.navStepperConnector} ${subConnectorDone ? styles.navStepperConnectorDone : ''}`} />
                        )}
                      </span>
                      <span className={styles.navSubStepContent}>
                        <span className={styles.navSubStepLabel}>{sub.label}</span>
                      </span>
                    </>
                  );
                  return (
                    <div key={j} className={styles.navSubStepRow}>
                      {subRowContent}
                    </div>
                  );
                })}
              </div>
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
