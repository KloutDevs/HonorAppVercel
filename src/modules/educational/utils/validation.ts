// MIME types válidos para cada tipo de media
export const VALID_MIME_TYPES = {
    video: [
        'video/mp4',
        'video/mpeg',
        'video/quicktime',
        'video/x-msvideo',
        'video/webm'
    ],
    image: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp'
    ],
    pdf: [
        'application/pdf'
    ],
    thumbnail: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp'
    ]
} as const;

// Límites de tamaño de archivos según configuración del backend
export const FILE_SIZE_LIMITS = {
    IMAGE_MAX_SIZE: 10 * 1024 * 1024, // 10MB para imágenes
    VIDEO_MAX_SIZE: 3 * 1024 * 1024 * 1024, // 3GB para videos
    PDF_MAX_SIZE: 50 * 1024 * 1024, // 50MB para PDFs
    IMAGE_OPTIMIZATION_THRESHOLD: 1 * 1024 * 1024, // 1MB para optimización automática de imágenes
    VIDEO_OPTIMIZATION_THRESHOLD: 10 * 1024 * 1024, // 10MB para optimización automática de videos
} as const;

// Interfaces para validación de archivos
export interface FileValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
}

export interface FileInfo {
    name: string;
    type: string;
    size: number;
}

// Función para validar ObjectId
export const isValidObjectId = (id: string): boolean => {
    return /^[0-9a-fA-F]{24}$/.test(id);
};

// Función para validar MIME types
export const isValidMimeType = (mimeType: string, mediaType: string): boolean => {
    switch (mediaType) {
        case 'video':
            return VALID_MIME_TYPES.video.includes(mimeType as any);
        case 'image':
            return VALID_MIME_TYPES.image.includes(mimeType as any);
        case 'pdf':
            return VALID_MIME_TYPES.pdf.includes(mimeType as any);
        case 'thumbnail':
            return VALID_MIME_TYPES.thumbnail.includes(mimeType as any);
        default:
            return false;
    }
};

// Función para validar tamaño de archivo según el tipo
export const isValidFileSize = (size: number, mediaType: string): boolean => {
    switch (mediaType) {
        case 'image':
            return size <= FILE_SIZE_LIMITS.IMAGE_MAX_SIZE;
        case 'video':
            return size <= FILE_SIZE_LIMITS.VIDEO_MAX_SIZE;
        case 'pdf':
            return size <= FILE_SIZE_LIMITS.PDF_MAX_SIZE;
        default:
            return size <= FILE_SIZE_LIMITS.IMAGE_MAX_SIZE; // Por defecto usar límite de imagen
    }
};

