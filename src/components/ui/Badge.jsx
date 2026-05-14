import styles from './Badge.module.css';

/**
 * props:
 *   label    string | number          (shown on large sizes only)
 *   style    'action-required' | 'no-action' | 'incomplete' | 'not-initiated' | 'completed' | 'confirmed' | 'cleared'
 *   size     'large' | 'medium' | 'small'   (default: 'large')
 *   shape    'round' | 'square'             (default: 'round', only applies to large)
 *   bgColor  string  optional — overrides the style-based background color
 *   textColor string optional — overrides the text color
 */
export default function Badge({ label = '12', style = 'action-required', size = 'large', shape = 'round', bgColor, textColor }) {
  const styleClass = bgColor ? '' : ({
    'action-required': styles.actionRequired,
    'no-action':       styles.noAction,
    'incomplete':      styles.incomplete,
    'not-initiated':   styles.notInitiated,
    'completed':       styles.completed,
    'confirmed':       styles.confirmed,
    'cleared':         styles.cleared,
  }[style] || styles.actionRequired);

  const sizeClass = size === 'small' ? styles.small
    : size === 'medium' ? styles.medium
    : shape === 'square' ? styles.largeSquare
    : styles.largeRound;

  const lightText = !bgColor && (style === 'completed' || style === 'not-initiated' || style === 'incomplete');

  const inlineStyle = bgColor ? { background: bgColor, color: textColor || '#fff' } : undefined;

  return (
    <span className={`${styles.badge} ${styleClass} ${sizeClass} ${lightText ? styles.textDark : styles.textLight}`} style={inlineStyle}>
      {size === 'large' && label}
    </span>
  );
}
