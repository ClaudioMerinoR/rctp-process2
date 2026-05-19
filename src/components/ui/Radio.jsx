import styles from './Radio.module.css';

export default function Radio({ checked, disabled, onChange, ...rest }) {
  function handleChange(e) {
    if (disabled) return;
    onChange && onChange(e);
  }

  let circleClass = styles.circle;
  if (disabled) {
    circleClass += checked ? ' ' + styles.circleDisabledChecked : ' ' + styles.circleDisabledEmpty;
  } else if (checked) {
    circleClass += ' ' + styles.circleChecked;
  } else {
    circleClass += ' ' + styles.circleEmpty;
  }

  return (
    <label className={`${styles.container}${disabled ? ' ' + styles.disabled : ''}`}>
      <input
        type="radio"
        className={styles.hiddenInput}
        checked={checked || false}
        disabled={disabled}
        onChange={handleChange}
        {...rest}
      />
      <span className={circleClass}>
        {checked && <span className={styles.dot} />}
      </span>
    </label>
  );
}
