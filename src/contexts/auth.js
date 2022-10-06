import React, { useState, createContext, useEffect } from 'react';
//firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// criando um contexto de autenticação --> valor inicial no createContext como objeto vazio
export const AuthContext = createContext({});

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loadingScreen, setLoadinScreen] = useState(true);

    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('@devapp');

            if (storageUser) {
                setUser(JSON.parse(storageUser));
            }
            setLoadinScreen(false);
        }

        loadStorage();
    }, [])

    async function signUp(email, password, name) {
        setLoadingAuth(true);

        await auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                await firestore().collection('users')
                    .doc(uid).set({
                        nome: name,
                        createdAt: new Date(),
                    })
                    .then(() => {
                        let data = {
                            uid: uid,
                            name: name,
                            email: value.user.email,
                        }
                        setUser(data);
                        storageUser(data);
                        setLoadingAuth(false);
                    })
                    .catch((error) => {
                        console.log(error);
                        setLoadingAuth(false);
                    })
            })
    }

    async function signIn(email, password) {
        setLoadingAuth(true);

        await auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;

                const userProfile = await firestore().collection('users')
                    .doc(uid).get();

                // console.log(userProfile.data().nome)
                let data = {
                    uid: uid,
                    nome: userProfile.data().nome,
                    email: value.user.email,
                };
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
            })
            .catch((error) => {
                console.log(error);
                setLoadingAuth(false);
            })
    }

    async function signOut() {

        // deslogando usuario no firestore
        await auth().signOut();

        // limpando o AsyncStorage
        await AsyncStorage.clear()
            .then(() => {
                setUser(null);
            })
            .catch(() => {

            });
    }

    async function storageUser(data) {
        await AsyncStorage.setItem('@devapp', JSON.stringify(data));
    }

    return (
        // o signed verifica se há um usuario, logado atraves de um valor booleano --> Para transforma o user em booleano foi usado !! 
        // !! => converte a variavel para true/false
        // se houver um objeto dentro de user => entao o signed vai verificar que o user é true
        <AuthContext.Provider
            value={{
                signed: !!user,
                signUp,
                signIn,
                signOut,
                loadingAuth,
                loadingScreen,
                user,
                setUser,
                storageUser,
            }}>
            {children}
        </AuthContext.Provider>
    );
};