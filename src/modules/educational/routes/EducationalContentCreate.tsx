import { useNavigate } from 'react-router-dom';
import educationalContentService from '@/modules/educational/services/educationalContent.service';
import { showToast } from '@/utils/toast';
import { EducationalContentForm, type EducationalContentFormValues } from '@/modules/educational/components/EducationalContentForm/EducationalContentForm';

export default function EducationalContentCreate() {
  const navigate = useNavigate();

  const handleSubmit = async (data: EducationalContentFormValues, files: File[]) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('media_type', data.media_type);
    formData.append('rank_id', data.rank_id);
    if (data.url) formData.append('url', data.url);
    
    formData.append('metadata', JSON.stringify({
      author: 'Staff Dashboard',
      created_at: new Date().toISOString(),
    }));

    // Separar archivos por tipo según la estructura del backend
    const videoFiles = files.filter(file => file.type.startsWith('video/'));
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const pdfFiles = files.filter(file => file.type === 'application/pdf');

    // Agregar archivo principal según el tipo de medio
    if (data.media_type === 'video' && videoFiles.length > 0) {
      formData.append('file', videoFiles[0]); // Archivo principal de video
    } else if (data.media_type === 'image' && imageFiles.length > 0) {
      formData.append('file', imageFiles[0]); // Archivo principal de imagen
    } else if (data.media_type === 'pdf' && pdfFiles.length > 0) {
      formData.append('file', pdfFiles[0]); // Archivo principal PDF
    }

    // Agregar imagen/thumbnail si existe
    if (imageFiles.length > 0) {
      // Si es tipo imagen, usar la segunda imagen como thumbnail
      const thumbnailImage = data.media_type === 'image' ? imageFiles[1] : imageFiles[0];
      if (thumbnailImage) {
        formData.append('image', thumbnailImage);
      }
    }

    try {
      await educationalContentService.create(formData);
      showToast('Contenido educativo creado exitosamente', 'success');
      navigate('/staff/educational-content');
    } catch (error) {
      showToast('Error al crear el contenido educativo', 'error');
    }
  };

  return (
    <EducationalContentForm
      onSubmit={handleSubmit}
      onCancel={() => navigate('/staff/educational-content')}
      submitLabel="Crear Contenido"
      title="Crear Contenido Educativo"
    />
  );
}
