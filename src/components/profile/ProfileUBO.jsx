import { useParams } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { Sidebar } from './ProfilePage';
import ProfilePageHeader from './ProfilePageHeader';
import styles from './profile.module.css';
import uboStyles from './ProfileUBO.module.css';

function getField(fields, label) {
  return (fields || []).find(f => f.label === label)?.value || '—';
}

export default function ProfileUBO() {
  const { profileId } = useParams();
  const profile = profiles[profileId];
  if (!profile) return null;

  const allFields = [...(profile.overviewFields || []), ...(profile.additionalFields || [])];

  const name    = getField(allFields, 'Entity Third Party Legal Name') !== '—'
    ? getField(allFields, 'Entity Third Party Legal Name')
    : profile.name;
  const country = getField(allFields, 'Entity Registered Country');
  const address = getField(allFields, 'Entity Registered Address');
  const duns    = getField(allFields, 'Entity ID Value') !== '—'
    ? getField(allFields, 'Entity ID Value')
    : getField(allFields, 'Entity ID Type') === 'DUNS Number'
      ? '—'
      : '—';

  const ubo = profile.ubo || {};
  const uboStatus  = ubo.status  || 'Available';
  const verifiedOn = ubo.verifiedOn || null;
  const verifiedBy = ubo.verifiedBy || null;

  const statusGreen = uboStatus.toLowerCase() === 'available';

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

          {/* Card 1 — UBO summary */}
          <section className={uboStyles.card}>
            <div className={uboStyles.cardTop}>
              <div className={uboStyles.titleBlock}>
                <h2 className={uboStyles.title}>
                  UBO (Ultimate Beneficial Ownership)
                  <span className="material-icons-outlined" style={{ fontSize: 16, color: 'var(--primary-500)', verticalAlign: 'middle', marginLeft: 6 }}>info</span>
                </h2>
                <div className={uboStyles.uboStatus}>
                  <span className={uboStyles.uboStatusLabel}>UBO Status:</span>
                  <span className={statusGreen ? uboStyles.uboStatusAvailable : uboStyles.uboStatusUnavailable}>
                    {uboStatus.toUpperCase()}
                  </span>
                  <span className={`material-icons-outlined ${statusGreen ? uboStyles.uboStatusIconGreen : uboStyles.uboStatusIconGrey}`} style={{ fontSize: 16 }}>
                    {statusGreen ? 'check_circle' : 'cancel'}
                  </span>
                </div>
              </div>

              <div className={uboStyles.actions}>
                <button className={uboStyles.btnSkip}>Skip</button>
                <button className={uboStyles.btnView}>View</button>
                <button className={`${styles.btn} ${styles.btnFilled}`}>Get UBO Information</button>
              </div>
            </div>

            <div className={uboStyles.separator} />

            <div className={uboStyles.fields}>
              <div className={uboStyles.field}>
                <div className={uboStyles.fieldLabel}>Name</div>
                <div className={uboStyles.fieldValue}>{name}</div>
              </div>
              <div className={uboStyles.field}>
                <div className={uboStyles.fieldLabel}>Country/Territory</div>
                <div className={uboStyles.fieldValue}>{country}</div>
              </div>
              <div className={uboStyles.field} style={{ flex: 2 }}>
                <div className={uboStyles.fieldLabel}>Address</div>
                <div className={uboStyles.fieldValue}>{address}</div>
              </div>
              <div className={uboStyles.field}>
                <div className={uboStyles.fieldLabel}>DUNS</div>
                <div className={uboStyles.fieldValue}>{duns}</div>
              </div>
            </div>
          </section>

          {/* Card 2 — Verified Entity Details */}
          <section className={uboStyles.card} style={{ marginTop: 8 }}>
            <div className={uboStyles.verifiedHeader}>
              <div>
                <h2 className={uboStyles.verifiedTitle}>Verified Entity Details</h2>
                <div className={uboStyles.verifiedSource}>Source: Dun &amp; Bradstreet</div>
              </div>
            </div>

            {verifiedOn && verifiedBy && (
              <p className={uboStyles.verifiedMeta}>
                This Third Party was verified on {verifiedOn} by {verifiedBy}.
              </p>
            )}
            <p className={uboStyles.verifiedDesc}>
              After completing the Entity Verification process, properties have been updated with the following Dun &amp; Bradstreet profile attributes.
            </p>

            <div className={uboStyles.verifiedRow}>
              <span className={uboStyles.verifiedName}>{name} — {country}</span>
              <span className={uboStyles.verifiedDuns}>DUNS NUMBER : {duns}</span>
            </div>

            <div className={uboStyles.verifiedAddressRow}>
              <span className={uboStyles.verifiedAddressLabel}>ADDRESS :</span>
              <span className={uboStyles.verifiedAddressValue}>{address}</span>
            </div>

            <div className={uboStyles.verifiedSeparator} />
          </section>

        </main>
      </div>
    </PageLayout>
  );
}
