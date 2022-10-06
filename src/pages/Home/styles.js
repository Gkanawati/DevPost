import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: #36393F;
`;

export const ButtonPost = styled.TouchableOpacity`
    position: absolute;
    bottom: 5%;
    right: 6%;
    width: 50px;
    height: 50px;
    background-color: #202225;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    z-index: 99;
`;

export const ListPosts = styled.FlatList`
    flex: 1;
    background-color: #f1f1f1;
`;