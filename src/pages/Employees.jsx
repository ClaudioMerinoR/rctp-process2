import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Breadcrumb from '../components/layout/Breadcrumb';
import Button from '../components/ui/Button';
import styles from './Employees.module.css';

const ROWS = [
  { name: 'Antonella Sassu',             tags: '',  ref: '', bu: 'Europe',              restricted: false, active: true,  status: 'Registered' },
  { name: 'Barry Marbles',               tags: '',  ref: '', bu: 'Europe',              restricted: false, active: true,  status: 'Registered' },
  { name: 'Bianka Grimm',                tags: '',  ref: '', bu: 'Entity Verification', restricted: false, active: true,  status: 'Registered' },
  { name: 'Calvin Kang',                 tags: '',  ref: '', bu: 'test',                restricted: false, active: true,  status: 'Registered' },
  { name: 'Calvin Kang (Test 2)',         tags: '',  ref: '', bu: 'test',                restricted: false, active: true,  status: 'Registered' },
  { name: 'Calvin Kang NotPartOfApproveGroup', tags: '', ref: '', bu: 'test',           restricted: false, active: true,  status: 'Registered' },
  { name: 'Carmela Monllor Llorens',     tags: '',  ref: '', bu: 'Europe',              restricted: false, active: true,  status: 'Registered' },
  { name: 'Chris Eadie',                 tags: '',  ref: '', bu: 'Europe',              restricted: false, active: true,  status: 'Registered' },
  { name: 'Claudio Merino',              tags: '',  ref: '', bu: 'Entity Verification', restricted: false, active: true,  status: 'Not Registered' },
  { name: 'Claudio Merino',              tags: '',  ref: '', bu: 'Europe',              restricted: false, active: true,  status: 'Registered' },
  { name: 'DJ Service Desk',             tags: '',  ref: '', bu: 'Europe',              restricted: false, active: true,  status: 'Registered' },
  { name: 'DJ Support',                  tags: '',  ref: '', bu: 'Europe',              restricted: false, active: true,  status: 'Registered' },
  { name: 'David Robayo',                tags: '',  ref: '', bu: 'Europe',              restricted: false, active: true,  status: 'Registered' },
  { name: 'Davide Contini',              tags: '',  ref: '', bu: 'Europe',              restricted: false, active: true,  status: 'Registered' },
  { name: 'E W',                         tags: '',  ref: '', bu: 'Europe',              restricted: false, active: true,  status: 'Registered' },
  { name: 'Jorge Sneij',                 tags: '',  ref: '', bu: 'test',                restricted: false, active: true,  status: 'Registered' },
  { name: 'Maria Joao Cruz',             tags: '',  ref: '', bu: 'Entity Verification', restricted: false, active: true,  status: 'Registered' },
  { name: 'Min Chung',                   tags: '',  ref: '', bu: 'test',                restricted: false, active: true,  status: 'Registered' },
  { name: 'Miruna Menzopol',             tags: '',  ref: '', bu: 'Europe',              restricted: false, active: true,  status: 'Registered' },
  { name: 'Miruna Menzopol (Admin)',     tags: '',  ref: '', bu: 'Entity Verification', restricted: false, active: true,  status: 'Registered' },
  { name: 'Nataly Baez',                 tags: '',  ref: '', bu: 'test',                restricted: false, active: true,  status: 'Registered' },
  { name: 'Oriol Gomez',                 tags: '',  ref: '', bu: 'Entity Verification', restricted: false, active: true,  status: 'Registered' },
  { name: 'Soni Kumari',                 tags: '',  ref: '', bu: 'Europe',              restricted: false, active: true,  status: 'Registered' },
  { name: 'Tayfun Kocak',                tags: '',  ref: '', bu: 'Europe',              restricted: false, active: true,  status: 'Registered' },
  { name: 'Veronica Torres Troconis',    tags: '',  ref: '', bu: 'Entity Verification', restricted: false, active: true,  status: 'Registered' },
  { name: 'Yi Zhang',                    tags: '',  ref: '', bu: 'test',                restricted: false, active: true,  status: 'Registered' },
  { name: 'alvaro sanchez',              tags: '',  ref: '', bu: 'Europe',              restricted: false, active: true,  status: 'Registered' },
  { name: 'alvaro sanchez',              tags: '',  ref: '', bu: 'test',                restricted: false, active: true,  status: 'Not Registered' },
  { name: 'karolina kopacz',             tags: '',  ref: '', bu: 'Europe',              restricted: false, active: true,  status: 'Registered' },
  { name: 'stephen davidson',            tags: '',  ref: '', bu: 'Entity Verification', restricted: false, active: true,  status: 'Registered' },
];

