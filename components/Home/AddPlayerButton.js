import { View, Text, Pressable } from "react-native";
import React from "react";

const AddPlayerButton = ({ handleAdd }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
      }}
    >
      <Pressable
        android_ripple={{
          color: "white",
          radius: 10,
          borderless: "false",
        }}
        onPress={handleAdd}
        style={{
          width: "50%",
          backgroundColor: "#4ca652",
          borderRadius: 10,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            borderRadius: 10,
            textAlign: "center",
            fontWeight: "bold",
            padding: 10,
            color: "white",
          }}
        >
          ADD PLAYER
        </Text>
      </Pressable>
    </View>
  );
};

export default AddPlayerButton;
