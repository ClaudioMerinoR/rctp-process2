import { Suspense, lazy, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import ThirdParties from './pages/ThirdParties';
import AddThirdParty from './pages/AddThirdParty';
import ProfilePage from './components/profile/ProfilePage';
import Settings from './pages/Settings';
import RenewalEdit from './pages/RenewalEdit';
import Placeholder from './pages/Placeholder';
import Employees from './pages/Employees';
import RiskSearch from './pages/RiskSearch';
import Dashboard from './pages/Dashboard';

const CompanyAdmin       = lazy(() => import('./pages/CompanyAdmin'));
const RoleDetails        = lazy(() => import('./pages/RoleDetails'));
const ProfileDocuments   = lazy(() => import('./components/profile/ProfileDocuments'));
const ProfileRiskReport  = lazy(() => import('./components/profile/ProfileRiskReport'));
const ProfileEdit            = lazy(() => import('./components/profile/ProfileEdit'));
const ProfileRiskMitigation       = lazy(() => import('./components/profile/ProfileRiskMitigation'));
const ProfileApproval             = lazy(() => import('./components/profile/ProfileApproval'));
const ProfilePlaceholder          = lazy(() => import('./components/profile/ProfilePlaceholder'));
const ProfileRiskAssessment       = lazy(() => import('./components/profile/ProfileRiskAssessment'));
const ProfileIntegrityCheck       = lazy(() => import('./components/profile/ProfileIntegrityCheck'));
const ProfileDueDiligence         = lazy(() => import('./components/profile/ProfileDueDiligence'));
const ProfileEnhancedDueDiligence = lazy(() => import('./components/profile/ProfileEnhancedDueDiligence'));
const ProfileUBO                        = lazy(() => import('./components/profile/ProfileUBO'));
const ProfileScreeningMonitoring        = lazy(() => import('./components/profile/ProfileScreeningMonitoring'));
const ProfileProperties                 = lazy(() => import('./components/profile/ProfileProperties'));
const ProfileEntityVerification         = lazy(() => import('./components/profile/ProfileEntityVerification'));
const ProfileAudit                      = lazy(() => import('./components/profile/ProfileAudit'));

const PASSWORD = 'RCTPTeam';
const SESSION_KEY = 'rctp_auth';

function Loading() {
  return <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-light)', fontFamily: 'Roboto, sans-serif' }}>Loading…</div>;
}

function PasswordGate({ onAuth }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (value === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      onAuth();
    } else {
      setError(true);
      setValue('');
    }
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: 'var(--neutral-10)', fontFamily: 'Roboto, sans-serif',
    }}>
      <div style={{
        background: 'var(--neutral-00)', borderRadius: 12,
        padding: '40px 48px', width: 360,
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 32 }} className="material-icons-outlined">lock</span>
          <span style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)' }}>RCTP Platform</span>
          <span style={{ fontSize: 13, color: 'var(--text-light)' }}>Enter the password to continue</span>
        </div>
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="password"
            value={value}
            onChange={e => { setValue(e.target.value); setError(false); }}
            placeholder="Password"
            autoFocus
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '10px 14px', borderRadius: 6,
              border: error ? '1.5px solid var(--danger-500, #d32f2f)' : '1.5px solid var(--neutral-50)',
              fontSize: 14, outline: 'none', color: 'var(--text-primary)',
            }}
          />
          {error && <span style={{ fontSize: 12, color: 'var(--danger-500, #d32f2f)' }}>Incorrect password</span>}
          <button type="submit" style={{
            background: 'var(--primary-500)', color: '#fff', border: 'none',
            borderRadius: 6, padding: '10px 0', fontSize: 14, fontWeight: 500,
            cursor: 'pointer', marginTop: 4,
          }}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/third-parties" element={<ThirdParties />} />
          <Route path="/add-third-party" element={<AddThirdParty />} />
          <Route path="/profile/:profileId" element={<ProfilePage />} />
          <Route path="/profile/:profileId/documents" element={<ProfileDocuments />} />
          <Route path="/profile/:profileId/risk-report" element={<ProfileRiskReport />} />
          <Route path="/profile/:profileId/edit" element={<ProfileEdit />} />
          <Route path="/profile/:profileId/risk-mitigation" element={<ProfileRiskMitigation />} />
          <Route path="/profile/:profileId/risk-assessment" element={<ProfileRiskAssessment />} />
          <Route path="/profile/:profileId/due-diligence" element={<ProfileDueDiligence />} />
          <Route path="/profile/:profileId/integrity-check" element={<ProfileIntegrityCheck />} />
          <Route path="/profile/:profileId/enhanced-due-diligence" element={<ProfileEnhancedDueDiligence />} />
          <Route path="/profile/:profileId/ubo" element={<ProfileUBO />} />
          <Route path="/profile/:profileId/approval" element={<ProfileApproval />} />
          <Route path="/profile/:profileId/screening-monitoring" element={<ProfileScreeningMonitoring />} />
          <Route path="/profile/:profileId/properties" element={<ProfileProperties />} />
          <Route path="/profile/:profileId/entity-verification" element={<ProfileEntityVerification />} />
          <Route path="/profile/:profileId/audit" element={<ProfileAudit />} />
          <Route path="/company-admin" element={<Navigate to="/company-admin/summary" replace />} />
          <Route path="/company-admin/summary" element={<CompanyAdmin />} />
          <Route path="/company-admin/third-party-details" element={<CompanyAdmin />} />
          <Route path="/company-admin/roles" element={<CompanyAdmin />} />
          <Route path="/company-admin/roles/:roleIndex" element={<RoleDetails />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/risk-search" element={<RiskSearch />} />
          <Route path="/settings" element={<Navigate to="/settings/general/currency_approval_groups" replace />} />
          <Route path="/settings/:tab/:section" element={<Settings />} />
          <Route path="/settings/renewals/:version/edit" element={<RenewalEdit />} />
          <Route path="/reports" element={<Placeholder title="Reports" />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
