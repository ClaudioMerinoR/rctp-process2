import Header from './Header';
import MainNav from './MainNav';
import Footer from './Footer';
import styles from './PageLayout.module.css';

export default function PageLayout({ children }) {
  return (
    <div className={styles.wrapper}>
      <Header />
      <MainNav />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
