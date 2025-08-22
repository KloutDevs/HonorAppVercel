import { Navigate } from 'react-router-dom';
import { useAuth } from '@/modules/auth/context/AuthContext';
import { LoadingScreen } from '@/components/ui';

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  // Mostrar pantalla de carga mientras se verifica la autenticación
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // Si está autenticado, redirigir al dashboard
  return <Navigate to="/app" replace />;
}