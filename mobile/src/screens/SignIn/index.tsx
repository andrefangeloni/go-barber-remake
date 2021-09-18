import React from 'react';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AuthStackList } from '../../routes';

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

type SignInScreenProp = NativeStackNavigationProp<AuthStackList, 'SignIn'>;

const SignIn: React.FC = () => {
  const formRef = React.useRef<FormHandles>(null);
  const navigation = useNavigation<SignInScreenProp>();

  const handleSignIn = React.useCallback((data: object) => {
    console.log(data);
  }, []);

  return (
    <>
      <KeyboardAvoidingView>
        <Scroll>
          <Container>
            <Logo />

            <Wrapper>
              <Title>Faça seu logon</Title>
            </Wrapper>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Senha" />

              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>

            <ForgotPassword onPress={() => {}}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </Scroll>

        <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
          <Feather name="log-in" size={20} color="#ff9000" />
          <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
        </CreateAccountButton>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
