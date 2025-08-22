import { Button } from '@/components/primitives/Buttons';
import styles from './WelcomeCard.module.css';
import ReclutaIcon from '@/assets/ranks/recluta.png';

const BackgroundShape = () => (
    <svg className={styles.backgroundShape} xmlns="http://www.w3.org/2000/svg" width="450" height="430" viewBox="0 0 450 430" fill="none">
        <mask id="path-1-inside-1_14049_29" fill="white">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M450 32C450 14.3269 435.673 0 418 0H32C14.3269 0 0 14.3269 0 32V398C0 415.673 14.3269 430 32 430H140.759C158.432 430 172.759 415.673 172.759 398V382C172.759 364.327 187.086 350 204.759 350H418C435.673 350 450 335.673 450 318V32Z" />
        </mask>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M450 32C450 14.3269 435.673 0 418 0H32C14.3269 0 0 14.3269 0 32V398C0 415.673 14.3269 430 32 430H140.759C158.432 430 172.759 415.673 172.759 398V382C172.759 364.327 187.086 350 204.759 350H418C435.673 350 450 335.673 450 318V32Z" fill="#BEDD7D" fill-opacity="0.2" />
        <path d="M32 1H418V-1H32V1ZM1 398V32H-1V398H1ZM140.759 429H32V431H140.759V429ZM173.759 398V382H171.759V398H173.759ZM204.759 351H418V349H204.759V351ZM449 32V318H451V32H449ZM418 351C436.225 351 451 336.225 451 318H449C449 335.121 435.121 349 418 349V351ZM173.759 382C173.759 364.879 187.638 351 204.759 351V349C186.533 349 171.759 363.775 171.759 382H173.759ZM140.759 431C158.984 431 173.759 416.225 173.759 398H171.759C171.759 415.121 157.879 429 140.759 429V431ZM-1 398C-1 416.225 13.7746 431 32 431V429C14.8791 429 1 415.121 1 398H-1ZM418 1C435.121 1 449 14.8792 449 32H451C451 13.7746 436.225 -1 418 -1V1ZM32 -1C13.7746 -1 -1 13.7746 -1 32H1C1 14.8792 14.8792 1 32 1V-1Z" fill="#BEDD7D" mask="url(#path-1-inside-1_14049_29)" />
    </svg>
);

export const WelcomeCard = () => {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <BackgroundShape />
                <div className={styles.content}>
                    {/* Textos de bienvenida */}
                    <div className={styles.headerWelcome}>
                        <div className={styles.titleContainer}>
                            <span className={styles.title}>Buenos dias, usuario</span>
                        </div>
                        <div className={styles.subtitleContainer}>
                            <span className={styles.subtitle}>
                                Take a look at your activities, standings, friends and more.
                            </span>
                        </div>
                    </div>

                    {/* Imagen del rango */}
                    <div className={styles.rankWelcome}>
                        <img
                            src={ReclutaIcon}
                            alt="Rank"
                            className={styles.rankImage}
                        />
                    </div>

                    {/* Información del rango */}
                    <div className={styles.rankInfoWelcome}>
                        <div className={styles.rankLabel}>
                            <span className={styles.rankLabelText}>Rango</span>
                        </div>
                        <div className={styles.rankValue}>
                            <span className={styles.rankValueText}>RECLUTA</span>
                        </div>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.primaryButtonContainer}>
                        <Button variant="outline" size="custom" font="montserrat" className={styles.primaryButton} >
                            Desbloquear
                        </Button>
                    </div>
                    <div className={styles.secondaryButtonContainer}>
                        <Button variant="primary" size="custom" font="montserrat" className={styles.secondaryButton} >
                            REGISTRAR NUEVO RANGER
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};