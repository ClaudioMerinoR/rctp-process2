let _riskMitigated = false;
let _approved = false;

export function getFlow() {
  return { riskMitigated: _riskMitigated, approved: _approved };
}

export function setFlow(updates) {
  if ('riskMitigated' in updates) _riskMitigated = updates.riskMitigated;
  if ('approved' in updates) _approved = updates.approved;
}

export function patchInitechProfile(profile) {
  if (!profile) return profile;
  if (profile.id === 'initech') return _patchInitech(profile);
  if (profile.id === 'dundermifflin') return _patchDunderMifflin(profile);
  if (profile.id === 'lumon') return _patchLumon(profile);
  if (profile.id === 'gringotts') return profile;
  return profile;
}


function _patchInitech(profile) {
  const { riskMitigated, approved } = getFlow();
  const steps = profile.sidebarSteps.map(s => {
    if (s.label === 'Risk Mitigation') return { ...s, dot: riskMitigated ? 'green' : 'red' };
    if (s.label === 'Approval') {
      if (approved) return { ...s, dot: 'green' };
      if (riskMitigated) return { ...s, dot: 'amber' };
      return { ...s, dot: 'red' };
    }
    return s;
  });
  return {
    ...profile,
    sidebarSteps: steps,
    currentStatus: { ...profile.currentStatus, label: approved ? 'Approved' : 'Approved*', ...(approved && { tooltip: undefined }) },
  };
}

// ── Dunder Mifflin renewal flow ──────────────────────────────────────────────

let _dmRenewed = false;
let _dmApproved = false;

export function getDMFlow() {
  return { renewed: _dmRenewed, approved: _dmApproved };
}

export function setDMFlow(updates) {
  if ('renewed'  in updates) _dmRenewed   = updates.renewed;
  if ('approved' in updates) _dmApproved  = updates.approved;
}

function _patchDunderMifflin(profile) {
  const { renewed, approved } = getDMFlow();
  if (!renewed && !approved) return profile;

  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const renewedDateStr = nextYear.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const steps = profile.sidebarSteps.map(s => {
    if (s.label === 'Approval') {
      return { ...s, dot: approved ? 'green' : 'red' };
    }
    if (['Risk Assessment', 'Due Diligence', 'UBO', 'Screening & Monitoring'].includes(s.label)) {
      return { ...s, dot: 'green' };
    }
    return s;
  });

  const overviewFields = profile.overviewFields.map(f =>
    f.label === 'Third Party Renewal Date'
      ? { ...f, value: renewedDateStr, overdue: false }
      : f
  );

  return {
    ...profile,
    sidebarSteps: steps,
    overviewFields,
    currentStatus: { label: approved ? 'Approved' : 'Approved! (Renewal Required)' },
  };
}

// ── Lumon renewal flow ───────────────────────────────────────────────────────

let _lumonRenewed = false;
let _lumonApproved = false;

export function getLumonFlow() {
  return { renewed: _lumonRenewed, approved: _lumonApproved };
}

export function setLumonFlow(updates) {
  if ('renewed'  in updates) _lumonRenewed  = updates.renewed;
  if ('approved' in updates) _lumonApproved = updates.approved;
}

function _patchLumon(profile) {
  const { renewed, approved } = getLumonFlow();
  if (!renewed && !approved) return profile;

  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const renewedDateStr = nextYear.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const steps = profile.sidebarSteps.map(s => {
    if (s.label === 'Approval') return { ...s, dot: approved ? 'green' : 'red' };
    return s;
  });

  const overviewFields = profile.overviewFields.map(f =>
    f.label === 'Third Party Renewal Date'
      ? { ...f, value: renewedDateStr }
      : f
  );

  return {
    ...profile,
    sidebarSteps: steps,
    overviewFields,
    currentStatus: { label: approved ? 'Approved' : 'Approved! (Renewal Required)' },
  };
}
