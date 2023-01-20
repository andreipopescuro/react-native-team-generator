import { View, Text } from "react-native";
import React from "react";
import CustomButton from "../CustomButton/CustomButton";

const RegisterWithMedia = () => {
  const handleLoginWithGoogle = () => {};
  const handleLoginWithApple = () => {};

  return (
    <>
      <CustomButton
        text="Sign in with"
        icon="google"
        onPress={handleLoginWithGoogle}
      />
      <View style={{ marginTop: 12 }}>
        <CustomButton
          text="Sign in with"
          icon="apple"
          onPress={handleLoginWithApple}
        />
      </View>
    </>
  );
};

export default RegisterWithMedia;
