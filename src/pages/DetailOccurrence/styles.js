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

export const ContainerView = styled(View)`
  display: flex;
  margin: 10px;
`;

export const ContainerButton = styled(View)`
  margin-top: 10%;
  margin-bottom: 10%;
`;

export const Label = styled(Text)`
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    margin-bottom: 12px;
`;

export const ContainerTextArea = styled(View)`
  width: 308px;
  height: 54px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #68B2F8;
  background: #FFF;
`;

export const TextArea = styled(Text)`
  padding: 6px;
  color: #000;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`;

export const TextInput = styled(Text)`
  color: #FFF;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`;

export const ContainerInput = styled(View)`
  border-radius: 3px;
  border: 1px solid #68B2F8;
  background: #68B2F8;
  padding: 8px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const ImageOccurrence = styled.Image`
  width: 100%;
  height: 125px;
`;
