import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { globalStyles } from "../styles/global";
import Card from "../shared/card";
import { AntDesign } from "@expo/vector-icons";


export default function TasksDetails({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <View style={styles.detailsView}>
        <Text style={styles.taskTitle}>{navigation.getParam("title")}</Text>
        <Card>
          <Text>{navigation.getParam("body")}</Text>
        </Card>
        <AntDesign
        name="check"
        size={24}
        style={styles.taskComplete}
        // onPress={() => setModalOpen(true)}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsView: {
    borderRadius: 6,
    elevation: 2,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    // marginVertical: 10,
    borderColor: "gray",
    padding: 10,
    height: "100%"
  },
  taskTitle: {
    fontSize: 25,
    textAlign: "center",
    width: "100%",
    padding: 10,
    fontWeight: "bold"
  },
  rating: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee"
  },
  taskComplete: {

  }
});
