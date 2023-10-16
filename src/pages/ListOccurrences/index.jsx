import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";
import {
  Container,
  Header,
  Title,
  IconImage,
  Link,
  LinkText,
  MarginHeader,
} from "./styles";
import { OcurrencesList } from "../../components/Card";
import IconLocal from "../../../assets/iconlocal.png";

export default function ListOccurrences() {
  const [loading, setLoading] = useState(true);
  const [occurrences, setOccurrences] = useState([]);

  useEffect(() => {
    async function loadOccurrences() {
      try {
        const token = await AsyncStorage.getItem("@authToken");
        const response = await api.get(`occurrences`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOccurrences(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar as ocorrencias:", error);
      }
    }

    loadOccurrences();
  }, []);

  if (loading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator color="#121212" size={45} />
      </View>
    );
  }

  return (
    <Container>
      <Header>
        <MarginHeader>
          <Title>
            <IconImage source={IconLocal} />
            Ocorrências perto de você
          </Title>

          <Link onPress={() => navigation.navigate("CreateOcurrence")}>
            <LinkText>Nova Ocorrência</LinkText>
          </Link>
        </MarginHeader>
      </Header>

      <FlatList
        data={occurrences}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <OcurrencesList data={item} />}
      />
    </Container>
  );
}
