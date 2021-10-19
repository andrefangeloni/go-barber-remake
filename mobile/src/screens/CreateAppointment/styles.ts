import styled from 'styled-components/native';
import { Platform, FlatList } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { Provider } from './index';

interface ProviderProps {
  selected: boolean;
}

interface HourProps {
  available?: boolean;
  selected: boolean;
}

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 24 : 24}px;
  background: #28262e;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  margin-left: 16px;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  color: #f5ede8;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`;

export const LeftIcon = styled(Feather).attrs({
  name: 'chevron-left',
  size: 24,
  color: '#999591',
})``;

export const ProvidersListContainer = styled.View``;

export const ProvidersList = styled(
  FlatList as new () => FlatList<Provider>,
).attrs({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { padding: 20, paddingRight: 0 },
})``;

export const ProviderContainer = styled.TouchableOpacity<ProviderProps>`
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;
  background: ${({ selected }) => (selected ? '#ff9000' : '#3e3b47')};
`;

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const ProviderName = styled.Text<ProviderProps>`
  margin-left: 8px;
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
  color: ${({ selected }) => (selected ? '#232129' : '#f4ede8')};
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  margin: 0 24px 24px;
  font-size: 24px;
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
`;

export const OpenDatePickerButton = styled.TouchableOpacity`
  height: 46px;
  margin: 0 24px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #ff9000;
`;

export const OpenDatePickerButtonText = styled.Text`
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
  color: #232129;
`;

export const Schedule = styled.View`
  padding: 24px 0 16px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  margin: 0 24px 12px;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  color: #999591;
`;

export const SectionContent = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingLeft: 24, paddingRight: 16 },
})``;

export const Hour = styled.TouchableOpacity<HourProps>`
  padding: 12px;
  margin-right: 8px;
  border-radius: 10px;
  background: ${({ selected }) => (selected ? '#ff9000' : '#3e3b47')};
  opacity: ${({ available }) => (available ? 1 : 0.3)};
`;

export const HourText = styled.Text<HourProps>`
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  color: ${({ selected }) => (selected ? '#232129' : '#f4ede8')};
`;

export const CreateAppointmentButton = styled.TouchableOpacity`
  height: 50px;
  margin: 0 24px 24px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #ff9000;
`;

export const CreateAppointmentButtonText = styled.Text`
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
  color: #232129;
`;
