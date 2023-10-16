import React from "react";
import { Picker } from "@react-native-picker/picker";
import { Controller } from "react-hook-form";
import { PickerContainer, ErrorText } from "./styles";

const StatusPicker = ({ control, value, onChange, errors }) => {
  const getStatusText = {
    preventivo: "Preventivo",
    ocorrido: "Ocorrido",
  };

  const statusOptions = Object.entries(getStatusText).map(([value, label]) => (
    <Picker.Item label={label} value={value} key={value} />
  ));

  return (
    <>
      <PickerContainer style={{ marginTop: "10%", marginBottom: "10%" }}>
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
              <Picker.Item label="Selecione um Status" value="preventivo" />
              {statusOptions}
            </Picker>
          )}
          name="status"
        />
      </PickerContainer>
      {errors.status && <ErrorText>{errors.status.message}</ErrorText>}
    </>
  );
};

export default StatusPicker;
