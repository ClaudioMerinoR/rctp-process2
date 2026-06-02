import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { Sidebar } from './ProfilePage';
import ProfilePageHeader from './ProfilePageHeader';
import { patchInitechProfile, setExternalDDFlow } from '../../utils/initechFlow';
import styles from './profile.module.css';
import secStyles from './ProfileProcessSection.module.css';

const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Italian', 'Chinese', 'Japanese'];

export default function ProfileExternalDueDiligence() {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const rawProfile = profiles[profileId];
  if (!rawProfile) return null;
  const profile = patchInitechProfile(rawProfile);

  const [form, setFormState] = useState({ firstName: '', surname: '', email: '', language: '' });
  const [errors, setErrors] = useState({});

  function set(field, value) {
    setFormState(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: false }));
  }

  function handleSend() {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = true;
    if (!form.surname.trim()) errs.surname = true;
    if (!form.email.trim()) errs.email = true;
    if (!form.language) errs.language = true;
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setExternalDDFlow(profileId, { sent: true });
    navigate(`/profile/${profileId}/due-diligence`);
  }

  function handleClose() {
    navigate(`/profile/${profileId}/due-diligence`);
  }

  return (
    <PageLayout>
      <Breadcrumb items={[
        { label: 'Third Parties', to: '/third-parties' },
        { label: profile.shortName, to: `/profile/${profile.id}` },
        { label: 'Due Diligence', to: `/profile/${profile.id}/due-diligence` },
        { label: 'External DD' },
      ]} />

      <ProfilePageHeader profile={rawProfile} />

      <div className={styles.pageBody}>
        <Sidebar profile={profile} />

        <main className={styles.mainContent}>
          <section className={secStyles.card}>
            <div className={secStyles.cardHeader}>
              <h2 className={styles.cardTitle}>Due Diligence</h2>
            </div>
          </section>
        </main>
      </div>

      {/* Modal always open on this page */}
      <AnimatePresence>
        <motion.div
          key="ext-dd-overlay"
          className={styles.deleteModalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={handleClose}
        >
          <motion.div
            className={styles.deleteModal}
            style={{ width: 460 }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className={styles.deleteModalHeader}>
              <span className={styles.deleteModalTitle}>External Due Diligence — Send Invite</span>
              <button className={styles.deleteModalClose} aria-label="Close" onClick={handleClose} />
            </div>

            <div className={styles.deleteModalBody}>
              <div className={styles.modalFormField}>
                <label className={styles.modalFormLabel}>
                  First Name <span className={styles.modalFormRequired}>*</span>
                </label>
                <input
                  className={styles.modalFormInput}
                  style={errors.firstName ? { borderColor: 'var(--alert-500)' } : undefined}
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={e => set('firstName', e.target.value)}
                />
              </div>
              <div className={styles.modalFormField}>
                <label className={styles.modalFormLabel}>
                  Surname <span className={styles.modalFormRequired}>*</span>
                </label>
                <input
                  className={styles.modalFormInput}
                  style={errors.surname ? { borderColor: 'var(--alert-500)' } : undefined}
                  placeholder="Surname"
                  value={form.surname}
                  onChange={e => set('surname', e.target.value)}
                />
              </div>
              <div className={styles.modalFormField}>
                <label className={styles.modalFormLabel}>
                  Email <span className={styles.modalFormRequired}>*</span>
                </label>
                <input
                  className={styles.modalFormInput}
                  style={errors.email ? { borderColor: 'var(--alert-500)' } : undefined}
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                />
              </div>
              <div className={styles.modalFormField} style={{ marginBottom: 0 }}>
                <label className={styles.modalFormLabel}>
                  Language <span className={styles.modalFormRequired}>*</span>
                </label>
                <select
                  className={styles.modalFormSelect}
                  style={errors.language ? { borderColor: 'var(--alert-500)' } : undefined}
                  value={form.language}
                  onChange={e => set('language', e.target.value)}
                >
                  <option value="">Please select</option>
                  {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div className={styles.deleteModalActions}>
              <button className={`${styles.deleteModalBtn} ${styles.deleteModalCancel}`} onClick={handleClose}>Close</button>
              <button className={`${styles.deleteModalBtn} ${styles.btnFilled}`} onClick={handleSend}>Send Invite</button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </PageLayout>
  );
}
