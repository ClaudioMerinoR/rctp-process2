import styles from './Flag.module.css';

/*
 * Flag component — screening / watchlist flag chips
 *
 * props:
 *   type   'pep' | 'san' | 'sco' | 'ool' | 'oel' | 'si' | 'rca' | 'soc'
 *          | 'brd' | 'am' | 'ecr' | 'mrb' | 'msb'
 *   icon   'person' | 'entity' | 'ship' | 'aircraft' | 'country' | 'bank'
 *          | 'port' | 'airport' | 'city' | 'region' | 'subregion' | 'ftz'
 *          (default: 'person')
 */

const TYPE_CONFIG = {
  pep: { label: 'PEP', bg: '#aed136', color: 'dark' },
  san: { label: 'SAN', bg: '#fa3d3c', color: 'dark' },
  sco: { label: 'SCO', bg: '#ad2b2a', color: 'light' },
  ool: { label: 'OOL', bg: '#f75e00', color: 'dark' },
  oel: { label: 'OEL', bg: '#ff9865', color: 'dark' },
  si:  { label: 'SI',  bg: '#ed9c00', color: 'dark' },
  rca: { label: 'RCA', bg: '#1995d5', color: 'light' },
  soc: { label: 'SOC', bg: '#c38000', color: 'dark' },
  brd: { label: 'BRD', bg: '#794aa1', color: 'light' },
  am:  { label: 'AM',  bg: '#edd500', color: 'dark' },
  ecr: { label: 'ECR', bg: '#fc6d6d', color: 'dark' },
  mrb: { label: 'MRB', bg: '#588a1f', color: 'light' },
  msb: { label: 'MSB', bg: '#15b7c5', color: 'dark' },
};

const ICON_MAP = {
  person:    'person',
  entity:    'business',
  ship:      'directions_boat',
  aircraft:  'flight',
  country:   'public',
  bank:      'account_balance',
  port:      'anchor',
  airport:   'local_airport',
  city:      'location_city',
  region:    'map',
  subregion: 'my_location',
  ftz:       'warehouse',
};

export default function Flag({ type = 'pep', icon = 'person' }) {
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.ecr;
  const iconName = ICON_MAP[icon] || 'person';
  const textClass = config.color === 'light' ? styles.textLight : styles.textDark;

  return (
    <span className={styles.flag} style={{ background: config.bg }}>
      <span className={`material-icons-outlined ${styles.icon}`}>{iconName}</span>
      <span className={`${styles.label} ${textClass}`}>{config.label}</span>
    </span>
  );
}
