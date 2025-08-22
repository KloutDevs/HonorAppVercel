import { useState } from 'react';
import { useNotificationStore } from '@/stores/notifications';
import { Input } from '@/components/primitives/Input';
import { Checkbox } from '@/components/primitives/Checkbox/Checkbox';
import { DropdownField } from '@/components/ui/Fields/DropdownField';
import { FormRow } from '@/components/ui/Form/FormRow';
import { StatefulButton, Button } from '@/components/primitives/Buttons';
import { cn } from '@/utils/cn';
import { Header } from '@/modules/test/components/Header/Header';
import styles from '@/modules/test/styles/Alert.module.css';

const iconOptions = [
  { value: 'success' as IconType, label: 'Success' },
  { value: 'warning' as IconType, label: 'Warning' },
  { value: 'error' as IconType, label: 'Error' },
  { value: 'info' as IconType, label: 'Info' },
];

const buttonVariantOptions = [
  { value: 'primary' as ButtonVariant, label: 'Primary' },
  { value: 'secondary' as ButtonVariant, label: 'Secondary' },
  { value: 'danger' as ButtonVariant, label: 'Danger' },
  { value: 'success' as ButtonVariant, label: 'Success' },
  { value: 'warning' as ButtonVariant, label: 'Warning' },
  { value: 'info' as ButtonVariant, label: 'Info' },
  { value: 'outline' as ButtonVariant, label: 'Outline' },
  { value: 'transparent' as ButtonVariant, label: 'Transparent' },
];

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'outline' | 'transparent';
type IconType = 'success' | 'warning' | 'info' | 'error';

interface ButtonConfig {
  text: string;
  variant: ButtonVariant;
  showStates: boolean;
  loadingText?: string;
  onClick?: () => Promise<void>;
}

interface ModalConfig {
  title: string;
  message?: string;
  icon: IconType;
  extraContent?: string;
  primaryButton?: ButtonConfig;
  secondaryButton?: ButtonConfig;
}

