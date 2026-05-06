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

function VerifiedField({ label, value }) {
  return (
    <div className={uboStyles.field}>
      <div className={uboStyles.fieldLabel}>{label}</div>
      <div className={uboStyles.fieldValue}>
        <span className={`material-icons-outlined`} style={{ fontSize: 16, color: '#13df81', verticalAlign: 'middle', marginRight: 6 }}>check_circle</span>
        {value}
      </div>
    </div>
  );
}

export default function ProfileEntityVerification() {
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
    : '—';

  const ev = profile.entityVerification || {};
  const verifiedOn = ev.verifiedOn || null;
  const verifiedBy = ev.verifiedBy || null;
  const uboStatusAvailable = ev.uboStatus !== false;

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

          {/* Card 1 — Entity summary + Verify button */}
          <section className={uboStyles.card}>
            <div className={uboStyles.cardTop}>
              <div className={uboStyles.titleBlock}>
                <h2 className={uboStyles.title}>
                  Entity Verification
                  <span className="material-icons-outlined" style={{ fontSize: 16, color: 'var(--primary-500)', verticalAlign: 'middle', marginLeft: 6 }}>info</span>
                </h2>
              </div>
              <div className={uboStyles.actions}>
                <button className={`${styles.btn} ${styles.btnFilled}`}>Verify Entity</button>
              </div>
            </div>

            <div className={uboStyles.separator} />

            <div className={uboStyles.fields}>
              <div className={uboStyles.field}>
                <div className={uboStyles.fieldLabel}>Name</div>
                <div className={uboStyles.fieldValue}>
                  <span className="material-icons-outlined" style={{ fontSize: 16, color: '#13df81', verticalAlign: 'middle', marginRight: 6 }}>check_circle</span>
                  {name}
                </div>
                <div className={uboStyles.uboStatus} style={{ marginTop: 4 }}>
                  <span className={uboStyles.uboStatusLabel} style={{ fontSize: 12 }}>UBO Status</span>
                  <span className="material-icons-outlined" style={{ fontSize: 14, color: uboStatusAvailable ? '#13df81' : 'var(--neutral-500)' }}>
                    {uboStatusAvailable ? 'check_circle' : 'cancel'}
                  </span>
                </div>
              </div>
              <VerifiedField label="Country/Territory" value={country} />
              <div className={uboStyles.field} style={{ flex: 2 }}>
                <div className={uboStyles.fieldLabel}>Address</div>
                <div className={uboStyles.fieldValue}>
                  <span className="material-icons-outlined" style={{ fontSize: 16, color: '#13df81', verticalAlign: 'middle', marginRight: 6 }}>check_circle</span>
                  {address}
                </div>
              </div>
              <VerifiedField label="DUNS" value={duns} />
            </div>
          </section>

          {/* Card 2 — Verified Entity Details */}
          <section className={uboStyles.card} style={{ marginTop: 8 }}>
            <div className={uboStyles.verifiedHeader}>
              <h2 className={uboStyles.verifiedTitle}>Verified Entity Details</h2>
            </div>

            {verifiedOn && verifiedBy ? (
              <p className={uboStyles.verifiedMeta}>
                This Third Party was verified on {verifiedOn} by {verifiedBy}.
              </p>
            ) : (
              <p className={uboStyles.verifiedMeta}>
                Verification details will appear here once the entity has been verified.
              </p>
            )}

            <div className={uboStyles.separator} />

            <div className={uboStyles.verifiedRow}>
              <span className={uboStyles.verifiedName}>{name} - {country}</span>
              <span className={uboStyles.verifiedDuns}>DUNS NUMBER : {duns}</span>
            </div>

            <div className={uboStyles.verifiedAddressRow}>
              <span className={uboStyles.verifiedAddressLabel}>ADDRESS :</span>
              <span className={uboStyles.verifiedAddressValue}>{address}</span>
            </div>

            <div className={uboStyles.verifiedSeparator} />

            <div className={uboStyles.verifiedSourceRow}>
              <span className="material-icons-outlined" style={{ fontSize: 14, color: 'var(--neutral-500)' }}>info</span>
              <span className={uboStyles.verifiedSource}>SOURCE: DUN &amp; BRADSTREET</span>
            </div>
          </section>

        </main>
      </div>
    </PageLayout>
  );
}
