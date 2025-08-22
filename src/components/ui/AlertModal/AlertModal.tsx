// Imports necesarios
import * as Dialog from '@radix-ui/react-dialog'; // Componente base para el modal
import { Button, StatefulButton } from '@/components/primitives/Buttons'; // Botón con estados (loading, success, error)
import styles from './AlertModal.module.css'; // Estilos específicos del modal
import { cn } from '@/utils/cn'; // Utilidad para combinar clases

// Iconos para los diferentes estados del modal
import SuccessIcon from '@/assets/icons/success.svg';
import WarningIcon from '@/assets/icons/warning.svg';
import InfoIcon from '@/assets/icons/info.svg';
import ErrorIcon from '@/assets/icons/error.svg';

// Definición de tipos
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'outline' | 'transparent';
type IconType = 'success' | 'warning' | 'info' | 'error';

// Interfaz para la configuración de botones
interface ButtonConfig {
  text: string;
  variant?: ButtonVariant;
  onClick?: () => void | Promise<void>;
  loading?: boolean;
  loadingText?: string;
  showStates?: boolean; // Controla si el botón muestra estados (loading, success, error)
}

// Props del modal refactorizadas
interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message?: string; // Opcional, si existe se muestra
  icon?: IconType;
  extraContent?: React.ReactNode;
  primaryButton?: ButtonConfig;
  secondaryButton?: ButtonConfig;
}

export const AlertModal = ({
  isOpen,
  onClose,
  title,
  message,
  icon = 'success',
  extraContent,
  primaryButton,
  secondaryButton,
}: AlertModalProps) => {
  const getIconSrc = (iconType: IconType) => {
    const icons: Record<IconType, string> = {
      success: SuccessIcon,
      warning: WarningIcon,
      info: InfoIcon,
      error: ErrorIcon,
    };
    return icons[iconType];
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={cn(styles.overlay, 'bg-black/50')} />
        <Dialog.Content className={cn(styles.content, 'w-full max-w-[335px] md:max-w-[400px] p-6')}>
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          {message && <Dialog.Description className="sr-only">{message}</Dialog.Description>}

          <div className="flex flex-col items-center gap-6 w-full">
            {/* Icono */}
            <div className="flex justify-center items-start">
              <img
                src={getIconSrc(icon)}
                alt="Status Icon"
                className="w-20 h-20 aspect-square max-md:w-16 max-md:h-16"
              />
            </div>

            {/* Contenido */}
            <div className="flex flex-col items-center gap-6 self-stretch w-full">
              {/* Textos */}
              <div className="flex flex-col items-start gap-1 self-stretch">
                <h2 className="w-full text-primary font-rubik text-center text-xl font-semibold max-md:text-lg">
                  {title}
                </h2>

                {message && (
                  <div className="flex pt-3 flex-col items-start gap-6 self-stretch">
                    <p
                      className="self-stretch text-white/90 text-center font-poppins text-sm font-normal max-md:text-xs"
                      dangerouslySetInnerHTML={{ __html: message }}
                    />
                  </div>
                )}

                {extraContent && <div className="w-full mt-4">{extraContent}</div>}
              </div>

              {/* Botones */}
              {(primaryButton || secondaryButton) && (
                <div className="flex pt-2 flex-col justify-center items-center gap-4 self-stretch w-full">
                  {primaryButton && (
                    <Button
                      variant={primaryButton.variant || 'primary'}
                      onClick={primaryButton.onClick}
                      className="w-full"
                      disabled={primaryButton.loading}
                    >
                      {primaryButton.text}
                    </Button>
                  )}

                  {secondaryButton && (
                    <StatefulButton
                      variant={secondaryButton.variant || 'outline'}
                      onClick={secondaryButton.onClick}
                      className="w-full"
                      skipLoading={!secondaryButton.showStates}
                      loadingText={secondaryButton.loadingText}
                      disabled={secondaryButton.loading}
                    >
                      {secondaryButton.text}
                    </StatefulButton>
                  )}
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};