import { ReactNode } from 'react';
import { Toaster, ToasterProps } from 'react-hot-toast';
import { useTheme } from '../../context/ThemeContext';
import './Toast.css';

interface CustomToastProviderProps {
  children: ReactNode;
}

export default function ToastProvider({ children }: CustomToastProviderProps) {
  const { theme } = useTheme();

  const toasterProps: ToasterProps = {
    position: 'top-center',
    toastOptions: {
      className: `toast toast--${theme}`,
      duration: 3000,
      style: {
        background: theme === 'dark' ? '#333' : '#fff',
        color: theme === 'dark' ? '#fff' : '#333',
        border: `1px solid ${theme === 'dark' ? '#555' : '#e1e1e1'}`,
        padding: '16px',
        boxShadow:
          theme === 'dark'
            ? '0 4px 12px rgba(0, 0, 0, 0.4)'
            : '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
      success: {
        iconTheme: {
          primary: '#84cc16',
          secondary: theme === 'dark' ? '#333' : '#fff',
        },
      },
      error: {
        iconTheme: {
          primary: '#ef4444',
          secondary: theme === 'dark' ? '#333' : '#fff',
        },
      },
    },
  };

  return (
    <>
      <Toaster {...toasterProps} />
      {children}
    </>
  );
}
