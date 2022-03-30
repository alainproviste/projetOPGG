import styled from 'styled-components';

const Logo = styled.Image`
    height: 60px;
    width: 150px;
`

const Title = styled.Text`
    font-size: 20px;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 5px;
`

const TitlePage = styled.Text`
    font-size: 40px;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 5px;
    color: #000;
`

const Text = styled.Text`
    color: #000;
    font-size: 10px;
    padding: 8px;
    text-align: center;
`

const TextCard = styled.Text`
    color: #000;
    font-size: 12px;
    padding: 8px;
    text-align: center;
`

const FieldSet = styled.View`
    margin: 5px 10px;
    background-color: #ddd;
    border-radius: 7px;
`

const CenteredText = styled.Text`
    font-size: 20px;
    color: #000;
    background-color: #eee;
    text-align: center;
`

const TextInput = styled.TextInput`
    border: 1px #000;
    margin: 5px;
`

const LoadingMessage = styled.Text`
    font-size: 30px;
    text-align: center;
`

const TouchableSurface = styled.TouchableOpacity``


export { Logo, Title, TitlePage, Text, TextCard, FieldSet, CenteredText, TouchableSurface, LoadingMessage, TextInput }