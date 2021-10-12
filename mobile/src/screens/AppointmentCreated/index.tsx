import React from 'react';
import { Button } from 'react-native';

import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

const AppointmentCreated: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Button title="Sair" onPress={() => signOut()} />
    </Container>
  );
};

export default AppointmentCreated;