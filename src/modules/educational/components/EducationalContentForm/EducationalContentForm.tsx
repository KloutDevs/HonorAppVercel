import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField } from '@/components/ui/Fields/TextField';
import { DropdownField } from '@/components/ui/Fields/DropdownField';
import { FileUpload } from '@/components/ui/FileUploader/FileUploader';
import { Button } from '@/components/primitives/Buttons/Button';
import { AsyncImage } from '@/components/ui/AsyncImage/AsyncImage';
import { useEffect, useState, useCallback } from 'react';
import styles from '@/modules/educational/styles/EducationalContent.module.css';
import { showToast } from '@/utils/toast';
import { 
    validateEducationalContent, 
    getFileInfo,
    VALID_MIME_TYPES,
    FILE_SIZE_LIMITS
} from '../../utils/validation';
import { useRanks } from '../../../ranks/hooks/useRanks';

const mediaTypeOptions = [
    { value: 'video', label: 'Video' },
    { value: 'image', label: 'Imagen' },
    { value: 'pdf', label: 'PDF' },
    { value: 'link', label: 'Enlace' },
];

// Tipos de archivos aceptados para el componente FileUpload
const ACCEPTED_FILE_TYPES = {
    video: {
        video: '.mp4,.webm,.mov,.avi,.mpeg',
        thumbnail: '.jpg,.jpeg,.png,.gif,.webp'
    },
    image: {
        image: '.jpg,.jpeg,.png,.gif,.webp'
    },
    pdf: {
        document: '.pdf'
    }
};



export const educationalContentSchema = z.object({
    title: z.string()
        .min(1, 'El título es requerido')
        .min(3, 'El título debe tener al menos 3 caracteres')
        .max(200, 'El título no puede exceder 200 caracteres'),
    description: z.string()
        .min(1, 'La descripción es requerida')
        .min(10, 'La descripción debe tener al menos 10 caracteres')
        .max(1000, 'La descripción no puede exceder 1000 caracteres'),
    media_type: z.enum(['video', 'pdf', 'link', 'image']),
    rank_id: z.string()
        .min(1, 'El rango es requerido'),
    url: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
});

export type EducationalContentFormValues = z.infer<typeof educationalContentSchema>;

interface EducationalContentFormProps {
    onSubmit: (data: EducationalContentFormValues, files: File[]) => Promise<void>;
    onCancel: () => void;
    initialData?: EducationalContentFormValues;
    initialThumbnail?: string | null;
    existingVideo?: boolean;
    submitLabel?: string;
    title: string;
}

