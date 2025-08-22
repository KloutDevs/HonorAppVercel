import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import styles from './Layout.module.css';
import LayeredBackground from '../LayeredBackground/LayeredBackground';

export default function Layout() {
  return (
    <LayeredBackground>
      <div className={styles.layoutContainer}>
        {/* Main container */}
        <div className={styles.mainContainer}>
          {/* Header */}
          <Header />

          {/* Main content */}
          <main className={styles.mainContent}>
            <div className={styles.contentWrapper}>
              <div className={styles.contentContainer}>
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </LayeredBackground>
  );
}
