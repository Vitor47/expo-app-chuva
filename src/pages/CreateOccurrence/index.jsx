import React, { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keyboard, Alert, View, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { createOccurrenceSchema } from "../../utils/createOccurenceValidation";
import {
  Container,
  ErrorText,
  FormArea,
  InputContainer,
  Label,
  ScrollViewContent,
  ContainerButton,
} from "./styles";
import { CustomHeader } from "../../components/HeaderLogo";
import { CustomSubmitButton } from "../../components/Button";
import { CustomInput } from "../../components/InputForm";
import CategoryPicker from "../../components/CategoryPicker";
import RiskLevelPicker from "../../components/RiskLevelPicker";
import StatusPicker from "../../components/StatusPicker";
import ImagePickerComponent from "../../components/ImagePicker";
import api from "../../services/api";

export default function CreateOccurrence() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [localizacao, setLocalizacao] = useState({
    latitude: -29.698638657622553,
    longitude: -53.51801818953788,
  });

  const [mapRegion, setMapRegion] = useState({
    latitude: -29.698638657622553,
    longitude: -53.51801818953788,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const titlePage = "Criar Ocorrência";
  const subTitlePage = "Insira os seus dados";
  const handleGetLocation = async () => {
    try {
      setLoading(true);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "A permissão de localização é necessária para usar esta funcionalidade."
        );
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = coords;

      setLocalizacao({
        latitude,
        longitude,
      });

      setMapRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error("Erro ao obter a localização:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetLocation();
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      status: "",
      risk_level: 0,
      latitude: 0,
      longitude: 0,
      image: "",
    },
    resolver: yupResolver(createOccurrenceSchema),
  });

  const onListOccurrence = async () => {
    Keyboard.dismiss();
    navigation.navigate("ListOcurrences");
  };

  const onSubmitCreate = async (data) => {
    Keyboard.dismiss();

    try {
      const token = await AsyncStorage.getItem("@authToken");
      const dataApi = new FormData();
      dataApi.append("title", data.title);
      dataApi.append("description", data.description);
      dataApi.append("category", data.category);
      dataApi.append("status", data.status);
      dataApi.append("risk_level", Number(data.risk_level));
      dataApi.append("latitude", Number(localizacao.latitude));
      dataApi.append("longitude", Number(localizacao.longitude));

      if (data.image) {
        const photo = {
          uri: data.image,
          type: "image/jpeg",
          name: "photo.jpg",
        };
        dataApi.append("image", photo);
      }
      
      await api.post(`occurrences/`, dataApi, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      reset({
        title: "",
        description: "",
        category: "",
        status: "",
        risk_level: 0,
        latitude: 0,
        longitude: 0,
        image: "",
      });
      navigation.navigate("ListOcurrences");
    } catch (error) {
      Alert.alert("Erro ao criar: ", error.message);
    }
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
      <CustomHeader title={titlePage} subtitle={subTitlePage} />
      <ScrollViewContent>
        <FormArea>
          <CustomInput
            name="title"
            label="TÍTULO"
            placeholder="DIGITE O TÍTULO"
            control={control}
            error={errors.title}
          />

          <CustomInput
            name="description"
            label="DESCRIÇÃO"
            placeholder="ESCREVA UM BREVE RESUMO"
            control={control}
            error={errors.description}
          />

          <InputContainer>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Label>CATEGORIA</Label>
                  <CategoryPicker
                    control={control}
                    value={value}
                    onChange={onChange}
                    errors={errors}
                  />
                </>
              )}
              name="category"
            />
          </InputContainer>

          <InputContainer>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Label>NÍVEL DE RISCO</Label>
                  <RiskLevelPicker
                    control={control}
                    value={value}
                    onChange={onChange}
                    errors={errors}
                  />
                </>
              )}
              name="risk_level"
            />
          </InputContainer>

          <InputContainer>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Label>STATUS</Label>
                  <StatusPicker
                    control={control}
                    value={value}
                    onChange={onChange}
                    errors={errors}
                  />
                </>
              )}
              name="status"
            />
          </InputContainer>

          <InputContainer>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Label>FOTOGRAFIA DA OCORRÊNCIA</Label>
                  <ImagePickerComponent onChange={onChange} value={value} />
                  {errors.image && (
                    <ErrorText>{errors.image.message}</ErrorText>
                  )}
                </>
              )}
              name="image"
            />
          </InputContainer>

          <InputContainer>
            <Label>LOCALIZAÇÃO</Label>
            <MapView
              style={{ width: "90%", height: 300, marginTop: 12 }}
              initialRegion={{
                latitude: localizacao.latitude,
                longitude: localizacao.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              region={mapRegion}
            >
              <Marker
                coordinate={{
                  latitude: localizacao.latitude,
                  longitude: localizacao.longitude,
                }}
                title="Minha Localização"
                description="Estou aqui!"
              />
            </MapView>
          </InputContainer>

          <ContainerButton>
            <CustomSubmitButton
              activeOpacity={0.8}
              onPress={handleSubmit(onSubmitCreate)}
              text="Cadastrar"
            />
            <CustomSubmitButton
              activeOpacity={0.8}
              onPress={() => onListOccurrence()}
              text="Lista de Ocorrências"
            />
          </ContainerButton>
        </FormArea>
      </ScrollViewContent>
    </Container>
  );
}
