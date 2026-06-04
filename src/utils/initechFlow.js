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
  if (profile.id === 'initech') return _patchExternalDD(_patchInitech(profile));
  if (profile.id === 'dundermifflin') return _patchExternalDD(_patchDunderMifflin(profile));
  if (profile.id === 'lumon') return _patchExternalDD(_patchLumon(profile));
  if (profile.id === 'gringotts') return profile;
  if (profile.id === 'waystar') return _patchWaystar(profile);
  return _patchExternalDD(profile);
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
    currentStatus: { label: approved ? 'Approved' : 'Approved(!) Renewal Required' },
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
    currentStatus: { label: approved ? 'Approved' : 'Approved(!) Renewal Required' },
  };
}

// ── External Due Diligence flow (per-profile) ───────────────────────────────
const _externalDDSent = {};

export function getExternalDDFlow(profileId) {
  return { sent: !!_externalDDSent[profileId] };
}

export function setExternalDDFlow(profileId, updates) {
  if ('sent' in updates) _externalDDSent[profileId] = updates.sent;
}

// ── Waystar flow ──────────────────────────────────────────────────────────────

let _waystarState = {
  ra1Done: false,
  ra2Done: false,
  internalDDDone: false,
  integrityCheckInProgress: false,
  enhancedDDDone: false,
  riskMitigationDone: false,
  approval1Done: false,
  approval2Done: false,
  screeningDone: false,
};

export function getWaystarFlow() {
  return { ..._waystarState };
}

export function setWaystarFlow(updates) {
  _waystarState = { ..._waystarState, ...updates };
}

function _patchWaystar(profile) {
  const { ra1Done, ra2Done, internalDDDone, integrityCheckInProgress, enhancedDDDone, riskMitigationDone, approval1Done, approval2Done, screeningDone } = _waystarState;
  const externalDDSent = getExternalDDFlow('waystar').sent;

  const steps = profile.sidebarSteps.map(s => {
    if (s.label === 'Risk Assessment') {
      const subSteps = [
        { ...s.subSteps[0], dot: ra1Done ? 'green' : 'red' },
        { ...s.subSteps[1], dot: ra2Done ? 'green' : 'red' },
      ];
      const dot = ra1Done && ra2Done ? 'green' : (ra1Done ? 'amber' : 'red');
      return { ...s, dot, subSteps };
    }
    if (s.label === 'Due Diligence') {
      if (!ra2Done) return s;
      const extDot = enhancedDDDone ? 'green' : externalDDSent ? 'amber' : 'red';
      const subSteps = s.subSteps.map(sub => {
        if (sub.label === 'Internal Due Diligence') return { ...sub, dot: internalDDDone ? 'green' : 'red' };
        if (sub.label === 'External Due Diligence') return { ...sub, dot: extDot };
        return sub;
      });
      const allDone = internalDDDone && enhancedDDDone;
      const waiting = internalDDDone && externalDDSent && !enhancedDDDone;
      const anyStarted = internalDDDone || externalDDSent;
      const dot = allDone ? 'green' : anyStarted ? 'amber' : 'red';
      return { ...s, dot, subSteps, ...(waiting ? { waiting: true } : {}) };
    }
    if (s.label === 'Integrity Check') {
      if (!externalDDSent) return s;
      const dot = riskMitigationDone ? 'green' : integrityCheckInProgress ? 'amber' : 'red';
      const waiting = integrityCheckInProgress && !riskMitigationDone;
      return { ...s, dot, ...(waiting ? { waiting: true } : {}) };
    }
    if (s.label === 'Enhanced Due Diligence Reports') {
      if (!integrityCheckInProgress) return s;
      return { ...s, dot: enhancedDDDone ? 'green' : 'red' };
    }
    if (s.label === 'UBO') {
      if (riskMitigationDone) return { ...s, dot: 'green' };
      if (!enhancedDDDone) return { ...s, dot: 'grey' };
      return { ...s, dot: 'amber' };
    }
    if (s.label === 'Risk Mitigation') {
      return { ...s, dot: riskMitigationDone ? 'green' : 'red' };
    }
    if (s.label === 'Screening & Monitoring') {
      return { ...s, dot: screeningDone ? 'green' : s.dot };
    }
    if (s.label === 'Approval') {
      if (!riskMitigationDone) {
        const { subSteps: _, ...rest } = s;
        return rest;
      }
      const allDone = approval1Done && approval2Done;
      const anyDone = approval1Done || approval2Done;
      const subSteps = (s.subSteps || []).map((sub, i) => {
        const done = i === 0 ? approval1Done : approval2Done;
        return { ...sub, dot: done ? 'green' : 'red' };
      });
      const dot = allDone ? 'green' : anyDone ? 'amber' : 'red';
      return { ...s, dot, subSteps };
    }
    return s;
  });

  return {
    ...profile,
    sidebarSteps: steps,
    ...(approval2Done ? { currentStatus: { label: 'Approved' } } : {}),
  };
}

function _patchExternalDD(profile) {
  const { sent } = getExternalDDFlow(profile.id);
  if (!sent) return profile;
  const sidebarSteps = (profile.sidebarSteps || []).map(s => {
    if (s.label !== 'Due Diligence') return s;
    const subSteps = (s.subSteps || []).map(sub =>
      sub.label === 'External Due Diligence' ? { ...sub, dot: 'amber' } : sub
    );
    return { ...s, subSteps };
  });
  return { ...profile, sidebarSteps };
}
