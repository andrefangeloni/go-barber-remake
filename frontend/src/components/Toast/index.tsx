import React from 'react';
import { useTransition } from 'react-spring';

import StyledToast from './StyledToast';

import { ToastMessage } from '../../contexts/ToastContext';

import { Container } from './styles';

interface ToastProps {
  messages: ToastMessage[];
}

const Toast: React.FC<ToastProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ key, item, props }) => (
        <StyledToast key={key} message={item} style={props} />
      ))}
    </Container>
  );
};

export default Toast;
