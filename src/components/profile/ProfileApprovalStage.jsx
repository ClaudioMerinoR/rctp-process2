import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { Sidebar } from './ProfilePage';
import ProfilePageHeader from './ProfilePageHeader';
import { patchInitechProfile, getWaystarFlow, setWaystarFlow } from '../../utils/initechFlow';
import styles from './profile.module.css';
import s from './ProfileApprovalStage.module.css';

export default function ProfileApprovalStage() {
  const { profileId, stageNum } = useParams();
  const navigate = useNavigate();
  const rawProfile = profiles[profileId];

  const [details, setDetails] = useState('');
  const [fileName, setFileName] = useState('');
  const fileRef = useRef(null);

  if (!rawProfile) return null;

  const profile = patchInitechProfile(rawProfile);
  const isWaystar = profileId === 'waystar';
  const stage = parseInt(stageNum, 10) || 1;
  const waystarState = isWaystar ? getWaystarFlow() : {};
  const riskMitigationDone = waystarState.riskMitigationDone || false;
  const stage1Done = waystarState.approval1Done || false;
  const stage2Done = waystarState.approval2Done || false;
  const isReady = isWaystar ? riskMitigationDone : false;
  const currentStageDone = stage === 1 ? stage1Done : stage2Done;

  const approvalSubSteps = profile.sidebarSteps?.find(s => s.label === 'Approval')?.subSteps || [];
  const totalSteps = approvalSubSteps.length || 2;
  const completedSteps = (stage1Done ? 1 : 0) + (stage2Done ? 1 : 0);
  const progressPct = totalSteps ? Math.round((completedSteps / totalSteps) * 100) : 0;

  function handleApproved() {
    if (!isReady) return;
    if (isWaystar) {
      if (stage === 1) {
        setWaystarFlow({ approval1Done: true, screeningDone: true });
        navigate(`/profile/${profileId}/approval/2`);
      } else {
        setWaystarFlow({ approval2Done: true });
        navigate(`/profile/${profileId}`);
      }
    }
  }

  function handleNotApproved() {
    navigate(`/profile/${profileId}`);
  }

  const stageLabel = approvalSubSteps[stage - 1]?.label || `Approval Stage ${stage}`;

  return (
    <PageLayout>
      <Breadcrumb items={[
        { label: 'Third Parties', to: '/third-parties' },
        { label: rawProfile.shortName, to: `/profile/${profileId}` },
        { label: 'Approval', to: `/profile/${profileId}/approval` },
        { label: stageLabel },
      ]} />

      <ProfilePageHeader profile={rawProfile} />

      <div className={styles.pageBody}>
        <Sidebar profile={rawProfile} />

        <main className={styles.mainContent}>
          <motion.div
            className={s.card}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Sticky header */}
            <div className={s.header}>
              <div className={s.headerTop}>
                <div className={s.headerTitleCol}>
                  <h2 className={s.title}>{stageLabel}</h2>
                  <p className={s.subtitle}>Items marked with a <span style={{ color: 'var(--alert-500)' }}>*</span> are required</p>
                </div>
              </div>

              {/* Action bar */}
              <div className={s.actionBar}>
                <div className={s.actionLeft}>
                  <button
                    className={`${styles.btn} ${styles.btnFilled}`}
                    onClick={handleApproved}
                    disabled={!isReady || currentStageDone}
                  >
                    Approved
                  </button>
                  <button
                    className={`${styles.btn} ${styles.btnOutline}`}
                    style={{ color: 'var(--alert-500)', borderColor: 'var(--alert-500)' }}
                    onClick={handleNotApproved}
                    disabled={!isReady || currentStageDone}
                  >
                    Not Approved
                  </button>
                </div>
                <div className={s.actionRight}>
                  <button className={`${styles.btn} ${styles.btnOutline}`}>Notes</button>
                  <button className={`${styles.btn} ${styles.btnOutline}`}>Reassign</button>
                  <button className={`${styles.btn} ${styles.btnOutline}`}>Properties</button>
                  <button className={`${styles.btn} ${styles.btnOutline}`} onClick={() => navigate(`/profile/${profileId}/approval`)}>Cancel</button>
                  <button className={`${styles.btn} ${styles.btnOutline}`}>Save</button>
                </div>
              </div>

              {/* Step tabs */}
              <div className={s.stepTabs}>
                {Array.from({ length: totalSteps }, (_, i) => {
                  const n = i + 1;
                  const isDone = n === 1 ? stage1Done : stage2Done;
                  const isActive = n === stage;
                  const tabLabel = approvalSubSteps[i]?.label || `Approval Stage ${n}`;
                  return (
                    <button
                      key={n}
                      className={`${s.stepTab} ${isActive ? s.stepTabActive : ''}`}
                      onClick={() => navigate(`/profile/${profileId}/approval/${n}`)}
                    >
                      <span className={`${s.stepPill} ${isDone ? s.stepPillDone : ''}`}>
                        {isDone
                          ? <span className="material-icons-outlined" style={{ fontSize: 13 }}>check</span>
                          : n}
                      </span>
                      {tabLabel}
                    </button>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className={s.progressBar}>
                <div className={s.progressBarFill} style={{ width: `${progressPct}%` }} />
              </div>
            </div>

            {/* Form body */}
            {!isReady ? (
              <div className={s.notReadyBanner}>
                This approval stage will become available once all required workflow stages are completed.
              </div>
            ) : (
              <div className={s.formBody}>
                {/* Section 1 — textarea */}
                <div className={s.section}>
                  <div className={s.sectionLabel}>
                    <span className={s.sectionNum}>1.</span>
                    <span>
                      If you have any information to support your decision on this action please enter in the text box provided.
                      <span className={s.required}> *</span>
                    </span>
                  </div>
                  <textarea
                    className={s.textarea}
                    value={details}
                    onChange={e => setDetails(e.target.value)}
                    placeholder="Enter supporting information…"
                    disabled={currentStageDone}
                  />
                </div>

                {/* Section 2 — file upload */}
                <div className={s.section}>
                  <div className={s.sectionLabel}>
                    <span className={s.sectionNum}>2.</span>
                    <span>If you have any supporting documentation to support your decision on this action please upload.</span>
                  </div>

                  <div className={s.fileRow}>
                    <span className={s.fileLabel}>{fileName || 'Choose Files'}</span>
                    <button className={s.browseBtn} onClick={() => fileRef.current?.click()} disabled={currentStageDone}>
                      Browse
                    </button>
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".txt,.rtf,.odt,.docx,.doc,.pdf,.wpd,.wps,.jpeg,.jpg,.gif,.png,.bmp,.psd,.ai,.xlr,.xls,.xlsx,.ppt,.pptx,.zip"
                    multiple
                    style={{ display: 'none' }}
                    onChange={e => setFileName(e.target.files?.[0]?.name || '')}
                  />
                  <p className={s.fileHint}>
                    Click the 'Choose Files' button to browse for a file and then click the 'Upload'. Uploaded files will appear below.
                    Allowed file types include: <strong>.txt,.rtf,.odt,.docx,.doc,.pdf,.wpd,.wps,.jpeg,.jpg,.gif,.png,.bmp,.psd,.ai,.xlr,.xls,.xlsx,.ppt,.pptx,.zip</strong>
                    <br />Multiple uploads are permitted
                  </p>
                  <button className={s.uploadBtn} disabled={currentStageDone}>Upload</button>
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </PageLayout>
  );
}
