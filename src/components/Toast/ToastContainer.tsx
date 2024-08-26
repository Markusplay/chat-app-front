import React from 'react';
import { useToastStore } from '../../../zustand/toastStore';
import Toast from './Toast';
import styles from './ToastContainer.module.css';

const ToastContainer: React.FC = () => {
  const toasts = useToastStore(state => state.toasts);

  return (
    <div className={styles.toastContainer}>
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
