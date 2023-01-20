import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";

const Players = ({ players, handleDeletePlayer }) => {
  return (
    <FlatList
      style={{ height: 180 }}
      data={players}
      renderItem={(itemData) => {
        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#4ca652",
              marginBottom: 5,
              borderRadius: 5,
              padding: 5,
              width: "60%",
              alignSelf: "center",
            }}
          >
            <Text style={{ fontSize: 20, flex: 1, paddingLeft: 10 }}>
              {itemData.item}
            </Text>
            <Pressable
              android_ripple={{
                color: "red",
                radius: 10,
              }}
              onPress={() => handleDeletePlayer(itemData.item)}
              style={{ paddingHorizontal: 10 }}
            >
              <Icon type="evilicon" name="minus" size={30} color={"crimson"} />
            </Pressable>
          </View>
        );
      }}
    />
  );
};

export default Players;
