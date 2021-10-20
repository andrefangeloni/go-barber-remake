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
  showsVerticalScrollIndicator: false,
})``;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
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

export const BackToSignIn = styled.TouchableOpacity`
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

export const BackToSignInText = styled.Text`
  margin-left: 16px;
  font-size: 18px;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
`;
