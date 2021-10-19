import React from 'react';
import { Alert, Platform } from 'react-native';

import { format } from 'date-fns';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAuth } from '../../hooks/auth';

import { AppStackList } from '../../routes/app.routes';

import api from '../../services/api';

import {
  Container,
  Header,
  BackButton,
  LeftIcon,
  HeaderTitle,
  UserAvatar,
  ProvidersList,
  ProvidersListContainer,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface Availability {
  hour: number;
  available: boolean;
}

type CreateAppointmentScreenProp = NativeStackNavigationProp<
  AppStackList,
  'CreateAppointment'
>;

const CreateAppointment: React.FC = () => {
  const { params } = useRoute();
  const { providerId } = params as RouteParams;

  const [selectedHour, setSelectedHour] = React.useState(0);
  const [providers, setProviders] = React.useState<Provider[]>([]);
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedProvider, setSelectedProvider] = React.useState(providerId);
  const [availability, setAvailability] = React.useState<Availability[]>([]);

  const { user } = useAuth();
  const { goBack, navigate } = useNavigation<CreateAppointmentScreenProp>();

  React.useEffect(() => {
    const loadProviders = async () => {
      const { data } = await api.get('/providers');
      setProviders(data);
    };

    loadProviders();
  }, []);

  React.useEffect(() => {
    const loadDayAvailability = async () => {
      const { data } = await api.get(
        `/providers/${selectedProvider}/day-availability`,
        {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
          },
        },
      );

      setAvailability(data);
    };

    loadDayAvailability();
  }, [selectedDate, selectedProvider]);

  const navigateBack = React.useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = React.useCallback((id: string) => {
    setSelectedProvider(id);
  }, []);

  const handleToggleDatePicker = React.useCallback(() => {
    setShowDatePicker((prevState) => !prevState);
  }, []);

  const handleDateChanged = React.useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }

      if (date) {
        setSelectedDate(date);
      }
    },
    [],
  );

  const handleSelectHour = React.useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = React.useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('/appointments', {
        date,
        provider_id: selectedProvider,
      });

      navigate('AppointmentCreated', {
        date: date.getTime(),
      });
    } catch (err) {
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao tentar criar o agendamento, tente novamente mais tarde',
      );
    }
  }, [selectedProvider, selectedHour, selectedDate, navigate]);

  const morningAvailability = React.useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => ({
        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [availability]);

  const afternoonAvailability = React.useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => ({
        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [availability]);

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigateBack()}>
          <LeftIcon />
        </BackButton>

        <HeaderTitle>Barbeiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          data={providers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProviderContainer
              selected={item.id === selectedProvider}
              onPress={() => handleSelectProvider(item.id)}
            >
              <ProviderAvatar source={{ uri: item.avatar_url }} />
              <ProviderName selected={item.id === selectedProvider}>
                {item.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>

      <Calendar>
        <Title>Escolha a data</Title>

        <OpenDatePickerButton onPress={() => handleToggleDatePicker()}>
          <OpenDatePickerButtonText>
            Selecionar outra data
          </OpenDatePickerButtonText>
        </OpenDatePickerButton>

        {showDatePicker ? (
          <DateTimePicker
            mode="date"
            display="calendar"
            value={selectedDate}
            onChange={handleDateChanged}
          />
        ) : null}
      </Calendar>

      <Schedule>
        <Title>Escolha o horário</Title>

        <Section>
          <SectionTitle>Manhã</SectionTitle>

          <SectionContent>
            {morningAvailability.map(({ hour, hourFormatted, available }) => (
              <Hour
                key={hourFormatted}
                disabled={!available}
                available={available}
                selected={selectedHour === hour}
                onPress={() => handleSelectHour(hour)}
              >
                <HourText selected={selectedHour === hour}>
                  {hourFormatted}
                </HourText>
              </Hour>
            ))}
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Tarde</SectionTitle>

          <SectionContent>
            {afternoonAvailability.map(({ hour, hourFormatted, available }) => (
              <Hour
                key={hourFormatted}
                disabled={!available}
                available={available}
                selected={selectedHour === hour}
                onPress={() => handleSelectHour(hour)}
              >
                <HourText selected={selectedHour === hour}>
                  {hourFormatted}
                </HourText>
              </Hour>
            ))}
          </SectionContent>
        </Section>
      </Schedule>

      <CreateAppointmentButton onPress={() => handleCreateAppointment()}>
        <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
      </CreateAppointmentButton>
    </Container>
  );
};

export default CreateAppointment;
