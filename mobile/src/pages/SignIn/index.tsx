import React from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Logo, Title } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Logo />

    <Title>Faça seu logon</Title>

    <Input name="email" icon="mail" placeholder="E-mail" />
    <Input name="password" icon="lock" placeholder="Senha" />

    <Button onPress={() => null}>Entrar</Button>
  </Container>
);

export default SignIn;
