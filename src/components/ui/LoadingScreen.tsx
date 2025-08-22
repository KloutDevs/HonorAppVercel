import { LoadingWithText } from './Loading';
import LogoImg from '@/assets/logo.png';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingWithText text="Cargando..." />
      </div>
    </div>
  );
}