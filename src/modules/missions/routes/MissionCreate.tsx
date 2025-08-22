/* import { useNavigate } from 'react-router-dom';
import { MissionForm, type MissionFormValues } from '@/modules/missions/components/MissionForm';
import { missionsApi } from '../services/missions.api';
import { showToast } from '@/utils/toast';

export default function MissionCreate() {
    const navigate = useNavigate();

    const handleSubmit = async (data: MissionFormValues) => {
        try {
            await missionsApi.create(data);
            showToast('Misión creada exitosamente', 'success');
            navigate('/staff/missions');
        } catch (error) {
            showToast('Error al crear la misión', 'error');
        }
    };

    return (
        <MissionForm
            onSubmit={handleSubmit}
            onCancel={() => navigate('/staff/missions')}
            submitLabel="Crear Misión"
            title="Crear Nueva Misión"
        />
    );
} */