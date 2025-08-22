import { useAuth } from '@/modules/auth/context/AuthContext';
import styles from './Header.module.css';
import avatar from '@/assets/avatar.webp';
import { Cog6ToothIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown/Dropdown';
import { cn } from '@/utils/cn';
import { ClockIcon } from '@/components/icons/ClockIcon';
import { MenuIcon } from '@/components/icons/MenuIcon';
import MedalIcon from '@/assets/medalla.svg';
import { Brand } from '@/components/layout/MainLayout/components/Header/components/Brand';
import { NotificationIcon } from '@/components/icons/NotificationIcon';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type NavItem = {
  id: string;
  label: string;
  path: string;
};

const NAV_ITEMS_LEFT: NavItem[] = [
  { id: 'profile', label: 'MI PERFIL', path: '/app/profile' },
  { id: 'financial', label: 'FINANCIERO', path: '/app/financial' },
  { id: 'education', label: 'EDUCACIÓN', path: '/app/education' },
];

const NAV_ITEMS_RIGHT: NavItem[] = [
  { id: 'community', label: 'COMUNIDAD', path: '/app/community' },
  { id: 'tools', label: 'HERRAMIENTAS', path: '/app/tools' },
  { id: 'support', label: 'SOPORTE', path: '/app/support' },
];

export default function Header() {
  const [activeItem, setActiveItem] = useState<string>('profile');
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Obtener el nombre completo del usuario
  const getUserDisplayName = () => {
    if (!user) return 'Usuario';
    const firstName = user.firstname || '';
    const lastName = user.lastname || '';
    return `${firstName} ${lastName}`.trim() || user.email || 'Usuario';
  };

  // Obtener el rol del usuario
  const getUserRole = () => {
    if (!user) return 'Usuario';
    return user.rank?.name || user.role || 'Usuario';
  };

  console.log('[Header Debug] Current user state:', {
    user,
    firstName: user?.firstname,
    lastName: user?.lastname,
    role: user?.role
  });

  useEffect(() => {
    const currentPath = location.pathname;
    const allItems = [...NAV_ITEMS_LEFT, ...NAV_ITEMS_RIGHT];
    const currentItem = allItems.find(item => item.path === currentPath);
    if (currentItem) {
      setActiveItem(currentItem.id);
    }
  }, [location]);

  const handleNavClick = (item: NavItem) => {
    setActiveItem(item.id);
    navigate(item.path);
  };

  return (
    <header className={styles.header}>
      <Brand />
      <div className={styles.primaryBar} >
        <div className={cn(styles.primarySection, styles.primaryLeftSection)}>
          {/* Menu Button */}
          <button className={styles.menuButton}>
            <MenuIcon className={styles.headerIcon} />
          </button>

          {/* Rank Progress */}
          <div className={styles.rankProgress}>
            <img src={MedalIcon} alt="Medal" className={styles.medalIcon} />
            <span className={styles.rankLabel}>Rango actual:</span>
            <span className={styles.rankValue}>{getUserRole().toUpperCase()}</span>
          </div>
        </div>
        <div className={styles.primarySection}>
          <div className={styles.primarySection}>
          </div>

        </div>
        <div className={cn(styles.primarySection, styles.primaryRightSection)}>
          {/* Clock Icon */}
          <button className={styles.iconButton}>
            <ClockIcon className={styles.headerIcon} />
          </button>

          {/* Notification Icon */}
          <button className={styles.iconButton}>
            <NotificationIcon className={styles.headerIcon} />
          </button>

          {/* User Profile Dropdown */}
          <div className="w-[200px] flex justify-end">
            <Dropdown
              trigger={
                <button className={styles.userSection}>
                  <div className={styles.userInfo}>
                    <span className={styles.username}>
                      {getUserDisplayName()}
                    </span>
                    <span className={styles.userAddress}>
                      {user?.email || 'usuario@ejemplo.com'}
                    </span>
                  </div>

                  <div className={styles.avatarContainer}>
                    <img
                      src={avatar}
                      alt="User avatar"
                      className="w-full h-full object-cover rounded-[6px]"
                    />
                  </div>
                </button>
              }
              align="end"
            >
              <DropdownItem
                className={styles.dropdownItem}
                onClick={() => navigate('/app/profile')}
              >
                <Cog6ToothIcon className="w-4 h-4" />
                <span>Mi Perfil</span>
              </DropdownItem>

              <DropdownItem
                className={styles.dropdownItem}
                onClick={handleLogout}
              >
                <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
                <span>Cerrar Sesión</span>
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className={styles.secondaryBar}>
        <div className={styles.innerContainer}>
          {/* Grupo izquierdo */}
          <div className={styles.navGroup}>
            {NAV_ITEMS_LEFT.map((item) => (
              <button
                key={item.id}
                className={cn(styles.navItem, {
                  [styles.active]: activeItem === item.id
                })}
                onClick={() => handleNavClick(item)}
              >
                <span className={styles.navText}>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Grupo derecho */}
          <div className={styles.navGroup}>
            {NAV_ITEMS_RIGHT.map((item) => (
              <button
                key={item.id}
                className={cn(styles.navItem, {
                  [styles.active]: activeItem === item.id
                })}
                onClick={() => handleNavClick(item)}
              >
                <span className={styles.navText}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}