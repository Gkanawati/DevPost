import React, { useLayoutEffect, useState, useCallback, useContext } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Container, TitlePost, ListPosts } from './styles';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
//firebase
import firestore from '@react-native-firebase/firestore';
import Post from '../../components/Post';
import { AuthContext } from '../../contexts/auth';

export default function PostsUser() {

    const route = useRoute();
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);

    const [title, setTitle] = useState(route.params?.title);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const userId = route.params?.userId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: title === '' ? '' : title
        })
    }, [navigation, title])

    useFocusEffect(
        useCallback(() => {
            //apenas ativa o useCallback e realiza as funcoes quando a pagina esta ativa na tela
            let isActive = true;

            firestore().collection('posts')
                .where('userId', '==', userId)
                .orderBy('createdAt', 'desc')
                .get()
                .then((snapshot) => {
                    const postList = [];

                    snapshot.docs.map(item => {
                        postList.push({
                            ...item.data(),
                            id: item.id
                        })
                    })

                    if (isActive) {
                        setPosts(postList);
                        setLoading(false);
                    }

                    // console.log('POST USER')
                    // console.log(postList);
                })



            return () => {
                isActive = false;
            }

        }, [])
    )

    return (
        <Container>
            {loading ?
                (
                    <View style={{ flex: 1, justifyContent: 'center', alignItem: 'center' }}>
                        <ActivityIndicator size={45} color='#E52246' />
                    </View>
                )
                :
                (
                    <>
                        {posts.length == 0 ? (
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 17, padding: 10, textAlign: 'center' }}>Esse usuário ainda não realizou nenhum post.</Text>
                            </View>
                        ) : (
                            <>
                                <TitlePost>Posts Recentes</TitlePost>
                                <ListPosts
                                    data={posts}
                                    renderItem={({ item }) => <Post content={item} userId={user?.uid} />}
                                    showsVerticalScrollIndicator={false}
                                />
                            </>
                        )}

                    </>
                )
            }
        </Container>
    );
}