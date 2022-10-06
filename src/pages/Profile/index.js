import React, { useState, useContext, useEffect } from 'react';
import { Modal, Platform } from 'react-native';
import {
    Container,
    Button,
    ButtonText,
    Email,
    Name,
    UploadButton,
    UploadText,
    Avatar,
    ModalContainer,
    ButtonBack,
    Input,
} from './styles';
//icons
import Feather from 'react-native-vector-icons/Feather'
// context
import { AuthContext } from '../../contexts/auth';
// components
import Header from '../../components/Header';
//firebase
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
//image picker
import { launchImageLibrary } from 'react-native-image-picker';

export default function Profile() {

    const { signOut, user, setUser, storageUser } = useContext(AuthContext);

    const [nome, setNome] = useState(user?.nome);
    const [url, setUrl] = useState(null);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        // para nunca atualizar e carregar esa funcao quando o componente/tela for desmontado
        let isActive = true;
        // funcao ara carregar o avatar do usuario ao abrir a tela
        async function loadAvatar() {
            try {
                if (isActive) {
                    let response = await storage().ref('users').child(user?.uid).getDownloadURL()
                    setUrl(response);
                }
            }
            catch (error) {
                console.log("Nao foi encotrado nenhum avatar para este usuario!");
            }
        }

        loadAvatar();

        return () => isActive = false;
    }, [])

    async function handleSignOut() {
        await signOut();
    }

    async function updateProfile() {
        if (nome === '')
            return;

        await firestore().collection('users')
            .doc(user?.uid)
            .update({
                nome: nome
            })

        // buscar todos os posts desse user e atualizar o nome dele 
        const postDocs = await firestore().collection('posts')
            .where('userId', '==', user?.uid).get()

        // percorrer todos os posts desse user e atualizar 
        postDocs.forEach(async doc => {
            await firestore().collection('posts').doc(doc.id)
                .update({
                    author: nome
                })
        })

        let data = {
            uid: user?.uid,
            nome: nome,
            email: user.email,
        }

        //atualizando o user no context
        setUser(data);
        storageUser(data);
        setOpen(false);
    }

    const uploadImage = () => {
        const options = {
            noData: true,
            mediaType: 'photo'
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('Operação cancelada')
            }
            else if (response.error) {
                console.log('OPs, parece que deu algum erro')
            }
            else {
                // subir image pro firebase
                // a function uploadFileFirebase é uma promise pq ele é async e esta retornando um await 
                uploadFileFirebase(response)
                    .then(() => {
                        uploadAvatarPosts()
                    })

                console.log('URI da FOTO: ', response.assets[0].uri);

                setUrl(response.assets[0].uri);
            }
        })
    }

    const getFileLocalPath = (response) => {
        /// extrair e retornar a url da foto
        return response.assets[0].uri
    }

    const uploadFileFirebase = async (response) => {
        const fileSource = getFileLocalPath(response);
        console.log(fileSource);

        // chamando o storage do firebase
        const storageRef = storage().ref('users').child(user?.uid);

        // retornando imagem para o firebase
        return await storageRef.putFile(fileSource);
    }

    const uploadAvatarPosts = async () => {
        const storageRef = storage().ref('users').child(user?.uid);

        const url = await storageRef.getDownloadURL()
            .then(async (image) => {
                console.log("URL recebida: ", image);
                // atualizar todas as imagens do post desse user
                const postDocs = await firestore().collection('posts').where('userId', '==', user.uid).get();

                // percorrer todos os posts e trocar a url da imagem
                postDocs.forEach(async (doc) => {
                    await firestore().collection('posts').doc(doc.id)
                        .update({
                            avatarUrl: image
                        })
                })
            })
            .catch(error => {
                console.log("Erro ao atualizar o avatar do usuario nos posts ", error);
            })
    }

    return (
        <Container>
            <Header />

            {url ? (
                <UploadButton onPress={uploadImage} activeOpacity={0.8}>
                    <Avatar
                        source={{ uri: url }}
                    />
                </UploadButton>
            ) : (
                <UploadButton onPress={uploadImage} activeOpacity={0.8}>
                    <UploadText>+</UploadText>
                </UploadButton>
            )}

            <Name>{user?.nome}</Name>
            <Email>{user?.email}</Email>

            <Button bg="#428cfd" onPress={() => setOpen(true)} activeOpacity={0.8}>
                <ButtonText color="#fff">Atualizar Perfil</ButtonText>
            </Button>

            <Button bg="#ddd" onPress={handleSignOut} activeOpacity={0.8}>
                <ButtonText color="#353840">Sair</ButtonText>
            </Button>

            <Modal visible={open} animationType="slide" transparent={true}>
                <ModalContainer behavior={Platform.OS === 'ios' ? 'padding' : ''}>
                    <ButtonBack onPress={() => setOpen(false)}>
                        <Feather name='arrow-left' size={22} color='#121212' style={{ paddingRight: 4 }} />
                        <ButtonText color="#121212">Voltar</ButtonText>
                    </ButtonBack>

                    <Input
                        placeholder={user?.nome}
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                    />

                    <Button bg="#428cfd" onPress={updateProfile} activeOpacity={0.8}>
                        <ButtonText color="#fff">Salvar</ButtonText>
                    </Button>
                </ModalContainer>
            </Modal>
        </Container>
    );
}