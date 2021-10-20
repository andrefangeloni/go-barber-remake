import React from 'react';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppStackList } from '../../routes/app.routes';

import {
  Container,
  CheckIcon,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

interface RouteParams {
  date: number;
}

type AppointmentCreatedScreenProp = NativeStackNavigationProp<
  AppStackList,
  'AppointmentCreated'
>;

const AppointmentCreated: React.FC = () => {
  const { params } = useRoute();
  const { date } = params as RouteParams;
  const { reset } = useNavigation<AppointmentCreatedScreenProp>();

  const formattedDate = React.useMemo(() => {
    return format(date, "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'", {
      locale: ptBR,
    });
  }, [date]);

  const handleOkPressed = React.useCallback(() => {
    reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    });
  }, [reset]);

  return (
    <Container>
      <CheckIcon />

      <Title>Agendamento concluído</Title>
      <Description>{formattedDate}</Description>

      <OkButton onPress={() => handleOkPressed()}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
