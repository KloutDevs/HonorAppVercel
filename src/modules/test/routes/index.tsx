import { Link } from 'react-router-dom';
import styles from '@/modules/test/styles/TestIndex.module.css';

export default function TestIndex() {
  const testComponents = [
    { path: 'toast', label: 'Toast Notifications' },
    { path: 'buttons', label: 'Buttons' },
    { path: 'forms', label: 'Form Components' },
    { path: 'modals', label: 'Modal Windows' },
    { path: 'alert', label: 'Alert Modals' },
    { path: 'tables', label: 'Data Tables' },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Component Testing</h1>
      <div className={styles.grid}>
        {testComponents.map(({ path, label }) => (
          <Link key={path} to={`/test/components/${path}`} className={styles.card}>
            <h2>{label}</h2>
            <p>Test and preview {label.toLowerCase()} components</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
