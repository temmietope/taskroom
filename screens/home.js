import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { globalStyles } from "../styles/global";
import Card from "../shared/card";
import { MaterialIcons } from "@expo/vector-icons";
import AddTaskForm from "./addTaskForm";
import RangeSlider from "../shared/rangeSlider";
import { colors } from "../styles/color";

export default function Home({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});

  const [tasks, setTasks] = useState([
    {
      title: "Cloth Delivery",
      body: "I have to deliver Bunmi's clothes to her on time",
      time: "10: 00 am",
      completed: false,
      key: "1",
    },
    {
      title: "Groceries Shopping",
      body: "Go to the market and shop for important things",
      time: "10: 00 am",
      completed: false,
      key: "2",
    },
    {
      title: "Pick kids from school",
      body: "My kids cant be late",
      time: "10: 00 am",
      completed: false,
      key: "3",
    },
    {
      title: "Fight",
      body: "Ninja movement, nigga!",
      time: "10: 00 am",
      completed: false,
      key: "4",
    },
    {
      title: "Make dinner",
      body: "Rice and beans with plantain",
      time: "10: 00 am",
      completed: false,
      key: "5",
    },
  ]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    trackProgress();
  }, [completedTasks, tasks, progress]);

  const addTask = (task) => {
    task.key = Math.random().toString();
    task.completed = false;
    setTasks((currentTasks) => {
      return [task, ...currentTasks];
    });
    setModalOpen(false);
  };
  const trackProgress = () => {
    const perc = Math.ceil((completedTasks.length / tasks.length) * 100);
    setProgress(perc);
  };
  const markAsComplete = async (key) => {
    const idx = tasks.findIndex((task) => task.key === key);
    const item = tasks[idx];
    if (!item.completed) {
      item.completed = true;
      setTasks((currentTasks) => {
        currentTasks.splice(idx, 1);
        currentTasks.push(item);
        return currentTasks;
      });
      setCompletedTasks((currentTasks) => {
        currentTasks.unshift(item);
        return currentTasks;
      });
      trackProgress();
    } else if (item.completed) {
      item.completed = false;
      await setTasks((currentTasks) => {
        currentTasks.splice(idx, 1);
        currentTasks.unshift(item);
        return currentTasks;
      });
      const markedIdx = completedTasks.findIndex(
        (task) => task.key === item.key
      );

      setCompletedTasks((currentTasks) => {
        currentTasks.splice(markedIdx, 1);
        return currentTasks;
      });
      trackProgress();
    }
  };

  const editPost = (item) => {
    setModalOpen(true);
    setEditMode(true);
    setItemToEdit(item);
    console.log(modalOpen);
  };

  return (
    <View style={{ ...globalStyles.container, ...styles.listContainer }}>
      <Modal visible={modalOpen} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons
              name="close"
              size={24}
              style={{ ...styles.modalToggle, ...styles.modalClose }}
              onPress={() => {
                setModalOpen(false);
                setItemToEdit({});
                setEditMode(false);
              }}
            />
            <AddTaskForm
              addTask={addTask}
              itemToEdit={itemToEdit}
              editMode={editMode}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <MaterialIcons
        name="add"
        size={24}
        style={{ ...styles.modalToggle, ...styles.modalOpen }}
        onPress={() => setModalOpen(true)}
      />

      <View style={styles.sliderContainer}>
        <RangeSlider progress={progress} />
        <Text style={styles.progressText}>{progress}/100</Text>
      </View>

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TaskDetails", {
                item: item,
                markAsComplete: markAsComplete,
                editPost: editPost,
              })
            }
          >
            <Card completed={item.completed}>
              <Text style={globalStyles.titleText}>{item.title}</Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    position: "relative",
    backgroundColor: "#fff",
  },
  modalContent: {
    flex: 1,
  },
  modalToggle: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    alignSelf: "center",
    borderRadius: 10,
    color: "white",
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalOpen: {
    position: "absolute",
    bottom: 60,
    zIndex: 1,
    right: 30,
    borderRadius: 50,
    backgroundColor: colors.app_color,
    padding: 15,
  },
  sliderContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  slider: {
    backgroundColor: "red",
    width: "80%",
  },
  progressText: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 0,
  },
  timeText: {
    fontSize: 12,
  },
});
