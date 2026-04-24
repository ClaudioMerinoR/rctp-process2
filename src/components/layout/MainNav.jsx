import { NavLink } from 'react-router-dom';
import styles from './MainNav.module.css';

const links = [
  { label: 'Third Parties', to: '/third-parties' },
  { label: 'Employees',     to: '/employees' },
  { label: 'Screening & Monitoring', to: '/screening' },
  { label: 'Risk Search',   to: '/risk-search' },
  { label: 'Company Admin', to: '/company-admin' },
  { label: 'Settings',      to: '/settings' },
  { label: 'Reports',       to: '/reports' },
];

export default function MainNav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.subProduct}>THIRD PARTY</div>
        {links.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
