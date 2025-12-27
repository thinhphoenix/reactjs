import { setupApiInterceptors } from '@/helpers/axios-instance';
import { message } from 'antd';
import type { ReactNode } from 'react';
import React, { createContext, useCallback, useEffect, useMemo } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastContextType {
  showToast: (type: ToastType, content: string, duration?: number) => void;
  success: (content: string, duration?: number) => void;
  error: (content: string, duration?: number) => void;
  warning: (content: string, duration?: number) => void;
  info: (content: string, duration?: number) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  // register messageApi to axios interceptors so API responses can show toasts
  useEffect(() => {
    setupApiInterceptors(messageApi);
    return () => setupApiInterceptors(null as any);
  }, [messageApi]);

  const showToast = useCallback(
    (type: ToastType, content: string, duration = 3) => {
      messageApi.open({
        type,
        content,
        duration,
      });
    },
    [messageApi],
  );

  const success = useCallback(
    (content: string, duration = 3) => {
      showToast('success', content, duration);
    },
    [showToast],
  );

  const error = useCallback(
    (content: string, duration = 3) => {
      showToast('error', content, duration);
    },
    [showToast],
  );

  const warning = useCallback(
    (content: string, duration = 3) => {
      showToast('warning', content, duration);
    },
    [showToast],
  );

  const info = useCallback(
    (content: string, duration = 3) => {
      showToast('info', content, duration);
    },
    [showToast],
  );

  const value = useMemo<ToastContextType>(
    () => ({
      showToast,
      success,
      error,
      warning,
      info,
    }),
    [showToast, success, error, warning, info],
  );

  return (
    <ToastContext.Provider value={value}>
      {contextHolder}
      {children}
    </ToastContext.Provider>
  );
};
