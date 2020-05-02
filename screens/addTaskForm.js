import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../styles/global";
// import * as yup from "yup";
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
    time: "",
  });
  // const taskSchema = yup.object({
  //   title: yup.string().required().min(4),
  //   body: yup.string().required().min(8),
  // });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    // setFormInput
    // moment.format().()
    hideDatePicker();
  };

  const handleSubmit = () => {
    // taskSchema.validate(formInput, { abortEarly: false }).catch((err) => {
    //   console.log(err.name);
    //   console.log(err.errors);
    // });
    if (formInput.title === "") {
      setFormError({ ...formError, title: "You cannot leave Title blank" });
    } else if (formInput.title.length< 5) {
      setFormError({
        ...formError,
        title: "Title must not be less than 5 characters",
      });
    } 
    else if (formInput.date === "") {
      setFormError({
        ...formError,
        title: "Please select a schedule for task",
      });
    } 
    else {
      addTask(formInput);
    }
  };
  return (
    <View style={globalStyles.container}>
      <TextInput
        style={{ ...globalStyles.input, marginBottom: 20 }}
        placeholder="Task title"
        // onChangeText={onChange}
        onChangeText={(text) => {
          setFormInput({ ...formInput, title: text });
        }}
        // onChangeText={props.handleChange("title")}
        // value={props.values.title}
        // onBlur={props.handleBlur("title")}
      />
      <Text>{formError.title}</Text>

      <TextInput
        multiline
        minHeight={100}
        style={{ ...globalStyles.input, marginBottom: 20 }}
        placeholder="Task body"
        onChangeText={(text) => {
          setFormInput({ ...formInput, body: text });
        }}

        // onChangeText={props.handleChange("body")}
        // value={props.values.body}
        // onBlur={props.handleBlur("body")}
      />
      {/* <Text>{formError}</Text> */}

      <TouchableOpacity onPress={showDatePicker}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Select date and time</Text>
        </View>
      </TouchableOpacity>

      <Text>{formError.date}</Text>

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

// const taskSchema = yup.object({
//   title: yup.string().required().min(4),
//   body: yup.string().required().min(8),
// });

// export default function AddTaskForm({ addTask }) {

//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = (date) => {
//     console.warn("A date has been picked: ", date);
//     hideDatePicker();
//   };

//   return (
//     <View style={globalStyles.container}>
//       <Formik
//         initialValues={{
//           title: "",
//           body: "",
//         }}
//         validationSchema={taskSchema}
//         onSubmit={(values, actions) => {
//           actions.resetForm();
//           console.log(values);
//           addTask(values);
//         }}
//       >
//         {(props) => (
//           <View>
//             <TextInput
//               style={globalStyles.input}
//               placeholder="Task title"
//               onChangeText={props.handleChange("title")}
//               value={props.values.title}
//               onBlur={props.handleBlur("title")}
//             />
//             <Text style={globalStyles.errorText}>
//               {props.touched.title && props.errors.title}
//             </Text>

//             <TextInput
//               multiline
//               minHeight={100}
//               style={globalStyles.input}
//               placeholder="Task body"
//               onChangeText={props.handleChange("body")}
//               value={props.values.body}
//               onBlur={props.handleBlur("body")}
//             />
//             <Text style={globalStyles.errorText}>
//               {props.touched.body && props.errors.body}
//             </Text>
//             <View>
//               <Text>today</Text>
//               <FlatButton text="Add date" />
//               <Text>time</Text>
//               <FlatButton text="Add time" />
//             </View>

//             <FlatButton text="submit" onPress={props.handleSubmit} />
//           </View>
//         )}
//       </Formik>
//     </View>
//   );
// }
