import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAuth } from '../../hooks/auth';
import { AppStackList } from '../../routes/app.routes';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
} from './styles';

type DashboardScreenProp = NativeStackNavigationProp<AppStackList, 'Dashboard'>;

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation<DashboardScreenProp>();

  const navigateToProfile = React.useCallback(() => {
    navigate('Profile');
  }, [navigate]);

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
    </Container>
  );
};

export default Dashboard;
