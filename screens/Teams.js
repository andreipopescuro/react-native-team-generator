import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import LottieView from "lottie-react-native";
import { Auth, API } from "aws-amplify";
import * as RootNavigation from "../RootNavigation";
import { createGame } from "../src/graphql/mutations";
export default function Teams({
  teams,
  teamLength,
  generateTeams,
  out,
  closeModal,
  loading,
  reloadMenu,
  setReloadMenu,
  players,
  setPlayers,
}) {
  const handleSaveGame = async () => {
    try {
      const resp = await Auth.currentUserInfo();

      await API.graphql({
        query: createGame,
        variables: {
          input: {
            tournament_name: "New Tournament",
            userGamesId: resp.id,
            winner: "",
            players: players,
          },
        },
      });
      RootNavigation.navigate("Menu");
      setReloadMenu(!reloadMenu);
      setPlayers([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#330000", height: "100%" }}>
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LottieView
            source={require("../assets/ball-spinner.json")}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />
        </View>
      ) : (
        <View>
          <Pressable
            onPress={closeModal}
            android_ripple={{
              color: "#7f1d1d",
              radius: 15,
            }}
            style={styles.backButton}
          >
            <Icon
              type="evilicon"
              name="arrow-left"
              style={styles.backButtonText}
              color={"white"}
              size={40}
            />
          </Pressable>
          <Text
            style={{
              fontSize: 40,
              textAlign: "center",
              letterSpacing: 10,
              padding: 10,
              fontWeight: "bold",
              color: "#a8a29e",
              textShadowColor: "#7f1d1d",
              textShadowOffset: { width: 3, height: 3 },
              textShadowRadius: 10,
              marginBottom: 100,
              marginTop: 100,
            }}
          >
            TEAMS
          </Text>
          <ScrollView style={styles.teamsContainer}>
            {teamLength == 1
              ? teams.map((team, i) => (
                  <View key={i} style={styles.singleTeam}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 20,
                        color: "white",
                      }}
                    >
                      {i + 1}
                    </Text>

                    <View style={styles.playerWithPlayer}>
                      <Text style={styles.vs}>{team[0]}</Text>
                      <Text
                        style={{
                          ...styles.vs,
                          textAlign: "center",
                          color: "#059669",
                        }}
                      >
                        vs
                      </Text>
                      <Text style={{ ...styles.vs }}>{team[1]}</Text>
                    </View>
                  </View>
                ))
              : teams.map((team, i) => (
                  <View key={i} style={i % 2 !== 0 && { marginBottom: 30 }}>
                    <View style={{ ...styles.singleTeam, marginBottom: 0 }}>
                      <Text style={{ textAlign: "center", color: "white" }}>
                        {i + 1}
                      </Text>

                      <View style={styles.playerWithPlayer}>
                        <Text style={styles.vs}>{team[0]}</Text>
                        <Text
                          style={{
                            ...styles.vs,
                            textAlign: "center",
                            color: "crimson",
                          }}
                        >
                          with
                        </Text>
                        <Text style={{ ...styles.vs }}>{team[1]}</Text>
                      </View>
                    </View>

                    {i % 2 === 0 && i !== teams.length - 1 && (
                      <Text style={{ textAlign: "center", color: "gold" }}>
                        VS
                      </Text>
                    )}
                  </View>
                ))}
            {out.length > 0 && (
              <View style={styles.soloPlayer}>
                <Text
                  style={{
                    fontSize: 24,
                    color: "gold",
                    padding: 10,
                    textAlign: "center",
                  }}
                >
                  {out[0]}
                </Text>
                <Text style={{ color: "whitesmoke" }}>waits</Text>
              </View>
            )}
          </ScrollView>
          <View>
            <Pressable
              style={styles.buttonContainer}
              onPress={generateTeams}
              android_ripple={{
                color: "#b91c1c",
              }}
            >
              <Text style={styles.button}>Recreate</Text>
              <Icon type="evilicon" name="redo" size={40} color={"white"} />
            </Pressable>
          </View>
          <View>
            <Pressable
              style={styles.buttonContainer}
              android_ripple={{
                color: "#b91c1c",
              }}
              onPress={handleSaveGame}
            >
              <Text style={styles.button}>SAVE & PLAY</Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButtonText: {
    color: "#7f1d1d",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  backButton: {
    left: "7%",
    top: 60,
    width: 60,
    borderRadius: 5,
    padding: 4,
  },
  buttonContainer: {
    backgroundColor: "#7f1d1d",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    fontSize: 20,
    color: "white",
    letterSpacing: 4,
    fontWeight: "bold",
    marginRight: 4,
  },
  teamsContainer: {
    marginTop: 20,
  },
  pickerContainer: {
    marginTop: 10,
  },
  playerWithPlayer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  vs: {
    flex: 1,
    textAlign: "center",
    color: "#d6d3d1",
    fontSize: 20,
  },
  singleTeam: {
    marginBottom: 10,
    backgroundColor: "#7f1d1d",
    borderRadius: 5,
    width: "90%",
    alignSelf: "center",
    padding: 5,
    paddingBottom: 5,
  },
  soloPlayer: {
    backgroundColor: "#7f1d1d",
    borderRadius: 5,
    width: "90%",
    marginBottom: 10,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  teamsContainer: {
    maxHeight: 350,
  },
});