export default function TestAlert() {
  const { success, error, warning, info } = useNotificationStore();

  const [config, setConfig] = useState<ModalConfig>({
    title: 'Título del modal',
    message: 'Este es un mensaje de prueba',
    icon: 'success' as IconType,
    extraContent: '<div class="text-sm text-gray-500 mt-2">Contenido extra de ejemplo</div>',
    primaryButton: {
      text: 'Aceptar',
      variant: 'primary' as ButtonVariant,
      showStates: false,
    },
  });

  // Estado para controles del formulario
  const [showSecondaryButton, setShowSecondaryButton] = useState(false);
  const [simulateLoading, setSimulateLoading] = useState(false);

  const handleShowModal = () => {
    const modalConfig = {
      title: config.title,
      message: config.message,
      icon: config.icon as IconType,
      extraContent: config.extraContent && <div dangerouslySetInnerHTML={{ __html: config.extraContent }} />,
      primaryButton: config.primaryButton && {
        ...config.primaryButton,
        variant: config.primaryButton.variant as ButtonVariant,
        onClick: async () => {
          if (simulateLoading) {
            await new Promise((resolve) => setTimeout(resolve, 3000));
          }
        },
      },
      secondaryButton:
        showSecondaryButton && config.secondaryButton
          ? {
            ...config.secondaryButton,
            variant: config.secondaryButton.variant as ButtonVariant,
            onClick: async () => {
              if (simulateLoading) {
                await new Promise((resolve) => setTimeout(resolve, 3000));
              }
            },
          }
          : undefined,
    };

    switch (config.icon) {
      case 'success':
        success(modalConfig);
        break;
      case 'error':
        error(modalConfig);
        break;
      case 'warning':
        warning(modalConfig);
        break;
      case 'info':
        info(modalConfig);
        break;
    }
  };
  return (
    <div className={styles.container}>
      <Header title="Test Alert Modal" />

      <div className={styles.testContainer}>
        <div className={styles.content}>
          <Button onClick={handleShowModal} className={styles.showButton}>
            Mostrar Modal
          </Button>
        </div>

        <div className={cn(styles.configPanel, 'bg-[rgba(26,46,26,0.4)] border-l border-[rgba(190,221,125,0.15)]')}>
          <div className={cn('bg-[rgba(26,46,26,0.4)] border-b border-[rgba(190,221,125,0.15)] p-4')}>
            <h2 className="text-lg font-semibold text-primary-light">Configuración del Modal</h2>
          </div>

          <div className={cn(styles.configContent, 'p-4 space-y-6')}>
            {/* Configuración General */}
            <section
              className={cn('space-y-4 pt-4 first:pt-0', 'border-t border-[rgba(190,221,125,0.15)] first:border-0')}
            >
              <h3 className="text-sm font-medium text-primary-light">Configuración General</h3>

              <FormRow label="Título" required>
                <Input
                  value={config.title}
                  onChange={(e) => setConfig((prev) => ({ ...prev, title: e.target.value }))}
                />
              </FormRow>

              <FormRow label="Mensaje">
                <Input
                  value={config.message}
                  onChange={(e) => setConfig((prev) => ({ ...prev, message: e.target.value }))}
                  multiline
                />
              </FormRow>

              <FormRow label="Icono" required>
                <DropdownField
                  value={config.icon}
                  onChange={(value) => setConfig((prev) => ({ ...prev, icon: value as IconType }))}
                  options={iconOptions}
                />
              </FormRow>
            </section>

            {/* Configuración del Botón Principal */}
            <section className={cn('space-y-4 pt-4', 'border-t border-[rgba(190,221,125,0.15)]')}>
              <h3 className="text-sm font-medium text-primary-light">Botón Principal</h3>

              <FormRow label="Texto" required>
                <Input
                  value={config.primaryButton?.text}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      primaryButton: { ...prev.primaryButton!, text: e.target.value },
                    }))
                  }
                />
              </FormRow>

              <FormRow label="Variante" required>
                <DropdownField
                  value={config.primaryButton?.variant as string}
                  onChange={(value) =>
                    setConfig((prev) => ({
                      ...prev,
                      primaryButton: { ...prev.primaryButton!, variant: value as ButtonVariant },
                    }))
                  }
                  options={buttonVariantOptions}
                />
              </FormRow>

              <FormRow label="Texto durante loading">
                <Input
                  value={config.primaryButton?.loadingText}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      primaryButton: { ...prev.primaryButton!, loadingText: e.target.value },
                    }))
                  }
                />
              </FormRow>

              <div className="space-y-2 pt-2">
                <Checkbox
                  label="Mostrar estados (loading, success, error)"
                  checked={config.primaryButton?.showStates}
                  onChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      primaryButton: { ...prev.primaryButton!, showStates: checked },
                    }))
                  }
                />
              </div>
            </section>

            {/* Configuración del Botón Secundario */}
            <section className={cn('space-y-4 pt-4', 'border-t border-[rgba(190,221,125,0.15)]')}>
              <h3 className="text-sm font-medium text-primary-light">Botón Secundario</h3>

              <div className="space-y-2 pt-2">
                <Checkbox
                  label="Añadir botón secundario"
                  checked={showSecondaryButton}
                  onChange={setShowSecondaryButton}
                />
              </div>

              {showSecondaryButton && (
                <div className="space-y-4">
                  <FormRow label="Texto" required>
                    <Input
                      value={config.secondaryButton?.text}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          secondaryButton: {
                            ...prev.secondaryButton!,
                            text: e.target.value,
                            variant: prev.secondaryButton?.variant || 'outline',
                            showStates: prev.secondaryButton?.showStates || false,
                          },
                        }))
                      }
                    />
                  </FormRow>

                  <FormRow label="Variante" required>
                    <DropdownField
                      value={config.secondaryButton?.variant as string}
                      onChange={(value) =>
                        setConfig((prev) => ({
                          ...prev,
                          secondaryButton: { ...prev.secondaryButton!, variant: value as ButtonVariant },
                        }))
                      }
                      options={buttonVariantOptions}
                    />
                  </FormRow>

                  <FormRow label="Texto durante loading">
                    <Input
                      value={config.secondaryButton?.loadingText}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          secondaryButton: { ...prev.secondaryButton!, loadingText: e.target.value },
                        }))
                      }
                    />
                  </FormRow>

                  <div className="space-y-2 pt-2">
                    <Checkbox
                      label="Mostrar estados (loading, success, error)"
                      checked={config.secondaryButton?.showStates}
                      onChange={(checked) =>
                        setConfig((prev) => ({
                          ...prev,
                          secondaryButton: { ...prev.secondaryButton!, showStates: checked },
                        }))
                      }
                    />
                  </div>
                </div>
              )}
            </section>

            {/* Configuración de Simulación */}
            <section className={cn('space-y-4 pt-4', 'border-t border-[rgba(190,221,125,0.15)]')}>
              <h3 className="text-sm font-medium text-primary-light">Simulación</h3>

              <div className="space-y-2 pt-2">
                <Checkbox
                  label="Simular carga al hacer click (3s)"
                  checked={simulateLoading}
                  onChange={setSimulateLoading}
                />
              </div>
            </section>

            {/* Extra Content */}
            <section className={cn('space-y-4 pt-4', 'border-t border-[rgba(190,221,125,0.15)]')}>
              <h3 className="text-sm font-medium text-primary-light">Contenido Extra</h3>

              <FormRow label="HTML">
                <Input
                  value={config.extraContent}
                  onChange={(e) => setConfig((prev) => ({ ...prev, extraContent: e.target.value }))}
                  multiline
                  rows={4}
                />
              </FormRow>

              {config.extraContent && (
                <div className="space-y-2 mt-4">
                  <h4 className="text-sm font-medium text-primary-light">Vista previa</h4>
                  <div
                    className="p-4 rounded-lg border border-[rgba(190,221,125,0.15)] bg-[rgba(26,46,26,0.4)]"
                    dangerouslySetInnerHTML={{ __html: config.extraContent }}
                  />
                </div>
              )}
            </section>

            <section className={cn('space-y-4 pt-4', 'border-t border-[rgba(190,221,125,0.15)]')}>
              <h3 className="text-sm font-medium text-primary-light">Código de Implementación</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-primary-light mb-2">AlertModal:</h4>
                  <pre className="bg-[rgba(26,46,26,0.6)] p-4 rounded-lg text-sm overflow-x-auto">
                    {`<AlertModal
  isOpen={true}
  onClose={() => {}}
  title="${config.title}"
  message="${config.message || ''}"
  icon="${config.icon}"${config.extraContent ? `
  extraContent={
    <div dangerouslySetInnerHTML={{ 
      __html: '${config.extraContent}'
    }} />
  }` : ''}${config.primaryButton ? `
  primaryButton={{
    text: "${config.primaryButton.text}",
    variant: "${config.primaryButton.variant}",
    ${config.primaryButton.loadingText ? `loadingText: "${config.primaryButton.loadingText}",` : ''}
    ${config.primaryButton.showStates ? 'showStates: true,' : ''}
    onClick: () => {}
  }}` : ''}${config.secondaryButton ? `
  secondaryButton={{
    text: "${config.secondaryButton.text}",
    variant: "${config.secondaryButton.variant}",
    ${config.secondaryButton.loadingText ? `loadingText: "${config.secondaryButton.loadingText}",` : ''}
    ${config.secondaryButton.showStates ? 'showStates: true,' : ''}
    onClick: () => {}
  }}` : ''}
/>`}
                  </pre>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-primary-light mb-2">Notification Store:</h4>
                  <pre className="bg-[rgba(26,46,26,0.6)] p-4 rounded-lg text-sm overflow-x-auto">
                    {`${config.icon}({
  title: "${config.title}",
  message: "${config.message || ''}", ${config.extraContent ? `
  extraContent: <div dangerouslySetInnerHTML={{ 
    __html: '${config.extraContent}'
  }} />,` : ''}${config.primaryButton ? `
  primaryButton: {
    text: "${config.primaryButton.text}",
    variant: "${config.primaryButton.variant}",
    ${config.primaryButton.loadingText ? `loadingText: "${config.primaryButton.loadingText}",` : ''}
    ${config.primaryButton.showStates ? 'showStates: true,' : ''}
    onClick: () => {}
  },` : ''}${config.secondaryButton ? `
  secondaryButton: {
    text: "${config.secondaryButton.text}",
    variant: "${config.secondaryButton.variant}",
    ${config.secondaryButton.loadingText ? `loadingText: "${config.secondaryButton.loadingText}",` : ''}
    ${config.secondaryButton.showStates ? 'showStates: true,' : ''}
    onClick: () => {}
  },` : ''}
});`}
                  </pre>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => navigator.clipboard.writeText(document.querySelectorAll('pre')[0].textContent || '')}
                  >
                    Copiar AlertModal
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigator.clipboard.writeText(document.querySelectorAll('pre')[1].textContent || '')}
                  >
                    Copiar Notification
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
