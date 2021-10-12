import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAuth } from '../../hooks/auth';

import { AppStackList } from '../../routes/app.routes';

import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
  CalendarIcon,
  ClockIcon,
} from './styles';

type DashboardScreenProp = NativeStackNavigationProp<AppStackList, 'Dashboard'>;

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = React.useState<Provider[]>([]);

  const { user } = useAuth();
  const { navigate } = useNavigation<DashboardScreenProp>();

  React.useEffect(() => {
    const loadProviders = async () => {
      const { data } = await api.get('/providers');
      setProviders(data);
    };

    loadProviders();
  }, []);

  const navigateToProfile = React.useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToCreateAppointment = React.useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={() => navigateToProfile()}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        ListHeaderComponent={<ProvidersListTitle>Barbeiros</ProvidersListTitle>}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(item.id)}
          >
            <ProviderAvatar source={{ uri: item.avatar_url }} />

            <ProviderInfo>
              <ProviderName>{item.name}</ProviderName>

              <ProviderMeta>
                <CalendarIcon />
                <ProviderMetaText>Segunda à Sexta</ProviderMetaText>
              </ProviderMeta>
              <ProviderMeta>
                <ClockIcon />
                <ProviderMetaText>08h às 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
