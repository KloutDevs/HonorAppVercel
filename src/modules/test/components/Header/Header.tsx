import { Button } from '@/components/primitives/Buttons';
import { useNavigate } from 'react-router-dom';
import styles from '@/modules/test/components/Header/Header.module.css';

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <Button
        variant="transparent"
        onClick={() => navigate(-1)}
        className="gap-2"
      >
        <IconArrowLeft className="w-4 h-4" />
        Back
      </Button>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};

const IconArrowLeft = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
  >
    <path 
      d="M19 12H5m7 7l-7-7 7-7" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);