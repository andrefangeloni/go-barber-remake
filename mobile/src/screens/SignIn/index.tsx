import React from 'react';
import { TextInput } from 'react-native';

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
  const navigation = useNavigation<SignInScreenProp>();

  const formRef = React.useRef<FormHandles>(null);
  const passwordInputRef = React.useRef<TextInput>(null);

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
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

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
