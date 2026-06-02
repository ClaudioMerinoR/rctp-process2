import { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { Sidebar } from './ProfilePage';
import ProfilePageHeader from './ProfilePageHeader';
import { patchInitechProfile } from '../../utils/initechFlow';
import styles from './profile.module.css';
import secStyles from './ProfileProcessSection.module.css';

export default function ProfileInternalDueDiligence() {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const rawProfile = profiles[profileId];
  if (!rawProfile) return null;
  const profile = patchInitechProfile(rawProfile);

  const [details, setDetails] = useState('');
  const [fileName, setFileName] = useState('');
  const fileRef = useRef(null);

  return (
    <PageLayout>
      <Breadcrumb items={[
        { label: 'Third Parties', to: '/third-parties' },
        { label: profile.shortName, to: `/profile/${profile.id}` },
        { label: 'Due Diligence', to: `/profile/${profile.id}/due-diligence` },
        { label: 'DD Internal' },
      ]} />

      <ProfilePageHeader profile={rawProfile} />

      <div className={styles.pageBody}>
        <Sidebar profile={rawProfile} />

        <main className={styles.mainContent}>
          <section className={secStyles.card}>

            <div className={secStyles.cardHeader}>
              <div className={secStyles.cardTitleRow}>
                <span className={`${styles.btn} ${styles.btnFilled}`} style={{ minWidth: 28, padding: '0 10px', pointerEvents: 'none' }}>1</span>
                <h2 className={styles.cardTitle}>DD Internal</h2>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button className={`${styles.btn} ${styles.btnFilled}`}>Submit</button>
                <button className={`${styles.btn} ${styles.btnOutline}`}>Notes</button>
                <button className={`${styles.btn} ${styles.btnOutline}`}>Reassign</button>
                <button className={`${styles.btn} ${styles.btnOutline}`}>Properties</button>
                <button
                  className={`${styles.btn} ${styles.btnOutline}`}
                  onClick={() => navigate(`/profile/${profile.id}/due-diligence`)}
                >
                  Cancel
                </button>
                <button className={`${styles.btn} ${styles.btnOutline}`}>Save</button>
              </div>
            </div>

            <p className={secStyles.requiredNote}>
              Items marked with <span className={secStyles.requiredStar}>*</span> are required.
            </p>

            {/* Intro paragraph */}
            <div style={{
              margin: '16px 0',
              padding: '14px 16px',
              border: '1px solid var(--neutral-50)',
              borderRadius: 'var(--rctp-radius-sm)',
              fontSize: 13,
              lineHeight: 1.6,
              color: 'var(--text-normal)',
            }}>
              The Risk Assessment stage is now complete and it has been decided that additional due diligence is to be carried out internally. All information gathered relating to the Third Party can be reviewed within the Properties Section. Complete a full review of all the information gathered and complete the due diligence steps required by your internal policies and procedures. Ensure that you provide details of all due diligence activities completed and all supporting information is uploaded as required.
            </div>

            {/* Q1 — Due diligence steps */}
            <div style={{
              padding: '16px',
              border: '1px solid var(--neutral-50)',
              borderRadius: 'var(--rctp-radius-sm)',
              marginBottom: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-normal)' }}>
                1. <span style={{ color: 'red' }}>*</span> Provide details of the due diligence steps completed.
              </label>
              <textarea
                className={styles.declineTextarea}
                value={details}
                onChange={e => setDetails(e.target.value)}
                style={{ minHeight: 120 }}
              />
            </div>

            {/* Q2 — File upload */}
            <div style={{
              padding: '16px',
              border: '1px solid var(--neutral-50)',
              borderRadius: 'var(--rctp-radius-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-normal)' }}>
                2. <span style={{ color: 'red' }}>*</span> Upload all supporting documentation gathered during the due diligence process.
              </label>
              <div className={styles.declineFileRow}>
                <span className={styles.declineFileLabel}>{fileName || 'Choose Files'}</span>
                <button className={styles.declineBrowseBtn} onClick={() => fileRef.current?.click()}>Browse</button>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept=".docx,.pdf,.jpeg,.jpg,.png"
                multiple
                style={{ display: 'none' }}
                onChange={e => setFileName(e.target.files?.[0]?.name || '')}
              />
              <p className={styles.declineFileHint}>
                Click the 'Choose Files' button to browse for a file and then click the 'Upload'. Uploaded files will appear below. Allowed file types include: <strong>.docx,.pdf,.jpeg,.jpg,.png</strong><br />
                Multiple uploads are permitted
              </p>
              <button className={styles.declineUploadBtn}>Upload</button>
            </div>

          </section>
        </main>
      </div>
    </PageLayout>
  );
}
