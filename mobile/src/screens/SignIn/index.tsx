import React from 'react';

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

  return (
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

        <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
          <Feather name="log-in" size={20} color="#ff9000" />
          <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
        </CreateAccountButton>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
