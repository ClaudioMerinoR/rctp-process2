import PageLayout from '../components/layout/PageLayout';

export default function Placeholder({ title }) {
  return (
    <PageLayout>
      <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-light)' }}>
        <span className="material-icons-outlined" style={{ fontSize: 48, display: 'block', marginBottom: 12 }}>construction</span>
        <h2 style={{ fontSize: 20, fontWeight: 500 }}>{title}</h2>
        <p style={{ marginTop: 8, fontSize: 13 }}>This page is under construction.</p>
      </div>
    </PageLayout>
  );
}
