import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const MyModal = ({ selectedPlayer, setIsModalVisible, handleChangeWinner }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modal}>
        <Text style={[styles.btn, { marginBottom: 10 }]}>
          {selectedPlayer} won the tournament?
        </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => setIsModalVisible(false)}
            style={styles.modalButton}
          >
            <Text style={[styles.btn]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleChangeWinner}
            style={[styles.modalButton, { backgroundColor: "teal" }]}
          >
            <Text style={[styles.btn]}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MyModal;
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    backgroundColor: "black",
    borderRadius: 10,
    width: "80%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "red",
    width: "30%",
    padding: 5,
    borderRadius: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
});
