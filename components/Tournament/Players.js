import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

const Players = ({ handleSelectedPlayer, players }) => {
  // for each player avabile add it to scrollview
  return (
    <ScrollView style={styles.playersContainer}>
      {players.map((player, i) => (
        <Text style={styles.player} onPress={handleSelectedPlayer} key={i}>
          {player}
        </Text>
      ))}
    </ScrollView>
  );
};

export default Players;
const styles = StyleSheet.create({
  playersContainer: {
    height: 350,
    marginVertical: 10,
  },
  player: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    marginBottom: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
});
