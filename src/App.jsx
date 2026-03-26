import { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import ThirdParties from './pages/ThirdParties';
import AddThirdParty from './pages/AddThirdParty';
import ProfilePage from './components/profile/ProfilePage';
import Placeholder from './pages/Placeholder';

const CompanyAdmin       = lazy(() => import('./pages/CompanyAdmin'));
const ProfileDocuments   = lazy(() => import('./components/profile/ProfileDocuments'));
const ProfileRiskReport  = lazy(() => import('./components/profile/ProfileRiskReport'));

function Loading() {
  return <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-light)', fontFamily: 'Roboto, sans-serif' }}>Loading…</div>;
}

export default function App() {
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
          <Route path="/company-admin" element={<CompanyAdmin />} />
          <Route path="/employees" element={<Placeholder title="Employees" />} />
          <Route path="/risk-search" element={<Placeholder title="Risk Search" />} />
          <Route path="/settings" element={<Placeholder title="Settings" />} />
          <Route path="/reports" element={<Placeholder title="Reports" />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
