import { useQuery } from '@tanstack/react-query';
import { IcOutlinePermMedia } from '@/components/icons/IcOutlinePermMedia';
import { Spinner } from '@/components/primitives/Spinner/Spinner';
import styles from './AsyncImage.module.css';
import { useEffect } from 'react';

interface AsyncImageProps {
    src: string | null;
    alt: string;
    className?: string;
    width?: string | number;
    height?: string | number;
    fallbackText?: string;
    showPlaceholder?: boolean;
}

const fetchImage = async (src: string): Promise<string> => {
    const response = await fetch(src);
    if (!response.ok) {
        throw new Error('Error loading image');
    }
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

export const AsyncImage = ({
    src,
    alt,
    className = '',
    width = '',
    height = '',
    fallbackText = 'Sin vista previa',
    showPlaceholder = true
}: AsyncImageProps) => {
    const { data: imgSrc, isLoading, isError } = useQuery<string | null>({
        queryKey: ['image', src],
        queryFn: () => (src ? fetchImage(src) : null),
        enabled: !!src,
        staleTime: 1000 * 60 * 5, // 5 minutos
        gcTime: 1000 * 60 * 30,   // 30 minutos
        retry: 2,                  // Intentar 2 veces antes de fallar
    });

    useEffect(() => {
        return () => {
            if (imgSrc) {
                URL.revokeObjectURL(imgSrc);
            }
        };
    }, [imgSrc]);


    // Si está cargando, mostrar spinner
    if (isLoading) {
        return (
            <div
                className={`${styles.container} ${className} flex items-center justify-center bg-black/50`}
                style={{ width, height }}
            >
                <Spinner className="w-8 h-8 text-primary-light" />
            </div>
        );
    }

    // Si hay error o no hay imagen y showPlaceholder está activo
    if ((isError || !imgSrc) && showPlaceholder) {
        return (
            <div
                className={`${styles.placeholder} ${className}`}
                style={{ width, height }}
            >
                <IcOutlinePermMedia className={styles.placeholderIcon} />
                <span className={styles.placeholderText}>{fallbackText}</span>
            </div>
        );
    }

    // Si hay imagen, mostrarla
    if (imgSrc) {
        return (
            <img
                src={imgSrc}
                alt={alt}
                className={`${styles.image} ${className}`}
                style={{ width, height }}
                loading="lazy" 
            />
        );
    }

    // Si no hay imagen y showPlaceholder es false, no mostrar nada
    return null;
};