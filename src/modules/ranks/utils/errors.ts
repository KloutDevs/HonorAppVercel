import { showToast } from '@/utils/toast';
import { isRankError } from '../types/types';
import { debug } from '@/utils/debug';

export const handleRankError = (component: string, error: unknown) => {
  debug.error(component, 'Rank operation error:', error);
  
  if (isRankError(error) && error.response?.data) {
    showToast(error.response.data.message, 'error');
  } else {
    showToast('Ha ocurrido un error en la operación', 'error');
  }
};