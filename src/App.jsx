import { Suspense, lazy, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import ThirdParties from './pages/ThirdParties';
import AddThirdParty from './pages/AddThirdParty';
import ProfilePage from './components/profile/ProfilePage';
import Settings from './pages/Settings';
import RenewalEdit from './pages/RenewalEdit';
import Placeholder from './pages/Placeholder';

const CompanyAdmin       = lazy(() => import('./pages/CompanyAdmin'));
const RoleDetails        = lazy(() => import('./pages/RoleDetails'));
const ProfileDocuments   = lazy(() => import('./components/profile/ProfileDocuments'));
const ProfileRiskReport  = lazy(() => import('./components/profile/ProfileRiskReport'));
const ProfileEdit        = lazy(() => import('./components/profile/ProfileEdit'));

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
          <Route path="/" element={<Navigate to="/third-parties" replace />} />
          <Route path="/third-parties" element={<ThirdParties />} />
          <Route path="/add-third-party" element={<AddThirdParty />} />
          <Route path="/profile/:profileId" element={<ProfilePage />} />
          <Route path="/profile/:profileId/documents" element={<ProfileDocuments />} />
          <Route path="/profile/:profileId/risk-report" element={<ProfileRiskReport />} />
          <Route path="/profile/:profileId/edit" element={<ProfileEdit />} />
          <Route path="/company-admin" element={<Navigate to="/company-admin/summary" replace />} />
          <Route path="/company-admin/summary" element={<CompanyAdmin />} />
          <Route path="/company-admin/third-party-details" element={<CompanyAdmin />} />
          <Route path="/company-admin/roles" element={<CompanyAdmin />} />
          <Route path="/company-admin/roles/:roleIndex" element={<RoleDetails />} />
          <Route path="/employees" element={<Placeholder title="Employees" />} />
          <Route path="/risk-search" element={<Placeholder title="Risk Search" />} />
          <Route path="/settings" element={<Navigate to="/settings/general/currency_approval_groups" replace />} />
          <Route path="/settings/:tab/:section" element={<Settings />} />
          <Route path="/settings/renewals/:version/edit" element={<RenewalEdit />} />
          <Route path="/reports" element={<Placeholder title="Reports" />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
