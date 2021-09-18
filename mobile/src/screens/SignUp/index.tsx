import React from 'react';

import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Logo,
  Title,
  Scroll,
  Wrapper,
  Container,
  BackToSignIn,
  BackToSignInText,
  KeyboardAvoidingView,
} from './styles';

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <KeyboardAvoidingView>
        <Scroll>
          <Container>
            <Logo />

            <Wrapper>
              <Title>Crie sua conta</Title>
            </Wrapper>

            <Input name="name" icon="user" placeholder="Nome" />
            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button onPress={() => {}}>Entrar</Button>
          </Container>
        </Scroll>

        <BackToSignIn onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={20} color="#fff" />
          <BackToSignInText>Voltar para logon</BackToSignInText>
        </BackToSignIn>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
