import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ToastContainer from './components/Toast/ToastContainer.tsx';

createRoot(document.getElementById('root')!).render(
  <>
    <ToastContainer />
    <App />
  </>,
);
