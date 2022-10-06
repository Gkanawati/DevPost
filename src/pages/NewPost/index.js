import React, { useLayoutEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from '../../contexts/auth';
import {
    Text,
    View,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    TouchableOpacity
} from 'react-native';
import {
    Container,
    Button,
    Input,
    ButtonText,
    InputContainer,
    ButtonArea
} from './styles';
// navigation
import { useNavigation } from '@react-navigation/native';
// icons
import Feather from 'react-native-vector-icons/Feather';
//firebase
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';


export default function NewPost() {

    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const [post, setPost] = useState('');

    const ref_Input = useRef();

    // é sincrono -> a interface so é carregada quando o useLayoutEffect é finalizado
    useLayoutEffect(() => {

        const options = navigation.setOptions({
            headerRight: () => (
                <Button activeOpacity={0.8} onPress={handlePost}>
                    <ButtonText>Compartilhar</ButtonText>
                </Button>
            )
        })

    }, [navigation, post])

    async function handlePost() {
        if (post === '') {
            Alert.alert(
                "Ops! ",
                `Preencha seu post corretamente! `,
            );
            Keyboard.dismiss();
            setInput('');
            setLoading(false);
            return;
        }

        let avatarUrl = null;

        try {

            let response = await storage().ref('users').child(user?.uid).getDownloadURL();
            avatarUrl = response;

        } catch (error) {
            avatarUrl = null;
        }

        await firestore().collection('posts')
            .add({
                createdAt: new Date(),
                content: post,
                author: user?.nome,
                userId: user?.uid,
                likes: 0,
                avatarUrl,
            })
            .then(() => {
                setPost('')
                Keyboard.dismiss();
                navigation.goBack();
                console.log('Post Criado Com sucesso')
            })
            .catch((error) => {
                alert('Erro ao criar o post', error);
                Keyboard.dismiss();
            })

    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Container>
                <InputContainer activeOpacity={1} onPress={() => ref_Input.current.focus()}>
                    <Input
                        placeholder="O que está acontecendo?"
                        value={post}
                        onChangeText={(Text) => setPost(Text)}
                        // autoCorrect={false}
                        multiline={true}
                        placeholderTextColor='#777'
                        maxLength={300}
                        onSubmtingEditing={() => Keyboard.dismiss()}
                        ref={ref_Input}
                        onFocus={() => { () => this.setState({ isFocused: true }) }}
                        onBlur={() => { () => this.setState({ isFocused: false }) }}
                    />
                </InputContainer>
                <ButtonArea>
                    <Button
                        onPress={handlePost}
                        activeOpacity={0.8}
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Feather name='share' color='#fff' size={20} style={{ marginRight: '3%' }} />
                        <ButtonText style={{ fontSize: 15 }}>Compartilhar</ButtonText>
                    </Button>
                </ButtonArea>
            </Container>
        </TouchableWithoutFeedback>
    );
}