import { useState, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Modal } from '@/components/ui/Modal/Modal';
import { Button } from '@/components/primitives/Buttons';
import type { Rank } from '@/types/rank';
import styles from './RankReorderModal.module.css';
import { DragVerticalIcon } from '@/components/icons/CiDragVerticalIcon';

interface RankReorderModalProps {
    isOpen: boolean;
    onClose: () => void;
    ranks: Rank[];
    onSave: (reorderedRanks: Rank[]) => Promise<void>;
}

export const RankReorderModal = ({ isOpen, onClose, ranks, onSave }: RankReorderModalProps) => {
    const [orderedRanks, setOrderedRanks] = useState<Rank[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (isOpen && !isInitialized) {
            setOrderedRanks(ranks);
            setIsInitialized(true);
        } else if (!isOpen) {
            setIsInitialized(false);
        }
    }, [isOpen, ranks, isInitialized]);

    const handleSave = async () => {
        try {
            setIsSaving(true);
            await onSave(orderedRanks);
            onClose();
        } catch (error) {
            console.error('Error saving rank order:', error);
        } finally {
            setIsSaving(false);
        }
    };

    if (!isInitialized || !orderedRanks.length) {
        return (
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title="Reordenar Rangos"
                width={600}
            >
                <div className="space-y-6">
                    <p className="text-primary-light/80 text-sm">
                        {!isInitialized ? 'Cargando...' : 'No hay rangos disponibles para reordenar.'}
                    </p>
                    <div className={styles.actions}>
                        <Button variant="outline" onClick={onClose}>
                            Cerrar
                        </Button>
                    </div>
                </div>
            </Modal>
        );
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Reordenar Rangos"
            width={600}
        >
            <div className="space-y-6">
                <p className="text-primary-light/80 text-sm">
                    Arrastra y suelta los rangos para reordenarlos. Los cambios se guardarán cuando presiones "Guardar".
                </p>

                <ReactSortable
                    list={orderedRanks}
                    setList={setOrderedRanks}
                    className={styles.rankList}
                    animation={150} 
                    delay={0} 
                    delayOnTouchOnly={true}
                    handle=".dragHandle"
                    ghostClass={styles.isDragging}
                    dragClass={styles.isDragging}
                    scroll={true}
                    scrollSensitivity={90}
                    scrollSpeed={40} 
                    forceFallback={true}
                    fallbackClass={styles.isDragging}
                    fallbackOnBody={true}
                    swapThreshold={0.5} 
                    direction="vertical"
                    onStart={(evt) => {
                        document.body.classList.add('dragging');
                    }}
                    onEnd={(evt) => {
                        // Limpiar clase del body
                        document.body.classList.remove('dragging');
                        // Actualizar posiciones
                        setOrderedRanks(current =>
                            current.map((item, index) => ({
                                ...item,
                                position: index + 1
                            }))
                        );
                    }}
                >
                    {orderedRanks.map((rank, index) => (
                        <div
                            key={rank.id}
                            className={styles.rankItem}
                        >
                            <div className="flex items-center flex-1">
                                <span className={styles.rankName}>
                                    {rank.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={styles.rankPosition}>
                                    {index + 1}
                                </span>
                                <div className={`${styles.dragHandle} dragHandle`}>
                                    <DragVerticalIcon />
                                </div>
                            </div>
                        </div>
                    ))}
                </ReactSortable>

                <div className={styles.actions}>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isSaving}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSave}
                        disabled={isSaving}
                    >
                        {isSaving ? 'Guardando...' : 'Guardar'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};