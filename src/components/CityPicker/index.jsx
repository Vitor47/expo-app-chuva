import React from "react";
import { Picker } from "@react-native-picker/picker";
import { Controller } from "react-hook-form";
import { PickerContainer, ErrorText } from "./styles";

const CityPicker = ({ control, value, onChange, errors }) => {
  return (
    <>
      <PickerContainer style={{ marginTop: "6%", marginBottom: "6%" }}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Picker
              style={{
                backgroundColor: "#68B2F8",
                padding: "2%",
                color: "#fff",
              }}
              selectedValue={value}
              onValueChange={onChange}
            >
              <Picker.Item label="Selecione uma cidade" value="" />
              <Picker.Item label="Santa Maria" value="Santa Maria" />
              <Picker.Item label="Agudo" value="Agudo" />
              <Picker.Item label="Restinga Seca" value="Restinga Seca" />
            </Picker>
          )}
          name="city"
        />
      </PickerContainer>
      {errors.city && <ErrorText>{errors.city.message}</ErrorText>}
    </>
  );
};

export default CityPicker;
