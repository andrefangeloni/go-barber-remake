import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { Container, StyledToast } from './styles';

const Toast: React.FC = () => (
  <Container>
    <StyledToast>
      <FiAlertCircle size={20} />

      <div>
        <strong>Aconteceu um erro</strong>
        <p>Não foi possível fazer login na aplicação</p>
      </div>

      <button type="button">
        <FiXCircle size={18} />
      </button>
    </StyledToast>

    <StyledToast type="success">
      <FiAlertCircle size={20} />

      <div>
        <strong>Aconteceu um erro</strong>
      </div>

      <button type="button">
        <FiXCircle size={18} />
      </button>
    </StyledToast>

    <StyledToast type="error">
      <FiAlertCircle size={20} />

      <div>
        <strong>Aconteceu um erro</strong>
        <p>Não foi possível fazer login na aplicação</p>
      </div>

      <button type="button">
        <FiXCircle size={18} />
      </button>
    </StyledToast>
  </Container>
);

export default Toast;
