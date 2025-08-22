import React from 'react';
import { type Toast } from 'react-hot-toast';
import SuccessIcon from '@/assets/icons/success.svg';
import ErrorIcon from '@/assets/icons/error.svg';
import InfoIcon from '@/assets/icons/info.svg';
import WarningIcon from '@/assets/icons/warning.svg';
import './Toast.css';

type CustomToastProps = {
  t: Toast;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  onClose: () => void;
  icon?: React.ReactNode;
};

const CustomToast: React.FC<CustomToastProps> = ({ t, type, message, onClose, icon }) => {
  const icons = {
    success: SuccessIcon,
    error: ErrorIcon,
    info: InfoIcon,
    warning: WarningIcon,
  };

  return (
    <div
      className={`custom-toast ${type} ${t.visible ? 'animate-enter' : 'animate-leave'}`}
      style={{
        opacity: t.visible ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
      }}
    >
      <div className="custom-toast-content">
        <span className="custom-toast-icon">
          <img src={icons[type]} alt={type} />
        </span>
        <span className="custom-toast-message">{message}</span>
        <button className="custom-toast-close" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M20.0303 5.53033C20.3232 5.23744 20.3232 4.76256 20.0303 4.46967C19.7374 4.17678 19.2625 4.17678 18.9697 4.46967L12 11.4393L5.03033 4.46969C4.73744 4.1768 4.26256 4.1768 3.96967 4.46969C3.67678 4.76258 3.67678 5.23746 3.96967 5.53035L10.9393 12.5L3.96967 19.4696C3.67678 19.7625 3.67678 20.2374 3.96967 20.5303C4.26256 20.8232 4.73744 20.8232 5.03033 20.5303L12 13.5607L18.9697 20.5303C19.2625 20.8232 19.7374 20.8232 20.0303 20.5303C20.3232 20.2374 20.3232 19.7626 20.0303 19.4697L13.0606 12.5L20.0303 5.53033Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CustomToast;