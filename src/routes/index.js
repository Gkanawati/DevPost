import React, { useState, useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
// rotas
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import { AuthContext } from '../contexts/auth';

export default function Routes() {

    const { signed, loadingScreen } = useContext(AuthContext)

    if (loadingScreen) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#36393f' }}>
                <ActivityIndicator size={40} color='#E52246' />
            </View>
        )
    }

    return (
        signed ? <AppRoutes /> : <AuthRoutes />
    );
}