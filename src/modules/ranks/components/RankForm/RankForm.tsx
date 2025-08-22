import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@/components/ui/Fields/TextField';
import { Button } from '@/components/primitives/Buttons';
import { rankFormSchema, type RankFormValues } from '../../types/types';
import styles from '@/modules/educational/styles/EducationalContent.module.css';

interface RankFormProps {
  onSubmit: (data: RankFormValues) => Promise<void>;
  onCancel: () => void;
  initialData?: RankFormValues;
  submitLabel?: string;
  title: string;
}

export function RankForm({
  onSubmit,
  onCancel,
  initialData,
  submitLabel = 'Guardar',
  title,
}: RankFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-primary-light font-valkocapela text-2xl">{title}</h1>
        </div>
      </div>

      <div className="bg-secondary-dark rounded-lg shadow flex-1 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex flex-col h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
            <div className="space-y-6">
              <TextField
                label="Nombre"
                required
                error={errors.name?.message}
                placeholder="Ej: RANGER"
                disabled={isSubmitting}
                {...register('name')}
              />

              <TextField
                label="Posición"
                required
                type="number"
                error={errors.position?.message}
                placeholder="Ej: 1"
                disabled={isSubmitting}
                {...register('position', { valueAsNumber: true })}
              />

              <TextField
                label="Costo"
                required
                type="number"
                error={errors.cost?.message}
                placeholder="Ej: 200"
                disabled={isSubmitting}
                {...register('cost', { valueAsNumber: true })}
              />
            </div>

            <div className="space-y-6">
              <TextField
                label="Cuota Mensual"
                required
                type="number"
                error={errors.monthly_fee?.message}
                placeholder="Ej: 40"
                disabled={isSubmitting}
                {...register('monthly_fee', { valueAsNumber: true })}
              />

              <TextField
                label="Meta de Ganancias"
                required
                type="number"
                error={errors.earning_goal?.message}
                placeholder="Ej: 2000"
                disabled={isSubmitting}
                {...register('earning_goal', { valueAsNumber: true })}
              />

              <TextField
                label="Pool Global (%)"
                required
                type="number"
                error={errors.global_earnings_pool?.message}
                placeholder="Ej: 1"
                disabled={isSubmitting}
                {...register('global_earnings_pool', { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              variant="primary"
            >
              {isSubmitting ? 'Guardando...' : submitLabel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}