import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "../components/CustomInputs/CustomInput";
import CustomButton from "../components/CustomButton/CustomButton";
import RegisterWithMedia from "../components/RegisterWithGoogle/RegisterWithGoogle";
import * as RootNavigation from "../RootNavigation";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
const Login = ({ setUsertoggle }) => {
  // login with google and apple
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await Auth.signIn(data.username, data.password);
      setUsertoggle("login");
      // RootNavigation.navigate("Menu", { username: data.username });
    } catch (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  };
  const handleForgotPassword = () => {
    RootNavigation.navigate("ResetPassword");
  };
  const handleCreateAccountButton = () => {
    RootNavigation.navigate("Signup");
  };
  return (
    <SafeAreaView style={styles.loginContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>FIFA </Text>
          <Text style={{ ...styles.title, fontSize: 20 }}>Team Generator</Text>
        </View>
        <CustomButton
          text="Create Account"
          create={true}
          onPress={handleCreateAccountButton}
        />

        <View style={styles.inputsContainer}>
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
            placeholder="Password"
            secureTextEntry={true}
            icon="pas"
            control={control}
            name="password"
            rules={{
              required: "Password is required",
            }}
          />
        </View>
        <View style={{ marginBottom: 40 }}>
          <CustomButton
            text={loading ? "Loading..." : "LOGIN"}
            onPress={handleSubmit(handleLogin)}
            log={true}
          />
        </View>
        <View style={{ marginBottom: 12 }}>
          <CustomButton
            text="Forgot password?"
            forgot={true}
            onPress={handleForgotPassword}
          />
        </View>
        <RegisterWithMedia />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    height: "100%",
    backgroundColor: "#004d4d",
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  titleContainer: {
    marginBottom: 46,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    letterSpacing: 10,
    fontWeight: "bold",
    color: "#c5e6c7",
    textShadowColor: "blue",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
    fontVariant: ["small-caps"],
  },
  inputsContainer: {
    marginVertical: 30,
  },
});
