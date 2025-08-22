import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@/components/ui/Modal/Modal';
import { FormRow } from '@/components/ui/Form/FormRow';
import { Input } from '@/components/primitives/Input';
import type { Rank } from '@/types/rank';
import styles from './RankFormModal.module.css';
import { rankFormSchema, type RankFormValues } from '../../types/types';

export interface RankFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RankFormValues) => Promise<void>;
  initialData?: Rank;
}

export function RankFormModal({ isOpen, onClose, onSubmit, initialData }: RankFormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RankFormValues>({
    resolver: zodResolver(rankFormSchema),
    defaultValues: initialData || {
      name: '',
      position: 1,
      cost: 0,
      monthly_fee: 0,
      earning_goal: 0,
      global_earnings_pool: 0,
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={initialData ? 'Editar Rango' : 'Crear Rango'}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <FormRow label="Nombre" required error={errors.name?.message}>
          <Input {...register('name')} placeholder="Ej: RANGER" disabled={isSubmitting} />
        </FormRow>

        <FormRow label="Posición" required error={errors.position?.message}>
          <Input
            type="number"
            {...register('position', { valueAsNumber: true })}
            placeholder="Ej: 1"
            disabled={isSubmitting}
          />
        </FormRow>

        <FormRow label="Costo" required error={errors.cost?.message}>
          <Input
            type="number"
            {...register('cost', { valueAsNumber: true })}
            placeholder="Ej: 200"
            disabled={isSubmitting}
          />
        </FormRow>

        <FormRow label="Cuota Mensual" required error={errors.monthly_fee?.message}>
          <Input
            type="number"
            {...register('monthly_fee', { valueAsNumber: true })}
            placeholder="Ej: 40"
            disabled={isSubmitting}
          />
        </FormRow>

        <FormRow label="Meta de Ganancias" required error={errors.earning_goal?.message}>
          <Input
            type="number"
            {...register('earning_goal', { valueAsNumber: true })}
            placeholder="Ej: 2000"
            disabled={isSubmitting}
          />
        </FormRow>

        <FormRow label="Pool Global (%)" required error={errors.global_earnings_pool?.message}>
          <Input
            type="number"
            {...register('global_earnings_pool', { valueAsNumber: true })}
            placeholder="Ej: 1"
            disabled={isSubmitting}
          />
        </FormRow>

        <div className={styles.actions}>
          <button type="button" onClick={handleClose} className={styles.cancelButton} disabled={isSubmitting}>
            Cancelar
          </button>
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : initialData ? 'Guardar Cambios' : 'Crear Rango'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
