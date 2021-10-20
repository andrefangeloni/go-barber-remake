import React from 'react';
import { TextInput, Alert } from 'react-native';

import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';

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

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { goBack } = useNavigation();

  const formRef = React.useRef<FormHandles>(null);
  const emailInputRef = React.useRef<TextInput>(null);
  const passwordInputRef = React.useRef<TextInput>(null);
  const oldPasswordInputRef = React.useRef<TextInput>(null);
  const confirmPasswordInputRef = React.useRef<TextInput>(null);

  const handleUpdateProfile = React.useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val: string) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val: string) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Senhas não conferem'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, password, old_password, password_confirmation } =
          data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);
        updateUser(response.data);

        goBack();
      } catch (err: any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          Alert.alert(
            'Erro',
            'Não foi possível atualizar o perfil. Tente novamente mais tarde',
          );

          return;
        }
      }
    },
    [goBack, updateUser],
  );

  const handleUpdateAvatar = React.useCallback(() => {
    const options = {
      quality: 1,
      maxWidth: 400,
      maxHeight: 400,
      mediaType: 'photo',
    } as ImageLibraryOptions;

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        return;
      }

      if (response.errorCode) {
        Alert.alert(
          'Erro',
          'Não foi possível atualizar o avatar. Tente novamente',
        );

        return;
      }

      if (response.assets) {
        const data = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        };

        const formData = new FormData();
        formData.append('avatar', data);

        const res = await api.patch('/users/avatar', formData);
        updateUser(res.data);
      }
    });
  }, [updateUser]);

  return (
    <>
      <KeyboardAvoidingView>
        <Scroll>
          <Content>
            <BackButton onPress={() => goBack()}>
              <BackButtonIcon />
            </BackButton>

            <UserAvatarButton onPress={() => handleUpdateAvatar()}>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>

            <Title>Meu perfil</Title>

            <Form
              ref={formRef}
              initialData={user}
              onSubmit={handleUpdateProfile}
            >
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
