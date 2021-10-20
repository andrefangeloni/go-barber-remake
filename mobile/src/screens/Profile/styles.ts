import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';

export const KeyboardAvoidingView = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})``;

export const Scroll = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'handled',
  showsVerticalScrollIndicator: false,
})``;

export const Content = styled.View`
  padding: 0 30px 20px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 20px;
  margin-left: -16px;
`;

export const BackButtonIcon = styled(Feather).attrs({
  name: 'chevron-left',
  size: 26,
  color: '#999591',
})``;

export const UserAvatarButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;

export const InputWrapper = styled.View`
  margin-top: 16px;
`;
