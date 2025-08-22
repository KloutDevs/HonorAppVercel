import { Navigate } from 'react-router-dom';
import { useAuth } from '@/modules/auth/context/AuthContext';
import { apiClient } from '@/lib/apiClient';
import { LoadingScreen } from '@/components/ui';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const hasToken = !!apiClient.getAccessToken();

  // Mostrar pantalla de carga mientras se verifica la autenticación
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Si el usuario está autenticado y tiene token, redirigir al dashboard
  if (isAuthenticated && hasToken) {
    return <Navigate to="/app/profile" replace />;
  }

  // Si no está autenticado, mostrar el contenido (formulario de login)
  return <>{children}</>;
}