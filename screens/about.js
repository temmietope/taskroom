import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/global";

export default function About() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.paragraph}>
        TASKROOM allows you list out your daily goals set a time to achieve each
        goals, then mark as complete when done.
      </Text>
    </View>
  );
}
