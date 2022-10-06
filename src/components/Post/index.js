import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
    Container,
    Name,
    Header,
    Avatar,
    ContentView,
    TextPost,
    Actions,
    LikeButton,
    Likes,
    TimePost,
} from './styles';
//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//navigation
import { useNavigation } from '@react-navigation/native';
//date
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import firestore from '@react-native-firebase/firestore';

export default function Post({ content, userId }) {

    const [likes, setLikes] = useState(content?.likes);
    console.log(content);
    const navigation = useNavigation();

    async function handleLikePost(id, likes) {
        const docId = `${userId}_${id}`;

        // A collection de likes serve para verificar se o usuario ja curtiu aquele post
        // Na collection de posts altera-se o numero de likes do post
        // checar se o post ja foi curtido
        const doc = await firestore().collection('likes').doc(docId).get();

        if (doc.exists) {
            //quer dizer que ja curtiu o post => entao deve remover o like
            await firestore().collection('posts')
                .doc(id).update({
                    likes: likes - 1
                })

            await firestore().collection('likes').doc(docId).delete()
                .then(() => {
                    setLikes(likes - 1);
                })

            return;
        }

        // para dar o like no post
        await firestore().collection('likes').doc(docId)
            .set({
                postId: id,
                userId: userId
            })

        await firestore().collection('posts')
            .doc(id).update({
                likes: likes + 1
            })
            .then(() => {
                setLikes(likes + 1);
            })
    }

    function formatTimePost() {
        // console.log(new Date(content.createdAt.seconds * 1000));

        const datePost = new Date(content?.createdAt.seconds * 1000);

        return formatDistance(
            new Date(),
            datePost,
            {
                locale: ptBR,
            }
        )
    }

    return (
        <Container>
            <Header activeOpacity={0.7} onPress={() => navigation.navigate('PostsUser', { title: content.author, userId: content.userId })} >
                {
                    content.avatarUrl ?
                        <Avatar
                            source={{ uri: content?.avatarUrl }}
                        />
                        :
                        <Avatar
                            source={require('../../assets/avatar.png')}
                        />
                }
                < Name numberOfLines={1} >
                    {content?.author}
                </Name>
            </Header >

            <ContentView>
                <TextPost>
                    {content?.content}
                </TextPost>
            </ContentView>

            <Actions>
                <LikeButton onPress={() => handleLikePost(content.id, likes)}>
                    <Text style={content?.likes != 0 ? { color: '#E52246', marginRight: 6, } : { color: '#777', marginRight: 0, }}>
                        {likes === 0 ? '' : likes}
                    </Text>
                    {
                        likes === 0 ?
                            <MaterialCommunityIcons name='heart-plus-outline' size={20} color='#E52246' />
                            :
                            <MaterialCommunityIcons name='cards-heart' size={20} color='#E52246' />
                    }
                </LikeButton>

                <TimePost>
                    {formatTimePost()}
                </TimePost>
            </Actions>


        </Container >
    );
}