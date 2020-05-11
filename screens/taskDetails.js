import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Context as TasksState } from "../contexter/tasks/TasksContext";
import { globalStyles } from "../styles/global";
import Card from "../shared/card";
import FlatButton from "../shared/button";
import moment from "moment";

const TasksDetails = (props) => {
  const tasksContext = useContext(TasksState);

  const {
    getIndividualTask,
    current_task,
    getAllTasks,
    toggleComplete,
    pending_tasks,
    completed_tasks,
  } = tasksContext;

  const [buttonText, setButtonText] = useState("");
  useEffect(() => {
    const taskKey = props.navigation.getParam("key");
    getIndividualTask(taskKey);
    getAllTasks();
    renderButtonText(current_task.completed);
  }, [current_task.completed, current_task, pending_tasks, completed_tasks]);

  const editPost = props.navigation.getParam("editPost");

  const renderButtonText = (completed) => {
    completed
      ? setButtonText("Mark Incomplete")
      : setButtonText("Task Completed");
  };

  const { title, body, date, key, completed } = current_task;
  return (
    <View style={globalStyles.container}>
      <View style={styles.detailsView}>
        <Text style={styles.taskTitle}>{title}</Text>
        <View style={styles.taskDescription}>
          <Card>
            <Text style={styles.taskDescriptionText}>{body}</Text>
            <Text style={styles.taskDescriptionTimeText}>
              {moment(date).format("hh:mm a")}
            </Text>
          </Card>
        </View>

        <TouchableOpacity
          onPress={async () => {
            await editPost();
          }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Edit task</Text>
          </View>
        </TouchableOpacity>

        <FlatButton
          text={buttonText}
          onPress={() => {
            toggleComplete(key);
            current_task && renderButtonText(completed);
          }}
        />
      </View>
    </View>
  );
};
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
    height: "100%",
  },
  taskTitle: {
    fontSize: 25,
    textAlign: "center",
    width: "100%",
    padding: 10,
    fontWeight: "bold",
  },
  taskDescription: {
    marginBottom: 10,
  },
  taskDescriptionText: {
    fontSize: 16,
  },
  taskDescriptionTimeText: {
    fontSize: 10,
    textAlign: "right",
  },
  button: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: 200,
    backgroundColor: "#f2f2f2",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});
export default TasksDetails;
