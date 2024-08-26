import React, { useEffect } from 'react';
import { Toast as ToastType, useToastStore } from '../../../zustand/toastStore';
import styles from './Toast.module.css';

const Toast: React.FC<ToastType> = ({ id, message, type = 'info' }) => {
  const removeToast = useToastStore(state => state.removeToast);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000); // Toast duration of 3 seconds

    return () => clearTimeout(timer);
  }, [id, removeToast]);

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <span>{message}</span>
      <button onClick={() => removeToast(id)}>X</button>
    </div>
  );
};

export default Toast;
