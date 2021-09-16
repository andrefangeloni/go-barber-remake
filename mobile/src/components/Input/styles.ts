import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  margin-bottom: 8px;
  border-radius: 10px;
  background-color: #232129;

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  color: #fff;
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
`;
