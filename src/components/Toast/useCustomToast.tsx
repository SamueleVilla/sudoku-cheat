import toast from 'react-hot-toast';
import { useTheme } from '../../context/ThemeContext';

export default function useCustomToast() {
  const { theme } = useTheme();

  const showSuccess = (message: string) => {
    return toast.success(message, {
      className: `toast toast--${theme} toast-success`,
      position: 'top-center',
      duration: 3000,
      icon: '🎉',
    });
  };

  const showError = (message: string) => {
    return toast.error(message, {
      className: `toast toast--${theme} toast-error`,
      position: 'top-center',
      duration: 4000,
      icon: '😢',
    });
  };

  const showLoading = (message: string) => {
    return toast.loading(message, {
      className: `toast toast--${theme} toast-loading`,
      position: 'top-center',
    });
  };

  const showInfo = (message: string, icon: string = 'ℹ️') => {
    return toast(message, {
      className: `toast toast--${theme}`,
      position: 'top-center',
      duration: 3000,
      icon,
    });
  };

  return {
    showSuccess,
    showError,
    showLoading,
    showInfo,
    dismiss: toast.dismiss,
  };
}
