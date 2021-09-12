import React from 'react';

import StyledToast from './StyledToast';

import { ToastMessage } from '../../contexts/ToastContext';

import { Container } from './styles';

interface ToastProps {
  messages: ToastMessage[];
}

const Toast: React.FC<ToastProps> = ({ messages }) => (
  <Container>
    {messages.map((message) => (
      <StyledToast key={message.id} message={message} />
    ))}
  </Container>
);

export default Toast;