export function EducationalContentForm({
    onSubmit,
    onCancel,
    initialData,
    initialThumbnail = null,
    submitLabel = 'Guardar',
    title,
    existingVideo = false
}: EducationalContentFormProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(initialThumbnail);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [validationWarnings, setValidationWarnings] = useState<string[]>([]);

    // Hook para obtener los rangos disponibles
    const { ranks, isLoading: ranksLoading, error: ranksError } = useRanks();

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, isSubmitting },
    } = useForm<EducationalContentFormValues>({
        resolver: zodResolver(educationalContentSchema),
        defaultValues: initialData || {
            title: '',
            description: '',
            media_type: 'video',
            rank_id: '',
            url: '',
        },
    });

    const mediaType = watch('media_type');

    // Limpiar errores cuando cambie el tipo de medio
    useEffect(() => {
        setValidationErrors([]);
        setValidationWarnings([]);
    }, [mediaType]);

    const handleFileChange = (newFiles: File[]) => {
        // Limpiar errores de validación anteriores cuando cambian los archivos
        setValidationErrors([]);
        setValidationWarnings([]);

        // Filtrar por tipos válidos según el tipo de medio
        let validFiles: File[] = [];

        if (mediaType === 'video') {
            const videos = newFiles.filter(file => file.type.startsWith('video/'));
            const images = newFiles.filter(file => file.type.startsWith('image/'));

            // Mantener archivos existentes según su tipo
            const existingVideos = files.filter(file => file.type.startsWith('video/'));
            const existingImages = files.filter(file => file.type.startsWith('image/'));

            // Combinar manteniendo el orden: primero videos, luego imágenes
            validFiles = [...existingVideos, ...videos, ...existingImages, ...images];
        } else if (mediaType === 'image') {
            // Para imágenes, permitir múltiples archivos (principal + thumbnails)
            validFiles = [...files, ...newFiles].filter(file => file.type.startsWith('image/'));
        } else if (mediaType === 'pdf') {
            // Para PDF, permitir PDF + thumbnails de imagen
            validFiles = [...files, ...newFiles].filter(file => 
                file.type === 'application/pdf' || file.type.startsWith('image/')
            );
        } else {
            validFiles = [...files, ...newFiles];
        }

        setFiles(validFiles);
    };

    useEffect(() => {
        // Si hay un thumbnail inicial y no hay archivos nuevos, mostrar el inicial
        if (initialThumbnail && files.length === 0) {
            setThumbnailUrl(initialThumbnail);
            return;
        }

        // Encontrar la primera imagen en los archivos
        const firstImage = files.find(file => file.type.startsWith('image/'));

        if (firstImage) {
            const url = URL.createObjectURL(firstImage);
            setThumbnailUrl(url);

            // Cleanup
            return () => URL.revokeObjectURL(url);
        } else {
            // Si no hay imágenes nuevas, mantener el thumbnail inicial o establecer null
            setThumbnailUrl(initialThumbnail);
        }
    }, [files, initialThumbnail]);

    const handleFormSubmit = async (data: EducationalContentFormValues) => {
        // Validar el formulario completo al momento del envío
        const fileInfo = getFileInfo(files);
        const validation = validateEducationalContent(
            data,
            fileInfo,
            { existingVideo, existingThumbnail: !!initialThumbnail }
        );

        if (!validation.isValid) {
            // Mostrar errores de validación
            setValidationErrors(validation.errors);
            setValidationWarnings(validation.warnings);
            showToast(validation.errors[0], 'error');
            return;
        }

        // Limpiar errores si la validación es exitosa
        setValidationErrors([]);
        setValidationWarnings([]);

        // Mostrar advertencias si las hay
        if (validation.warnings.length > 0) {
            validation.warnings.forEach(warning => {
                showToast(warning, 'warning');
            });
        }

        await onSubmit(data, files);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-primary-light font-valkocapela text-2xl flex-1">{title}</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative w-[119px] h-[80px] rounded-lg overflow-hidden">
                            <AsyncImage
                                src={thumbnailUrl}
                                alt="Vista previa del thumbnail"
                                className="w-full h-full object-cover rounded-lg border border-primary-light/20"
                                fallbackText="Sin vista previa"
                                showPlaceholder={!thumbnailUrl}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-secondary-dark rounded-lg shadow flex-1 p-6">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 flex flex-col h-full">
                    {/* Mostrar errores de validación de archivos */}
                    {validationErrors.length > 0 && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                            <h3 className="text-red-400 font-semibold mb-2">Errores de validación:</h3>
                            <ul className="text-red-300 text-sm space-y-1">
                                {validationErrors.map((error, index) => (
                                    <li key={index}>• {error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Mostrar advertencias */}
                    {validationWarnings.length > 0 && (
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                            <h3 className="text-yellow-400 font-semibold mb-2">Advertencias:</h3>
                            <ul className="text-yellow-300 text-sm space-y-1">
                                {validationWarnings.map((warning, index) => (
                                    <li key={index}>• {warning}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
                        <div className="space-y-6">
                            <TextField
                                label="Título"
                                required
                                error={errors.title?.message}
                                placeholder="Ejemplo: Tutorial de Trading Básico"
                                {...register('title')}
                            />

                            <TextField
                                label="Descripción"
                                required
                                multiline
                                rows={3}
                                error={errors.description?.message}
                                placeholder="Describe el contenido que estás subiendo..."
                                {...register('description')}
                            />

                            <Controller
                                name="media_type"
                                control={control}
                                render={({ field }) => (
                                    <DropdownField
                                        label="Tipo de Medio"
                                        required
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={mediaTypeOptions}
                                        placeholder="Selecciona el tipo de medio"
                                        error={errors.media_type?.message}
                                    />
                                )}
                            />

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
                                        error={errors.rank_id?.message || ranksError || undefined}
                                        disabled={ranksLoading}
                                    />
                                )}
                            />

                            {mediaType === 'link' && (
                                <TextField
                                    label="URL del Enlace"
                                    required
                                    type="url"
                                    error={errors.url?.message}
                                    placeholder="https://ejemplo.com/tu-contenido"
                                    {...register('url')}
                                />
                            )}
                        </div>
                        <div className="space-y-6">
                            {mediaType !== 'link' && (
                                <div>
                                    <label className="block text-sm font-medium text-primary-light mb-2">
                                        Archivos
                                        {mediaType === 'video' && (
                                            <span className="text-xs text-primary-light/70 ml-2">
                                                {existingVideo
                                                    ? '(Video existente. Puedes reemplazarlo subiendo uno nuevo)'
                                                    : '(Se requiere un video y se recomienda una imagen de portada)'}
                                            </span>
                                        )}
                                    </label>
                                    <FileUpload
                                         onChange={handleFileChange}
                                         multiple={true} // Permitir múltiples archivos para todos los tipos (para thumbnails opcionales)
                                         accept={Object.values(ACCEPTED_FILE_TYPES[mediaType as keyof typeof ACCEPTED_FILE_TYPES] || {}).join(',')}
                                     />
                                        {mediaType === 'video' && (
                                         <div className="text-xs text-primary-light/70 mt-2 space-y-1">
                                             <p>Formatos de video aceptados: MP4, WebM, MOV, AVI, MPEG</p>
                                             <p>Formatos de thumbnail aceptados: JPG, PNG, GIF, WebP (opcional)</p>
                                             <p>Tamaño máximo: {FILE_SIZE_LIMITS.VIDEO_MAX_SIZE / (1024 * 1024 * 1024)}GB</p>
                                             <p>Duración máxima: 10 minutos</p>
                                         </div>
                                     )}
                                        {mediaType === 'image' && (
                                         <div className="text-xs text-primary-light/70 mt-2 space-y-1">
                                             <p>Formatos aceptados: JPG, PNG, GIF, WebP</p>
                                             <p>Tamaño máximo: {FILE_SIZE_LIMITS.IMAGE_MAX_SIZE / (1024 * 1024)}MB</p>
                                             <p>Optimización automática: Imágenes &gt; 1MB se convierten a WebP (80% calidad)</p>
                                             <p>Thumbnail opcional: JPG, PNG, GIF, WebP (máximo 10MB)</p>
                                         </div>
                                     )}
                                     {mediaType === 'pdf' && (
                                         <div className="text-xs text-primary-light/70 mt-2 space-y-1">
                                             <p>Formato aceptado: PDF</p>
                                             <p>Tamaño máximo: {FILE_SIZE_LIMITS.PDF_MAX_SIZE / (1024 * 1024)}MB</p>
                                             <p>Thumbnail opcional: JPG, PNG, GIF, WebP (máximo 10MB)</p>
                                         </div>
                                     )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-6">
                        <div className="text-sm text-primary-light/70">
                            {isSubmitting && (
                                <span className="text-blue-400">
                                    {submitLabel === 'Guardar' ? 'Actualizando...' : 'Subiendo archivos...'} Esto puede tomar varios minutos para archivos grandes
                                </span>
                            )}
                        </div>
                        <div className="flex space-x-4">
                            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                                Cancelar
                            </Button>
                            <Button 
                                type="submit" 
                                disabled={isSubmitting} 
                                variant="primary"
                            >
                                {isSubmitting ? (submitLabel === 'Guardar' ? 'Actualizando...' : 'Subiendo...') : submitLabel}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}