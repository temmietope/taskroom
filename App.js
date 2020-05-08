import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import Navigator from "./routes/drawer";
// import {TasksState} from "./context/tasks/tasksState";
import { Provider as TasksState } from "./contexter/tasks/TasksContext";

const getFonts = () =>
  Font.loadAsync({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontLoaded] = useState(false);

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
