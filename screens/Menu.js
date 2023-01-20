import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as RootNavigation from "../RootNavigation";
import { Icon } from "react-native-elements";
import GamesContainer from "../components/Menu/GamesContainer";
import { Auth } from "aws-amplify";
import { API } from "aws-amplify";
import { createUser } from "../src/graphql/mutations";
import { getUser } from "../src/graphql/queries";
const Menu = ({ setUsertoggle, reloadMenu }) => {
  const [userdata, setUserData] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const resp = await Auth.currentUserInfo();

      try {
        await API.graphql({
          query: createUser,
          variables: {
            input: {
              id: resp.id,
              name: resp.username,
            },
          },
        });
        const oneUser = await API.graphql({
          query: getUser,
          variables: {
            id: resp.id,
          },
        });
        setUserData(oneUser.data.getUser);
        console.log("user is new but we created it and add it in state");
      } catch (error) {
        const oneUser = await API.graphql({
          query: getUser,
          variables: {
            id: resp.id,
          },
        });
        console.log("user existing, save it in state");
        setUserData(oneUser.data.getUser);
      }

      setLoading(false);
    };
    fetchUser();
  }, [reloadMenu]);
  console.log(userdata);
  const handleLogout = async () => {
    try {
      await Auth.signOut();
      setUsertoggle("logout");
      // RootNavigation.navigate("Login");
    } catch (error) {}
  };
  const handleNewGame = () => {
    RootNavigation.navigate("Home");
  };
  return (
    <SafeAreaView style={styles.menuContainer}>
      <View style={styles.logoutContainer}>
        <Pressable
          onPress={handleLogout}
          android_ripple={{
            color: "#ff4d4d",
          }}
          style={styles.pressableLogout}
        >
          <Icon type="material" name="logout" color="white" />
        </Pressable>
      </View>
      <View style={styles.menuContentContainer}>
        <Text style={styles.historyTitle}>History</Text>

        {loading ? (
          <ActivityIndicator />
        ) : userdata?.games?.items?.length > 0 ? (
          <GamesContainer games={userdata.games.items} />
        ) : (
          <Text style={styles.emptyHistory}>Your history is empty</Text>
        )}
      </View>
      <View style={styles.newGameContainer}>
        <Pressable
          onPress={handleNewGame}
          android_ripple={{
            color: "rgba(255,255,255,0.3)",
          }}
          style={styles.pressableNewGame}
        >
          <Text style={styles.newGameText}>New Game</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Menu;
const styles = StyleSheet.create({
  menuContainer: {
    height: "100%",
    backgroundColor: "#004d4d",
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  newGameText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  pressableLogout: {
    alignItems: "center",
    padding: 10,
  },
  logoutContainer: {
    width: 50,
    backgroundColor: "#b30000",
    borderRadius: 10,
    overflow: "hidden",
  },
  menuContentContainer: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    marginVertical: 10,
  },
  newGameContainer: {
    marginTop: 14,
    backgroundColor: "black",
    borderRadius: 10,
    overflow: "hidden",
  },
  pressableNewGame: {
    padding: 10,
  },
  emptyHistory: {
    fontSize: 20,
    color: "white",
  },
});
