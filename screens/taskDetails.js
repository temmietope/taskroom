import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";
import Card from "../shared/card";
import FlatButton from "../shared/button";

const TasksDetails = (props) => {
  const [item, setItem] = useState({});
  const [buttonText, setButtonText] = useState("");
  useEffect(() => {
    setItem(props.navigation.getParam("item"));
    renderButtonText(item);
    console.log("i rendered");
  }, [props]);

  const markAsComplete = props.navigation.getParam("markAsComplete");
  const editPost = props.navigation.getParam("editPost");

  const renderButtonText = (item) => {
    item.completed
      ? setButtonText("Mark Incomplete")
      : setButtonText("Task Completed");
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.detailsView}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <View style={styles.taskDescription}>
          <Card>
            <Text style={styles.taskDescriptionText}>{item.body}</Text>
            <Text style={styles.taskDescriptionTimeText}>{item.time}</Text>
          </Card>
        </View>

        <TouchableOpacity onPress={() => editPost(item)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Edit task</Text>
          </View>
        </TouchableOpacity>

        <FlatButton
          text={buttonText}
          onPress={() => {
            markAsComplete(`${item.key}`);
            item && renderButtonText(item);
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

// export default class TasksDetails extends Component {
//   state = {
//     buttonText: "",
//     item: {},
//   };

//   componentDidMount() {
//     const item = this.props.navigation.getParam("item");
//     this.setState({
//       item,
//     });
//     this.renderButtonText(item);
//     console.log("dddddeeeeetttttttaaaaaaaiiiilllllssssssss");
//     console.log("I made it to task details b*tches");
//     console.log(item);
//   }

//   componentWillReceiveProps(nextProps) {
//     this.setState({ item: nextProps.navigation.getParam("item")});
//   }

//   // componentWillReceiveProps(props) {
//   //   this.setState({ item: props.navigation.getParam("item") });
//   // }

//   // componentDidUpdate(prevProps) {
//   //   // Typical usage (don't forget to compare props):
//   //   if (this.props.navigation.getParam("item") !== prevProps.navigation.getParam("item")) {
//   //     console.log("are you for real")
//   //     // this.fetchData(this.props.userID);
//   //     this.setState({item : this.props.navigation.getParam("item")})
//   //   }
//   // }

//   // componentDidUpdate(prevProps) {
//   //   // console.log("i got to task details");

//   //   // console.log(prevProps.navigation.getParam("item"));
//   //   // if (prevProps.navigation.getParam("item") !== this.state.item) {
//   //   //   console.log("i got to task details");
//   //   //   this.setState({ item: prevProps.navigation.getParam("item") });
//   //   // }
//   // }
//   renderButtonText = (item) => {
//     if (item) {
//       if (item.completed) {
//         this.setState({
//           buttonText: "Mark Incomplete",
//         });
//       } else {
//         this.setState({
//           buttonText: "Task completed",
//         });
//       }
//     }
//   };

//   render() {
//     const { item, buttonText } = this.state;
//     const markAsComplete = this.props.navigation.getParam("markAsComplete");
//     const editPost = this.props.navigation.getParam("editPost");

//     return (
//       <View style={globalStyles.container}>
//         <View style={styles.detailsView}>
//           <Text style={styles.taskTitle}>{item.title}</Text>
//           <View style={styles.taskDescription}>
//             <Card>
//               <Text style={styles.taskDescriptionText}>{item.body}</Text>
//               <Text style={styles.taskDescriptionTimeText}>{item.time}</Text>
//             </Card>
//           </View>

//           <TouchableOpacity onPress={() => editPost(item)}>
//             <View style={styles.button}>
//               <Text style={styles.buttonText}>Edit task</Text>
//             </View>
//           </TouchableOpacity>

//           <FlatButton
//             text={buttonText}
//             onPress={() => {
//               markAsComplete(`${item.key}`);
//               this.renderButtonText(item);
//             }}
//           />
//         </View>
//       </View>
//     );
//   }
// }
