import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '@/components/ui/Modal/Modal';
import { FormRow } from '@/components/ui/Form/FormRow';
import { Input } from '@/components/primitives/Input';
import styles from './MustChangePassword.module.css';

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'La contraseña actual es requerida'),
    newPassword: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
      .regex(/[a-z]/, 'Debe contener al menos una minúscula')
      .regex(/[0-9]/, 'Debe contener al menos un número'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

interface MustChangePasswordProps {
  isOpen: boolean;
  onChangePassword: (newPassword: string, currentPassword: string) => Promise<void>;
}

export function MustChangePassword({ isOpen, onChangePassword }: MustChangePasswordProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordFormValues) => {
    try {
      setIsSubmitting(true);
      await onChangePassword(data.newPassword, data.currentPassword);
      reset();
    } catch (error) {
      console.error('Error changing password:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}} // No permitimos cerrar el modal
      title="Cambio de Contraseña"
      width={500}
    >
      <div className={styles.container}>
        <p className={styles.description}>
          Por razones de seguridad, debes cambiar tu contraseña antes de continuar usando el panel.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <FormRow label="Contraseña Actual" required error={errors.currentPassword?.message}>
            <Input
              type="password"
              placeholder="Ingresa tu contraseña actual"
              {...register('currentPassword')}
              canShowPassword
              disabled={isSubmitting}
            />
          </FormRow>

          <FormRow label="Nueva Contraseña" required error={errors.newPassword?.message}>
            <Input
              type="password"
              placeholder="Ingresa tu nueva contraseña"
              {...register('newPassword')}
              canShowPassword
              disabled={isSubmitting}
            />
          </FormRow>

          <FormRow label="Confirmar Contraseña" required error={errors.confirmPassword?.message}>
            <Input
              type="password"
              placeholder="Confirma tu nueva contraseña"
              {...register('confirmPassword')}
              canShowPassword
              disabled={isSubmitting}
            />
          </FormRow>

          <div className={styles.requirements}>
            <h4>La contraseña debe contener:</h4>
            <ul>
              <li>Mínimo 8 caracteres</li>
              <li>Al menos una mayúscula</li>
              <li>Al menos una minúscula</li>
              <li>Al menos un número</li>
            </ul>
          </div>

          <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
            {isSubmitting ? 'Cambiando contraseña...' : 'Cambiar Contraseña'}
          </button>
        </form>
      </div>
    </Modal>
  );
}
