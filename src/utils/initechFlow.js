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
  if (!profile || profile.id !== 'initech') return profile;
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
    currentStatus: { label: approved ? 'Approved' : 'Approved*' },
  };
}
