import toast from 'react-hot-toast';
import CustomToast from '@/components/ui/Toast/Toast';
import styles from '@/modules/test/styles/Toast.module.css';
import { Header } from '@/modules/test/components/Header/Header';

const TestToast = () => {
  const showSuccess = () => {
    toast.custom((t) => (
      <CustomToast t={t} type="success" message="¡Operación exitosa!" onClose={() => toast.dismiss(t.id)} />
    ));
  };

  const showError = () => {
    toast.custom((t) => (
      <CustomToast t={t} type="error" message="Ha ocurrido un error" onClose={() => toast.dismiss(t.id)} />
    ));
  };

  const showInfo = () => {
    toast.custom((t) => (
      <CustomToast t={t} type="info" message="Información importante" onClose={() => toast.dismiss(t.id)} />
    ));
  };

  const showWarning = () => {
    toast.custom((t) => (
      <CustomToast t={t} type="warning" message="¡Advertencia!" onClose={() => toast.dismiss(t.id)} />
    ));
  };

  const dismissAll = () => {
    toast.dismiss(); // Esto cerrará todos los toasts activos
  };

  const showPromise = () => {
    const id = toast.custom((t) => (
      <CustomToast t={t} type="info" message="Operación en proceso..." onClose={() => toast.dismiss(t.id)} />
    ));

    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) resolve('¡Éxito!');
        else reject('Error en la operación');
      }, 2000);
    })
      .then(() => {
        toast.custom(
          (t) => (
            <CustomToast t={t} type="success" message="¡Operación completada! 👌" onClose={() => toast.dismiss(t.id)} />
          ),
          { id }
        );
      })
      .catch(() => {
        toast.custom(
          (t) => <CustomToast t={t} type="error" message="Error al procesar 🤯" onClose={() => toast.dismiss(t.id)} />,
          { id }
        );
      });
  };

  const showTransactionToast = () => {
    const id = toast.custom((t) => (
      <CustomToast
        t={t}
        type="info"
        message="Transacción enviada. Esperando confirmación..."
        onClose={() => toast.dismiss(t.id)}
      />
    ));

    setTimeout(() => {
      if (Math.random() > 0.5) {
        toast.custom(
          (t) => (
            <CustomToast t={t} type="success" message="¡Transacción confirmada!" onClose={() => toast.dismiss(t.id)} />
          ),
          { id }
        );
      } else {
        toast.custom(
          (t) => (
            <CustomToast
              t={t}
              type="error"
              message="Transacción fallida. Inténtalo de nuevo."
              onClose={() => toast.dismiss(t.id)}
            />
          ),
          { id }
        );
      }
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <Header title="Test Toast" />
      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Basic Toasts</h2>
          <div className={styles.grid}>
            <button className={`${styles.button} ${styles.success}`} onClick={showSuccess}>
              Success Toast
            </button>
            <button className={`${styles.button} ${styles.error}`} onClick={showError}>
              Error Toast
            </button>
            <button className={`${styles.button} ${styles.info}`} onClick={showInfo}>
              Info Toast
            </button>
            <button className={`${styles.button} ${styles.warning}`} onClick={showWarning}>
              Warning Toast
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Advanced Toasts</h2>
          <div className={styles.grid}>
            <button className={`${styles.button} ${styles.promise}`} onClick={showPromise}>
              Promise Toast
            </button>
            <button className={`${styles.button} ${styles.transaction}`} onClick={showTransactionToast}>
              Transaction Toast
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Actions</h2>
          <div className={styles.grid}>
            <button className={`${styles.button} ${styles.dismiss}`} onClick={dismissAll}>
              Dismiss All Toasts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestToast;
