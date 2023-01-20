import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "../components/CustomInputs/CustomInput";
import CustomButton from "../components/CustomButton/CustomButton";
import { Icon } from "react-native-elements";
import RegisterWithMedia from "../components/RegisterWithGoogle/RegisterWithGoogle";
import * as RootNavigation from "../RootNavigation";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const pwd = watch("password");
  const handleCreateAccount = async (data) => {
    if (loading) return;
    setLoading(true);
    const { username, password, name, email } = data;
    try {
      const newUser = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          name,
          preferred_username: username,
        },
      });
      RootNavigation.navigate("Login");

      // if email verification is enabled ->
      // RootNavigation.navigate("ConfirmEmail", { username });
    } catch (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  };
  const handleCloseCreateAccount = () => {
    RootNavigation.navigate("Login");
  };
  return (
    <SafeAreaView style={styles.singinContainer}>
      <Pressable
        style={styles.icon}
        android_ripple={{
          color: "#8cb3d9",
          radius: 15,
        }}
        onPress={handleCloseCreateAccount}
      >
        <Icon type="evilicon" name="arrow-left" size={40} color="white" />
      </Pressable>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Create Account</Text>
        <View style={styles.inputsContainer}>
          <CustomInput
            placeholder="Name"
            icon="user"
            control={control}
            name="name"
            rules={{
              required: "Name is required",
              minLength: { value: 3, message: "Minimum 3 characters required" },
              maxLength: {
                value: 12,
                message: "The maximum of 12 characters has been exceeded",
              },
            }}
          />
          <CustomInput
            placeholder="Username"
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
          <CustomInput
            placeholder="Email"
            icon="email"
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
            }}
          />
          <CustomInput
            placeholder="Password"
            secureTextEntry={true}
            icon="pas"
            control={control}
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
          <CustomInput
            placeholder="Confirm Password"
            secureTextEntry={true}
            icon="pas"
            control={control}
            name="confirmpassword"
            rules={{
              validate: (value) => value === pwd || "Password does not match",
              required: "Confirmation is required",
              minLength: { value: 6, message: "Minimum 6 characters required" },
              maxLength: {
                value: 12,
                message: "The maximum of 12 characters has been exceeded",
              },
            }}
          />
          <View style={{ marginTop: 50 }}>
            <CustomButton
              text={loading ? "Loading" : "Register"}
              onPress={handleSubmit(handleCreateAccount)}
              log={true}
            />
            <View style={{ marginTop: 20 }}>
              <RegisterWithMedia />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  singinContainer: {
    height: "100%",
    backgroundColor: "#004d4d",
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    textAlign: "center",
    color: "#0d1a26",
    marginTop: 50,
  },
  inputsContainer: {
    marginVertical: 30,
  },
  icon: {
    width: 40,
    left: 0,
    top: 0,
  },
});
