import { useState, useCallback } from 'react';
import { Toast as ToastType } from '../../../zustand/toastStore';
export const useToast = () => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = useCallback(
    (message: string, type?: 'success' | 'error' | 'info') => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts(prevToasts => [...prevToasts, { id, message, type }]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
  };
};
