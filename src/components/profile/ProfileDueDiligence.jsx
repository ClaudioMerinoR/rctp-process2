import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { patchInitechProfile, getExternalDDFlow, setExternalDDFlow } from '../../utils/initechFlow';
import { Sidebar } from './ProfilePage';
import ProfilePageHeader from './ProfilePageHeader';
import styles from './profile.module.css';
import secStyles from './ProfileProcessSection.module.css';

const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Italian', 'Chinese', 'Japanese'];

function ExternalDDModal({ onClose, onSend }) {
  const [form, setForm] = useState({ firstName: '', surname: '', email: '', language: '' });
  const [errors, setErrors] = useState({});

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: false }));
  }

  function handleSend() {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = true;
    if (!form.surname.trim()) errs.surname = true;
    if (!form.email.trim()) errs.email = true;
    if (!form.language) errs.language = true;
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSend();
  }

  return (
    <motion.div
      className={styles.deleteModalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={onClose}
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
          <button className={styles.deleteModalClose} aria-label="Close" onClick={onClose} />
        </div>

        <div className={styles.deleteModalBody}>
          <div className={`${styles.modalFormField} ${errors.firstName ? styles.modalFormFieldError : ''}`}>
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
          <button className={`${styles.deleteModalBtn} ${styles.deleteModalCancel}`} onClick={onClose}>Close</button>
          <button className={`${styles.deleteModalBtn} ${styles.btnFilled}`} onClick={handleSend}>Send Invite</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProfileDueDiligence() {
  const { profileId } = useParams();
  const rawProfile = profiles[profileId];
  if (!rawProfile) return null;
  const profile = patchInitechProfile(rawProfile);

  const dd = profile.dueDiligence || {};
  const sidebarStep = (profile.sidebarSteps || []).find(s => s.label === 'Due Diligence');
  const baseRows = dd.rows || (
    sidebarStep?.subSteps?.length
      ? sidebarStep.subSteps.map(sub => ({ name: sub.label, required: true, owner: '', startDate: '', completedDate: '', cancelledDate: '', renewalDate: '' }))
      : [
          { name: 'Internal Due Diligence', required: true, owner: '', startDate: '', completedDate: '', cancelledDate: '', renewalDate: '' },
          { name: 'External Due Diligence', required: true, owner: '', startDate: '', completedDate: '', cancelledDate: '', renewalDate: '' },
        ]
  );

  const [tick, setTick] = useState(0);
  const externalSent = getExternalDDFlow(profileId).sent;
  const rows = baseRows.map(r =>
    r.name === 'External Due Diligence' && externalSent ? { ...r, status: 'In Progress' } : r
  );
  const [modalOpen, setModalOpen] = useState(false);

  function handleSendInvite() {
    setExternalDDFlow(profileId, { sent: true });
    setTick(t => t + 1);
    setModalOpen(false);
  }

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
          <section className={secStyles.card}>
            <div className={secStyles.cardHeader}>
              <h2 className={styles.cardTitle}>Due Diligence</h2>
            </div>

            <p className={secStyles.requiredNote}>
              Items marked with <span className={secStyles.requiredStar}>*</span> are required.
            </p>

            <div className={secStyles.tableWrap}>
              <table className={styles.table} style={{ minWidth: 0 }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Owner</th>
                    <th>Start Date</th>
                    <th>Completed Date</th>
                    <th>Cancelled Date</th>
                    <th>Renewal Date</th>
                    <th>Status</th>
                    <th style={{ width: 48 }} />
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i}>
                      <td>
                        {row.name}
                        {row.required && <span className={secStyles.requiredStar}> *</span>}
                      </td>
                      <td>{row.owner || ''}</td>
                      <td>{row.startDate || ''}</td>
                      <td>{row.completedDate || ''}</td>
                      <td>{row.cancelledDate || ''}</td>
                      <td>{row.renewalDate || ''}</td>
                      <td>{row.status || ''}</td>
                      <td style={{ textAlign: 'center' }}>
                        {row.name === 'External Due Diligence' && row.status !== 'In Progress' ? (
                          <button
                            className={secStyles.playBtn}
                            title="Send invite"
                            onClick={() => setModalOpen(true)}
                          >
                            <span className="material-icons-outlined" style={{ fontSize: 18 }}>send</span>
                          </button>
                        ) : row.name !== 'External Due Diligence' ? (
                          <button className={secStyles.playBtn} title="Start">
                            <span className="material-icons-outlined" style={{ fontSize: 18 }}>play_arrow</span>
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <ExternalDDModal
            key="external-dd-modal"
            onClose={() => setModalOpen(false)}
            onSend={handleSendInvite}
          />
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
