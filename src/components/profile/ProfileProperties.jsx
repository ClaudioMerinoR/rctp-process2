import { useParams } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { Sidebar } from './ProfilePage';
import ProfilePageHeader from './ProfilePageHeader';
import styles from './profile.module.css';
import rmStyles from './ProfileRiskMitigation.module.css';
import propStyles from './ProfileProperties.module.css';

const PROPERTY_TAGS = ['RCTP', 'EDD', 'Scoring', 'RISK CENTER Third Parties'];

export default function ProfileProperties() {
  const { profileId } = useParams();
  const profile = profiles[profileId];
  if (!profile) return null;

  const allFields = [
    ...(profile.overviewFields || []),
    ...(profile.additionalFields || []),
  ];

  return (
    <PageLayout>
      <Breadcrumb items={[
        { label: 'Third Parties', to: '/third-parties' },
        { label: profile.name },
      ]} />

      <ProfilePageHeader profile={profile} />

      <div className={styles.pageBody}>
        <Sidebar profile={profile} />

        <main className={styles.mainContent}>
          <section className={rmStyles.card}>

            <div className={`${styles.cardHeader} ${rmStyles.cardHeader}`}>
              <div className={rmStyles.cardTitleRow}>
                <h2 className={styles.cardTitle}>Properties</h2>
                <span className="material-icons-outlined" style={{ fontSize: 18, color: 'var(--text-light)', cursor: 'pointer' }}>info</span>
              </div>
              <div className={propStyles.headerRight}>
                <span className={propStyles.resultCount}>
                  Showing results 1 – {allFields.length} of {allFields.length}
                </span>
                <button className={`${styles.btn} ${styles.btnOutline} ${propStyles.filterBtn}`}>
                  Filter
                  <span className="material-icons-outlined" style={{ fontSize: 16 }}>filter_list</span>
                </button>
              </div>
            </div>

            <div className={rmStyles.tableWrap}>
              <table className={styles.table} style={{ minWidth: 0 }}>
                <thead>
                  <tr>
                    <th>Field Name <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
                    <th>Value <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
                    <th>Key Risk <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
                    <th>Red Flag <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
                    <th>Score <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
                    <th>Property Tag <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
                    <th>Risk Category <span className="material-icons-outlined" style={{ fontSize: 12, verticalAlign: 'middle' }}>arrow_drop_down</span></th>
                    <th style={{ width: 48 }} />
                  </tr>
                </thead>
                <tbody>
                  {allFields.map((field, i) => {
                    const prop = field.property || {};
                    const tag = prop.tag ?? PROPERTY_TAGS[i % PROPERTY_TAGS.length];
                    return (
                      <tr key={i}>
                        <td>{field.label}</td>
                        <td>
                          {field.value
                            ? <span className={propStyles.statusBadge}>{field.value}</span>
                            : <span className={propStyles.emptyValue}>—</span>
                          }
                        </td>
                        <td className={propStyles.iconCell}>
                          {prop.keyRisk
                            ? <span className="material-icons-outlined" style={{ fontSize: 18, color: 'var(--warning-500)' }}>warning</span>
                            : null}
                        </td>
                        <td className={propStyles.iconCell}>
                          {prop.redFlag
                            ? <span className="material-icons-outlined" style={{ fontSize: 18, color: 'var(--alert-500)' }}>flag</span>
                            : null}
                        </td>
                        <td>{prop.score ?? ''}</td>
                        <td>
                          <span className={propStyles.statusBadge}>{tag}</span>
                        </td>
                        <td>{prop.riskCategory || 'General'}</td>
                        <td className={propStyles.editCell}>
                          <button className={propStyles.editBtn} title="Edit">
                            <span className="material-icons-outlined" style={{ fontSize: 16 }}>edit</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </section>
        </main>
      </div>
    </PageLayout>
  );
}
