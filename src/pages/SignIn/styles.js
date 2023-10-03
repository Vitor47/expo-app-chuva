import styled from 'styled-components/native';

export const Background = styled.View`
  flex:1;
  background-color: #F0F4FF;
`;

export const Container = styled.KeyboardAvoidingView`
  flex:1;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  margin-top: 16%;
  margin-bottom: 25px;
  width: 60%;
  height: 36%;
`;

export const AreaInput = styled.View`
  flex-direction: column;
  width: 100%;
  padding: 4%;
  border-radius: 8px;
`;

export const TextLabel = styled.Text`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  font-family: ${({theme}) => theme.fonts.regular}
`;

export const Input = styled.TextInput`
  color: #000;
  font-size: 10px;
  font-weight: 400;
  border-bottom-width: 1px;
  border-bottom-color: #000000;
  padding: 6px 0px 6px 0px;
  font-family: ${({theme}) => theme.fonts.regular}
`;


export const SubmitButton = styled.TouchableOpacity`
  width: 90%;
  height: 55px;
  margin-top: 6%;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: rgba(104, 178, 248, 0.85);
`;

export const SubmitText = styled.Text`
  color: #FFF;
  color: #FFF;
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  font-family: ${({theme}) => theme.fonts.regular}
`;

export const Link = styled.TouchableOpacity`
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: ${({theme}) => theme.fonts.regular}
`;

export const LinkText = styled.Text`
  color: #171717;
  color: rgba(2, 2, 2, 0.79);
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  font-family: ${({theme}) => theme.fonts.regular}
`;