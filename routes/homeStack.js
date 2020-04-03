import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/home";
import TaskDetails from "../screens/taskDetails";
import { HomeHeader } from "../shared/header";
import { colors } from "../styles/color";

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <HomeHeader navigation={navigation} title="TODAY" />,
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
    headerStyle: {
      backgroundColor: colors.app_color,
      height: 350,
      borderBottomRightRadius: 15,
      borderBottomLeftRadius: 15
    }
  }
});

export default HomeStack;
