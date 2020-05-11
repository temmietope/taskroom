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
import { globalStyles } from "../styles/global";
import Card from "../shared/card";
import { MaterialIcons } from "@expo/vector-icons";
import AddTaskForm from "./addTaskForm";
import RangeSlider from "../shared/rangeSlider";
import { colors } from "../styles/color";
import moment from "moment";

export default function Home({ navigation }) {
  const tasksContext = useContext(TasksState);

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const {
    all_tasks,
    pending_tasks,
    completed_tasks,
    progress,
    trackProgress,
    current_task,
    loading,
    clearTask,
    getAllTasks,
    getIndividualTask,
  } = tasksContext;

  useEffect(() => {
    trackProgress();
    getAllTasks();
  }, [loading, progress, current_task, completed_tasks, pending_tasks]);

  const closeModal = () => {
    setModalOpen(false);
    setEditMode(false);
  };
  const editPost = () => {
    setModalOpen(true);
    setEditMode(true);
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
                setEditMode(false);
                !editMode && clearTask();
              }}
            />
            <AddTaskForm closeModal={closeModal} editMode={editMode} />
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
                editPost: editPost,
              });
            }}
          >
            <Card completed={item.completed}>
              <Text style={globalStyles.titleText}>{item.title}</Text>
              <Text style={styles.timeText}>
                {moment(item.date).format("hh:mm a")}
              </Text>
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
