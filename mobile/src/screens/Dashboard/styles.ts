import styled from 'styled-components/native';
import { Platform, FlatList } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { Provider } from './index';

export const Container = styled.View`
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

export const HeaderTitle = styled.Text`
  font-size: 20px;
  line-height: 28px;
  font-family: 'RobotoSlab-Regular';
  color: #f4ede8;
`;

export const UserName = styled.Text`
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const ProvidersList = styled(
  FlatList as new () => FlatList<Provider>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingTop: 10 },
})`
  padding: 0 24px;
`;

export const ProvidersListTitle = styled.Text`
  margin-bottom: 24px;
  font-size: 24px;
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
`;

export const ProviderContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  background: #3e3b47;
`;

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const ProviderMetaText = styled.Text`
  margin-left: 8px;
  font-family: 'RobotoSlab-Regular';
  color: #999591;
`;

export const CalendarIcon = styled(Feather).attrs({
  name: 'calendar',
  size: 14,
  color: '#ff9000',
})``;

export const ClockIcon = styled(Feather).attrs({
  name: 'clock',
  size: 14,
  color: '#ff9000',
})``;
