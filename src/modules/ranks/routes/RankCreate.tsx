import { useNavigate } from 'react-router-dom';
import { RankForm } from '../components/RankForm/RankForm';
import { ranksApi } from '../services/ranks.api';
import type { RankFormValues } from '../types/types';
import { showToast } from '@/utils/toast';
import { handleRankError } from '../utils/errors';

export default function RankCreate() {
  const navigate = useNavigate();

  const handleSubmit = async (data: RankFormValues) => {
    try {
      await ranksApi.create(data);
      showToast('Rango creado exitosamente', 'success');
      navigate('/staff/ranks');
    } catch (error) {
      handleRankError('RankCreate/onSubmit', error);
    }
  };

  return (
    <RankForm
      title="Crear Nuevo Rango"
      onSubmit={handleSubmit}
      onCancel={() => navigate('/staff/ranks')}
      submitLabel="Crear Rango"
    />
  );
}