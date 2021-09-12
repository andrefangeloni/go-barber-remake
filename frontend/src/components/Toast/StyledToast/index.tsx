import React from 'react';
import {
  FiInfo,
  FiXCircle,
  FiAlertCircle,
  FiCheckCircle,
} from 'react-icons/fi';

import { ToastMessage } from '../../../contexts/ToastContext';

import { useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  success: <FiCheckCircle size={24} />,
  error: <FiAlertCircle size={24} />
};

const StyledToast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message.id, removeToast]);

  return (
    <Container type={message.type} style={style}>
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description ? <p>{message.description}</p> : null}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default StyledToast;
