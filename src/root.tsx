import { Outlet, useNavigation, isRouteErrorResponse } from 'react-router-dom';
import { AuthProvider } from '@/modules/auth/context/AuthContext';
import { LoadingScreen } from '@/components/ui';
import { Toaster } from 'react-hot-toast';
import { NotificationProvider } from '@/components/providers/NotificationProvider';

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Outlet />
        <Toaster position="top-right" />
        <NotificationProvider />
      </Layout>
    </AuthProvider>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return <>{isLoading ? <LoadingScreen /> : children}</>;
}

export function ErrorBoundary({ error }: { error: any }) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
