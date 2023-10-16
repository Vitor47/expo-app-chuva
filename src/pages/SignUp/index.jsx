import React, { useState } from "react";
import { Keyboard } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";

import { Alert } from "react-native";
import CityPicker from "../../components/CityPicker";
import DatePicker from "../../components/DatePicker";
import { createUserSchema } from "../../utils/createUserValidation";
import { format } from "date-fns";
import api from "../../services/api";

import {
  Container,
  ErrorText,
  FormArea,
  InputContainer,
  Label,
  ScrollViewContent,
  Link,
  LinkText,
  LinkLogin,
} from "./styles";
import { CustomSubmitButton } from "../../components/Button";
import { CustomHeader } from "../../components/HeaderLogo";

import { CustomInput } from "../../components/InputForm";

export default function App() {
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cpf: "",
      birth_date: new Date(),
      city: "",
    },
    resolver: yupResolver(createUserSchema),
  });

  const onSubmit = async (data) => {
    Keyboard.dismiss();

    try {
      const birthDate = format(new Date(data.birth_date), "yyyy-MM-dd");

      const dataApi = {
        name: data.name,
        email: data.email.toLowerCase(),
        password: data.password,
        cpf: data.cpf,
        birth_date: birthDate,
        city: data.city,
        image: data.image,
      };

      await api.post("/users", dataApi);

      reset({
        name: "",
        email: "",
        cpf: "",
        birth_date: new Date(),
        city: "",
      });
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Erro ao enviar dados:", error.message);
    }
  };

  return (
    <Container>
      <CustomHeader title="Criar Conta" subtitle="Insira os seus dados" />
      <ScrollViewContent>
        <FormArea>
          <CustomInput
            name="name"
            label="NOME COMPLETO"
            placeholder="DIGITE SEU NOME"
            control={control}
            error={errors.name}
          />

          <CustomInput
            name="email"
            label="E-MAIL"
            placeholder="DIGITE SEU E-MAIL"
            control={control}
            error={errors.email}
          />

          <CustomInput
            name="cpf"
            label="CPF"
            placeholder="DIGITE SEU CPF"
            control={control}
            error={errors.cpf}
            type="numeric"
          />

          <InputContainer>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Label>DATA DE NASCIMENTO</Label>
                  <DatePicker
                    value={value}
                    onChange={onChange}
                    showPicker={showDatePicker}
                    setShowPicker={setShowDatePicker}
                  />
                  {errors.birth_date && (
                    <ErrorText>{errors.birth_date.message}</ErrorText>
                  )}
                </>
              )}
              name="birth_date"
            />
          </InputContainer>

          <InputContainer>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Label>Cidade</Label>
                  <CityPicker
                    control={control}
                    value={value}
                    onChange={onChange}
                    errors={errors}
                  />
                </>
              )}
              name="city"
            />
          </InputContainer>

          <CustomInput
            name="password"
            label="SENHA"
            placeholder="DIGITE SUA SENHA"
            control={control}
            error={errors.password}
            secureTextEntry={true}
          />
        </FormArea>
        <InputContainer>
          <CustomSubmitButton
            activeOpacity={0.8}
            onPress={handleSubmit(onSubmit)}
            text="Cadastrar"
          />

          <Link onPress={() => navigation.navigate("SignIn")}>
            <LinkText>
              Já possui uma conta? <LinkLogin>Login</LinkLogin>
            </LinkText>
          </Link>
        </InputContainer>
      </ScrollViewContent>
    </Container>
  );
}
