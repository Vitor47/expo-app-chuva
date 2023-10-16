import styled from "styled-components/native";
import { Text, View, SafeAreaView, ScrollView } from "react-native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #F0F4FF;
  padding-bottom: 12%;
`;

export const ScrollViewContent = styled(ScrollView)`
  padding: 20px;
`;


export const Header = styled(View)`
    width: 100%;
    height: 160px;
    border-radius: 5px;
    background-color: #68B2F8;
`;


export const Title = styled(Text)`
    color: #FFF;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    height: 100px;
    margin-top: 12px;
`;


export const IconImage = styled.Image`
    z-index: 9;
`;

export const Link = styled.TouchableOpacity`
  align-self: flex-end;
  padding: 6px;
  border-radius: 5px;
  border: #fff;
`;

export const LinkText = styled.Text`
    color: #FFF;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
`;


export const MarginHeader = styled(View)`
    margin: 12px;
`;
