import { useState, useEffect } from "react";
import * as React from "react";
import { ActivityIndicator, Keyboard, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./RootNavigation";
import * as RootNavigation from "./RootNavigation.js";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import ConfirmEmail from "./screens/ConfirmEmail";
import ResetPassword from "./screens/ResetPassword";
import ConfirmResetPassword from "./screens/ConfirmResetPassword";
import Menu from "./screens/Menu";
import Tournament from "./screens/Tournament";
import Home from "./screens/Home";
import Teams from "./screens/Teams";
import { Amplify, Auth, Hub } from "aws-amplify";
import awsmobile from "./src/aws-exports";
Amplify.configure(awsmobile);

const App = () => {
  const [user, setUser] = useState(undefined);
  const [userToggle, setUsertoggle] = useState("");
  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUser(authUser);
    } catch (error) {
      setUser(null);
    }
  };
  useEffect(() => {
    console.log("app rendering");
    checkUser();
    // const listener = (data) => {r
    // if (data.payload === "signIn" || data.payload === "signOut") {
    // }
    // };
    // Hub.listen("auth", listener);
    // return () => Hub.remove("auth", listener);
  }, [userToggle]);
  const Stack = createNativeStackNavigator();
  // login with google and apple
  // database for saving teams and update winner

  // redux for handling changes optional

  const [inputValue, setInputValue] = useState("");
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teamLength, setTeamLength] = useState(1);
  const [teams, setTeams] = useState([]);
  const [out, setOut] = useState([]);
  const [reloadMenu, setReloadMenu] = useState(false);

  const handleInput = (text) => {
    setInputValue(text);
  };
  const handleAdd = () => {
    if (inputValue !== "") {
      Keyboard.dismiss();
      setPlayers((current) => [...current, inputValue]);
      setInputValue("");
    }
  };

  const handleDeletePlayer = (player) => {
    setPlayers((players) => players.filter((p) => p !== player));
  };

  const generateTeams = () => {
    if (players.length > 1) {
      let totalTeams = players.length / 2;
      const shuffleTeams = [...players].sort((a, b) => 0.5 - Math.random());

      const arr = Array(Math.floor(totalTeams));
      for (let i = 0; i < Math.floor(totalTeams); i++) {
        arr[i] = [];
        arr[i].push(...shuffleTeams.splice(0, 2));
      }
      setTeams(arr);
      setOut(shuffleTeams);
      RootNavigation.navigate("Teams");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };
  const handleTeamLength = (current) => {
    setTeamLength(current);
  };
  const handleReset = () => {
    setPlayers([]);
  };
  const closeModal = () => {
    RootNavigation.navigate("Home");
    setLoading(true);
  };

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen name="Menu" options={{ headerShown: false }}>
                {(props) => (
                  <Menu
                    {...props}
                    setUsertoggle={setUsertoggle}
                    reloadMenu={reloadMenu}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="Home" options={{ headerShown: false }}>
                {(props) => (
                  <Home
                    {...props}
                    handleInput={handleInput}
                    inputValue={inputValue}
                    handleAdd={handleAdd}
                    players={players}
                    handleDeletePlayer={handleDeletePlayer}
                    handleTeamLength={handleTeamLength}
                    handleReset={handleReset}
                    teamLength={teamLength}
                    generateTeams={generateTeams}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="Teams" options={{ headerShown: false }}>
                {(props) => (
                  <Teams
                    {...props}
                    out={out}
                    teams={teams}
                    closeModal={closeModal}
                    generateTeams={generateTeams}
                    teamLength={teamLength}
                    loading={loading}
                    reloadMenu={reloadMenu}
                    setReloadMenu={setReloadMenu}
                    players={players}
                    setPlayers={setPlayers}
                  />
                )}
              </Stack.Screen>

              <Stack.Screen name="Tournament" options={{ headerShown: false }}>
                {(props) => (
                  <Tournament
                    {...props}
                    reloadMenu={reloadMenu}
                    setReloadMenu={setReloadMenu}
                  />
                )}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name="Login" options={{ headerShown: false }}>
                {(props) => <Login {...props} setUsertoggle={setUsertoggle} />}
              </Stack.Screen>

              <Stack.Screen name="Signup" options={{ headerShown: false }}>
                {(props) => <Signup {...props} />}
              </Stack.Screen>

              <Stack.Screen
                name="ConfirmEmail"
                options={{ headerShown: false }}
              >
                {(props) => <ConfirmEmail {...props} />}
              </Stack.Screen>

              <Stack.Screen
                name="ResetPassword"
                options={{ headerShown: false }}
              >
                {(props) => <ResetPassword {...props} />}
              </Stack.Screen>

              <Stack.Screen
                name="ConfirmResetPassword"
                options={{ headerShown: false }}
              >
                {(props) => <ConfirmResetPassword {...props} />}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
