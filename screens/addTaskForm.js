import React, { useState, useContext } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Context as TasksState } from "../contexter/tasks/TasksContext";
import { globalStyles } from "../styles/global";
import FlatButton from "../shared/button";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const AddTaskForm = ({ editMode, closeModal }) => {
  const tasksContext = useContext(TasksState);

  const { addNewTask, editTask, current_task } = tasksContext;
  const [formInput, setFormInput] = useState({
    title: `${editMode ? current_task.title : ""}`,
    body: `${editMode ? current_task.body : ""}`,
    date: `${editMode ? current_task.date : ""}`,
    key: `${editMode ? current_task.key : Math.random().toString()}`,
    completed: editMode ? current_task.completed : false,
  });
  const [formError, setFormError] = useState({
    title: "",
    body: "",
    date: "",
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setFormInput({
      ...formInput,
      date: date,
    });
  };

  const checkInput = (obj) => {
    let errObject = {
      title: "",
      body: "",
      date: "",
    };
    if (obj.title === "") {
      errObject.title = "You cannot leave Title blank";
    }
    if (obj.body === "") {
      errObject.body = "Please enter a brief description of your task";
    }
    if (obj.date === "") {
      errObject.date = "Please select a schedule for task";
    }
    return errObject;
  };

  const handleSubmit = async () => {
    let err = await checkInput(formInput);
    if (err.title !== "" || err.body !== "" || err.date !== "") {
      return setFormError({
        title: err.title,
        body: err.body,
        date: err.date,
      });
    } else {
      editMode ? editTask(formInput) : addNewTask(formInput);
      return closeModal();
    }
  };
  return (
    <View style={globalStyles.container}>
      <View style={styles.inputBar}>
        <TextInput
          style={globalStyles.input}
          placeholder="Task title"
          value={formInput.title}
          onChangeText={(text) => {
            setFormInput({ ...formInput, title: text });
          }}
        />
        <Text style={styles.err}>{formError.title}</Text>
      </View>
      <View style={styles.inputBar}>
        <TextInput
          multiline
          minHeight={100}
          style={globalStyles.input}
          placeholder="Task body"
          value={formInput.body}
          onChangeText={(text) => {
            setFormInput({ ...formInput, body: text });
          }}
        />
        <Text style={styles.err}>{formError.body}</Text>
      </View>

      <View style={styles.inputBar}>
        <TouchableOpacity onPress={showDatePicker}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Select date and time</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.err}>{formError.date}</Text>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <FlatButton text="submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: 200,
    backgroundColor: "#dd0e0ed7",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
  inputBar: {
    marginBottom: 20,
  },
  err: {
    color: "#dd0e0ed7",
  },
});
export default AddTaskForm;
