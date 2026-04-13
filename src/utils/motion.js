/**
 * Shared motion constants for Framer Motion (motion/react v12).
 * Import these instead of writing raw transition objects inline.
 */

export const ease = {
  standard:   [0.4, 0,    0.2, 1],
  accelerate: [0.4, 0,    1,   1],
  panel:      [0.32, 0.72, 0,  1],
};

export const duration = {
  fast:   0.15,
  short:  0.2,
  medium: 0.3,
  long:   0.35,
};

export const transition = {
  section:        { duration: duration.medium },
  sectionDelayed: { duration: duration.medium, delay: 0.05 },
  overlay:        { duration: duration.short },
  panel:          { duration: duration.long, ease: ease.panel },
  inlineReveal:   { duration: duration.medium, ease: 'easeInOut' },
  card:           { duration: 0.18 },
  accordionOpen: {
    height:  { duration: 0.25, ease: ease.standard },
    opacity: { duration: 0.2,  ease: 'easeOut' },
  },
  accordionClose: {
    height:  { duration: 0.16, ease: ease.accelerate },
    opacity: { duration: 0.1,  ease: 'easeIn' },
  },
};
