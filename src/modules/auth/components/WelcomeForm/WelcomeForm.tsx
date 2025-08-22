import { useNavigate } from 'react-router-dom';
import LogoWhite from '@/assets/logo-white.svg';
import styles from './WelcomeForm.module.css';

export function WelcomeForm() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/auth/register');
  };

  const handleLogin = () => {
    navigate('/auth/login');
  };

  return (
    <div className={styles.container}>
      {/* Contenido central */}
      <div className={styles.content}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <img src={LogoWhite} alt="HONOR TRADING" className={styles.logo} />
        </div>

        {/* Botones */}
        <div className={styles.buttonContainer}>
          <button
            onClick={handleRegister}
            className={`${styles.button} ${styles.registerButton}`}
          >
            REGISTRARSE
          </button>
          <button
            onClick={handleLogin}
            className={`${styles.button} ${styles.loginButton}`}
          >
            INICIAR SESION
          </button>
        </div>
      </div>
    </div>
  );
}
