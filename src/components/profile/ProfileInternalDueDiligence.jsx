import { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { patchInitechProfile } from '../../utils/initechFlow';
import styles from './profile.module.css';
import s from './ProfileInternalDueDiligence.module.css';

export default function ProfileInternalDueDiligence() {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const profile = patchInitechProfile(profiles[profileId]);
  if (!profile) return null;

  const [details, setDetails] = useState('');
  const [fileName, setFileName] = useState('');
  const fileRef = useRef(null);

  const ddPath = `/profile/${profile.id}/due-diligence`;

  return (
    <PageLayout>
      <Breadcrumb items={[
        { label: 'Third Parties', to: '/third-parties' },
        { label: profile.shortName, to: `/profile/${profile.id}` },
        { label: 'Due Diligence', to: ddPath },
        { label: 'DD Internal' },
      ]} />

      <div className={s.pageWrap}>
        <motion.div
          className={s.card}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
        >
          <div className={s.header}>
            <div className={s.headerTop}>
              <div>
                <h2 className={s.title}>DD Internal</h2>
                <p className={s.subtitle}>
                  Items marked with <span className={s.star}>*</span> are required
                </p>
              </div>
            </div>
            <div className={s.headerActions}>
              <div className={s.stepGroup}>
                <span className={s.stepBadge}>1</span>
              </div>
              <div className={s.actionGroup}>
                <button className={`${styles.btn} ${styles.btnFilled}`}>Submit</button>
                <button className={`${styles.btn} ${styles.btnOutline}`}>Notes</button>
                <button className={`${styles.btn} ${styles.btnOutline}`}>Reassign</button>
                <button className={`${styles.btn} ${styles.btnOutline}`}>Properties</button>
                <button
                  className={`${styles.btn} ${styles.btnOutline}`}
                  onClick={() => navigate(ddPath)}
                >
                  Cancel
                </button>
                <button className={`${styles.btn} ${styles.btnOutline}`}>Save</button>
              </div>
            </div>
          </div>

          <div className={s.body}>
            <div className={s.intro}>
              The Risk Assessment stage is now complete and it has been decided that additional due diligence is to be carried out internally. All information gathered relating to the Third Party can be reviewed within the Properties Section. Complete a full review of all the information gathered and complete the due diligence steps required by your internal policies and procedures. Ensure that you provide details of all due diligence activities completed and all supporting information is uploaded as required.
            </div>

            <div className={s.questionCard}>
              <label className={s.questionLabel}>
                <span className={s.questionNumber}>1.</span>
                <span className={s.star}>*</span>
                Provide details of the due diligence steps completed.
              </label>
              <textarea
                className={s.textarea}
                value={details}
                onChange={e => setDetails(e.target.value)}
              />
            </div>

            <div className={s.questionCard}>
              <label className={s.questionLabel}>
                <span className={s.questionNumber}>2.</span>
                <span className={s.star}>*</span>
                Upload all supporting documentation gathered during the due diligence process.
              </label>
              <div className={s.fileRow}>
                <span className={s.fileLabel}>{fileName || 'Choose Files'}</span>
                <button className={s.browseBtn} onClick={() => fileRef.current?.click()}>Browse</button>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept=".docx,.pdf,.jpeg,.jpg,.png"
                multiple
                style={{ display: 'none' }}
                onChange={e => setFileName(e.target.files?.[0]?.name || '')}
              />
              <p className={s.fileHint}>
                Click the 'Choose Files' button to browse for a file and then click the 'Upload'. Uploaded files will appear below. Allowed file types include: <strong>.docx,.pdf,.jpeg,.jpg,.png</strong><br />
                Multiple uploads are permitted
              </p>
              <button className={s.uploadBtn}>Upload</button>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
