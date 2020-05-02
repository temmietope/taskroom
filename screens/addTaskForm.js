import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../styles/global";
import FlatButton from "../shared/button";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const AddTaskForm = ({ addTask }) => {
  const [formInput, setFormInput] = useState({
    title: "",
    body: "",
    date: "",
    time: "",
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

    console.warn("A date has been picked: ", moment(date).format("YYYY-MM-DD"));
    // setFormInput
    // moment.format().()
    // moment(date).format("YYYY-MM-DD")
    setFormInput({
      ...formInput,
      date: moment(date).format("YYYY-MM-DD"),
      time: moment(date).format("hh:mm a"),
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
    // let errObject = {
    //   title: "",
    //   body: "",
    //   date: "",
    // };
    // if (formInput.title === "") {
    //   errObject.title = "You cannot leave Title blank";
    //   // setFormError({ ...formError, title: "You cannot leave Title blank" });
    // } else if (formInput.body === "") {
    //   errObject.body = "Please enter a brief description of your task";
    //   // setFormError({
    //   //   ...formError,
    //   //   body: "Please enter a brief description of your task",
    //   // });
    // } else if (formInput.date === "") {
    //   errObject.date = "Please select a schedule for task";
    //   // setFormError({
    //   //   ...formError,
    //   //   title: "Please select a schedule for task",
    //   // });
    // }
    // await setFormError({
    //   title: errObject.title,
    //   body: errObject.body,
    //   date: errObject.date,
    // });
    // else {
    //   addTask(formInput);
    // }

    let err = await checkInput(formInput);
    if (err.title !== "" || body !== "" || date !== "") {
      return setFormError({
        title: err.title,
        body: err.body,
        date: err.date,
      });
    } else addTask(formInput);
  };
  return (
    <View style={globalStyles.container}>
      <View>
        <TextInput
          style={{ ...globalStyles.input, marginBottom: 20 }}
          placeholder="Task title"
          // onChangeText={onChange}
          onChangeText={(text) => {
            setFormInput({ ...formInput, title: text });
          }}
        />
        <Text>{formError.title}</Text>
      </View>

      <View>
        <TextInput
          multiline
          minHeight={100}
          style={{ ...globalStyles.input, marginBottom: 20 }}
          placeholder="Task body"
          onChangeText={(text) => {
            setFormInput({ ...formInput, body: text });
          }}
        />
        <Text>{formError.body}</Text>
      </View>

      <View>
        <TouchableOpacity onPress={showDatePicker}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Select date and time</Text>
          </View>
        </TouchableOpacity>

        <Text>{formError.date}</Text>
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
    marginBottom: 20,
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
});
export default AddTaskForm;
