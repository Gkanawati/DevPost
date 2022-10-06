import styled from 'styled-components/native';

export const Background = styled.View`
  flex: 1;
  background-color: #36393f;
`;


/* o KeyboardAvoidingView é uma view mas que joga a tela para cima quando o input é selecionado */
export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
    color: #fff;
    font-size: 65px;
    font-weight: bold;
    font-style: italic;
    margin-bottom: 15%;
`;

export const Input = styled.TextInput`
    width: 80%;
    font-size: 17px;
`;

export const InputCont = styled.View`
    flex-direction: row;
    align-items: center;
    width: 80%;
    background-color: #fff;
    margin-top: 10px;
    border-radius: 8px;
    padding: 5px 10px 5px 10px;
    padding-left: 20px;
`;

export const Button = styled.TouchableOpacity`
    width: 80%;
    background-color: #418cfd;
    border-radius: 8px;
    margin-top: 10px;
    padding: 10px;
    align-items: center;
    justify-content: center;
`;

export const ButtonText = styled.Text`
    color: #fff;
    font-size: 20px;
`;

export const SignUpButton = styled.TouchableOpacity`
    width: 100%;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
`;

export const SignUpText = styled.Text`
    color: #ddd;
    font-size: 15px;
`;

