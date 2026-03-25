import { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import ThirdParties from './pages/ThirdParties';
import AddThirdParty from './pages/AddThirdParty';
import TpProfile from './pages/TpProfile';
import Placeholder from './pages/Placeholder';

const TpSummary      = lazy(() => import('./pages/TpSummary'));
const CompanyAdmin   = lazy(() => import('./pages/CompanyAdmin'));
const Documents      = lazy(() => import('./pages/Documents'));
const RiskLevelReport = lazy(() => import('./pages/RiskLevelReport'));
const BruceWayneProfile = lazy(() => import('./pages/BruceWayneProfile'));

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
          <Route path="/tp-profile" element={<TpProfile />} />
          <Route path="/tp-summary" element={<TpSummary />} />
          <Route path="/company-admin" element={<CompanyAdmin />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/risk-level-report" element={<RiskLevelReport />} />
          <Route path="/bruce-wayne-profile" element={<BruceWayneProfile />} />
          <Route path="/employees" element={<Placeholder title="Employees" />} />
          <Route path="/risk-search" element={<Placeholder title="Risk Search" />} />
          <Route path="/settings" element={<Placeholder title="Settings" />} />
          <Route path="/reports" element={<Placeholder title="Reports" />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
