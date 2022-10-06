import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// pages
import Home from "../pages/Home";
import NewPost from '../pages/NewPost';
import PostsUser from '../pages/PostsUser';
import Search from '../pages/Search';
import Profile from '../pages/Profile';
//icons
import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AppRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#FFF',

                tabBarStyle: {
                    backgroundColor: '#202225',
                    borderTopWidth: 0,
                }
            }}
        >
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name="home" color={color} size={size} />
                    }
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name="search" color={color} size={size} />
                    }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name="user" color={color} size={size} />
                    }
                }}
            />
        </Tab.Navigator>
    );
};

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="NewPost"
                component={NewPost}
                options={{
                    title: 'Novo Post',
                    headerTintColor: '#FFF',
                    headerStyle: {
                        backgroundColor: '#36393F'
                    }
                }}
            />

            <Stack.Screen
                name="PostsUser"
                component={PostsUser}
                options={{
                    headerTintColor: '#FFF',
                    headerStyle: {
                        backgroundColor: '#36393F'
                    }
                }}
            />
        </Stack.Navigator>
    )
}