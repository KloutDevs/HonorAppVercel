import { useNavigate, useParams } from 'react-router-dom';
import educationalContentService from '@/modules/educational/services/educationalContent.service';
import { showToast } from '@/utils/toast';
import { EducationalContentForm, type EducationalContentFormValues } from '@/modules/educational/components/EducationalContentForm/EducationalContentForm';
import styles from '@/modules/educational/styles/EducationalContent.module.css';
import { useEffect, useState } from 'react';

export default function EducationalContentEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState<EducationalContentFormValues>();
  const [initialThumbnail, setInitialThumbnail] = useState<string | null>(null);
  const [hasExistingVideo, setHasExistingVideo] = useState(false);

  useEffect(() => {
    if (id) fetchContent(id);
  }, [id]);

  const fetchContent = async (contentId: string) => {
    try {
      setIsLoading(true);
      const { data } = await educationalContentService.getById(contentId);

      // Verificar si existe un video
      setHasExistingVideo(
        data.media_type === 'video' &&
        !!data.url
      );

      const formData = {
        title: data.title,
        description: data.description,
        media_type: data.media_type,
        rank_id: typeof data.rank_id === 'string' ? data.rank_id : data.rank_id._id,
        url: data.url ?? '',
      };

      setInitialData(formData);
      // Usar thumbnail_url si existe, sino url para imágenes, sino null
      setInitialThumbnail(data.thumbnail_url || (data.media_type === 'image' ? data.url : null) || null);
    } catch (error) {
      showToast('Error al cargar el contenido educativo', 'error');
      navigate('/staff/educational-content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: EducationalContentFormValues, files: File[]) => {
    if (!id) return;

    const formData = new FormData();
    
    // Solo agregar campos que han cambiado o que son necesarios
    if (data.title !== initialData?.title) {
      formData.append('title', data.title);
    }
    if (data.description !== initialData?.description) {
      formData.append('description', data.description);
    }
    if (data.media_type !== initialData?.media_type) {
      formData.append('media_type', data.media_type);
    }
    if (data.rank_id !== initialData?.rank_id) {
      formData.append('rank_id', data.rank_id);
    }
    if (data.url !== initialData?.url) {
      if (data.url) {
        formData.append('url', data.url);
      }
    }

    // Separar archivos por tipo según la estructura del backend
    const videoFiles = files.filter(file => file.type.startsWith('video/'));
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const pdfFiles = files.filter(file => file.type === 'application/pdf');

    // Agregar archivo principal según el tipo de medio (solo si hay archivos nuevos)
    if (data.media_type === 'video' && videoFiles.length > 0) {
      formData.append('file', videoFiles[0]); // Archivo principal de video
    } else if (data.media_type === 'image' && imageFiles.length > 0) {
      formData.append('file', imageFiles[0]); // Archivo principal de imagen
    } else if (data.media_type === 'pdf' && pdfFiles.length > 0) {
      formData.append('file', pdfFiles[0]); // Archivo principal PDF
    }

    // Agregar imagen/thumbnail si existe (solo si hay imágenes nuevas)
    if (imageFiles.length > 0) {
      // Si es tipo imagen, usar la segunda imagen como thumbnail
      const thumbnailImage = data.media_type === 'image' ? imageFiles[1] : imageFiles[0];
      if (thumbnailImage) {
        formData.append('image', thumbnailImage);
      }
    }

    try {
      await educationalContentService.update(id, formData);
      showToast('Contenido educativo actualizado exitosamente', 'success');
      navigate('/staff/educational-content');
    } catch (error) {
      showToast('Error al actualizar el contenido educativo', 'error');
    }
  };

  if (isLoading) return <div className={styles.loading}>Cargando...</div>;

  return (
    <EducationalContentForm
      onSubmit={handleSubmit}
      onCancel={() => navigate('/staff/educational-content')}
      initialData={initialData}
      initialThumbnail={initialThumbnail}
      submitLabel="Guardar"
      title="Editar Contenido Educativo"
      existingVideo={hasExistingVideo}
    />
  );
}