import React from 'react';
import { Platform } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useAuth } from '../../hooks/auth';

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
} from './styles';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const CreateAppointment: React.FC = () => {
  const { params } = useRoute();
  const { providerId } = params as RouteParams;

  const [providers, setProviders] = React.useState<Provider[]>([]);
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedProvider, setSelectedProvider] = React.useState(providerId);

  const { user } = useAuth();
  const { goBack } = useNavigation();

  React.useEffect(() => {
    const loadProviders = async () => {
      const { data } = await api.get('/providers');
      setProviders(data);
    };

    loadProviders();
  }, []);

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
    </Container>
  );
};

export default CreateAppointment;
