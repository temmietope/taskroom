// import React, { useState } from "react";
// import { TextInput, View, Text, Button } from "react-native";
// import { globalStyles } from "../styles/global";
// import { Formik } from "formik";
// // import DateTimePicker from "@react-native-community/datetimepicker";
// import * as yup from "yup";
// import FlatButton from "../shared/button";
// import moment from "moment";
// import DateTimePicker from "react-native-modal-datetime-picker";

// const taskSchema = yup.object({
//   title: yup.string().required().min(4),
//   body: yup.string().required().min(8),
// });

// export default function AddTaskForm({ addTask }) {
//   const [isPickerVisible, setIsPickerVisible] = useState(false);
//   const showDateTimePicker = () => {
//     setIsPickerVisible(true);
//   };

//   const hideDateTimePicker = () => {
//     setIsPickerVisible(false);
//   };

//   const handleDatePicked = (date) => {
//     console.log("A date has been picked: ", date);
//     hideDateTimePicker();
//   };
//   return (
//     <View style={globalStyles.container}>
//       <Formik
//         initialValues={{ title: "", body: "" }}
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

//             <Button title="Show DatePicker" onPress={showDateTimePicker} />
//             <DateTimePicker
//               isVisible={isPickerVisible}
//               onConfirm={handleDatePicked}
//               onCancel={hideDateTimePicker}
//               mode="datetime"
//             />

//             <FlatButton text="submit" onPress={props.handleSubmit} />
//           </View>
//         )}
//       </Formik>
//     </View>
//   );
// }

import React, { useState } from "react";
import { TextInput, View, Text, Button } from "react-native";
import { globalStyles } from "../styles/global";
import { Formik } from "formik";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as yup from "yup";
import FlatButton from "../shared/button";
import moment from "moment";

const taskSchema = yup.object({
  title: yup.string().required().min(4),
  body: yup.string().required().min(8),
});
export default function AddTaskForm({ addTask }) {
  return (
    <Formik
      initialValues={{
        title: "",
        body: "",
        myDate: moment().format("YYYY-MM-DD"),
      }}
      validationSchema={taskSchema}
      onSubmit={(values, actions) => {
        actions.resetForm();
        console.log(values);
        addTask(values);
      }}
    >
      {({
        handleSubmit,
        values,
        setFieldValue,
        handleChange,
        handleBlur,
        touched,
        errors,
      }) => (
        <MyForm
          values={values}
          setFieldValue={setFieldValue}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
        />
      )}
    </Formik>
  );
}

export const MyForm = (props) => {
  const {
    handleSubmit,
    values,
    setFieldValue,
    handleChange,
    handleBlur,
    touched,
    errors,
  } = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setFieldValue("myDate", moment(date).format("YYYY-MM-DD"));
    console.log(date);
    hideDatePicker();
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={globalStyles.input}
        placeholder="Task title"
        onChangeText={handleChange("title")}
        value={values.title}
        onBlur={handleBlur("title")}
      />
      <Text style={globalStyles.errorText}>
        {touched.title && errors.title}
      </Text>

      <FlatButton onPress={showDatePicker} text=" date and time" />
      <Text>{moment(values.myDate).format("YYYY-MM-DD")}</Text>

      <TextInput
        multiline
        minHeight={100}
        style={globalStyles.input}
        placeholder="Task body"
        onChangeText={handleChange("body")}
        value={values.body}
        onBlur={handleBlur("body")}
      />
      <Text style={globalStyles.errorText}>{touched.body && errors.body}</Text>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={moment(values.myDate).toDate()}
      />

      <FlatButton text="submit" onPress={handleSubmit} />

      {/* <Button title="Submit" onPress={handleSubmit} /> */}
    </View>
  );
};
