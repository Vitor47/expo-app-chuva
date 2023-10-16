import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator, Keyboard, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Container, ScrollViewContent } from "./styles";
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
        console.log(error);

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
      await api.delete(`occurrence/${id}/`);

      navigation.navigate("ListOcurrences");
    } catch (error) {
      Alert.alert("Erro ao deletar: ", error.message);
    }
  };

  const titlePage = occurrence.title;

  return (
    <Container>
      <CustomHeader title={titlePage} />
      <ScrollViewContent>
        <CustomSubmitButton
          activeOpacity={0.8}
          onPress={() => (onSubmitDelete)}
          text="Excluir"
        />
        <CustomSubmitButton
          activeOpacity={0.8}
          onPress={() => (onListOccurrence)}
          text="Lista de Ocorrências"
        />
      </ScrollViewContent>
    </Container>
  );
}
