import React from 'react';
import { StatusBar } from 'react-native';
// navegação
import { NavigationContainer } from '@react-navigation/native';
// rotas
import Routes from './src/routes';
// context
import AuthProvider from './src/contexts/auth';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor="#36393F" barStyle="light-content" translucent={false} />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}