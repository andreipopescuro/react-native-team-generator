import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import React from "react";
import * as RootNavigation from "../../RootNavigation";

const GamesContainer = ({ games }) => {
  // get all matches from user in a state , for each match return a  'view container' with a game with a winner and title
  const handleOpenGame = (i) => {
    RootNavigation.navigate("Tournament", { game: games[i] });
  };
  return (
    <ScrollView>
      {games.map((game, i) => (
        <View style={styles.viewContainer} key={game.id}>
          <Pressable
            android_ripple={{
              color: "rgba(255,255,255,0.3)",
            }}
            style={styles.pressable}
            onPress={() => handleOpenGame(i)}
          >
            <View style={styles.gameContainer}>
              <Text style={styles.titleText}>{game.tournament_name}</Text>
              <View>
                <Text style={styles.titleText}>Winner</Text>
                <Text style={styles.winnerText}>{game.winner || "?"}</Text>
              </View>
            </View>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
};

export default GamesContainer;

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: "rgba(0,0,0,0.8)",
    marginBottom: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  pressable: {
    padding: 5,
    paddingHorizontal: 10,
  },
  gameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  winnerText: {
    fontSize: 20,
    color: "gold",
    textAlign: "center",
  },
  titleText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});
