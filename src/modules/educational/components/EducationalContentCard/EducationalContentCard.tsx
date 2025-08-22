import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { EducationalContentApiItem } from '../../types';
import styles from './EducationalContentCard.module.css';
import { MajesticonsEyeLine } from '@/components/icons/MajesticonsEyeLine';
import { PlayIcon } from '@/components/icons/PlayIcon';
import { VideoIcon } from '@/components/icons/VideoIcon';
import { ImageIcon } from '@/components/icons/ImageIcon';
import { PdfIcon } from '@/components/icons/PdfIcon';
import { AudioIcon } from '@/components/icons/AudioIcon';
import { ClockIcon } from '@/components/icons/ClockIcon';
import { DefaultIcon } from '@/components/icons/DefaultIcon';
import { LinkIcon } from '@/components/icons/LinkIcon';
import { AsyncImage } from '@/components/ui/AsyncImage/AsyncImage';
import { detectContentType } from '@/utils/contentTypeDetector';

interface EducationalContentCardProps {
  content: EducationalContentApiItem;
  onPlayVideo: (content: EducationalContentApiItem) => void;
}

const EducationalContentCard: React.FC<EducationalContentCardProps> = ({
  content,
  onPlayVideo
}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');

  // Función para determinar el tipo de contenido real
  const getActualContentType = () => {
    if (content.media_type === 'link') {
      return detectContentType(content.url || '');
    }
    return content.media_type;
  };

  // Función para determinar el ícono según el tipo de medio
  const getMediaIcon = (mediaType: string) => {
    const iconProps = { className: styles.icon, style: { color: '#BEDD7D' } };

    const actualType = content.media_type === 'link' ? getActualContentType() : mediaType;

    switch (actualType) {
      case 'video':
        return <VideoIcon {...iconProps} />;
      case 'image':
        return <ImageIcon {...iconProps} />;
      case 'pdf':
        return <PdfIcon {...iconProps} />;
      case 'audio':
        return <AudioIcon {...iconProps} />;
      case 'link':
        return <LinkIcon {...iconProps} />;
      default:
        return <DefaultIcon {...iconProps} />;
    }
  };

  // Función para obtener la imagen de vista previa según el tipo de medio
  const getThumbnailUrl = () => {
    let source = '';

    // Si hay un thumbnail_url disponible, usarlo
    if (content.thumbnail_url) {
      source = content.thumbnail_url;
    }
    // Fallbacks según el tipo de medio
    else if (content.media_type === 'image') {
      source = content.url || '';
    }
    // Para videos sin thumbnail, no devolvemos nada (se mostrará placeholder)

    return { source };
  };

  // Efecto para actualizar la URL del thumbnail cuando cambia el contenido
  useEffect(() => {
    const { source } = getThumbnailUrl();
    setThumbnailUrl(source);
  }, [content]);

  // Función para manejar la reproducción del contenido
  const handlePlay = () => {
    const actualContentType = getActualContentType();

    // Si es un video (ya sea media_type 'video' o un link que apunta a video)
    if (actualContentType === 'video') {
      onPlayVideo(content);
    } else {
      // Para otros tipos de contenido, abrir en nueva ventana
      if (content.url) {
        window.open(content.url, '_blank');
      }
    }
  };

  // Función para determinar si mostrar el placeholder
  const shouldShowPlaceholder = () => {
    // Mostrar placeholder si:
    // 1. Es un video sin thumbnail
    // 2. Es un link sin thumbnail
    // 3. Es un PDF sin thumbnail
    return (
      (content.media_type === 'video' && !content.thumbnail_url) ||
      (content.media_type === 'image' && !content.thumbnail_url) ||
      (content.media_type === 'link' && !content.thumbnail_url) ||
      (content.media_type === 'pdf' && !content.thumbnail_url)
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles.thumbnailContainer}>
        <div className={styles.imageWrapper}>
          <AsyncImage
            src={thumbnailUrl}
            alt={content.title}
            className={styles.thumbnail}
            fallbackText="Sin vista previa"
            showPlaceholder={shouldShowPlaceholder()}
          />
        </div>

        {/* Overlay con botones que aparece en hover */}
        <div className={styles.thumbnailOverlay}>
          <div className={styles.overlayButtons}>
            {/* Botón Play */}
            <button
              className={styles.overlayButton}
              onClick={handlePlay}
              title="Reproducir"
            >
              <PlayIcon />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{content.title}</h3>
        </div>

        <div className={styles.metaContainer}>
          <div className={styles.metaItem}>
            {getMediaIcon(content.media_type)}
            <span className={styles.metaText}>
              {(() => {
                const actualType = getActualContentType();
                if (content.media_type === 'link' && actualType !== 'link') {
                  return actualType.charAt(0).toUpperCase() + actualType.slice(1);
                }
                return content.media_type === 'link' ? 'Enlace' :
                  content.media_type.charAt(0).toUpperCase() + content.media_type.slice(1);
              })()}
            </span>
          </div>

          {getActualContentType() === 'video' && (
            <div className={styles.metaItem}>
              <ClockIcon className={styles.icon} style={{ color: '#BEDD7D' }} />
              <span className={styles.metaText}>10:30</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationalContentCard;