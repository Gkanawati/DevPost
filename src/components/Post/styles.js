import styled from 'styled-components/native';

export const Container = styled.View`
    margin: 8px 2%;
    background-color: #FFF;
    border-radius: 8px;
    box-shadow: 1px 1px 3px rgba(0,0,0,.6);
    elevation: 3;
    padding: 11px;
`;

export const Header = styled.TouchableOpacity`
    width: 100%;
    flex-direction: row;
    align-items: center;
    padding-bottom: 5px;
`;

export const Avatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 100px;
    margin-right: 6px;
`;

export const ContentView = styled.View`
    
`;

export const Name = styled.Text`
    color: #353840;
    font-size: 18px;
    font-weight: bold;
`;

export const TextPost = styled.Text`
    color: #353840;
    margin: 4px 0;
`;

export const Actions = styled.View`
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
`;

export const LikeButton = styled.TouchableOpacity`
    width: 45px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

export const TimePost = styled.Text`
    color: #121212;
`;