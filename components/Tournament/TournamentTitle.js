import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { Pressable } from "react-native";
import { Icon } from "react-native-elements";

const TournamentTitle = ({
  inputValue,
  handleEditText,
  refInput,
  setEditing,
  editing,
  handleCloseEdit,
  handleEdit,
}) => {
  return (
    <>
      <TextInput
        style={styles.tournamentName}
        value={inputValue}
        placeholder="Tournament name..."
        onChangeText={handleEditText}
        ref={refInput}
        placeholderTextColor="rgba(255,255,255,0.5)"
        onEndEditing={() => setEditing(false)}
      />
      <View>
        <Pressable style={styles.editicon}>
          {editing ? (
            <Icon
              type="material"
              name="done"
              color="white"
              size={32}
              onPress={handleCloseEdit}
            />
          ) : (
            <Icon
              type="material"
              name="edit"
              color="white"
              size={32}
              onPress={handleEdit}
            />
          )}
        </Pressable>
      </View>
    </>
  );
};

export default TournamentTitle;
const styles = StyleSheet.create({
  tournamentName: {
    flex: 1,
    fontSize: 20,
    color: "white",
    paddingLeft: 10,
  },
  editicon: {
    padding: 10,
  },
});
