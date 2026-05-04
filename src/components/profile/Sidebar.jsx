import { Link, useLocation } from 'react-router-dom';
import { PARTNER_ICONS } from './profileAssets';
import styles from './profile.module.css';

const DOT_LABELS = {
  green:   'Complete',
  amber:   'Required — In Progress',
  red:     'Required — Not Started',
  grey:    'Not Required',
  blocked: 'Blocked by another activity',
};

function PartnerIcon({ partner, tooltip }) {
  const img = PARTNER_ICONS[partner];
  if (!img) return null;
  const icon = (
    <span className={styles.navPartnerIcon}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7.5" fill="white" stroke="#B1BCC5" />
      </svg>
      <img src={img} alt="" />
    </span>
  );
  if (tooltip) {
    return (
      <span className={styles.navPartnerIconWrap}>
        {icon}
        <span className={styles.navTooltip}>{tooltip}</span>
      </span>
    );
  }
  return icon;
}

export default function Sidebar({ profile, profileLoading = false }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const summaryPath = `/profile/${profile.id}`;
  const summaryActive = currentPath === summaryPath;

  return (
    <aside className={styles.sideNav}>
      {summaryActive ? (
        <div className={styles.navItemActive}>Summary page</div>
      ) : (
        <Link to={summaryPath} className={styles.navItem} style={{ textDecoration: 'none' }}>
          Summary page
        </Link>
      )}

      <div className={styles.navDivider} />

      {profile.sidebarSteps.map((step, i) => {
        const effectiveDot = profileLoading && step.partner === 'ubo' ? 'grey' : step.dot;
        const dotCls = effectiveDot === 'red'     ? styles.dotRed
          : effectiveDot === 'green'   ? styles.dotGreen
          : effectiveDot === 'amber'   ? styles.dotAmber
          : effectiveDot === 'blocked' ? styles.dotBlocked
          : styles.dotGrey;

        const dotEl = (
          <span className={styles.dotWrap}>
            <span className={`${styles.dot} ${dotCls}`} />
            <span className={styles.dotTooltip}>{DOT_LABELS[effectiveDot] ?? DOT_LABELS.grey}</span>
          </span>
        );

        const stepPath = step.path ? `/profile/${profile.id}/${step.path}` : null;
        const stepActive = stepPath && currentPath === stepPath;
        const inner = step.tooltip || step.newTag ? (
          <div className={styles.navItemWrap}>
            {dotEl}
            {step.label}
            {step.partner && <PartnerIcon partner={step.partner} tooltip={step.tooltip} />}
            {step.newTag && <span className={styles.navNewTag}>New</span>}
          </div>
        ) : (
          <>
            {dotEl}
            {step.label}
            {step.partner && <PartnerIcon partner={step.partner} />}
          </>
        );

        if (stepPath && !stepActive) {
          return (
            <Link key={i} to={stepPath} className={styles.navItem} style={{ textDecoration: 'none' }}>
              {inner}
            </Link>
          );
        }
        return (
          <div key={i} className={stepActive ? styles.navItemActive : styles.navItem}>
            {inner}
          </div>
        );
      })}

      <div className={styles.navDivider} />

      {profile.sidebarSections.map((sec, i) => {
        if (sec.path) {
          const fullPath = `/profile/${profile.id}/${sec.path}`;
          const active = currentPath === fullPath;
          if (active) {
            return <div key={i} className={styles.navSectionLabelActive}>{sec.label}</div>;
          }
          return (
            <Link key={i} to={fullPath} className={styles.navSectionLabel} style={{ textDecoration: 'none' }}>
              {sec.label}
            </Link>
          );
        }
        return (
          <div key={i} className={styles.navSectionLabel}>
            {sec.label}
            {sec.partner && (
              <span style={{ marginLeft: 4 }}>
                <PartnerIcon partner={sec.partner} tooltip={sec.tooltip} />
              </span>
            )}
          </div>
        );
      })}

      <div className={styles.navDivider} />
    </aside>
  );
}

export { PartnerIcon };
