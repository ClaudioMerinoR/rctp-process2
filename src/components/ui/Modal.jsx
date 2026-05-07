import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Button from './Button';
import styles from './Modal.module.css';

export default function Modal({
  open,
  title,
  onClose,
  onConfirm,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmDisabled = false,
  children,
}) {
  useEffect(() => {
    if (!open) return;
    function onKey(e) { if (e.key === 'Escape') onClose?.(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={e => { if (e.target === e.currentTarget) onClose?.(); }}
        >
          <motion.div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Header */}
            <div className={styles.header}>
              <h2 id="modal-title" className={styles.title}>{title}</h2>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                <span className="material-icons-outlined" style={{ fontSize: 18 }}>close</span>
              </button>
            </div>

            {/* Content */}
            <div className={styles.content}>
              {children}
            </div>

            {/* Footer */}
            <div className={styles.footer}>
              <div className={styles.footerDivider} />
              <div className={styles.footerButtons}>
                <Button variant="outline" onClick={onClose}>{cancelLabel}</Button>
                <Button variant="filled" onClick={onConfirm} disabled={confirmDisabled}>{confirmLabel}</Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
