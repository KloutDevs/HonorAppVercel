import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './root';
import AppLayout from '@/modules/app/routes/_layout';
import HomePage from '@/modules/app/routes/home';
import Login from '@/modules/auth/routes/login';
import Register from '@/modules/auth/routes/register';
import WelcomePage from '@/modules/auth/routes/welcome';
import RootPage from '@/modules/auth/routes/root';
import AuthLayout from '@/modules/auth/components/layout/AuthLayout';
import { ProtectedRoute } from '@/modules/auth/components/ProtectedRoute';
import { AuthGuard } from '@/modules/auth/components/AuthGuard';
import TestToast from '@/modules/test/routes/toast';
import TestIndex from '@/modules/test/routes';
import TestAlert from '@/modules/test/routes/alert';
import TestButtons from '@/modules/test/routes/buttons';
import NotFound from '@/modules/error/routes/NotFound';
import UnderConstruction from '@/components/ui/UnderConstruction/UnderConstruction';
import Layout from './components/layout/MainLayout/Layout';
import Profile from './modules/user/routes/Profile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <AuthGuard>
            <RootPage />
          </AuthGuard>
        ),
      },
      {
        path: 'auth',
        element: (
          <AuthGuard>
            <AuthLayout />
          </AuthGuard>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="login" replace />,
          },
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'register',
            element: <Register />,
          },
        ],
      },
      {
        path: 'app',
        element: (
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'profile',
            element: <Profile/>,
          },
          {
            path: 'financial',
            element: <UnderConstruction
              title="Financiero en desarrollo"
              description="La sección de finanzas está siendo desarrollada y estará disponible próximamente"
            />,
          },
          {
            path: 'education',
            element: <UnderConstruction
              title="Educación en desarrollo"
              description="La sección de educación está siendo desarrollada y estará disponible próximamente"
            />,
          },
          {
            path: 'community',
            element: <UnderConstruction
              title="Comunidad en desarrollo"
              description="La sección de comunidad está siendo desarrollada y estará disponible próximamente"
            />,
          },
          {
            path: 'tools',
            element: <UnderConstruction
              title="Herramientas en desarrollo"
              description="La sección de herramientas está siendo desarrollada y estará disponible próximamente"
            />,
          },
          {
            path: 'support',
            element: <UnderConstruction
              title="Soporte en desarrollo"
              description="La sección de soporte está siendo desarrollada y estará disponible próximamente"
            />,
          },
        ],
      },
      // Rutas de Testing
      {
        path: 'test',
        element: (
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="components" replace />,
          },
          {
            path: 'components',
            children: [
              {
                index: true,
                element: <TestIndex />,
              },
              {
                path: 'toast',
                element: <TestToast />,
              },
              {
                path: 'buttons',
                element: <TestButtons />,
              },
              {
                path: 'forms',
                element: <div>Test Forms</div>, // Para probar componentes de formularios
              },
              {
                path: 'modals',
                element: <div>Test Modals</div>, // Para probar modales
              },
              {
                path: 'alert',
                element: <TestAlert />
              },
              {
                path: 'tables',
                element: <div>Test Tables</div>, // Para probar tablas
              },
            ],
          },
        ],
      },
    ],
  },
]);
