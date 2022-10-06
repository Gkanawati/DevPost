import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// pages
import Login from '../pages/Login';

const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Login'
                component={Login}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}