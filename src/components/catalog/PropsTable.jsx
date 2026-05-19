import styles from './PropsTable.module.css';

export default function PropsTable({ rows }) {
  return (
    <div className={styles.wrap}>
      <table className={styles.table} style={{ minWidth: 0 }}>
        <thead>
          <tr>
            <th style={{ width: '18%' }}>Prop</th>
            <th style={{ width: '22%' }}>Type</th>
            <th style={{ width: '16%' }}>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td><code className={styles.code}>{r.name}{r.required ? <span className={styles.req}>*</span> : null}</code></td>
              <td><code className={styles.type}>{r.type}</code></td>
              <td><code className={styles.def}>{r.default ?? '—'}</code></td>
              <td className={styles.desc}>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
