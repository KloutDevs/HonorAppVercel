import { WelcomeForm } from '@/modules/auth/components/WelcomeForm/WelcomeForm';
import LayeredBackground from '@/components/layout/LayeredBackground/LayeredBackground';

export default function RootPage() {
  return (
    <LayeredBackground>
      <div className="flex w-screen min-h-screen p-4 sm:p-[24px] min-h-900:p-[50px] justify-center items-start gap-[40px] overflow-x-hidden relative z-20">
        <WelcomeForm />
      </div>
    </LayeredBackground>
  );
}
