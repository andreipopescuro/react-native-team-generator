import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const CreateTeamButton = ({ generateTeams }) => {
  const navigation = useNavigation();

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
          color: "#8FBC8F",
        }}
        onPress={generateTeams}
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
          CREATE TEAMS
        </Text>
      </Pressable>
    </View>
  );
};

export default CreateTeamButton;
