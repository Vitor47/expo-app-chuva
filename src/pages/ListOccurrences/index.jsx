import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
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
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [occurrences, setOccurrences] = useState([]);

  const loadOccurrences = async () => {
    try {
      const token = await AsyncStorage.getItem("@authToken");
      const response = await api.get(`occurrences`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOccurrences(response.data.data);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error("Erro ao carregar as ocorrencias:", error);
    }
  };

  useEffect(() => {
    loadOccurrences();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setOccurrences([]);
    loadOccurrences();
  };

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

          <Link onPress={() => navigation.navigate("CreateOccurrence")}>
            <LinkText>Nova Ocorrência</LinkText>
          </Link>
        </MarginHeader>
      </Header>

      <FlatList
        data={occurrences}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <OcurrencesList data={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </Container>
  );
}
