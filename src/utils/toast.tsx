import toast from 'react-hot-toast';
import CustomToast from '@/components/ui/Toast/Toast';

type ToastType = 'success' | 'error' | 'info' | 'warning';

export const showToast = (message: string, type: ToastType) => {
  toast.custom((t) => (
    <CustomToast
      t={t}
      type={type}
      message={message}
      onClose={() => toast.dismiss(t.id)}
    />
  ));
};