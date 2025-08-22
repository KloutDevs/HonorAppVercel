/* import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField } from '@/components/ui/Fields/TextField';
import { DropdownField } from '@/components/ui/Fields/DropdownField';
import { Button } from '@/components/primitives/Buttons';
import styles from './MissionForm.module.css';
import { useRanks } from '@/modules/ranks/hooks/useRanks';

const formTypeOptions = [
    { value: 'rich_text', label: 'Texto enriquecido' },
    { value: 'image', label: 'Imagen' },
    { value: 'video', label: 'Video' },
];

export const missionSchema = z.object({
    rank_id: z.string().min(1, 'El rango es requerido'),
    title: z.string()
        .min(1, 'El título es requerido')
        .min(3, 'El título debe tener al menos 3 caracteres')
        .max(200, 'El título no puede exceder 200 caracteres'),
    detail: z.string()
        .min(1, 'El detalle es requerido')
        .min(10, 'El detalle debe tener al menos 10 caracteres')
        .max(2000, 'El detalle no puede exceder 2000 caracteres'),
    order: z.number()
        .min(1, 'El orden debe ser mayor a 0')
        .max(999, 'El orden no puede exceder 999'),
    form_type: z.enum(['rich_text', 'image', 'video']),
});

export type MissionFormValues = z.infer<typeof missionSchema>;

interface MissionFormProps {
    onSubmit: (data: MissionFormValues) => Promise<void>;
    onCancel: () => void;
    initialData?: MissionFormValues;
    submitLabel?: string;
    title: string;
}

export function MissionForm({
    onSubmit,
    onCancel,
    initialData,
    submitLabel = 'Guardar',
    title
}: MissionFormProps) {
    const { ranks, isLoading: ranksLoading } = useRanks();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<MissionFormValues>({
        resolver: zodResolver(missionSchema),
        defaultValues: initialData || {
            title: '',
            detail: '',
            form_type: 'rich_text',
            rank_id: '',
            order: 1,
        },
    });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className="text-primary-light font-valkocapela text-2xl">{title}</h1>
            </div>

            <div className="bg-secondary-dark rounded-lg p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <TextField
                                label="Título"
                                required
                                error={errors.title?.message}
                                placeholder="Ej: Completar curso de trading básico"
                                {...register('title')}
                            />

                            <TextField
                                label="Detalle"
                                required
                                multiline
                                rows={4}
                                error={errors.detail?.message}
                                placeholder="Describe los requisitos de la misión..."
                                {...register('detail')}
                            />

                            <Controller
                                name="form_type"
                                control={control}
                                render={({ field }) => (
                                    <DropdownField
                                        label="Tipo de Formulario"
                                        required
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={formTypeOptions}
                                        error={errors.form_type?.message}
                                    />
                                )}
                            />
                        </div>

                        <div className="space-y-6">
                            <Controller
                                name="rank_id"
                                control={control}
                                render={({ field }) => (
                                    <DropdownField
                                        label="Rango"
                                        required
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={ranks.map(rank => ({
                                            value: rank.id,
                                            label: `${rank.position}. ${rank.name}`
                                        }))}
                                        placeholder={ranksLoading ? "Cargando rangos..." : "Selecciona un rango"}
                                        error={errors.rank_id?.message}
                                        disabled={ranksLoading}
                                    />
                                )}
                            />

                            <TextField
                                label="Orden"
                                type="number"
                                required
                                error={errors.order?.message}
                                placeholder="Ej: 1"
                                {...register('order', { valueAsNumber: true })}
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
                            variant="primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Guardando...' : submitLabel}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
} */