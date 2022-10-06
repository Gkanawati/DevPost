import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #404349;
`;

export const InputContainer = styled.TouchableOpacity`
    background-color: #fff;
    flex: 2;
    border-radius: 8px;
    margin: 10px;
    max-height: 250px;
`;

export const ButtonArea = styled.View`
    flex: 2;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const Input = styled.TextInput`
    background-color: transparent;
    margin: 10px;
    font-size: 18px;
    color: #222;
`;

export const Button = styled.TouchableOpacity`
    background-color: #418CFD;
    padding: 5px 12px;
    margin-right: 7px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
`;

export const ButtonText = styled.Text`
    color: #fff;
`;