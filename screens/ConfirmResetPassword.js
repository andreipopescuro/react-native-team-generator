import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import CustomInput from "../components/CustomInputs/CustomInput";
import CustomButton from "../components/CustomButton/CustomButton";
import { useForm } from "react-hook-form";
import * as RootNavigation from "../RootNavigation";
import { useRoute } from "@react-navigation/native";
import { Auth } from "aws-amplify";

const ConfirmResetPassword = () => {
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: route?.params?.username } });

  const handleCloseReset = () => {
    RootNavigation.navigate("ResetPassword");
  };
  const handleResetPassword = async (data) => {
    setLoading(true);
    try {
      // if email is sent to client ->
      await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
      RootNavigation.navigate("Login");
    } catch (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.confirmContainer}>
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
        control={control}
        placeholder="Enter the code recived on email"
        icon="email"
        name="code"
        rules={{
          required: "Code is required",
        }}
      />
      <CustomInput
        control={control}
        placeholder="Password"
        icon="pas"
        secureTextEntry={true}
        name="password"
        rules={{
          required: "Password is required",
          minLength: { value: 6, message: "Minimum 6 characters required" },
          maxLength: {
            value: 12,
            message: "The maximum of 12 characters has been exceeded",
          },
        }}
      />
      <View style={{ marginTop: 20 }}>
        <CustomButton
          text={loading ? "Verifying" : "CONFIRM"}
          log={true}
          onPress={handleSubmit(handleResetPassword)}
        />
      </View>
    </SafeAreaView>
  );
};

export default ConfirmResetPassword;
const styles = StyleSheet.create({
  confirmContainer: {
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
