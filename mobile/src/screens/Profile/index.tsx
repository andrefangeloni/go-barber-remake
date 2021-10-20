import React from 'react';
import { TextInput, Alert } from 'react-native';

import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  Title,
  Scroll,
  Content,
  BackButton,
  UserAvatar,
  InputWrapper,
  BackButtonIcon,
  UserAvatarButton,
  KeyboardAvoidingView,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { goBack } = useNavigation();

  const formRef = React.useRef<FormHandles>(null);
  const emailInputRef = React.useRef<TextInput>(null);
  const passwordInputRef = React.useRef<TextInput>(null);
  const oldPasswordInputRef = React.useRef<TextInput>(null);
  const confirmPasswordInputRef = React.useRef<TextInput>(null);

  const handleSignUp = React.useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você já pode fazer login na aplicação',
        );

        goBack();
      } catch (err: any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          Alert.alert(
            'Erro no cadastro',
            'Ocorreu um erro ao se cadastrar, tente novamente',
          );

          return;
        }
      }
    },
    [goBack],
  );

  return (
    <>
      <KeyboardAvoidingView>
        <Scroll>
          <Content>
            <BackButton onPress={() => goBack()}>
              <BackButtonIcon />
            </BackButton>

            <UserAvatarButton>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>

            <Title>Meu perfil</Title>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />

              <Input
                ref={emailInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              <InputWrapper>
                <Input
                  ref={oldPasswordInputRef}
                  secureTextEntry
                  name="old_password"
                  icon="lock"
                  placeholder="Senha atual"
                  textContentType="newPassword"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                />
              </InputWrapper>

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Nova senha"
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              <Input
                ref={confirmPasswordInputRef}
                secureTextEntry
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Salvar alterações
              </Button>
            </Form>
          </Content>
        </Scroll>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
