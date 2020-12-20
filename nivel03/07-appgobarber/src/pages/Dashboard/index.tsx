import React from 'react';
import { View, Text, Button } from 'react-native';

import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>Hello Word!</Text>
      <Button title="Sair" onPress={signOut} />
    </View>
  );
};

export default Dashboard;
