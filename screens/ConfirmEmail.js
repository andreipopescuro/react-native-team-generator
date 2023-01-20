import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "../components/CustomInputs/CustomInput";
import CustomButton from "../components/CustomButton/CustomButton";
import { Icon } from "react-native-elements";
import { useForm } from "react-hook-form";
import * as RootNavigation from "../RootNavigation";
import { useRoute } from "@react-navigation/native";
import { Auth } from "aws-amplify";
const ConfirmEmail = () => {
  const [loading, setLoading] = useState(false);
  const [resend, setResend] = useState(false);
  const route = useRoute();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { username: route?.params?.username } });

  const username = watch("username");

  const handleVerifyCode = async (data) => {
    setLoading(true);
    try {
      const resp = await Auth.confirmSignUp(data.username, data.code);
      RootNavigation.navigate("Login");
    } catch (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  };

  const handleResendCode = async () => {
    setResend(true);
    try {
      const res = await Auth.resendSignUp(username);
    } catch (error) {
      Alert.alert(error.message);
    }
    setResend(false);
  };

  const handleCloseVerification = () => {
    RootNavigation.navigate("Signup");
  };
  return (
    <SafeAreaView style={styles.confirmContainer}>
      <Pressable
        style={styles.icon}
        android_ripple={{
          color: "#8cb3d9",
          radius: 15,
        }}
        onPress={handleCloseVerification}
      >
        <Icon type="evilicon" name="arrow-left" size={40} color="white" />
      </Pressable>
      <Text style={styles.title}>Confirm Your Email</Text>
      <Text style={styles.unavabile}>Sorry, this process is unavabile</Text>

      <CustomInput
        placeholder="Username"
        icon="user"
        control={control}
        name="username"
        rules={{
          required: "Username is required",
        }}
      />
      <CustomInput
        placeholder="Enter your confirmation code"
        icon="email"
        control={control}
        name="code"
        rules={{
          required: "Code is required",
        }}
      />
      <View style={{ marginVertical: 14 }}>
        <CustomButton
          text={resend ? "Resending" : "Resend code"}
          onPress={handleSubmit(handleResendCode)}
          icon={true}
        />
      </View>
      <CustomButton
        text={loading ? "Verifying" : "Verify"}
        log={true}
        onPress={handleSubmit(handleVerifyCode)}
      />
    </SafeAreaView>
  );
};

export default ConfirmEmail;

const styles = StyleSheet.create({
  confirmContainer: {
    height: "100%",
    backgroundColor: "#004d4d",
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    color: "#0d1a26",
    marginVertical: 50,
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
