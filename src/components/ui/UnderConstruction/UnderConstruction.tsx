import { Button } from '@/components/primitives/Buttons';
import { useNavigate } from 'react-router-dom';
import styles from './UnderConstruction.module.css';

interface UnderConstructionProps {
    title?: string;
    description?: string;
    showBackButton?: boolean;
    backButtonPath?: string;
    buttonText?: string;
}

export default function UnderConstruction({
    title = 'En construcción',
    description = 'Esta vista está en construcción, pronto estará disponible',
    showBackButton = true,
    backButtonPath = '/staff/ranks',
    buttonText = 'Ir al siguiente módulo'
}: UnderConstructionProps) {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.iconContainer}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.icon}
                    >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                </div>

                <h1 className={styles.title}>{title}</h1>
                <div className={styles.divider} />
                <p className={styles.description}>{description}</p>

                {showBackButton && (
                    <Button
                        variant="outline"
                        onClick={() => navigate(backButtonPath)}
                        className={styles.button}
                    >
                        {buttonText}
                    </Button>
                )}
            </div>
        </div>
    );
}