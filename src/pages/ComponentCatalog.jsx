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
import TokenSwatch from '../components/catalog/TokenSwatch';
import styles from './ComponentCatalog.module.css';

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
    { name: 'level', type: "'high' | 'medium' | 'low'", default: null, required: true, description: 'Risk level to display.' },
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
};

const STATUS_ENTRIES = [
  { label: 'Pending Approval', bg: 'var(--neutral-50)', color: 'var(--text-normal)', icon: 'pending' },
  { label: 'Approved', bg: 'var(--success-100)', color: 'var(--success-900)', icon: 'check_circle' },
  { label: 'Not Approved', bg: 'var(--alert-100)', color: 'var(--alert-700)', icon: 'dangerous' },
  { label: 'Declined', bg: 'var(--alert-100)', color: 'var(--alert-700)', icon: 'feedback' },
  { label: 'Approved*', bg: 'var(--warning-100)', color: 'var(--warning-900)', icon: 'history_toggle_off' },
  { label: 'Approved! (Renewal Required)', bg: 'var(--warning-100)', color: 'var(--warning-900)', icon: 'history_toggle_off' },
];

const SIDEBAR_SECTIONS = [
  {
    label: 'UI Components',
    id: 'ui-components',
    items: [
      { label: 'Button', id: 'button' },
      { label: 'Badge', id: 'badge' },
      { label: 'Chip', id: 'chip' },
    ],
  },
  {
    label: 'Form Controls',
    id: 'form-controls',
    items: [
      { label: 'Checkbox', id: 'checkbox' },
      { label: 'Radio', id: 'radio' },
    ],
  },
  {
    label: 'Form Inputs',
    id: 'form-inputs',
    items: [
      { label: 'TextField', id: 'textfield' },
      { label: 'NativeSelect', id: 'nativeselect' },
      { label: 'Combobox', id: 'combobox' },
    ],
  },
  {
    label: 'Controls',
    id: 'controls',
    items: [
      { label: 'Toggle', id: 'toggle' },
      { label: 'Paginator', id: 'paginator' },
    ],
  },
  {
    label: 'Risk & Status',
    id: 'risk-status',
    items: [
      { label: 'RiskBadge', id: 'riskbadge' },
    ],
  },
  {
    label: 'Profile Atoms',
    id: 'profile-atoms',
    items: [
      { label: 'Status Badges', id: 'statusbadges' },
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
    tokens: ['--alert-50','--alert-100','--alert-200','--alert-300','--alert-400','--alert-500','--alert-600','--alert-700','--alert-800','--alert-900'],
  },
  {
    label: 'Success',
    tokens: ['--success-50','--success-100','--success-200','--success-300','--success-400','--success-500','--success-600','--success-700','--success-800','--success-900'],
  },
  {
    label: 'Warning',
    tokens: ['--warning-50','--warning-100','--warning-200','--warning-300','--warning-400','--warning-500','--warning-600','--warning-700','--warning-800','--warning-900'],
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
  { name: '--shadow-card', value: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)' },
];

const RADII_TOKENS = [
  { name: '--rctp-radius-xs', value: '2px' },
  { name: '--rctp-radius-sm', value: '4px' },
  { name: '--rctp-radius-md', value: '16px' },
  { name: '--rctp-radius-lg', value: '28px' },
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
  { label: 'Tables',           id: 'pattern-tables' },
  { label: 'Cards',            id: 'pattern-cards' },
  { label: 'Navigation',       id: 'pattern-navigation' },
  { label: 'Alerts & Banners', id: 'pattern-alerts' },
  { label: 'Accordion',        id: 'pattern-accordion' },
  { label: 'Side Panel',       id: 'pattern-sidepanel' },
  { label: 'Modal',            id: 'pattern-modal' },
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
  const [tfError, setTfError] = useState(false);
  const [selValue, setSelValue] = useState('');
  const [comboValue, setComboValue] = useState('');
  const [toggleOn, setToggleOn] = useState(true);
  const [paginatorPage, setPaginatorPage] = useState(1);
  const [paginatorSize, setPaginatorSize] = useState(20);

  /* interactive demo state — Patterns tab */
  const [patternTab, setPatternTab] = useState('Overview');
  const [tableShowEmpty, setTableShowEmpty] = useState(false);
  const [tablePage, setTablePage] = useState(1);
  const [selectedType, setSelectedType] = useState('entity');
  const [accordionOpen, setAccordionOpen] = useState({ low: true, medium: false, high: false });
  const [headerRisk, setHeaderRisk] = useState('high');
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
                description="General-purpose action button. Two visual variants: filled (primary action) and outline (secondary action)."
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

            </section>

            {/* ══ Form Controls ══ */}
            <section className={styles.categorySection} data-catalog-section>
              <h2 className={styles.categoryTitle}>Form Controls</h2>

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
            </section>

            {/* ══ Form Inputs ══ */}
            <section className={styles.categorySection} data-catalog-section>
              <h2 className={styles.categoryTitle}>Form Inputs</h2>

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
                      <TextField label="Error state" value={tfValue} onChange={e => { setTfValue(e.target.value); setTfError(e.target.value.length > 0 && e.target.value.length < 3); }} placeholder="Min 3 chars" error={tfError} errorText="Must be at least 3 characters" style={{ width: 220 }} />
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
                      <NativeSelect label="Default" value={selValue} onChange={e => setSelValue(e.target.value)} placeholder="Choose a country…" options={COUNTRIES} style={{ width: 220 }} />
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
            </section>

            {/* ══ Controls ══ */}
            <section className={styles.categorySection} data-catalog-section>
              <h2 className={styles.categoryTitle}>Controls</h2>

              <Entry
                id="toggle"
                title="Toggle"
                description="Active / Inactive sliding toggle. Used in onboarding, renewal edit, and row status controls."
                demo={
                  <div className={styles.demoStage}>
                    <Toggle value={toggleOn} onChange={setToggleOn} />
                    <Toggle value={false} onChange={() => {}} />
                    <Toggle value={true} labelOn="Enabled" labelOff="Disabled" onChange={() => {}} />
                    <Toggle value={true} disabled />
                    <Toggle value={false} disabled />
                  </div>
                }
                props={PROPS.toggle}
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
            </section>

            {/* ══ Risk & Status ══ */}
            <section className={styles.categorySection} data-catalog-section>
              <h2 className={styles.categoryTitle}>Risk &amp; Status</h2>

              <Entry
                id="riskbadge"
                title="RiskBadge"
                description="Risk level indicator badge with a semantic icon and label. Used in screening tables and association lists."
                demo={
                  <div className={styles.demoStage}>
                    <RiskBadge level="high" />
                    <RiskBadge level="medium" />
                    <RiskBadge level="low" />
                  </div>
                }
                props={PROPS.riskBadge}
              />

            </section>

            {/* ══ Profile Atoms ══ */}
            <section className={styles.categorySection} data-catalog-section>
              <h2 className={styles.categoryTitle}>Profile Atoms</h2>

              <Entry
                id="statusbadges"
                title="Status Badges"
                description="Current status chips rendered in the profile header. Defined as STATUS_CONFIG in ProfilePage.jsx."
                demo={
                  <div className={styles.demoStage}>
                    {STATUS_ENTRIES.map(s => (
                      <span
                        key={s.label}
                        className={styles.demoStatusBadge}
                        style={{ background: s.bg, color: s.color }}
                      >
                        <span className="material-icons-outlined" style={{ fontSize: 14 }}>{s.icon}</span>
                        {s.label}
                      </span>
                    ))}
                  </div>
                }
              />

              <Entry
                id="profile-header"
                title="Profile Page Header"
                description="Top strip of the TP profile page. Background gradient and right-side color bar change per risk level. Contains back link, profile name, verified badge, current status, and risk level badges."
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
                    <div
                      className={`${styles.tpStrip} ${
                        headerRisk === 'high' ? styles.tpStripHigh :
                        headerRisk === 'medium' ? styles.tpStripMedium :
                        headerRisk === 'low' ? styles.tpStripLow :
                        styles.tpStripPending
                      }`}
                    >
                      <div className={styles.tpHeader}>
                        <div className={styles.tpBack}>
                          <span className="material-icons-outlined" style={{ fontSize: 16 }}>chevron_left</span>
                          All Third Parties
                        </div>
                        <div className={styles.tpTitleRow}>
                          <div className={styles.tpNameGroup}>
                            <span className={styles.tpName}>Pied Piper Inc.</span>
                            <span className={styles.tpVerified}>
                              <span className="material-icons-outlined" style={{ fontSize: 16, color: 'var(--success-700)' }}>verified</span>
                              Verified
                            </span>
                          </div>
                          <div className={styles.tpBadges}>
                            <div className={styles.tpBadgeGroup}>
                              <span className={styles.tpBadgeLabel}>Current status:</span>
                              <span className={styles.tpBadge} style={{ background: 'var(--success-100)', color: 'var(--success-900)' }}>
                                <span className="material-icons-outlined" style={{ fontSize: 14 }}>check_circle</span>
                                Approved
                              </span>
                            </div>
                            <div className={styles.tpBadgeGroup}>
                              <span className={styles.tpBadgeLabel}>Risk level:</span>
                              <span className={styles.tpBadge} style={{
                                background: headerRisk === 'high' ? 'var(--alert-100)' : headerRisk === 'medium' ? 'var(--warning-100)' : headerRisk === 'low' ? 'var(--success-100)' : 'var(--neutral-50)',
                                color: headerRisk === 'high' ? 'var(--alert-700)' : headerRisk === 'medium' ? 'var(--warning-900)' : headerRisk === 'low' ? 'var(--success-900)' : 'var(--text-normal)',
                              }}>
                                <RiskLevelIcon level={headerRisk === 'pending' ? 'low' : headerRisk} size={14} />
                                {headerRisk.charAt(0).toUpperCase() + headerRisk.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                demoNote="Risk level buttons above toggle the strip variant. The right-side color bar, gradient tint, and badge color all update together."
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
                  <h3 className={styles.entryTitle}>Data Table</h3>
                  <p className={styles.entryDesc}>Standard table pattern: card with shadow, title row, divider, toolbar with search and actions, striped rows, sortable header, cell links, status badge, tag list, pagination.</p>
                </div>
                <div className={styles.demoShell}>
                  <div className={styles.demoLabel}>Live Demo</div>
                  <div style={{ padding: '16px 16px 20px' }}>
                    <div className={styles.tableCard}>
                      {/* Title row */}
                      <div className={styles.tableCardHeader}>
                        <h3 className={styles.tableCardTitle}>Third Parties</h3>
                        <div className={styles.tableCardActions}>
                          <Button variant="outline" onClick={() => setTableShowEmpty(v => !v)}>
                            {tableShowEmpty ? 'Show rows' : 'Show empty state'}
                          </Button>
                          <Button variant="outline" icon="download">Export</Button>
                        </div>
                      </div>
                      <div className={styles.tableDivider} />
                      {/* Toolbar */}
                      <div className={styles.tableToolbar}>
                        <div className={styles.toolbarLeft}>
                          <div className={styles.searchWrap}>
                            <span className="material-icons-outlined" style={{ position: 'absolute', left: 8, fontSize: 16, color: 'var(--neutral-300)', pointerEvents: 'none' }}>search</span>
                            <input className={styles.searchInput} style={{ paddingLeft: 30 }} placeholder="Search third parties…" readOnly />
                          </div>
                        </div>
                        <div className={styles.toolbarRight}>
                          <Button variant="outline" icon="filter_list">Filter</Button>
                        </div>
                      </div>
                      {/* Table */}
                      <div className={styles.tableWrap}>
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
                            {tableShowEmpty ? (
                              <tr>
                                <td colSpan={6}>
                                  <div className={styles.emptyState}>
                                    <span className={`material-icons-outlined ${styles.emptyStateIcon}`}>inbox</span>
                                    No records found matching your search criteria.
                                  </div>
                                </td>
                              </tr>
                            ) : SAMPLE_ROWS.map((r, i) => (
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
                                  <span
                                    className={styles.statusBadge}
                                    style={{
                                      background: r.status === 'Approved' ? 'var(--success-100)' : r.status === 'Not Approved' ? 'var(--alert-100)' : 'var(--neutral-50)',
                                      color: r.status === 'Approved' ? 'var(--success-900)' : r.status === 'Not Approved' ? 'var(--alert-700)' : 'var(--text-normal)',
                                    }}
                                  >
                                    {r.status}
                                  </span>
                                </td>
                                <td><RiskBadge level={r.risk} /></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {!tableShowEmpty && (
                        <>
                          <div className={styles.tableDivider} />
                          <div style={{ padding: '0 16px 4px' }}>
                            <Paginator page={tablePage} totalPages={5} pageSize={20} totalItems={87} onPageChange={setTablePage} />
                          </div>
                        </>
                      )}
                    </div>
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

            {/* ══ Alerts & Banners ══ */}
            <section id="pattern-alerts" className={styles.categorySection} data-catalog-section style={{ scrollMarginTop: 68 }}>
              <h2 className={styles.categoryTitle}>Alerts &amp; Banners</h2>
              <div className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Banner Variants</h3>
                  <p className={styles.entryDesc}>Inline notification banners. Four severity levels: warning, info, error, and success.</p>
                </div>
                <div className={styles.demoShell}>
                  <div className={styles.demoStageColumn}>

                    <div className={styles.banner} style={{ background: 'var(--warning-50)', borderColor: 'var(--warning-300)', color: 'var(--warning-900)' }}>
                      <span className={`material-icons-outlined ${styles.bannerIcon}`} style={{ color: 'var(--warning-600)' }}>warning_amber</span>
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
                      <span className={`material-icons-outlined ${styles.bannerIcon}`} style={{ color: 'var(--alert-600)' }}>error_outline</span>
                      <div>
                        <div className={styles.bannerTitle}>Error — Required fields missing</div>
                        <div className={styles.bannerDesc}>Please fill in all required fields before continuing. Highlighted fields are mandatory.</div>
                      </div>
                    </div>

                    <div className={styles.banner} style={{ background: 'var(--success-50)', borderColor: 'var(--success-300)', color: 'var(--success-900)' }}>
                      <span className={`material-icons-outlined ${styles.bannerIcon}`} style={{ color: 'var(--success-600)' }}>check_circle_outline</span>
                      <div>
                        <div className={styles.bannerTitle}>Success — Third party approved</div>
                        <div className={styles.bannerDesc}>The third party has been successfully approved and is now active in the system.</div>
                      </div>
                    </div>

                  </div>
                </div>
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
            </section>

            {/* ══ Modal ══ */}
            <section id="pattern-modal" className={styles.categorySection} data-catalog-section style={{ scrollMarginTop: 68 }}>
              <h2 className={styles.categoryTitle}>Modal</h2>
              <div className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>Confirmation Modal</h3>
                  <p className={styles.entryDesc}>Centered dialog with a dimmed overlay. Used for destructive confirmations (delete, cancel creation, decline) and renewal prompts. Closes on Escape, backdrop click, or the cancel button. Header, scrollable body, and a cancel/confirm footer.</p>
                </div>
                <div className={styles.demoShell}>
                  <div className={styles.demoLabel}>Live Demo</div>
                  <div style={{ padding: '16px 20px 20px' }}>
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
                </div>
                <PropsTable rows={PROPS.modal} />
              </div>
            </section>

          </>}

          </div>
        </div>
      </div>
    </PageLayout>
  );
}
