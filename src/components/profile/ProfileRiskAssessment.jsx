import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';
import Breadcrumb from '../layout/Breadcrumb';
import { profiles } from '../../data/profiles';
import { Sidebar } from './ProfilePage';
import ProfilePageHeader from './ProfilePageHeader';
import styles from './profile.module.css';
import secStyles from './ProfileProcessSection.module.css';

export default function ProfileRiskAssessment() {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const profile = profiles[profileId];
  if (!profile) return null;

  const ra = profile.riskAssessment || {};
  const raStep = (profile.riskReport?.processSummary || []).find(s => s.step === 'Risk Assessment');
  const defaultOwner = profile.overviewFields?.find(f => f.label === 'Third Party Owner')?.value || '';
  const defaultStartDate = raStep?.startDate || '';
  const defaultCompletedDate = raStep?.status === 'Completed' ? (raStep.date || '') : '';
  const rows = ra.rows || [{ name: 'Risk Assessment', required: true, owner: defaultOwner, startDate: defaultStartDate, completedDate: defaultCompletedDate, cancelledDate: '' }];

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
              <h2 className={styles.cardTitle}>Risk Assessment</h2>
            </div>

            <p className={secStyles.requiredNote}>
              Items marked with <span className={secStyles.requiredStar}>*</span> are required.
            </p>

            <div className={secStyles.tableWrap}>
              <table className={styles.table} style={{ minWidth: 0 }}>
                <thead>
                  <tr>
                    <th style={{ width: '30%' }}>Name</th>
                    <th style={{ width: '20%' }}>Owner</th>
                    <th style={{ width: '13%' }}>Start Date</th>
                    <th style={{ width: '13%' }}>Completed Date</th>
                    <th style={{ width: '13%' }}>Cancelled Date</th>
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
                      <td style={{ textAlign: 'center' }}>
                        <button
                          className={secStyles.playBtn}
                          title="Start questionnaire"
                          onClick={() => navigate(`/profile/${profileId}/risk-assessment/questionnaire`)}
                        >
                          <span className="material-icons-outlined" style={{ fontSize: 18 }}>play_arrow</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </PageLayout>
  );
}
