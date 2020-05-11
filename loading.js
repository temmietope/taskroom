import React from "react";
import { StyleSheet, View } from "react-native";

const Spinner = () => {
  return (
    <View style={styles.spinnerStyle}>
      <img src="./images/spinner.svg" alt="Loading..." />
    </View>
  );
};
const styles = StyleSheet.create({
  spinnerStyle: {
    width: 100,
    height: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Spinner;
