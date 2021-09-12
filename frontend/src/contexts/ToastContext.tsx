import React from 'react';
import { v4 as uuid } from 'uuid';

import Toast from '../components/Toast';

export interface ToastMessage {
  id: string;
  type?: 'info' | 'success' | 'error';
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = React.createContext<ToastContextData>(
  {} as ToastContextData,
);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = React.useState<ToastMessage[]>([]);

  const addToast = React.useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages((prevState) => [...prevState, toast]);
    },
    [],
  );

  const removeToast = React.useCallback((id: string) => {
    setMessages((prevState) =>
      prevState.filter((message) => message.id !== id),
    );
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      <Toast messages={messages} />
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };
