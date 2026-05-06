import styles from './Chip.module.css';

/**
 * Input Chip — matches Figma node 90:1605 (RCTP Styles & Components)
 *
 * Props:
 *   label        string                           chip label
 *   selected     boolean                          selected state
 *   count        number | null                    trailing count badge (shown when > 0)
 *   showClose    boolean                          show trailing × close icon (unselected only)
 *   onClick      () => void                       chip click handler
 *   onClose      () => void                       close icon click handler (optional)
 *   disabled     boolean
 */
export default function Chip({
  label,
  selected = false,
  count = null,
  showClose = false,
  onClick,
  onClose,
  disabled = false,
}) {
  const hasTrailing = selected
    ? (count != null && count > 0)
    : showClose;

  return (
    <button
      type="button"
      className={`${styles.chip} ${selected ? styles.selected : styles.unselected} ${disabled ? styles.disabled : ''}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <span className={styles.label}>{label}</span>

      {/* count badge — shown whenever count > 0, regardless of selected state */}
      {count != null && count > 0 && (
        <span className={styles.countBadge}>{count}</span>
      )}

      {/* close icon — only shown when unselected, no count, and showClose=true */}
      {!selected && showClose && count == null && (
        <span
          className={`material-icons-outlined ${styles.closeIcon}`}
          onClick={e => {
            e.stopPropagation();
            onClose?.();
          }}
        >
          close
        </span>
      )}
    </button>
  );
}
