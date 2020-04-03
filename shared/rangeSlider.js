import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { colors } from "../styles/color";

export default function RangeSlider({ progress }) {
  return (
    <View style={styles.rangeContainer}>
      <View style={{ ...styles.range, width: `${progress}%` }}>
        {progress ? <View style={styles.thumb}></View> : <Text></Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rangeContainer: {
    // backgroundColor: "rgba(255, 192, 203, 0.8)",
    backgroundColor: "rgba(128, 128, 128, 0.212)",

    borderRadius: 5,
    height: 5,
    width: "80%"
  },
  range: {
    backgroundColor: "#5885fa6c",
    height: 5,
    borderRadius: 5,
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  thumb: {
    width: 20,
    height: 20,
    backgroundColor: colors.app_color,
    opacity: 1,
    position: "absolute",
    right: 0,
    borderRadius: 50
  }
});
