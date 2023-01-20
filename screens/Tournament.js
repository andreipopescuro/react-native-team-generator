import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState } from "react";
import { Icon } from "react-native-elements";
import * as RootNavigation from "../RootNavigation";
import { Keyboard } from "react-native";
import MyModal from "../components/Tournament/MyModal";
import TournamentTitle from "../components/Tournament/TournamentTitle";
import Players from "../components/Tournament/Players";
import { useRoute } from "@react-navigation/native";
import { API } from "aws-amplify";
import { updateGame } from "../src/graphql/mutations";
const Tournament = ({ reloadMenu, setReloadMenu }) => {
  const route = useRoute();
  const id = route.params.game.id;
  const userGamesId = route.params.game.userGamesId;
  const players = route.params.game.players;
  const tournament_name = route.params.game.tournament_name;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const refInput = useRef(null);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  // winner va fi luat din props
  const [winner, setWinner] = useState(route.params.game.winner);
  //input value va fi setat la   tournament name
  const [inputValue, setInputValue] = useState(tournament_name);
  // console.log(route.params);
  // players
  // winner
  // tournament name
  // atunci cand salvam trimitem winner si inputvalue in db
  const handleEdit = () => {
    refInput.current.focus();
  };
  const handleCloseEdit = () => {
    setEditing(false);
    Keyboard.dismiss();
  };
  const handleEditText = (text) => {
    setInputValue(text);
    setEditing(true);
  };
  const handleCloseGame = () => {
    RootNavigation.navigate("Menu");
  };
  const handleSelectedPlayer = (event) => {
    setSelectedPlayer(event._dispatchInstances.memoizedProps.children);
    setIsModalVisible(true);
  };
  const handleChangeWinner = () => {
    setWinner(selectedPlayer);
    setIsModalVisible(false);
  };
  const handleSaveTournament = async () => {
    setReloadMenu(!reloadMenu);
    setLoading(true);
    try {
      await API.graphql({
        query: updateGame,
        variables: {
          input: {
            id: id,
            userGamesId: userGamesId,
            players: players,
            winner: winner,
            tournament_name: inputValue,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <SafeAreaView style={styles.gameContainer}>
      <Pressable
        style={styles.backicon}
        android_ripple={{
          color: "#8cb3d9",
          radius: 15,
        }}
        onPress={handleCloseGame}
      >
        <Icon type="evilicon" name="arrow-left" size={40} color="white" />
      </Pressable>
      <View style={styles.tournamentTitleContainer}>
        <TournamentTitle
          inputValue={inputValue}
          handleEdit={handleEdit}
          refInput={refInput}
          setEditing={setEditing}
          editing={editing}
          handleCloseEdit={handleCloseEdit}
          handleEditText={handleEditText}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.info}>Click on a player to select as winner</Text>

        <Players
          handleSelectedPlayer={handleSelectedPlayer}
          players={players}
        />
        <View>
          <Text style={styles.winnerTitle}>WINNER</Text>
          <Text style={styles.winnerName}>{winner || "?"}</Text>
        </View>
      </View>
      <Modal visible={isModalVisible} animationType="fade" transparent={true}>
        <MyModal
          selectedPlayer={selectedPlayer}
          setIsModalVisible={setIsModalVisible}
          handleChangeWinner={handleChangeWinner}
        />
      </Modal>
      <View style={styles.saveButtonContainer}>
        <Pressable
          style={styles.savePressable}
          android_ripple={{
            color: "blue",
          }}
          onPress={handleSaveTournament}
        >
          <Text style={styles.saveText}>{loading ? "Loading" : "Save"}</Text>
          <Icon type="material" name="save" size={26} color="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Tournament;
const styles = StyleSheet.create({
  gameContainer: {
    height: "100%",
    backgroundColor: "#004d4d",
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  tournamentTitleContainer: {
    flexDirection: "row",
    backgroundColor: "teal",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginVertical: 20,
  },

  backicon: {
    left: 0,
    top: 0,
    width: 40,
  },
  info: {
    fontSize: 20,
    textAlign: "center",
    color: "crimson",
  },

  winnerTitle: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  winnerName: {
    fontSize: 24,
    color: "gold",
    textAlign: "center",
  },
  saveButtonContainer: {
    backgroundColor: "teal",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
  },
  saveText: {
    color: "white",
    fontSize: 20,
    marginRight: 10,
  },
  savePressable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
