import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";

const CustomInput = ({
  control,
  name,
  placeholder,
  secureTextEntry,
  icon,
  rules = {},
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.container,
              { borderColor: error ? "crimson" : "white" },
            ]}
          >
            <Icon
              name={
                icon === "pas"
                  ? "unlock"
                  : icon === "email"
                  ? "envelope"
                  : "user"
              }
              type="evilicon"
              color="white"
              size={40}
            />
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.input}
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              placeholderTextColor="rgba(255,255,255, 0.5)"
            />
          </View>
          {error && (
            <Text style={{ color: "crimson", alignSelf: "stretch" }}>
              {error.message}
            </Text>
          )}
        </>
      )}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: "teal",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "white",
    padding: 10,
  },
});
