import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import {
    Container,
    AreaInput,
    Input,
    List
} from './styles';
//icons  
import Feather from 'react-native-vector-icons/Feather';
//firebase
import firestore from '@react-native-firebase/firestore';
import SearchList from '../../components/SearchList';

export default function Search() {

    const [input, setInput] = useState('');
    const [users, setUsers] = useState([]);

    // chama o useEffect quando o valor do input for alterado
    useEffect(() => {

        if (input === '' || input === undefined) {
            setUsers([]);
            return;
        }

        const subscriber = firestore().collection('users')
            .where('nome', '>=', input)
            .where('nome', '<=', input + "\uf8ff")
            .onSnapshot(snapshot => {
                const listUsers = [];

                snapshot.forEach(doc => {
                    listUsers.push({
                        ...doc.data(),
                        id: doc.id,
                    })
                })

                // console.log("LISTA DE USERS")
                // console.log(listUsers);

                setUsers(listUsers);
            })

        return () => {
            subscriber();
        }
    }, [input])

    return (
        <Container>
            <AreaInput>
                <Feather
                    name='search'
                    size={20}
                    color='#E52246'
                />

                <Input
                    placeholder="Procurando alguém?"
                    value={input}
                    onChangeText={(text) => setInput(text)}
                    placeholderTextColor="#353840"
                />
            </AreaInput>

            <List
                data={users}
                renderItem={({ item }) => <SearchList content={item} />}
            />
        </Container>
    );
}