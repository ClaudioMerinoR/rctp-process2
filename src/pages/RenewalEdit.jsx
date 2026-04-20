import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Breadcrumb from '../components/layout/Breadcrumb';
import styles from './RenewalEdit.module.css';

const RENEWAL_PERIOD_UNITS = ['Day(s)', 'Week(s)', 'Month(s)', 'Year(s)'];

const RULE_CONDITIONS = ['Yes', 'No', 'Any'];
const RULE_OPTIONS = ['', 'Low Risk', 'Medium Risk', 'High Risk', 'Approved', 'Pending'];

const INITIAL_RULES = [
  { condition: 'Yes', value: '' },
  { condition: 'Yes', value: '' },
  { condition: 'Yes', value: '' },
  { condition: 'Yes', value: '' },
  { condition: 'Yes', value: '' },
  { condition: 'Yes', value: '' },
  { condition: 'Any', value: '' },
];

const INITIAL_LEVELS = [
  { expirations: true,  active: true,  period: '8',  unit: 'Year(s)' },
  { expirations: true,  active: false, period: '5',  unit: 'Year(s)' },
  { expirations: true,  active: false, period: '3',  unit: 'Year(s)' },
  { expirations: false, active: false, period: '2',  unit: 'Year(s)' },
  { expirations: false, active: false, period: '1',  unit: 'Year(s)' },
  { expirations: false, active: false, period: '6',  unit: 'Month(s)' },
  { expirations: true,  active: false, period: '',   unit: 'Year(s)' },
];

export default function RenewalEdit() {
  const { version } = useParams();
  const navigate = useNavigate();

  // Rules
  const [rules, setRules] = useState(INITIAL_RULES);

  // Expiry Levels
  const [levels, setLevels] = useState(INITIAL_LEVELS);
  const [selectedLevel, setSelectedLevel] = useState(0);

  function updateRule(i, key, val) {
    setRules(prev => prev.map((r, idx) => idx === i ? { ...r, [key]: val } : r));
  }

  function updateLevel(i, key, val) {
    setLevels(prev => prev.map((l, idx) => idx === i ? { ...l, [key]: val } : l));
  }

  const currentLevel = levels[selectedLevel];

  return (
    <PageLayout>
      <Breadcrumb
        items={[
          { label: 'Settings', to: '/settings' },
          { label: 'General – Renewals' },
        ]}
      />

      {/* ── Renewals card ── */}
      <div className={styles.card} style={{ marginTop: 8 }}>
        <div className={styles.expirationsHeader}>
          <div className={styles.expirationsTitle}>
            <h2 className={styles.cardTitle}>Renewals</h2>
            <span className={styles.versionMeta}>— Version {version || 47}, Last Updated 11 Feb 2025, by Claudio Merino</span>
          </div>
          <div className={styles.expirationsActions}>
            <button className={styles.btnOutline} onClick={() => navigate('/settings')}>Back</button>
            <button className={styles.btnFilled}>Save</button>
            <button className={styles.btnFilled}>Publish</button>
          </div>
        </div>
      </div>

      {/* ── Three-panel grid ── */}
      <div className={styles.panels}>

        {/* Rules panel */}
        <div className={styles.panelCard}>
          <h3 className={styles.panelTitle}>Rules</h3>
          <div className={styles.rulesTable}>
            <div className={styles.rulesTableHeader}>
              <div className={styles.rulesDragCol} />
              <div className={styles.rulesColHead}>After Risk Assessment</div>
              <div className={styles.rulesColHead}>Current Risk Level</div>
            </div>
            {rules.map((rule, i) => (
              <div
                key={i}
                className={`${styles.ruleRow}${selectedLevel === i ? ' ' + styles.ruleRowSelected : ''}`}
                onClick={() => setSelectedLevel(i)}
              >
                <div className={styles.rulesDragCol}>
                  <span className="material-icons-outlined" style={{ fontSize: 16, color: 'var(--neutral-400)' }}>drag_indicator</span>
                </div>
                <div className={styles.ruleCell}>
                  <div className={styles.conditionPill}>
                    <span className={styles.conditionTag}>{rule.condition}</span>
                    <select
                      className={styles.ruleSelect}
                      value={rule.value}
                      onChange={e => updateRule(i, 'value', e.target.value)}
                      onClick={e => e.stopPropagation()}
                    >
                      {RULE_OPTIONS.map(o => <option key={o} value={o}>{o || 'Choose'}</option>)}
                    </select>
                  </div>
                </div>
                <div className={styles.ruleCell}>
                  <div className={styles.conditionPill}>
                    <span className={styles.conditionTag}>Any</span>
                    <select
                      className={styles.ruleSelect}
                      value=""
                      onChange={() => {}}
                      onClick={e => e.stopPropagation()}
                    >
                      {RULE_OPTIONS.map(o => <option key={o} value={o}>{o || 'Choose'}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Renewal Levels panel */}
        <div className={styles.panelCardNarrow}>
          <div className={styles.levelsTh}>Renewal</div>
          {levels.map((level, i) => (
            <div
              key={i}
              className={`${styles.levelRow}${selectedLevel === i ? ' ' + styles.levelRowSelected : ''}`}
              onClick={() => setSelectedLevel(i)}
            >
              <span
                className={`material-icons-outlined ${level.expirations ? styles.checkOn : styles.checkOff}`}
                onClick={e => { e.stopPropagation(); updateLevel(i, 'expirations', !level.expirations); }}
              >
                {level.expirations ? 'check_box' : 'indeterminate_check_box'}
              </span>
            </div>
          ))}
        </div>

        {/* Detail for Levels panel */}
        <div className={styles.panelCard}>
          <div className={styles.detailHeader}>
            <h3 className={styles.panelTitle}>Detail for Levels</h3>
            <div
              className={`${styles.activeToggle}${!currentLevel?.active ? ' ' + styles.activeToggleOff : ''}`}
              onClick={() => updateLevel(selectedLevel, 'active', !currentLevel.active)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && updateLevel(selectedLevel, 'active', !currentLevel.active)}
            >
              <div className={styles.activeToggleTrack}>{currentLevel?.active ? 'Active' : 'Inactive'}</div>
              <div className={styles.activeToggleThumb} />
            </div>
          </div>

          {currentLevel && (
            <div className={styles.detailForm}>
              <label className={styles.fieldLabel}>
                Renewal Period <span className={styles.req}>*</span>
                <span className={`material-icons-outlined ${styles.infoIcon}`}>info</span>
              </label>
              <div className={styles.inputPair}>
                <input
                  className={styles.input}
                  type="number"
                  value={currentLevel.period}
                  onChange={e => updateLevel(selectedLevel, 'period', e.target.value)}
                />
                <select
                  className={styles.select}
                  value={currentLevel.unit}
                  onChange={e => updateLevel(selectedLevel, 'unit', e.target.value)}
                >
                  {RENEWAL_PERIOD_UNITS.map(u => <option key={u}>{u}</option>)}
                </select>
              </div>
            </div>
          )}
        </div>

      </div>
    </PageLayout>
  );
}
