import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Slider
} from "react-native";
import { globalStyles } from "../styles/global";
import Card from "../shared/card";
import { MaterialIcons } from "@expo/vector-icons";
// import Slider from 'react-native';
import AddTaskForm from "./addTaskForm";

export default function Home({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState([
    {
      title: "Cloth Delivery",
      body: "I have to deliver Bunmi's clothes to her on time",
      completed: false,
      key: "1"
    },
    {
      title: "Groceries Shopping",
      body: "Go to the market and shop for important things",
      completed: false,
      key: "2"
    },
    {
      title: "Pick kids from school",
      body: "My kids cant be late",
      completed: false,
      key: "3"
    },
    {
      title: "FIght",
      body: "Ninja movement, nigga!",
      completed: false,
      key: "4"
    },
    {
      title: "Make dinner",
      body: "Rice and beans with plantain",
      completed: false,
      key: "5"
    }
  ]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [progress, setProgress] = useState(0);
  // const [val, setVal] = useState(props);

  // useEffect(() => {
  //     setVal(props);
  // }, [props])

  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [input])

  const addTask = task => {
    task.key = Math.random().toString();
    task.completed = false;
    setTasks(currentTasks => {
      return [task, ...currentTasks];
    });
    setModalOpen(false);
  };
  const trackProgress = () => {
    console.log(completedTasks.length, tasks.length);
    const perc = (completedTasks.length / tasks.length) * 100;
    setProgress(perc);
    console.log(progress);
  };
  const markAsComplete = async key => {
    const idx = tasks.findIndex(task => task.key === key);
    console.log(idx);
    const item = tasks[idx];
    if (!item.completed) {
      item.completed = true;
      setTasks(currentTasks => {
        currentTasks.splice(idx, 1);
        currentTasks.push(item);
        return currentTasks;
      });
      setCompletedTasks(currentTasks => {
        return [item, ...currentTasks];
      });
    } else if(item.completed){
      item.completed = false;
    // console.log(item);
     await setTasks(currentTasks => {
        currentTasks.splice(idx, 1)
        console.log(item)
        return [item, ...currentTasks]
      })
      console.log(tasks)
      // // console.log(item.completed);
      setCompletedTasks(currentTasks => {
        return currentTasks.filter(task => {
          task !== item;
        });
      });
      // setTasks(currentTasks => {
      //   currentTasks.splice(idx, 1);
      //   return [item, ...currentTasks];
      // });
      // console.log(item);
    }

    // let copiedArray = [...tasks];
    // const idx = copiedArray.findIndex(task => task.key === key);
    // const item = copiedArray[idx];
    // if (!item.completed) {
    //   item.completed = true;
    //   copiedArray.splice(idx, 1);
    //   copiedArray.push(item);
    //   setTasks(copiedArray);
    //   // await setCompletedTasks(currentTasks => {
    //   //   return [...currentTasks, item];
    //   // });
    //   // setCompletedTasks([...completedTasks, item])
    //   completedTasks.push(item);
    //   console.log(completedTasks);
    // } else {
    //   item.completed = false;
    //   copiedArray.splice(idx, 1);
    //   copiedArray.unshift(item);
    //   setTasks(copiedArray);
    //   await setCompletedTasks(currentTasks => {
    //     return currentTasks.filter(task => {
    //       task !== item;
    //     });
    //   });
    // }
    // console.log(completedTasks.length);

    // trackProgress();
  };

  return (
    <View style={{ ...globalStyles.container, ...styles.listContainer }}>
      <Modal visible={modalOpen} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {console.log(tasks.length, completedTasks.length)}

          {console.log("the progress is :" + progress)}
          <View style={styles.modalContent}>
            <MaterialIcons
              name="close"
              size={24}
              style={{ ...styles.modalToggle, ...styles.modalClose }}
              onPress={() => setModalOpen(false)}
            />
            <AddTaskForm addTask={addTask} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <MaterialIcons
        name="add"
        size={24}
        style={{ ...styles.modalToggle, ...styles.modalOpen }}
        onPress={() => setModalOpen(true)}
      />

      <Slider
        style={{ width: 500, height: 100 }}
        minimumValue={0}
        maximumValue={100}
        // step={50}
        minimumTrackTintColor="green"
        maximumTrackTintColor="#000000"
        value={progress}
        style={styles.slider}
      />

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TaskDetails", {
                item: item,
                markAsComplete: markAsComplete
              })
            }
          >
            <Card completed={item.completed}>
              <Text style={globalStyles.titleText}>{item.title}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    position: "relative"
  },
  modalContent: {
    flex: 1
  },
  modalToggle: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    alignSelf: "center",
    borderRadius: 10
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0
  },
  modalOpen: {
    position: "absolute",
    bottom: 60,
    zIndex: 1,
    right: 30,
    borderRadius: 50,
    backgroundColor: "rgba(255, 192, 203, 0.8)",
    padding: 20
  },
  slider: {
    backgroundColor: "red"
  }
});
