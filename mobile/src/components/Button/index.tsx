import React from 'react';

import { Container, ButtonText } from './styles';

interface ButtonProps {
  onPress(): void;
}

const Button: React.FC<ButtonProps> = ({ children, onPress }) => (
  <Container onPress={onPress}>
    <ButtonText>{children}</ButtonText>
  </Container>
);

export default Button;
