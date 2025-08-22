import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RankForm } from '../components/RankForm/RankForm';
import { ranksApi } from '../services/ranks.api';
import type { RankFormValues } from '../types/types';
import { showToast } from '@/utils/toast';
import { handleRankError } from '../utils/errors';

export default function RankEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<RankFormValues>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRank = async () => {
      try {
        const rank = await ranksApi.getOne(id!);
        setInitialData(rank);
      } catch (error) {
        handleRankError('RankEdit/UseEffect', error);
        navigate('/staff/ranks');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRank();
  }, [id, navigate]);

  const handleSubmit = async (data: RankFormValues) => {
    try {
      await ranksApi.update(id!, data);
      showToast('Rango actualizado exitosamente', 'success');
      navigate('/staff/ranks');
    } catch (error) {
      handleRankError('RankEdit/onSubmit', error);
    }
  };

  if (isLoading) {
    return <div className="text-center text-primary-light/70 p-6">Cargando...</div>;
  }

  return (
    <RankForm
      title="Editar Rango"
      onSubmit={handleSubmit}
      onCancel={() => navigate('/staff/ranks')}
      initialData={initialData}
      submitLabel="Guardar Cambios"
    />
  );
}