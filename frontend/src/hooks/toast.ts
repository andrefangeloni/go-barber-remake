import React from 'react';

import { ToastContext } from '../contexts/ToastContext';

export const useToast = () => {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error('ToastProvider is required!');
  }

  return context;
};
