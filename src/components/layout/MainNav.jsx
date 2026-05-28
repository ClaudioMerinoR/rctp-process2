import { Link, useLocation } from 'react-router-dom';
import styles from './MainNav.module.css';

const links = [
  { label: 'Dashboard',     to: '/',              match: (p) => p === '/' },
  { label: 'Third Parties', to: '/third-parties', match: (p) => p.startsWith('/third-parties') || p.startsWith('/profile') || p.startsWith('/add-third-party') },
  { label: 'Employees',     to: '/employees',     match: (p) => p.startsWith('/employees') },
  { label: 'Risk Search',   to: '/risk-search',   match: (p) => p.startsWith('/risk-search') },
  { label: 'Company Admin', to: '/company-admin', match: (p) => p.startsWith('/company-admin') },
  { label: 'Settings',      to: '/settings',      match: (p) => p.startsWith('/settings') },
  { label: 'Reports',       to: '/reports',       match: (p) => p.startsWith('/reports') },
];

export default function MainNav() {
  const { pathname } = useLocation();

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {links.map(({ label, to, match }) => {
          const isActive = match(pathname);
          return (
            <Link
              key={to}
              to={to}
              className={isActive ? `${styles.link} ${styles.active}` : styles.link}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
