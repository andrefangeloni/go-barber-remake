import React from 'react';

import Feather from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Logo,
  Title,
  Scroll,
  Wrapper,
  Container,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  KeyboardAvoidingView,
  CreateAccountButtonText,
} from './styles';

const SignIn: React.FC = () => (
  <>
    <KeyboardAvoidingView>
      <Scroll>
        <Container>
          <Logo />

          <Wrapper>
            <Title>Faça seu logon</Title>
          </Wrapper>

          <Input name="email" icon="mail" placeholder="E-mail" />
          <Input name="password" icon="lock" placeholder="Senha" />

          <Button onPress={() => {}}>Entrar</Button>

          <ForgotPassword onPress={() => {}}>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>
        </Container>
      </Scroll>

      <CreateAccountButton>
        <Feather name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </KeyboardAvoidingView>
  </>
);

export default SignIn;