function StatusBadge({ status }) {
  const isReg = status === 'Registered';
  return (
    <span className={`${styles.statusBadge} ${isReg ? styles.statusRegistered : styles.statusNotRegistered}`}>
      {status}
    </span>
  );
}

export default function Employees() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState('Standard');

  const filtered = search
    ? ROWS.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.bu.toLowerCase().includes(search.toLowerCase()))
    : ROWS;

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: 'Employees' }]} />

      <div className={styles.card}>

        {/* Title row */}
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Employees</h1>
          <div className={styles.titleActions}>
            <select className={styles.viewSelect} value={view} onChange={e => setView(e.target.value)}>
              <option>Standard</option>
              <option>Compact</option>
            </select>
            <button className={styles.filterBtn}>
              <span className="material-icons-outlined" style={{ fontSize: 18 }}>filter_list</span>
            </button>
            <Button variant="filled">Add Employee</Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <div className={styles.searchWrap}>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Quick Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <span className="material-icons-outlined" style={{ position: 'absolute', right: 8, color: 'var(--text-light)', fontSize: 18, pointerEvents: 'none' }}>search</span>
            </div>
            <button className={styles.refreshBtn} onClick={() => setSearch('')} title="Reset">
              <span className="material-icons-outlined" style={{ fontSize: 18 }}>refresh</span>
            </button>
            <span className={styles.resultCount}>Showing results 1 – {filtered.length} of {filtered.length}</span>
          </div>
          <div className={styles.toolbarRight}>
            <Button variant="outline" icon="file_download">Export</Button>
            <Button variant="soft">Save</Button>
            <Button variant="soft">Save As</Button>
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
                <th>Tags <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
                <th>Ref <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
                <th>Business Unit <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
                <th>Third Party Restricted <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
                <th>Active <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
                <th>Status <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-light)', padding: '32px 0' }}>No employees found.</td></tr>
              ) : filtered.map((row, i) => (
                <tr key={i}>
                  <td><span className={styles.cellLink}>{row.name}</span></td>
                  <td>{row.tags}</td>
                  <td>{row.ref}</td>
                  <td>{row.bu}</td>
                  <td>{row.restricted ? 'Yes' : 'No'}</td>
                  <td>{row.active ? 'Yes' : 'No'}</td>
                  <td><StatusBadge status={row.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.divider} />
        <div className={styles.pagination}>
          <div className={styles.paginationLeft}>
            <button className={styles.pageBtn} disabled><span className="material-icons-outlined">first_page</span></button>
            <button className={styles.pageBtn} disabled><span className="material-icons-outlined">chevron_left</span></button>
          </div>
          <div className={styles.paginationCenter}>
            <span>Page</span>
            <input className={styles.pageInput} type="number" defaultValue={1} min={1} max={1} />
            <span>of 1</span>
          </div>
          <div className={styles.paginationRight}>
            <button className={styles.pageBtn} disabled><span className="material-icons-outlined">chevron_right</span></button>
            <button className={styles.pageBtn} disabled><span className="material-icons-outlined">last_page</span></button>
          </div>
        </div>
        <div className={styles.paginationBottom}>
          <span>Showing results 1 – {filtered.length} of {filtered.length}</span>
        </div>

      </div>
    </PageLayout>
  );
}