// Función para validar archivos según el tipo de media
export const validateFiles = (
    files: FileInfo[],
    mediaType: string,
    options: {
        existingVideo?: boolean;
        existingThumbnail?: boolean;
        requireThumbnail?: boolean;
    } = {}
): FileValidationResult => {
    const { existingVideo = false, existingThumbnail = false, requireThumbnail = false } = options;
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validación básica de archivos requeridos
    if (mediaType !== 'link') {
        const hasExistingContent = existingVideo || existingThumbnail;
        if (files.length === 0 && !hasExistingContent) {
            errors.push('Debe subir al menos un archivo para este tipo de contenido');
            return { isValid: false, errors, warnings };
        }
    }

    // Validaciones específicas por tipo
    switch (mediaType) {
        case 'video': {
            const videoFiles = files.filter(file => file.type.startsWith('video/'));
            const imageFiles = files.filter(file => file.type.startsWith('image/'));
            
            // Validar archivo de video
            if (!existingVideo && videoFiles.length === 0) {
                errors.push('Debe subir un archivo de video');
            }
            
            if (videoFiles.length > 0) {
                const invalidVideoFiles = videoFiles.filter(
                    file => !isValidMimeType(file.type, 'video')
                );
                if (invalidVideoFiles.length > 0) {
                    errors.push(`Formatos de video no válidos: ${invalidVideoFiles.map(f => f.name).join(', ')}. Formatos permitidos: MP4, WebM, MOV, AVI, MPEG`);
                }
            }

            // Validar thumbnail (opcional para todos los tipos)
            if (imageFiles.length === 0 && !existingThumbnail) {
                warnings.push('Se recomienda subir una imagen de portada para mejor presentación');
            }

            if (imageFiles.length > 0) {
                const invalidImageFiles = imageFiles.filter(
                    file => !isValidMimeType(file.type, 'thumbnail')
                );
                if (invalidImageFiles.length > 0) {
                    errors.push(`Formatos de imagen no válidos: ${invalidImageFiles.map(f => f.name).join(', ')}. Formatos permitidos: JPG, PNG, GIF, WebP`);
                }
            }
            break;
        }

        case 'image': {
            const imageFiles = files.filter(file => file.type.startsWith('image/'));
            
            if (imageFiles.length === 0) {
                errors.push('Debe subir un archivo de imagen');
            } else {
                const invalidImageFiles = imageFiles.filter(
                    file => !isValidMimeType(file.type, 'image')
                );
                if (invalidImageFiles.length > 0) {
                    errors.push(`Formatos de imagen no válidos: ${invalidImageFiles.map(f => f.name).join(', ')}. Formatos permitidos: JPG, PNG, GIF, WebP`);
                }
                
                // Verificar que haya al menos un archivo principal (no thumbnail)
                const mainImageFiles = imageFiles.filter(file => 
                    !file.name.toLowerCase().includes('thumbnail') && 
                    !file.name.toLowerCase().includes('thumb')
                );
                if (mainImageFiles.length === 0 && imageFiles.length > 0) {
                    warnings.push('Se recomienda subir una imagen principal además del thumbnail');
                }
            }
            break;
        }

        case 'pdf': {
            const pdfFiles = files.filter(file => file.type === 'application/pdf');
            const imageFiles = files.filter(file => file.type.startsWith('image/'));
            
            if (pdfFiles.length === 0) {
                errors.push('Debe subir un archivo PDF');
            } else {
                const invalidFiles = files.filter(file => 
                    file.type !== 'application/pdf' && !file.type.startsWith('image/')
                );
                if (invalidFiles.length > 0) {
                    errors.push(`Archivos no válidos: ${invalidFiles.map(f => f.name).join(', ')}. Solo se permiten PDF y thumbnails de imagen`);
                }
            }
            break;
        }

        case 'link': {
            // Para links no se requieren archivos
            if (files.length > 0) {
                errors.push('No debe subir archivos para contenido de tipo enlace');
            }
            break;
        }
    }

    // Validación de tamaño de archivos
    const oversizedFiles = files.filter(file => {
        const fileMediaType = file.type.startsWith('video/') ? 'video' : 
                             file.type.startsWith('image/') ? 'image' : 
                             file.type === 'application/pdf' ? 'pdf' : 'image';
        return !isValidFileSize(file.size, fileMediaType);
    });
    
    if (oversizedFiles.length > 0) {
        const sizeLimits = {
            image: `${FILE_SIZE_LIMITS.IMAGE_MAX_SIZE / (1024 * 1024)}MB`,
            video: `${FILE_SIZE_LIMITS.VIDEO_MAX_SIZE / (1024 * 1024 * 1024)}GB`,
            pdf: `${FILE_SIZE_LIMITS.PDF_MAX_SIZE / (1024 * 1024)}MB`
        };
        errors.push(`Archivos demasiado grandes: ${oversizedFiles.map(f => f.name).join(', ')}. Límites: Imágenes ${sizeLimits.image}, Videos ${sizeLimits.video}, PDFs ${sizeLimits.pdf}`);
    }

    // Advertencias para archivos que serán optimizados
    const filesToOptimize = files.filter(file => 
        file.type.startsWith('image/') && file.size > FILE_SIZE_LIMITS.IMAGE_OPTIMIZATION_THRESHOLD
    );
    if (filesToOptimize.length > 0) {
        warnings.push(`Los siguientes archivos serán optimizados automáticamente: ${filesToOptimize.map(f => f.name).join(', ')}`);
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
};

// Función para validar datos del formulario
export const validateEducationalContent = (
    data: any,
    files: FileInfo[] = [],
    options: {
        existingVideo?: boolean;
        existingThumbnail?: boolean;
        requireThumbnail?: boolean;
    } = {}
): FileValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validaciones básicas manuales
    if (!data.title || data.title.trim() === '') {
        errors.push('El título es requerido');
    } else if (data.title.length < 3) {
        errors.push('El título debe tener al menos 3 caracteres');
    } else if (data.title.length > 200) {
        errors.push('El título no puede exceder 200 caracteres');
    }

    if (!data.description || data.description.trim() === '') {
        errors.push('La descripción es requerida');
    } else if (data.description.length < 10) {
        errors.push('La descripción debe tener al menos 10 caracteres');
    } else if (data.description.length > 1000) {
        errors.push('La descripción no puede exceder 1000 caracteres');
    }

    if (!data.media_type || !['video', 'pdf', 'link', 'image'].includes(data.media_type)) {
        errors.push('Debe seleccionar un tipo de medio válido');
    }

    if (!data.rank_id || data.rank_id.trim() === '') {
        errors.push('El rango es requerido');
    }

    // Validaciones específicas por tipo
    if (data.media_type === 'link') {
        if (!data.url || data.url.trim() === '') {
            errors.push('Debe proporcionar una URL válida para contenido de tipo enlace');
        } else if (!isValidUrl(data.url)) {
            errors.push('Debe ser una URL válida');
        }
    } else if (data.url && data.url.trim() !== '') {
        // Si no es link pero tiene URL, mostrar advertencia
        warnings.push('La URL solo se utiliza para contenido de tipo enlace');
    }

    // Validar archivos
    const fileValidation = validateFiles(files, data.media_type, options);
    errors.push(...fileValidation.errors);
    warnings.push(...fileValidation.warnings);

    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
};

// Función para obtener información de archivos desde File objects
export const getFileInfo = (files: File[]): FileInfo[] => {
    return files.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size
    }));
};

// Función para validar URL
export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

// Función para obtener extensiones aceptadas según el tipo de media
export const getAcceptedExtensions = (mediaType: string): string[] => {
    switch (mediaType) {
        case 'video':
            return ['.mp4', '.webm', '.mov', '.avi', '.mpeg'];
        case 'image':
            return ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
            // SVG removido según configuración del backend
        case 'pdf':
            return ['.pdf'];
        case 'thumbnail':
            return ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        default:
            return [];
    }
};

// Función para obtener el tipo MIME desde la extensión
export const getMimeTypeFromExtension = (filename: string): string | null => {
    const extension = filename.toLowerCase().split('.').pop();
    if (!extension) return null;

    const mimeTypes: Record<string, string> = {
        'mp4': 'video/mp4',
        'webm': 'video/webm',
        'mov': 'video/quicktime',
        'avi': 'video/x-msvideo',
        'mpeg': 'video/mpeg',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'webp': 'image/webp',
        'pdf': 'application/pdf'
    };

    return mimeTypes[extension] || null;
};
