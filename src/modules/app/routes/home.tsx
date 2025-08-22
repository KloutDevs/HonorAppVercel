import { useAuth } from '@/modules/auth/context/AuthContext';
import { WelcomeCard } from '@/modules/user/components/WelcomeCard/WelcomeCard';
import { UserInfo } from '@/modules/user/components/UserInfo/UserInfo';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6 p-6">
      <WelcomeCard />
      <UserInfo />
    </div>
  );
}
