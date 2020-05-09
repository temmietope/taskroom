import React, { useState, useContext, useEffect } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import Navigator from "./routes/drawer";
// import {TasksState} from "./context/tasks/tasksState";
import { Provider as TasksState } from "./contexter/tasks/TasksContext";
import { Context as TasksContext } from "./contexter/tasks/TasksContext";

const getFonts = () =>
  Font.loadAsync({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontLoaded] = useState(false);

  const tasksContext = useContext(TasksContext);
  // const { getAllTasks } = tasksContext;

  useEffect(() => {
    console.log(tasksContext);
  });

  if (fontsLoaded) {
    return (
      <TasksState>
        <Navigator />
      </TasksState>
    );
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontLoaded(true)} />
    );
  }
}
