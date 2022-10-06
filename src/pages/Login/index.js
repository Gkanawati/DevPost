import React, { useState, useContext } from 'react';
import { View, Text, Alert, Platform, ActivityIndicator, TouchableOpacity } from 'react-native';
import {
    Background,
    Container,
    Title,
    Input,
    Button,
    ButtonText,
    SignUpButton,
    SignUpText,
    InputCont,
} from './styles';
// context
import { AuthContext } from '../../contexts/auth';
import Feather from 'react-native-vector-icons/Feather';
// animatable
import * as Animatable from 'react-native-animatable';

const TitleAnimated = Animatable.createAnimatableComponent(Title);

export default function Login() {

    // Fazendo renderização condicional com uma variável
    // controla se vai mostrar a tela de login ou de cadastro
    const [login, setLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signUp, signIn, loadingAuth } = useContext(AuthContext);
    // controle exibição de senha e icon eye
    const [secure, setSecure] = useState(true);

    function toggleLogin() {
        // inverte o valor da var login
        setLogin(!login);
        setEmail('');
        setName('');
        setPassword('');
    }

    async function handleSignIn() {
        if (email === '' || password === '') {
            Alert.alert(
                "Aviso",
                `Preencha todos os campos corretamente`,
            );
        }

        await signIn(email, password)
    }

    function handleSignUp() {
        if (email === '' || password === '' || name === '') {
            Alert.alert(
                'Aviso',
                'Preencha todos os campos corretamente',
            )
        }
        signUp(email, password, name)
    }

    if (login) {
        return (
            <Background>
                <Container>
                    <TitleAnimated animation='flipInY'>
                        Dev<Text style={{ color: '#E52246' }}>Post</Text>
                    </TitleAnimated>

                    <InputCont>
                        <Input
                            placeholder="seuemail@teste.com"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </InputCont>

                    <InputCont>
                        <Input
                            placeholder="******"
                            type="Password"
                            secureTextEntry={secure}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            Background="transparent"
                        />
                        <TouchableOpacity onPress={() => setSecure(!secure)}>
                            {secure ? (<Feather size={20} name='eye' style={{ paddingLeft: 20, }} />) : (<Feather size={20} name='eye-off' style={{ paddingLeft: 20, }} />)}
                        </TouchableOpacity>
                    </InputCont>

                    <Button onPress={handleSignIn}>
                        {loadingAuth ? (
                            <ActivityIndicator size={25} color="#fff" style={{ paddingVertical: 1 }} />
                        )
                            : (
                                <ButtonText>Entrar</ButtonText>
                            )}
                    </Button>

                    <SignUpButton onPress={toggleLogin}>
                        <SignUpText>Criar uma Conta</SignUpText>
                    </SignUpButton>
                </Container>
            </Background>
        )
    }
    return (
        <Background>
            <Container behavior={Platform.OS === "ios" ? "padding" : ""} enable>
                <TitleAnimated animation='flipInX'>
                    Dev<Text style={{ color: '#E52246' }}>Post</Text>
                </TitleAnimated>
                <InputCont>
                    <Input
                        placeholder="Seu nome"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </InputCont>

                <InputCont>
                    <Input
                        placeholder="seuemail@teste.com"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </InputCont>

                <InputCont>
                    <Input
                        placeholder="******"
                        type="Password"
                        secureTextEntry={secure}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        Background="transparent"
                    />
                    <TouchableOpacity onPress={() => setSecure(!secure)}>
                        {secure ? (<Feather size={20} name='eye' style={{ paddingLeft: 20, }} />) : (<Feather size={20} name='eye-off' style={{ paddingLeft: 20, }} />)}
                    </TouchableOpacity>
                </InputCont>

                <Button onPress={handleSignUp}>
                    {loadingAuth ? (
                        <ActivityIndicator size={25} color="#fff" style={{ paddingVertical: 1 }} />
                    ) : (
                        <ButtonText>Cadastrar</ButtonText>
                    )}
                </Button>

                <SignUpButton onPress={toggleLogin}>
                    <SignUpText>Já tenho uma conta</SignUpText>
                </SignUpButton>
            </Container>
        </Background>
    );
}