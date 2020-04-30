import React, { useState } from "react";
import { TextInput, View, Text, Button } from "react-native";
import { globalStyles } from "../styles/global";
import { Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../shared/button";
import moment from "moment";

const AddTaskForm = ({ addTask }) => {
  const [formInput, setFormInput] = useState({ title: "", body: "" });
  const onChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    addTask(formInput)
  };
  return (
    <View style={globalStyles.container}>
      <TextInput
        style={{ ...globalStyles.input, marginBottom: 20 }}
        placeholder="Task title"
        onChangeText={onChange}
        onChangeText={(text) => {
          setFormInput({ ...formInput, title: text });
        }}
        // onChangeText={props.handleChange("title")}
        // value={props.values.title}
        // onBlur={props.handleBlur("title")}
      />

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

      <FlatButton text="submit" onPress={handleSubmit} />
    </View>
  );
};

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
