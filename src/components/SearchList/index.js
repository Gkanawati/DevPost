import React from 'react';
import { View } from 'react-native';
import { Container, Name } from './styles';
import { useNavigation } from '@react-navigation/native';

export default function SearchList({ content }) {
    const navigation = useNavigation();

    return (
        <Container onPress={() => navigation.navigate('PostsUser', { title: content.nome, userId: content.id })}>
            <Name>
                {content.nome}
            </Name>
        </Container>
    );
}