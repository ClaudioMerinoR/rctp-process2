import styles from './Checkbox.module.css';

/**
 * props:
 *   checked      boolean
 *   indeterminate boolean
 *   disabled     boolean
 *   error        boolean
 *   size         'default' | 'small'   (default: 'default')
 *   onChange     function
 */
export default function Checkbox({ checked, indeterminate, disabled, error, size = 'default', onChange, ...rest }) {
  const small = size === 'small';

  let containerClass = styles.container;
  if (small) containerClass += ' ' + styles.containerSmall;

  let boxClass = styles.box;
  if (small) boxClass += ' ' + styles.boxSmall;

  if (error) {
    boxClass += checked || indeterminate ? ' ' + styles.boxError : ' ' + styles.boxErrorEmpty;
  } else if (disabled) {
    boxClass += checked || indeterminate ? ' ' + styles.boxDisabledChecked : ' ' + styles.boxDisabledEmpty;
  } else if (checked || indeterminate) {
    boxClass += ' ' + styles.boxChecked;
  } else {
    boxClass += ' ' + styles.boxEmpty;
  }

  function handleChange(e) {
    if (disabled) return;
    onChange && onChange(e);
  }

  return (
    <label className={`${containerClass}${disabled ? ' ' + styles.disabled : ''}`}>
      <input
        type="checkbox"
        className={styles.hiddenInput}
        checked={checked || false}
        disabled={disabled}
        onChange={handleChange}
        ref={el => { if (el) el.indeterminate = !!indeterminate; }}
        {...rest}
      />
      <span className={boxClass}>
        {(checked && !indeterminate) && (
          <svg className={`${styles.icon}${small ? ' ' + styles.iconSmall : ''}`} viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4L3.8 7L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {indeterminate && (
          <svg className={`${styles.icon}${small ? ' ' + styles.iconSmall : ''}`} viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1H9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
      </span>
    </label>
  );
}
