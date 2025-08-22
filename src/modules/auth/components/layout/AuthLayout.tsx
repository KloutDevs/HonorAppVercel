import LayeredBackground from '@/components/layout/LayeredBackground/LayeredBackground';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <LayeredBackground hasTopClip={false}>
      <div className="flex w-screen min-h-screen p-4 sm:p-[24px] min-h-900:p-[50px] justify-center items-start gap-[40px] overflow-x-hidden relative z-20">
        <Outlet />
      </div>
    </LayeredBackground>
  );
}