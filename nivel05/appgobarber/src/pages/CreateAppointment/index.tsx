import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Alert, View } from 'react-native';

import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';
import {
  BackButton,
  Header,
  HeaderTitle,
  ProviderAvatar,
  ProviderContainer,
  ProviderName,
  ProvidersList,
  ProvidersListContainer,
  UserAvatar,
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
  const { user } = useAuth();
  const { navigate } = useNavigation();
  const route = useRoute();
  const routeParams = route.params as RouteParams;
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

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectProvider(providerId);
  }, []);

  return (
    <View>
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
    </View>
  );
};

export default CreateAppointment;
