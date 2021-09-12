import React from 'react';

import Toast from '../components/Toast';

interface ToastContextData {
  addToast(): void;
  removeToast(): void;
}

const ToastContext = React.createContext<ToastContextData>(
  {} as ToastContextData,
);

const ToastProvider: React.FC = ({ children }) => {
  const addToast = React.useCallback(() => {}, []);
  const removeToast = React.useCallback(() => {}, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      <Toast />
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };
