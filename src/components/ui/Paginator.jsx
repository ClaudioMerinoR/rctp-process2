import styles from './Paginator.module.css';

export default function Paginator({
  page = 1,
  totalPages = 1,
  pageSize = 20,
  totalItems = 0,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [20, 50, 100],
}) {
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <div className={styles.paginator}>
      <div className={styles.left}>
        <select
          className={styles.sizeSelect}
          value={pageSize}
          onChange={e => onPageSizeChange?.(Number(e.target.value))}
        >
          {pageSizeOptions.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <span className={styles.info}>
          {totalItems === 0 ? 'No results' : `Showing results ${start} – ${end} of ${totalItems}`}
        </span>
      </div>
      <div className={styles.right}>
        <button className={styles.pageBtn} onClick={() => onPageChange?.(1)} disabled={page <= 1} aria-label="First page">
          <span className="material-icons-outlined" style={{ fontSize: 16 }}>first_page</span>
        </button>
        <button className={styles.pageBtn} onClick={() => onPageChange?.(page - 1)} disabled={page <= 1} aria-label="Previous page">
          <span className="material-icons-outlined" style={{ fontSize: 16 }}>chevron_left</span>
        </button>
        <input
          className={styles.pageInput}
          type="number"
          min={1}
          max={totalPages}
          value={page}
          onChange={e => {
            const v = Math.max(1, Math.min(totalPages, Number(e.target.value)));
            onPageChange?.(v);
          }}
          aria-label="Page number"
        />
        <span className={styles.info}>of {totalPages}</span>
        <button className={styles.pageBtn} onClick={() => onPageChange?.(page + 1)} disabled={page >= totalPages} aria-label="Next page">
          <span className="material-icons-outlined" style={{ fontSize: 16 }}>chevron_right</span>
        </button>
        <button className={styles.pageBtn} onClick={() => onPageChange?.(totalPages)} disabled={page >= totalPages} aria-label="Last page">
          <span className="material-icons-outlined" style={{ fontSize: 16 }}>last_page</span>
        </button>
      </div>
    </div>
  );
}
