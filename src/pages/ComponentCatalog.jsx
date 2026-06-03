import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import Checkbox from '../components/ui/Checkbox';
import Radio from '../components/ui/Radio';
import Chip from '../components/ui/Chip';
import RiskBadge from '../components/ui/RiskBadge';
import TextField from '../components/ui/TextField';
import NativeSelect from '../components/ui/NativeSelect';
import Combobox from '../components/ui/Combobox';
import Toggle from '../components/ui/Toggle';
import Paginator from '../components/ui/Paginator';
import { RiskLevelIcon } from '../components/profile/profileAssets';
import Breadcrumb from '../components/layout/Breadcrumb';
import PropsTable from '../components/catalog/PropsTable';
import AnatomyTable from '../components/catalog/AnatomyTable';
import TokenSwatch from '../components/catalog/TokenSwatch';
import styles from './ComponentCatalog.module.css';
import profileStyles from '../components/profile/profile.module.css';

/* ── Props data ── */
const PROPS = {
  button: [
    { name: 'variant', type: "'outline' | 'filled' | 'text'", default: "'outline'", description: 'Visual style of the button.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Height: sm = 26px, md = 32px (default), lg = 38px.' },
    { name: 'children', type: 'ReactNode', default: null, required: true, description: 'Button label content.' },
    { name: 'icon', type: 'string', default: 'undefined', description: 'Material Icons Outlined icon name shown after the label.' },
    { name: '...props', type: 'HTMLButtonAttributes', default: null, description: 'All standard button attributes (onClick, disabled, type, etc.).' },
  ],
  badge: [
    { name: 'label', type: 'string | number', default: "'12'", description: 'Text shown inside the badge (large size only).' },
    { name: 'style', type: "'action-required' | 'no-action' | 'incomplete' | 'not-initiated' | 'completed' | 'confirmed' | 'cleared'", default: "'action-required'", description: 'Pre-defined color scheme.' },
    { name: 'size', type: "'large' | 'medium' | 'small'", default: "'large'", description: 'Controls badge dimensions and whether the label is shown.' },
    { name: 'shape', type: "'round' | 'square'", default: "'round'", description: 'Applies to large size only.' },
    { name: 'bgColor', type: 'string', default: 'undefined', description: 'CSS color override for background.' },
    { name: 'textColor', type: 'string', default: "'#fff'", description: 'CSS color override for text.' },
  ],
  chip: [
    { name: 'label', type: 'string', default: null, required: true, description: 'Text displayed inside the chip.' },
    { name: 'selected', type: 'boolean', default: 'false', description: 'Selected visual state.' },
    { name: 'count', type: 'number | null', default: 'null', description: 'Trailing count badge; shown when > 0.' },
    { name: 'showClose', type: 'boolean', default: 'false', description: 'Shows a close × icon (unselected only, no count).' },
    { name: 'onClick', type: '() => void', default: null, description: 'Chip click handler.' },
    { name: 'onClose', type: '() => void', default: 'undefined', description: 'Close icon click handler.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables click and close interactions.' },
  ],
  modal: [
    { name: 'open', type: 'boolean', default: null, required: true, description: 'Controls modal visibility.' },
    { name: 'title', type: 'string', default: null, required: true, description: 'Modal header title text.' },
    { name: 'onClose', type: '() => void', default: null, description: 'Callback fired on close button, Escape key, or backdrop click.' },
    { name: 'onConfirm', type: '() => void', default: null, description: 'Callback fired on the confirm button.' },
    { name: 'confirmLabel', type: 'string', default: "'Confirm'", description: 'Label for the confirm button.' },
    { name: 'cancelLabel', type: 'string', default: "'Cancel'", description: 'Label for the cancel button.' },
    { name: 'confirmDisabled', type: 'boolean', default: 'false', description: 'Disables the confirm button.' },
    { name: 'children', type: 'ReactNode', default: null, description: 'Modal body content.' },
  ],
  checkbox: [
    { name: 'checked', type: 'boolean', default: null, required: true, description: 'Checked state.' },
    { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Shows a dash instead of a checkmark.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Makes the control non-interactive.' },
    { name: 'error', type: 'boolean', default: 'false', description: 'Error state styling.' },
    { name: 'size', type: "'default' | 'small'", default: "'default'", description: 'Controls checkbox dimensions.' },
    { name: 'onChange', type: '(e) => void', default: null, description: 'Change event handler.' },
  ],
  radio: [
    { name: 'checked', type: 'boolean', default: null, required: true, description: 'Selected state.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Makes the control non-interactive.' },
    { name: 'onChange', type: '(e) => void', default: null, description: 'Change event handler.' },
  ],
  riskBadge: [
    { name: 'level', type: "'high' | 'medium' | 'low' | 'unknown'", default: null, required: true, description: 'Risk level to display. unknown is shown when risk assessment has not yet completed.' },
  ],
  textField: [
    { name: 'label', type: 'string', default: 'undefined', description: 'Label shown above the input.' },
    { name: 'value', type: 'string', default: null, required: true, description: 'Controlled input value.' },
    { name: 'onChange', type: '(e) => void', default: null, required: true, description: 'Change event handler.' },
    { name: 'placeholder', type: 'string', default: 'undefined', description: 'Placeholder text.' },
    { name: 'type', type: 'string', default: "'text'", description: 'HTML input type (text, email, password, number, etc.).' },
    { name: 'error', type: 'boolean', default: 'false', description: 'Error state — applies red border.' },
    { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message shown below the field.' },
    { name: 'helperText', type: 'string', default: 'undefined', description: 'Helper text shown below the field (only when no error).' },
    { name: 'icon', type: 'string', default: 'undefined', description: 'Material Icons Outlined icon name shown as a leading icon.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
  ],
  nativeSelect: [
    { name: 'label', type: 'string', default: 'undefined', description: 'Label shown above the select.' },
    { name: 'value', type: 'string', default: null, required: true, description: 'Controlled select value.' },
    { name: 'onChange', type: '(e) => void', default: null, required: true, description: 'Change event handler.' },
    { name: 'options', type: 'string[] | {value, label}[]', default: '[]', description: 'Options array — plain strings or value/label objects.' },
    { name: 'placeholder', type: 'string', default: 'undefined', description: 'Placeholder option (disabled, first item).' },
    { name: 'error', type: 'boolean', default: 'false', description: 'Error state.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select.' },
  ],
  combobox: [
    { name: 'value', type: 'string', default: null, required: true, description: 'Currently selected value.' },
    { name: 'onChange', type: '(value: string) => void', default: null, required: true, description: 'Called with the selected value when an option is chosen.' },
    { name: 'options', type: 'string[] | {value, label}[]', default: '[]', description: 'Options list — plain strings or value/label objects.' },
    { name: 'placeholder', type: 'string', default: "'Choose…'", description: 'Placeholder text shown when no value is selected.' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Label shown above the combobox.' },
    { name: 'hasError', type: 'boolean', default: 'false', description: 'Error state — applies red border.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the combobox.' },
  ],
  toggle: [
    { name: 'value', type: 'boolean', default: 'false', required: true, description: 'Current on/off state.' },
    { name: 'onChange', type: '(value: boolean) => void', default: null, description: 'Called with the new boolean value on click.' },
    { name: 'labelOn', type: 'string', default: "'Active'", description: 'Label shown in the on state.' },
    { name: 'labelOff', type: 'string', default: "'Inactive'", description: 'Label shown in the off state.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables toggle interaction.' },
  ],
  paginator: [
    { name: 'page', type: 'number', default: '1', required: true, description: 'Current page (1-based).' },
    { name: 'totalPages', type: 'number', default: '1', required: true, description: 'Total number of pages.' },
    { name: 'pageSize', type: 'number', default: '20', description: 'Current page size (rows per page).' },
    { name: 'totalItems', type: 'number', default: '0', description: 'Total number of items across all pages.' },
    { name: 'onPageChange', type: '(page: number) => void', default: null, description: 'Called when the user navigates to a different page.' },
    { name: 'onPageSizeChange', type: '(size: number) => void', default: null, description: 'Called when the user changes the page size.' },
    { name: 'pageSizeOptions', type: 'number[]', default: '[20, 50, 100]', description: 'Options available in the page size selector.' },
  ],
  tag: [
    { name: 'label', type: 'string', default: null, required: true, description: 'Text shown inside the tag.' },
    { name: 'onRemove', type: '() => void', default: 'undefined', description: 'When provided, renders a × button that triggers removal.' },
  ],
  tooltip: [
    { name: 'content', type: 'string', default: null, required: true, description: 'Text shown in the tooltip bubble.' },
    { name: 'children', type: 'ReactNode', default: null, required: true, description: 'Trigger element — tooltip appears on hover.' },
    { name: 'direction', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Which side of the trigger the bubble appears on.' },
    { name: 'width', type: 'number', default: 'undefined', description: 'Fixed pixel width of the bubble (auto-wraps when set).' },
  ],
  fileUpload: [
    { name: 'fileName', type: 'string', default: "''", description: 'Currently selected file name; shows "Choose Files" placeholder when empty.' },
    { name: 'onSelect', type: '(file) => void', default: null, description: 'Called when the user picks a file from the system dialog.' },
    { name: 'onUpload', type: '() => void', default: null, description: 'Called when the user clicks the Upload button.' },
    { name: 'accept', type: 'string', default: 'undefined', description: 'Comma-separated list of allowed extensions (e.g. \'.pdf,.docx,.png\').' },
    { name: 'multiple', type: 'boolean', default: 'false', description: 'Whether to allow multiple file selection.' },
    { name: 'hint', type: 'ReactNode', default: 'undefined', description: 'Helper text shown below the row (typically lists allowed file types).' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables Browse and Upload buttons.' },
  ],
};

const STATUS_ENTRIES = [
  { label: 'Pending Approval',             bg: 'var(--neutral-50)',  color: 'var(--text-normal)',  icon: 'pending',            tooltip: 'This third party is awaiting approval.' },
  { label: 'Approved',                     bg: 'var(--success-100)', color: 'var(--success-900)', icon: 'check_circle',       tooltip: 'This third party has been approved.' },
  { label: 'Not Approved',                 bg: 'var(--alert-100)',   color: 'var(--alert-700)',   icon: 'dangerous',          tooltip: 'Approval was not granted for this third party.' },
  { label: 'Declined',                     bg: 'var(--alert-100)',   color: 'var(--alert-700)',   icon: 'feedback',           tooltip: 'This third party has been declined.' },
  { label: 'Approved*',                    bg: 'var(--warning-100)', color: 'var(--warning-900)', icon: 'history_toggle_off', tooltip: 'Approved with conditions. Review required.' },
  { label: 'Approved(!) Renewal Required', bg: 'var(--warning-100)', color: 'var(--warning-900)', icon: 'history_toggle_off', tooltip: 'Approval valid but renewal is due.' },
];

const SIDEBAR_SECTIONS = [
  {
    label: 'UI Components',
    id: 'ui-components',
    items: [
      { label: 'Button', id: 'button' },
      { label: 'Badge', id: 'badge' },
      { label: 'Chip', id: 'chip' },
      { label: 'Tag', id: 'tag' },
      { label: 'Tooltip', id: 'tooltip' },
      { label: 'Modal', id: 'modal' },
    ],
  },
  {
    label: 'Form',
    id: 'form',
    items: [
      { label: 'Checkbox', id: 'checkbox' },
      { label: 'Radio', id: 'radio' },
      { label: 'TextField', id: 'textfield' },
      { label: 'NativeSelect', id: 'nativeselect' },
      { label: 'Combobox', id: 'combobox' },
      { label: 'Toggle', id: 'toggle' },
      { label: 'File Upload Row', id: 'fileupload' },
    ],
  },
  {
    label: 'Data Display',
    id: 'data-display',
    items: [
      { label: 'RiskBadge', id: 'riskbadge' },
      { label: 'Status Badges', id: 'statusbadges' },
      { label: 'Paginator', id: 'paginator' },
    ],
  },
  {
    label: 'Profile Atoms',
    id: 'profile-atoms',
    items: [
      { label: 'Profile Page Header', id: 'profile-header' },
      { label: 'Field Grid', id: 'field-grid' },
    ],
  },
  {
    label: 'Design Tokens',
    id: 'design-tokens',
    items: [
      { label: 'Colors', id: 'tokens-colors' },
      { label: 'Typography', id: 'tokens-typography' },
      { label: 'Spacing', id: 'tokens-spacing' },
      { label: 'Shadows', id: 'tokens-shadows' },
      { label: 'Radii', id: 'tokens-radii' },
    ],
  },
];

const COLOR_GROUPS = [
  {
    label: 'Brand Primary',
    tokens: ['--primary-08','--primary-50','--primary-100','--primary-200','--primary-300','--primary-400','--primary-500','--primary-600','--primary-700','--primary-800','--primary-900'],
  },
  {
    label: 'Neutral',
    tokens: ['--neutral-00','--neutral-25','--neutral-50','--neutral-100','--neutral-200','--neutral-300','--neutral-400','--neutral-500','--neutral-600','--neutral-700','--neutral-800','--neutral-900'],
  },
  {
    label: 'Text',
    tokens: ['--text-normal','--text-light','--text-light-alt','--text-dark'],
  },
  {
    label: 'Alert',
    tokens: ['--alert-50','--alert-100','--alert-300','--alert-500','--alert-700','--alert-900'],
  },
  {
    label: 'Success',
    tokens: ['--success-50','--success-100','--success-300','--success-500','--success-700','--success-900'],
  },
  {
    label: 'Warning',
    tokens: ['--warning-50','--warning-100','--warning-300','--warning-500','--warning-700','--warning-900'],
  },
];

const SPACING_TOKENS = [
  { name: '--rctp-space-1', px: 4 },
  { name: '--rctp-space-2', px: 8 },
  { name: '--rctp-space-3', px: 12 },
  { name: '--rctp-space-4', px: 16 },
  { name: '--rctp-space-5', px: 20 },
  { name: '--rctp-space-6', px: 24 },
  { name: '--rctp-space-8', px: 32 },
  { name: '--rctp-space-10', px: 40 },
  { name: '--rctp-space-12', px: 48 },
  { name: '--rctp-space-14', px: 56 },
];

const SHADOW_TOKENS = [
  { name: '--rctp-shadow-xs', value: '0 1px 2px rgba(0,0,0,0.07)' },
  { name: '--rctp-shadow-sm', value: '0 1px 2px rgba(0,0,0,0.15)' },
  { name: '--rctp-shadow-md', value: '0 2px 6px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.07)' },
  { name: '--rctp-shadow-lg', value: '0 6px 14px rgba(0,0,0,0.25)' },
  { name: '--rctp-shadow-xl', value: '0 12px 24px rgba(0,0,0,0.30)' },
];

const RADII_TOKENS = [
  { name: '--rctp-radius-xs', value: '2px' },
  { name: '--rctp-radius-sm', value: '4px' },
  { name: '--rctp-radius-md', value: '8px' },
  { name: '--rctp-radius-pill', value: '1000px' },
];

const TYPE_SPECIMENS = [
  { label: 'Heading H1', size: '32px', lineHeight: '40px', weight: '600', family: 'Simplon Norm', sample: 'Third Party Risk' },
  { label: 'Heading H2', size: '28px', lineHeight: '36px', weight: '600', family: 'Simplon Norm', sample: 'Risk Assessment' },
  { label: 'Heading H3', size: '24px', lineHeight: '32px', weight: '600', family: 'Simplon Norm', sample: 'Due Diligence' },
  { label: 'Heading H4', size: '20px', lineHeight: '28px', weight: '500', family: 'Simplon Norm', sample: 'Screening Results' },
  { label: 'Heading H5', size: '18px', lineHeight: '26px', weight: '500', family: 'Simplon Norm', sample: 'Open Tasks' },
  { label: 'Body Large', size: '16px', lineHeight: '24px', weight: '400', family: 'Roboto', sample: 'These existing records have a similar name to the one being created.' },
  { label: 'Body Medium', size: '14px', lineHeight: '22px', weight: '400', family: 'Roboto', sample: 'All progress will be lost. You will be redirected to the Third Parties tab.' },
  { label: 'Body Small', size: '13px', lineHeight: '20px', weight: '400', family: 'Roboto', sample: 'Select one of the options to configure the onboarding process.' },
  { label: 'Caption', size: '12px', lineHeight: '18px', weight: '400', family: 'Roboto', sample: 'Showing results 1–20 of 140 third parties' },
  { label: 'Label Large', size: '14px', lineHeight: '20px', weight: '500', family: 'Roboto', sample: 'TASK TYPE' },
  { label: 'Label Medium', size: '12px', lineHeight: '18px', weight: '500', family: 'Roboto', sample: 'CURRENT STATUS' },
  { label: 'Label Small', size: '11px', lineHeight: '16px', weight: '600', family: 'Roboto', sample: 'RISK LEVEL' },
];

const Z_TOKENS = [
  { name: '--z-tooltip', value: 10 },
  { name: '--z-dropdown', value: 200 },
  { name: '--z-alert', value: 500 },
  { name: '--z-modal', value: 1000 },
  { name: '--z-overlay', value: 1100 },
  { name: '--z-panel', value: 1101 },
  { name: '--z-cancel', value: 2000 },
  { name: '--z-creating', value: 3000 },
];

const PATTERNS_SECTIONS = [
  { label: 'Tables',             id: 'pattern-tables' },
  { label: 'Cards',              id: 'pattern-cards' },
  { label: 'Navigation',         id: 'pattern-navigation' },
  { label: 'Profile Sidenav',    id: 'pattern-sidenav' },
  { label: 'Form Modal',         id: 'pattern-form-modal' },
  { label: 'Alerts & Banners',   id: 'pattern-alerts' },
  { label: 'Accordion',          id: 'pattern-accordion' },
  { label: 'Side Panel',         id: 'pattern-sidepanel' },
];

const SAMPLE_ROWS = [
  { name: 'Pied Piper Inc.', owner: 'Richard Hendricks', bu: 'Technology', tags: ['SaaS', 'US'], status: 'Approved', risk: 'low' },
  { name: 'Initech Corporation', owner: 'Bill Lumbergh', bu: 'Finance', tags: ['Banking'], status: 'Pending Approval', risk: 'medium' },
  { name: 'Waystar Royco', owner: 'Logan Roy', bu: 'Media', tags: ['Global', 'Media'], status: 'Not Approved', risk: 'high' },
];

/* ── Helper: entry card wrapper ── */
function Entry({ id, title, description, demo, demoNote, props: propsRows }) {
  return (
    <div id={id} className={styles.entryCard}>
      <div className={styles.entryHeader}>
        <h3 className={styles.entryTitle}>{title}</h3>
        {description && <p className={styles.entryDesc}>{description}</p>}
      </div>
      <div className={styles.demoShell}>
        <div className={styles.demoLabel}>Live Demo</div>
        {demo}
        {demoNote && <div className={styles.demoNote}>{demoNote}</div>}
      </div>
      {propsRows && <PropsTable rows={propsRows} />}
    </div>
  );
}

function SegmentedDemo() {
  const [ownerMode, setOwnerMode] = useState('group');
  const [entityType, setEntityType] = useState('entity');
  return (
    <div style={{ display:'flex', gap:24, alignItems:'center', flexWrap:'wrap' }}>
      <div className={styles.btnSegmentedGroup}>
        {['Group','User'].map(o => (
          <button key={o} className={`${styles.btnSegmented} ${ownerMode === o.toLowerCase() ? styles.btnSegmentedActive : ''}`} onClick={() => setOwnerMode(o.toLowerCase())}>{o}</button>
        ))}
      </div>
      <div className={styles.btnSegmentedGroup}>
        {['Entity','Person','Unknown'].map(o => (
          <button key={o} className={`${styles.btnSegmented} ${entityType === o.toLowerCase() ? styles.btnSegmentedActive : ''}`} onClick={() => setEntityType(o.toLowerCase())}>{o}</button>
        ))}
      </div>
    </div>
  );
}

export default function ComponentCatalog() {
  const [activeTab, setActiveTab] = useState('Components');
  const [activeSection, setActiveSection] = useState('button');
  const [activePatternsSection, setActivePatternsSection] = useState('pattern-tables');

  /* interactive demo state — Components tab */
  const [modalOpen, setModalOpen] = useState(false);
  const [chip1Selected, setChip1Selected] = useState(false);
  const [chip2Count] = useState(5);
  const [cbUnchecked, setCbUnchecked] = useState(false);
  const [cbChecked, setCbChecked] = useState(true);
  const [radioSel, setRadioSel] = useState(0);
  const [tfValue, setTfValue] = useState('');
  const [selValue, setSelValue] = useState('');
  const [comboValue, setComboValue] = useState('');
  const [toggleOn, setToggleOn] = useState(true);
  const [paginatorPage, setPaginatorPage] = useState(1);
  const [paginatorSize, setPaginatorSize] = useState(20);
  const [uploadName, setUploadName] = useState('');

  /* interactive demo state — Patterns tab */
  const [patternTab, setPatternTab] = useState('Overview');
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [formModalData, setFormModalData] = useState({ firstName: '', surname: '', email: '', language: '' });
  const [sidenavExpanded, setSidenavExpanded] = useState({ ra: true, dd: false });
  const [tableVariant, setTableVariant] = useState('Enterprise');
  const [tableShowEmpty, setTableShowEmpty] = useState(false);
  const [tablePage, setTablePage] = useState(1);
  const [selectedType, setSelectedType] = useState('entity');
  const [accordionOpen, setAccordionOpen] = useState({ low: true, medium: false, high: false });
  const [headerRisk, setHeaderRisk] = useState('high');
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [panelSize, setPanelSize] = useState(null); // null = closed, else width label

  /* color tokens read from CSS */
  const [colorTokens, setColorTokens] = useState({});

  useEffect(() => {
    const root = document.documentElement;
    const values = {};
    COLOR_GROUPS.flatMap(g => g.tokens).forEach(t => {
      values[t] = getComputedStyle(root).getPropertyValue(t).trim();
    });
    setColorTokens(values);
  }, []);

  /* IntersectionObserver for sidebar active state */
  useEffect(() => {
    const ids = activeTab === 'Components'
      ? SIDEBAR_SECTIONS.flatMap(s => s.items.map(i => i.id))
      : PATTERNS_SECTIONS.map(s => s.id);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            if (activeTab === 'Components') setActiveSection(e.target.id);
            else setActivePatternsSection(e.target.id);
          }
        });
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [activeTab]);

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const COUNTRIES = ['Australia', 'Brazil', 'Canada', 'France', 'Germany', 'India', 'Japan', 'Mexico', 'United Kingdom', 'United States'];

  return (
    <PageLayout>
      <div className={styles.page}>
        <Breadcrumb items={[{ label: 'Component Catalog' }]} />
        <div style={{ height: 12 }} />

        {/* Tab bar */}
        <div className={styles.topTabsBar}>
          <div className={styles.topTabs}>
            {['Components', 'Patterns'].map(tab => (
              <div
                key={tab}
                className={`${styles.topTab} ${activeTab === tab ? styles.topTabActive : ''}`}
                onClick={() => setActiveTab(tab)}
                style={{ position: 'relative' }}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="catalog-tab-indicator" className={styles.topTabIndicator} transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.layout}>

          {/* ── Sidebar ── */}
          <nav className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <p className={styles.sidebarTitle}>
                {activeTab === 'Components' ? 'Components' : 'Patterns'}
                <span className={styles.devBadge}>Dev</span>
              </p>
            </div>
            {activeTab === 'Components'
              ? SIDEBAR_SECTIONS.map(section => (
                  <div key={section.id} className={styles.sidebarGroup}>
                    <div className={styles.sidebarGroupLabel}>{section.label}</div>
                    {section.items.map(item => (
                      <button
                        key={item.id}
                        className={`${styles.sidebarItem} ${activeSection === item.id ? styles.sidebarItemActive : ''}`}
                        onClick={() => scrollTo(item.id)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                ))
              : PATTERNS_SECTIONS.map(section => (
                  <div key={section.id} className={styles.sidebarGroup}>
                    <button
                      className={`${styles.sidebarItem} ${activePatternsSection === section.id ? styles.sidebarItemActive : ''}`}
                      style={{ paddingLeft: 16 }}
                      onClick={() => scrollTo(section.id)}
                    >
                      {section.label}
                    </button>
                  </div>
                ))
            }
          </nav>

          {/* ── Content ── */}
          <div className={styles.content}>

          {activeTab === 'Components' && <>

            {/* ══ UI Components ══ */}
            <section className={styles.categorySection} data-catalog-section>
              <h2 className={styles.categoryTitle}>UI Components</h2>

              <Entry
                id="button"
                title="Button"
                description="General-purpose action button. Two visual variants: filled (primary action) and outline (secondary action). Segmented group joins multiple buttons into a single control for mutually exclusive selection."
                demo={
                  <div className={styles.demoStageColumn}>
                    <div className={styles.demoRow}>
                      <span className={styles.demoGroupLabel}>Filled</span>
                      <Button variant="filled">Save Changes</Button>
                      <Button variant="filled" icon="add">Add Item</Button>
                      <Button variant="filled" disabled>Disabled</Button>
                    </div>
                    <div className={styles.demoRow}>
                      <span className={styles.demoGroupLabel}>Outline</span>
                      <Button variant="outline">Cancel</Button>
                      <Button variant="outline" icon="download">Export</Button>
                      <Button variant="outline" disabled>Disabled</Button>
                    </div>
                    <div className={styles.demoRow}>
                      <span className={styles.demoGroupLabel}>Text</span>
                      <Button variant="text">View details</Button>
                      <Button variant="text" icon="open_in_new">Open</Button>
                      <Button variant="text" disabled>Disabled</Button>
                    </div>
                    <div className={styles.demoRow} style={{ alignItems: 'center' }}>
                      <span className={styles.demoGroupLabel}>Sizes</span>
                      <Button variant="filled" size="sm">Small</Button>
                      <Button variant="filled" size="md">Medium</Button>
                      <Button variant="filled" size="lg">Large</Button>
                      <Button variant="outline" size="sm" icon="add">Small</Button>
                      <Button variant="outline" size="md" icon="add">Medium</Button>
                      <Button variant="outline" size="lg" icon="add">Large</Button>
                    </div>
                    <div className={styles.demoRow} style={{ alignItems: 'center' }}>
                      <span className={styles.demoGroupLabel}>Segmented</span>
                      <SegmentedDemo />
                    </div>
                  </div>
                }
                props={PROPS.button}
              />

              <Entry
                id="badge"
                title="Badge"
                description="Status indicator badge. Seven semantic styles, three sizes, and two shapes (round and square for large)."
                demo={
                  <div className={styles.demoStageColumn}>
                    {['action-required','no-action','incomplete','not-initiated','completed','confirmed','cleared'].map(s => (
                      <div key={s} className={styles.demoRow}>
                        <span className={styles.demoGroupLabel} style={{ textTransform: 'none', fontSize: 11 }}>{s}</span>
                        <Badge style={s} size="large" shape="round" label="12" />
                        <Badge style={s} size="large" shape="square" label="12" />
                        <Badge style={s} size="medium" />
                        <Badge style={s} size="small" />
                      </div>
                    ))}
                  </div>
                }
                props={PROPS.badge}
              />

              <Entry
                id="chip"
                title="Chip"
                description="Input chip for filter tags and multi-select inputs. Supports selected state, count badge, and close action."
                demo={
                  <div className={styles.demoStage}>
                    <Chip label="Toggle me" selected={chip1Selected} onClick={() => setChip1Selected(v => !v)} />
                    <Chip label="With count" count={chip2Count} onClick={() => {}} />
                    <Chip label="With close" showClose onClick={() => {}} onClose={() => {}} />
                    <Chip label="Disabled" disabled onClick={() => {}} />
                    <Chip label="Selected" selected />
                  </div>
                }
                props={PROPS.chip}
              />

              <Entry
                id="tag"
                title="Tag"
                description="Compact label pill used to categorise third parties. Appears in the ThirdParties table and the onboarding Summary section. Optional × button for removable chips."
                demo={
                  <div className={styles.demoStage} style={{ flexWrap: 'wrap' }}>
                    <span style={{ display:'inline-flex', alignItems:'center', padding:'2px 8px', borderRadius:'var(--rctp-radius-xs)', background:'var(--neutral-100)', color:'var(--text-normal)', fontSize:11, fontWeight:500, whiteSpace:'nowrap' }}>Paper</span>
                    <span style={{ display:'inline-flex', alignItems:'center', padding:'2px 8px', borderRadius:'var(--rctp-radius-xs)', background:'var(--neutral-100)', color:'var(--text-normal)', fontSize:11, fontWeight:500, whiteSpace:'nowrap' }}>Regional</span>
                    <span style={{ display:'inline-flex', alignItems:'center', padding:'2px 8px', borderRadius:'var(--rctp-radius-xs)', background:'var(--neutral-100)', color:'var(--text-normal)', fontSize:11, fontWeight:500, whiteSpace:'nowrap' }}>Scranton</span>
                    <span style={{ display:'inline-flex', alignItems:'center', background:'var(--text-light)', border:'1px solid var(--neutral-800)', borderRadius:'var(--rctp-radius-sm)', height:24, overflow:'hidden', padding:'0 4px 0 8px', gap:8, fontSize:14, fontWeight:400, color:'var(--neutral-00)', whiteSpace:'nowrap' }}>
                      Finance
                      <button style={{ background:'none', border:'none', color:'var(--neutral-00)', cursor:'pointer', fontSize:14, lineHeight:1, padding:0, opacity:0.8, display:'flex', alignItems:'center' }}>×</button>
                    </span>
                    <span style={{ display:'inline-flex', alignItems:'center', background:'var(--text-light)', border:'1px solid var(--neutral-800)', borderRadius:'var(--rctp-radius-sm)', height:24, overflow:'hidden', padding:'0 4px 0 8px', gap:8, fontSize:14, fontWeight:400, color:'var(--neutral-00)', whiteSpace:'nowrap' }}>
                      Compliance
                      <button style={{ background:'none', border:'none', color:'var(--neutral-00)', cursor:'pointer', fontSize:14, lineHeight:1, padding:0, opacity:0.8, display:'flex', alignItems:'center' }}>×</button>
                    </span>
                  </div>
                }
                props={PROPS.tag}
              />

              <Entry
                id="tooltip"
                title="Tooltip"
                description="CSS-only hover tooltip. Two variants used in the app: a compact single-line dot tooltip (sidebar progress dots) and a wider multi-line info tooltip (risk table info icons). Supports four directions: top, bottom, left, right."
                demo={
                  <div style={{ display:'flex', flexDirection:'column', gap:32, padding:'20px 16px' }}>
                    {/* Row 1: Sm bubble — all 4 directions */}
                    <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                      <span style={{ fontSize:11, color:'var(--text-light)', textTransform:'uppercase', letterSpacing:'0.05em' }}>Dot tooltip</span>
                      <div style={{ display:'flex', gap:48, alignItems:'center', paddingTop:8, paddingBottom:8 }}>
                        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                          <span style={{ fontSize:10, color:'var(--text-light)' }}>top</span>
                          <div className={styles.tooltipTrigger}>
                            <div style={{ width:16, height:16, borderRadius:'50%', background:'var(--success-500)' }} />
                            <div className={styles.tooltipBubbleSm}>Approved</div>
                          </div>
                        </div>
                        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                          <span style={{ fontSize:10, color:'var(--text-light)' }}>bottom</span>
                          <div className={styles.tooltipTrigger}>
                            <div style={{ width:16, height:16, borderRadius:'50%', background:'var(--success-500)' }} />
                            <div className={styles.tooltipBubbleSmBottom}>Approved</div>
                          </div>
                        </div>
                        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                          <span style={{ fontSize:10, color:'var(--text-light)' }}>left</span>
                          <div className={styles.tooltipTrigger}>
                            <div style={{ width:16, height:16, borderRadius:'50%', background:'var(--success-500)' }} />
                            <div className={styles.tooltipBubbleSmLeft}>Approved</div>
                          </div>
                        </div>
                        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                          <span style={{ fontSize:10, color:'var(--text-light)' }}>right</span>
                          <div className={styles.tooltipTrigger}>
                            <div style={{ width:16, height:16, borderRadius:'50%', background:'var(--success-500)' }} />
                            <div className={styles.tooltipBubbleSmRight}>Approved</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Row 2: Lg bubble — all 4 directions */}
                    <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                      <span style={{ fontSize:11, color:'var(--text-light)', textTransform:'uppercase', letterSpacing:'0.05em' }}>Info tooltip</span>
                      <div style={{ display:'flex', gap:48, alignItems:'center', paddingTop:8, paddingBottom:8 }}>
                        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                          <span style={{ fontSize:10, color:'var(--text-light)' }}>top</span>
                          <div className={styles.tooltipTrigger}>
                            <span className="material-icons-outlined" style={{ fontSize:18, color:'var(--text-light)', display:'block', width:18, height:18, lineHeight:'18px' }}>info_outline</span>
                            <div className={styles.tooltipBubbleLg}>Monitored associations being continuously monitored against Risk and Compliance Database</div>
                          </div>
                        </div>
                        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                          <span style={{ fontSize:10, color:'var(--text-light)' }}>bottom</span>
                          <div className={styles.tooltipTrigger}>
                            <span className="material-icons-outlined" style={{ fontSize:18, color:'var(--text-light)', display:'block', width:18, height:18, lineHeight:'18px' }}>info_outline</span>
                            <div className={styles.tooltipBubbleLgBottom}>Monitored associations being continuously monitored against Risk and Compliance Database</div>
                          </div>
                        </div>
                        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                          <span style={{ fontSize:10, color:'var(--text-light)' }}>left</span>
                          <div className={styles.tooltipTrigger}>
                            <span className="material-icons-outlined" style={{ fontSize:18, color:'var(--text-light)', display:'block', width:18, height:18, lineHeight:'18px' }}>info_outline</span>
                            <div className={styles.tooltipBubbleLgLeft}>Monitored associations being continuously monitored against Risk and Compliance Database</div>
                          </div>
                        </div>
                        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                          <span style={{ fontSize:10, color:'var(--text-light)' }}>right</span>
                          <div className={styles.tooltipTrigger}>
                            <span className="material-icons-outlined" style={{ fontSize:18, color:'var(--text-light)', display:'block', width:18, height:18, lineHeight:'18px' }}>info_outline</span>
                            <div className={styles.tooltipBubbleLgRight}>Monitored associations being continuously monitored against Risk and Compliance Database</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                props={PROPS.tooltip}
              />

              <Entry
                id="modal"
                title="Modal"
                description="Centered dialog with a dimmed overlay. Used for destructive confirmations (delete, cancel creation, decline) and renewal prompts. Closes on Escape, backdrop click, or the cancel button. Header, scrollable body, and a cancel/confirm footer."
                demo={
                  <div className={styles.demoStage}>
                    <Button variant="filled" onClick={() => setModalOpen(true)}>Open Modal</Button>
                    <Modal
                      open={modalOpen}
                      title="Confirm Action"
                      onClose={() => setModalOpen(false)}
                      onConfirm={() => setModalOpen(false)}
                      confirmLabel="Confirm"
                      cancelLabel="Cancel"
                    >
                      <p style={{ margin: 0, fontSize: 14, color: 'var(--text-light)', lineHeight: 1.6 }}>
                        This is the modal body content. You can place any content here — forms, descriptions, warnings, etc.
                      </p>
                    </Modal>
                  </div>
                }
                props={PROPS.modal}
              />

            </section>

            {/* ══ Form ══ */}
            <section className={styles.categorySection} data-catalog-section>
              <h2 className={styles.categoryTitle}>Form</h2>

              <Entry
                id="checkbox"
                title="Checkbox"
                description="Custom styled checkbox with support for indeterminate state, error state, disabled state, and small size."
                demo={
                  <div className={styles.demoStageColumn}>
                    <div className={styles.demoCheckboxGroup}>
                      <div className={styles.demoCheckboxCell}><Checkbox checked={cbUnchecked} onChange={() => setCbUnchecked(v => !v)} /><span>Unchecked</span></div>
                      <div className={styles.demoCheckboxCell}><Checkbox checked={cbChecked} onChange={() => setCbChecked(v => !v)} /><span>Checked</span></div>
                      <div className={styles.demoCheckboxCell}><Checkbox checked={false} indeterminate /><span>Indeterminate</span></div>
                      <div className={styles.demoCheckboxCell}><Checkbox checked={false} disabled /><span>Disabled empty</span></div>
                      <div className={styles.demoCheckboxCell}><Checkbox checked={true} disabled /><span>Disabled checked</span></div>
                      <div className={styles.demoCheckboxCell}><Checkbox checked={false} error /><span>Error empty</span></div>
                      <div className={styles.demoCheckboxCell}><Checkbox checked={true} error /><span>Error checked</span></div>
                      <div className={styles.demoCheckboxCell}><Checkbox checked={false} size="small" onChange={() => {}} /><span>Small unchecked</span></div>
                      <div className={styles.demoCheckboxCell}><Checkbox checked={true} size="small" onChange={() => {}} /><span>Small checked</span></div>
                    </div>
                  </div>
                }
                props={PROPS.checkbox}
              />

              <Entry
                id="radio"
                title="Radio"
                description="Custom styled radio button for single-select option groups."
                demo={
                  <div className={styles.demoStage}>
                    <div className={styles.demoCheckboxCell}>
                      <Radio checked={false} onChange={() => setRadioSel(0)} />
                      <span>Unchecked</span>
                    </div>
                    <div className={styles.demoCheckboxCell}>
                      <Radio checked={true} onChange={() => {}} />
                      <span>Checked</span>
                    </div>
                    <div className={styles.demoCheckboxCell}>
                      <Radio checked={false} disabled />
                      <span style={{ color: 'var(--neutral-300)' }}>Disabled empty</span>
                    </div>
                    <div className={styles.demoCheckboxCell}>
                      <Radio checked={true} disabled />
                      <span style={{ color: 'var(--neutral-300)' }}>Disabled checked</span>
                    </div>
                  </div>
                }
                props={PROPS.radio}
              />

              <Entry
                id="textfield"
                title="TextField"
                description="Labeled text input with optional leading icon, helper text, error state, and disabled state."
                demo={
                  <div className={styles.demoStageColumn}>
                    <div className={styles.demoRow}>
                      <TextField label="Default" value={tfValue} onChange={e => setTfValue(e.target.value)} placeholder="Enter value…" style={{ width: 220 }} />
                      <TextField label="With icon" value={tfValue} onChange={e => setTfValue(e.target.value)} placeholder="Search…" icon="search" style={{ width: 220 }} />
                    </div>
                    <div className={styles.demoRow}>
                      <TextField label="With helper" value={tfValue} onChange={e => setTfValue(e.target.value)} placeholder="Legal name" helperText="Enter the full registered legal name" style={{ width: 220 }} />
                      <TextField label="Error state" value="" onChange={() => {}} placeholder="Required field" error={true} errorText="This field is required" style={{ width: 220 }} />
                    </div>
                    <div className={styles.demoRow}>
                      <TextField label="Disabled" value="Locked value" disabled style={{ width: 220 }} />
                    </div>
                  </div>
                }
                props={PROPS.textField}
              />

              <Entry
                id="nativeselect"
                title="NativeSelect"
                description="Labeled native <select> with consistent styling, custom caret, error state, and disabled state."
                demo={
                  <div className={styles.demoStageColumn}>
                    <div className={styles.demoRow}>
                      <NativeSelect label="Default" value={selValue} onChange={v => setSelValue(v)} placeholder="Choose a country…" options={COUNTRIES} style={{ width: 220 }} />
                      <NativeSelect label="With value" value="France" onChange={() => {}} options={COUNTRIES} style={{ width: 220 }} />
                    </div>
                    <div className={styles.demoRow}>
                      <NativeSelect label="Error state" value="" onChange={() => {}} placeholder="Required field" options={COUNTRIES} error style={{ width: 220 }} />
                      <NativeSelect label="Disabled" value="Germany" onChange={() => {}} options={COUNTRIES} disabled style={{ width: 220 }} />
                    </div>
                  </div>
                }
                props={PROPS.nativeSelect}
              />

              <Entry
                id="combobox"
                title="Combobox"
                description="Searchable dropdown. Type to filter options. Extracted from the ObSelect pattern in AddThirdParty."
                demo={
                  <div className={styles.demoStageColumn}>
                    <div className={styles.demoRow}>
                      <Combobox label="Country" value={comboValue} onChange={setComboValue} options={COUNTRIES} placeholder="Type to search…" />
                      <Combobox label="Error state" value="" onChange={() => {}} options={COUNTRIES} placeholder="Required" hasError />
                      <Combobox label="Disabled" value="Japan" onChange={() => {}} options={COUNTRIES} disabled />
                    </div>
                  </div>
                }
                props={PROPS.combobox}
              />

              <Entry
                id="toggle"
                title="Toggle"
                description="Active / Inactive sliding toggle. Used in onboarding, renewal edit, and row status controls."
                demo={
                  <div className={styles.demoStage}>
                    <Toggle value={toggleOn} onChange={setToggleOn} />
                    <Toggle value={true} disabled />
                    <Toggle value={false} disabled />
                  </div>
                }
                props={PROPS.toggle}
              />

              <Entry
                id="fileupload"
                title="File Upload Row"
                description="File picker pattern used by Internal Due Diligence, Approval Stage, and the Decline Panel. Three parts joined into one row: a label that shows either 'Choose Files' or the current filename, a Browse button that opens the native file dialog, and a separate Upload button beneath. Hint text under the row lists allowed file types."
                demo={
                  <div className={styles.demoStageColumn}>
                    <div style={{ width: 520 }}>
                      <div className={styles.fileUploadRow}>
                        <span className={styles.fileUploadLabel}>{uploadName || 'Choose Files'}</span>
                        <button
                          className={styles.fileUploadBrowse}
                          onClick={() => setUploadName(prev => prev ? '' : 'WaystarRoyco-DD-Report.pdf')}
                        >
                          {uploadName ? 'Clear' : 'Browse'}
                        </button>
                      </div>
                      <p className={styles.fileUploadHint}>
                        Click the 'Choose Files' button to browse for a file and then click the 'Upload'. Uploaded files will appear below.
                        Allowed file types include: <strong>.docx,.pdf,.jpeg,.jpg,.png</strong><br />
                        Multiple uploads are permitted
                      </p>
                      <button className={styles.fileUploadBtn} disabled={!uploadName}>Upload</button>
                    </div>
                  </div>
                }
                demoNote="Click Browse to simulate selecting a file. The Upload button is disabled until a file is chosen."
                props={PROPS.fileUpload}
              />
            </section>

            {/* ══ Data Display ══ */}
            <section className={styles.categorySection} data-catalog-section>
              <h2 className={styles.categoryTitle}>Data Display</h2>

              <Entry
                id="riskbadge"
                title="RiskBadge"
                description="Risk level indicator badge with a semantic icon and label. Used in screening tables, association lists, and the profile header while risk assessment is pending."
                demo={
                  <div className={styles.demoStage}>
                    <RiskBadge level="high" />
                    <RiskBadge level="medium" />
                    <RiskBadge level="low" />
                    <RiskBadge level="unknown" />
                  </div>
                }
                props={PROPS.riskBadge}
              />

              <Entry
                id="paginator"
                title="Paginator"
                description="Full pagination bar with page-size selector, result count, and first/prev/next/last navigation."
                demo={
                  <div className={styles.demoStageColumn}>
                    <Paginator
                      page={paginatorPage}
                      totalPages={Math.ceil(140 / paginatorSize)}
                      pageSize={paginatorSize}
                      totalItems={140}
                      onPageChange={setPaginatorPage}
                      onPageSizeChange={s => { setPaginatorSize(s); setPaginatorPage(1); }}
                    />
                    <div style={{ fontSize: 12, color: 'var(--text-light)' }}>
                      Page {paginatorPage} of {Math.ceil(140 / paginatorSize)} · {paginatorSize} per page · 140 total items
                    </div>
                  </div>
                }
                props={PROPS.paginator}
              />

              <Entry
                id="statusbadges"
                title="Status Badges"
                description="Current status chips rendered in the profile header. Defined as STATUS_CONFIG in ProfilePage.jsx. An optional info tooltip variant surfaces a short explanation on hover."
                demo={
                  <div className={styles.demoStageColumn} style={{ gap: 16 }}>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                      {STATUS_ENTRIES.map(s => (
                        <span key={s.label} className={styles.demoStatusBadge} style={{ background: s.bg, color: s.color }}>
                          <span className="material-icons-outlined" style={{ fontSize: 14, display:'block', width:14, height:14, lineHeight:'14px' }}>{s.icon}</span>
                          {s.label}
                        </span>
                      ))}
                    </div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:8, alignItems:'flex-start' }}>
                      {STATUS_ENTRIES.map(s => (
                        <div key={s.label} className={styles.tooltipTrigger}>
                          <span className={styles.demoStatusBadge} style={{ background: s.bg, color: s.color }}>
                            <span className="material-icons-outlined" style={{ fontSize: 14, display:'block', width:14, height:14, lineHeight:'14px' }}>{s.icon}</span>
                            {s.label}
                          </span>
                          <div className={styles.tooltipBubbleLg}>{s.tooltip}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                }
              />

            </section>

            {/* ══ Profile Atoms ══ */}
            <section className={styles.categorySection} data-catalog-section>
              <h2 className={styles.categoryTitle}>Profile Atoms</h2>

              <Entry
                id="profile-header"
                title="Profile Page Header"
                description="Top strip of the TP profile page. Background gradient and right-side color bar change per risk level. Collapses to a 64px slim variant once the user scrolls past 10px — the back link tightens, the name shrinks to 16px, and badges absolute-position to the right. The specimen below uses the production CSS classes from profile.module.css."
                demo={
                  <div className={styles.demoStageColumn}>
                    <div className={styles.demoRow} style={{ marginBottom: 8 }}>
                      <span className={styles.demoGroupLabel}>Risk level</span>
                      {['high','medium','low','pending'].map(r => (
                        <button
                          key={r}
                          onClick={() => setHeaderRisk(r)}
                          style={{
                            padding: '3px 10px', borderRadius: 2, fontSize: 11, fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.3px',
                            background: headerRisk === r ? 'var(--primary-500)' : 'var(--neutral-25)',
                            color: headerRisk === r ? 'var(--neutral-00)' : 'var(--text-light)',
                            border: headerRisk === r ? 'none' : '1px solid var(--neutral-100)',
                          }}
                        >{r}</button>
                      ))}
                    </div>
                    <div className={styles.demoRow} style={{ marginBottom: 12 }}>
                      <span className={styles.demoGroupLabel}>Scroll state</span>
                      {[{ k: false, label: 'Expanded' }, { k: true, label: 'Scrolled' }].map(s => (
                        <button
                          key={s.label}
                          onClick={() => setHeaderScrolled(s.k)}
                          style={{
                            padding: '3px 10px', borderRadius: 2, fontSize: 11, fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.3px',
                            background: headerScrolled === s.k ? 'var(--primary-500)' : 'var(--neutral-25)',
                            color: headerScrolled === s.k ? 'var(--neutral-00)' : 'var(--text-light)',
                            border: headerScrolled === s.k ? 'none' : '1px solid var(--neutral-100)',
                          }}
                        >{s.label}</button>
                      ))}
                    </div>
                    {(() => {
                      const riskCls = headerRisk === 'high' ? profileStyles.tpTopStripHigh
                        : headerRisk === 'medium' ? profileStyles.tpTopStripMedium
                        : headerRisk === 'low' ? profileStyles.tpTopStripLow
                        : profileStyles.tpTopStripPending;
                      const riskBadgeCls = headerRisk === 'high' ? profileStyles.badgeHigh
                        : headerRisk === 'medium' ? profileStyles.badgeMedium
                        : headerRisk === 'low' ? profileStyles.badgeLow
                        : profileStyles.badgePending;
                      return (
                        <div className={`${profileStyles.tpTopStrip} ${riskCls} ${headerScrolled ? profileStyles.tpTopStripScrolled : ''}`}>
                          <div className={profileStyles.tpPageHeader}>
                            <span className={profileStyles.tpBack}>
                              <span className="material-icons-outlined">chevron_left</span> Back
                            </span>
                            <div className={profileStyles.tpTitleRow}>
                              <div className={profileStyles.tpNameGroup}>
                                <h1>Pied Piper Inc.</h1>
                                <span className={profileStyles.tpVerified}>
                                  <span className="material-icons-outlined">verified</span>
                                  Entity Verified
                                </span>
                              </div>
                              <div className={profileStyles.tpBadges}>
                                <div className={profileStyles.tpBadgeGroup}>
                                  <div className={profileStyles.tpBadgeLabel}>Current status:</div>
                                  <div className={`${profileStyles.badge} ${profileStyles.statusApproved} ${profileStyles.badgeBtn}`}>
                                    Approved
                                    <span className="material-icons-outlined" style={{ fontSize: 16 }}>check_circle</span>
                                  </div>
                                </div>
                                <div className={profileStyles.tpBadgeGroup}>
                                  <div className={profileStyles.tpBadgeLabel}>Risk level:</div>
                                  <div className={`${profileStyles.badge} ${riskBadgeCls} ${profileStyles.badgeBtn}`}>
                                    {headerRisk === 'pending' ? 'Pending' : headerRisk.charAt(0).toUpperCase() + headerRisk.slice(1)}
                                    <RiskLevelIcon level={headerRisk === 'pending' ? 'low' : headerRisk} size={14} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                }
                demoNote="Risk level buttons toggle the strip variant. Scroll state toggles between the 100px expanded and 64px collapsed forms — in production this happens automatically once window.scrollY > 10."
              />

              <Entry
                id="field-grid"
                title="Field Grid"
                description="4-column label/value grid used in the Overview tab of the TP profile. Labels are small-caps primary-500; values are 16px text-normal. Renders empty fields as em-dashes."
                demo={
                  <div className={styles.fieldGrid}>
                    {[
                      { label: 'Entity Legal Name', value: 'Pied Piper Inc.' },
                      { label: 'Registered Country', value: '🇺🇸 United States' },
                      { label: 'Entity Type', value: 'Limited Liability Company' },
                      { label: 'Process Name', value: 'Standard RCTP' },
                      { label: 'Business Unit', value: 'Technology' },
                      { label: 'Third Party Owner', value: 'Richard Hendricks' },
                      { label: 'Tags', value: 'SaaS, US, Regional' },
                      { label: 'Internal Reference', value: <span className={styles.fieldValueLight}>—</span> },
                    ].map(f => (
                      <div key={f.label}>
                        <div className={styles.fieldLabel}>{f.label}</div>
                        <div className={styles.fieldValue}>{f.value}</div>
                      </div>
                    ))}
                  </div>
                }
                demoNote="Grid is 4-column on desktop. Each cell renders independently — value can be plain text, a flag string, a link, or an overdue badge."
              />
            </section>

            {/* ══ Design Tokens ══ */}
            <section className={styles.categorySection} data-catalog-section>
              <h2 className={styles.categoryTitle}>Design Tokens</h2>

              {/* Colors */}
              <div id="tokens-colors" className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Colors</h3>
                  <p className={styles.entryDesc}>All CSS custom properties from globals.css. Values are read at runtime via getComputedStyle.</p>
                </div>
                <div className={styles.tokenSection}>
                  {COLOR_GROUPS.map(group => (
                    <div key={group.label}>
                      <div className={styles.tokenGroupTitle}>{group.label}</div>
                      <div className={styles.tokenColorGrid}>
                        {group.tokens.map(t => (
                          <TokenSwatch key={t} name={t} value={colorTokens[t] || '…'} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div id="tokens-typography" className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Typography</h3>
                  <p className={styles.entryDesc}>Type scale specimens. Fonts: Simplon Norm (headings), Roboto (body/labels), Source Code Pro (mono).</p>
                </div>
                <div className={styles.tokenSection}>
                  {TYPE_SPECIMENS.map(spec => (
                    <div key={spec.label} className={styles.typeSpecimen}>
                      <div className={styles.typeSpecimenMeta}>
                        <span className={styles.typeMetaLabel}>{spec.label}</span>
                        <span className={styles.typeMetaValues}>{spec.size} / {spec.lineHeight} / {spec.weight} / {spec.family}</span>
                      </div>
                      <span style={{ fontSize: spec.size, lineHeight: spec.lineHeight, fontWeight: spec.weight, fontFamily: spec.family === 'Simplon Norm' ? 'var(--font-heading)' : 'var(--font-body)', color: 'var(--text-normal)' }}>
                        {spec.sample}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spacing */}
              <div id="tokens-spacing" className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Spacing</h3>
                  <p className={styles.entryDesc}>4px-base spacing scale tokens.</p>
                </div>
                <div className={styles.tokenSection}>
                  {SPACING_TOKENS.map(s => (
                    <div key={s.name} className={styles.spacingRow}>
                      <span className={styles.spacingLabel}>{s.name}</span>
                      <div className={styles.spacingBar} style={{ width: s.px * 2 }} />
                      <span style={{ fontSize: 11, color: 'var(--text-light)', fontFamily: 'var(--font-mono, monospace)' }}>{s.px}px</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shadows */}
              <div id="tokens-shadows" className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Shadows</h3>
                  <p className={styles.entryDesc}>Box shadow tokens used across cards, dropdowns, and overlays.</p>
                </div>
                <div className={styles.tokenSection}>
                  {SHADOW_TOKENS.map(s => (
                    <div key={s.name} className={styles.shadowRow}>
                      <div className={styles.shadowBox} style={{ boxShadow: s.value }} />
                      <div className={styles.shadowMeta}>
                        <span className={styles.shadowName}>{s.name}</span>
                        <span className={styles.shadowValue}>{s.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Radii */}
              <div id="tokens-radii" className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Radii</h3>
                  <p className={styles.entryDesc}>Border radius tokens from sharp (2px) to full pill (1000px).</p>
                </div>
                <div className={styles.tokenSection}>
                  <div className={styles.radiiRow}>
                    {RADII_TOKENS.map(r => (
                      <div key={r.name} className={styles.radiiItem}>
                        <div className={styles.radiiBox} style={{ borderRadius: r.value }} />
                        <span className={styles.radiiLabel}>{r.name}<br />{r.value}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 24 }}>
                    <div className={styles.tokenGroupTitle}>Z-Index Scale</div>
                    {Z_TOKENS.map(z => (
                      <div key={z.name} className={styles.zIndexRow}>
                        <span className={styles.zIndexName}>{z.name}</span>
                        <span className={styles.zIndexValue}>{z.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </section>

          </>}

          {activeTab === 'Patterns' && <>

            {/* ══ Tables ══ */}
            <section id="pattern-tables" className={styles.categorySection} data-catalog-section style={{ scrollMarginTop: 68 }}>
              <h2 className={styles.categoryTitle}>Tables</h2>
              <div className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Table Variants</h3>
                  <p className={styles.entryDesc}>Six distinct table patterns used across the app. All share the same CSS foundation (neutral-25 header, primary-08/neutral-00 striping, hover state) but differ in structure and purpose.</p>
                </div>
                <div className={styles.demoShell}>
                  <div className={styles.demoLabel}>Live Demo</div>
                  <div style={{ padding: '16px 16px 20px' }}>
                    {/* Tab bar */}
                    <div className={styles.tableVariantTabs}>
                      {['Enterprise', 'Permission Matrix', 'Relationship', 'Audit Log', 'Properties', 'Admin List'].map(v => (
                        <div
                          key={v}
                          className={`${styles.tableVariantTab} ${tableVariant === v ? styles.tableVariantTabActive : ''}`}
                          onClick={() => setTableVariant(v)}
                          style={{ position: 'relative' }}
                        >
                          {v}
                          {tableVariant === v && (
                            <motion.div layoutId="table-variant-indicator" className={styles.tableVariantIndicator} transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }} />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* ── Variant 1: Enterprise Data Table ── */}
                    {tableVariant === 'Enterprise' && (
                      <div>
                        <p className={styles.variantDesc}>Used in: ThirdParties, ProfileDocuments, Catalog demo. Card wrapper, striped rows, sortable headers, cell links, status badges, tag lists.</p>
                        <table className={styles.specimenTable} style={{ minWidth: 0 }}>
                          <thead>
                            <tr>
                              <th>Name <span className={`material-icons-outlined ${styles.sortIcon}`}>arrow_drop_down</span></th>
                              <th>Owner <span className={`material-icons-outlined ${styles.sortIcon}`}>arrow_drop_down</span></th>
                              <th>Business Unit</th>
                              <th>Tags</th>
                              <th>Status</th>
                              <th>Risk</th>
                            </tr>
                          </thead>
                          <tbody>
                            {SAMPLE_ROWS.map((r, i) => (
                              <tr key={i}>
                                <td><span className={styles.cellLink}>{r.name}</span></td>
                                <td>{r.owner}</td>
                                <td>{r.bu}</td>
                                <td>
                                  <div className={styles.tagList}>
                                    {r.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                                  </div>
                                </td>
                                <td>
                                  <span className={styles.statusBadge} style={{
                                    background: r.status === 'Approved' ? 'var(--success-100)' : r.status === 'Not Approved' ? 'var(--alert-100)' : 'var(--neutral-50)',
                                    color: r.status === 'Approved' ? 'var(--success-900)' : r.status === 'Not Approved' ? 'var(--alert-700)' : 'var(--text-normal)',
                                  }}>{r.status}</span>
                                </td>
                                <td><RiskBadge level={r.risk} /></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* ── Variant 2: Permission Matrix ── */}
                    {tableVariant === 'Permission Matrix' && (
                      <div>
                        <p className={styles.variantDesc}>Used in: RoleDetails, Settings Stages. Nested accordion groups, checkbox cells, column toggle-all in header, N/A cells (—), expandable sub-rows with indent bar.</p>
                        <table className={styles.specimenTable} style={{ minWidth: 0 }}>
                          <thead>
                            <tr>
                              <th style={{ width: '34%' }}>Section</th>
                              <th style={{ width: '11%', textAlign: 'center' }}>View</th>
                              <th style={{ width: '11%', textAlign: 'center' }}>Edit</th>
                              <th style={{ width: '11%', textAlign: 'center' }}>Create</th>
                              <th style={{ width: '11%', textAlign: 'center' }}>Delete</th>
                              <th style={{ width: '11%', textAlign: 'center' }}>Export</th>
                              <th style={{ width: '11%', textAlign: 'center' }}>Reassign</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>General</td>
                              <td style={{ textAlign: 'center' }}><Checkbox checked={true} onChange={() => {}} size="small" /></td>
                              <td style={{ textAlign: 'center' }}><Checkbox checked={true} onChange={() => {}} size="small" /></td>
                              <td style={{ textAlign: 'center' }}><Checkbox checked={false} onChange={() => {}} size="small" /></td>
                              <td style={{ textAlign: 'center' }}><Checkbox checked={false} onChange={() => {}} size="small" /></td>
                              <td style={{ textAlign: 'center' }}><Checkbox checked={true} onChange={() => {}} size="small" /></td>
                              <td style={{ textAlign: 'center', color: 'var(--neutral-300)' }}>—</td>
                            </tr>
                            <tr>
                              <td>Risk Level</td>
                              <td style={{ textAlign: 'center' }}><Checkbox checked={true} onChange={() => {}} size="small" /></td>
                              <td style={{ textAlign: 'center' }}><Checkbox checked={false} onChange={() => {}} size="small" /></td>
                              <td style={{ textAlign: 'center', color: 'var(--neutral-300)' }}>—</td>
                              <td style={{ textAlign: 'center', color: 'var(--neutral-300)' }}>—</td>
                              <td style={{ textAlign: 'center' }}><Checkbox checked={true} onChange={() => {}} size="small" /></td>
                              <td style={{ textAlign: 'center', color: 'var(--neutral-300)' }}>—</td>
                            </tr>
                            <tr>
                              <td>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                  <span style={{ display: 'inline-block', width: 3, height: 16, background: 'var(--primary-300)', borderRadius: 'var(--rctp-radius-xs)', marginLeft: 12, marginRight: 4 }} />
                                  Due Diligence — Internal
                                </span>
                              </td>
                              <td style={{ textAlign: 'center' }}><Checkbox checked={true} onChange={() => {}} size="small" /></td>
                              <td style={{ textAlign: 'center' }}><Checkbox checked={true} onChange={() => {}} size="small" /></td>
                              <td style={{ textAlign: 'center' }}><Checkbox checked={false} onChange={() => {}} size="small" /></td>
                              <td style={{ textAlign: 'center', color: 'var(--neutral-300)' }}>—</td>
                              <td style={{ textAlign: 'center' }}><Checkbox checked={false} onChange={() => {}} size="small" /></td>
                              <td style={{ textAlign: 'center', color: 'var(--neutral-300)' }}>—</td>
                            </tr>
                            <tr>
                              <td>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                  <span style={{ display: 'inline-block', width: 3, height: 16, background: 'var(--primary-300)', borderRadius: 'var(--rctp-radius-xs)', marginLeft: 12, marginRight: 4 }} />
                                  Due Diligence — External
                                </span>
                              </td>
                              <td style={{ textAlign: 'center' }}><Checkbox checked={true} onChange={() => {}} size="small" /></td>
                              <td style={{ textAlign: 'center' }}><Checkbox checked={false} onChange={() => {}} size="small" /></td>
                              <td style={{ textAlign: 'center', color: 'var(--neutral-300)' }}>—</td>
                              <td style={{ textAlign: 'center', color: 'var(--neutral-300)' }}>—</td>
                              <td style={{ textAlign: 'center', color: 'var(--neutral-300)' }}>—</td>
                              <td style={{ textAlign: 'center', color: 'var(--neutral-300)' }}>—</td>
                            </tr>
                            <tr>
                              <td>Documents</td>
                              <td style={{ textAlign: 'center' }}><Checkbox checked={true} onChange={() => {}} size="small" /></td>
                              <td style={{ textAlign: 'center' }}><Checkbox checked={true} onChange={() => {}} size="small" /></td>
                              <td style={{ textAlign: 'center' }}><Checkbox checked={true} onChange={() => {}} size="small" /></td>
                              <td style={{ textAlign: 'center' }}><Checkbox checked={false} onChange={() => {}} size="small" /></td>
                              <td style={{ textAlign: 'center' }}><Checkbox checked={true} onChange={() => {}} size="small" /></td>
                              <td style={{ textAlign: 'center', color: 'var(--neutral-300)' }}>—</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* ── Variant 3: Relationship Table ── */}
                    {tableVariant === 'Relationship' && (
                      <div>
                        <p className={styles.variantDesc}>Used in: Profile Connections, Profile Suggested. Embedded in tab panels (no card wrapper), radio-button row selection, action toolbar activates on selection.</p>
                        <table className={styles.specimenTable} style={{ minWidth: 0 }}>
                          <thead>
                            <tr>
                              <th style={{ width: 32 }} />
                              <th>Third Party Name</th>
                              <th>Connection Type</th>
                              <th>ID Type</th>
                              <th>ID Value</th>
                              <th>Country</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { name: 'Pied Piper Ltd (UK)', type: 'Subsidiary', idType: 'CRN', id: '12345678', country: 'United Kingdom' },
                              { name: 'Hooli Corporation', type: 'Competitor', idType: 'LEI', id: '5493001KJTIIGC8Y1R12', country: 'United States' },
                              { name: 'Raviga Capital', type: 'Investor', idType: 'EIN', id: '47-1234567', country: 'United States' },
                            ].map((r, i) => (
                              <tr key={i} style={{ cursor: 'pointer' }}>
                                <td style={{ textAlign: 'center' }}>
                                  <input type="radio" name="rel-demo" readOnly style={{ accentColor: 'var(--primary-500)', cursor: 'pointer' }} />
                                </td>
                                <td><span className={styles.cellLink}>{r.name}</span></td>
                                <td>{r.type}</td>
                                <td>{r.idType}</td>
                                <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{r.id}</td>
                                <td>{r.country}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* ── Variant 4: Audit Log ── */}
                    {tableVariant === 'Audit Log' && (
                      <div>
                        <p className={styles.variantDesc}>Used in: ProfileAudit. Advanced filter toolbar, sortable headers, linked source cells, multi-line summary cells, empty state when filters return nothing.</p>
                        <table className={styles.specimenTable} style={{ minWidth: 0 }}>
                          <thead>
                            <tr>
                              <th style={{ width: 130 }}>Date <span className={`material-icons-outlined ${styles.sortIcon}`}>arrow_drop_down</span></th>
                              <th style={{ width: 160 }}>Added By <span className={`material-icons-outlined ${styles.sortIcon}`}>arrow_drop_down</span></th>
                              <th style={{ width: 180 }}>Source <span className={`material-icons-outlined ${styles.sortIcon}`}>arrow_drop_down</span></th>
                              <th>Summary</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { date: '19 May 2026 09:14', by: 'Richard Hendricks', source: 'Onboarding', summary: 'Third party created via onboarding wizard. Entity type: Entity. Country: United States.' },
                              { date: '18 May 2026 14:32', by: 'Monica Hall', source: 'Risk Assessment', summary: 'Risk level updated: Low → Medium\nTriggered by new screening result.' },
                              { date: '17 May 2026 11:05', by: 'Jared Dunn', source: 'Documents', summary: 'Document uploaded: Due Diligence Report Q1 2026.pdf (2.4 MB)' },
                              { date: '15 May 2026 16:48', by: 'System', source: 'Renewal', summary: 'Renewal reminder sent. Next renewal due: 15 Aug 2026.' },
                            ].map((r, i) => (
                              <tr key={i}>
                                <td style={{ whiteSpace: 'nowrap', fontSize: 12, color: 'var(--text-light)' }}>{r.date}</td>
                                <td>{r.by}</td>
                                <td><span className={styles.cellLink}>{r.source}</span></td>
                                <td style={{ whiteSpace: 'pre-line', fontSize: 13 }}>{r.summary}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* ── Variant 5: Properties/Metadata ── */}
                    {tableVariant === 'Properties' && (
                      <div>
                        <p className={styles.variantDesc}>Used in: ProfileProperties. Boolean icon cells (warning/flag), status badge columns, per-row edit button (not a ⋮ menu), sortable headers.</p>
                        <table className={styles.specimenTable} style={{ minWidth: 0 }}>
                          <thead>
                            <tr>
                              <th>Field Name <span className={`material-icons-outlined ${styles.sortIcon}`}>arrow_drop_down</span></th>
                              <th>Value</th>
                              <th style={{ width: 60, textAlign: 'center' }}>Key Risk</th>
                              <th style={{ width: 60, textAlign: 'center' }}>Red Flag</th>
                              <th style={{ width: 60, textAlign: 'center' }}>Score</th>
                              <th style={{ width: 110 }}>Tag</th>
                              <th style={{ width: 48 }} />
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { field: 'Country Risk', value: 'High', keyRisk: true, flag: false, score: 22, tag: 'Financial' },
                              { field: 'PEP Status', value: 'Not a PEP', keyRisk: false, flag: false, score: null, tag: 'Integrity' },
                              { field: 'Sanctions Screening', value: 'Clear', keyRisk: true, flag: true, score: 5, tag: 'Screening' },
                              { field: 'Ultimate Beneficial Owner', value: null, keyRisk: false, flag: false, score: null, tag: 'Ownership' },
                            ].map((r, i) => (
                              <tr key={i}>
                                <td>{r.field}</td>
                                <td>
                                  {r.value
                                    ? <span className={styles.statusBadge} style={{ background: 'var(--primary-08)', color: 'var(--primary-700)' }}>{r.value}</span>
                                    : <span style={{ color: 'var(--neutral-300)' }}>—</span>}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                  {r.keyRisk ? <span className="material-icons-outlined" style={{ fontSize: 16, color: 'var(--warning-500)' }}>warning</span> : null}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                  {r.flag ? <span className="material-icons-outlined" style={{ fontSize: 16, color: 'var(--alert-500)' }}>flag</span> : null}
                                </td>
                                <td style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-normal)' }}>{r.score ?? <span style={{ color: 'var(--neutral-300)' }}>—</span>}</td>
                                <td><span className={styles.statusBadge} style={{ background: 'var(--primary-08)', color: 'var(--primary-700)' }}>{r.tag}</span></td>
                                <td style={{ textAlign: 'center' }}>
                                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', display: 'inline-flex', alignItems: 'center' }}>
                                    <span className="material-icons-outlined" style={{ fontSize: 16 }}>edit</span>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* ── Variant 6: Admin List ── */}
                    {tableVariant === 'Admin List' && (
                      <div>
                        <p className={styles.variantDesc}>Used in: CompanyAdmin Roles. Lightweight, no card wrapper, two-line name+description cell, per-row ⋮ dropdown action menu with navigation actions.</p>
                        <table className={styles.specimenTable} style={{ minWidth: 0 }}>
                          <thead>
                            <tr>
                              <th>Role Name</th>
                              <th style={{ width: 160, textAlign: 'center' }}>Restricted to TPs</th>
                              <th style={{ width: 160, textAlign: 'center' }}>Restricted to Employees</th>
                              <th style={{ width: 48 }} />
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { name: 'Standard RCTP Manager', desc: 'Full access to standard RCTP workflows and approvals.', tps: true, emp: false },
                              { name: 'Read Only Auditor', desc: 'View-only access across all modules. Cannot edit or approve.', tps: false, emp: false },
                              { name: 'Enhanced Due Diligence', desc: 'Access to EDD workflows and associated documents.', tps: true, emp: true },
                            ].map((r, i) => (
                              <tr key={i}>
                                <td>
                                  <div style={{ fontWeight: 500, color: 'var(--text-normal)', fontSize: 13 }}>{r.name}</div>
                                  <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 2 }}>{r.desc}</div>
                                </td>
                                <td style={{ textAlign: 'center', fontSize: 13 }}>
                                  {r.tps ? <span style={{ color: 'var(--success-700)' }}>Yes</span> : <span style={{ color: 'var(--neutral-400)' }}>No</span>}
                                </td>
                                <td style={{ textAlign: 'center', fontSize: 13 }}>
                                  {r.emp ? <span style={{ color: 'var(--success-700)' }}>Yes</span> : <span style={{ color: 'var(--neutral-400)' }}>No</span>}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', display: 'inline-flex', alignItems: 'center' }}>
                                    <span className="material-icons-outlined" style={{ fontSize: 18 }}>more_vert</span>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </section>

            {/* ══ Cards ══ */}
            <section id="pattern-cards" className={styles.categorySection} data-catalog-section style={{ scrollMarginTop: 68 }}>
              <h2 className={styles.categoryTitle}>Cards</h2>

              {/* Third Party Type cards */}
              <div className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Third Party Type Card</h3>
                  <p className={styles.entryDesc}>Selection cards shown in the first step of the onboarding wizard. Three options: Entity, Person, Unknown. Clicking selects the card — border turns primary-500, icon background fills blue, a check icon appears top-right. Used only in AddThirdParty.jsx.</p>
                </div>
                <div className={styles.demoShell}>
                  <div className={styles.demoLabel}>Live Demo</div>
                  <div style={{ padding: '20px 20px 24px' }}>
                    <div className={styles.typeCards}>
                      {[
                        { id: 'entity',  icon: 'business',     title: 'Entity',  desc: 'A company, firm, partnership or other registered legal entity.' },
                        { id: 'person',  icon: 'person',        title: 'Person',  desc: 'A natural person acting as a sole trader, contractor or individual.' },
                        { id: 'unknown', icon: 'help_outline',  title: 'Unknown', desc: 'The type of third party is not yet known or cannot be determined.' },
                      ].map(t => (
                        <div
                          key={t.id}
                          className={`${styles.typeCard} ${selectedType === t.id ? styles.typeCardSelected : ''}`}
                          onClick={() => setSelectedType(t.id)}
                        >
                          {selectedType === t.id && (
                            <span className={`material-icons-outlined ${styles.typeCheck}`}>check_circle</span>
                          )}
                          <div className={styles.typeIconWrap}>
                            <span className="material-icons-outlined">{t.icon}</span>
                          </div>
                          <div className={styles.typeTitle}>{t.title}</div>
                          <div className={styles.typeDesc}>{t.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Level Cards */}
              <div className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Risk Level Card (rcard)</h3>
                  <p className={styles.entryDesc}>Used in the Risk Level Report section of the profile page. One card per risk category (Country Risk, Bribery & Corruption, General, Human Rights, Cyber, Environmental, Screening & Monitoring). 123px tall, gradient background keyed to risk level, absolute-positioned labels, risk badge, red flags count, and category score. Screening & Monitoring never shows a score.</p>
                </div>
                <div className={styles.demoShell}>
                  <div className={styles.demoLabel}>Live Demo</div>
                  <div style={{ padding: 20 }}>
                    <div className={styles.riskCardRow}>
                      {[
                        { level: 'low',    label: 'Country Risk',           flags: 0, score: 1  },
                        { level: 'medium', label: 'Bribery & Corruption',   flags: 1, score: 9  },
                        { level: 'high',   label: 'General',                flags: 5, score: 22 },
                        { level: 'medium', label: 'Screening & Monitoring', flags: 2, score: null },
                      ].map((r, i) => (
                        <div key={i} className={`${styles.riskCard} ${styles['riskCard_' + r.level]}`}>
                          <span className={styles.riskCardTitle}>{r.label}</span>
                          <span className={styles.riskCardLbl} style={{ top: 46 }}>Risk level</span>
                          <span className={styles.riskCardBadge}><RiskBadge level={r.level} /></span>
                          <span className={styles.riskCardLbl} style={{ top: 75 }}>Red flags</span>
                          <span className={styles.riskCardVal} style={{ top: 75 }}>{r.flags}</span>
                          {r.score !== null && <>
                            <span className={styles.riskCardLbl} style={{ top: 100 }}>Score</span>
                            <span className={styles.riskCardVal} style={{ top: 100 }}>{r.score}</span>
                          </>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ══ Navigation ══ */}
            <section id="pattern-navigation" className={styles.categorySection} data-catalog-section style={{ scrollMarginTop: 68 }}>
              <h2 className={styles.categoryTitle}>Navigation</h2>
              <div className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Tab Bar</h3>
                  <p className={styles.entryDesc}>Animated tab bar using Framer Motion layoutId shared underline indicator. Canonical pattern per CLAUDE.md.</p>
                </div>
                <div className={styles.demoShell}>
                  <div className={styles.demoLabel}>Live Demo</div>
                  <div style={{ padding: '16px 16px 0' }}>
                    <div className={styles.tabBarWrap}>
                      <div className={styles.tabBar}>
                        {['Overview', 'Risk Assessment', 'Due Diligence', 'Documents'].map(tab => (
                          <div
                            key={tab}
                            className={`${styles.tabItem} ${patternTab === tab ? styles.tabItemActive : ''}`}
                            onClick={() => setPatternTab(tab)}
                            style={{ position: 'relative' }}
                          >
                            {tab}
                            {patternTab === tab && (
                              <motion.div layoutId="pattern-tab-indicator" className={styles.tabIndicator} transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ padding: '16px 0 16px', fontSize: 13, color: 'var(--text-light)' }}>
                      Active tab: <strong style={{ color: 'var(--text-normal)' }}>{patternTab}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Sidebar Nav</h3>
                  <p className={styles.entryDesc}>Left sidebar navigation pattern used in Settings, CompanyAdmin, and this catalog. Width: 226px, height: 40px per item.</p>
                </div>
                <div className={styles.demoShell}>
                  <div className={styles.demoLabel}>Live Demo</div>
                  <div style={{ padding: 16 }}>
                    <div style={{ width: 226, border: '1px solid var(--neutral-50)', background: 'var(--neutral-00)' }}>
                      <div style={{ padding: '10px 16px 6px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--neutral-400)', borderBottom: '1px solid var(--neutral-50)' }}>General</div>
                      {['Currency & Approval Groups', 'Risk Scoring', 'Red Flags', 'Renewals'].map((item, i) => (
                        <div key={item} style={{ display: 'flex', alignItems: 'center', height: 40, padding: '0 16px', fontSize: 14, borderBottom: '1px solid var(--neutral-50)', cursor: 'pointer', background: i === 0 ? 'var(--primary-500)' : 'transparent', color: i === 0 ? 'var(--neutral-00)' : 'var(--text-light)' }}>
                          {item}
                        </div>
                      ))}
                      <div style={{ padding: '10px 16px 6px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--neutral-400)', borderBottom: '1px solid var(--neutral-50)' }}>Process</div>
                      {['Stages', 'Questionnaires', 'Approval Groups'].map(item => (
                        <div key={item} style={{ display: 'flex', alignItems: 'center', height: 40, padding: '0 16px', fontSize: 14, borderBottom: '1px solid var(--neutral-50)', cursor: 'pointer', color: 'var(--text-light)' }}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Breadcrumb</h3>
                  <p className={styles.entryDesc}>Navigation breadcrumb trail. Home icon + slash separators. Last item is the current page (plain text).</p>
                </div>
                <div className={styles.demoShell}>
                  <div className={styles.demoStageColumn}>
                    <Breadcrumb items={[{ label: 'Third Parties', to: '/third-parties' }, { label: 'Pied Piper Inc.' }]} />
                    <Breadcrumb items={[{ label: 'Settings', to: '/settings/general/currency_approval_groups' }, { label: 'General' }, { label: 'Currency & Approval Groups' }]} />
                    <Breadcrumb items={[{ label: 'Company Admin', to: '/company-admin/roles' }, { label: 'Roles' }, { label: 'Standard RCTP Analyst' }]} />
                  </div>
                </div>
              </div>
            </section>

            {/* ══ Profile Sidenav ══ */}
            <section id="pattern-sidenav" className={styles.categorySection} data-catalog-section style={{ scrollMarginTop: 68 }}>
              <h2 className={styles.categoryTitle}>Profile Sidenav</h2>
              <div className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Profile Side Navigation</h3>
                  <p className={styles.entryDesc}>Left nav used on every profile page. Three regions separated by dividers: a Summary link at the top, workflow steps with status dots, and section links (Properties, Documents, etc.). Steps can carry partner icons with tooltips and a "New" badge. Dot colors signal task completion state — hover the dot to see the tooltip label.</p>
                </div>
                <div className={styles.demoShell}>
                  <div className={styles.demoLabel}>Live Demo</div>
                  <div style={{ padding: '20px', display: 'flex', gap: 40, alignItems: 'flex-start' }}>

                    {/* ── Sidenav specimen ── */}
                    <div className={styles.sidenavSpecimen}>

                      {/* Summary link — active */}
                      <div className={styles.sidenavItemActive}>Summary Page</div>

                      <div className={styles.sidenavDivider} />

                      {/* Workflow steps */}
                      {[
                        { label: 'Risk Assessment',              dot: 'green' },
                        { label: 'Due Diligence',                dot: 'green' },
                        { label: 'Integrity Check',              dot: 'green',   newTag: true, partnerTooltip: 'Powered by Xapiens' },
                        { label: 'Enhanced Due Diligence',       dot: 'grey' },
                        { label: 'UBO',                          dot: 'green',   partnerTooltip: 'Powered by Duns & Bradstreet' },
                        { label: 'Risk Mitigation',              dot: 'red' },
                        { label: 'Approval',                     dot: 'amber' },
                        { label: 'Screening & Monitoring',       dot: 'blocked' },
                      ].map((step, i) => {
                        const dotBg = step.dot === 'green' ? 'var(--success-500)'
                          : step.dot === 'red'     ? 'var(--alert-500)'
                          : step.dot === 'amber'   ? 'var(--warning-500)'
                          : step.dot === 'blocked' ? 'var(--neutral-200)'
                          : 'var(--text-light)';
                        const dotLabel = step.dot === 'green'   ? 'Complete'
                          : step.dot === 'red'     ? 'Required — Not Started'
                          : step.dot === 'amber'   ? 'Required — In Progress'
                          : step.dot === 'blocked' ? 'Blocked by another activity'
                          : 'Not Required';
                        return (
                          <div key={i} className={styles.sidenavItem}>
                            {/* Dot with tooltip */}
                            <span className={styles.sidenavDotWrap}>
                              <span className={styles.sidenavDot} style={{ background: dotBg }} />
                              <span className={styles.sidenavDotTooltip}>{dotLabel}</span>
                            </span>
                            {/* Label */}
                            <span style={{ flex: 1 }}>{step.label}</span>
                            {/* Partner icon + tooltip */}
                            {step.partnerTooltip && (
                              <span className={styles.sidenavPartnerWrap}>
                                <span className={styles.sidenavPartnerIcon}>
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="7.5" fill="white" stroke="#B1BCC5" />
                                    <text x="8" y="11" textAnchor="middle" fontSize="8" fill="#4A6FA5" fontWeight="bold">P</text>
                                  </svg>
                                </span>
                                <span className={styles.sidenavTooltip}>{step.partnerTooltip}</span>
                              </span>
                            )}
                            {/* New badge */}
                            {step.newTag && <span className={styles.sidenavNewTag}>New</span>}
                          </div>
                        );
                      })}

                      <div className={styles.sidenavDivider} />

                      {/* Section links */}
                      {[
                        { label: 'Properties' },
                        { label: 'Documents' },
                        { label: 'Entity Verification', partnerTooltip: 'Powered by Duns & Bradstreet' },
                        { label: 'Audit' },
                      ].map((sec, i) => (
                        <div key={i} className={i === 0 ? styles.sidenavSectionActive : styles.sidenavSection}>
                          <span style={{ flex: 1 }}>{sec.label}</span>
                          {sec.partnerTooltip && (
                            <span className={styles.sidenavPartnerWrap}>
                              <span className={styles.sidenavPartnerIcon}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                  <circle cx="8" cy="8" r="7.5" fill="white" stroke="#B1BCC5" />
                                  <text x="8" y="11" textAnchor="middle" fontSize="8" fill="#4A6FA5" fontWeight="bold">P</text>
                                </svg>
                              </span>
                              <span className={styles.sidenavTooltip}>{sec.partnerTooltip}</span>
                            </span>
                          )}
                        </div>
                      ))}

                      <div className={styles.sidenavDivider} />
                    </div>

                    {/* ── Dot legend ── */}
                    <div className={styles.sidenavLegend}>
                      <div className={styles.sidenavLegendTitle}>Dot colors</div>
                      {[
                        { color: 'var(--success-500)', label: 'Complete' },
                        { color: 'var(--warning-500)', label: 'Required — In Progress' },
                        { color: 'var(--alert-500)',   label: 'Required — Not Started' },
                        { color: 'var(--text-light)',  label: 'Not Required' },
                        { color: 'var(--text-normal)', label: 'In Progress (system)' },
                        { color: 'var(--neutral-200)', label: 'Blocked' },
                      ].map(d => (
                        <div key={d.label} className={styles.sidenavLegendRow}>
                          <span className={styles.sidenavDot} style={{ background: d.color, flexShrink: 0 }} />
                          <span>{d.label}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>

              <div className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Substep Tree</h3>
                  <p className={styles.entryDesc}>Workflow steps that contain a deeper task list (Risk Assessment, Due Diligence, Approval) expand into a branch tree. Parent rows show a caret + 'Open module' icon; children attach via a curved hook to a vertical trunk line. Status text replaces the dot tooltip and reads explicitly: 'Completed', 'In Progress', 'Not Started', 'Not Required', 'Pending'. The 'Next' chip marks the active item — when a parent has substeps, the chip moves to the first incomplete substep and the trunk line is painted blue from the parent down to that substep.</p>
                </div>
                <div className={styles.demoShell}>
                  <div className={styles.demoLabel}>Live Demo</div>
                  <div style={{ padding: '20px 16px' }}>
                    {/* Specimen reuses the real Sidebar CSS classes from profile.module.css */}
                    <aside style={{ width: 280, background: 'var(--neutral-00)', border: '1px solid var(--neutral-50)', borderRadius: 4 }}>
                      <div className={profileStyles.navStepper}>
                        {/* Risk Assessment — parent amber/next, expanded */}
                        <div
                          className={`${profileStyles.navStepperRow} ${profileStyles.navStepperRowNext}`}
                          style={{ cursor: 'pointer' }}
                          onClick={() => setSidenavExpanded(p => ({ ...p, ra: !p.ra }))}
                        >
                          <span className={profileStyles.navStepperGutter}>
                            <span className={`${profileStyles.navStepperNode} ${profileStyles.navStepperNode_amber}`} />
                            <span className={`${profileStyles.navStepperConnector} ${profileStyles.navStepperConnectorNext}`} />
                          </span>
                          <span className={profileStyles.navStepperContent}>
                            <span className={profileStyles.navStepperTopRow}>
                              <span className={profileStyles.navStepperLabel}>Risk Assessment</span>
                              <span className={`material-icons-outlined ${profileStyles.navStepCaretIcon} ${sidenavExpanded.ra ? profileStyles.navStepCaretIconOpen : ''}`}>expand_more</span>
                            </span>
                            <span className={profileStyles.navStepperStatusRow}>
                              <span className={profileStyles.navStepperStatus}>In Progress</span>
                              <span className={profileStyles.navStepOpenPageLink} title="Open module">
                                <span className="material-icons-outlined" style={{ fontSize: 13 }}>open_in_new</span>
                              </span>
                            </span>
                          </span>
                        </div>
                        <div
                          className={`${profileStyles.navSubSteps} ${sidenavExpanded.ra ? profileStyles.navSubStepsOpen : profileStyles.navSubStepsClosed} ${profileStyles.navSubStepsNext}`}
                          style={{ '--next-sub-idx': 1 }}
                        >
                          <div className={profileStyles.navSubStepRow}>
                            <span className={profileStyles.navSubStepGutter}>
                              <span className={`${profileStyles.navSubStepNode} ${profileStyles.navStepperNode_green}`}>
                                <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5.2L4.2 7.5L8 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              </span>
                            </span>
                            <span className={profileStyles.navSubStepContent}>
                              <span className={profileStyles.navSubStepLabel}>Risk Assessment 1</span>
                            </span>
                          </div>
                          <div className={`${profileStyles.navSubStepRow} ${profileStyles.navSubStepRowNext}`}>
                            <span className={profileStyles.navSubStepGutter}>
                              <span className={`${profileStyles.navSubStepNode} ${profileStyles.navStepperNode_red} ${profileStyles.navStepperNodeNext}`} />
                            </span>
                            <span className={profileStyles.navSubStepContent}>
                              <span className={profileStyles.navSubStepLabel}>Risk Assessment 2</span>
                              <span className={profileStyles.navNextChip}>Next</span>
                            </span>
                          </div>
                          <div className={profileStyles.navSubStepsCloser} aria-hidden="true" />
                        </div>

                        {/* Due Diligence — parent amber, collapsed */}
                        <div
                          className={profileStyles.navStepperRow}
                          style={{ cursor: 'pointer' }}
                          onClick={() => setSidenavExpanded(p => ({ ...p, dd: !p.dd }))}
                        >
                          <span className={profileStyles.navStepperGutter}>
                            <span className={`${profileStyles.navStepperNode} ${profileStyles.navStepperNode_amber}`} />
                            <span className={profileStyles.navStepperConnector} />
                          </span>
                          <span className={profileStyles.navStepperContent}>
                            <span className={profileStyles.navStepperTopRow}>
                              <span className={profileStyles.navStepperLabel}>Due Diligence</span>
                              <span className={`material-icons-outlined ${profileStyles.navStepCaretIcon} ${sidenavExpanded.dd ? profileStyles.navStepCaretIconOpen : ''}`}>expand_more</span>
                            </span>
                            <span className={profileStyles.navStepperStatusRow}>
                              <span className={profileStyles.navStepperStatus}>In Progress</span>
                              <span className={profileStyles.navStepOpenPageLink} title="Open module">
                                <span className="material-icons-outlined" style={{ fontSize: 13 }}>open_in_new</span>
                              </span>
                            </span>
                          </span>
                        </div>
                        <div
                          className={`${profileStyles.navSubSteps} ${sidenavExpanded.dd ? profileStyles.navSubStepsOpen : profileStyles.navSubStepsClosed}`}
                        >
                          <div className={profileStyles.navSubStepRow}>
                            <span className={profileStyles.navSubStepGutter}>
                              <span className={`${profileStyles.navSubStepNode} ${profileStyles.navStepperNode_green}`}>
                                <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5.2L4.2 7.5L8 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              </span>
                            </span>
                            <span className={profileStyles.navSubStepContent}>
                              <span className={profileStyles.navSubStepLabel}>Internal Due Diligence</span>
                            </span>
                          </div>
                          <div className={profileStyles.navSubStepRow}>
                            <span className={profileStyles.navSubStepGutter}>
                              <span className={`${profileStyles.navSubStepNode} ${profileStyles.navStepperNode_amber}`} />
                            </span>
                            <span className={profileStyles.navSubStepContent}>
                              <span className={profileStyles.navSubStepLabel}>External Due Diligence</span>
                            </span>
                          </div>
                          <div className={profileStyles.navSubStepsCloser} aria-hidden="true" />
                        </div>

                        {/* Integrity Check — flat, red */}
                        <div className={profileStyles.navStepperRow}>
                          <span className={profileStyles.navStepperGutter}>
                            <span className={`${profileStyles.navStepperNode} ${profileStyles.navStepperNode_red}`} />
                            <span className={profileStyles.navStepperConnector} />
                          </span>
                          <span className={profileStyles.navStepperContent}>
                            <span className={profileStyles.navStepperTopRow}>
                              <span className={profileStyles.navStepperLabel}>Integrity Check</span>
                              <span className={profileStyles.navNewTag}>New</span>
                            </span>
                            <span className={profileStyles.navStepperStatusRow}>
                              <span className={profileStyles.navStepperStatus}>Not Started</span>
                            </span>
                          </span>
                        </div>

                        {/* Approval — flat, red */}
                        <div className={profileStyles.navStepperRow}>
                          <span className={profileStyles.navStepperGutter}>
                            <span className={`${profileStyles.navStepperNode} ${profileStyles.navStepperNode_red}`} />
                          </span>
                          <span className={profileStyles.navStepperContent}>
                            <span className={profileStyles.navStepperTopRow}>
                              <span className={profileStyles.navStepperLabel}>Approval</span>
                            </span>
                            <span className={profileStyles.navStepperStatusRow}>
                              <span className={profileStyles.navStepperStatus}>Not Started</span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
                <div style={{ marginTop: 16, padding: '12px 16px', background: 'var(--neutral-25)', borderRadius: 4, fontSize: 12, color: 'var(--text-light)' }}>
                  Specimen reuses the real Sidebar CSS classes (<code>navStepper*</code> / <code>navSubSteps*</code> in <code>profile.module.css</code>) so it stays pixel-identical to production. Click the parent rows to expand / collapse — the blue trunk under Risk Assessment routes from the parent through to the first incomplete substep, which carries the <strong>Next</strong> chip.
                </div>
              </div>

              <div className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Anatomy</h3>
                </div>
                <AnatomyTable rows={[
                  { part: 'Summary link',     purpose: 'Top-level entry point — always present, takes user to the profile overview.', notes: 'Bold when active; sits above the first divider.' },
                  { part: 'Workflow steps',   purpose: 'Sequenced process steps with status dots and explicit status labels.',           notes: 'Dot color: green = complete, amber = in progress, red = not started, grey = not required, neutral-200 = blocked.' },
                  { part: 'Status dot',       purpose: 'Color-coded circle anchor for the step row and the trunk line.',                  notes: '12px circle. Connector line below segments parent-to-children and step-to-step.' },
                  { part: 'Status label',     purpose: 'Explicit textual state (Completed / In Progress / Not Started / Pending).',       notes: 'Replaces the dot-only tooltip approach. Sits below the step title.' },
                  { part: 'Substep tree',     purpose: 'Children attach via a curved hook to a vertical trunk line indented under the parent.', notes: 'Trunk turns blue when the next active item lives inside this group; truncated to the row that holds the Next chip.' },
                  { part: 'Caret',            purpose: 'Expand / collapse indicator on parents that have substeps.',                       notes: 'Material expand_more icon, rotates 180° when open. Click anywhere on the row to toggle.' },
                  { part: 'Open-module icon', purpose: 'Quick link to the parent module page even when substeps are expanded.',            notes: 'Material open_in_new icon next to the status label. Only shown on parents with substeps.' },
                  { part: 'Next chip',        purpose: 'Marks the next actionable step or substep.',                                        notes: 'Single chip per workflow. When the parent has substeps the chip moves to the first incomplete substep.' },
                  { part: 'Partner icon',     purpose: 'Trailing badge marking steps powered by an external integration.',                  notes: 'Hover shows partner name in a tooltip (e.g. "Powered by Duns & Bradstreet").' },
                  { part: 'New tag',          purpose: 'Highlights recently introduced steps.',                                              notes: 'Pill-shaped, sits inline with the step title in the top row.' },
                  { part: 'Section links',    purpose: 'Profile-scoped pages (Properties, Documents, Audit, etc.).',                        notes: 'Below the second divider. Active state uses primary-500 background.' },
                  { part: 'Divider',          purpose: 'Separates the three regions (Summary / Steps / Sections).',                          notes: '1px neutral-50 horizontal line, full sidebar width.' },
                ]} />
              </div>
            </section>

            {/* ══ Form Modal ══ */}
            <section id="pattern-form-modal" className={styles.categorySection} data-catalog-section style={{ scrollMarginTop: 68 }}>
              <h2 className={styles.categoryTitle}>Form Modal</h2>
              <div className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>External Due Diligence — Send Invite</h3>
                  <p className={styles.entryDesc}>Compact form modal triggered from a sidebar substep. Reuses the destructive-confirmation Modal shell (overlay + centered card) but swaps the message body for a stacked form: First Name / Surname / Email / Language. All fields are required; missing fields paint a red border on submit. Footer has a Close (cancel) and Send Invite (primary) action.</p>
                </div>
                <div className={styles.demoShell}>
                  <div className={styles.demoLabel}>Live Demo</div>
                  <div style={{ padding: '20px 16px' }}>
                    <Button variant="filled" onClick={() => setFormModalOpen(true)}>Open form modal</Button>

                    <AnimatePresence>
                      {formModalOpen && (
                        <motion.div
                          key="form-modal-overlay"
                          className={styles.formModalOverlay}
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          onClick={() => setFormModalOpen(false)}
                        >
                          <motion.div
                            className={styles.formModalCard}
                            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.18 }}
                            onClick={e => e.stopPropagation()}
                            role="dialog" aria-modal="true"
                          >
                            <div className={styles.formModalHeader}>
                              <span className={styles.formModalTitle}>External Due Diligence — Send Invite</span>
                              <button className={styles.formModalClose} aria-label="Close" onClick={() => setFormModalOpen(false)}>×</button>
                            </div>
                            <div className={styles.formModalBody}>
                              <TextField
                                label="First Name *"
                                value={formModalData.firstName}
                                onChange={e => setFormModalData(d => ({ ...d, firstName: e.target.value }))}
                                placeholder="First Name"
                              />
                              <TextField
                                label="Surname *"
                                value={formModalData.surname}
                                onChange={e => setFormModalData(d => ({ ...d, surname: e.target.value }))}
                                placeholder="Surname"
                              />
                              <TextField
                                label="Email *"
                                type="email"
                                value={formModalData.email}
                                onChange={e => setFormModalData(d => ({ ...d, email: e.target.value }))}
                                placeholder="Email"
                              />
                              <NativeSelect
                                label="Language *"
                                value={formModalData.language}
                                onChange={v => setFormModalData(d => ({ ...d, language: v }))}
                                placeholder="Please select"
                                options={['English', 'Spanish', 'French', 'German', 'Portuguese', 'Italian', 'Chinese', 'Japanese']}
                              />
                            </div>
                            <div className={styles.formModalFooter}>
                              <Button variant="outline" onClick={() => setFormModalOpen(false)}>Close</Button>
                              <Button variant="filled" onClick={() => setFormModalOpen(false)}>Send Invite</Button>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Anatomy</h3>
                </div>
                <AnatomyTable rows={[
                  { part: 'Overlay',       purpose: 'Dim backdrop covering the page beneath the dialog.',                                  notes: 'rgba(0,0,0,0.45). Click to close.' },
                  { part: 'Card',          purpose: 'Centered dialog container.',                                                            notes: '460px wide on desktop. White background, slight elevation. Animates in with opacity + 12px y-offset.' },
                  { part: 'Header',        purpose: 'Title + close (×) button.',                                                              notes: '16px title, neutral-50 bottom border.' },
                  { part: 'Body',          purpose: 'Stacked form fields, vertically.',                                                       notes: 'TextField + NativeSelect components. 12px gap. * suffix marks required fields.' },
                  { part: 'Footer',        purpose: 'Right-aligned action buttons (Cancel / Submit).',                                        notes: 'Outline + Filled button pair. Sticky to the bottom edge of the card.' },
                  { part: 'Validation',    purpose: 'Per-field red border when missing on submit.',                                            notes: 'Inline only — no error messages below the field. Submit returns until all required fields pass.' },
                ]} />
              </div>
            </section>

            {/* ══ Alerts & Banners ══ */}
            <section id="pattern-alerts" className={styles.categorySection} data-catalog-section style={{ scrollMarginTop: 68 }}>
              <h2 className={styles.categoryTitle}>Alerts &amp; Banners</h2>

              {/* Variant 1: Inline with title */}
              <div className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Inline Banner — Title + Description</h3>
                  <p className={styles.entryDesc}>Multi-line banner with bold title and supporting description. Used as a contextual notice inside page or panel content. Four severity levels share the same structure; color, icon, and tone change per severity.</p>
                </div>
                <div className={styles.demoShell}>
                  <div className={styles.demoStageColumn}>
                    <div className={styles.banner} style={{ background: 'var(--warning-50)', borderColor: 'var(--warning-300)', color: 'var(--warning-900)' }}>
                      <span className={`material-icons-outlined ${styles.bannerIcon}`} style={{ color: 'var(--warning-700)' }}>warning_amber</span>
                      <div>
                        <div className={styles.bannerTitle}>Warning — Potential duplicates found</div>
                        <div className={styles.bannerDesc}>10 existing records have a similar name. Review before continuing to avoid creating duplicate profiles.</div>
                      </div>
                    </div>
                    <div className={styles.banner} style={{ background: 'var(--primary-08)', borderColor: 'var(--primary-200)', color: 'var(--text-normal)' }}>
                      <span className={`material-icons-outlined ${styles.bannerIcon}`} style={{ color: 'var(--primary-500)' }}>info</span>
                      <div>
                        <div className={styles.bannerTitle}>Info — Pre-populated from verification</div>
                        <div className={styles.bannerDesc}>Some fields have been pre-filled from the entity verification step. Review and adjust as needed.</div>
                      </div>
                    </div>
                    <div className={styles.banner} style={{ background: 'var(--alert-50)', borderColor: 'var(--alert-300)', color: 'var(--alert-900)' }}>
                      <span className={`material-icons-outlined ${styles.bannerIcon}`} style={{ color: 'var(--alert-700)' }}>error_outline</span>
                      <div>
                        <div className={styles.bannerTitle}>Error — Required fields missing</div>
                        <div className={styles.bannerDesc}>Please fill in all required fields before continuing. Highlighted fields are mandatory.</div>
                      </div>
                    </div>
                    <div className={styles.banner} style={{ background: 'var(--success-50)', borderColor: 'var(--success-300)', color: 'var(--success-900)' }}>
                      <span className={`material-icons-outlined ${styles.bannerIcon}`} style={{ color: 'var(--success-700)' }}>check_circle_outline</span>
                      <div>
                        <div className={styles.bannerTitle}>Success — Third party approved</div>
                        <div className={styles.bannerDesc}>The third party has been successfully approved and is now active in the system.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Variant 2: Toast */}
              <div className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Toast — Single-line, Auto-dismiss</h3>
                  <p className={styles.entryDesc}>Single-line notification rendered fixed-position at the top of the page (below the app header). Auto-dismisses after ~5 seconds. Used for transient confirmations and errors triggered by user actions. Source: <code>connAlert</code> in <code>profile.module.css</code>.</p>
                </div>
                <div className={styles.demoShell}>
                  <div className={styles.demoStageColumn}>
                    <div className={styles.bannerToast} style={{ background: 'var(--success-300)', color: 'var(--success-900)' }}>
                      <span className={`material-icons-outlined ${styles.bannerIcon}`} style={{ color: 'var(--success-900)' }}>check_circle</span>
                      <span>Connection saved successfully</span>
                    </div>
                    <div className={styles.bannerToast} style={{ background: 'var(--warning-100)', color: 'var(--warning-900)' }}>
                      <span className={`material-icons-outlined ${styles.bannerIcon}`} style={{ color: 'var(--warning-900)' }}>remove_circle</span>
                      <span>Connection discarded</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Variant 3: Inline single-line */}
              <div className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Inline Warning — Single Line</h3>
                  <p className={styles.entryDesc}>Compact inline notice without a title. Used for short contextual warnings inside form sections or accordions. Source: <code>warningBanner</code> in <code>ProfileRiskMitigation.module.css</code>.</p>
                </div>
                <div className={styles.demoShell}>
                  <div className={styles.demoStageColumn}>
                    <div className={styles.bannerInline} style={{ background: 'var(--alert-100)', color: 'var(--alert-700)' }}>
                      <span className={`material-icons-outlined ${styles.bannerIcon}`} style={{ color: 'var(--alert-700)' }}>error_outline</span>
                      <span>This third party has open risk mitigation tasks. Resolve all tasks before approving.</span>
                    </div>
                    <div className={styles.bannerInline} style={{ background: 'var(--warning-50)', color: 'var(--warning-900)' }}>
                      <span className={`material-icons-outlined ${styles.bannerIcon}`} style={{ color: 'var(--warning-700)' }}>warning_amber</span>
                      <span>Renewal is due in 14 days. Schedule a review meeting with the owner.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Anatomy reference */}
              <div className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Anatomy</h3>
                  <p className={styles.entryDesc}>Common parts shared by all three banner variants. Severity color is the only thing that differs across instances within a variant.</p>
                </div>
                <AnatomyTable rows={[
                  { part: 'Container',   purpose: 'Wraps icon + content; sets background and (for inline) border.', notes: 'Inline variants have a 1px border in the same hue family. Toast has no border.' },
                  { part: 'Icon',         purpose: 'Material Icons Outlined glyph signalling severity.',              notes: 'warning_amber, info, error_outline, check_circle_outline. Toast uses solid (check_circle, remove_circle).' },
                  { part: 'Title',        purpose: 'Short headline (Inline-with-title only).',                         notes: 'Bold, 14px, single line. Omitted in Toast and Inline-single-line.' },
                  { part: 'Description',  purpose: 'Body copy.',                                                       notes: '13px, 1.5 line-height. In Toast / Inline-single-line this is the only text.' },
                  { part: 'Severity',     purpose: 'Color set keyed to outcome.',                                      notes: 'warning, info, error, success — each maps to its semantic 50/100/300/700 stops.' },
                ]} />
              </div>
            </section>

            {/* ══ Accordion ══ */}
            <section id="pattern-accordion" className={styles.categorySection} data-catalog-section style={{ scrollMarginTop: 68 }}>
              <h2 className={styles.categoryTitle}>Accordion</h2>
              <div className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Risk Report Accordion</h3>
                  <p className={styles.entryDesc}>Collapsible section used in the Risk Level Report. Header gradient and border color match the risk level. Shows label, factor count badge, category score, and a risk badge. Click to expand/collapse.</p>
                </div>
                <div className={styles.demoShell}>
                  <div className={styles.demoLabel}>Live Demo</div>
                  <div style={{ padding: '16px 20px 20px' }}>
                    <div className={styles.accordionWrap}>
                      {[
                        { id: 'low', level: 'low', label: 'Source of Funds', count: 3, score: 18 },
                        { id: 'medium', level: 'medium', label: 'Due Diligence', count: 7, score: 44 },
                        { id: 'high', level: 'high', label: 'Integrity Check', count: 12, score: 76 },
                      ].map(item => (
                        <div key={item.id} className={styles.accordionItem}>
                          <div
                            className={`${styles.accordionHeader} ${
                              item.level === 'low' ? styles.accordionHeaderLow :
                              item.level === 'medium' ? styles.accordionHeaderMedium :
                              styles.accordionHeaderHigh
                            }`}
                            onClick={() => setAccordionOpen(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                          >
                            <div className={styles.accordionHeaderLeft}>
                              <span className={styles.accordionLabel}>{item.label}</span>
                              <span className={styles.accordionCount}>{item.count} factors</span>
                            </div>
                            <div className={styles.accordionHeaderRight}>
                              <span className={styles.accordionScore}>
                                Category Risk Score: <strong style={{ fontWeight: 700, color: 'var(--text-normal)' }}>{item.score}</strong>
                              </span>
                              <RiskBadge level={item.level} />
                              <span className={`material-icons-outlined ${styles.accordionCaret} ${accordionOpen[item.id] ? styles.accordionCaretOpen : styles.accordionCaretClosed}`}>
                                expand_less
                              </span>
                            </div>
                          </div>
                          {accordionOpen[item.id] && (
                            <div className={styles.accordionBody}>
                              <p style={{ margin: 0, fontSize: 13, color: 'var(--text-light)', lineHeight: 1.6 }}>
                                Accordion body content — typically a risk factors table (Property | Value | Score) or a screening results table for the Screening &amp; Monitoring section.
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Anatomy</h3>
                </div>
                <AnatomyTable rows={[
                  { part: 'Header',          purpose: 'Clickable strip that toggles the body open / closed.',         notes: 'Background gradient and border keyed to the risk level (low / medium / high).' },
                  { part: 'Label',           purpose: 'Section name.',                                                  notes: '14px, weight 500, text-normal.' },
                  { part: 'Factor count',    purpose: 'Pill showing the number of factors in the section.',             notes: 'Compact neutral chip beside the label.' },
                  { part: 'Category score',  purpose: 'Aggregate risk score for the section.',                          notes: 'Right-aligned. Bold value, lighter label.' },
                  { part: 'Risk badge',      purpose: 'Severity badge (RiskBadge component).',                          notes: 'Mirrors the section level.' },
                  { part: 'Caret',           purpose: 'Open / closed indicator.',                                       notes: 'Material expand_less icon, rotated 180° when collapsed.' },
                  { part: 'Body',            purpose: 'Expanded content — typically a factors table.',                  notes: 'White background, padded. Hidden when collapsed.' },
                ]} />
              </div>
            </section>

            {/* ══ Side Panel ══ */}
            <section id="pattern-sidepanel" className={styles.categorySection} data-catalog-section style={{ scrollMarginTop: 68 }}>
              <h2 className={styles.categoryTitle}>Side Panel</h2>
              <div className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Slide-in Side Panel</h3>
                  <p className={styles.entryDesc}>Fixed-position panel sliding in from the right with a dimmed overlay. Four sizes used across the app: 480px (Status), 540px (Edit Connection / Renewal Details), 650px (Notes), 940px (Look for More). All share the same structure: blue 4px top border, header, scrollable body, action footer.</p>
                </div>
                <div className={styles.demoShell}>
                  <div className={styles.demoLabel}>Live Demo</div>
                  <div style={{ padding: '16px 20px 20px' }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                      {[
                        { label: 'Status — 480px', size: 'sm', pct: '35%' },
                        { label: 'Edit Connection — 540px', size: 'md', pct: '42%' },
                        { label: 'Notes — 650px', size: 'lg', pct: '52%' },
                        { label: 'Look for More — 940px', size: 'xl', pct: '72%' },
                      ].map(p => (
                        <Button key={p.size} variant={panelSize === p.size ? 'filled' : 'outline'} size="sm" onClick={() => setPanelSize(p.size)}>{p.label}</Button>
                      ))}
                    </div>
                    <div className={styles.panelDemo}>
                      <div style={{ padding: 16, color: 'var(--text-light)', fontSize: 13 }}>Page content behind the overlay</div>
                      <AnimatePresence>
                        {panelSize && (() => {
                          const sizes = { sm: { pct: '35%', title: 'Current Status' }, md: { pct: '42%', title: 'Edit Connection' }, lg: { pct: '52%', title: 'Notes' }, xl: { pct: '72%', title: 'Look for More' } };
                          const { pct, title } = sizes[panelSize];
                          return (
                            <>
                              <motion.div
                                key="overlay"
                                className={styles.panelDemoOverlay}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.22 }}
                                onClick={() => setPanelSize(null)}
                              />
                              <motion.div
                                key="panel"
                                className={styles.panelDemoPanel}
                                style={{ width: pct }}
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
                              >
                                <div className={styles.panelDemoHeader}>
                                  <span className={styles.panelDemoTitle}>{title}</span>
                                  <Button variant="outline" size="sm" onClick={() => setPanelSize(null)}>Close</Button>
                                </div>
                                <div className={styles.panelDemoBody}>
                                  <div className={styles.panelFieldLabel}>Connection Type</div>
                                  <div className={styles.panelFieldValue}>Subsidiary</div>
                                  <div className={styles.panelFieldLabel}>ID Type</div>
                                  <div className={styles.panelFieldValue}>LEI</div>
                                  <div className={styles.panelFieldLabel}>ID Value</div>
                                  <div className={styles.panelFieldValue}>5493001KJTIIGC8Y1R12</div>
                                  <div className={styles.panelFieldLabel}>Country</div>
                                  <div className={styles.panelFieldValue}>United States</div>
                                </div>
                                <div className={styles.panelDemoFooter}>
                                  <Button variant="outline" onClick={() => setPanelSize(null)}>Cancel</Button>
                                  <Button variant="filled">Save</Button>
                                </div>
                              </motion.div>
                            </>
                          );
                        })()}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Anatomy</h3>
                </div>
                <AnatomyTable rows={[
                  { part: 'Overlay',     purpose: 'Dim backdrop covering the page beneath the panel.',                          notes: 'rgba(0,0,0,0.45), z-index: --z-overlay. Click to close.' },
                  { part: 'Panel',       purpose: 'Sliding container; anchored to the right edge.',                              notes: 'z-index: --z-panel (1 above overlay). Width varies: 480 / 540 / 650 / 940 / 1200px depending on content.' },
                  { part: 'Top border',  purpose: 'Visual anchor identifying the panel as a primary surface.',                   notes: '4px solid var(--primary-500). Omitted on Notes panel only.' },
                  { part: 'Header',      purpose: 'Title + close affordance.',                                                   notes: 'Sticky at top. Title left, close button right (Outline Button or × icon).' },
                  { part: 'Body',        purpose: 'Scrollable content region.',                                                   notes: 'Padded 16-20px. overflow-y: auto. Form fields, tables, or read-only details.' },
                  { part: 'Footer',      purpose: 'Action row (Cancel / Save / etc.).',                                          notes: 'Sticky at bottom when content scrolls. Buttons right-aligned. Omitted in read-only panels.' },
                  { part: 'Animation',   purpose: 'Slide-in transition.',                                                         notes: 'translateX 100% → 0, 220ms ease [0.32, 0.72, 0, 1]. Overlay fades opacity 0 → 1.' },
                ]} />
              </div>
            </section>

          </>}

          </div>
        </div>
      </div>
    </PageLayout>
  );
}
