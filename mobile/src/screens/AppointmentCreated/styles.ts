import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
`;

export const CheckIcon = styled(Feather).attrs({
  name: 'check',
  size: 80,
  color: '#04d361',
})``;

export const Title = styled.Text`
  margin-top: 48px;
  text-align: center;
  font-size: 32px;
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
`;

export const Description = styled.Text`
  text-align: center;
  margin-top: 16px;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  color: #999591;
`;

export const OkButton = styled.TouchableOpacity`
  margin-top: 24px;
  padding: 12px 24px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background: #ff9000;
`;

export const OkButtonText = styled.Text`
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
`;
