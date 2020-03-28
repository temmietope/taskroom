import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/home";
import TaskDetails from "../screens/taskDetails";
import Header from "../shared/header";
import React from "react";

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} title="TASKROOM" />,
        headerTitleAlign: "center"
      };
    }
  },
  TaskDetails: {
    screen: TaskDetails,
    navigationOptions: {
      title: "TaskDetails"
    }
  }
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerStyle: { backgroundColor: "#ccc", height: 100 }
  }
});

// export default createAppContainer(HomeStack);

export default HomeStack;
