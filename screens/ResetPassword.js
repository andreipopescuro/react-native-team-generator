import { View, Text, StyleSheet, SafeAreaView, Alert } from "react-native";
import React, { useState } from "react";
import CustomInput from "../components/CustomInputs/CustomInput";
import CustomButton from "../components/CustomButton/CustomButton";
import { Pressable } from "react-native";
import { Icon } from "react-native-elements";
import * as RootNavigation from "../RootNavigation";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleCloseReset = () => {
    RootNavigation.navigate("Login");
  };
  const handleSendUsername = async (data) => {
    setLoading(true);
    try {
      const resp = await Auth.forgotPassword(data.username);
      // RootNavigation.navigate("Login");
      // if email is sent to client ->
      RootNavigation.navigate("ConfirmResetPassword", {
        username: data.username,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  };
  return (
    <SafeAreaView style={styles.forgotPassContainer}>
      <Pressable
        style={styles.icon}
        android_ripple={{
          color: "#8cb3d9",
          radius: 15,
        }}
        onPress={handleCloseReset}
      >
        <Icon type="evilicon" name="arrow-left" size={40} color="white" />
      </Pressable>

      <Text style={styles.title}>Reset your password</Text>
      <Text style={styles.unavabile}>Sorry, this process is unavabile</Text>
      <CustomInput
        placeholder="username"
        icon="user"
        control={control}
        name="username"
        rules={{
          required: "Username is required",
          minLength: { value: 6, message: "Minimum 6 characters required" },
          maxLength: {
            value: 12,
            message: "The maximum of 12 characters has been exceeded",
          },
        }}
      />
      <View style={{ marginVertical: 20 }}>
        <CustomButton
          text={loading ? "Verifying" : "Confirm"}
          log={true}
          onPress={handleSubmit(handleSendUsername)}
        />
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;
const styles = StyleSheet.create({
  forgotPassContainer: {
    height: "100%",
    backgroundColor: "#004d4d",
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    textAlign: "center",
    color: "#0d1a26",
    marginVertical: 30,
  },
  icon: {
    width: 40,
    left: 0,
    top: 0,
  },
  unavabile: {
    textAlign: "center",
    fontSize: 20,
    color: "crimson",
  },
});
