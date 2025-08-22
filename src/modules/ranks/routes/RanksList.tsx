import { useState, useEffect } from 'react';
import type { Rank } from '@/types/rank';
import styles from '@/modules/ranks/styles/RanksList.module.css';
import { ranksApi } from '@/modules/ranks/services/ranks.api';
import { formatCurrency } from '@/utils/string';
import { showToast } from '@/utils/toast';
import { Link, useNavigate } from 'react-router-dom';
import { useNotificationStore } from '@/stores/notifications';
import { Button } from '@/components/primitives/Buttons';
import { RankReorderModal } from '@/modules/ranks/components/RankReorderModal/RankReorderModal';
import { debug } from '@/utils/debug';
import { Spinner } from '@/components/primitives/Spinner/Spinner';

const COMPONENT = 'RanksList';

export default function RanksList() {
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReorderModalOpen, setIsReorderModalOpen] = useState(false);
  const { warning } = useNotificationStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRanks();
  }, []);

  const fetchRanks = async () => {
    try {
      setIsLoading(true);
      const { ranks } = await ranksApi.getAll();
      setRanks(ranks);
    } catch (error) {
      debug.error(COMPONENT, 'Error fetching ranks:', error);
      showToast('Error al cargar los rangos', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (rank: Rank) => {
    warning({
      title: "¿Estás seguro de eliminar este rango?",
      message: `Esta acción eliminará permanentemente el rango <b>${rank.name}</b>. Esta acción no se puede deshacer.`,
      primaryButton: {
        text: "Eliminar",
        variant: "danger",
        onClick: async () => {
          try {
            await ranksApi.delete(rank.id);
            await fetchRanks();
            showToast('Rango eliminado exitosamente', 'success');
          } catch (error) {
            debug.error(COMPONENT, 'Error deleting rank:', error);
            showToast('Error al eliminar el rango', 'error');
          }
        }
      },
      secondaryButton: {
        text: "Cancelar",
        variant: "outline",
        onClick: () => { }
      }
    });
  };

  const handleSaveOrder = async (reorderedRanks: Rank[]) => {
    try {
      await ranksApi.updatePositions(
        reorderedRanks.map(r => ({ id: r.id, position: r.position }))
      );
      await fetchRanks();
      showToast('Rangos reordenados exitosamente', 'success');
    } catch (error) {
      debug.error(COMPONENT, 'Error updating rank positions:', error);
      showToast('Error al reordenar los rangos', 'error');
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className="text-primary-light font-valkocapela text-2xl">Rangos</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setIsReorderModalOpen(true)}
            >
              Reordenar
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/staff/ranks/create')}
            >
              Nuevo Rango
            </Button>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={`${styles.table} ${(!ranks.length || isLoading) ? styles.tableEmpty : ''}`}>
            <thead>
              <tr>
                <th>Posición</th>
                <th>Nombre</th>
                <th>Costo</th>
                <th>Cuota Mensual</th>
                <th>Meta de Ganancias</th>
                <th>Pool Global</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7}>
                    <div className={styles.loadingState}>
                      <Spinner className="w-8 h-8 text-primary" />
                      <span>Cargando rangos...</span>
                    </div>
                  </td>
                </tr>
              ) : ranks.length > 0 ? (
                ranks.map((rank) => (
                  <tr key={rank.id} className={styles.fadeIn}>
                    <td>{rank.position}</td>
                    <td>{rank.name}</td>
                    <td>{formatCurrency(rank.cost)}</td>
                    <td>{formatCurrency(rank.monthly_fee)}</td>
                    <td>{formatCurrency(rank.earning_goal)}</td>
                    <td>{rank.global_earnings_pool}%</td>
                    <td>
                      <div className={styles.actions}>
                        <Link to={`/staff/ranks/${rank.id}/edit`} className={styles.editButton}>
                          Editar
                        </Link>
                        <button onClick={() => handleDelete(rank)} className={styles.deleteButton}>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>
                    <div className={styles.emptyState}>
                      <p>No hay rangos disponibles</p>
                      <span>Crea un nuevo rango para comenzar</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <RankReorderModal
        isOpen={isReorderModalOpen}
        onClose={() => setIsReorderModalOpen(false)}
        ranks={ranks}
        onSave={handleSaveOrder}
      />
    </>
  );
}