import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Breadcrumb from '../components/layout/Breadcrumb';
import Button from '../components/ui/Button';
import styles from './RiskSearch.module.css';

const ENTITY_TYPES = ['Entity', 'Person', 'Unknown'];

const COUNTRIES = [
  'Any', 'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia',
  'Austria', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China', 'Colombia',
  'Czech Republic', 'Denmark', 'Egypt', 'Finland', 'France', 'Germany',
  'Greece', 'Hong Kong', 'Hungary', 'India', 'Indonesia', 'Iran', 'Iraq',
  'Ireland', 'Israel', 'Italy', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya',
  'Kuwait', 'Malaysia', 'Mexico', 'Morocco', 'Netherlands', 'New Zealand',
  'Nigeria', 'Norway', 'Pakistan', 'Peru', 'Philippines', 'Poland',
  'Portugal', 'Qatar', 'Romania', 'Russia', 'Saudi Arabia', 'Singapore',
  'South Africa', 'South Korea', 'Spain', 'Sweden', 'Switzerland',
  'Taiwan', 'Thailand', 'Turkey', 'Ukraine', 'United Arab Emirates',
  'United Kingdom', 'United States', 'Venezuela', 'Vietnam',
];

export default function RiskSearch() {
  const [entityType, setEntityType] = useState('Unknown');
  const [searchName, setSearchName] = useState('');
  const [country, setCountry] = useState('Any');
  const [hasSearched, setHasSearched] = useState(false);

  function handleSearch() {
    setHasSearched(true);
  }

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: 'Risk Search' }]} />

      {/* Search bar card */}
      <div className={styles.card}>
        <div className={styles.cardTitleRow}>
          <h1 className={styles.title}>Risk Search</h1>
          <button className={styles.categoryKeyBtn}>
            CATEGORY KEY
            <span className="material-icons-outlined" style={{ fontSize: 16 }}>help</span>
          </button>
        </div>

        <div className={styles.searchRow}>
          {/* Searching For toggle */}
          <div className={styles.searchGroup}>
            <span className={styles.fieldLabel}>Searching For:</span>
            <div className={styles.toggleGroup}>
              {ENTITY_TYPES.map(t => (
                <button
                  key={t}
                  className={`${styles.toggleBtn} ${entityType === t ? styles.toggleBtnActive : ''}`}
                  onClick={() => setEntityType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Search Name */}
          <div className={`${styles.searchGroup} ${styles.searchGroupName}`}>
            <span className={styles.fieldLabel}>Search Name</span>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search For Entity or Person"
              value={searchName}
              onChange={e => setSearchName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
          </div>

          {/* Country/Territory */}
          <div className={styles.searchGroup}>
            <span className={styles.fieldLabel}>Country/Territory</span>
            <select
              className={styles.countrySelect}
              value={country}
              onChange={e => setCountry(e.target.value)}
            >
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Search button */}
          <Button
            variant="filled"
            style={{ alignSelf: 'flex-end', height: 40 }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>

      {/* Results card */}
      <div className={`${styles.card} ${styles.resultsCard}`}>
        <div className={styles.resultsAccent} />
        <div className={styles.resultsBody}>
          <p className={styles.emptyMsg}>Use the menu on the top to begin your search</p>
        </div>
      </div>
    </PageLayout>
  );
}
