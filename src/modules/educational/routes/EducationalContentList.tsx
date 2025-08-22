import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '@/components/ui/Fields/TextField';
import type { EducationalContentApiItem, EducationalContentResponse } from '../types';
import { DropdownField } from '@/components/ui/Fields/DropdownField';
import { ranksApi } from '@/modules/ranks/services/ranks.api';
import { FilterIcon } from '@/components/icons/FilterIcon';
import type { Rank } from '@/types/rank';
import educationalContentService from '@/modules/educational/services/educationalContent.service';
import { showToast } from '@/utils/toast';
import styles from '../styles/EducationalContent.module.css';
import { debug } from '@/utils/debug';
import EducationalContentCard from '../components/EducationalContentCard/EducationalContentCard';
import VideoPlayerModal from '@/components/ui/VideoPlayerModal/VideoPlayerModal';

const COMPONENT = 'EducationalContentList';

export default function EducationalContentList() {
  const [allContents, setAllContents] = useState<EducationalContentApiItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<EducationalContentApiItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRank, setSelectedRank] = useState<string | number>('');
  const [selectedMediaType, setSelectedMediaType] = useState<string | number>('');
  const [ranks, setRanks] = useState<Rank[]>([]);

  useEffect(() => {
    debug.log(COMPONENT, 'Component mounted, fetching contents');
    fetchContents();
  }, []);

  useEffect(() => {
    const fetchRanks = async () => {
      try {
        debug.log(COMPONENT, 'Fetching ranks');
        const { ranks } = await ranksApi.getAll();
        debug.log(COMPONENT, 'Received ranks:', ranks);
        setRanks(ranks);
      } catch (error) {
        debug.error(COMPONENT, 'Error fetching ranks:', error);
      }
    };
    fetchRanks();
  }, []);

  useEffect(() => {
    fetchContents();
  }, [searchQuery, selectedRank, selectedMediaType]);

  const mediaTypeOptions = [
    { value: '', label: 'Todos los tipos' },
    { value: 'video', label: 'Videos' },
    { value: 'image', label: 'Imágenes' },
    { value: 'pdf', label: 'PDFs' },
    { value: 'link', label: 'Enlaces' },
    { value: 'audio', label: 'Audios' },
  ];

  const fetchContents = async () => {
    try {
      debug.log(COMPONENT, 'Fetching educational contents');
      debug.log(COMPONENT, 'Current filters:', {
        rank: selectedRank,
        mediaType: selectedMediaType,
        search: searchQuery
      });

      setIsLoading(true);
      let contentArray: EducationalContentApiItem[] = [];

      if (selectedRank) {
        debug.log(COMPONENT, `Fetching contents for rank: ${selectedRank}`);
        const response = await educationalContentService.getByRankId(selectedRank as string);
        debug.log(COMPONENT, 'Rank contents response:', response);

        console.log(response)
        if (response.data) {
          debug.log(COMPONENT, 'Contents to set data data:', response.data);
          contentArray = response.data;
        }
      } else {
        debug.log(COMPONENT, 'Fetching all contents');
        const response = await educationalContentService.getAll({});
        debug.log(COMPONENT, 'All contents response:', response);

        if (response.data?.content) {
          contentArray = response.data.content;
        }
      }

      debug.log(COMPONENT, 'Contents setted final:', contentArray);
      debug.log(COMPONENT, 'Contents array length:', contentArray.length);

      setAllContents(contentArray);
    } catch (error) {
      debug.error(COMPONENT, 'Error fetching educational content:', error);
      showToast('Error al cargar el contenido', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Contenidos filtrados usando useMemo
  const filteredContents = useMemo(() => {
    return allContents.filter(content => {
      const matchesSearch = searchQuery.trim() === '' ||
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesMediaType = selectedMediaType === '' ||
        content.media_type === selectedMediaType;

      return matchesSearch && matchesMediaType;
    });
  }, [allContents, searchQuery, selectedMediaType]);


  const handleDelete = async (content: EducationalContentApiItem) => {
    try {
      debug.log(COMPONENT, `Deleting content with id: ${content._id}`);
      await educationalContentService.delete(content._id);
      await fetchContents();
      showToast('Contenido educativo eliminado exitosamente', 'success');
    } catch (error) {
      debug.error(COMPONENT, 'Error deleting educational content:', error);
      console.error('Error deleting educational content:', error);
      showToast('Error al eliminar el contenido educativo', 'error');
    }
  };

  const handlePlayVideo = (content: EducationalContentApiItem) => {
    setSelectedContent(content);
    setIsVideoModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
    setSelectedContent(null);
  };

  const contentToShow = () => {
    if (isLoading) {
      return <div className={styles.loading}>Cargando contenido educativo...</div>;
    } else if (filteredContents.length > 0) {
      return (
        <div className={styles.cardsContainer}>bun
          {filteredContents.map((content) => (
            <EducationalContentCard
              key={content._id}
              content={content}
              onPlayVideo={handlePlayVideo}
            />

          ))}
        </div>
      );
    } else {
      return (<div className="col-span-full text-center text-gray-400 py-8">
        No hay contenido educativo disponible
      </div>)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className="text-primary-light font-valkocapela text-2xl">Contenido Educativo</h1>
        <Link
          to="/staff/educational-content/create"
          className={styles.addButton}
        >
          Nuevo Contenido
        </Link>
      </div>

      <div className="bg-secondary-dark rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TextField
            label="Buscar contenido"
            placeholder="Buscar por título..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}

          />

          <DropdownField
            label="Filtrar por rango"
            value={selectedRank}
            onChange={(value) => setSelectedRank(value)}
            options={[
              { value: '', label: 'Todos los rangos' },
              ...ranks.map(rank => ({
                value: rank.id,
                label: rank.name
              }))
            ]}
            icon={<FilterIcon className="w-4 h-4 text-primary" />}
          />

          <DropdownField
            label="Tipo de contenido"
            value={selectedMediaType}
            onChange={(value) => setSelectedMediaType(value)}
            options={mediaTypeOptions}
            icon={<FilterIcon className="w-4 h-4 text-primary" />}
          />
        </div>
      </div>

      {contentToShow()}

      {selectedContent && selectedContent.secure_url && (
        <VideoPlayerModal
          isOpen={isVideoModalOpen}
          onClose={handleCloseVideoModal}
          videoUrl={selectedContent.secure_url}
          title={selectedContent.title}
          duration="10:30"
          views={0}
          description={selectedContent.description}
        />
      )}
    </div>
  );
}