import styles from './Toggle.module.css';

export default function Toggle({
  value = false,
  onChange,
  labelOn = 'Active',
  labelOff = 'Inactive',
  disabled = false,
}) {
  return (
    <div
      className={`${styles.toggle} ${!value ? styles.toggleOff : ''} ${disabled ? styles.toggleDisabled : ''}`}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={() => { if (!disabled) onChange?.(!value); }}
      onKeyDown={e => { if (!disabled && (e.key === 'Enter' || e.key === ' ')) onChange?.(!value); }}
      aria-pressed={value}
    >
      <div className={styles.track}>{value ? labelOn : labelOff}</div>
      <div className={styles.thumb} />
    </div>
  );
}
