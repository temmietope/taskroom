import React, { useState, useEffect } from "react";
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
import AddTaskForm from "./addTaskForm";
import RangeSlider from "../shared/rangeSlider";

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

  useEffect(() => {
    trackProgress();
  }, [completedTasks, tasks, progress]);
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
    const perc = Math.ceil((completedTasks.length / tasks.length) * 100);
    setProgress(perc);
    console.log("progress " + progress);
  };
  const markAsComplete = async key => {
    const idx = tasks.findIndex(task => task.key === key);
    const item = tasks[idx];
    if (!item.completed) {
      item.completed = true;
      setTasks(currentTasks => {
        currentTasks.splice(idx, 1);
        currentTasks.push(item);
        return currentTasks;
      });
      setCompletedTasks(currentTasks => {
        currentTasks.unshift(item);
        return currentTasks;
      });
      console.log("completed task " + completedTasks.length);
      trackProgress();
    } else if (item.completed) {
      item.completed = false;
      await setTasks(currentTasks => {
        currentTasks.splice(idx, 1);
        currentTasks.unshift(item);
        return currentTasks;
      });
      const markedIdx = completedTasks.findIndex(task => task.key === item.key);

      setCompletedTasks(currentTasks => {
        currentTasks.splice(markedIdx, 1);
        return currentTasks;
      });
      trackProgress();
    }
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

      <View style={styles.sliderContainer}>
        <RangeSlider progress={progress}/>
        {/* <Slider
          // style={{ width: 500, height: 100 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="green"
          maximumTrackTintColor="#000000"
          value={progress}
          style={styles.slider}
        /> */}
        <Text style={styles.progressText}>{progress}/100</Text>
      </View>

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
  sliderContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    marginBottom: 20
  },
  slider: {
    backgroundColor: "red",
    width: "80%",
  },
  progressText: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 0
  }
});
