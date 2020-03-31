import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { globalStyles } from "../styles/global";
import Card from "../shared/card";
import FlatButton from "../shared/button";

export default function TasksDetails({ navigation }) {
  const item = navigation.getParam("item");
  const markAsComplete = navigation.getParam("markAsComplete");
  return (
    <View style={globalStyles.container}>
      <View style={styles.detailsView}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <View style={styles.taskDescription}>
          <Card>
            <Text style={styles.taskDescriptionText}>{item.body}</Text>
          </Card>
        </View>

        <FlatButton
          text="Task Completed"
          onPress={() => markAsComplete(`${item.key}`)}
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
  taskDescription: {
    marginBottom: 10
  },
  taskDescriptionText: {
    fontSize: 16
  },
  taskComplete: {
    backgroundColor: "red"
  }
});
