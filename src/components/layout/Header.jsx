export default function Header() {
  return (
    <header style={{
      backgroundColor: 'var(--text-normal)',
      height: 40,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.5px' }}>DOW JONES</span>
        <span style={{ color: 'var(--primary-500)', fontSize: 15, fontWeight: 500, letterSpacing: '0.5px' }}>
          RISKCENTER &nbsp;|&nbsp; THIRD PARTY
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {['Customer Support', 'Feedback'].map(label => (
          <span key={label} style={{
            padding: '0 8px', fontSize: 12, cursor: 'pointer',
            borderLeft: '1px solid var(--text-light)', height: 24,
            display: 'flex', alignItems: 'center',
          }}>{label}</span>
        ))}
        <span className="material-icons-outlined" style={{ padding: '0 8px', fontSize: 18, borderLeft: '1px solid var(--text-light)', height: 24, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>notifications</span>
        <span className="material-icons-outlined" style={{ padding: '0 8px', fontSize: 18, borderLeft: '1px solid var(--text-light)', height: 24, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>settings</span>
      </div>
    </header>
  );
}
