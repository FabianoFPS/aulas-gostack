import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';
import {
  BackButton,
  Calendar,
  Header,
  HeaderTitle,
  ProviderAvatar,
  ProviderContainer,
  ProviderName,
  ProvidersList,
  ProvidersListContainer,
  Title,
  UserAvatar,
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

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation();
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const [availability, setAvaibility] = useState<AvailabilityItem[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectProvider, setSelectProvider] = useState(routeParams.providerId);

  useEffect(() => {
    api
      .get<Provider[]>('providers')
      .then(response => {
        setProviders(response.data);
      })
      .catch(error => {
        Alert.alert('Erro:', error.message);
      });
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${selectProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth(),
          day: selectedDate.getDate(),
        },
      })
      .then(response => setAvaibility(response.data))
      .catch(error => Alert.alert('Erro:', error.message));
  }, [selectedDate, selectProvider]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectProvider(providerId);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state);
  }, []);

  const handleOnChange = useCallback(
    (_event: Event, date: Date | undefined) => {
      if (Platform.OS === 'android') setShowDatePicker(state => !state);
      if (date) setSelectedDate(date);
    },
    [],
  );

  return (
    <>
      <Header>
        <BackButton
          onPress={() => {
            navigate('Dashboard');
          }}
        >
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>
        <HeaderTitle>Cabeleireiros</HeaderTitle>
        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={(provider: Provider) => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => handleSelectProvider(provider.id)}
              selected={provider.id === selectProvider}
            >
              <ProviderAvatar source={{ uri: provider.avatar_url }} />
              <ProviderName selected={provider.id === selectProvider}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>
      <Title>Escolha a data</Title>
      <OpenDatePickerButton onPress={handleToggleDatePicker}>
        <OpenDatePickerButtonText>
          Selecionar outra data
        </OpenDatePickerButtonText>
      </OpenDatePickerButton>
      <Calendar>
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display="calendar"
            onChange={handleOnChange}
            // textColor="#f4ede8"
            value={selectedDate}
          />
        )}
      </Calendar>
    </>
  );
};

export default CreateAppointment;
