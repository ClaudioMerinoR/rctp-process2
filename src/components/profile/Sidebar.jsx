import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { patchInitechProfile, setExternalDDFlow, getExternalDDFlow } from '../../utils/initechFlow';
import { PARTNER_ICONS } from './profileAssets';
import styles from './profile.module.css';

const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Italian', 'Chinese', 'Japanese'];

function ExternalDDModal({ profileId, onClose, onAfterSend }) {
  const [form, setFormState] = useState({ firstName: '', surname: '', email: '', language: '' });
  const [errors, setErrors] = useState({});

  function set(field, value) {
    setFormState(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: false }));
  }

  function handleSend() {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = true;
    if (!form.surname.trim()) errs.surname = true;
    if (!form.email.trim()) errs.email = true;
    if (!form.language) errs.language = true;
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setExternalDDFlow(profileId, { sent: true });
    onAfterSend?.();
    onClose();
  }

  return (
    <motion.div
      className={styles.deleteModalOverlay}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.deleteModal}
        style={{ width: 460 }}
        initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.18 }}
        onClick={e => e.stopPropagation()}
        role="dialog" aria-modal="true"
      >
        <div className={styles.deleteModalHeader}>
          <span className={styles.deleteModalTitle}>External Due Diligence — Send Invite</span>
          <button className={styles.deleteModalClose} aria-label="Close" onClick={onClose} />
        </div>
        <div className={styles.deleteModalBody}>
          {['firstName', 'surname', 'email'].map(field => (
            <div key={field} className={styles.modalFormField}>
              <label className={styles.modalFormLabel}>
                {field === 'firstName' ? 'First Name' : field.charAt(0).toUpperCase() + field.slice(1)}
                <span className={styles.modalFormRequired}> *</span>
              </label>
              <input
                className={styles.modalFormInput}
                type={field === 'email' ? 'email' : 'text'}
                placeholder={field === 'firstName' ? 'First Name' : field.charAt(0).toUpperCase() + field.slice(1)}
                style={errors[field] ? { borderColor: 'var(--alert-500)' } : undefined}
                value={form[field]}
                onChange={e => set(field, e.target.value)}
              />
            </div>
          ))}
          <div className={styles.modalFormField} style={{ marginBottom: 0 }}>
            <label className={styles.modalFormLabel}>Language <span className={styles.modalFormRequired}>*</span></label>
            <select
              className={styles.modalFormSelect}
              style={errors.language ? { borderColor: 'var(--alert-500)' } : undefined}
              value={form.language}
              onChange={e => set('language', e.target.value)}
            >
              <option value="">Please select</option>
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>
        <div className={styles.deleteModalActions}>
          <button className={`${styles.deleteModalBtn} ${styles.deleteModalCancel}`} onClick={onClose}>Close</button>
          <button className={`${styles.deleteModalBtn} ${styles.btnFilled}`} onClick={handleSend}>Send Invite</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

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

