import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator, Keyboard, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Container,
  ScrollViewContent,
  ContainerView,
  Label,
  TextArea,
  ContainerTextArea,
  TextInput,
  ContainerInput,
  ImageOccurrence,
  ContainerButton,
} from "./styles";
import { CustomHeader } from "../../components/HeaderLogo";
import { CustomSubmitButton } from "../../components/Button";
import api from "../../services/api";

export default function DetailOccurrence() {
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params.id;

  const [loading, setLoading] = useState(true);
  const [occurrence, setOccurrence] = useState({});

  useEffect(() => {
    async function loadOccurrence() {
      try {
        const token = await AsyncStorage.getItem("@authToken");

        const response = await api.get(`occurrences/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOccurrence(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar a ocorrencia:", error);
      }
    }

    loadOccurrence();
  }, []);

  if (loading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator color="#121212" size={45} />
      </View>
    );
  }

  const onListOccurrence = async () => {
    Keyboard.dismiss();
    navigation.navigate("ListOcurrences");
  };

  const onSubmitDelete = async () => {
    Keyboard.dismiss();

    try {
      const token = await AsyncStorage.getItem("@authToken");
      await api.delete(`occurrences/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigation.navigate("ListOcurrences");
    } catch (error) {
      Alert.alert("Erro ao deletar: ", error.message);
    }
  };

  const titlePage = occurrence.title;
  const getRiskLevelText = {
    1: "Muito Baixo",
    2: "Baixo",
    3: "Médio",
    4: "Alto",
    5: "Muito Alto",
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const imageOccurrence = `https://crud-user-mftn.onrender.com/occurrences/image/${id}`;

  return (
    <Container>
      <CustomHeader title={titlePage} />
      <ScrollViewContent>
        <ContainerView>
          <Label>DESCRIÇÂO</Label>
          <ContainerTextArea>
            <TextArea>{occurrence.description}</TextArea>
          </ContainerTextArea>
        </ContainerView>

        <ContainerView>
          <Label>CATEGORIA</Label>
          <ContainerInput>
            <TextInput>{capitalizeFirstLetter(occurrence.category)}</TextInput>
          </ContainerInput>
        </ContainerView>

        <ContainerView>
          <Label>NÍVEL DE RISCO</Label>
          <ContainerInput>
            <TextInput>{getRiskLevelText[occurrence.risk_level]}</TextInput>
          </ContainerInput>
        </ContainerView>

        <ContainerView>
          <Label>STATUS</Label>
          <ContainerInput>
            <TextInput>{capitalizeFirstLetter(occurrence.status)}</TextInput>
          </ContainerInput>
        </ContainerView>

        <ContainerView>
          <Label>FOTOGRAFIA DA OCORRÊNCIA</Label>
          <ContainerInput>
            <ImageOccurrence source={{ uri: imageOccurrence }} />
          </ContainerInput>
        </ContainerView>

        <ContainerButton>
          <CustomSubmitButton
            activeOpacity={0.8}
            onPress={() => onSubmitDelete()}
            text="Excluir"
          />
          <CustomSubmitButton
            activeOpacity={0.8}
            onPress={() => onListOccurrence()}
            text="Lista de Ocorrências"
          />
        </ContainerButton>
      </ScrollViewContent>
    </Container>
  );
}
