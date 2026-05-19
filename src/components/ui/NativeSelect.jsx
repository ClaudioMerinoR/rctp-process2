import { useState, useRef, useEffect } from 'react';
import styles from './NativeSelect.module.css';

export default function NativeSelect({
  label,
  value,
  onChange,
  options = [],
  placeholder,
  error = false,
  disabled = false,
  ...rest
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (!open) return;
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  const getVal = opt => typeof opt === 'string' ? opt : opt.value;
  const getLbl = opt => typeof opt === 'string' ? opt : opt.label;

  const selected = options.find(o => getVal(o) === value);
  const displayValue = selected ? getLbl(selected) : '';

  return (
    <div className={styles.wrap} {...rest}>
      {label && <label className={styles.label}>{label}</label>}
      <div
        ref={ref}
        className={`${styles.trigger} ${error ? styles.triggerError : ''} ${disabled ? styles.triggerDisabled : ''} ${open ? styles.triggerOpen : ''}`}
        onClick={() => { if (!disabled) setOpen(v => !v); }}
      >
        <span className={`${styles.display} ${!displayValue ? styles.displayPlaceholder : ''}`}>
          {displayValue || placeholder || ''}
        </span>
        <span className={`material-icons-outlined ${styles.caret} ${open ? styles.caretOpen : ''}`}>
          expand_more
        </span>
        {open && (
          <div className={styles.dropdown}>
            {options.map(opt => {
              const v = getVal(opt);
              const l = getLbl(opt);
              return (
                <div
                  key={v}
                  className={`${styles.item} ${value === v ? styles.itemSelected : ''}`}
                  onMouseDown={e => { e.preventDefault(); onChange(v); setOpen(false); }}
                >
                  {value === v && <span className="material-icons-outlined" style={{ fontSize: 14, marginRight: 4 }}>check</span>}
                  {l}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
