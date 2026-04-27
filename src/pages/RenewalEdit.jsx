import { useState, useRef, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Breadcrumb from '../components/layout/Breadcrumb';
import styles from './RenewalEdit.module.css';

const RENEWAL_PERIOD_UNITS = ['Day(s)', 'Week(s)', 'Month(s)', 'Year(s)'];

const RULE_OPTIONS = ['', 'Low Risk', 'Medium Risk', 'High Risk', 'Approved', 'Pending'];

const PROPERTIES = [
  { name: 'ABC Policy Applies To',              category: 'RCTP' },
  { name: 'ABC Risk Assess',                    category: 'EDD' },
  { name: 'Active Date',                        category: 'RISKCENTER Third Party' },
  { name: 'AFTE Policy',                        category: 'EDD' },
  { name: 'Agreement Documented',               category: 'RISKCENTER Third Party' },
  { name: 'Anti-Bribery Policy',                category: 'EDD' },
  { name: 'Audited Accounts',                   category: 'EDD' },
  { name: 'Average Turnover',                   category: 'RISKCENTER Third Party' },
  { name: 'Bank Account Country',               category: 'EDD' },
  { name: 'Business Description',               category: 'RISKCENTER Third Party' },
  { name: 'Business Description Details',       category: 'RISKCENTER Third Party' },
  { name: 'Business Unit',                      category: 'RISKCENTER Third Party' },
  { name: 'Commission Success Fee',             category: 'RISKCENTER Third Party' },
  { name: 'Commission Success Fee Details',     category: 'RISKCENTER Third Party' },
  { name: 'Company Tags',                       category: 'Tag' },
  { name: 'Compliance Training',                category: 'EDD' },
  { name: 'Compliance Training Details',        category: 'EDD' },
  { name: 'Contract Value Amount',              category: 'RISKCENTER Third Party' },
  { name: 'Contract Value Banding',             category: 'RISKCENTER Third Party' },
  { name: 'Contract Value Known',               category: 'RISKCENTER Third Party' },
  { name: 'Contract Value Not Known Explanation', category: 'RISKCENTER Third Party' },
  { name: 'Contractors',                        category: 'EDD' },
  { name: 'Current Risk Level - BreakDown',     category: 'RISKCENTER Third Party' },
  { name: 'Current Risk Score',                 category: 'RISKCENTER Third Party' },
  { name: 'Current Risk Status',                category: 'RISKCENTER Third Party' },
  { name: 'Date business established',          category: 'RISKCENTER Third Party' },
  { name: 'Date of Decision',                   category: 'RISKCENTER Third Party' },
  { name: 'Deleted Date',                       category: 'RISKCENTER Third Party' },
  { name: 'EDD Signature Job Title',            category: 'EDD' },
  { name: 'Entity Company Number',              category: 'RISKCENTER Third Party' },
  { name: 'Entity ID Type',                     category: 'RISKCENTER Third Party' },
  { name: 'Entity ID Value',                    category: 'RISKCENTER Third Party' },
  { name: 'Entity Industry Sector - onboarding', category: 'RISKCENTER Third Party' },
  { name: 'Entity Other Known Name or Alias',   category: 'RISKCENTER Third Party' },
  { name: 'Entity Registered Address',          category: 'RISKCENTER Third Party' },
  { name: 'Entity Registered Country',          category: 'RISKCENTER Third Party' },
  { name: 'Entity Third Party Legal Name',      category: 'RISKCENTER Third Party' },
  { name: 'Entity Verified',                    category: 'RISKCENTER Third Party' },
  { name: 'Entity Website',                     category: 'RISKCENTER Third Party' },
  { name: 'Environmental Impact Reports',       category: 'EDD' },
  { name: 'Environmental Policies',             category: 'EDD' },
  { name: 'Financial Referee 1',                category: 'EDD' },
  { name: 'Financial Referee 2',                category: 'EDD' },
  { name: 'Financial Referee 3',                category: 'EDD' },
  { name: 'Fourth Party Due Diligence',         category: 'EDD' },
  { name: 'Gender',                             category: 'RISKCENTER Third Party' },
  { name: 'Government Contracts Debarment',     category: 'EDD' },
  { name: 'Government Contracts Debarment Details', category: 'EDD' },
  { name: 'Government Interaction',             category: 'EDD' },
  { name: 'Government Interaction Details',     category: 'EDD' },
  { name: 'Illegal Activity',                   category: 'EDD' },
  { name: 'Illegal Activity Details',           category: 'EDD' },
  { name: 'InActive Date',                      category: 'RISKCENTER Third Party' },
  { name: 'Instances of Trafficking',           category: 'EDD' },
  { name: 'Instances of Trafficking Details',   category: 'EDD' },
  { name: 'Internal Reference or ID',           category: 'RISKCENTER Third Party' },
  { name: 'Modern Slavery Policy Applies To',   category: 'EDD' },
  { name: 'Monitoring Last Update',             category: 'RISKCENTER Third Party' },
  { name: 'Other Red Flag(s)',                  category: 'EDD' },
  { name: 'Other Red Flag(s) Details',          category: 'EDD' },
  { name: 'Payment Method',                     category: 'EDD' },
  { name: 'Person Business Address',            category: 'RISKCENTER Third Party' },
  { name: 'Person Country of Residence',        category: 'RISKCENTER Third Party' },
  { name: 'Person ID Type',                     category: 'RISKCENTER Third Party' },
  { name: 'Person ID Value',                    category: 'RISKCENTER Third Party' },
  { name: 'Person Industry Sector - onboarding', category: 'RISKCENTER Third Party' },
  { name: 'Person Other Known Name or Alias',   category: 'RISKCENTER Third Party' },
  { name: 'Person Third Party Legal Name',      category: 'RISKCENTER Third Party' },
  { name: 'Person Year of Birth',               category: 'RISKCENTER Third Party' },
  { name: 'Politically Exposed Person',         category: 'EDD' },
  { name: 'Process Name',                       category: 'RISKCENTER Third Party' },
  { name: 'Responsible Client Unit',            category: 'RISKCENTER Third Party' },
  { name: 'Screening & Monitoring Policy',      category: 'RISKCENTER Third Party' },
  { name: 'Third Party Contact Email Address',  category: 'RISKCENTER Third Party' },
  { name: 'Third Party Expiry Date',            category: 'RISKCENTER Third Party' },
  { name: 'Third Party Legal Structure',        category: 'RISKCENTER Third Party' },
  { name: 'Third Party Owner',                  category: 'RISKCENTER Third Party' },
];

const INITIAL_COLS = [
  { id: 'col0', label: 'After Risk Assessment', condition: 'Yes' },
  { id: 'col1', label: 'Current Risk Level',    condition: 'Any' },
];

const INITIAL_ROWS = [
  { values: { col0: '', col1: '' }, period: '8', unit: 'Year(s)', active: true  },
  { values: { col0: '', col1: '' }, period: '8', unit: 'Year(s)', active: false },
  { values: { col0: '', col1: '' }, period: '8', unit: 'Year(s)', active: false },
  { values: { col0: '', col1: '' }, period: '8', unit: 'Year(s)', active: false },
  { values: { col0: '', col1: '' }, period: '8', unit: 'Year(s)', active: false },
  { values: { col0: '', col1: '' }, period: '8', unit: 'Year(s)', active: false },
  { values: { col0: '', col1: '' }, period: '8', unit: 'Year(s)', active: false },
];

export default function RenewalEdit() {
  const { version } = useParams();
  const navigate = useNavigate();

  const [cols, setCols] = useState(INITIAL_COLS);
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [leftPct, setLeftPct] = useState(58);
  const [openMenu, setOpenMenu] = useState(null);
  const [dragRowIdx, setDragRowIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  // Column picker panel
  const [colPicker, setColPicker] = useState(null); // { colId, side: 'left'|'right' }
  const [pickerSearch, setPickerSearch] = useState('');
  const [openRowMenu, setOpenRowMenu] = useState(null); // row index
  const panelsRef = useRef(null);
  const dragging = useRef(false);
  const menuRef = useRef(null);
  const rowMenuRef = useRef(null);

  function updateRow(i, key, val) {
    setRows(prev => prev.map((r, idx) => idx === i ? { ...r, [key]: val } : r));
  }

  function updateRowColVal(rowIdx, colId, val) {
    setRows(prev => prev.map((r, i) => i === rowIdx ? { ...r, values: { ...r.values, [colId]: val } } : r));
  }

  // Column operations — open picker first
  function addColLeft(colId) {
    setColPicker({ colId, side: 'left' });
    setPickerSearch('');
    setOpenMenu(null);
  }

  function addColRight(colId) {
    setColPicker({ colId, side: 'right' });
    setPickerSearch('');
    setOpenMenu(null);
  }

  function confirmAddCol(property) {
    if (!colPicker) return;
    const { colId, side } = colPicker;
    const idx = cols.findIndex(c => c.id === colId);
    const newId = 'col' + Date.now();
    const newCol = { id: newId, label: property.name, condition: 'Any' };
    const insertAt = side === 'left' ? idx : idx + 1;
    setCols(prev => [...prev.slice(0, insertAt), newCol, ...prev.slice(insertAt)]);
    setRows(prev => prev.map(r => ({ ...r, values: { ...r.values, [newId]: '' } })));
    setColPicker(null);
  }

  function moveColRight(colId) {
    const idx = cols.findIndex(c => c.id === colId);
    if (idx >= cols.length - 1) return;
    const next = [...cols];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    setCols(next);
    setOpenMenu(null);
  }

  function deleteCol(colId) {
    if (cols.length <= 1) return;
    setCols(prev => prev.filter(c => c.id !== colId));
    setRows(prev => prev.map(r => { const v = { ...r.values }; delete v[colId]; return { ...r, values: v }; }));
    setOpenMenu(null);
  }

  // Row drag-to-reorder
  function onRowDragStart(e, i) {
    setDragRowIdx(i);
    e.dataTransfer.effectAllowed = 'move';
  }

  function onRowDragOver(e, i) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIdx(i);
  }

  function onRowDrop(e, i) {
    e.preventDefault();
    if (dragRowIdx === null || dragRowIdx === i) {
      setDragRowIdx(null);
      setDragOverIdx(null);
      return;
    }
    setRows(prev => {
      const next = [...prev];
      const [moved] = next.splice(dragRowIdx, 1);
      next.splice(i, 0, moved);
      return next;
    });
    setDragRowIdx(null);
    setDragOverIdx(null);
  }

  function onRowDragEnd() {
    setDragRowIdx(null);
    setDragOverIdx(null);
  }

  function deleteRow(i) {
    setRows(prev => prev.filter((_, idx) => idx !== i));
    setOpenRowMenu(null);
  }

  function duplicateRow(i) {
    setRows(prev => {
      const next = [...prev];
      next.splice(i + 1, 0, { ...prev[i], values: { ...prev[i].values } });
      return next;
    });
    setOpenRowMenu(null);
  }

  function toggleRowActive(i) {
    updateRow(i, 'active', !rows[i].active);
    setOpenRowMenu(null);
  }

  // Close column menu on outside click
  useEffect(() => {
    if (!openMenu) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [openMenu]);

  // Close row menu on outside click
  useEffect(() => {
    if (openRowMenu === null) return;
    const handler = (e) => {
      if (rowMenuRef.current && !rowMenuRef.current.contains(e.target)) setOpenRowMenu(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [openRowMenu]);

  const onDividerMouseDown = useCallback((e) => {
    e.preventDefault();
    dragging.current = true;

    const onMouseMove = (e) => {
      if (!dragging.current || !panelsRef.current) return;
      const rect = panelsRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      // Reserve at least 440px + 8px divider for the right panel
      const maxPct = ((rect.width - 448) / rect.width) * 100;
      setLeftPct(Math.min(maxPct, Math.max(50, pct)));
    };

    const onMouseUp = () => {
      dragging.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, []);

  return (
    <PageLayout>
      <Breadcrumb
        items={[
          { label: 'Settings', to: '/settings' },
          { label: 'General – Renewals' },
        ]}
      />

      {/* ── Renewals card ── */}
      <div className={styles.card} style={{ marginTop: 8 }}>
        <div className={styles.expirationsHeader}>
          <div className={styles.expirationsTitle}>
            <h2 className={styles.cardTitle}>Renewals</h2>
            <span className={styles.versionMeta}>— Version {version || 47}, Last Updated 11 Feb 2025, by Claudio Merino</span>
          </div>
          <div className={styles.expirationsActions}>
            <button className={styles.btnOutline} onClick={() => navigate('/settings')}>Back</button>
            <button className={styles.btnFilled}>Save</button>
            <button className={styles.btnFilled}>Publish</button>
          </div>
        </div>
      </div>

      {/* ── Panels ── */}
      <div className={styles.panels} ref={panelsRef}>
        <div className={styles.panelLeft} style={{ flex: `0 0 ${leftPct}%` }}>

          {/* Rules heading */}
          <h3 className={styles.panelTitle}>Rules</h3>

          {/* Rules table */}
          <div className={styles.rulesTable} style={{ gridTemplateColumns: `36px repeat(${cols.length}, 1fr)` }}>
            {/* Header */}
            <div className={styles.rulesHeader} style={{ gridTemplateColumns: `36px repeat(${cols.length}, 1fr)` }}>
              <div className={styles.rulesDragCol} />
              {cols.map(col => (
                <div key={col.id} className={styles.rulesColHead}>
                  <span className={styles.colHeadLabel}>{col.label}</span>
                  <div className={styles.colMenuWrap} ref={openMenu === col.id ? menuRef : null}>
                    <button
                      className={styles.colMenuBtn}
                      onClick={() => setOpenMenu(openMenu === col.id ? null : col.id)}
                    >
                      <span className="material-icons-outlined" style={{ fontSize: 18 }}>more_vert</span>
                    </button>
                    {openMenu === col.id && (
                      <div className={styles.colMenu}>
                        <button className={styles.colMenuItem} onClick={() => addColLeft(col.id)}>Add Column Left</button>
                        <button className={styles.colMenuItem} onClick={() => addColRight(col.id)}>Add Column Right</button>
                        <button className={styles.colMenuItem} onClick={() => moveColRight(col.id)} disabled={cols.indexOf(col) === cols.length - 1}>Move Column Right</button>
                        <button className={styles.colMenuItem} onClick={() => deleteCol(col.id)} disabled={cols.length <= 1}>Delete Column</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <div
                key={i}
                className={`${styles.ruleRow}${row.active ? ' ' + styles.ruleRowActive : ''}${dragOverIdx === i && dragRowIdx !== i ? ' ' + styles.ruleRowDropTarget : ''}`}
                style={{ gridTemplateColumns: `36px repeat(${cols.length}, 1fr)` }}
                onDragOver={e => onRowDragOver(e, i)}
                onDrop={e => onRowDrop(e, i)}
              >
                <div
                  className={styles.rulesDragCol}
                  draggable
                  onDragStart={e => onRowDragStart(e, i)}
                  onDragEnd={onRowDragEnd}
                >
                  <span className="material-icons-outlined" style={{ fontSize: 16, color: 'var(--neutral-400)', cursor: 'grab' }}>drag_indicator</span>
                </div>
                {cols.map(col => (
                  <div key={col.id} className={styles.ruleCell}>
                    <div className={styles.conditionPill}>
                      <span className={styles.conditionTag}>{col.condition}</span>
                      <select className={styles.ruleSelect} value={row.values[col.id] || ''} onChange={e => updateRowColVal(i, col.id, e.target.value)}>
                        {RULE_OPTIONS.map(o => <option key={o} value={o}>{o || 'Choose'}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Add Rules link */}
          <button className={styles.addRulesBtn} onClick={() => setRows(prev => [...prev, { values: Object.fromEntries(cols.map(c => [c.id, ''])), period: '8', unit: 'Year(s)', active: false }])}>
            Add Rules
            <span className="material-icons-outlined" style={{ fontSize: 16 }}>add</span>
          </button>

        </div>

        {/* Draggable separator */}
        <div className={styles.panelDivider} onMouseDown={onDividerMouseDown}>
          <div className={styles.panelDividerHandle} />
        </div>

        <div className={styles.panelRight}>

          {/* Details heading */}
          <h3 className={styles.panelTitle}>Details</h3>

          {/* Details table */}
          <div className={styles.detailsTable}>
            {/* Header */}
            <div className={styles.detailsHeader}>
              <div className={styles.detailsColPeriod}>Expiry Period</div>
              <div className={styles.detailsColStatus}>Status</div>
              <div className={styles.detailsColActions} />
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <div key={i} className={`${styles.detailRow}${row.active ? ' ' + styles.detailRowActive : ''}`}>
                <div className={styles.detailsColPeriod}>
                  <input
                    className={styles.periodInput}
                    type="number"
                    value={row.period}
                    onChange={e => updateRow(i, 'period', e.target.value)}
                  />
                  <select
                    className={styles.periodSelect}
                    value={row.unit}
                    onChange={e => updateRow(i, 'unit', e.target.value)}
                  >
                    {RENEWAL_PERIOD_UNITS.map(u => <option key={u}>{u}</option>)}
                  </select>
                </div>
                <div className={styles.detailsColStatus}>
                  <div
                    className={`${styles.activeToggle}${!row.active ? ' ' + styles.activeToggleOff : ''}`}
                    onClick={() => updateRow(i, 'active', !row.active)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && updateRow(i, 'active', !row.active)}
                  >
                    <div className={styles.activeToggleTrack}>{row.active ? 'Active' : 'Inactive'}</div>
                    <div className={styles.activeToggleThumb} />
                  </div>
                </div>
                <div className={styles.detailsColActions} ref={openRowMenu === i ? rowMenuRef : null}>
                  <button
                    className={styles.rowMenuBtn}
                    onClick={() => setOpenRowMenu(openRowMenu === i ? null : i)}
                  >
                    <span className="material-icons-outlined" style={{ fontSize: 18 }}>more_vert</span>
                  </button>
                  {openRowMenu === i && (
                    <div className={styles.rowMenu}>
                      <button className={styles.colMenuItem} onClick={() => duplicateRow(i)}>Duplicate</button>
                      <button className={styles.colMenuItem} onClick={() => deleteRow(i)} disabled={rows.length <= 1}>Delete</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Column Picker Side Panel ── */}
      {colPicker && (
        <>
          <div className={styles.pickerOverlay} onClick={() => setColPicker(null)} />
          <div className={styles.pickerPanel}>
            <div className={styles.pickerHeader}>
              <span className={styles.pickerTitle}>
                Add Column {colPicker.side === 'left' ? 'Left' : 'Right'}
              </span>
              <button className={styles.pickerClose} onClick={() => setColPicker(null)}>
                <span className="material-icons-outlined">close</span>
              </button>
            </div>

            <div className={styles.pickerSearchWrap}>
              <span className={`material-icons-outlined ${styles.pickerSearchIcon}`}>search</span>
              <input
                className={styles.pickerSearchInput}
                type="text"
                placeholder="Search properties…"
                value={pickerSearch}
                onChange={e => setPickerSearch(e.target.value)}
                autoFocus
              />
            </div>

            <div className={styles.pickerTableWrap}>
              <table className={styles.pickerTable}>
                <thead>
                  <tr>
                    <th style={{ width: '400px' }}>Name</th>
                    <th style={{ width: '200px' }}>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {PROPERTIES
                    .filter(p => !pickerSearch || p.name.toLowerCase().includes(pickerSearch.toLowerCase()) || p.category.toLowerCase().includes(pickerSearch.toLowerCase()))
                    .map(p => (
                      <tr key={p.name} className={styles.pickerRow} onClick={() => confirmAddCol(p)}>
                        <td>{p.name}</td>
                        <td>{p.category}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </PageLayout>
  );
}
