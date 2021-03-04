import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';
import {
  Container,
  Header,
  HeaderTitle,
  ProfileButton,
  ProvidersList,
  UserAvatar,
  UserName,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const { signOut, user } = useAuth();

  const { navigate } = useNavigation();

  useEffect(() => {
    api
      .get('providers')
      .then(response => {
        setProviders(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const navidateToProfile = useCallback(() => {
    // navigate('Profile');
    signOut();
  }, [signOut]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo,
          {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navidateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>
      <ProvidersList
        keyExtractor={provider => provider.id}
        data={providers}
        renderItem={({ item }) => <UserName>{item.name}</UserName>}
      />
    </Container>
  );
};

export default Dashboard;
