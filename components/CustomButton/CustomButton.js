import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";

const CustomButton = ({ text, icon, onPress, create, forgot, log }) => {
  return (
    <View
      style={[
        styles.buttonContainer,
        icon && styles.signInStyleGoogle,
        create && styles.createStyle,
        forgot && styles.forgotStyle,
        log && styles.log,
      ]}
    >
      <Pressable
        android_ripple={{
          color: "#000d33",
        }}
        style={styles.pressableButton}
        onPress={onPress}
      >
        <Text
          style={[
            styles.text,
            log && styles.loginText,
            forgot && styles.forgotText,
          ]}
        >
          {text}
        </Text>
        {icon === "google" && (
          <Icon
            type="evilicon"
            name="sc-google-plus"
            style={styles.icon}
            color="white"
            size={26}
          />
        )}
        {icon === "apple" && (
          <Text style={[styles.text, styles.icon]}>Apple</Text>
        )}
      </Pressable>
    </View>
  );
};

export default CustomButton;
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  pressableButton: {
    borderRadius: 10,
    padding: 16,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    elevation: 5,
    backgroundColor: "#4ca652",
    borderRadius: 10,
    overflow: "hidden",
  },
  apple: {
    color: "white",
  },
  icon: {
    marginLeft: 10,
  },
  signInStyleGoogle: {
    backgroundColor: "#0f0f0a",
  },
  createStyle: {
    backgroundColor: "#009999",
  },
  forgotStyle: {
    backgroundColor: "#990099",
  },
  log: {
    backgroundColor: "#000066",
  },
  loginText: {
    color: "#0099ff",
  },
  forgotText: {
    color: "#330033",
  },
});
