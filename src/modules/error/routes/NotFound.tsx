import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';
import { Button } from '@/components/primitives/Buttons';

export default function NotFound() {
    const navigate = useNavigate();

    return (

        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>404</h1>
                    <div className={styles.divider} />
                    <p className={styles.description}>
                        La página que estás buscando no existe o ha sido removida
                    </p>
                    <Button
                        variant="primary"
                        onClick={() => navigate('/')}
                        className={styles.button}
                    >
                        Volver al inicio
                    </Button>
                </div>
            </div>
        </div>
    );
}