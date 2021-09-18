import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
}

interface IconProps {
  highlight: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  margin-bottom: 8px;
  border-radius: 10px;
  border-width: 2px;
  border-color: ${({ isFocused }) => (isFocused ? '#ff9000' : '#232129')};
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

export const Icon = styled(Feather).attrs(({ highlight }: IconProps) => ({
  size: 20,
  color: highlight ? '#ff9000' : '#666360',
}))<IconProps>`
  margin-right: 16px;
`;
