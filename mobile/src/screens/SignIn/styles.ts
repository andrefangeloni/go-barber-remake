import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import logo from '../../assets/images/logo.png';

export const KeyboardAvoidingView = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
`;

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: { flex: 1 },
  keyboardShouldPersistTaps: 'handled',
})``;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;

export const Logo = styled.Image.attrs({
  source: logo,
})``;

export const Wrapper = styled.View``;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #f4ede8;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 16px 0 ${getBottomSpace()}px;
  border-top-width: 1px;
  border-color: #232129;
  background-color: #312e38;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CreateAccountButtonText = styled.Text`
  margin-left: 16px;
  font-size: 18px;
  color: #ff9000;
  font-family: 'RobotoSlab-Regular';
`;
