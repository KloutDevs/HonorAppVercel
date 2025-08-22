import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { authApi } from 'src/modules/auth/services/auth.api';
import type { AuthError } from 'src/modules/auth/types/types';
import type { User } from '@/types';
import { MustChangePassword } from '@/components/modals/MustChangePassword/MustChangePassword';
import apiClient from '@/lib/apiClient';
import { showToast } from '@/utils/toast';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (firstname: string, lastname: string, phone: string, verification_code: string, referred_by: string | undefined, email: string, password: string) => Promise<void>;
  initiateEmailVerification: (email: string) => Promise<void>;
  checkEmailVerification: (email: string, verification_code: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  isSendingCode: boolean;
  isVerifyingCode: boolean;
  isRegistering: boolean;
  error: AuthError | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Helper para manejar la sincronización del usuario
const syncUser = (user: User | null) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
  return user;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  // Wrapper para setUser que mantiene sincronizado localStorage
  const updateUser = (userOrFn: User | null | ((prev: User | null) => User | null)) => {
    setUser((prev) => {
      const nextUser = typeof userOrFn === 'function' ? userOrFn(prev) : userOrFn;
      return syncUser(nextUser);
    });
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authApi.login({ email, password });
      showToast('Inicio de sesión exitoso', 'success');
      updateUser(response?.data?.user);
    } catch (error) {
      const errorMessage = 'Error en la autenticación';
      setError({ message: errorMessage });
      showToast(errorMessage, 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const initiateEmailVerification = async (email: string) => {
    try {
      setIsSendingCode(true);
      setError(null);

      const response = await authApi.initiateEmailVerification({ email });
      
      // Mostrar mensaje de éxito del endpoint
      if (response.data && response.data.message) {
        showToast(response.data.message, 'success');
      } else {
        showToast('Código de verificación enviado al correo', 'success');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al enviar el código de verificación';
      setError({ message: errorMessage });
      showToast(errorMessage, 'error');
      throw error;
    } finally {
      setIsSendingCode(false);
    }
  };

  const checkEmailVerification = async (email: string, verification_code: string) => {
    try {
      setIsVerifyingCode(true);
      setError(null);

      const response = await authApi.checkEmailVerification({ email, verification_code });
      
      // Mostrar mensaje de éxito del endpoint
      if (response.data && response.data.message) {
        showToast(response.data.message, 'success');
      } else {
        showToast('Código de verificación válido', 'success');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al verificar el código';
      setError({ message: errorMessage });
      showToast(errorMessage, 'error');
      throw error;
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const register = async (firstname: string, lastname: string, phone: string, verification_code: string, referred_by: string | undefined, email: string, password: string ) => {
    try {
      setIsRegistering(true);
      setError(null);

      const response = await authApi.register({ firstname, lastname, phone, verification_code, referred_by, email, password });
      
      // Mostrar mensaje de éxito del endpoint
      if (response.data && response.data.message) {
        showToast(response.data.message, 'success');
      } else {
        showToast('La cuenta ha sido creada con éxito', 'success');
      }
      
      // Redirigir al login después del registro exitoso
      setTimeout(() => {
        window.location.href = '/auth/login';
      }, 1500);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error en el registro';
      setError({ message: errorMessage });
      showToast(errorMessage, 'error');
      throw error;
    } finally {
      setIsRegistering(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await authApi.logout();
      updateUser(null);
      showToast('Sesión cerrada exitosamente', 'info');
      window.location.href = '/';
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cerrar sesión';
      setError({ message: errorMessage });
      showToast(errorMessage, 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (currentPassword: string, newPassword: string) => {
    try {
      await authApi.changePassword({
        currentPassword,
        newPassword,
      });

      updateUser((prev) => (prev ? { ...prev, must_change_password: false } : null));
      showToast('Contraseña actualizada exitosamente', 'success');
      setShowChangePasswordModal(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cambiar la contraseña';
      showToast(errorMessage, 'error');
      throw error;
    }
  };

  useEffect(() => {
    if (user?.must_change_password) {
      setShowChangePasswordModal(true);
    }
  }, [user?.must_change_password]);

  useEffect(() => {
    const checkAuth = async () => {

      try {
        const token = apiClient.getAccessToken();
        console.log('[Auth Debug] Initial state:', {
          hasToken: !!token,
          hasUser: !!user,
          userData: user
        });

        if (token) {
          // Si hay token, siempre intentamos obtener el perfil
          console.log('[Auth Debug] Has token, fetching profile');
          try {
            const profile = await authApi.getProfile();
            console.log('[Auth Debug] Profile fetched:', profile.data);
            updateUser(profile.data);
          } catch (profileError) {
            console.log('[Auth Debug] Profile fetch failed:', profileError);
            // Si falla obtener el perfil, limpiamos todo
            updateUser(null);
            apiClient.removeAccessToken();
            window.location.href = '/';
          }
        } else if (!token && user) {
          console.log('[Auth Debug] No token but has user, attempting refresh');
          // Si no hay access token pero hay usuario en localStorage, intentar refrescar
          try {
            const profile = await authApi.getProfile();
            console.log('[Auth Debug] Refresh successful:', profile.data);
            updateUser(profile.data);
          } catch (refreshError) {
            // Si falla el refresh, limpiar sesión
            console.log('[Auth Debug] Refresh failed:', refreshError);
            updateUser(null);
          }
        } else if (!token) {
          // Si no hay token ni usuario, no hacer nada (ya está limpio)
          console.log(user)
          console.log('[Auth Debug] No token - unauthenticated state');
          return;
        }
      } catch (error) {
        console.log('[Auth Debug] Error in auth check:', error);
        updateUser(null);
        apiClient.removeAccessToken();
        window.location.href = '/';
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        initiateEmailVerification,
        checkEmailVerification,
        logout,
        isAuthenticated: !!user,
        isLoading,
        isSendingCode,
        isVerifyingCode,
        isRegistering,
        error,
      }}
    >
      {children}
      <MustChangePassword isOpen={showChangePasswordModal} onChangePassword={handleChangePassword} />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}
