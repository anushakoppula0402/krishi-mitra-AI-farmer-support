import React, { useEffect } from 'react';
import { Icon } from './Icon';

interface ToastProps {
  message: string;
  onClose: () => void;
  type: 'error' | 'info';
}

const Toast: React.FC<ToastProps> = ({ message, onClose, type }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, type === 'error' ? 5000 : 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose, type]);

  const config = {
    error: {
      bgClass: 'bg-red-500',
      hoverBgClass: 'hover:bg-red-600',
      iconName: 'alert',
      role: 'alert',
      ariaLive: 'assertive' as const,
    },
    info: {
      bgClass: 'bg-green-600',
      hoverBgClass: 'hover:bg-green-700',
      iconName: 'volumeUp',
      role: 'status',
      ariaLive: 'polite' as const,
    },
  }[type];

  return (
    <div 
      className={`absolute top-4 left-1/2 -translate-x-1/2 w-auto max-w-lg text-white p-4 rounded-lg shadow-lg flex items-center justify-between z-50 animate-toast-in ${config.bgClass}`}
      role={config.role}
      aria-live={config.ariaLive}
    >
      <div className="flex items-center gap-3">
        <Icon name={config.iconName} className="w-6 h-6 flex-shrink-0" />
        <span>{message}</span>
      </div>
      {type === 'error' && (
        <button onClick={onClose} className={`p-1 rounded-full ${config.hoverBgClass} transition-colors`} aria-label="Dismiss error">
          <Icon name="close" className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Toast;