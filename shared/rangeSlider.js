import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

export default function RangeSlider({ progress }) {
  return (
    <View style={styles.rangeContainer}>
        {console.log("range "+progress)}
      <View style={{ ...styles.range, width: `${progress}%` }}>
          <View style={styles.thumb}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rangeContainer: {
    backgroundColor: "rgba(255, 192, 203, 0.8)",
    borderRadius: 5,
    height: 10,
    width: '80%'
  },
  range: {
    backgroundColor: "rgba(172, 255, 47, 0.637)",
    height: 10,
    borderRadius: 5,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
    // borderRightWidth: 8,
    // borderRightColor: 'rgba(54, 80, 15, 0.637)'
  },
  thumb: {
    width: 20,
    height: 20,
    backgroundColor: 'rgb(54, 80, 15)',
    position: 'absolute',
    right: 0,
    borderRadius: 50
  }
});
