import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { globalStyles } from "../styles/global";
import Card from "../shared/card";
import { MaterialIcons } from "@expo/vector-icons";
import AddTaskForm from "./addTaskForm";

export default function Home({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState([
    {
      title: "Cloth Delivery",
      body: "I have to deliver Bunmi's clothes to her on time",
      key: "1"
    },
    {
      title: "Groceries Shopping",
      body: "Go to the market and shop for important things",
      key: "2"
    },
    {
      title: "Pick kids from school",
      body: "My kids cant be late",
      key: "3"
    }
  ]);
  const [completedTasks, setCompletedTask] = useState([]);

  const addTask = task => {
    task.key = Math.random().toString();
    setTasks(currentTasks => {
      return [task, ...currentTasks];
    });
    setModalOpen(false);
  };
  const markAsComplete = task => {
    console.log(task);
  };
  return (
    <View style={globalStyles.container}>
      <Modal visible={modalOpen} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons
              name="close"
              size={24}
              style={{ ...styles.modalToggle, ...styles.modalClose }}
              onPress={() => setModalOpen(false)}
            />
            <AddTaskForm addTask={addTask} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <MaterialIcons
        name="add"
        size={24}
        style={styles.modalToggle}
        onPress={() => setModalOpen(true)}
      />

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TaskDetails", {
                item: item,
                markAsComplete: markAsComplete
              })
            }
          >
            <Card>
              <Text style={globalStyles.titleText}>{item.title}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1
  },
  modalToggle: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    alignSelf: "center",
    borderRadius: 10
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0
  }
});
