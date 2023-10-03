import React, { useState } from "react";
import { Keyboard } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from '@react-navigation/native'

import { Alert } from 'react-native';
import CityPicker from "../../components/CityPicker";
import DatePicker from "../../components/DatePicker";
import TextInput from "../../components/TextInput";
import { createUserSchema } from '../../utils/createUserValidation';
import { format } from 'date-fns';
import api from '../../services/api';
import { Container, ErrorText, Header, FormArea, InputContainer, Label, ScrollViewContent, Button, ButtonText } from './styles';

export default function App() {
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
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
      const birthDate = format(new Date(data.birth_date), 'yyyy-MM-dd');

      const dataApi = {
        name: data.name,
        email: data.email.toLowerCase(),
        password: data.password,
        cpf: data.cpf,
        birth_date: birthDate,
        city: data.city,
        image: data.image,
      };

      await api.post('/users', dataApi);

      reset({
        name: "",
        email: "",
        cpf: "",
        birth_date: new Date(),
        city: "",
      });
      navigation.navigate('Home')
    } catch (error) {
      Alert.alert("Erro ao enviar dados:", error.message);
    }
  }

  return (
    <Container>
      <ScrollViewContent>
        <Header>Cadastro de Usuário</Header>
        <FormArea>
          <InputContainer>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Label>Nome</Label>
                  <TextInput
                    name="name"
                    placeholder="Nome"
                    onChange={onChange}
                    value={value}
                    error={errors.name}
                  />
                </>
              )}
              name="name"
            />
          </InputContainer>

          <InputContainer>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Label>E-mail</Label>
                  <TextInput
                    name="email"
                    placeholder="E-mail"
                    onChange={onChange}
                    value={value}
                    error={errors.email}
                  />
                </>
              )}
              name="email"
            />
          </InputContainer>

          <InputContainer>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Label>CPF</Label>
                  <TextInput
                    name="cpf"
                    placeholder="CPF"
                    onChange={onChange}
                    value={value}
                    error={errors.cpf}
                    keyboardType="numeric"
                  />
                </>
              )}
              name="cpf"
            />
          </InputContainer>

          <InputContainer>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Label>Data de Nascimento</Label>
                  <DatePicker
                    value={value}
                    onChange={onChange}
                    showPicker={showDatePicker}
                    setShowPicker={setShowDatePicker}
                  />
                  {errors.birth_date && <ErrorText>{errors.birth_date.message}</ErrorText>}
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

          <InputContainer>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Label>Senha</Label>
                  <TextInput
                    name="password"
                    placeholder="Senha"
                    onChange={onChange}
                    value={value}
                    secureTextEntry={true}
                    error={errors.password}
                  />
                </>
              )}
              name="password"
            />
          </InputContainer>

        </FormArea>
        <InputContainer>
          <Button onPress={handleSubmit(onSubmit)}>
            <ButtonText>Cadastrar</ButtonText>
          </Button>

          <Link onPress={() => navigation.navigate('SignIn')}>
            <LinkText>Já possui uma conta? Login</LinkText>
          </Link>

        </InputContainer>

      </ScrollViewContent>
    </Container>
  );
}