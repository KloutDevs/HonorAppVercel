import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/modules/auth/context/AuthContext';
import { apiClient } from '@/lib/apiClient';
import { useEffect, useState } from 'react';
import { authApi } from '@/modules/auth/services/auth.api';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(false);
  const hasToken = !!apiClient.getAccessToken();

  useEffect(() => {
    const attemptRefresh = async () => {
      if (!hasToken && user && !isChecking) {
        setIsChecking(true);
        try {
          await authApi.getProfile(); // Esto activará el refresh automáticamente
        } catch (error) {
          // Si falla, el interceptor manejará la limpieza
        } finally {
          setIsChecking(false);
        }
      }
    };

    attemptRefresh();
  }, [hasToken, user, isChecking]);

  if (isChecking) {
    return <div>Verificando autenticación...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}