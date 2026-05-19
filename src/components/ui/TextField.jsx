import styles from './TextField.module.css';

export default function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  error = false,
  errorText,
  helperText,
  icon,
  disabled = false,
  ...rest
}) {
  return (
    <div className={styles.wrap}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={`${styles.inputWrap} ${error ? styles.inputWrapError : ''} ${disabled ? styles.inputWrapDisabled : ''}`}>
        {icon && <span className={`material-icons-outlined ${styles.icon}`}>{icon}</span>}
        <input
          className={styles.input}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
        />
      </div>
      {error && errorText && <span className={styles.errorText}>{errorText}</span>}
      {!error && helperText && <span className={styles.helperText}>{helperText}</span>}
    </div>
  );
}
