import { Button } from '@/components/primitives/Buttons';
import styles from './OnlineClasses.module.css';
import EducationalContentCard from '@/modules/educational/components/EducationalContentCard/EducationalContentCard';
import { useState } from 'react';
import type { EducationalContentApiItem } from '@/modules/educational/types';
import VideoPlayerModal from '@/components/ui/VideoPlayerModal/VideoPlayerModal';

const mockContents: EducationalContentApiItem[] = [
    {
        _id: '1',
        title: 'Introducción al Trading',
        description: 'Fundamentos básicos del trading y conceptos principales',
        media_type: 'video',
        url: 'https://example.com/intro-trading',
        secure_url: 'https://example.com/intro-trading',
        thumbnail_url: 'https://picsum.photos/300/200',
        is_active: true,
        rank_id: {
            _id: '1',
            name: 'Recluta',
            position: 1
        },
        metadata: {
            fileSize: 1024000,
            durationFormatted: '10:30',
            resolution: '1920x1080',
            format: 'mp4'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        _id: '2',
        title: 'Análisis Técnico Avanzado',
        description: 'Patrones de velas y estrategias de trading',
        media_type: 'video',
        url: 'https://example.com/technical-analysis',
        secure_url: 'https://example.com/technical-analysis',
        thumbnail_url: 'https://picsum.photos/300/200',
        is_active: true,
        rank_id: {
            _id: '1',
            name: 'Recluta',
            position: 1
        },
        metadata: {
            fileSize: 1524000,
            durationFormatted: '15:45',
            resolution: '1920x1080',
            format: 'mp4'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        _id: '3',
        title: 'Gestión de Riesgos',
        description: 'Aprende a gestionar tus operaciones de manera segura',
        media_type: 'video',
        url: 'https://example.com/risk-management',
        secure_url: 'https://example.com/risk-management',
        thumbnail_url: 'https://picsum.photos/300/200',
        is_active: true,
        rank_id: {
            _id: '1',
            name: 'Recluta',
            position: 1
        },
        metadata: {
            fileSize: 2024000,
            durationFormatted: '20:15',
            resolution: '1920x1080',
            format: 'mp4'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        _id: '4',
        title: 'Psicología del Trading',
        description: 'Control emocional y disciplina en el trading',
        media_type: 'video',
        url: 'https://example.com/trading-psychology',
        secure_url: 'https://example.com/trading-psychology',
        thumbnail_url: 'https://picsum.photos/300/200',
        is_active: true,
        rank_id: {
            _id: '1',
            name: 'Recluta',
            position: 1
        },
        metadata: {
            fileSize: 1824000,
            durationFormatted: '18:30',
            resolution: '1920x1080',
            format: 'mp4'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        _id: '5',
        title: 'Plan de Trading',
        description: 'Cómo crear y ejecutar un plan de trading efectivo',
        media_type: 'video',
        url: 'https://example.com/trading-plan',
        secure_url: 'https://example.com/trading-plan',
        thumbnail_url: 'https://picsum.photos/300/200',
        is_active: true,
        rank_id: {
            _id: '1',
            name: 'Recluta',
            position: 1
        },
        metadata: {
            fileSize: 1624000,
            durationFormatted: '16:45',
            resolution: '1920x1080',
            format: 'mp4'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

export const OnlineClasses = () => {
    const [contents] = useState<EducationalContentApiItem[]>(mockContents);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState<EducationalContentApiItem | null>(null);

    const handleDelete = (content: EducationalContentApiItem) => {
        console.log('Delete content:', content);
    };

    const handlePlayVideo = (content: EducationalContentApiItem) => {
        setSelectedContent(content);
        setIsVideoModalOpen(true);
    };

    const handleCloseVideoModal = () => {
        setIsVideoModalOpen(false);
        setSelectedContent(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.textContainer}>
                    <span className={styles.title}>Clases online</span>
                    <span className={styles.description}>
                        Este es un resumen de tus clases más recientes, asegúrate de completarlas
                    </span>
                </div>
                <div className={styles.buttonContainer}>
                    <Button
                        variant="outline"
                        size="custom"
                        font="montserrat"
                        className={styles.button}
                    >
                        Ver más
                    </Button>
                </div>
            </div>
            {/* Contenido Scrolleable */}
            <div className={styles.contentScroll}>
                {contents.map((content) => (
                    <EducationalContentCard
                        key={content._id}
                        content={content}
                        onPlayVideo={handlePlayVideo}
                    />
                ))}
            </div>

            {/* Modal de Video */}
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
        </div >
    );
};