import React, { useState, useEffect, useContext } from "react";
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
import { Context as TasksState } from "../contexter/tasks/TasksContext";

// import {TasksContext} from "../context/tasks/tasksState";
import { globalStyles } from "../styles/global";
import Card from "../shared/card";
import { MaterialIcons } from "@expo/vector-icons";
import AddTaskForm from "./addTaskForm";
import RangeSlider from "../shared/rangeSlider";
import { colors } from "../styles/color";

export default function Home({ navigation }) {
  // const tasksContext = useContext(TasksContext);

  const tasksContext = useContext(TasksState);

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  // const [itemToEdit, setItemToEdit] = useState({});

  const {
    all_tasks,
    pending_tasks,
    completed_tasks,
    progress,
    // trackProgress,
    currentTask,
    clearTask,
    getAllTasks,
    getIndividualTask,
  } = tasksContext;

  // const [completedTasks, setCompletedTasks] = useState([]);
  // const [progress, setProgress] = useState(0);

  useEffect(() => {
    // console.log("this is the home")
    // trackProgress();
    // getAllTasks()
    // console.log(all_tasks)
    // console.log(getAllTasks)
    // getAllTasks()
  }, [all_tasks]);
  // useEffect(() => {
  //   trackProgress();
  // }, [completedTasks, tasks, progress]);

  // const addTask = (task) => {
  //   // setItemToEdit({})'

  //   if (task.key) {
  //     setTasks((currentTasks) => {
  //       const editIdx = currentTasks.findIndex((t) => t.key === task.key);
  //       currentTasks[editIdx] = task;
  //       return currentTasks;
  //     });
  //   } else {
  //     task.key = Math.random().toString();
  //     task.completed = false;
  //     setTasks((currentTasks) => {
  //       return [task, ...currentTasks];
  //     });
  //   }

  //   setModalOpen(false);
  //   setEditMode(false);
  // };
  // const trackProgress = () => {
  //   const perc = Math.ceil((completedTasks.length / tasks.length) * 100);
  //   setProgress(perc);
  // };
  // const markAsComplete = async (key) => {
  //   const idx = tasks.findIndex((task) => task.key === key);
  //   const item = tasks[idx];
  //   if (!item.completed) {
  //     item.completed = true;
  //     setTasks((currentTasks) => {
  //       currentTasks.splice(idx, 1);
  //       currentTasks.push(item);
  //       return currentTasks;
  //     });
  //     setCompletedTasks((currentTasks) => {
  //       currentTasks.unshift(item);
  //       return currentTasks;
  //     });
  //     trackProgress();
  //   } else if (item.completed) {
  //     item.completed = false;
  //     await setTasks((currentTasks) => {
  //       currentTasks.splice(idx, 1);
  //       currentTasks.unshift(item);
  //       return currentTasks;
  //     });
  //     const markedIdx = completedTasks.findIndex(
  //       (task) => task.key === item.key
  //     );

  //     setCompletedTasks((currentTasks) => {
  //       currentTasks.splice(markedIdx, 1);
  //       return currentTasks;
  //     });
  //     trackProgress();
  //   }
  // };

  // const editPost = (item) => {
  //   setModalOpen(true);
  //   setEditMode(true);
  //   setItemToEdit(item);
  // };

  const editPost = () => {
    setModalOpen(true);
    setEditMode(true);
    // setItemToEdit(item);
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
                // setItemToEdit({});
                setEditMode(false);
                clearTask();
              }}
            />
            <AddTaskForm
              // addTask={addTask}
              // itemToEdit={itemToEdit}
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
        data={all_tasks}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              getIndividualTask(item.key);
              navigation.navigate("TaskDetails", {
                key: item.key,
                // markAsComplete: markAsComplete,
                editPost: editPost,
              });
            }}
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