export default function Sidebar({ profile: profileProp, profileLoading = false, onExternalDDSent }) {
  const profile = patchInitechProfile(profileProp);
  const location = useLocation();
  const currentPath = location.pathname;

  const summaryPath = `/profile/${profile.id}`;
  const summaryActive = currentPath === summaryPath;

  const steps = profile.sidebarSteps || [];
  const stepDots = steps.map(s => effectiveDotFor(s, profileLoading));
  const nextIdx = stepDots.findIndex(d => d === 'red' || d === 'amber' || d === 'black');

  const [externalDDOpen, setExternalDDOpen] = useState(false);

  const [expandedSubSteps, setExpandedSubSteps] = useState(() => {
    const init = {};
    steps.forEach((step, i) => {
      if (!step.subSteps?.length) return;
      const stepPath = step.path ? `/profile/${profile.id}/${step.path}` : null;
      const anySubActive = step.subSteps.some(sub =>
        sub.path && currentPath.startsWith(`/profile/${profile.id}/${sub.path}`)
      );
      init[i] = i === nextIdx || anySubActive || (stepPath && currentPath.startsWith(stepPath + '/'));
    });
    return init;
  });
  useEffect(() => {
    steps.forEach((step, i) => {
      if (!step.subSteps?.length) return;
      const stepPath = step.path ? `/profile/${profile.id}/${step.path}` : null;
      const anySubActive = step.subSteps.some(sub =>
        sub.path && currentPath.startsWith(`/profile/${profile.id}/${sub.path}`)
      );
      const stepOrSubActive = anySubActive || (stepPath && currentPath.startsWith(stepPath));
      if (stepOrSubActive) {
        setExpandedSubSteps(prev => prev[i] ? prev : { ...prev, [i]: true });
      }
    });
  }, [currentPath]);

  const requiredDots = stepDots.filter(d => d !== 'grey' && d !== 'blocked');
  const completedCount = requiredDots.filter(d => d === 'green').length;
  const totalCount = requiredDots.length;
  const pct = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <>
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
          <span className={`${styles.navProgressBarFill} ${pct === 100 ? styles.navProgressBarFillDone : ''}`} style={{ width: `${pct}%` }} />
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
          const subNextIdx = (isNext && hasSubSteps)
            ? (() => {
                const idx = step.subSteps.findIndex(s => (s.dot || 'grey') !== 'green');
                return idx === -1 ? 0 : idx;
              })()
            : -1;
          const showChipOnParent = isNext && !hasSubSteps;
          const parentRouteToNext = isNext && hasSubSteps;
          const parentRouteDone = effectiveDot === 'green' && hasSubSteps;

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
                    className={`${styles.navStepperConnector} ${connectorDone ? styles.navStepperConnectorDone : ''} ${parentRouteToNext ? styles.navStepperConnectorNext : ''}`}
                  />
                )}
              </span>
              <span className={styles.navStepperContent}>
                <span className={styles.navStepperTopRow}>
                  <span className={styles.navStepperLabel}>{step.label}</span>
                  {step.partner && <PartnerIcon partner={step.partner} tooltip={step.tooltip} />}
                  {showChipOnParent && <span className={styles.navNextChip}>Next</span>}
                  {hasSubSteps && (
                    <span className={`material-icons-outlined ${styles.navStepCaretIcon} ${subExpanded ? styles.navStepCaretIconOpen : ''}`}>expand_more</span>
                  )}
                </span>
                <span className={styles.navStepperStatusRow}>
                  <span className={styles.navStepperStatus} title={DOT_LABELS[effectiveDot] ?? DOT_LABELS.grey}>
                    {statusLabel}
                  </span>
                  {hasSubSteps && stepPath && (
                    <Link to={stepPath} className={styles.navStepOpenPageLink} style={{ textDecoration: 'none' }} onClick={e => e.stopPropagation()}>
                      <span className="material-icons-outlined" style={{ fontSize: 13 }}>open_in_new</span>
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
              <div
                className={`${styles.navSubSteps} ${subExpanded ? styles.navSubStepsOpen : styles.navSubStepsClosed} ${parentRouteToNext ? styles.navSubStepsNext : ''} ${parentRouteDone ? styles.navSubStepsDone : ''}`}
                style={parentRouteToNext ? { '--next-sub-idx': subNextIdx } : undefined}
              >
                {step.subSteps.map((sub, j) => {
                  const subDot = sub.dot || 'grey';
                  const subNodeCls = styles['navStepperNode_' + subDot] || styles.navStepperNode_grey;
                  const isLastSub = j === step.subSteps.length - 1;
                  const subConnectorDone = subDot === 'green';
                  const subStatusLabel = STEP_STATUS_LABEL[subDot] || 'Not Required';
                  const subPath = sub.path ? `/profile/${profile.id}/${sub.path}` : null;
                  const isSubNext = j === subNextIdx;
                  const subRowContent = (
                    <>
                      <span className={styles.navSubStepGutter}>
                        <span className={`${styles.navSubStepNode} ${subNodeCls} ${isSubNext ? styles.navStepperNodeNext : ''}`} />
                      </span>
                      <span className={styles.navSubStepContent}>
                        <span className={styles.navSubStepLabel}>{sub.label}</span>
                        {isSubNext && <span className={styles.navNextChip}>Next</span>}
                      </span>
                    </>
                  );
                  const rowCls = `${styles.navSubStepRow} ${isSubNext ? styles.navSubStepRowNext : ''}`;
                  const isExternalDD = sub.label === 'External Due Diligence';
                  if (isExternalDD) {
                    return (
                      <div key={j} className={rowCls} style={{ cursor: 'pointer' }} onClick={() => setExternalDDOpen(true)}>
                        {subRowContent}
                      </div>
                    );
                  }
                  return subPath ? (
                    <Link key={j} to={subPath} className={rowCls} style={{ textDecoration: 'none' }}>
                      {subRowContent}
                    </Link>
                  ) : (
                    <div key={j} className={rowCls}>
                      {subRowContent}
                    </div>
                  );
                })}
                {!isLast && <div className={styles.navSubStepsCloser} aria-hidden="true" />}
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

    <AnimatePresence>
      {externalDDOpen && (
        <ExternalDDModal
          key="ext-dd-modal"
          profileId={profile.id}
          onClose={() => setExternalDDOpen(false)}
          onAfterSend={onExternalDDSent}
        />
      )}
    </AnimatePresence>
    </>
  );
}

export { PartnerIcon };
