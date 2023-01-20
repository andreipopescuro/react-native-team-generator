import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

const InputContainer = ({ handleAdd, handleInput, inputValue }) => {
  return (
    <View>
      <TextInput
        placeholder="Player name"
        placeholderTextColor="rgba(255,255,255, 0.6)"
        style={{
          fontSize: 20,
          backgroundColor: "#4ca652",
          width: "100%",
          height: 50,
          textAlign: "center",
          color: "white",
        }}
        onChangeText={handleInput}
        value={inputValue}
        onSubmitEditing={handleAdd}
        maxLength={10}
      />
    </View>
  );
};

export default InputContainer;
