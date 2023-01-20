import { Image, SafeAreaView, Text, View } from "react-native";
import React from "react";
import InputContainer from "../components/Home/InputContainer";
import AddPlayerButton from "../components/Home/AddPlayerButton";
import PickerComponent from "../components/Home/PickerComponent";
import Players from "../components/Home/Players";
import CreateTeamButton from "../components/Home/CreateTeamButton";
import { Pressable } from "react-native";
import { Icon } from "react-native-elements";
import * as RootNavigation from "../RootNavigation";

const Home = ({
  handleAdd,
  inputValue,
  handleInput,
  players,
  handleDeletePlayer,
  teamLength,
  handleTeamLength,
  generateTeams,
  handleReset,
}) => {
  const handleCloseCreateGame = () => {
    RootNavigation.navigate("Menu");
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#2f9933",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <View>
        <Pressable
          style={{
            top: 180,
            left: 30,
            width: 40,
            position: "absolute",
            zIndex: 2,
          }}
          android_ripple={{
            color: "#006600",
            radius: 15,
          }}
          onPress={handleCloseCreateGame}
        >
          <Icon type="evilicon" name="arrow-left" size={40} color="white" />
        </Pressable>
        <Image
          source={require("../assets/bg.jpg")}
          style={{ width: "100%", height: 230, resizeMode: "cover" }}
        />

        <View>
          <Text
            style={{
              fontSize: 40,
              textAlign: "center",
              letterSpacing: 10,
              padding: 10,
              fontWeight: "bold",
              color: "#c5e6c7",
              textShadowColor: "green",
              textShadowOffset: { width: 5, height: 5 },
              textShadowRadius: 10,
            }}
          >
            FIFA
          </Text>
        </View>
        <InputContainer
          handleInput={handleInput}
          inputValue={inputValue}
          handleAdd={handleAdd}
        />
        <AddPlayerButton handleAdd={handleAdd} />
      </View>
      <Players players={players} handleDeletePlayer={handleDeletePlayer} />

      <PickerComponent
        teamLength={teamLength}
        handleTeamLength={handleTeamLength}
        players={players}
      />
      <CreateTeamButton generateTeams={generateTeams} />
    </SafeAreaView>
  );
};

export default Home;
