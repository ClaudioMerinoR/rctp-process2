import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { patchInitechProfile } from '../../utils/initechFlow';
import styles from './profile.module.css';
import raStyles from './ProfileRiskAssessment.module.css';

const DEFAULT_SECTIONS = [
  { id: 'legal-structure',      label: 'Legal Structure',       status: 'pending' },
  { id: 'entity',               label: 'Entity',                status: 'done' },
  { id: 'person',               label: 'Person',                status: 'pending' },
  { id: 'unknown',              label: 'Unknown',               status: 'done' },
  { id: 'contract-information', label: 'Contract Information',  status: 'pending' },
  { id: 'remuneration',         label: 'Remuneration',          status: 'pending' },
  { id: 'declarations',         label: 'Declarations',          status: 'pending' },
];

export default function ProfileRiskAssessmentQuestionnaire() {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const profile = patchInitechProfile(profiles[profileId]);
  if (!profile) return null;

  const raSections = profile.riskAssessment?.sections || DEFAULT_SECTIONS;
  const [sections, setSections] = useState(raSections);

  function toggleSection(id) {
    setSections(prev => prev.map(s =>
      s.id === id ? { ...s, status: s.status === 'done' ? 'pending' : 'done' } : s
    ));
  }

  return (
    <PageLayout>
      <Breadcrumb items={[
        { label: 'Third Parties', to: '/third-parties' },
        { label: profile.shortName, to: `/profile/${profile.id}` },
        { label: 'Risk Assessment', to: `/profile/${profile.id}/risk-assessment` },
        { label: 'Questionnaire' },
      ]} />

      <div className={raStyles.raPageWrap}>
        <motion.div
          className={raStyles.raCard}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
        >
          {/* Sticky header */}
          <div className={raStyles.raHeader}>
            <div className={raStyles.raHeaderTop}>
              <div>
                <h2 className={raStyles.raTitle}>Risk Assessment</h2>
                <p className={raStyles.raSubtitle}>Items marked with <span className={raStyles.raStar}>*</span> are required</p>
              </div>
            </div>
            <div className={raStyles.raHeaderActions}>
              <div className={raStyles.raNavGroup}>
                <button
                  className={`${styles.btn} ${styles.btnOutline}`}
                  onClick={() => navigate(`/profile/${profile.id}/risk-assessment`)}
                >
                  <span className="material-icons-outlined" style={{ fontSize: 16, marginRight: 4 }}>chevron_left</span>
                  Previous
                </button>
                <button className={`${styles.btn} ${styles.btnFilled}`}>
                  Next
                  <span className="material-icons-outlined" style={{ fontSize: 16, marginLeft: 4 }}>chevron_right</span>
                </button>
              </div>
              <div className={raStyles.raActionGroup}>
                <button className={`${styles.btn} ${styles.btnOutline}`}>Notes</button>
                <button className={`${styles.btn} ${styles.btnOutline}`}>Reassign</button>
                <button className={`${styles.btn} ${styles.btnOutline}`}>Properties</button>
                <button
                  className={`${styles.btn} ${styles.btnOutline}`}
                  onClick={() => navigate(`/profile/${profile.id}/risk-assessment`)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Instruction banner */}
          <div className={raStyles.raBanner}>
            <span className="material-icons-outlined" style={{ fontSize: 18, color: 'var(--primary-500)', flexShrink: 0 }}>info</span>
            Please complete the following sections.
          </div>

          {/* Section cards grid */}
          <div className={raStyles.raSectionGrid}>
            {sections.map(sec => (
              <button
                key={sec.id}
                className={`${raStyles.raSectionCard} ${sec.status === 'done' ? raStyles.raSectionCardDone : ''}`}
                onClick={() => toggleSection(sec.id)}
              >
                <span className={`${raStyles.raSectionLabel} ${sec.status === 'done' ? raStyles.raSectionLabelDone : ''}`}>
                  {sec.label}
                </span>
                <span className={`${raStyles.raSectionIcon} ${sec.status === 'done' ? raStyles.raSectionIconDone : ''}`}>
                  <span className="material-icons-outlined">
                    {sec.status === 'done' ? 'cancel' : 'play_circle'}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
