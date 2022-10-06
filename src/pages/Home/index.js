import React, { useState, useContext, useCallback } from 'react';
import { View, Text, ActivityIndicator, FlatList, SnapshotViewIOSComponent } from 'react-native';
import {
    ButtonPost,
    Container,
    ListPosts,
} from './styles';
// firebase
import firestore from '@react-native-firebase/firestore';
// navigation
import { useNavigation, useFocusEffect } from '@react-navigation/native';
//icons
import Feather from 'react-native-vector-icons/Feather';
// components
import Header from '../../components/Header';
// context
import { AuthContext } from '../../contexts/auth';
import Post from '../../components/Post';

export default function Home() {

    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    // controlar o refresh da lista
    const [loadingRefresh, setLoadingRefresh] = useState(false);
    const [lastItem, setLastItem] = useState('');
    const [emptyList, setEmptyList] = useState(false);

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            function fetchPosts() {
                firestore().collection('posts').orderBy('createdAt', 'desc').limit(5).get()
                    .then((snapshot) => {
                        if (isActive) {
                            setPosts([]);
                            const postList = [];

                            snapshot.docs.map(item => {
                                postList.push({
                                    ...item.data(),
                                    id: item.id,
                                })
                            })

                            // !!snapshot.empty => confere se a lista esta vazia atraves de um booleano.
                            setEmptyList(!!snapshot.empty)
                            setPosts(postList);
                            setLastItem(snapshot.docs[snapshot.docs.length - 1]);
                            // pega o ultimo item da lista => posts mais antigos
                            // snapshot.docs[snapshot.docs.length - 1] => é a posicao que sempre esta o ultimo post da lista
                            // console.log(snapshot.docs[snapshot.docs.length - 1]);
                            setLoading(false);
                        }
                    })
            }

            fetchPosts();

            return () => {
                isActive = false;
            }

        }, [])
    )

    // Refresh da FlatList, quando puxar pra cima
    async function handleRefreshPosts() {
        setLoadingRefresh(true);
        firestore().collection('posts').orderBy('createdAt', 'desc').limit(5).get()
            .then((snapshot) => {
                setPosts([]);
                const postList = [];

                snapshot.docs.map(item => {
                    postList.push({
                        ...item.data(),
                        id: item.id,
                    })
                })

                setEmptyList(false);
                setPosts(postList);
                setLastItem(snapshot.docs[snapshot.docs.length - 1])
                setLoading(false);
            })

        setLoadingRefresh(false);
    }

    // Infinite Scroll => buscar mais posts quando chegar no final da lista
    async function getListPosts() {
        if (emptyList) {
            // se buscou toda a sua lista => tiramos o loading
            setLoading(false);
            return null;
        }

        if (loading) {
            return;
        }

        firestore().collection('posts').orderBy('createdAt', 'desc').limit(5).startAfter(lastItem)
            .get()
            .then((snapshot) => {
                const postList = [];

                snapshot.docs.map(u => {
                    postList.push({
                        ...u.data(),
                        id: u.id,
                    })
                })

                setEmptyList(!!snapshot.empty);
                setLastItem(snapshot.docs[snapshot.docs.length - 1]);
                // agrupar aos posts, os posts novos => repassa os posts antigos e os posts novos
                setPosts(oldPosts => [...oldPosts, ...postList]);
                setLoading(false);
            })

    }

    return (
        <Container>
            <Header />

            {loading ?
                (
                    <View style={{ flex: 1, justifyContent: 'center', alignItem: 'center' }}>
                        <ActivityIndicator size={45} color='#E52246' />
                    </View>
                )
                :
                (
                    <ListPosts
                        data={posts}
                        renderItem={({ item }) => <Post content={item} userId={user?.uid} />}
                        showsVerticalScrollIndicator={false}
                        refreshing={loadingRefresh}
                        onRefresh={handleRefreshPosts}
                        // infinite Scroll = > buscar posts mais antigos ao chegar no final
                        onEndReached={() => getListPosts()}
                        onEndReachedThreshold={0.2}
                    />

                    // <FlatList onEndReachedThreshold={} onEndReached/>
                )
            }
            <ButtonPost activeOpacity={0.7} onPress={() => navigation.navigate('NewPost')}>
                <Feather name='edit-2'
                    color='#fff' size={23} />
            </ButtonPost>
        </Container>
    );
}