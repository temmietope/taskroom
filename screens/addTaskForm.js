import React, { useState } from "react";
import { TextInput, View, Text, Button } from "react-native";
import { globalStyles } from "../styles/global";
import { Formik } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as yup from "yup";
import FlatButton from "../shared/button";
import moment from "moment";


const taskSchema = yup.object({
  title: yup.string().required().min(4),
  body: yup.string().required().min(8),
});

export default function AddTaskForm({ addTask }) {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("timr");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log('selected date '+selectedDate)
    console.log(event)
    setShow(true);
    setDate(currentDate);
    console.log(date)
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  // const showDatepicker = () => {
  //   showMode("date");
  // };

  const showTimepicker = () => {
    console.log('hey')
    showMode("time");
  };

  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ title: "", body: "" }}
        validationSchema={taskSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          addTask(values);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Task title"
              onChangeText={props.handleChange("title")}
              value={props.values.title}
              onBlur={props.handleBlur("title")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.title && props.errors.title}
            </Text>

            {/* <View>
              <Button onPress={showDatepicker} title="Show date picker!" />
            </View> */}
            <View>
              <Button onPress={showTimepicker} title="Show time picker!" />
            </View>

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                minimumDate= {new Date()}
              />
            )}

            <TextInput
              multiline
              minHeight={100}
              style={globalStyles.input}
              placeholder="Task body"
              onChangeText={props.handleChange("body")}
              value={props.values.body}
              onBlur={props.handleBlur("body")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.body && props.errors.body}
            </Text>
            <FlatButton text="submit" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}
