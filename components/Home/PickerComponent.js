import { View } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";

const PickerComponent = ({ teamLength, handleTeamLength, players }) => {
  return (
    <View
      style={{
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <View
        style={{
          width: 90,
          backgroundColor: "#2f9933",
        }}
      >
        <Picker
          selectedValue={teamLength}
          onValueChange={handleTeamLength}
          style={{
            color: "white",
            backgroundColor: "#4ca652",
          }}
          mode="dropdown"
        >
          <Picker.Item
            label="1v1"
            value="1"
            style={{
              color: "white",
              backgroundColor: "#4ca652",
            }}
          />
          {players.length > 3 && (
            <Picker.Item
              label="2v2"
              value="2"
              style={{
                color: "white",
                backgroundColor: "#4ca652",
              }}
            />
          )}
        </Picker>
      </View>
    </View>
  );
};

export default PickerComponent;
